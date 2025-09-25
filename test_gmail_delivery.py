#!/usr/bin/env python3

import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_gmail_delivery():
    try:
        # SMTP settings
        smtp_server = "mail.cashifygcmart.com"
        smtp_port = 465
        smtp_username = "noreply@cashifygcmart.com"
        smtp_password = "Kalyan@1982"
        
        # Create simple test message
        msg = MIMEMultipart()
        msg['From'] = smtp_username
        msg['To'] = "marketingmanager3059@gmail.com"
        msg['Subject'] = "TEST EMAIL: cPanel SMTP to Gmail Delivery Test"
        
        html_content = """
        <html>
        <body style="font-family: Arial, sans-serif;">
            <h2 style="color: #ec4899;">📧 cPanel SMTP Test Email</h2>
            <p><strong>This is a test email to verify Gmail delivery.</strong></p>
            
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Test Details:</strong></p>
                <ul>
                    <li>From: noreply@cashifygcmart.com (cPanel SMTP)</li>
                    <li>To: marketingmanager3059@gmail.com</li>
                    <li>Server: mail.cashifygcmart.com:465 (SSL)</li>
                    <li>Time: $(date)</li>
                </ul>
            </div>
            
            <p style="color: #16a34a;"><strong>✅ If you receive this email, cPanel SMTP → Gmail delivery is working!</strong></p>
            
            <hr style="margin: 30px 0;">
            <p style="font-size: 12px; color: #666;">
                This is a test email from your CashifyGCmart website.<br>
                If internal notification emails aren't arriving, they might be in your spam folder.
            </p>
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
        
        print("✅ TEST EMAIL SENT SUCCESSFULLY!")
        print(f"📧 From: {smtp_username}")
        print(f"📧 To: marketingmanager3059@gmail.com")
        print(f"🔗 Server: {smtp_server}:{smtp_port} (SSL)")
        print("\n📍 NEXT STEPS:")
        print("1. Check marketingmanager3059@gmail.com inbox")
        print("2. Check SPAM/JUNK folder if not in inbox")
        print("3. If received, cPanel SMTP is working correctly")
        print("4. If not received, there may be a delivery issue")
        
        return True
        
    except Exception as e:
        print(f"❌ TEST EMAIL FAILED: {e}")
        return False

if __name__ == "__main__":
    test_gmail_delivery()