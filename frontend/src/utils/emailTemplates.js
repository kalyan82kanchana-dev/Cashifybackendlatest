// Email template for submission confirmation
export const generateSubmissionConfirmationEmail = (customerName, referenceNumber, submissionData) => {
  const emailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gift Card Submission Confirmation</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 26px;
            font-weight: 600;
        }
        .content {
            padding: 30px;
        }
        .reference-number {
            background-color: #f8fafc;
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 25px;
            border-left: 4px solid #ec4899;
        }
        .reference-number strong {
            color: #ec4899;
            font-size: 18px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            color: #1e40af;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        .section-title::before {
            content: "📋";
            margin-right: 8px;
        }
        .next-steps::before {
            content: "📌";
        }
        .guidelines::before {
            content: "📝";
        }
        .guidelines-list {
            background-color: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            margin-top: 15px;
        }
        .guidelines-list ul {
            margin: 0;
            padding-left: 20px;
        }
        .guidelines-list li {
            margin-bottom: 8px;
        }
        .important {
            background-color: #fef2f2;
            border: 1px solid #fca5a5;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .important strong {
            color: #dc2626;
        }
        .signature {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
        }
        .contact-info {
            background-color: #f0fdf4;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
        }
        .contact-info a {
            color: #ec4899;
            text-decoration: none;
        }
        .contact-info a:hover {
            text-decoration: underline;
        }
        .footer {
            background-color: #f9fafb;
            padding: 20px;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Thank You for Your Submission, ${customerName}</h1>
        </div>
        
        <div class="content">
            <div class="reference-number">
                <strong>Reference Number: ${referenceNumber}</strong>
            </div>
            
            <p>Thank you for submitting your gift card details to <strong>Cashifygcmart</strong>. Below is an update on the current status of your submission.</p>
            
            <div class="section">
                <h2 class="section-title">Current Status</h2>
                <p>Our team is currently reviewing the gift card details you provided. This process ensures all submissions meet our standards for accuracy and authenticity. Your cooperation helps us maintain the trust and quality our customers rely on.</p>
            </div>
            
            <div class="section">
                <h2 class="section-title next-steps">Next Steps</h2>
                <ul>
                    <li><strong>Notification Timeline:</strong> You will receive an update within 14 hours. Please check your inbox and spam/junk folders.</li>
                    <li><strong>If Approved:</strong> We'll provide redemption details and timelines in the follow-up email.</li>
                    <li><strong>If Not Approved:</strong> If no response is received within 8 hours, it may indicate your submission wasn't approved. Contact us for clarification.</li>
                </ul>
            </div>
            
            <div class="important">
                <strong>Important:</strong> Do not use your gift card during the review period to avoid processing issues.
            </div>
            
            <div class="section">
                <h2 class="section-title guidelines">Gift Card Submission Guidelines</h2>
                <div class="guidelines-list">
                    <ul>
                        <li><strong>Eligible Cards:</strong> Only those listed in our Rate Calculator.</li>
                        <li><strong>Minimum Value:</strong> $50 per card.</li>
                        <li><strong>Processing Times:</strong> Vary based on demand and market conditions.</li>
                        <li><strong>Sundays:</strong> Submissions are processed on the next business day.</li>
                        <li><strong>After 8 PM EST:</strong> Processed the following day.</li>
                        <li><strong>Payment Methods:</strong> May be updated based on transaction success.</li>
                        <li><strong>Unlisted Cards:</strong> Contact support before submission.</li>
                        <li><strong>Disclaimer:</strong> Cashifygcmart is not responsible for balance discrepancies on unlisted cards.</li>
                    </ul>
                </div>
            </div>
            
            <p>Thank you again for choosing <strong>Cashifygcmart</strong>. Our support team is always here to help.</p>
            
            <div class="signature">
                <p>Best regards,</p>
                <p><strong>Robert Smith</strong><br>
                Customer Support Manager</p>
                
                <div class="contact-info">
                    <p>📧 <a href="mailto:support@cashifygcmart.com">support@cashifygcmart.com</a></p>
                    <p>🌐 <a href="https://www.cashifygcmart.com">www.cashifygcmart.com</a></p>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>&copy; 2025 Cashifygcmart. All rights reserved.</p>
            <p>Please add support@cashifygcmart.com to your contacts to ensure our emails reach your inbox.</p>
        </div>
    </div>
</body>
</html>`;

  return emailHTML;
};

// Plain text version for email clients that don't support HTML
export const generateSubmissionConfirmationText = (customerName, referenceNumber, submissionData) => {
  return `
Thank You for Your Submission, ${customerName}

Reference Number: ${referenceNumber}

Thank you for submitting your gift card details to Cashifygcmart. Below is an update on the current status of your submission.

CURRENT STATUS
Our team is currently reviewing the gift card details you provided. This process ensures all submissions meet our standards for accuracy and authenticity. Your cooperation helps us maintain the trust and quality our customers rely on.

NEXT STEPS
• Notification Timeline: You will receive an update within 14 hours. Please check your inbox and spam/junk folders.
• If Approved: We'll provide redemption details and timelines in the follow-up email.
• If Not Approved: If no response is received within 8 hours, it may indicate your submission wasn't approved. Contact us for clarification.

IMPORTANT: Do not use your gift card during the review period to avoid processing issues.

GIFT CARD SUBMISSION GUIDELINES
• Eligible Cards: Only those listed in our Rate Calculator.
• Minimum Value: $50 per card.
• Processing Times: Vary based on demand and market conditions.
• Sundays: Submissions are processed on the next business day.
• After 8 PM EST: Processed the following day.
• Payment Methods: May be updated based on transaction success.
• Unlisted Cards: Contact support before submission.
• Disclaimer: Cashifygcmart is not responsible for balance discrepancies on unlisted cards.

Thank you again for choosing Cashifygcmart. Our support team is always here to help.

Best regards,
Robert Smith
Customer Support Manager

📧 support@cashifygcmart.com
🌐 www.cashifygcmart.com

---
© 2025 Cashifygcmart. All rights reserved.
Please add support@cashifygcmart.com to your contacts to ensure our emails reach your inbox.
`;
};