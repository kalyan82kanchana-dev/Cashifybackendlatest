import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, Scale, AlertTriangle, CreditCard } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-100 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center mb-4">
            <Scale className="w-12 h-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-xl text-blue-100">
            Professional gift card exchange platform terms and conditions
          </p>
          <div className="mt-4 text-blue-100">
            <span className="text-sm">Last updated: September 24, 2024</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Section 1: Acceptance of Terms */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <FileText className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            By accessing and using CashifyGCmart ("the Platform", "our Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
          
          <p className="text-gray-700 leading-relaxed">
            CashifyGCmart operates as a licensed gift card exchange platform, providing secure marketplace services for the buying and selling of unused gift cards. We maintain the highest standards of security and compliance with all applicable financial regulations.
          </p>
        </div>

        {/* Section 2: Service Description */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <CreditCard className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">2. Service Description</h2>
          </div>
          
          <div className="space-y-4 text-gray-700">
            <p><strong>Gift Card Exchange:</strong> We provide a secure platform for converting unused gift cards into cash payments.</p>
            <p><strong>Verification Process:</strong> All gift cards undergo professional verification to ensure authenticity and prevent fraud.</p>
            <p><strong>Payment Processing:</strong> We offer same-day payments through multiple secure payment methods including PayPal, Zelle, Cash App, and Bitcoin.</p>
            <p><strong>Rate Transparency:</strong> Our rate calculator provides upfront, transparent pricing with no hidden fees.</p>
          </div>
        </div>

        {/* Section 3: User Requirements */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Shield className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">3. User Requirements & Eligibility</h2>
          </div>
          
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Users must be 18 years of age or older</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Must provide accurate personal and payment information</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Gift cards must be legitimately obtained and owned by the user</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Compliance with all applicable local, state, and federal laws</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Submission of clear, unaltered photos of gift cards when required</span>
            </li>
          </ul>
        </div>

        {/* Section 4: Prohibited Activities */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">4. Prohibited Activities</h2>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <p className="text-red-800 font-medium mb-2">
              The following activities are strictly prohibited:
            </p>
            <ul className="space-y-2 text-red-700 text-sm">
              <li>• Submission of stolen, fraudulent, or illegally obtained gift cards</li>
              <li>• Providing false or misleading information about card details</li>
              <li>• Attempting to manipulate our verification systems</li>
              <li>• Using the platform for money laundering or other illegal activities</li>
              <li>• Submitting altered or tampered gift card images</li>
              <li>• Creating multiple accounts to circumvent transaction limits</li>
            </ul>
          </div>

          <p className="text-gray-700">
            <strong>Consequences:</strong> Violation of these terms may result in immediate account termination, forfeiture of pending transactions, and reporting to appropriate law enforcement authorities.
          </p>
        </div>

        {/* Section 5: Transaction Process */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <CreditCard className="w-8 h-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">5. Transaction Process & Timeline</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Verification Process:</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Initial submission review: 2-4 hours</li>
                <li>• Card authenticity verification: Same day</li>
                <li>• Balance confirmation: Real-time</li>
                <li>• Final approval: Within 24 hours</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Payment Timeline:</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• PayPal: Same day</li>
                <li>• Zelle: Same day</li>
                <li>• Cash App: Same day</li>
                <li>• Bitcoin: 2-6 hours</li>
                <li>• Chime: Same day</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 6: Privacy & Security */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Shield className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">6. Privacy & Data Security</h2>
          </div>
          
          <div className="space-y-4 text-gray-700">
            <p><strong>Data Protection:</strong> We employ bank-level 256-bit SSL encryption to protect all transmitted data.</p>
            <p><strong>Information Storage:</strong> Personal and gift card information is securely stored and accessed only by authorized personnel.</p>
            <p><strong>Compliance:</strong> Our operations comply with PCI DSS standards and applicable data protection regulations.</p>
            <p><strong>Data Retention:</strong> Transaction data is retained only as long as necessary for business and legal requirements.</p>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="text-green-800 text-sm">
              For complete details on our privacy practices, please review our <Link to="/privacy-policy" className="text-green-600 hover:underline font-medium">Privacy Policy</Link>.
            </p>
          </div>
        </div>

        {/* Section 7: Limitations & Disclaimers */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <AlertTriangle className="w-8 h-8 text-orange-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">7. Service Limitations & Disclaimers</h2>
          </div>
          
          <div className="space-y-4 text-gray-700">
            <p><strong>Rate Variations:</strong> Exchange rates may fluctuate based on market conditions and are subject to final verification.</p>
            <p><strong>Service Availability:</strong> While we strive for 99.9% uptime, we cannot guarantee uninterrupted service availability.</p>
            <p><strong>Geographic Limitations:</strong> Our services are currently available to residents of the United States only.</p>
            <p><strong>Transaction Limits:</strong> Daily and monthly transaction limits may apply based on verification level and payment method.</p>
          </div>
        </div>

        {/* Section 8: Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <FileText className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">8. Contact & Support</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Customer Support</h3>
              <div className="space-y-2 text-gray-700">
                <p>📧 Email: support@cashifygcmart.com</p>
                <p>📞 Phone: (555) 013-2099</p>
                <p>💬 Live Chat: Available on website</p>
                <p>🕒 Hours: Monday-Friday, 9 AM - 6 PM PST</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Business Address</h3>
              <div className="text-gray-700">
                <p>2099 Harborview Drive, Suite 210</p>
                <p>San Diego, CA 92101</p>
                <p>United States</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;