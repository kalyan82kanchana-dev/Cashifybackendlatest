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
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background-color: #f9fafb;
            padding: 20px 0;
        }
        .email-container {
            max-width: 650px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        /* Header */
        .header {
            background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #ec4899 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
        }
        .logo {
            font-size: 28px;
            font-weight: 800;
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
        }
        .tagline {
            font-size: 12px;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 1px;
            position: relative;
            z-index: 1;
        }
        .header h1 {
            margin-top: 20px;
            font-size: 24px;
            font-weight: 600;
            position: relative;
            z-index: 1;
        }
        
        /* Content */
        .content {
            padding: 40px 30px;
        }
        
        /* Status Card */
        .status-card {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 2px solid #0ea5e9;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
            position: relative;
        }
        .status-card::before {
            content: '✓';
            position: absolute;
            top: -12px;
            left: 24px;
            background: #0ea5e9;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
        }
        .status-title {
            font-size: 18px;
            font-weight: 700;
            color: #0c4a6e;
            margin-bottom: 8px;
        }
        .reference-number {
            font-size: 20px;
            font-weight: 800;
            color: #ec4899;
            font-family: 'Monaco', 'Consolas', monospace;
            margin-bottom: 12px;
        }
        .status-text {
            color: #1e40af;
            font-weight: 500;
            background: rgba(255, 255, 255, 0.8);
            padding: 12px;
            border-radius: 8px;
            margin-top: 12px;
        }
        
        /* Section Cards */
        .section-card {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            margin-bottom: 24px;
            overflow: hidden;
        }
        .section-header {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 20px 24px;
            border-bottom: 1px solid #e5e7eb;
        }
        .section-title {
            font-size: 18px;
            font-weight: 700;
            color: #1f2937;
            display: flex;
            align-items: center;
        }
        .section-icon {
            margin-right: 12px;
            font-size: 20px;
        }
        .section-content {
            padding: 24px;
        }
        
        /* Next Steps */
        .steps-list {
            list-style: none;
            counter-reset: step-counter;
        }
        .steps-list li {
            counter-increment: step-counter;
            position: relative;
            padding: 16px 0 16px 50px;
            border-bottom: 1px solid #f3f4f6;
        }
        .steps-list li:last-child {
            border-bottom: none;
        }
        .steps-list li::before {
            content: counter(step-counter);
            position: absolute;
            left: 0;
            top: 16px;
            background: #ec4899;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
        }
        .step-title {
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 4px;
        }
        .step-description {
            color: #6b7280;
            font-size: 14px;
        }
        
        /* Important Notice */
        .important-notice {
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            border: 2px solid #f87171;
            border-radius: 12px;
            padding: 20px;
            margin: 24px 0;
            position: relative;
        }
        .important-notice::before {
            content: '⚠️';
            position: absolute;
            top: -12px;
            left: 20px;
            background: #ef4444;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
        }
        .important-title {
            font-weight: 700;
            color: #dc2626;
            margin-bottom: 8px;
        }
        .important-text {
            color: #7f1d1d;
            font-weight: 500;
        }
        
        /* Guidelines Grid */
        .guidelines-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 16px;
            margin-top: 16px;
        }
        .guideline-item {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
        }
        .guideline-title {
            font-weight: 600;
            color: #1e40af;
            margin-bottom: 6px;
            font-size: 14px;
        }
        .guideline-text {
            color: #64748b;
            font-size: 13px;
        }
        
        /* Footer */
        .footer {
            background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
            color: white;
            padding: 32px 30px;
            text-align: center;
        }
        .signature {
            margin-bottom: 24px;
            padding-bottom: 24px;
            border-bottom: 1px solid #4b5563;
        }
        .signature-name {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 4px;
        }
        .signature-title {
            color: #d1d5db;
            font-size: 14px;
        }
        .contact-section {
            display: flex;
            justify-content: center;
            gap: 32px;
            margin-bottom: 24px;
            flex-wrap: wrap;
        }
        .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #d1d5db;
            text-decoration: none;
            font-size: 14px;
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            transition: all 0.3s ease;
        }
        .contact-item:hover {
            background: rgba(255, 255, 255, 0.2);
            color: white;
        }
        .footer-note {
            font-size: 12px;
            color: #9ca3af;
            line-height: 1.5;
        }
        
        /* Mobile Responsive */
        @media (max-width: 640px) {
            .email-container {
                margin: 0 10px;
                border-radius: 12px;
            }
            .header, .content, .footer {
                padding: 24px 20px;
            }
            .status-card, .section-content {
                padding: 16px;
            }
            .contact-section {
                flex-direction: column;
                gap: 12px;
            }
            .guidelines-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">Cashifygcmart</div>
            <div class="tagline">Instant Offers, Same-Day Payments</div>
            <h1>Submission Received Successfully!</h1>
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- Status Card -->
            <div class="status-card">
                <div class="status-title">Hello ${customerName},</div>
                <div class="reference-number">Reference: ${referenceNumber}</div>
                <div class="status-text">
                    Your gift card submission has been received and is now under review by our verification team.
                </div>
            </div>
            
            <!-- Next Steps Section -->
            <div class="section-card">
                <div class="section-header">
                    <div class="section-title">
                        <span class="section-icon">🚀</span>
                        What Happens Next
                    </div>
                </div>
                <div class="section-content">
                    <ul class="steps-list">
                        <li>
                            <div class="step-title">Verification Process</div>
                            <div class="step-description">Our team reviews your submission within 2-4 hours during business hours</div>
                        </li>
                        <li>
                            <div class="step-title">Email Notification</div>
                            <div class="step-description">You'll receive a quote or additional information request at <strong>${submissionData.email}</strong></div>
                        </li>
                        <li>
                            <div class="step-title">Quick Payment</div>
                            <div class="step-description">Upon approval, payment is processed the same business day</div>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- Important Notice -->
            <div class="important-notice">
                <div class="important-title">Important Notice</div>
                <div class="important-text">
                    Please do not use or redeem your gift card while it's under review. This ensures smooth processing and prevents any complications with your submission.
                </div>
            </div>
            
            <!-- Guidelines Section -->
            <div class="section-card">
                <div class="section-header">
                    <div class="section-title">
                        <span class="section-icon">📋</span>
                        Processing Guidelines
                    </div>
                </div>
                <div class="section-content">
                    <div class="guidelines-grid">
                        <div class="guideline-item">
                            <div class="guideline-title">Processing Hours</div>
                            <div class="guideline-text">Monday-Saturday, 9 AM - 8 PM EST<br>Sunday submissions reviewed Monday</div>
                        </div>
                        <div class="guideline-item">
                            <div class="guideline-title">Minimum Value</div>
                            <div class="guideline-text">$50 per card<br>Only cards listed in Rate Calculator accepted</div>
                        </div>
                        <div class="guideline-item">
                            <div class="guideline-title">Response Time</div>
                            <div class="guideline-text">Updates within 2-4 hours<br>Check inbox and spam folders</div>
                        </div>
                        <div class="guideline-item">
                            <div class="guideline-title">Questions?</div>
                            <div class="guideline-text">Include reference number ${referenceNumber}<br>in all correspondence</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="signature">
                <div class="signature-name">Robert Smith</div>
                <div class="signature-title">Customer Success Manager</div>
            </div>
            
            <div class="contact-section">
                <a href="mailto:support@cashifygcmart.com" class="contact-item">
                    <span>📧</span>
                    <span>support@cashifygcmart.com</span>
                </a>
                <a href="https://www.cashifygcmart.com" class="contact-item">
                    <span>🌐</span>
                    <span>www.cashifygcmart.com</span>
                </a>
            </div>
            
            <div class="footer-note">
                © 2025 Cashifygcmart. All rights reserved.<br>
                Add support@cashifygcmart.com to your contacts for best delivery.
            </div>
        </div>
    </div>
</body>
</html>`;

  return emailHTML;
};

// Plain text version for email clients that don't support HTML
export const generateSubmissionConfirmationText = (customerName, referenceNumber, submissionData) => {
  return `CASHIFYGCMART - SUBMISSION RECEIVED SUCCESSFULLY
========================================================

Hello ${customerName},

Your gift card submission has been received and is now under review.

REFERENCE NUMBER: ${referenceNumber}
STATUS: Under Review

WHAT HAPPENS NEXT:
==================
1. VERIFICATION PROCESS
   Our team reviews your submission within 2-4 hours during business hours.

2. EMAIL NOTIFICATION
   You'll receive a quote or additional information request at ${submissionData.email}.

3. QUICK PAYMENT
   Upon approval, payment is processed the same business day.

⚠️ IMPORTANT NOTICE
==================
Please do not use or redeem your gift card while it's under review. This ensures smooth processing and prevents any complications with your submission.

PROCESSING GUIDELINES:
=====================
• Processing Hours: Monday-Saturday, 9 AM - 8 PM EST
• Sunday submissions reviewed Monday
• Minimum Value: $50 per card
• Only cards listed in Rate Calculator accepted
• Response Time: Updates within 2-4 hours
• Check inbox and spam folders
• Include reference number ${referenceNumber} in all correspondence

CONTACT INFORMATION:
===================
📧 Email: support@cashifygcmart.com
🌐 Website: www.cashifygcmart.com

Best regards,
Robert Smith
Customer Success Manager

© 2025 Cashifygcmart. All rights reserved.
Add support@cashifygcmart.com to your contacts for best delivery.`;
};