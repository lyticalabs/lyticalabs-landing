import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { workEmail, firstName, lastName, companyName, companySize, country, message } = await request.json();

    // Validate required fields
    if (!workEmail || !firstName || !lastName || !companyName || !companySize || !country || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Create email content
    const emailContent = {
      to: 'sales@lyticalabs.ai',
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${firstName} ${lastName}</p>
        <p><strong>Work Email:</strong> ${workEmail}</p>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Company Size:</strong> ${companySize}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
      `,
      text: `
New Contact Form Submission

From: ${firstName} ${lastName}
Work Email: ${workEmail}
Company: ${companyName}
Company Size: ${companySize}
Country: ${country}

Message:
${message}

Submitted on: ${new Date().toLocaleString()}
      `
    };

    // Use Resend API for sending emails
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.error('Resend API key not configured');
      // Return success to user even if email service isn't configured
      return NextResponse.json({ success: true });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Contact Form <noreply@lyticalabs.ai>',
        to: ['sales@lyticalabs.ai'],
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
        reply_to: workEmail,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Failed to send email via Resend:', errorData);
      
      // Fallback: Try using a webhook or alternative method
      // For now, we'll still return success to the user
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json({ success: true }); // Return success to user even if there's an error
  }
}