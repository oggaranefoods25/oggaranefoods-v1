const nodemailer = require('nodemailer');

module.exports = async function (context, req) {
  context.log('Contact form submission received');

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

  try {
    const { name, email, phone, message, rating, product, review } = req.body;

    // Validate required fields
    if (!name || !email || (!message && !review)) {
      context.res = {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: { 
          success: false, 
          message: 'Missing required fields' 
        }
      };
      return;
    }

    // Determine if this is feedback or contact form
    const isFeedback = rating !== undefined;
    const subject = isFeedback 
      ? `New Customer Feedback - ${rating}/5 stars for ${product}`
      : `New Contact Form Submission from ${name}`;

    // Get email configuration from environment variables
    const smtpHost = process.env.SMTP_HOST || 'smtpout.secureserver.net';
    const smtpPort = parseInt(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER || 'support@oggaranefoods.com';
    const smtpPass = process.env.SMTP_PASS || '';
    const contactEmail = process.env.CONTACT_EMAIL || 'support@oggaranefoods.com';
    const fromAddress = process.env.AZURE_EMAIL_FROM_ADDRESS || smtpUser;

    // Configure SMTP transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

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
    const ownerMailOptions = {
      from: fromAddress,
      to: contactEmail,
      subject: subject,
      html: ownerHtml
    };

    await transporter.sendMail(ownerMailOptions);
    context.log(`✅ Email sent to business owner: ${contactEmail}`);

    // Send confirmation email to user
    const userSubject = isFeedback ? 'Thank you for your feedback!' : 'Thank you for contacting Oggarane Foods';
    const userMailOptions = {
      from: fromAddress,
      to: email,
      subject: userSubject,
      html: userHtml
    };

    await transporter.sendMail(userMailOptions);
    context.log(`✅ Confirmation email sent to user: ${email}`);

    context.res = {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: {
        success: true,
        message: isFeedback ? 'Feedback submitted successfully!' : 'Message sent successfully!'
      }
    };

  } catch (error) {
    context.log.error('Error sending email:', error);
    context.res = {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: {
        success: false,
        message: 'Failed to send email. Please try again later.',
        error: error.message
      }
    };
  }
};

