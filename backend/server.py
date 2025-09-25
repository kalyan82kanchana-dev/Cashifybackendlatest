from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import ssl


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    message: str = "API is working"

class GiftCardSubmission(BaseModel):
    # Personal Information
    firstName: str
    lastName: str
    email: str
    phoneNumber: Optional[str] = ""
    
    # Gift Card Details (simplified for now - you can expand this)
    cards: List[dict]
    
    # Payment Information
    paymentMethod: str
    paypalAddress: Optional[str] = ""
    zelleDetails: Optional[str] = ""
    cashAppTag: Optional[str] = ""
    btcAddress: Optional[str] = ""
    chimeDetails: Optional[str] = ""

# Email Template Functions
def generate_confirmation_email_html(customer_name, reference_number):
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submission Received — Reference {reference_number}</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        body {{
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background-color: #f9fafb;
            padding: 20px 0;
        }}
        .email-container {{
            max-width: 650px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }}
        
        /* Header */
        .header {{
            background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #ec4899 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }}
        .logo {{
            font-size: 28px;
            font-weight: 800;
            margin-bottom: 8px;
        }}
        .tagline {{
            font-size: 12px;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 1px;
        }}
        .header h1 {{
            margin-top: 20px;
            font-size: 24px;
            font-weight: 600;
        }}
        
        /* Content */
        .content {{
            padding: 40px 30px;
        }}
        
        /* Text Styling */
        .greeting {{
            font-size: 18px;
            margin-bottom: 20px;
            color: #1f2937;
        }}
        
        .intro-text {{
            margin-bottom: 30px;
            color: #374151;
            font-size: 16px;
        }}
        
        .reference-highlight {{
            font-weight: 700;
            color: #ec4899;
        }}
        
        /* Section Headers */
        .section-header {{
            font-size: 20px;
            font-weight: 700;
            color: #1f2937;
            margin: 35px 0 20px 0;
            padding-bottom: 8px;
            border-bottom: 2px solid #ec4899;
        }}
        
        .section-text {{
            margin-bottom: 25px;
            color: #374151;
            font-size: 16px;
        }}
        
        /* Lists */
        .content-list {{
            margin: 20px 0;
            padding-left: 0;
            list-style: none;
        }}
        
        .content-list li {{
            margin-bottom: 15px;
            padding-left: 20px;
            position: relative;
            color: #374151;
            font-size: 16px;
        }}
        
        .content-list li::before {{
            content: "•";
            color: #ec4899;
            font-weight: bold;
            position: absolute;
            left: 0;
            font-size: 18px;
        }}
        
        .list-title {{
            font-weight: 600;
            color: #1f2937;
        }}
        
        /* Important Notice */
        .important-notice {{
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            border: 2px solid #f87171;
            border-radius: 12px;
            padding: 20px;
            margin: 25px 0;
        }}
        
        .important-text {{
            color: #7f1d1d;
            font-weight: 600;
            font-size: 16px;
        }}
        
        /* Disclaimer */
        .disclaimer {{
            background: #fef7ee;
            border-left: 4px solid #f59e0b;
            padding: 15px 20px;
            margin: 25px 0;
            font-style: italic;
            color: #92400e;
            font-size: 15px;
        }}
        
        /* Closing */
        .closing {{
            margin: 35px 0 25px 0;
            color: #374151;
            font-size: 16px;
        }}
        
        .closing-thanks {{
            margin: 25px 0;
            color: #374151;
            font-size: 16px;
        }}
        
        /* Footer */
        .footer {{
            background: #ffffff;
            color: #1f2937;
            padding: 40px 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }}
        .signature {{
            margin-bottom: 30px;
        }}
        .signature-name {{
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 6px;
            color: #1f2937;
        }}
        .signature-title {{
            color: #6b7280;
            font-size: 16px;
            font-weight: 500;
        }}
        .contact-section {{
            margin: 30px 0;
        }}
        .contact-info {{
            display: flex;
            justify-content: center;
            gap: 40px;
            flex-wrap: wrap;
            margin-bottom: 20px;
        }}
        .contact-item {{
            display: flex;
            align-items: center;
            gap: 8px;
            color: #374151;
            text-decoration: none;
            font-size: 15px;
            font-weight: 500;
            transition: color 0.3s ease;
        }}
        .contact-item:hover {{
            color: #ec4899;
        }}
        .contact-icon {{
            width: 18px;
            height: 18px;
            opacity: 0.7;
        }}
        .footer-divider {{
            width: 60px;
            height: 2px;
            background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
            margin: 20px auto;
            border-radius: 1px;
        }}
        .footer-note {{
            font-size: 13px;
            color: #6b7280;
            line-height: 1.6;
            max-width: 400px;
            margin: 0 auto;
        }}
        .footer-note a {{
            color: #ec4899;
            font-weight: 500;
            text-decoration: none;
        }}
        .footer-note a:hover {{
            text-decoration: underline;
        }}
        .copyright {{
            margin-bottom: 8px;
            font-weight: 500;
        }}
        
        /* Links */
        a {{
            color: #ec4899;
            text-decoration: none;
        }}
        a:hover {{
            text-decoration: underline;
        }}
        
        /* Mobile Responsive */
        @media (max-width: 640px) {{
            .email-container {{
                margin: 0 10px;
                border-radius: 12px;
            }}
            .header, .content, .footer {{
                padding: 24px 20px;
            }}
            .contact-info {{
                flex-direction: column;
                gap: 15px;
            }}
        }}
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">Cashifygcmart</div>
            <div class="tagline">Instant Offers, Same-Day Payments</div>
            <h1>Submission Received</h1>
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- Greeting and Introduction -->
            <div class="greeting">Hi {customer_name},</div>
            
            <div class="intro-text">
                Thanks — we've received your gift card submission. Your reference number is <span class="reference-highlight">{reference_number}</span>. Below is the current status and what to expect next.
            </div>
            
            <!-- Current Status -->
            <h2 class="section-header">Current status</h2>
            <div class="section-text">
                Our team is reviewing the gift card details you submitted to confirm accuracy and authenticity. This verification helps us keep the process safe and reliable for everyone.
            </div>
            
            <!-- Next Steps -->
            <h2 class="section-header">Next steps</h2>
            <ul class="content-list">
                <li><span class="list-title">When you'll hear from us:</span> Expect an update within 14 hours. Please check your inbox (and spam/junk folder).</li>
                <li><span class="list-title">If approved:</span> We'll email redemption instructions and the payout timeline.</li>
                <li><span class="list-title">If not approved:</span> You'll receive an explanation. If you still haven't heard from us 8 hours after the 14-hour window, please contact support so we can follow up.</li>
            </ul>
            
            <!-- Important Notice -->
            <div class="important-notice">
                <div class="important-text">Important: Please do not use the gift card while it's under review to avoid processing issues.</div>
            </div>
            
            <!-- Submission Guidelines -->
            <h2 class="section-header">Submission guidelines & processing</h2>
            <ul class="content-list">
                <li><span class="list-title">Eligible cards:</span> Only cards listed in our Rate Calculator are accepted.</li>
                <li><span class="list-title">Minimum value:</span> $50 per card.</li>
                <li><span class="list-title">Processing times:</span> Vary depending on demand and market conditions.</li>
                <li><span class="list-title">Sundays & late submissions:</span> Submissions on Sundays or after 8:00 PM EST are processed the next business day.</li>
                <li><span class="list-title">Payment methods:</span> Payout method may change depending on transaction outcome.</li>
                <li><span class="list-title">Unlisted cards:</span> Contact support before submitting cards not shown in the Rate Calculator.</li>
            </ul>
            
            <!-- Disclaimer -->
            <div class="disclaimer">
                <strong>Disclaimer:</strong> CashifyGCmart is not responsible for balance discrepancies on unlisted cards.
            </div>
            
            <!-- Closing Message -->
            <div class="closing">
                If you have questions or need help, reply to this email or contact our support team.
            </div>
            
            <div class="closing-thanks">
                Thanks for choosing CashifyGCmart — we'll be in touch soon.
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="signature">
                <div class="signature-name">Robert Smith</div>
                <div class="signature-title">Customer Support Manager</div>
            </div>
            
            <div class="footer-divider"></div>
            
            <div class="contact-section">
                <div class="contact-info">
                    <a href="mailto:support@cashifygcmart.com" class="contact-item">
                        <span class="contact-icon">📧</span>
                        <span>support@cashifygcmart.com</span>
                    </a>
                    <a href="https://www.cashifygcmart.com" class="contact-item">
                        <span class="contact-icon">🌐</span>
                        <span>www.cashifygcmart.com</span>
                    </a>
                </div>
            </div>
            
            <div class="footer-note">
                <div class="copyright">© 2025 Cashifygcmart. All rights reserved.</div>
                <div>Add <a href="mailto:support@cashifygcmart.com">support@cashifygcmart.com</a> to your contacts for best delivery.</div>
            </div>
        </div>
    </div>
</body>
</html>
    """

# Generate unique reference number
def generate_reference_number():
    timestamp = datetime.now().strftime("%H%M%S")
    random_num = random.randint(10, 99)
    return f"GC-{timestamp}-{random_num}"

# Resend email sending function for customer confirmation
async def send_confirmation_email(email: str, customer_name: str, reference_number: str):
    try:
        # Get SMTP settings from environment
        smtp_server = os.environ.get('SMTP_SERVER')
        smtp_port = int(os.environ.get('SMTP_PORT', 465))
        smtp_username = os.environ.get('SMTP_USERNAME')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        use_ssl = os.environ.get('SMTP_USE_SSL', 'true').lower() == 'true'
        
        if not all([smtp_server, smtp_username, smtp_password]):
            print("ERROR: SMTP settings not found in environment variables")
            return False
        
        # Generate email content
        email_html = generate_confirmation_email_html(customer_name, reference_number)
        subject = f"Gift Card Submission Confirmation - Reference #{reference_number}"
        
        # Create message
        msg = MIMEMultipart('alternative')
        msg['From'] = smtp_username
        msg['To'] = email
        msg['Subject'] = subject
        
        # Add HTML content
        html_part = MIMEText(email_html, 'html')
        msg.attach(html_part)
        
        # Send email via SMTP
        if use_ssl:
            # SSL connection
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(smtp_server, smtp_port, context=context) as server:
                server.login(smtp_username, smtp_password)
                server.send_message(msg)
        else:
            # TLS connection
            with smtplib.SMTP(smtp_server, smtp_port) as server:
                server.starttls(context=ssl.create_default_context())
                server.login(smtp_username, smtp_password)
                server.send_message(msg)
        
        print(f"✅ Customer confirmation email sent to: {email}")
        print(f"Reference Number: {reference_number}")
        return True
        
    except Exception as e:
        print(f"❌ SMTP email sending failed: {e}")
        return False

# Internal notification email template for operations team with images
def generate_internal_notification_email(customer_name, reference_number, submission_data):
    cards_info = ""
    total_value = 0
    
    for i, card in enumerate(submission_data.get('cards', []), 1):
        card_value = float(card.get('value', 0)) if card.get('value', '').replace('.', '').isdigit() else 0
        total_value += card_value
        
        # Image status indicators
        front_img_status = "✅ Uploaded" if card.get('frontImage') else "❌ Missing"
        back_img_status = "✅ Uploaded" if card.get('backImage') else "❌ Missing"
        receipt_img_status = "✅ Uploaded" if card.get('receiptImage') else "❌ Not Required" if card.get('hasReceipt') == 'no' else "❌ Missing"
        digital_code = card.get('digitalCode', 'N/A') if card.get('cardType') == 'digital' else 'N/A'
        digital_pin = card.get('digitalPin', 'N/A') if card.get('cardType') == 'digital' else 'N/A'
        
        cards_info += f"""
        <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px; text-align: left; font-weight: bold;">{i}</td>
            <td style="padding: 12px; text-align: left;"><strong>{card.get('brand', 'N/A')}</strong></td>
            <td style="padding: 12px; text-align: left;"><strong>${card.get('value', '0')}</strong></td>
            <td style="padding: 12px; text-align: left;">{card.get('condition', 'N/A').replace('-', ' ').title()}</td>
            <td style="padding: 12px; text-align: left;">{"✅ Yes" if card.get('hasReceipt') == 'yes' else "❌ No"}</td>
            <td style="padding: 12px; text-align: left;">{card.get('cardType', 'N/A').title()}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
            <td colspan="2" style="padding: 8px 12px; font-size: 12px;"><strong>Images:</strong></td>
            <td style="padding: 8px 12px; font-size: 12px;">Front: {front_img_status}</td>
            <td style="padding: 8px 12px; font-size: 12px;">Back: {back_img_status}</td>
            <td style="padding: 8px 12px; font-size: 12px;">Receipt: {receipt_img_status}</td>
            <td style="padding: 8px 12px; font-size: 12px;"></td>
        </tr>
        {"" if card.get('cardType') != 'digital' else f'''
        <tr style="background-color: #ecfef5;">
            <td colspan="3" style="padding: 8px 12px; font-size: 12px;"><strong>Digital Code:</strong> {digital_code}</td>
            <td colspan="3" style="padding: 8px 12px; font-size: 12px;"><strong>Digital PIN:</strong> {digital_pin}</td>
        </tr>
        '''}"""
    
    # Payment method details
    payment_details = ""
    payment_method = submission_data.get('paymentMethod', '').upper()
    if payment_method == 'PAYPAL':
        payment_details = f"PayPal Address: {submission_data.get('paypalAddress', 'Not provided')}"
    elif payment_method == 'ZELLE':
        payment_details = f"Zelle Details: {submission_data.get('zelleDetails', 'Not provided')}"
    elif payment_method == 'CASHAPP':
        payment_details = f"Cash App Tag: {submission_data.get('cashAppTag', 'Not provided')}"
    elif payment_method == 'BTC':
        payment_details = f"Bitcoin Address: {submission_data.get('btcAddress', 'Not provided')}"
    elif payment_method == 'CHIME':
        payment_details = f"Chime Details: {submission_data.get('chimeDetails', 'Not provided')}"
    
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Gift Card Submission - {reference_number}</title>
    <style>
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }}
        .email-container {{
            max-width: 900px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }}
        .header {{
            background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
            color: white;
            padding: 25px 20px;
            text-align: center;
        }}
        .header h1 {{
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }}
        .content {{
            padding: 25px;
        }}
        .reference-number {{
            background-color: #fee2e2;
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid #dc2626;
            text-align: center;
        }}
        .reference-number strong {{
            color: #dc2626;
            font-size: 18px;
        }}
        .section {{
            margin-bottom: 25px;
        }}
        .section-title {{
            color: #1e40af;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            background-color: #f0f9ff;
            padding: 8px 12px;
            border-radius: 6px;
        }}
        .customer-info {{
            background-color: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
        }}
        .customer-info table {{
            width: 100%;
            border-collapse: collapse;
        }}
        .customer-info td {{
            padding: 6px 12px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 14px;
        }}
        .customer-info td:first-child {{
            font-weight: 600;
            width: 25%;
            color: #374151;
        }}
        .cards-table {{
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
            font-size: 13px;
        }}
        .cards-table th {{
            background-color: #1f2937;
            color: white;
            padding: 10px 8px;
            text-align: left;
            font-weight: 600;
            font-size: 12px;
        }}
        .urgent {{
            background-color: #fef2f2;
            border: 2px solid #fca5a5;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }}
        .urgent strong {{
            color: #dc2626;
        }}
        .total-value {{
            background-color: #ecfdf5;
            border: 2px solid #a3e635;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            margin: 15px 0;
        }}
        .total-value strong {{
            color: #166534;
            font-size: 18px;
        }}
        .actions {{
            background-color: #fffbeb;
            border: 1px solid #fbbf24;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }}
        .footer {{
            background-color: #f9fafb;
            padding: 15px;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
        }}
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🚨 NEW GIFT CARD SUBMISSION RECEIVED</h1>
        </div>
        
        <div class="content">
            <div class="reference-number">
                <strong>Reference Number: {reference_number}</strong><br>
                <span style="font-size: 12px; color: #6b7280;">Submitted: {submission_data.get('submitted_at', 'Just Now')}</span>
            </div>
            
            <div class="urgent">
                <strong>⏰ IMMEDIATE ACTION REQUIRED:</strong> New submission requires verification and response within 14 hours per customer promise.
            </div>
            
            <div class="section">
                <h2 class="section-title">👤 CUSTOMER INFORMATION</h2>
                <div class="customer-info">
                    <table>
                        <tr>
                            <td><strong>Full Name:</strong></td>
                            <td><strong>{customer_name}</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Email Address:</strong></td>
                            <td><a href="mailto:{submission_data.get('email')}" style="color: #3b82f6;">{submission_data.get('email')}</a></td>
                        </tr>
                        <tr>
                            <td><strong>Phone Number:</strong></td>
                            <td>{submission_data.get('phoneNumber', 'Not provided')}</td>
                        </tr>
                        <tr>
                            <td><strong>Payment Method:</strong></td>
                            <td><strong>{payment_method}</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Payment Details:</strong></td>
                            <td>{payment_details}</td>
                        </tr>
                    </table>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">💳 GIFT CARD SUBMISSION DETAILS</h2>
                <table class="cards-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Brand</th>
                            <th>Value</th>
                            <th>Condition</th>
                            <th>Receipt</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards_info}
                    </tbody>
                </table>
            </div>
            
            <div class="total-value">
                <strong>💰 TOTAL SUBMISSION VALUE: ${total_value:.2f}</strong>
            </div>
            
            <div class="actions">
                <h3 style="margin: 0 0 10px 0; color: #92400e;">📋 REQUIRED ACTIONS:</h3>
                <ol style="margin: 0; padding-left: 20px; color: #92400e;">
                    <li><strong>Verify Images:</strong> Check all uploaded card images and receipts</li>
                    <li><strong>Validate Details:</strong> Confirm card brands, values, and conditions</li>
                    <li><strong>Process Payment Info:</strong> Verify {payment_method} details</li>
                    <li><strong>Calculate Rates:</strong> Apply current rates for approval/offer</li>
                    <li><strong>Respond to Customer:</strong> Email {submission_data.get('email')} within 14 hours</li>
                </ol>
            </div>
            
            <div style="background-color: #f0fdf4; padding: 12px; border-radius: 8px; text-align: center; font-size: 13px; color: #166534;">
                <strong>Customer Reference Number: {reference_number}</strong><br>
                Customer confirmation email automatically sent to: {submission_data.get('email')}
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #fee2e2; border-radius: 8px; border-left: 4px solid #dc2626;">
                <strong style="color: #dc2626;">⚠️ IMPORTANT:</strong> All uploaded images are attached to this email. Customer has been instructed not to use the gift card during review period.
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Cashifygcmart Operations Alert</strong></p>
            <p>This is an automated notification. Customer awaiting response within 14 hours.</p>
            <p>Forward to: marketingmanager3059@gmail.com</p>
        </div>
    </div>
</body>
</html>
    """

# Resend email sending function for internal notifications with attachments
async def send_internal_notification_email(submission_data: dict, customer_name: str, reference_number: str):
    try:
        # Get SMTP settings from environment
        smtp_server = os.environ.get('SMTP_SERVER')
        smtp_port = int(os.environ.get('SMTP_PORT', 465))
        smtp_username = os.environ.get('SMTP_USERNAME')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        use_ssl = os.environ.get('SMTP_USE_SSL', 'true').lower() == 'true'
        operations_email = os.environ.get('OPERATIONS_EMAIL')
        
        if not all([smtp_server, smtp_username, smtp_password, operations_email]):
            print("ERROR: SMTP settings or operations email not found in environment variables")
            return False
        
        # Calculate total value for subject line
        total_value = sum([float(card.get('value', 0)) if card.get('value', '').replace('.', '').isdigit() else 0 
                          for card in submission_data.get('cards', [])])
        
        # Generate email content
        email_html = generate_internal_notification_email(customer_name, reference_number, submission_data)
        subject = f"New Form Submission - Reference {reference_number} - {customer_name}"
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = smtp_username
        msg['To'] = operations_email
        msg['Subject'] = subject
        
        # Add HTML content
        html_part = MIMEText(email_html, 'html')
        msg.attach(html_part)
        
        # Process file attachments from uploaded images
        attachment_count = 0
        for i, card in enumerate(submission_data.get('cards', []), 1):
            # Handle front image
            if card.get('frontImage') and isinstance(card['frontImage'], dict):
                if 'data' in card['frontImage'] and 'name' in card['frontImage']:
                    try:
                        # Decode base64 image data
                        import base64
                        image_data = card['frontImage']['data']
                        if image_data.startswith('data:'):
                            # Remove data URL prefix
                            image_data = image_data.split(',')[1]
                        
                        # Decode base64
                        decoded_data = base64.b64decode(image_data)
                        
                        # Create attachment
                        attachment = MIMEBase('application', 'octet-stream')
                        attachment.set_payload(decoded_data)
                        encoders.encode_base64(attachment)
                        attachment.add_header(
                            'Content-Disposition',
                            f'attachment; filename=Card_{i}_Front_{card["frontImage"]["name"]}'
                        )
                        msg.attach(attachment)
                        attachment_count += 1
                    except Exception as e:
                        print(f"Failed to attach front image for card {i}: {e}")
            
            # Handle back image
            if card.get('backImage') and isinstance(card['backImage'], dict):
                if 'data' in card['backImage'] and 'name' in card['backImage']:
                    try:
                        import base64
                        image_data = card['backImage']['data']
                        if image_data.startswith('data:'):
                            image_data = image_data.split(',')[1]
                        
                        decoded_data = base64.b64decode(image_data)
                        
                        attachment = MIMEBase('application', 'octet-stream')
                        attachment.set_payload(decoded_data)
                        encoders.encode_base64(attachment)
                        attachment.add_header(
                            'Content-Disposition',
                            f'attachment; filename=Card_{i}_Back_{card["backImage"]["name"]}'
                        )
                        msg.attach(attachment)
                        attachment_count += 1
                    except Exception as e:
                        print(f"Failed to attach back image for card {i}: {e}")
            
            # Handle receipt image
            if card.get('receiptImage') and isinstance(card['receiptImage'], dict):
                if 'data' in card['receiptImage'] and 'name' in card['receiptImage']:
                    try:
                        import base64
                        image_data = card['receiptImage']['data']
                        if image_data.startswith('data:'):
                            image_data = image_data.split(',')[1]
                        
                        decoded_data = base64.b64decode(image_data)
                        
                        attachment = MIMEBase('application', 'octet-stream')
                        attachment.set_payload(decoded_data)
                        encoders.encode_base64(attachment)
                        attachment.add_header(
                            'Content-Disposition',
                            f'attachment; filename=Card_{i}_Receipt_{card["receiptImage"]["name"]}'
                        )
                        msg.attach(attachment)
                        attachment_count += 1
                    except Exception as e:
                        print(f"Failed to attach receipt image for card {i}: {e}")
        
        # Send email via SMTP
        if use_ssl:
            # SSL connection
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(smtp_server, smtp_port, context=context) as server:
                server.login(smtp_username, smtp_password)
                server.send_message(msg)
        else:
            # TLS connection
            with smtplib.SMTP(smtp_server, smtp_port) as server:
                server.starttls(context=ssl.create_default_context())
                server.login(smtp_username, smtp_password)
                server.send_message(msg)
        
        print(f"✅ Internal notification email sent to: {operations_email}")
        print(f"📎 Attachments included: {attachment_count}")
        print(f"Reference Number: {reference_number}")
        return True
        
    except Exception as e:
        print(f"❌ SMTP internal email sending failed: {e}")
        return False

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check():
    status_obj = StatusCheck()
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.post("/submit-gift-card")
async def submit_gift_card(submission: GiftCardSubmission):
    try:
        # Generate unique reference number
        reference_number = generate_reference_number()
        
        # Add metadata to submission
        submission_data = submission.dict()
        submission_data["reference_number"] = reference_number
        submission_data["status"] = "under_review"
        submission_data["submitted_at"] = datetime.now().isoformat()
        
        # Save to database
        await db.gift_card_submissions.insert_one(submission_data)
        
        # Send emails
        customer_name = f"{submission.firstName} {submission.lastName}"
        
        # 1. Send customer confirmation email
        customer_email_sent = await send_confirmation_email(
            submission.email, 
            customer_name, 
            reference_number
        )
        
        # 2. Send internal notification email to operations team
        internal_email_sent = await send_internal_notification_email(
            submission_data,
            customer_name, 
            reference_number
        )
        
        return {
            "success": True,
            "reference_number": reference_number,
            "message": "Gift card submission received successfully",
            "customer_email_sent": customer_email_sent,
            "internal_email_sent": internal_email_sent
        }
        
    except Exception as e:
        logging.error(f"Gift card submission error: {e}")
        return {
            "success": False,
            "message": "An error occurred while processing your submission"
        }

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
