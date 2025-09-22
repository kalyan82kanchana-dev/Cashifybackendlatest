#!/usr/bin/env python3
"""
Backend API Testing for Gift Card Submission
Testing the /api/submit-gift-card endpoint to verify it works with the new professional modal
"""

import requests
import json
import base64
import os
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
    return "https://giftcard-trader.preview.emergentagent.com"

BACKEND_URL = get_backend_url()
API_BASE = f"{BACKEND_URL}/api"

def create_sample_image_base64():
    """Create a sample base64 encoded image for testing"""
    # Create a simple 1x1 pixel PNG image in base64
    sample_png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
    return f"data:image/png;base64,{sample_png}"

def test_submit_gift_card_endpoint():
    """Test the gift card submission endpoint with realistic data"""
    print("=" * 60)
    print("TESTING: /api/submit-gift-card endpoint")
    print("=" * 60)
    
    # Create realistic test data
    test_data = {
        "firstName": "Sarah",
        "lastName": "Johnson", 
        "email": "sarah.johnson@email.com",
        "phoneNumber": "+1-555-123-4567",
        "paymentMethod": "paypal",
        "paypalAddress": "sarah.johnson@paypal.com",
        "zelleDetails": "",
        "cashAppTag": "",
        "btcAddress": "",
        "chimeDetails": "",
        "cards": [
            {
                "brand": "Amazon",
                "value": "100.00",
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
                "value": "75.50",
                "condition": "good",
                "hasReceipt": "no",
                "cardType": "digital",
                "digitalCode": "1234-5678-9012-3456",
                "digitalPin": "7890",
                "frontImage": {
                    "data": create_sample_image_base64(),
                    "name": "target_front.png",
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
        print(f"Sending POST request to: {API_BASE}/submit-gift-card")
        print(f"Test data includes {len(test_data['cards'])} cards")
        print(f"Customer: {test_data['firstName']} {test_data['lastName']}")
        print(f"Email: {test_data['email']}")
        print(f"Payment Method: {test_data['paymentMethod']}")
        
        # Send the request
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
            
            # Verify response format for professional modal
            required_fields = ["success", "reference_number", "message"]
            missing_fields = []
            
            for field in required_fields:
                if field not in response_data:
                    missing_fields.append(field)
            
            if missing_fields:
                print(f"❌ Missing required fields: {missing_fields}")
                return False
            
            # Check response format matches what modal expects
            if response_data.get("success") == True:
                print("✅ Success field is True")
            else:
                print(f"❌ Success field is not True: {response_data.get('success')}")
                return False
                
            ref_num = response_data.get("reference_number", "")
            if ref_num and ref_num.startswith("GC-") and len(ref_num) >= 10:
                print(f"✅ Reference number format is correct: {ref_num}")
            else:
                print(f"❌ Reference number format is incorrect: {ref_num}")
                return False
                
            if response_data.get("message"):
                print(f"✅ Message field present: {response_data.get('message')}")
            else:
                print("❌ Message field is missing or empty")
                return False
                
            # Check email sending status
            customer_email = response_data.get("customer_email_sent", False)
            internal_email = response_data.get("internal_email_sent", False)
            
            print(f"📧 Customer email sent: {customer_email}")
            print(f"📧 Internal email sent: {internal_email}")
            
            if customer_email and internal_email:
                print("✅ Both emails sent successfully")
            else:
                print("⚠️  One or both emails failed to send")
                
            return True
            
        else:
            print(f"❌ API Request Failed!")
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request Exception: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ JSON Decode Error: {e}")
        print(f"Response text: {response.text}")
        return False
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        return False

def test_api_health():
    """Test basic API health"""
    print("=" * 60)
    print("TESTING: API Health Check")
    print("=" * 60)
    
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        print(f"Health check status: {response.status_code}")
        
        if response.status_code == 200:
            print("✅ API is healthy and responding")
            print(f"Response: {response.json()}")
            return True
        else:
            print(f"❌ API health check failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ API health check error: {e}")
        return False

def main():
    """Run all backend tests"""
    print("🚀 Starting Backend API Tests")
    print(f"Backend URL: {BACKEND_URL}")
    print(f"API Base: {API_BASE}")
    print(f"Test Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # Test results
    results = {
        "api_health": False,
        "gift_card_submission": False
    }
    
    # Run tests
    results["api_health"] = test_api_health()
    print()
    results["gift_card_submission"] = test_submit_gift_card_endpoint()
    
    # Summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    for test_name, passed in results.items():
        status = "✅ PASSED" if passed else "❌ FAILED"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    total_tests = len(results)
    passed_tests = sum(results.values())
    
    print(f"\nOverall: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 All tests passed! Backend API is working correctly with the new professional modal.")
    else:
        print("⚠️  Some tests failed. Backend may need fixes for proper modal integration.")
    
    return passed_tests == total_tests

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)