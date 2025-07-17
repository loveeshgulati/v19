# Email Setup for Support System

The support system is now configured to send emails to `loveesh1gulati@gmail.com` when users submit support requests.

## Setup Instructions

### 1. Gmail Configuration

To enable email functionality, you need to configure Gmail with an app password:

1. Go to your Google Account settings
2. Navigate to "Security" tab
3. Enable "2-Step Verification" if not already enabled
4. Under "2-Step Verification", click on "App passwords"
5. Generate a new app password for "Mail"
6. Copy the generated 16-character password

### 2. Environment Variables

Update your `.env.local` file with the following variables:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

Replace:
- `your-email@gmail.com` with the Gmail account you want to send emails from
- `your-16-character-app-password` with the app password you generated

### 3. Current Behavior

- **With Email Configured**: Support requests are sent to `loveesh1gulati@gmail.com` and a confirmation email is sent to the user
- **Without Email Configured**: Support requests are logged to the console only (for development)

### 4. Testing

1. Navigate to `/support` page in your application
2. Fill out the support form
3. Submit the request
4. Check the console for logs or your email for the support request

## Email Content

The support team will receive an email with:
- User's name and email
- Subject line
- Category and priority
- Detailed description
- Timestamp

The user will receive a confirmation email acknowledging their request.

## Alternative Email Providers

If you prefer to use a different email provider instead of Gmail, update the transporter configuration in `/app/api/support/route.ts`:

```typescript
const transporter = nodemailer.createTransporter({
  host: 'your-smtp-host',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})
```
