import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
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
            <Shield className="w-12 h-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl text-pink-100">
            Your privacy matters to us. Learn how we protect and handle your personal information.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to <strong>CashifyGCmart</strong>. Your privacy matters to us. This Privacy Policy explains what personal information we collect, how we use it, who we share it with, how long we keep it, and your rights regarding that information. We comply with applicable data protection laws, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), where applicable.
          </p>
        </div>

        {/* Section 1: Information We Collect */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Eye className="w-8 h-8 text-pink-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            When you use CashifyGCmart, we may collect the following categories of personal information:
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-pink-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact & Account Data</h3>
              <p className="text-gray-700">Name, email address, phone number, billing/shipping address, and other account-related details.</p>
            </div>

            <div className="border-l-4 border-pink-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gift Card Information</h3>
              <p className="text-gray-700">Gift card brand, card number, PIN (if applicable), balance, and related submission details necessary to process trades.</p>
            </div>

            <div className="border-l-4 border-pink-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment & Payout Details</h3>
              <p className="text-gray-700">Payment method information (e.g., PayPal ID, bank account, or other payout account identifiers) required to deliver payments.</p>
            </div>

            <div className="border-l-4 border-pink-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Transaction & Service Data</h3>
              <p className="text-gray-700">Order history, submission timestamps, verification results, reference/transaction IDs, and communication history.</p>
            </div>

            <div className="border-l-4 border-pink-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Device & Usage Data</h3>
              <p className="text-gray-700">IP address, device and browser information, cookies and similar tracking technologies, pages visited, and interaction data to improve the service.</p>
            </div>

            <div className="border-l-4 border-pink-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Support & Verification Data</h3>
              <p className="text-gray-700">Correspondence with our support team, identity verification materials (when required), and fraud-prevention data.</p>
            </div>
          </div>
        </div>

        {/* Section 2: How We Use Your Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <FileText className="w-8 h-8 text-pink-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">2. How We Use Your Information</h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            We process personal information to provide, operate, and improve CashifyGCmart and for these purposes:
          </p>

          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Provide services & process transactions:</strong> Verify, list, evaluate, and complete gift card sales and payouts.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Payment processing:</strong> Send payments, process refunds, and manage billing.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Customer support:</strong> Respond to inquiries, resolve disputes, and provide assistance.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Security & fraud prevention:</strong> Detect and prevent unauthorized activity, enforce policies, and protect our users.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Compliance & legal obligations:</strong> Meet legal, tax, and regulatory requirements.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Improvement & analytics:</strong> Analyze usage to improve features and user experience.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Marketing (where permitted):</strong> With your consent or as allowed by law, send promotional messages and service updates.</span>
            </li>
          </ul>

          <div className="mt-6 p-4 bg-pink-50 rounded-lg">
            <p className="text-gray-700 text-sm">
              <strong>Legal bases (GDPR):</strong> Where applicable, we rely on performance of contract, legitimate interests (e.g., security, fraud prevention, product improvement), legal obligations, or your consent.
            </p>
          </div>
        </div>

        {/* Section 3: Sharing Your Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Lock className="w-8 h-8 text-pink-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">3. Sharing Your Information</h2>
          </div>
          
          <p className="text-gray-700 mb-6">We may share personal information with:</p>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Providers</h3>
              <p className="text-gray-700">Payment processors, identity verification providers, email and messaging providers, hosting and cloud services, analytics and monitoring services, and other vendors who help deliver our services.</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Partners</h3>
              <p className="text-gray-700">Trusted third parties that facilitate payouts or other transaction-related services.</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal & Safety</h3>
              <p className="text-gray-700">Law enforcement, courts, or regulators if required by law, or to respond to legal process, protect rights, property, safety, or enforce our Terms of Service.</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Transfers</h3>
              <p className="text-gray-700">In connection with a merger, acquisition, reorganization, or sale of assets — with notice and contractual protections.</p>
            </div>
          </div>

          <p className="text-gray-700 mt-6 font-medium">
            We require third parties to protect personal data and only use it for authorized purposes.
          </p>
        </div>

        {/* Continue with remaining sections... */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Cookies & Tracking</h2>
          <p className="text-gray-700">
            We use cookies and similar technologies to operate the site, remember preferences, analyze usage, and provide personalized content. You can control cookie settings via browser preferences. For detailed information about cookies we use and how to opt out, see our Cookie Notice.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">5. International Transfers</h2>
          <p className="text-gray-700">
            CashifyGCmart may transfer and store personal information in countries outside your own. When transfers occur, we use appropriate safeguards (e.g., standard contractual clauses or other legal mechanisms) to ensure an adequate level of protection.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Data Retention</h2>
          <p className="text-gray-700 mb-4">
            We keep personal information only as long as necessary to fulfill the purposes described in this policy, comply with legal obligations, resolve disputes, enforce our agreements, and improve our services. Typical retention periods:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Transaction and account data:</strong> retained for the duration of your account plus a legally required retention window (commonly several years for tax/regulatory recordkeeping).</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Support correspondence:</strong> retained while relevant to the inquiry and for a reasonable period after.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Analytics data:</strong> retained in aggregated or anonymized form where possible.</span>
            </li>
          </ul>
          <p className="text-gray-700 mt-4">
            If you want specific retention details for a data category, contact our Data Protection Officer (DPO) below.
          </p>
        </div>

        {/* Your Rights */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Your Rights</h2>
          <p className="text-gray-700 mb-6">
            Depending on your jurisdiction, you may have rights concerning your personal information:
          </p>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Under GDPR (EU/EEA residents):</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Right to access your personal data</li>
                <li>• Right to correct inaccurate data</li>
                <li>• Right to erasure ("right to be forgotten") in certain circumstances</li>
                <li>• Right to restriction of processing and to object to processing</li>
                <li>• Right to data portability</li>
                <li>• Right to withdraw consent where processing is based on consent</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Under CCPA/CPRA (California residents):</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Right to know what categories of personal information we collect, use, share, and sell</li>
                <li>• Right to request deletion of personal information (subject to exceptions)</li>
                <li>• Right to opt out of the sale of personal information (we do not sell data for targeted advertising by default)</li>
                <li>• Right to non-discrimination for exercising privacy rights</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">How to exercise your rights:</h4>
            <p className="text-gray-700">
              Submit a request to <a href="mailto:support@cashifygcmart.com" className="text-pink-600 hover:underline">support@cashifygcmart.com</a> or use any account-based request tools available in your profile. We may verify your identity before fulfilling requests. We will respond within applicable legal timeframes.
            </p>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Security</h2>
          <p className="text-gray-700">
            We implement industry-standard administrative, technical, and physical safeguards to protect personal information, including encryption in transit, access controls, and vulnerability monitoring. While we work to protect your data, no system is completely secure — we cannot guarantee absolute security.
          </p>
        </div>

        {/* Children */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Children</h2>
          <p className="text-gray-700">
            Our services are for users aged 18 and older. We do not knowingly collect information from minors. If you believe we have collected data for a child under 18, contact us and we will promptly delete it.
          </p>
        </div>

        {/* Changes */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy to reflect changes in our practices or legal requirements. The most recent policy will be posted on our site with an updated effective date. For material changes, we will provide prominent notice.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Contact & DPO</h2>
          <p className="text-gray-700 mb-4">
            For privacy questions, data requests, or to exercise your rights, contact:
          </p>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Data Protection Officer</h3>
            <p className="text-gray-700">
              <strong>Email:</strong> <a href="mailto:support@cashifygcmart.com" className="text-pink-600 hover:underline">support@cashifygcmart.com</a>
            </p>
          </div>
          <p className="text-gray-700 mt-4">
            If you're a California resident and would prefer a webform or an authorized agent to submit a request, contact us at <a href="mailto:support@cashifygcmart.com" className="text-pink-600 hover:underline">support@cashifygcmart.com</a> and we will provide the appropriate process.
          </p>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">12. Additional Information</h2>
          <p className="text-gray-700">
            If you have concerns about how we handle your personal data, please contact us first so we can investigate. You may also have the right to lodge a complaint with a supervisory authority (for EU/EEA residents) or the California Attorney General (for California residents).
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

export default PrivacyPolicy;