# Azure Functions API Setup

This directory contains Azure Functions that run as part of your Azure Static Web App.

## Functions

### sendContactEmail
Handles contact form submissions and sends emails via GoDaddy SMTP.

**Endpoint:** `/api/sendContactEmail`  
**Method:** POST  
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Your message here"
}
```

For feedback submissions:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "rating": 5,
  "product": "Sambar Powder",
  "review": "Great product!"
}
```

## Environment Variables

Configure these in Azure Portal → Your Static Web App → Configuration → Application settings:

- `SMTP_HOST` = `smtpout.secureserver.net`
- `SMTP_PORT` = `465`
- `SMTP_USER` = `support@oggaranefoods.com`
- `SMTP_PASS` = `P@$$word@Ogg@r@ne`
- `CONTACT_EMAIL` = `support@oggaranefoods.com`
- `AZURE_EMAIL_FROM_ADDRESS` = `support@oggaranefoods.com`

## Local Development

To test locally, you'll need Azure Functions Core Tools:

```bash
npm install -g azure-functions-core-tools@4
func start
```

Then your API will be available at `http://localhost:7071/api/sendContactEmail`

