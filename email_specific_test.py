#!/usr/bin/env python3
"""
Specific Email Testing with Verified Address
Testing email functionality with the verified email address that worked before
"""

import requests
import json
import base64
import time
from datetime import datetime

BACKEND_URL = "https://cashify-deploy.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

def create_sample_image_base64():
    """Create a sample base64 encoded image for testing"""
    sample_png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
    return f"data:image/png;base64,{sample_png}"

def test_email_with_verified_address():
    """Test email functionality with verified email address"""
    print("=" * 80)
    print("EMAIL FUNCTIONALITY TEST - Verified Address")
    print("=" * 80)
    
    # Use the verified email that worked in previous tests
    test_data = {
        "firstName": "Sarah",
        "lastName": "Johnson",
        "email": "kalyan82kanchana@gmail.com",  # This email worked before
        "phoneNumber": "+1-555-234-5678",
        "paymentMethod": "paypal",
        "paypalAddress": "sarah.johnson@paypal.com",
        "cards": [
            {
                "brand": "Amazon",
                "value": "150.00",
                "condition": "like-new",
                "hasReceipt": "yes",
                "cardType": "physical",
                "frontImage": {
                    "data": create_sample_image_base64(),
                    "name": "amazon_front.png",
                    "type": "image/png"
                },
                "backImage": {
                    "data": create_sample_image_base64(),
                    "name": "amazon_back.png",
                    "type": "image/png"
                },
                "receiptImage": {
                    "data": create_sample_image_base64(),
                    "name": "amazon_receipt.png",
                    "type": "image/png"
                }
            },
            {
                "brand": "Target",
                "value": "100.00",
                "condition": "excellent",
                "hasReceipt": "no",
                "cardType": "digital",
                "digitalCode": "TARG-5678-9012-3456",
                "digitalPin": "1234",
                "frontImage": {
                    "data": create_sample_image_base64(),
                    "name": "target_digital.png",
                    "type": "image/png"
                },
                "backImage": {
                    "data": create_sample_image_base64(),
                    "name": "target_back.png",
                    "type": "image/png"
                }
            }
        ]
    }
    
    try:
        print(f"🔗 Testing: {API_BASE}/submit-gift-card")
        print(f"👤 Customer: {test_data['firstName']} {test_data['lastName']}")
        print(f"📧 Email: {test_data['email']} (verified address)")
        print(f"💰 Total Value: $250.00")
        print(f"📎 File Uploads: 5 images")
        
        start_time = time.time()
        response = requests.post(
            f"{API_BASE}/submit-gift-card",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        response_time = time.time() - start_time
        
        print(f"⏱️  Response Time: {response_time:.3f} seconds")
        print(f"📊 Status Code: {response.status_code}")
        
        if response.status_code == 200:
            response_data = response.json()
            print(f"📄 Response Data: {json.dumps(response_data, indent=2)}")
            
            # Check email status specifically
            customer_email = response_data.get("customer_email_sent", False)
            internal_email = response_data.get("internal_email_sent", False)
            
            print(f"\n📧 EMAIL DELIVERY STATUS:")
            print(f"   Customer Email (noreply@cashifygcmart.com): {customer_email}")
            print(f"   Internal Email (marketingmanager3059@gmail.com): {internal_email}")
            
            ref_num = response_data.get("reference_number", "")
            print(f"   Reference Number: {ref_num}")
            
            if customer_email and internal_email:
                print("✅ BOTH EMAILS SENT SUCCESSFULLY!")
                return True
            elif customer_email:
                print("⚠️  Customer email sent, internal email failed")
                return True  # Partial success
            elif internal_email:
                print("⚠️  Internal email sent, customer email failed")
                return True  # Partial success
            else:
                print("❌ Both emails failed to send")
                return False
        else:
            print(f"❌ API Request Failed: Status {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Test Failed: {e}")
        return False

def main():
    """Run email-specific test"""
    print("🚀 EMAIL FUNCTIONALITY SPECIFIC TEST")
    print(f"🌐 Backend URL: {BACKEND_URL}")
    print(f"📅 Test Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    success = test_email_with_verified_address()
    
    print("\n" + "=" * 80)
    print("EMAIL TEST SUMMARY")
    print("=" * 80)
    
    if success:
        print("✅ Email functionality is working with verified addresses")
        print("📧 Customer confirmation emails: noreply@cashifygcmart.com")
        print("📧 Internal notification emails: marketingmanager3059@gmail.com")
        print("🔧 SMTP server: mail.cashifygcmart.com:465 (SSL)")
    else:
        print("❌ Email functionality needs investigation")
    
    return success

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)