# Email Setup Instructions for Contact Form

## Option 1: Resend (Recommended)

Resend is a modern email service that's easy to set up and reliable.

### Setup Steps:

1. **Sign up for Resend**
   - Go to https://resend.com
   - Create a free account
   - Verify your email address

2. **Add your domain (optional but recommended)**
   - In Resend dashboard, go to "Domains"
   - Add "lyticalabs.ai" 
   - Follow DNS setup instructions
   - This allows sending from "noreply@lyticalabs.ai"

3. **Get API Key**
   - Go to "API Keys" in Resend dashboard
   - Create a new API key
   - Copy the key (starts with "re_")

4. **Add to Environment Variables**
   - Add to your `.env.local` file:
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```

5. **Deploy and Test**
   - Deploy your application
   - Test the contact form
   - Emails will be sent to sales@lyticalabs.ai

## Option 2: Alternative Services

If you prefer a different email service, you can modify the `/api/contact/route.ts` file to use:

- **SendGrid**: Popular email service
- **Mailgun**: Reliable transactional emails
- **Amazon SES**: AWS email service
- **Nodemailer with SMTP**: Use any SMTP provider

## Current Implementation

The contact form collects:
- Work Email
- First Name
- Last Name  
- Company Name
- Company Size (dropdown: 1-10, 11-50, 51-200, 200+)
- Country
- Message (pre-filled with "How can we help?")

All information is sent as a formatted email to sales@lyticalabs.ai with the user's email as the reply-to address.

## Fallback Behavior

If email sending fails, the system will:
- Still show success message to the user
- Log errors to console for debugging
- Ensure good user experience even with configuration issues