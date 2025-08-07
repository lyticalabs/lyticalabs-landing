/**
 * Google Apps Script for Lytica Labs Waitlist
 * 
 * Instructions:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Paste this code into Code.gs
 * 4. Replace SHEET_ID with your actual Google Sheet ID: 1rglhbkAY93VFt2rb1ayNOkJrKOes1dkH-n5Z-oFCueo
 * 5. Deploy as web app with execute permissions for "Anyone"
 * 6. Copy the web app URL and add it to your .env.local as GOOGLE_SHEETS_WEBHOOK_URL
 */

const SHEET_ID = '1rglhbkAY93VFt2rb1ayNOkJrKOes1dkH-n5Z-oFCueo';
const SHEET_NAME = 'Sheet1'; // Change if your sheet has a different name

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const { email, timestamp } = data;
    
    if (!email) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Email is required' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Add headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 2).setValues([['Email', 'Timestamp']]);
    }
    
    // Add the new entry
    sheet.appendRow([email, new Date(timestamp)]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional)
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        email: 'test@example.com',
        timestamp: new Date().toISOString()
      })
    }
  };
  
  const result = doPost(testData);
  console.log(result.getContent());
}