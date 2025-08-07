import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { workEmail, firstName, lastName, companyName, companySize, country, message } = await request.json();

    // Validate required fields
    if (!workEmail || !firstName || !lastName || !companyName || !companySize || !country || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Prepare webhook payload matching the required format
    const webhookPayload = {
      email: workEmail,
      url: 'lyticalabs.ai',
      company: companyName,
      firstName,
      lastName,
      companySize,
      country,
      message
    };

    // Send data to webhook
    const webhookUrl = 'https://primary-production-b7da.up.railway.app/webhook/contact';
    
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      });

      if (!webhookResponse.ok) {
        const errorData = await webhookResponse.text();
        console.error('Failed to send data to webhook:', errorData);
        return NextResponse.json({ 
          success: false, 
          error: 'Failed to submit contact form. Please try again.' 
        }, { status: 500 });
      }

      console.log('Successfully sent contact data to webhook');
      return NextResponse.json({ success: true });

    } catch (webhookError) {
      console.error('Error sending to webhook:', webhookError);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to submit contact form. Please try again.' 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'An unexpected error occurred. Please try again.' 
    }, { status: 500 });
  }
}