# Resend Email Integration for Cashifygcmart

## Overview
The backend has been updated to use Resend for sending emails instead of SendGrid. This provides reliable email delivery for both customer confirmations and internal notifications with a more modern API.

## Features Implemented

### 1. Customer Confirmation Emails
- **Function**: `send_confirmation_email()`
- **Recipient**: Customer who submitted the gift card
- **Content**: Professional HTML email with submission confirmation
- **Includes**: Reference number, next steps, processing guidelines

### 2. Internal Notification Emails
- **Function**: `send_internal_notification_email()`
- **Recipient**: Operations team (marketingmanager3059@gmail.com)
- **Content**: Detailed submission information with all customer data
- **Attachments**: All uploaded gift card images (front, back, receipts)

## Setup Instructions

### 1. Get Resend API Key
1. Sign up at [Resend](https://resend.com/)
2. Go to API Keys in your dashboard
3. Create a new API key
4. Copy the API key

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env`
2. Add your Resend API key:
   ```
   RESEND_API_KEY=your_actual_api_key_here
   ```

### 3. Verify Sender Domain
1. In Resend dashboard, go to Domains
2. Add and verify the domain `cashifygcmart.com`
3. Follow DNS verification steps

### 4. Install Dependencies
Dependencies are automatically installed from requirements.txt:
```bash
pip install httpx>=0.25.0
```

## Email Templates

### Customer Confirmation Email
- **From**: support@cashifygcmart.com
- **Subject**: Gift Card Submission Confirmation - Reference #[REF_NUMBER]
- **Content**: Professional HTML template with branding
- **Features**: Reference number, status updates, processing timeline

### Internal Notification Email
- **From**: support@cashifygcmart.com
- **To**: marketingmanager3059@gmail.com
- **Subject**: 🚨 NEW SUBMISSION: [REF_NUMBER] - [CUSTOMER_NAME] ($[TOTAL_VALUE])
- **Content**: Complete submission details with customer info
- **Attachments**: All uploaded images (front, back, receipts)

## File Attachment Handling

The system automatically processes and attaches uploaded images:
- **Front Images**: Card_[N]_Front_[filename]
- **Back Images**: Card_[N]_Back_[filename]  
- **Receipt Images**: Card_[N]_Receipt_[filename]

Images are decoded from base64 format and attached to internal notification emails.

## Error Handling

- Graceful fallback if Resend API key is missing
- Individual attachment failures don't stop email sending
- Detailed logging for debugging
- Returns success/failure status for each email type

## Testing

To test the email functionality:
1. Ensure RESEND_API_KEY is set in environment
2. Verify sender domain in Resend dashboard
3. Submit a test gift card through the frontend
4. Check both customer and operations email addresses

## Production Considerations

1. **Rate Limits**: Resend has generous rate limits
2. **Sender Reputation**: Use verified domain for better deliverability
3. **Monitoring**: Check Resend dashboard for delivery statistics
4. **Backup**: Consider fallback email service for critical notifications

## Support

For Resend-related issues:
- Check Resend dashboard for delivery logs
- Verify API key permissions
- Ensure sender domain is verified
- Review Resend documentation: https://resend.com/docs