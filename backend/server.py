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

# Email sending function (you would integrate with Mailgun or similar service)
async def send_confirmation_email(email: str, customer_name: str, reference_number: str):
    try:
        # For now, we'll just log the email (replace with actual email service)
        print(f"Sending confirmation email to: {email}")
        print(f"Reference Number: {reference_number}")
        print(f"Customer Name: {customer_name}")
        
        # Here you would integrate with your email service (Mailgun, SendGrid, etc.)
        # email_html = generate_confirmation_email_html(customer_name, reference_number)
        # await send_email_via_service(email, subject, email_html)
        
        return True
    except Exception as e:
        print(f"Email sending failed: {e}")
        return False

# Internal notification email template for operations team
def generate_internal_notification_email(customer_name, reference_number, submission_data):
    cards_info = ""
    total_value = 0
    
    for i, card in enumerate(submission_data.get('cards', []), 1):
        card_value = float(card.get('value', 0)) if card.get('value', '').replace('.', '').isdigit() else 0
        total_value += card_value
        cards_info += f"""
        <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px; text-align: left;">{i}</td>
            <td style="padding: 12px; text-align: left;"><strong>{card.get('brand', 'N/A')}</strong></td>
            <td style="padding: 12px; text-align: left;">${card.get('value', '0')}</td>
            <td style="padding: 12px; text-align: left;">{card.get('condition', 'N/A').title()}</td>
            <td style="padding: 12px; text-align: left;">{"✅ Yes" if card.get('hasReceipt') == 'yes' else "❌ No"}</td>
            <td style="padding: 12px; text-align: left;">{card.get('cardType', 'N/A').title()}</td>
        </tr>"""
    
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Gift Card Submission</title>
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
            max-width: 800px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }}
        .header {{
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
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
            background-color: #dbeafe;
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 25px;
            border-left: 4px solid #3b82f6;
            text-align: center;
        }}
        .reference-number strong {{
            color: #1e40af;
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
            display: flex;
            align-items: center;
        }}
        .customer-info {{
            background-color: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }}
        .customer-info table {{
            width: 100%;
            border-collapse: collapse;
        }}
        .customer-info td {{
            padding: 8px 12px;
            border-bottom: 1px solid #e5e7eb;
        }}
        .customer-info td:first-child {{
            font-weight: 600;
            width: 30%;
            color: #374151;
        }}
        .cards-table {{
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
        }}
        .cards-table th {{
            background-color: #f3f4f6;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            color: #374151;
            border-bottom: 2px solid #e5e7eb;
        }}
        .urgent {{
            background-color: #fef2f2;
            border: 1px solid #fca5a5;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
        }}
        .urgent strong {{
            color: #dc2626;
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
            <h1>🚨 NEW GIFT CARD SUBMISSION</h1>
        </div>
        
        <div class="content">
            <div class="reference-number">
                <strong>Reference Number: {reference_number}</strong><br>
                <span style="font-size: 14px; color: #6b7280;">Submitted: {submission_data.get('submitted_at', 'Just Now')}</span>
            </div>
            
            <div class="urgent">
                <strong>⏰ ACTION REQUIRED:</strong> New gift card submission received and requires verification within 14 hours.
            </div>
            
            <div class="section">
                <h2 class="section-title">👤 Customer Information</h2>
                <div class="customer-info">
                    <table>
                        <tr>
                            <td><strong>Name:</strong></td>
                            <td>{customer_name}</td>
                        </tr>
                        <tr>
                            <td><strong>Email:</strong></td>
                            <td><a href="mailto:{submission_data.get('email')}">{submission_data.get('email')}</a></td>
                        </tr>
                        <tr>
                            <td><strong>Phone:</strong></td>
                            <td>{submission_data.get('phoneNumber', 'Not provided')}</td>
                        </tr>
                        <tr>
                            <td><strong>Payment Method:</strong></td>
                            <td>{submission_data.get('paymentMethod', 'Not specified').upper()}</td>
                        </tr>
                    </table>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">💳 Gift Card Details</h2>
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
                
                <div style="margin-top: 15px; padding: 15px; background-color: #ecfdf5; border-radius: 8px;">
                    <strong style="color: #065f46;">Total Submission Value: ${total_value:.2f}</strong>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">🔍 Next Actions Required</h2>
                <ol>
                    <li><strong>Verify gift card details</strong> - Check brand, value, and condition</li>
                    <li><strong>Review payment information</strong> - Confirm payout method details</li>
                    <li><strong>Process images</strong> - Verify uploaded card/receipt images</li>
                    <li><strong>Send status update</strong> - Respond within 14 hours timeline</li>
                    <li><strong>Update customer</strong> - Use reference number {reference_number}</li>
                </ol>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
                <p style="color: #6b7280; font-size: 14px;">
                    Customer confirmation email sent to: <strong>{submission_data.get('email')}</strong><br>
                    Customer Reference: <strong>{reference_number}</strong>
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p>&copy; 2025 Cashifygcmart Operations Team</p>
            <p>This is an automated notification for new gift card submissions.</p>
        </div>
    </div>
</body>
</html>
    """

# Send internal notification email to operations team
async def send_internal_notification_email(submission_data: dict, customer_name: str, reference_number: str):
    try:
        # Internal email settings - replace with your operations email
        operations_email = "operations@cashifygcmart.com"  # Replace with actual email
        
        print(f"Sending internal notification to: {operations_email}")
        print(f"New submission from: {customer_name}")
        print(f"Reference Number: {reference_number}")
        print(f"Customer Email: {submission_data.get('email')}")
        print(f"Cards Count: {len(submission_data.get('cards', []))}")
        
        # Here you would integrate with your email service
        # email_html = generate_internal_notification_email(customer_name, reference_number, submission_data)
        # subject = f"🚨 NEW SUBMISSION: {reference_number} - {customer_name}"
        # await send_email_via_service(operations_email, subject, email_html)
        
        return True
    except Exception as e:
        print(f"Internal notification email failed: {e}")
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
        submission_data["submitted_at"] = datetime.now()
        
        # Save to database
        result = await db.gift_card_submissions.insert_one(submission_data)
        
        # Send confirmation email
        customer_name = f"{submission.firstName} {submission.lastName}"
        email_sent = await send_confirmation_email(
            submission.email, 
            customer_name, 
            reference_number
        )
        
        return {
            "success": True,
            "reference_number": reference_number,
            "message": "Gift card submission received successfully",
            "email_sent": email_sent
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
