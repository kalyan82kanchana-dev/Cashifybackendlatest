import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Server, Award, CheckCircle } from 'lucide-react';

const SecurityPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-green-100 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center mb-4">
            <Shield className="w-12 h-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Security & Data Protection</h1>
          </div>
          <p className="text-xl text-green-100">
            Bank-level security measures protecting your information and transactions
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Security Certifications */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Award className="w-8 h-8 text-gold-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Industry Certifications & Compliance</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">SSL 256-Bit Encryption</h3>
              <p className="text-sm text-gray-600 mt-1">Bank-level encryption for all data transmission</p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">PCI DSS Compliant</h3>
              <p className="text-sm text-gray-600 mt-1">Payment Card Industry Data Security Standard certified</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">SOC 2 Type II</h3>
              <p className="text-sm text-gray-600 mt-1">Audited security, availability, and confidentiality controls</p>
            </div>
            
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">GDPR Compliant</h3>
              <p className="text-sm text-gray-600 mt-1">European data protection regulation compliance</p>
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">AML/KYC Compliant</h3>
              <p className="text-sm text-gray-600 mt-1">Anti-Money Laundering and Know Your Customer protocols</p>
            </div>
            
            <div className="text-center p-4 bg-teal-50 rounded-lg">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Server className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">ISO 27001 Certified</h3>
              <p className="text-sm text-gray-600 mt-1">Information security management system standard</p>
            </div>
          </div>
        </div>

        {/* Data Encryption */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Lock className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Advanced Data Encryption</h2>
          </div>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Data in Transit</h3>
              <p className="text-gray-700">All data transmitted between your device and our servers is protected using TLS 1.3 encryption with 256-bit AES encryption. This ensures that your gift card information, personal details, and payment data cannot be intercepted during transmission.</p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Data at Rest</h3>
              <p className="text-gray-700">Your stored information is encrypted using AES-256 encryption with rotating encryption keys. Gift card images and sensitive data are stored in encrypted databases with restricted access controls and regular security audits.</p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Management</h3>
              <p className="text-gray-700">Encryption keys are managed through a secure Hardware Security Module (HSM) system with automatic key rotation, multi-party authorization, and tamper-evident controls to prevent unauthorized access.</p>
            </div>
          </div>
        </div>

        {/* Fraud Prevention */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Eye className="w-8 h-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Fraud Prevention & Detection</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-Time Monitoring</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">AI-powered transaction analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Behavioral pattern recognition</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Suspicious activity alerts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Multi-factor authentication</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Protocols</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Advanced image analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Real-time balance verification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Identity verification checks</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Purchase history analysis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Protection Policies */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Server className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Data Protection & Privacy Policies</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">Data Minimization</h3>
              <p className="text-purple-800">We collect only the minimum data necessary to process your gift card transactions. Personal information is used solely for verification, payment processing, and customer support purposes.</p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Access Controls</h3>
              <p className="text-blue-800">Access to customer data is restricted to authorized personnel only, with role-based permissions, audit logging, and regular access reviews. All staff undergo background checks and security training.</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Data Retention</h3>
              <p className="text-green-800">Transaction data is retained only as long as required by law or business necessity. Gift card images are securely deleted after verification completion, and personal data follows strict retention schedules.</p>
            </div>
          </div>
        </div>

        {/* Infrastructure Security */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Server className="w-8 h-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Infrastructure & Network Security</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Server className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cloud Infrastructure</h3>
              <p className="text-sm text-gray-600">AWS/Azure enterprise-grade hosting with 99.9% uptime SLA and automatic failover protection</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">DDoS Protection</h3>
              <p className="text-sm text-gray-600">Advanced distributed denial-of-service protection with real-time threat detection and mitigation</p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Firewall Security</h3>
              <p className="text-sm text-gray-600">Multi-layered firewall protection with intrusion detection and automated threat response systems</p>
            </div>
          </div>
        </div>

        {/* Security Audits */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Award className="w-8 h-8 text-orange-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Regular Security Audits & Testing</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold text-orange-600">Q</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Quarterly Security Assessments</h3>
                <p className="text-gray-600 text-sm">Third-party security firms conduct comprehensive penetration testing and vulnerability assessments</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold text-blue-600">M</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Monthly Compliance Reviews</h3>
                <p className="text-gray-600 text-sm">Internal security team reviews and updates security policies, procedures, and access controls</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold text-green-600">24/7</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Continuous Monitoring</h3>
                <p className="text-gray-600 text-sm">Real-time security monitoring with automated alerts and incident response protocols</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Security Team */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 text-green-400" />
          <h2 className="text-2xl font-bold mb-4">Security Concerns or Questions?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our security team is available to address any concerns about data protection, transaction security, or platform safety.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:security@cashifygcmart.com"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Security Team
            </a>
            <Link 
              to="/privacy-policy"
              className="border border-gray-600 hover:border-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View Privacy Policy
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link 
            to="/" 
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;