# Local Development Setup

## Quick Start

To run the Azure Functions API locally for development:

### 1. Install Azure Functions Core Tools

**Windows (using npm):**
```bash
npm install -g azure-functions-core-tools@4 --unsafe-perm true
```

**Or using Chocolatey:**
```bash
choco install azure-functions-core-tools
```

**Or using winget:**
```bash
winget install Microsoft.AzureFunctionsCoreTools
```

### 2. Install Dependencies

```bash
cd api
npm install
```

### 3. Configure Local Settings

The `local.settings.json` file is already created with default values. **Update the SMTP credentials** if needed:

```json
{
  "IsEncrypted": false,
  "Values": {
    "SMTP_HOST": "smtpout.secureserver.net",
    "SMTP_PORT": "465",
    "SMTP_USER": "support@oggaranefoods.com",
    "SMTP_PASS": "YourActualPassword",
    "CONTACT_EMAIL": "support@oggaranefoods.com",
    "AZURE_EMAIL_FROM_ADDRESS": "support@oggaranefoods.com"
  }
}
```

**⚠️ Important:** `local.settings.json` is in `.gitignore` - it won't be committed to git.

### 4. Start Azure Functions Runtime

```bash
cd api
func start
```

The API will be available at: `http://localhost:7071/api/sendContactEmail`

### 5. Start Frontend Dev Server

In a **separate terminal**:

```bash
cd oggarane-foods-web
npm run dev
```

The frontend will be available at: `http://localhost:8080`

### 6. How It Works

- Frontend runs on port **8080**
- Azure Functions runs on port **7071**
- Vite proxy automatically forwards `/api/*` requests from port 8080 to port 7071
- When you submit the contact form, it goes: `Frontend (8080) → Proxy → Functions (7071)`

## Troubleshooting

### Port 7071 Already in Use?

If port 7071 is already in use, Azure Functions will automatically try the next available port. Check the console output for the actual port number, then update `vite.config.ts`:

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:7072', // Use the port shown in func start output
    // ...
  }
}
```

### Functions Not Starting?

1. Make sure you're in the `api` directory
2. Check that `package.json` and `host.json` exist
3. Verify Node.js version (Azure Functions v4 requires Node.js 18+)
4. Try deleting `node_modules` and reinstalling: `rm -rf node_modules && npm install`

### Still Getting 404?

1. **Verify Functions is running:** Check terminal where you ran `func start` - you should see:
   ```
   Functions:
       sendContactEmail: [POST] http://localhost:7071/api/sendContactEmail
   ```

2. **Check Vite proxy:** Make sure `vite.config.ts` has the proxy configuration

3. **Test API directly:** Try accessing `http://localhost:7071/api/sendContactEmail` directly in Postman/curl

4. **Restart both servers:** Stop both Vite and Functions, then restart them

### SMTP Connection Errors?

- Verify SMTP credentials in `local.settings.json`
- Check if GoDaddy email account is active
- Try port 587 instead of 465 (update both `local.settings.json` and `SMTP_PORT`)

## Production vs Development

- **Development:** Uses `local.settings.json` for environment variables
- **Production:** Uses Azure Portal → Configuration → Application settings

The same code works in both environments - only the configuration source changes.

