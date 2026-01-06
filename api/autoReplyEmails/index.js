const axios = require('axios');
const nodemailer = require('nodemailer');

/**
 * Timer-triggered function that:
 * 1. Reads unread emails from the support@oggaranefoods.com inbox via Microsoft Graph
 * 2. Sends an automatic SMTP reply to each new sender
 * 3. Marks the original messages as read so we don't reply twice
 *
 * No HTTP trigger or public API is exposed.
 */
module.exports = async function (context, myTimer) {
  const timestamp = new Date().toISOString();
  context.log(`autoReplyEmails function started at ${timestamp}`);

  // Configuration from environment variables (set in Azure Function App)
  const supportEmail = process.env.SUPPORT_EMAIL || 'support@oggaranefoods.com';

  const smtpHost = process.env.SMTP_HOST || 'smtp.office365.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpUser = process.env.SMTP_USER || supportEmail;
  const smtpPass = process.env.SMTP_PASS;

  const tenantId = process.env.GRAPH_TENANT_ID;
  const clientId = process.env.GRAPH_CLIENT_ID;
  const clientSecret = process.env.GRAPH_CLIENT_SECRET;

  // Basic configuration validation
  if (!smtpPass) {
    context.log.error('SMTP_PASS is not configured. Skipping auto-reply processing.');
    return;
  }
  if (!tenantId || !clientId || !clientSecret) {
    context.log.error('GRAPH_TENANT_ID / GRAPH_CLIENT_ID / GRAPH_CLIENT_SECRET not fully configured. Skipping auto-reply processing.');
    return;
  }

  // Prepare SMTP transporter (Office 365 or other SMTP service)
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for 587
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.verify();
    context.log('✅ SMTP connection verified for auto-reply function');
  } catch (verifyErr) {
    context.log.error('❌ SMTP verification failed in autoReplyEmails:', verifyErr.message);
    return;
  }

  // Helper: acquire app-only access token for Microsoft Graph
  async function getGraphAccessToken() {
    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('grant_type', 'client_credentials');
    params.append('scope', 'https://graph.microsoft.com/.default');

    const response = await axios.post(tokenUrl, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return response.data.access_token;
  }

  // Helper: Microsoft Graph client
  async function graphRequest(accessToken, method, url, data) {
    const response = await axios.request({
      method,
      url: `https://graph.microsoft.com/v1.0${url}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data,
    });
    return response.data;
  }

  try {
    const accessToken = await getGraphAccessToken();
    context.log('✅ Obtained Microsoft Graph access token');

    // 1. Get unread messages from the support inbox
    // Limit to a small batch each run to keep execution fast
    const inboxUrl = `/users/${encodeURIComponent(
      supportEmail
    )}/mailFolders/Inbox/messages?$filter=isRead eq false&$top=10`;

    const messagesResponse = await graphRequest(accessToken, 'GET', inboxUrl);
    const messages = messagesResponse.value || [];

    if (messages.length === 0) {
      context.log('No unread messages found for auto-reply.');
      return;
    }

    context.log(`Found ${messages.length} unread message(s) for auto-reply.`);

    // 2. Process each unread message
    for (const message of messages) {
      const messageId = message.id;
      const fromAddress =
        message.from &&
        message.from.emailAddress &&
        message.from.emailAddress.address;

      if (!fromAddress) {
        context.log.warn(
          `Message ${messageId} has no valid From address. Skipping.`
        );
        continue;
      }

      // Avoid replying to our own address to prevent loops
      if (fromAddress.toLowerCase() === supportEmail.toLowerCase()) {
        context.log.warn(
          `Message ${messageId} is from the support inbox itself. Skipping to avoid loops.`
        );
        continue;
      }

      context.log(
        `Processing message ${messageId} from ${fromAddress} for auto-reply.`
      );

      // 2a. Send auto-reply via SMTP
      const autoReplyText =
        'Thank you for contacting Oggarane Foods. We have received your message and will reach out to you within 48 hours.';

      const mailOptions = {
        from: supportEmail,
        to: fromAddress,
        subject: 'We received your message - Oggarane Foods',
        text: autoReplyText,
        html: `<p>${autoReplyText}</p>`,
      };

      try {
        const sendResult = await transporter.sendMail(mailOptions);
        context.log(
          `✅ Auto-reply sent to ${fromAddress}. Message ID: ${sendResult.messageId}`
        );
      } catch (smtpErr) {
        context.log.error(
          `❌ Failed to send auto-reply to ${fromAddress}:`,
          smtpErr.message
        );
        // Don't mark as read so we can retry next run
        continue;
      }

      // 2b. Mark the original message as read so we don't auto-reply again
      try {
        await graphRequest(
          accessToken,
          'PATCH',
          `/users/${encodeURIComponent(
            supportEmail
          )}/messages/${encodeURIComponent(messageId)}`,
          {
            isRead: true,
          }
        );
        context.log(`Marked message ${messageId} as read.`);
      } catch (patchErr) {
        context.log.error(
          `❌ Failed to mark message ${messageId} as read:`,
          patchErr.message
        );
      }
    }
  } catch (err) {
    context.log.error('autoReplyEmails function failed:', err.message);
  } finally {
    context.log(`autoReplyEmails function completed at ${new Date().toISOString()}`);
  }
};


