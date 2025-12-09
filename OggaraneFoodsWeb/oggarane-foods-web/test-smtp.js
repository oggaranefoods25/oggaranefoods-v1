import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Test SMTP configuration
const testSMTP = async () => {
  console.log('Testing SMTP Configuration...');
  console.log('SMTP Host:', process.env.SMTP_HOST);
  console.log('SMTP Port:', process.env.SMTP_PORT);
  console.log('SMTP User:', process.env.SMTP_USER);
  console.log('SMTP Pass:', process.env.SMTP_PASS ? '***hidden***' : 'NOT SET');
  console.log('Contact Email:', process.env.CONTACT_EMAIL);
  console.log('');

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    // Verify connection
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');

    // Send test email
    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: 'SMTP Test Email - Oggarane Foods',
      html: `
        <h2>SMTP Test Successful!</h2>
        <p>This is a test email to verify SMTP configuration for Oggarane Foods contact form.</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Server:</strong> ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}</p>
      `
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('');
    console.log('🎉 SMTP configuration is working correctly!');
    console.log('You can now test the contact form with real-time notifications.');

  } catch (error) {
    console.error('❌ SMTP test failed:');
    console.error('Error:', error.message);
    console.log('');
    console.log('Troubleshooting tips:');
    console.log('1. Check your .env file configuration');
    console.log('2. Ensure Gmail 2FA is enabled');
    console.log('3. Verify App Password is correct');
    console.log('4. Check firewall/network settings');
  }
};

testSMTP();
