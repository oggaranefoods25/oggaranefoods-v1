import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { EmailClient } from '@azure/communication-email';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Get allowed origins from environment or use defaults
// For production: Set ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
// You can specify multiple origins separated by commas
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : ["http://localhost:8080", "http://localhost:8081", "http://localhost:8082", "http://localhost:8083", "http://localhost:8084", "http://localhost:8085", "http://localhost:8086", "http://localhost:8087"];

console.log('Allowed CORS origins:', allowedOrigins);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        console.warn('Blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Azure Communication Services Email Configuration
let emailClient = null;
if (process.env.AZURE_COMMUNICATION_SERVICES_CONNECTION_STRING) {
  try {
    emailClient = new EmailClient(process.env.AZURE_COMMUNICATION_SERVICES_CONNECTION_STRING);
    console.log('✅ Azure Communication Services Email client initialized');
  } catch (error) {
    console.warn('⚠️ Failed to initialize Azure Email client:', error.message);
  }
} else {
  console.warn('⚠️ Azure Communication Services connection string not provided');
}

// SMTP Configuration (GoDaddy Email)
// This is used for sending emails via GoDaddy SMTP
const smtpPort = parseInt(process.env.SMTP_PORT) || 465;
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
  port: smtpPort,
  secure: smtpPort === 465, // true for 465 (SSL), false for 587 (STARTTLS)
  auth: {
    user: process.env.SMTP_USER || 'support@oggaranefoods.com',
    pass: process.env.SMTP_PASS || ''
  }
});

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.log('SMTP Error:', error);
  } else {
    console.log('SMTP Server is ready to take our messages');
  }
});

// Email sending helper function with Azure Email primary and SMTP fallback
async function sendEmail(to, subject, html, fromAddress) {
  // Try Azure Communication Services Email first
  if (emailClient) {
    try {
      const emailMessage = {
        senderAddress: fromAddress,
        recipients: {
          to: [{ address: to }],
        },
        content: {
          subject: subject,
          html: html,
        },
      };

      const response = await emailClient.beginSend(emailMessage);
      const result = await response.pollUntilDone();
      
      console.log(`✅ Email sent via Azure Email Service to ${to}:`, result.id);
      return {
        success: true,
        method: 'Azure Email',
        messageId: result.id,
      };
    } catch (azureError) {
      console.warn(`⚠️ Azure Email Service failed for ${to}, falling back to SMTP:`, azureError.message);
      
      // Fallback to SMTP
      try {
        const smtpOptions = {
          from: fromAddress,
          to: to,
          subject: subject,
          html: html,
        };

        const smtpInfo = await transporter.sendMail(smtpOptions);
        console.log(`✅ Email sent via SMTP (fallback) to ${to}:`, smtpInfo.messageId);
        return {
          success: true,
          method: 'SMTP',
          messageId: smtpInfo.messageId,
          fallbackUsed: true,
        };
      } catch (smtpError) {
        console.error(`❌ Both Azure Email and SMTP failed for ${to}:`, smtpError.message);
        throw new Error(`Email sending failed: Azure error - ${azureError.message}, SMTP error - ${smtpError.message}`);
      }
    }
  } else {
    // Azure Email not configured, use SMTP only
    try {
      const smtpOptions = {
        from: fromAddress,
        to: to,
        subject: subject,
        html: html,
      };

      const smtpInfo = await transporter.sendMail(smtpOptions);
      console.log(`✅ Email sent via SMTP to ${to}:`, smtpInfo.messageId);
      return {
        success: true,
        method: 'SMTP',
        messageId: smtpInfo.messageId,
      };
    } catch (smtpError) {
      console.error(`❌ SMTP failed for ${to}:`, smtpError.message);
      throw new Error(`Email sending failed: ${smtpError.message}`);
    }
  }
}

