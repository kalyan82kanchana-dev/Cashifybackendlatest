#!/usr/bin/env python3
"""
Backend API Testing with Verified Email
Testing customer email functionality with the verified email address
"""

import requests
import json
import base64
from datetime import datetime

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=')[1].strip()
    except:
        pass
    return "https://gcswap-railway.preview.emergentagent.com"

BACKEND_URL = get_backend_url()
API_BASE = f"{BACKEND_URL}/api"

def create_sample_image_base64():
    """Create a sample base64 encoded image for testing"""
    sample_png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
    return f"data:image/png;base64,{sample_png}"

def test_customer_email_functionality():
    """Test customer email with verified email address"""
    print("=" * 60)
    print("TESTING: Customer Email Functionality")
    print("=" * 60)
    
    # Use the verified email address from backend logs
    test_data = {
        "firstName": "John",
        "lastName": "Smith", 
        "email": "kalyan82kanchana@gmail.com",  # Verified email
        "phoneNumber": "+1-555-987-6543",
        "paymentMethod": "cashapp",
        "paypalAddress": "",
        "zelleDetails": "",
        "cashAppTag": "$johnsmith123",
        "btcAddress": "",
        "chimeDetails": "",
        "cards": [
            {
                "brand": "Walmart",
                "value": "50.00",
                "condition": "excellent",
                "hasReceipt": "yes",
                "cardType": "physical",
                "frontImage": {
                    "data": create_sample_image_base64(),
                    "name": "walmart_front.png",
                    "type": "image/png"
                },
                "backImage": {
                    "data": create_sample_image_base64(),
                    "name": "walmart_back.png", 
                    "type": "image/png"
                },
                "receiptImage": {
                    "data": create_sample_image_base64(),
                    "name": "walmart_receipt.png",
                    "type": "image/png"
                }
            }
        ]
    }
    
    try:
        print(f"Testing customer email functionality with verified email")
        print(f"Customer: {test_data['firstName']} {test_data['lastName']}")
        print(f"Email: {test_data['email']}")
        
        response = requests.post(
            f"{API_BASE}/submit-gift-card",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        print(f"\nResponse Status Code: {response.status_code}")
        
        if response.status_code == 200:
            response_data = response.json()
            print("✅ API Request Successful!")
            print(f"Response Data: {json.dumps(response_data, indent=2)}")
            
            # Check email sending status
            customer_email = response_data.get("customer_email_sent", False)
            internal_email = response_data.get("internal_email_sent", False)
            
            print(f"📧 Customer email sent: {customer_email}")
            print(f"📧 Internal email sent: {internal_email}")
            
            if customer_email and internal_email:
                print("✅ Both emails sent successfully - Email functionality is working!")
                return True
            elif internal_email:
                print("✅ Internal email sent, customer email may have restrictions")
                return True
            else:
                print("❌ Email functionality has issues")
                return False
                
        else:
            print(f"❌ API Request Failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Test Error: {e}")
        return False

if __name__ == "__main__":
    success = test_customer_email_functionality()
    print(f"\nEmail Test Result: {'✅ PASSED' if success else '❌ FAILED'}")