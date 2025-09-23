import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, DollarSign, Clock, Shield, AlertTriangle, FileText, Mail } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-pink-100 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center mb-4">
            <RefreshCw className="w-12 h-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Refund Policy</h1>
          </div>
          <p className="text-xl text-pink-100">
            Understanding when and how refunds are available for unsold gift cards
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Section 1: Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <FileText className="w-8 h-8 text-pink-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">1. Overview</h2>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>CashifyGCmart</strong> aims to provide a fair and transparent selling experience. This Refund Policy explains when refunds are available for gift cards that have not been sold, how to request a refund, and the conditions that may affect refund eligibility. By using our service, you agree to the terms below.
          </p>
        </div>

        {/* Section 2: When Refunds Are Available */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <DollarSign className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">2. When Refunds Are Available</h2>
          </div>
          
          <p className="text-gray-700 leading-relaxed">
            Refunds are available only for gift cards that have <strong>not been successfully sold</strong> to a buyer through our platform. Eligibility depends on factors including the card brand's market demand and whether the card remains unsold at the time of the request. Each refund request is evaluated individually and at CashifyGCmart's discretion.
          </p>
        </div>

        {/* Section 3: Refund Exclusions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">3. Refund Exclusions</h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            Refunds will <strong>not</strong> be issued in the following cases (including but not limited to):
          </p>

          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>The gift card has already been sold or redeemed.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>The card is determined to be fraudulent, invalid, or reported as used.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>The card's terms violate our Terms of Service.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>The refund request is submitted after any applicable deadline set by CashifyGCmart.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>You provided incorrect or incomplete card details that prevented verification and sale.</span>
            </li>
          </ul>
        </div>

        {/* Section 4: How to Request a Refund */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Mail className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">4. How to Request a Refund</h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            To request a refund for an unsold gift card:
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-blue-900 mb-4">Email Requirements:</h3>
            <p className="text-blue-800 mb-4">
              <strong>Email:</strong> <a href="mailto:support@cashifygcmart.com" className="text-blue-600 hover:underline">support@cashifygcmart.com</a>
            </p>
            <p className="text-blue-800 mb-4">
              <strong>Subject:</strong> Refund Request — [Your Reference Number / Transaction ID]
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Include in your email:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Your full name</li>
              <li>• Account email address</li>
              <li>• Transaction/reference ID</li>
              <li>• Gift card brand</li>
              <li>• Card number (if required)</li>
              <li>• Reason for your refund request</li>
              <li>• Any supporting screenshots or documentation</li>
            </ul>
          </div>

          <p className="text-gray-700 mt-6">
            Our team will acknowledge receipt within <strong>1–2 business days</strong> and begin the refund review.
          </p>
        </div>

        {/* Section 5: Refund Review Process & Timeline */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Clock className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">5. Refund Review Process & Timeline</h2>
          </div>
          
          <div className="space-y-6">
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Investigation Process</h3>
              <p className="text-gray-700">
                Once we receive your request, CashifyGCmart will investigate and verify the card status. This may include checking marketplace availability, validating card data, and reviewing any security checks.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Timeline</h3>
              <p className="text-gray-700 mb-2">
                <strong>Typical review time:</strong> Up to 7 business days
              </p>
              <p className="text-gray-700">
                Complex cases may take longer; we will notify you if additional time is required.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing After Approval</h3>
              <p className="text-gray-700">
                If approved, refunds will be processed via the original payout method where feasible, or via another method we agree on. Processing time after approval depends on the payout provider (usually <strong>3–10 business days</strong>). CashifyGCmart is not responsible for delays caused by third-party banks or payment processors.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Fraud Prevention & Denials */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Shield className="w-8 h-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">6. Fraud Prevention & Denials</h2>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800 leading-relaxed">
              We actively monitor for fraud. If a gift card is suspected or confirmed fraudulent, or if selling the card breaches our Terms of Service, we will <strong>deny the refund request</strong> and may take further action (including account suspension or legal referral). We will provide a clear explanation if a refund is denied for these reasons.
            </p>
          </div>
        </div>

        {/* Section 7: Partial Refunds & Fees */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <DollarSign className="w-8 h-8 text-orange-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">7. Partial Refunds & Fees</h2>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <p className="text-orange-800 leading-relaxed">
              In rare cases where a partial refund is appropriate (for example, after deductions for legitimate processing costs), CashifyGCmart will clearly itemize any deductions and provide the net refund amount. We will <strong>not apply undisclosed or arbitrary fees</strong>.
            </p>
          </div>
        </div>

        {/* Section 8: Contact & Support */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Mail className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">8. Contact & Support</h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            If you have questions about a refund request or need help, contact our support team:
          </p>

          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-3">Support Contact</h3>
            <p className="text-green-800">
              <strong>Email:</strong> <a href="mailto:support@cashifygcmart.com" className="text-green-600 hover:underline">support@cashifygcmart.com</a>
            </p>
            <p className="text-green-800 text-sm mt-2">
              Please include your account email and transaction/reference ID to help us respond quickly.
            </p>
          </div>
        </div>

        {/* Section 9: Changes to This Policy */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <FileText className="w-8 h-8 text-gray-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">9. Changes to This Policy</h2>
          </div>
          
          <p className="text-gray-700 leading-relaxed">
            CashifyGCmart may update this Refund Policy from time to time. When we make material changes, we will post the revised policy and update the effective date. Continued use of our services after changes constitutes acceptance of the new terms.
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;