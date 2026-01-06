# Email Troubleshooting Guide

## Issue: Not Receiving Emails

If you're not receiving emails after submitting the contact form, follow these steps:

### Step 1: Check Azure Function Logs

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your Static Web App
3. Go to **Functions** → **sendContactEmail**
4. Click **Monitor** or **Logs** to view function execution logs
5. Look for error messages or warnings

**What to look for:**
- `SMTP_PASS: ***NOT SET***` - Password not configured
- `SMTP verification failed` - Connection issue
- `Failed to send email` - Email sending error

### Step 2: Verify Environment Variables

In Azure Portal → Your Static Web App → Configuration → Application settings:

**Required Variables (recommended Office 365 SMTP):**
```
SMTP_HOST = smtp.office365.com
SMTP_PORT = 587
SMTP_USER = support@oggaranefoods.com
SMTP_PASS = <your-secure-password-or-app-password>
CONTACT_EMAIL = support@oggaranefoods.com
AZURE_EMAIL_FROM_ADDRESS = support@oggaranefoods.com
```

**Important:**
- Variable names are CASE-SENSITIVE
- No spaces before or after the `=` sign
- After adding/updating variables, **restart your Static Web App** (or wait a few minutes for changes to propagate)

### Step 3: Test the API Function Directly

1. Go to Azure Portal → Your Static Web App → Functions
2. Click on `sendContactEmail`
3. Click **Test/Run** or use the function URL
4. Send a test request:

```json
{
  "name": "Test User",
  "email": "your-test-email@example.com",
  "message": "Test message"
}
```

5. Check the logs for detailed error messages

### Step 4: Check Browser Console

1. Open your website
2. Open browser Developer Tools (F12)
3. Go to **Console** tab
4. Submit the contact form
5. Look for error messages

**Common errors:**
- `Failed to fetch` - API function not found or CORS issue
- `500 Internal Server Error` - Function execution error
- `Network error` - Connection issue

### Step 5: Verify Office 365 / SMTP Settings

**Office 365 SMTP Configuration (recommended):**
- **Server:** `smtp.office365.com`
- **Port:** `587` (STARTTLS)
- **Security:** TLS
- **Authentication:** Required (full email and password or app password)

**Test Mailbox:**
1. Try logging into `support@oggaranefoods.com` via Outlook / webmail
2. Verify the password is correct
3. Check if the account is active and not locked

### Step 6: Check Network Restrictions

Azure Static Web Apps may have network restrictions. Verify:
- Outbound SMTP connections are allowed
- Port 465 or 587 is not blocked
- No firewall rules blocking GoDaddy's SMTP server

### Step 7: Common Issues and Solutions

#### Issue: "SMTP_PASS: ***NOT SET***"
**Solution:** 
- Verify the environment variable is set in Azure Portal
- Check for typos in variable name
- Restart the Static Web App after adding variables

#### Issue: "SMTP verification failed"
**Solution:**
- Verify Office 365 email credentials are correct
- Check if the account is active and not locked
- Ensure SMTP AUTH is enabled for the mailbox (in Microsoft 365 admin)

#### Issue: "Failed to send email" with timeout
**Solution:**
- Verify outbound SMTP is allowed from your Azure environment
- Ensure no firewall rules block `smtp.office365.com:587`

#### Issue: Function not found (404)
**Solution:**
- Verify `api_location: "oggarane-foods-web/api"` in GitHub Actions workflow
- Check that `api/` folder is in your repository
- Redeploy the application

#### Issue: CORS errors
**Solution:**
- The function already includes CORS headers
- If issues persist, check browser console for specific CORS errors
- Verify the request is going to the correct endpoint

### Step 8: Enable Detailed Logging

The updated function now includes detailed logging. Check Azure Function logs for:
- Environment variable values (password is masked)
- SMTP connection status
- Email sending attempts
- Detailed error messages

### Step 9: Test with Different Email Service

If GoDaddy SMTP continues to fail, consider:
1. **SendGrid** - Free tier available, Azure-friendly
2. **Mailgun** - Developer-friendly
3. **Office 365 SMTP** - If you have Office 365

### Step 10: Contact Support

If none of the above works:
1. Collect Azure Function logs
2. Collect browser console errors
3. Note the exact error messages
4. Contact Azure support or check Azure Static Web Apps documentation

## Quick Checklist

- [ ] Environment variables set in Azure Portal
- [ ] Static Web App restarted after adding variables
- [ ] GoDaddy email account is active
- [ ] GoDaddy password is correct
- [ ] API function is deployed (check Functions list)
- [ ] Browser console shows no errors
- [ ] Azure Function logs show detailed information
- [ ] Test request to function works

## Getting Help

1. **Azure Function Logs:** Azure Portal → Static Web App → Functions → Logs
2. **Browser Console:** F12 → Console tab
3. **Network Tab:** F12 → Network tab → Look for `/api/sendContactEmail` request

