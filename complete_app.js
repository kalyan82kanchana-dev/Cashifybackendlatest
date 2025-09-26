import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CreditCard, Shield, CheckCircle, Clock, DollarSign, Smartphone, User, Upload, ChevronLeft, ChevronRight, Check, AlertCircle, Star } from 'lucide-react';
import './App.css';

// Homepage Component
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-2 rounded-full">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3 premium-brand">
                <div className="brand-name">Cashifygcmart</div>
                <div className="brand-tagline">Instant Offers, Same-Day Payments</div>
              </div>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="/rate-calculator" className="text-gray-600 hover:text-pink-600 font-medium">Rate Calculator</a>
              <a href="/form-submission" className="text-gray-600 hover:text-pink-600 font-medium">Sell Cards</a>
              <a href="/faqs" className="text-gray-600 hover:text-pink-600 font-medium">FAQs</a>
              <a href="/getting-started" className="text-gray-600 hover:text-pink-600 font-medium">Getting Started</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              <span className="block">Sell Unused Gift Cards for</span>
              <span className="text-pink-600 block">Same-Day Cash Online</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              CashifyGCmart is the trusted gift card exchange platform offering instant quotes, 
              competitive rates up to 93%, and secure same-day payments.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/form-submission">
                <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105">
                  Start Here
                </button>
              </a>
              <a href="/rate-calculator">
                <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105">
                  Check Rates
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" />
              <span>Same-Day Payouts</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              <span>230+ Vendors</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Enter Card Details</h3>
              <p className="text-gray-600">Submit your gift card information and get an instant quote</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Upload Images</h3>
              <p className="text-gray-600">Upload clear photos of your gift card front, back, and receipt</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Get Paid</h3>
              <p className="text-gray-600">Receive payment via your preferred method within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose CashifyGCmart?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Fast Payments</h3>
              <p className="text-sm text-gray-600">Same-day processing for most transactions</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Secure & Safe</h3>
              <p className="text-sm text-gray-600">SSL encryption and secure data handling</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Top Rates</h3>
              <p className="text-sm text-gray-600">Up to 93% of card value guaranteed</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">No Hidden Fees</h3>
              <p className="text-sm text-gray-600">What you see is what you get</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Turn Your Gift Cards into Cash?</h2>
          <p className="text-xl text-pink-100 mb-8">Join thousands of satisfied customers who trust CashifyGCmart</p>
          <a href="/form-submission">
            <button className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Get Started Now
            </button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-pink-600 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 font-semibold">Cashifygcmart</span>
              </div>
              <p className="text-gray-400 text-sm">
                The trusted platform for selling unused gift cards safely and securely.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/rate-calculator" className="text-gray-400 hover:text-white">Rate Calculator</a></li>
                <li><a href="/form-submission" className="text-gray-400 hover:text-white">Sell Cards</a></li>
                <li><a href="/accepted-cards" className="text-gray-400 hover:text-white">Accepted Cards</a></li>
                <li><a href="/getting-started" className="text-gray-400 hover:text-white">Getting Started</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/faqs" className="text-gray-400 hover:text-white">FAQs</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="text-sm text-gray-400 space-y-2">
                <p>Email: support@cashifygcmart.com</p>
                <p>Phone: 1-800-GCMART</p>
                <p>Hours: 24/7 Support</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © 2024 CashifyGCmart. All rights reserved. | Secure transactions powered by SSL encryption.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Rate Calculator Component
const RateCalculator = () => {
  const [selectedBrand, setSelectedBrand] = React.useState('');
  const [cardValue, setCardValue] = React.useState('');
  const [quote, setQuote] = React.useState(null);

  const giftCardBrands = [
    { name: 'Amazon', rate: 0.85 },
    { name: 'Apple/iTunes', rate: 0.80 },
    { name: 'Google Play', rate: 0.75 },
    { name: 'Steam', rate: 0.70 },
    { name: 'eBay', rate: 0.82 },
    { name: 'Walmart', rate: 0.85 },
    { name: 'Target', rate: 0.80 },
    { name: 'Nike', rate: 0.75 },
  ];

  const calculateQuote = () => {
    if (!selectedBrand || !cardValue) return;
    
    const brand = giftCardBrands.find(b => b.name === selectedBrand);
    const value = parseFloat(cardValue);
    const quoteAmount = (value * brand.rate).toFixed(2);
    
    setQuote({
      brand: selectedBrand,
      originalValue: value,
      rate: (brand.rate * 100).toFixed(0),
      quoteAmount: quoteAmount
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Gift Card Rate Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Get an instant quote for your gift cards
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Gift Card Brand
              </label>
              <select 
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Choose a brand...</option>
                {giftCardBrands.map((brand) => (
                  <option key={brand.name} value={brand.name}>
                    {brand.name} - {(brand.rate * 100).toFixed(0)}%
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Value ($)
              </label>
              <input
                type="number"
                value={cardValue}
                onChange={(e) => setCardValue(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          <button
            onClick={calculateQuote}
            className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-md font-semibold transition-colors"
          >
            Calculate Quote
          </button>

          {quote && (
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Your Quote</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Brand:</span>
                  <div className="font-medium">{quote.brand}</div>
                </div>
                <div>
                  <span className="text-gray-600">Card Value:</span>
                  <div className="font-medium">${quote.originalValue}</div>
                </div>
                <div>
                  <span className="text-gray-600">Rate:</span>
                  <div className="font-medium">{quote.rate}%</div>
                </div>
                <div>
                  <span className="text-gray-600">You Get:</span>
                  <div className="font-bold text-green-600 text-lg">${quote.quoteAmount}</div>
                </div>
              </div>
              
              <a href="/form-submission">
                <button className="mt-4 bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded font-medium">
                  Sell This Card
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Form Submission Component
const FormSubmission = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    cards: [{
      brand: '',
      value: '',
      condition: '',
      hasReceipt: '',
      cardType: ''
    }],
    paymentMethod: ''
  });

  const steps = [
    { id: 1, title: 'Personal Information', icon: User },
    { id: 2, title: 'Gift Card Details', icon: CreditCard },
    { id: 3, title: 'Payment Method', icon: DollarSign },
    { id: 4, title: 'Upload & Review', icon: Upload }
  ];

  const progress = (currentStep / steps.length) * 100;

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Submit Your Gift Card
          </h1>
          <p className="text-lg text-gray-600">
            Complete the form below to sell your gift cards quickly and securely
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center space-y-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    isCompleted ? 'bg-green-600 text-white' :
                    isActive ? 'bg-pink-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {isCompleted ? <Check className="w-6 h-6" /> : <StepIcon className="w-6 h-6" />}
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-medium ${isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-pink-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step {currentStep}: {steps[currentStep - 1].title}</h2>
            <p className="text-gray-600 mb-8">Please fill in the required information below</p>
          </div>

          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t space-y-3 sm:space-y-0">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <button
              onClick={nextStep}
              disabled={currentStep === steps.length}
              className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === steps.length
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-pink-600 text-white hover:bg-pink-700'
              }`}
            >
              <span>{currentStep === steps.length ? 'Submit' : 'Next'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rate-calculator" element={<RateCalculator />} />
          <Route path="/form-submission" element={<FormSubmission />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;