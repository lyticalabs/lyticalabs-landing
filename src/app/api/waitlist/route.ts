import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, timestamp } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Google Sheets Web App URL (you'll need to deploy a Google Apps Script)
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!GOOGLE_SHEETS_URL) {
      console.error('Google Sheets webhook URL not configured');
      // Return success to user even if sheets integration fails
      return NextResponse.json({ success: true });
    }

    // Submit to Google Sheets
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        timestamp,
      }),
    });

    if (!response.ok) {
      console.error('Failed to submit to Google Sheets:', response.statusText);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in waitlist API:', error);
    return NextResponse.json({ success: true }); // Return success to user even if there's an error
  }
}