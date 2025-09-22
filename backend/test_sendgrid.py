#!/usr/bin/env python3
"""
Quick test script to verify SendGrid integration
Run this to test email functionality before going live
"""

import os
import asyncio
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Import our email functions
from server import send_confirmation_email, send_internal_notification_email

async def test_sendgrid_integration():
    """Test both customer and internal email functions"""
    
    print("🧪 Testing SendGrid Integration for Cashifygcmart")
    print("=" * 50)
    
    # Check if API key is configured
    api_key = os.environ.get('SENDGRID_API_KEY')
    if not api_key:
        print("❌ SENDGRID_API_KEY not found in environment variables")
        print("Please add your SendGrid API key to .env file")
        return False
    
    print(f"✅ SendGrid API key found: {api_key[:10]}...")
    
    # Test data
    test_customer_email = "test@example.com"  # Change this to your test email
    test_customer_name = "John Test"
    test_reference = "GC-TEST-123"
    
    test_submission_data = {
        'email': test_customer_email,
        'firstName': 'John',
        'lastName': 'Test',
        'phoneNumber': '555-0123',
        'paymentMethod': 'PAYPAL',
        'paypalAddress': 'john.test@paypal.com',
        'cards': [
            {
                'brand': 'Amazon',
                'value': '100.00',
                'condition': 'excellent',
                'hasReceipt': 'yes',
                'cardType': 'physical',
                'frontImage': None,  # In real scenario, this would have image data
                'backImage': None,
                'receiptImage': None
            }
        ],
        'submitted_at': '2025-01-11T12:00:00'
    }
    
    print("\n📧 Testing Customer Confirmation Email...")
    try:
        customer_result = await send_confirmation_email(
            test_customer_email, 
            test_customer_name, 
            test_reference
        )
        if customer_result:
            print("✅ Customer confirmation email sent successfully")
        else:
            print("❌ Customer confirmation email failed")
    except Exception as e:
        print(f"❌ Customer email error: {e}")
    
    print("\n📧 Testing Internal Notification Email...")
    try:
        internal_result = await send_internal_notification_email(
            test_submission_data,
            test_customer_name,
            test_reference
        )
        if internal_result:
            print("✅ Internal notification email sent successfully")
        else:
            print("❌ Internal notification email failed")
    except Exception as e:
        print(f"❌ Internal email error: {e}")
    
    print("\n" + "=" * 50)
    print("🎉 SendGrid integration test completed!")
    print("Check your email inboxes to verify delivery.")
    print("\nNote: Update test_customer_email in this script to test with your actual email.")

if __name__ == "__main__":
    asyncio.run(test_sendgrid_integration())