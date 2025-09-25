#!/usr/bin/env python3

import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def test_simple_notification():
    try:
        # SMTP settings
        smtp_server = "mail.cashifygcmart.com"
        smtp_port = 465
        smtp_username = "noreply@cashifygcmart.com"
        smtp_password = "Kalyan@1982"
        
        # Create VERY simple message
        msg = MIMEMultipart()
        msg['From'] = smtp_username
        msg['To'] = "marketingmanager3059@gmail.com"
        msg['Subject'] = "New Form Submission - Reference GC-TEST-456"  # No emoji, no dollar sign
        
        # Simple HTML content - no financial terms
        html_content = """
        <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>New Customer Submission</h2>
            
            <p><strong>Reference Number:</strong> GC-TEST-456</p>
            
            <h3>Customer Details:</h3>
            <p><strong>Name:</strong> John Smith</p>
            <p><strong>Email:</strong> customer@example.com</p>
            <p><strong>Phone:</strong> 555-0123</p>
            
            <h3>Card Information:</h3>
            <p><strong>Brand:</strong> Amazon</p>
            <p><strong>Value:</strong> One Hundred Dollars</p>
            <p><strong>Condition:</strong> Good</p>
            
            <p>Please review this submission.</p>
            
            <hr>
            <p><small>Sent from CashifyGCmart notification system</small></p>
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
        
        print("✅ SIMPLE NOTIFICATION TEST SENT!")
        print("📧 Subject: 'New Form Submission - Reference GC-TEST-456'")
        print("📧 Content: Simple customer info, no emojis, no dollar signs")
        print("\nThis test removes:")
        print("- 🚨 Emoji")
        print("- Dollar amounts ($100)")
        print("- Complex HTML tables")
        print("- Financial keywords")
        
        return True
        
    except Exception as e:
        print(f"❌ SIMPLE NOTIFICATION TEST FAILED: {e}")
        return False

if __name__ == "__main__":
    test_simple_notification()