import { NextRequest, NextResponse } from 'next/server';

/**
 * Waitlist API route that submits email to Railway webhook
 * Provides proper success/error feedback for professional UX
 */
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Railway webhook URL
    const RAILWAY_WEBHOOK_URL = 'https://primary-production-b7da.up.railway.app/webhook/join-waitlist';

    // Submit to Railway webhook
    const response = await fetch(RAILWAY_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        timestamp: new Date().toISOString(),
      }),
    });

    // Parse response from Railway webhook
    let webhookData;
    try {
      webhookData = await response.json();
    } catch (parseError) {
      console.error('Failed to parse Railway webhook response:', parseError);
      webhookData = null;
    }

    if (!response.ok) {
      console.error('Failed to submit to Railway webhook:', response.status, response.statusText, webhookData);
      
      // Check for specific error types from Railway webhook
      if (response.status === 409 || (webhookData && webhookData.error && webhookData.error.includes('already'))) {
        // Email already exists
        return NextResponse.json({ 
          success: false,
          error: 'You are already on the waitlist',
          errorType: 'duplicate'
        }, { status: 409 });
      }
      
      // Generic error
      return NextResponse.json({
        success: false,
        error: 'Failed to join waitlist. Please try again.',
        errorType: 'generic'
      }, { status: 500 });
    }

    // Success response
    const successMessage = webhookData?.message || 'Successfully joined the waitlist!';
    return NextResponse.json({ 
      success: true, 
      message: successMessage
    });
  } catch (error) {
    console.error('Error in waitlist API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' }, 
      { status: 500 }
    );
  }
}