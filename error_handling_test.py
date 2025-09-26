#!/usr/bin/env python3
"""
Error Handling Tests for Railway.app Deployed Cashifygcmart Platform
Testing API error handling, validation, and edge cases
"""

import requests
import json
from datetime import datetime

# Railway.app deployment URL
BACKEND_URL = "https://cashify-deploy.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

def test_invalid_inputs():
    """Test API with invalid inputs and missing required fields"""
    print("=" * 60)
    print("TESTING: Error Handling & Validation")
    print("=" * 60)
    
    test_cases = [
        {
            "name": "Missing required fields",
            "data": {},
            "expected_status": [400, 422]
        },
        {
            "name": "Invalid email format",
            "data": {
                "firstName": "Test",
                "lastName": "User",
                "email": "invalid-email",
                "phoneNumber": "+1-555-123-4567",
                "paymentMethod": "paypal",
                "paypalAddress": "test@paypal.com",
                "cards": []
            },
            "expected_status": [400, 422]
        },
        {
            "name": "Empty cards array",
            "data": {
                "firstName": "Test",
                "lastName": "User",
                "email": "test@example.com",
                "phoneNumber": "+1-555-123-4567",
                "paymentMethod": "paypal",
                "paypalAddress": "test@paypal.com",
                "cards": []
            },
            "expected_status": [200, 400, 422]  # May accept empty cards
        },
        {
            "name": "Invalid payment method",
            "data": {
                "firstName": "Test",
                "lastName": "User",
                "email": "test@example.com",
                "phoneNumber": "+1-555-123-4567",
                "paymentMethod": "invalid_method",
                "cards": []
            },
            "expected_status": [400, 422]
        }
    ]
    
    results = []
    
    for test_case in test_cases:
        print(f"\n🧪 Testing: {test_case['name']}")
        
        try:
            response = requests.post(
                f"{API_BASE}/submit-gift-card",
                json=test_case["data"],
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            print(f"Status Code: {response.status_code}")
            
            if response.status_code in test_case["expected_status"]:
                print("✅ Expected status code received")
                results.append(True)
                
                # Try to parse response
                try:
                    response_data = response.json()
                    print(f"Response: {json.dumps(response_data, indent=2)}")
                except:
                    print(f"Response text: {response.text}")
            else:
                print(f"❌ Unexpected status code. Expected: {test_case['expected_status']}")
                print(f"Response: {response.text}")
                results.append(False)
                
        except Exception as e:
            print(f"❌ Request failed: {e}")
            results.append(False)
    
    passed = sum(results)
    total = len(results)
    print(f"\n📊 Error Handling Tests: {passed}/{total} passed")
    
    return passed == total

def test_large_file_uploads():
    """Test API with larger file uploads"""
    print("=" * 60)
    print("TESTING: Large File Upload Handling")
    print("=" * 60)
    
    # Create a larger base64 image (still small for testing)
    large_image_data = "data:image/png;base64," + "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==" * 10
    
    test_data = {
        "firstName": "Large",
        "lastName": "FileTest",
        "email": "largefile@test.com",
        "phoneNumber": "+1-555-999-8888",
        "paymentMethod": "paypal",
        "paypalAddress": "largefile@paypal.com",
        "cards": [
            {
                "brand": "Amazon",
                "value": "100.00",
                "condition": "excellent",
                "hasReceipt": "yes",
                "cardType": "physical",
                "frontImage": {
                    "data": large_image_data,
                    "name": "large_front_image.png",
                    "type": "image/png"
                },
                "backImage": {
                    "data": large_image_data,
                    "name": "large_back_image.png",
                    "type": "image/png"
                },
                "receiptImage": {
                    "data": large_image_data,
                    "name": "large_receipt_image.png",
                    "type": "image/png"
                }
            }
        ]
    }
    
    try:
        print("Sending request with larger file uploads...")
        response = requests.post(
            f"{API_BASE}/submit-gift-card",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            response_data = response.json()
            print("✅ Large file upload handled successfully")
            print(f"Reference: {response_data.get('reference_number', 'N/A')}")
            return True
        else:
            print(f"❌ Large file upload failed: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Large file upload test error: {e}")
        return False

def main():
    """Run error handling and edge case tests"""
    print("🧪 Starting Error Handling & Edge Case Tests")
    print(f"Backend URL: {BACKEND_URL}")
    print(f"Test Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    results = {
        "error_handling": test_invalid_inputs(),
        "large_file_uploads": test_large_file_uploads()
    }
    
    print("\n" + "=" * 60)
    print("ERROR HANDLING TEST SUMMARY")
    print("=" * 60)
    
    for test_name, passed in results.items():
        status = "✅ PASSED" if passed else "❌ FAILED"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    total_tests = len(results)
    passed_tests = sum(results.values())
    
    print(f"\nOverall: {passed_tests}/{total_tests} error handling tests passed")
    
    return passed_tests == total_tests

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)