// Store connected clients
const connectedClients = new Set();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  connectedClients.add(socket.id);

  // Send notification to all connected clients
  const sendNotification = (type, data) => {
    io.emit('notification', {
      type,
      data,
      timestamp: new Date().toISOString()
    });
  };

  // Handle contact form submission
  socket.on('contact-submission', async (formData) => {
    try {
      console.log('Contact form submission received:', formData);

      // Determine if this is a feedback submission or regular contact form
      const isFeedback = formData.rating !== undefined;
      const subject = isFeedback 
        ? `New Customer Feedback - ${formData.rating}/5 stars for ${formData.product}`
        : `New Contact Form Submission from ${formData.name}`;

      const fromAddress = process.env.AZURE_EMAIL_FROM_ADDRESS || process.env.SMTP_USER || 'support@oggaranefoods.com';
      const ownerEmail = process.env.CONTACT_EMAIL || 'support@oggaranefoods.com';

      // Prepare HTML bodies (reuse existing templates)
      const ownerHtml = `
          <h2>${isFeedback ? 'New Customer Feedback' : 'New Contact Form Submission'}</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
          ${isFeedback ? `
            <p><strong>Product:</strong> ${formData.product}</p>
            <p><strong>Rating:</strong> ${formData.rating}/5 stars</p>
            <p><strong>Review:</strong></p>
            <blockquote style="border-left: 4px solid #ccc; margin: 10px 0; padding-left: 15px; font-style: italic;">
              ${formData.review}
            </blockquote>
          ` : `
            <p><strong>Message:</strong></p>
            <p>${formData.message}</p>
          `}
          <hr>
          <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
          <p><em>Sent via Oggarane Foods ${isFeedback ? 'Feedback Form' : 'Contact Form'}</em></p>
        `;

      const userHtml = `
          <h2>${isFeedback ? 'Thank you for your valuable feedback!' : 'Thank you for contacting Oggarane Foods!'}</h2>
          <p>Dear ${formData.name},</p>
          ${isFeedback ? `
            <p>We truly appreciate you taking the time to share your experience with our ${formData.product}.</p>
            <p><strong>Your ${formData.rating}/5 star rating:</strong></p>
            <blockquote style="border-left: 4px solid #ccc; margin: 10px 0; padding-left: 15px; font-style: italic;">
              ${formData.review}
            </blockquote>
            <p>Your feedback helps us improve our products and services. ${formData.rating < 3.5 ? 'We will personally follow up with you to address any concerns.' : 'We\'re thrilled you enjoyed our product!'}</p>
          ` : `
            <p>We have received your message and will get back to you within <strong>24–48 hours</strong>.</p>
            <p><strong>Your message:</strong></p>
            <blockquote style="border-left: 4px solid #ccc; margin: 10px 0; padding-left: 15px; font-style: italic;">
              ${formData.message}
            </blockquote>
          `}
          <p>Best regards,<br>Oggarane Foods Team</p>
          <hr>
          <p><em>This is an automated response from our ${isFeedback ? 'feedback' : 'contact form'} system.</em></p>
        `;

      // Send email to business owner
      const ownerResp = await sendEmail(
        ownerEmail,
        subject,
        ownerHtml,
        fromAddress
      );

      // Send confirmation email to the person who submitted the form
      const userSubject = isFeedback ? 'Thank you for your feedback!' : 'Thank you for contacting Oggarane Foods';
      const userResp = await sendEmail(
        formData.email,
        userSubject,
        userHtml,
        fromAddress
      );

      // Log if fallback was used
      if (ownerResp.fallbackUsed || userResp.fallbackUsed) {
        console.warn('⚠️ Email fallback to SMTP was used:', {
          owner: ownerResp.fallbackUsed ? 'SMTP' : 'Azure Email',
          user: userResp.fallbackUsed ? 'SMTP' : 'Azure Email'
        });
      }

      // Send real-time notification
      sendNotification(isFeedback ? 'feedback-success' : 'contact-success', {
        message: isFeedback ? 'Customer feedback submitted successfully!' : 'Contact form submitted successfully!',
        userEmail: formData.email,
        submissionId: ownerResp.messageId,
        emailMethod: ownerResp.method,
        ...(isFeedback && { rating: formData.rating, product: formData.product })
      });

      // If it's feedback, also broadcast to all clients for real-time review updates
      if (isFeedback) {
        io.emit('new-review', {
          name: formData.name,
          rating: formData.rating,
          review: formData.review,
          product: formData.product,
          timestamp: new Date().toISOString()
        });
      }

      // Acknowledge to sender
      socket.emit('contact-response', {
        success: true,
        message: isFeedback ? 'Feedback submitted successfully!' : 'Message sent successfully!',
        submissionId: ownerResp.messageId
      });

    } catch (error) {
      console.error('Error processing contact form:', error);
      
      // Send error notification
      sendNotification('contact-error', {
        message: 'Failed to process submission',
        error: error.message
      });

      // Acknowledge error to sender
      socket.emit('contact-response', {
        success: false,
        message: 'Failed to send message. Please try again.',
        error: error.message
      });
    }
  });

  // Handle notification subscription
  socket.on('subscribe-notifications', (data) => {
    console.log('Client subscribed to notifications:', socket.id, data);
    socket.join('notifications');
    
    // Send confirmation
    socket.emit('notification-subscribed', {
      message: 'Successfully subscribed to notifications',
      timestamp: new Date().toISOString()
    });
  });

  // Handle notification unsubscription
  socket.on('unsubscribe-notifications', () => {
    console.log('Client unsubscribed from notifications:', socket.id);
    socket.leave('notifications');
    
    // Send confirmation
    socket.emit('notification-unsubscribed', {
      message: 'Successfully unsubscribed from notifications',
      timestamp: new Date().toISOString()
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    connectedClients.delete(socket.id);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    connectedClients: connectedClients.size,
    timestamp: new Date().toISOString()
  });
});

// Email service status endpoint
app.get('/email-status', async (req, res) => {
  const status = {
    azureEmail: {
      configured: !!emailClient,
      status: emailClient ? 'configured' : 'not configured'
    },
    smtp: {
      configured: true,
      host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
      status: 'unknown'
    },
    timestamp: new Date().toISOString()
  };

  try {
    // Verify SMTP connection
    await transporter.verify();
    status.smtp.status = 'online';
  } catch (error) {
    status.smtp.status = 'offline';
    status.smtp.error = error.message;
  }

  res.json(status);
});

// Test email endpoint
app.post('/test-email', async (req, res) => {
  try {
    const testTo = process.env.CONTACT_EMAIL || process.env.SMTP_USER || 'support@oggaranefoods.com';
    const testFrom = process.env.AZURE_EMAIL_FROM_ADDRESS || process.env.SMTP_USER || 'support@oggaranefoods.com';
    const testSubject = 'Email Service Test - Oggarane Foods';
    const testHtml = '<h2>Email Service Test Successful!</h2><p>This is a test email to verify email service configuration.</p><p><strong>Service:</strong> GoDaddy SMTP (with Azure Email fallback if configured)</p>';

    const result = await sendEmail(testTo, testSubject, testHtml, testFrom);
    
    res.json({
      success: true,
      message: 'Test email sent successfully',
      method: result.method,
      messageId: result.messageId,
      fallbackUsed: result.fallbackUsed || false
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send test email',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.IO server ready for connections`);
});
