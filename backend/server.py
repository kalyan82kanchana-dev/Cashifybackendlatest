from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
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

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

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
