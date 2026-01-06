const nodemailer = require('nodemailer');

module.exports = async function (context, req) {
  // Ensure we always return JSON, even if something goes wrong early
  const sendJsonResponse = (status, body) => {
    context.res = {
      status: status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: body
    };
  };

  try {
    context.log('=== Contact form submission received ===');
    context.log('Request method:', req.method);
    context.log('Request body:', JSON.stringify(req.body || {}));

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      context.res = {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: ''
      };
      return;
    }

    // Ensure request body exists
    if (!req.body) {
      context.log('WARNING: Request body is missing or empty');
      sendJsonResponse(400, {
        success: false,
        message: 'Request body is required',
        error: 'Missing request body'
      });
      return;
    }

  try {
    const { name, email, phone, message, rating, product, review } = req.body;

    // Validate required fields
    if (!name || !email || (!message && !review)) {
      context.log('ERROR: Missing required fields', { name: !!name, email: !!email, message: !!message, review: !!review });
      sendJsonResponse(400, {
        success: false,
        message: 'Missing required fields',
        details: { name: !!name, email: !!email, message: !!message, review: !!review }
      });
      return;
    }

    // Determine if this is feedback or contact form
    const isFeedback = rating !== undefined;
    const subject = isFeedback 
      ? `New Customer Feedback - ${rating}/5 stars for ${product}`
      : `New Contact Form Submission from ${name}`;

    // Get email configuration from environment variables
    // Defaults are production-friendly for Office 365 SMTP
    const smtpHost = process.env.SMTP_HOST || 'smtp.office365.com';
    const smtpPort = parseInt(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER || 'support@oggaranefoods.com';
    const smtpPass = process.env.SMTP_PASS || '';
    const contactEmail = process.env.CONTACT_EMAIL || 'support@oggaranefoods.com';
    const fromAddress = process.env.AZURE_EMAIL_FROM_ADDRESS || smtpUser;

    // Log environment variable status (without exposing password)
    context.log('=== Environment Variables Check ===');
    context.log('SMTP_HOST:', smtpHost);
    context.log('SMTP_PORT:', smtpPort);
    context.log('SMTP_USER:', smtpUser);
    context.log('SMTP_PASS:', smtpPass ? '***SET***' : '***NOT SET***');
    context.log('CONTACT_EMAIL:', contactEmail);
    context.log('FROM_ADDRESS:', fromAddress);

    // Validate SMTP password is set
    if (!smtpPass) {
      context.log.error('ERROR: SMTP_PASS environment variable is not set!');
      sendJsonResponse(500, {
        success: false,
        message: 'Email service configuration error. Please contact support.',
        error: 'SMTP password not configured'
      });
      return;
    }

    // Configure SMTP transporter (STARTTLS for 587, SSL for 465)
    context.log('Configuring SMTP transporter...');
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      },
      // Add connection timeout
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000
    });

    // Verify SMTP connection
    context.log('Verifying SMTP connection...');
    try {
      await transporter.verify();
      context.log('✅ SMTP connection verified successfully');
    } catch (verifyError) {
      context.log.error('❌ SMTP verification failed:', verifyError.message);
      context.log.error('Full error:', JSON.stringify(verifyError));
      throw new Error(`SMTP verification failed: ${verifyError.message}`);
    }

    // Prepare email content for business owner
    const ownerHtml = `
      <h2>${isFeedback ? 'New Customer Feedback' : 'New Contact Form Submission'}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      ${isFeedback ? `
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Rating:</strong> ${rating}/5 stars</p>
        <p><strong>Review:</strong></p>
        <blockquote style="border-left: 4px solid #ccc; margin: 10px 0; padding-left: 15px; font-style: italic;">
          ${review}
        </blockquote>
      ` : `
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `}
      <hr>
      <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
      <p><em>Sent via Oggarane Foods ${isFeedback ? 'Feedback Form' : 'Contact Form'}</em></p>
    `;

    // Prepare confirmation email for user
    const userHtml = `
      <h2>${isFeedback ? 'Thank you for your valuable feedback!' : 'Thank you for contacting Oggarane Foods!'}</h2>
      <p>Dear ${name},</p>
      ${isFeedback ? `
        <p>We truly appreciate you taking the time to share your experience with our ${product}.</p>
        <p><strong>Your ${rating}/5 star rating:</strong></p>
        <blockquote style="border-left: 4px solid #ccc; margin: 10px 0; padding-left: 15px; font-style: italic;">
          ${review}
        </blockquote>
        <p>Your feedback helps us improve our products and services. ${rating < 3.5 ? 'We will personally follow up with you to address any concerns.' : 'We\'re thrilled you enjoyed our product!'}</p>
      ` : `
        <p>We have received your message and will get back to you within <strong>24–48 hours</strong>.</p>
        <p><strong>Your message:</strong></p>
        <blockquote style="border-left: 4px solid #ccc; margin: 10px 0; padding-left: 15px; font-style: italic;">
          ${message}
        </blockquote>
      `}
      <p>Best regards,<br>Oggarane Foods Team</p>
      <hr>
      <p><em>This is an automated response from our ${isFeedback ? 'feedback' : 'contact form'} system.</em></p>
    `;

    // Send email to business owner
    context.log(`Sending email to business owner: ${contactEmail}`);
    const ownerMailOptions = {
      from: fromAddress,
      to: contactEmail,
      subject: subject,
      html: ownerHtml
    };

    try {
      const ownerResult = await transporter.sendMail(ownerMailOptions);
      context.log(`✅ Email sent to business owner: ${contactEmail}`);
      context.log('Message ID:', ownerResult.messageId);
    } catch (ownerError) {
      context.log.error('❌ Failed to send email to business owner:', ownerError.message);
      context.log.error('Full error:', JSON.stringify(ownerError));
      throw new Error(`Failed to send email to business owner: ${ownerError.message}`);
    }

    // Send confirmation email to user
    context.log(`Sending confirmation email to user: ${email}`);
    const userSubject = isFeedback ? 'Thank you for your feedback!' : 'Thank you for contacting Oggarane Foods';
    const userMailOptions = {
      from: fromAddress,
      to: email,
      subject: userSubject,
      html: userHtml
    };

    try {
      const userResult = await transporter.sendMail(userMailOptions);
      context.log(`✅ Confirmation email sent to user: ${email}`);
      context.log('Message ID:', userResult.messageId);
    } catch (userError) {
      context.log.error('❌ Failed to send confirmation email to user:', userError.message);
      context.log.error('Full error:', JSON.stringify(userError));
      // Don't throw here - owner email was sent successfully
      context.log.warn('⚠️ Owner email was sent, but user confirmation failed');
    }

    sendJsonResponse(200, {
      success: true,
      message: isFeedback ? 'Feedback submitted successfully!' : 'Message sent successfully!'
    });

  } catch (error) {
    context.log.error('=== ERROR SENDING EMAIL ===');
    context.log.error('Error message:', error.message);
    context.log.error('Error stack:', error.stack);
    context.log.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    
    // Return detailed error for debugging (remove in production if needed)
    sendJsonResponse(500, {
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: error.message,
      errorType: error.constructor.name,
      // Include more details for debugging
      details: process.env.NODE_ENV === 'development' ? {
        stack: error.stack,
        code: error.code,
        command: error.command,
        response: error.response
      } : undefined
    });
  }
};

