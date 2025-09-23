import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie, Settings, Shield, Eye, Globe, Users, ExternalLink, FileText, Mail } from 'lucide-react';

const CookiePolicy = () => {
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
            <Cookie className="w-12 h-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Cookie Policy</h1>
          </div>
          <p className="text-xl text-pink-100">
            Understanding how we use cookies and similar technologies to improve your experience
          </p>
          <div className="mt-4 text-pink-100">
            <span className="text-sm">Last updated: February 23, 2024</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Section 1: Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <FileText className="w-8 h-8 text-pink-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Welcome to <strong>CashifyGCmart</strong>. This Cookie Policy explains how we and our partners use cookies and similar technologies on our website, apps, and emails. Cookies help us improve your experience, deliver relevant content, and analyze site performance. This policy applies to consumers and business users.
          </p>
          
          <p className="text-gray-700 leading-relaxed">
            For our broader data practices, see our <Link to="/privacy-policy" className="text-pink-600 hover:underline font-medium">Privacy Policy</Link>. If you have questions, contact us at <a href="mailto:support@cashifygcmart.com" className="text-pink-600 hover:underline">support@cashifygcmart.com</a>.
          </p>
        </div>

        {/* Section 2: What Are Cookies */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Cookie className="w-8 h-8 text-orange-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">2. What Are Cookies and Similar Technologies?</h2>
          </div>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Cookies are small text files stored on your device that help identify your browser or device. We also use technologies such as web beacons (tracking pixels), local storage, and advertising device identifiers (e.g., Android Advertising ID, Apple IDFA) — all of which are covered by this policy.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cookie categories explained:</h3>

          <div className="space-y-4">
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-gray-900">First-party cookies:</h4>
              <p className="text-gray-700">Set by CashifyGCmart to enable core site features.</p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-gray-900">Third-party cookies:</h4>
              <p className="text-gray-700">Set by external services (analytics, ads) that run on our site.</p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-gray-900">Session cookies:</h4>
              <p className="text-gray-700">Temporary cookies that expire when you close your browser.</p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-gray-900">Persistent cookies:</h4>
              <p className="text-gray-700">Remain for a set time and are used for remembering preferences or returning visits.</p>
            </div>
          </div>
        </div>

        {/* Section 3: How We Use Cookies */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Eye className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">3. How We Use Cookies</h2>
          </div>
          
          <p className="text-gray-700 mb-6">We use cookies for the following purposes:</p>

          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Essential site functionality:</strong> Enable core features (logins, secure areas, session management).</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Performance & analytics:</strong> Understand how you use the site so we can improve it (page views, errors, load times).</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Preferences & functionality:</strong> Remember language, layout, and other display preferences.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Advertising & personalization:</strong> Deliver relevant ads and measure advertising effectiveness (used with our advertising partners).</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Security & anti-fraud:</strong> Detect suspicious activity and keep the site secure.</span>
            </li>
          </ul>
        </div>

        {/* Section 4: Your Consent and Choices */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Settings className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">4. Your Consent and Choices</h2>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <p className="text-green-800 leading-relaxed mb-4">
              Where required by law, we will ask for your consent before setting non-essential cookies. If you do not consent, only essential cookies will be used. You can withdraw your consent or change cookie settings at any time via your browser settings or our cookie controls (if provided).
            </p>
            <p className="text-green-800 font-medium">
              <strong>Note:</strong> Disabling cookies may limit certain features or prevent parts of the site from functioning correctly.
            </p>
          </div>
        </div>

        {/* Section 5: Managing Cookies in Browser */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Globe className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">5. Managing Cookies in Your Browser</h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            You can manage or delete cookies through your browser settings. Below are official support pages for major browsers:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <ExternalLink className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="font-semibold">Chrome</div>
                <div className="text-sm text-gray-600">Google Support</div>
              </div>
            </a>
            
            <a href="https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <ExternalLink className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="font-semibold">Firefox</div>
                <div className="text-sm text-gray-600">Mozilla Support</div>
              </div>
            </a>
            
            <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <ExternalLink className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="font-semibold">Safari</div>
                <div className="text-sm text-gray-600">Apple Support</div>
              </div>
            </a>
            
            <a href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <ExternalLink className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="font-semibold">Edge</div>
                <div className="text-sm text-gray-600">Microsoft Support</div>
              </div>
            </a>
          </div>

          <p className="text-gray-700">
            <strong>Opera & mobile browsers:</strong> consult your browser's help pages or settings.
          </p>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              <strong>For general guidance on cookies:</strong> <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.aboutcookies.org</a> and <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.allaboutcookies.org</a>
            </p>
          </div>
        </div>

        {/* Section 6: Types of Cookies We Use */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Cookie className="w-8 h-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">6. Types of Cookies We Use</h2>
          </div>
          
          <p className="text-gray-700 mb-6">We use the following cookie categories:</p>

          <div className="space-y-6">
            <div className="border border-indigo-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">Essential Cookies</h3>
              <p className="text-indigo-800">Required for secure login, form submissions, and core functionality.</p>
            </div>
            
            <div className="border border-indigo-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">Performance Cookies</h3>
              <p className="text-indigo-800">Collect anonymous usage data to improve site performance (e.g., pages visited, errors).</p>
            </div>
            
            <div className="border border-indigo-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">Functionality Cookies</h3>
              <p className="text-indigo-800">Store your preferences (language, region) and personalization choices.</p>
            </div>
            
            <div className="border border-indigo-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">Advertising Cookies</h3>
              <p className="text-indigo-800">Help deliver and measure ads that may be relevant to you. These may also be used across different websites.</p>
            </div>
          </div>

          <p className="text-gray-700 mt-6 font-medium">
            Some cookies may serve multiple purposes.
          </p>
        </div>

        {/* Section 7: Third-party Service Providers */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Users className="w-8 h-8 text-teal-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">7. Third-party Service Providers</h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            We work with trusted third parties who may set cookies when you visit our site. These providers help with analytics, advertising, and performance:
          </p>

          <ul className="space-y-3 text-gray-700 mb-6">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Google Analytics (Google)</strong> — site analytics and performance.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Meta / Facebook</strong> — advertising and social integrations.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Twitter and LinkedIn</strong> — content & marketing analytics.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span><strong>Rakuten / NextRoll</strong> — programmatic advertising and remarketing.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Other advertising and analytics vendors as needed.</span>
            </li>
          </ul>

          <p className="text-gray-700 font-medium">
            Each third party has its own privacy practices. To learn how they use data and opt out of certain activities, visit their privacy pages.
          </p>
        </div>

        {/* Section 8: Ad Preferences and Industry Opt-out Tools */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Shield className="w-8 h-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">8. Ad Preferences and Industry Opt-out Tools</h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            To control interest-based advertising across multiple companies, you can use these industry tools:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <a href="https://youradchoices.com/" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              <ExternalLink className="w-5 h-5 text-red-500 mr-3" />
              <div>
                <div className="font-semibold">US: DAA AdChoices</div>
                <div className="text-sm text-red-600">youradchoices.com</div>
              </div>
            </a>
            
            <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              <ExternalLink className="w-5 h-5 text-red-500 mr-3" />
              <div>
                <div className="font-semibold">EU/EEA: EDAA Your Online Choices</div>
                <div className="text-sm text-red-600">youronlinechoices.eu</div>
              </div>
            </a>
            
            <a href="https://youradchoices.ca/" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              <ExternalLink className="w-5 h-5 text-red-500 mr-3" />
              <div>
                <div className="font-semibold">Canada: YourAdChoices.ca</div>
                <div className="text-sm text-red-600">youradchoices.ca</div>
              </div>
            </a>
            
            <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              <ExternalLink className="w-5 h-5 text-red-500 mr-3" />
              <div>
                <div className="font-semibold">Global: Network Advertising Initiative (NAI)</div>
                <div className="text-sm text-red-600">networkadvertising.org</div>
              </div>
            </a>
          </div>

          <p className="text-gray-700">
            You can also adjust ad settings directly in certain advertising platforms (e.g., Google Ads Settings, Facebook Ad Preferences).
          </p>
        </div>

        {/* Section 9: Do-not-track Signals */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Shield className="w-8 h-8 text-yellow-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">9. Do-not-track Signals</h2>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-yellow-800 leading-relaxed">
              Some browsers offer a "Do Not Track" (DNT) setting. Currently, there is no standard accepted method for honoring DNT across the advertising/analytics ecosystem. CashifyGCmart does not automatically change its behavior based solely on browser DNT signals; instead, we provide clear cookie controls and opt-out options.
            </p>
          </div>
        </div>

        {/* Section 10: Children's Privacy */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Users className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">10. Children's Privacy</h2>
          </div>
          
          <p className="text-gray-700 leading-relaxed">
            Our services are intended for users aged <strong>18 and over</strong>. We do not knowingly collect cookies or personal data from children under 18. If you believe a minor's information has been processed, contact us and we will take prompt action.
          </p>
        </div>

        {/* Section 11: Changes to This Cookie Policy */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <FileText className="w-8 h-8 text-gray-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">11. Changes to This Cookie Policy</h2>
          </div>
          
          <p className="text-gray-700 leading-relaxed">
            We may update this Cookie Policy from time to time. Any changes will appear on this page with an updated "Last updated" date. For material changes, we will provide a prominent notice.
          </p>
        </div>

        {/* Section 12: Contact Us */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Mail className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">12. Contact Us</h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            If you have questions or requests about cookies or this policy, contact:
          </p>

          <div className="bg-green-50 rounded-lg p-6">
            <p className="text-green-800 mb-2">
              <strong>Email:</strong> <a href="mailto:support@cashifygcmart.com" className="text-green-600 hover:underline">support@cashifygcmart.com</a>
            </p>
            <p className="text-green-800">
              <strong>Website:</strong> <a href="https://cashifygcmart.com" className="text-green-600 hover:underline">https://cashifygcmart.com</a>
            </p>
          </div>
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

export default CookiePolicy;