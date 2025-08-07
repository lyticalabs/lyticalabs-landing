/**
 * External API service for form submissions
 * Supports multiple providers for static deployment
 */

export interface WaitlistData {
  email: string;
  timestamp: string;
}

export interface ContactData {
  name: string;
  email: string;
  company?: string;
  message: string;
  timestamp: string;
}

// Configuration - Replace with your actual endpoints
const API_CONFIG = {
  // Option 1: Netlify Forms (if deploying to Netlify)
  netlify: {
    waitlistEndpoint: '/__forms.html',
    contactEndpoint: '/__forms.html',
  },
  
  // Option 2: Formspree (Universal)
  formspree: {
    waitlistEndpoint: 'https://formspree.io/f/YOUR_WAITLIST_ID',
    contactEndpoint: 'https://formspree.io/f/YOUR_CONTACT_ID',
  },
  
  // Option 3: Google Apps Script (Your existing setup)
  googleScript: {
    waitlistEndpoint: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
    contactEndpoint: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
  },
  
  // Option 4: EmailJS (Client-side)
  emailjs: {
    serviceId: 'YOUR_SERVICE_ID',
    waitlistTemplateId: 'YOUR_WAITLIST_TEMPLATE_ID',
    contactTemplateId: 'YOUR_CONTACT_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY',
  }
};

/**
 * Submit to waitlist using Formspree (recommended for static sites)
 */
export async function submitToWaitlistFormspree(data: WaitlistData): Promise<boolean> {
  try {
    const response = await fetch(API_CONFIG.formspree.waitlistEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Formspree waitlist error:', error);
    return false;
  }
}

/**
 * Submit contact form using Formspree
 */
export async function submitContactFormspree(data: ContactData): Promise<boolean> {
  try {
    const response = await fetch(API_CONFIG.formspree.contactEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Formspree contact error:', error);
    return false;
  }
}

/**
 * Submit using Google Apps Script (your existing method)
 */
export async function submitToGoogleScript(data: WaitlistData | ContactData, type: 'waitlist' | 'contact'): Promise<boolean> {
  try {
    const response = await fetch(API_CONFIG.googleScript.waitlistEndpoint, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        type, // Add type to distinguish between forms
      }),
    });
    
    // Note: no-cors mode means we can't read the response
    // Assume success if no error thrown
    return true;
  } catch (error) {
    console.error('Google Script error:', error);
    return false;
  }
}

/**
 * Submit using EmailJS (client-side email service)
 */
export async function submitViaEmailJS(data: WaitlistData | ContactData, type: 'waitlist' | 'contact'): Promise<boolean> {
  try {
    // Dynamically import EmailJS to avoid SSR issues
    const emailjs = await import('@emailjs/browser');
    
    const templateId = type === 'waitlist' 
      ? API_CONFIG.emailjs.waitlistTemplateId 
      : API_CONFIG.emailjs.contactTemplateId;
    
    const response = await emailjs.send(
      API_CONFIG.emailjs.serviceId,
      templateId,
      data as any,
      API_CONFIG.emailjs.publicKey
    );
    
    return response.status === 200;
  } catch (error) {
    console.error('EmailJS error:', error);
    return false;
  }
}

/**
 * Main submission function with fallback providers
 */
export async function submitWaitlist(email: string): Promise<boolean> {
  const data: WaitlistData = {
    email,
    timestamp: new Date().toISOString(),
  };

  // Try providers in order of preference
  const providers = [
    () => submitToWaitlistFormspree(data),
    () => submitToGoogleScript(data, 'waitlist'),
    () => submitViaEmailJS(data, 'waitlist'),
  ];

  for (const provider of providers) {
    try {
      const success = await provider();
      if (success) return true;
    } catch (error) {
      console.warn('Provider failed, trying next:', error);
      continue;
    }
  }

  return false;
}

/**
 * Main contact form submission with fallback providers
 */
export async function submitContact(contactData: Omit<ContactData, 'timestamp'>): Promise<boolean> {
  const data: ContactData = {
    ...contactData,
    timestamp: new Date().toISOString(),
  };

  // Try providers in order of preference
  const providers = [
    () => submitContactFormspree(data),
    () => submitToGoogleScript(data, 'contact'),
    () => submitViaEmailJS(data, 'contact'),
  ];

  for (const provider of providers) {
    try {
      const success = await provider();
      if (success) return true;
    } catch (error) {
      console.warn('Provider failed, trying next:', error);
      continue;
    }
  }

  return false;
}