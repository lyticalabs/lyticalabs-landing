# 🚀 External API Setup Guide

Your forms are now configured to work with multiple external API providers for static deployment. Choose the option that works best for you:

## 📋 Quick Setup Options

### **Option 1: Formspree (Recommended - Free Tier Available)**

Formspree is the easiest solution for static sites with generous free tier.

#### Setup Steps:
1. **Sign up**: Go to [formspree.io](https://formspree.io) and create an account
2. **Create forms**:
   - Create a "Waitlist" form
   - Create a "Contact" form
3. **Get form IDs**: Copy the form IDs from your dashboard
4. **Update configuration**: In `src/lib/api.ts`, replace:
   ```typescript
   formspree: {
     waitlistEndpoint: 'https://formspree.io/f/YOUR_WAITLIST_ID',
     contactEndpoint: 'https://formspree.io/f/YOUR_CONTACT_ID',
   }
   ```

#### Features:
- ✅ 50 submissions/month (free)
- ✅ Spam protection
- ✅ Email notifications
- ✅ Data export
- ✅ Custom thank you pages

---

### **Option 2: EmailJS (Client-Side Email)**

Send emails directly from the browser without a backend.

#### Setup Steps:
1. **Sign up**: Go to [emailjs.com](https://www.emailjs.com) and create an account
2. **Add email service**: Connect your Gmail, Outlook, or other email provider
3. **Create email templates**:
   - Waitlist template: "New waitlist signup: {{email}}"
   - Contact template: "New contact from {{name}} ({{email}}): {{message}}"
4. **Get credentials**: Copy Service ID, Template IDs, and Public Key
5. **Install package**: 
   ```bash
   npm install @emailjs/browser
   ```
6. **Update configuration**: In `src/lib/api.ts`, replace:
   ```typescript
   emailjs: {
     serviceId: 'YOUR_SERVICE_ID',
     waitlistTemplateId: 'YOUR_WAITLIST_TEMPLATE_ID',
     contactTemplateId: 'YOUR_CONTACT_TEMPLATE_ID',
     publicKey: 'YOUR_PUBLIC_KEY',
   }
   ```

#### Features:
- ✅ 200 emails/month (free)
- ✅ Real-time delivery
- ✅ Template customization
- ✅ Multiple email providers

---

### **Option 3: Google Apps Script (Your Existing Setup)**

Continue using your existing Google Sheets integration.

#### Setup Steps:
1. **Update your Google Apps Script** to handle both form types:
   ```javascript
   function doPost(e) {
     const data = JSON.parse(e.postData.contents);
     const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID');
     
     if (data.type === 'waitlist') {
       const waitlistSheet = sheet.getSheetByName('Waitlist') || sheet.insertSheet('Waitlist');
       waitlistSheet.appendRow([data.email, data.timestamp]);
     } else if (data.type === 'contact') {
       const contactSheet = sheet.getSheetByName('Contact') || sheet.insertSheet('Contact');
       contactSheet.appendRow([data.name, data.email, data.company, data.message, data.timestamp]);
     }
     
     return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

2. **Get your script URL**: Deploy as web app and copy the URL
3. **Update configuration**: In `src/lib/api.ts`, replace:
   ```typescript
   googleScript: {
     waitlistEndpoint: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
     contactEndpoint: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
   }
   ```

#### Features:
- ✅ Free Google integration
- ✅ Direct to Google Sheets
- ✅ Custom processing
- ✅ No monthly limits

---

### **Option 4: Netlify Forms (If deploying to Netlify)**

Built-in form handling when you deploy to Netlify.

#### Setup Steps:
1. **Add to your forms**: Add `netlify` attribute to form elements:
   ```html
   <form netlify name="waitlist">
   <form netlify name="contact">
   ```

2. **Deploy to Netlify**: Forms are automatically detected and handled

#### Features:
- ✅ 100 submissions/month (free)
- ✅ Built-in spam protection
- ✅ Automatic detection
- ✅ Dashboard management

---

## 🔧 Configuration Priority

The API service tries providers in this order:
1. **Formspree** (most reliable)
2. **Google Apps Script** (your existing setup)
3. **EmailJS** (fallback)

If one fails, it automatically tries the next one.

## 🧪 Testing Your Setup

1. **Update the configuration** in `src/lib/api.ts` with your actual endpoints
2. **Build and test locally**:
   ```bash
   npm run build
   npm run export
   ```
3. **Test the forms** in the `out/` folder
4. **Deploy** to your hosting provider

## 📞 Need Help?

If you need help setting up any of these options, let me know which provider you'd prefer and I can walk you through the specific setup steps!

## 🚀 Quick Start Recommendation

For the fastest setup:
1. **Use Formspree** - Sign up and get your form IDs
2. **Update the configuration** in `src/lib/api.ts`
3. **Deploy** your static site

Your forms will work immediately with built-in spam protection and email notifications!