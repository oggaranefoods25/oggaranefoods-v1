# Email Integration Deployment Guide

## ✅ Implementation Complete

The email integration has been successfully implemented using Azure Static Web Apps API Functions. The system now works directly within your website without requiring a separate backend server.

## What Was Implemented

1. **Azure Functions API** (`api/sendContactEmail/`)
   - Serverless function that handles contact form submissions
   - Sends emails via GoDaddy SMTP
   - Automatically sends confirmation emails to users

2. **Frontend Updates**
   - Contact form now calls `/api/sendContactEmail` directly
   - Feedback form also uses the same API
   - Removed Socket.IO dependency
   - Simplified NotificationContext

3. **GitHub Actions Workflow**
   - Updated to include API functions location
   - Automatically deploys API functions with your static site

## Required Configuration in Azure Portal

### Step 1: Configure Environment Variables

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your Static Web App
3. Go to **Settings** → **Configuration**
4. Click **Application settings**
5. Add the following environment variables:

```
SMTP_HOST = smtpout.secureserver.net
SMTP_PORT = 465
SMTP_USER = support@oggaranefoods.com
SMTP_PASS = P@$$word@Ogg@r@ne
CONTACT_EMAIL = support@oggaranefoods.com
AZURE_EMAIL_FROM_ADDRESS = support@oggaranefoods.com
```

6. Click **Save** to apply changes

### Step 2: Deploy to Production

1. Push your changes to the `main` branch
2. GitHub Actions will automatically:
   - Build your frontend
   - Deploy API functions
   - Deploy everything to Azure Static Web Apps

### Step 3: Test the Integration

1. Visit your live website
2. Submit the contact form
3. Check `support@oggaranefoods.com` for the inquiry email
4. Verify the user receives a confirmation email

## How It Works

1. **User submits contact form** → Frontend sends POST request to `/api/sendContactEmail`
2. **Azure Function receives request** → Validates data and prepares emails
3. **Sends inquiry email** → To `support@oggaranefoods.com` with user's message
4. **Sends confirmation email** → To user with "24–48 hours" response time message
5. **Returns success response** → Frontend shows success message

## Features

✅ **No separate backend needed** - Everything runs in Azure Static Web Apps  
✅ **Automatic email sending** - Every form submission triggers emails  
✅ **Confirmation emails** - Users automatically receive acknowledgment  
✅ **24–48 hour message** - Included in confirmation emails  
✅ **GoDaddy email integration** - Uses your support@oggaranefoods.com account  
✅ **Serverless & scalable** - Automatically handles traffic spikes  

## Troubleshooting

### Emails not sending?

1. Check environment variables in Azure Portal
2. Verify GoDaddy email credentials are correct
3. Check Azure Functions logs in Azure Portal
4. Ensure SMTP_PORT is set to 465 (SSL) or 587 (STARTTLS)

### API function not found?

1. Verify `api_location: "oggarane-foods-web/api"` in GitHub Actions workflow
2. Check that `api/` folder is in your repository
3. Ensure API functions are deployed (check Azure Portal → Functions)

### CORS errors?

- The API function already includes CORS headers
- If issues persist, check browser console for specific errors

## Support

For issues or questions, check:
- Azure Functions logs in Azure Portal
- Browser console for frontend errors
- Network tab to see API requests/responses

