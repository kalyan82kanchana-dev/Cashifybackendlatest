#!/usr/bin/env python3

import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_form_notification():
    try:
        # SMTP settings
        smtp_server = "mail.cashifygcmart.com"
        smtp_port = 465
        smtp_username = "noreply@cashifygcmart.com"
        smtp_password = "Kalyan@1982"
        
        # Create message that mimics internal notification
        msg = MIMEMultipart()
        msg['From'] = smtp_username
        msg['To'] = "marketingmanager3059@gmail.com"
        msg['Subject'] = "🚨 TEST FORM NOTIFICATION: GC-TEST-123 - Test Customer ($100.00)"
        
        # Create HTML content similar to internal notification
        html_content = """
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                .container { max-width: 800px; margin: 0 auto; }
                .alert-header { background: #dc2626; color: white; padding: 15px; text-align: center; }
                .content { background: white; padding: 20px; }
                table { width: 100%; border-collapse: collapse; margin: 15px 0; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background: #f2f2f2; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="alert-header">
                    <h1>🚨 NEW GIFT CARD SUBMISSION</h1>
                    <h2>Reference: GC-TEST-123</h2>
                </div>
                
                <div class="content">
                    <h3>Customer Information</h3>
                    <table>
                        <tr><th>Name</th><td>Test Customer</td></tr>
                        <tr><th>Email</th><td>test@example.com</td></tr>
                        <tr><th>Phone</th><td>555-123-4567</td></tr>
                        <tr><th>Payment Method</th><td>PayPal: test@paypal.com</td></tr>
                    </table>
                    
                    <h3>Gift Card Details</h3>
                    <table>
                        <tr><th>Brand</th><th>Value</th><th>Condition</th><th>Has Receipt</th></tr>
                        <tr><td>Amazon</td><td>$100.00</td><td>Excellent</td><td>Yes</td></tr>
                    </table>
                    
                    <div style="background: #fee2e2; border: 1px solid #dc2626; padding: 15px; margin: 20px 0; border-radius: 5px;">
                        <h3 style="color: #dc2626; margin-top: 0;">⚠️ ACTION REQUIRED</h3>
                        <p><strong>Total Value:</strong> $100.00</p>
                        <p><strong>Processing Priority:</strong> Standard</p>
                        <p>Please review and process this submission within 24 hours.</p>
                    </div>
                    
                    <hr>
                    <p style="font-size: 12px; color: #666;">
                        This is a test of your form notification system.<br>
                        Sent from: noreply@cashifygcmart.com<br>
                        Server: mail.cashifygcmart.com:465 (SSL)
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Add HTML content
        html_part = MIMEText(html_content, 'html')
        msg.attach(html_part)
        
        # Send email via SMTP SSL
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(smtp_server, smtp_port, context=context) as server:
            server.login(smtp_username, smtp_password)
            server.send_message(msg)
        
        print("✅ FORM NOTIFICATION TEST EMAIL SENT!")
        print(f"📧 From: {smtp_username}")
        print(f"📧 To: marketingmanager3059@gmail.com")
        print(f"📧 Subject: 🚨 TEST FORM NOTIFICATION: GC-TEST-123")
        print(f"🔗 Server: {smtp_server}:{smtp_port} (SSL)")
        print("\n📍 CHECK FOR THIS EMAIL:")
        print("- Subject: '🚨 TEST FORM NOTIFICATION: GC-TEST-123 - Test Customer ($100.00)'")
        print("- Should have customer details and gift card info")
        print("- Check both INBOX and SPAM folders")
        
        return True
        
    except Exception as e:
        print(f"❌ FORM NOTIFICATION TEST FAILED: {e}")
        return False

if __name__ == "__main__":
    test_form_notification()