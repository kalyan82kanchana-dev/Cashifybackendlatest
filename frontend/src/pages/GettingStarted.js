import React from 'react';
import { 
  Calculator, 
  CreditCard, 
  FileText, 
  CheckCircle,
  ArrowRight,
  DollarSign
} from 'lucide-react';

const GettingStarted = () => {
  const steps = [
    {
      number: "1",
      title: "Rate calculator",
      description: "Our Rate Calculator makes it effortless to see exactly what you'll receive no surprises, no hidden fees. Simply choose your gift card brand, enter its face value, and instantly view a transparent, competitive cash offer in USD. If you're happy with the rate, proceed to submit your card details and enjoy same-day payment. It's the fastest, most secure way to turn your unused gift cards into real money.",
      illustration: "https://customer-assets.emergentagent.com/job_giftcard-trader/artifacts/8x2lpy9l_Gemini_Generated_Image_5p8fls5p8fls5p8f.png"
    },
    {
      number: "2", 
      title: "Select payout method",
      description: "Our Payout Options make it simple to get your cash exactly where you want it. Just choose from PayPal, Cash App, Zelle, Google Pay, Chime, or Bitcoin, enter your account details, and confirm. Once your gift card is verified, we'll send your funds directly typically within hours. No hidden fees, full security, and the flexibility to match your preferred payment method.",
      illustration: "https://customer-assets.emergentagent.com/job_giftcard-trader/artifacts/t93r84ty_Gemini_Generated_Image_qjo6tlqjo6tlqjo6.png"
    },
    {
      number: "3",
      title: "Submit form", 
      description: "Our submission form securely collects your gift card details along with essential contact information your full name, phone number, email address, and any other required fields in one simple step. Just complete the form, upload clear images of your card, and hit 'Submit.' Once we verify everything, you'll be on your way to receiving your instant cash payment without any extra hassle.",
      illustration: "https://customer-assets.emergentagent.com/job_giftcard-trader/artifacts/l5klcneu_20250922_2254_Customer%20Submission%20Success_remix_01k5s75dnjefjbg5y9q69hqbmg.png"
    },
    {
      number: "4",
      title: "Get paid",
      description: "Once your gift card is verified and approved, we process your payment immediately through your chosen method. Whether it's PayPal, Cash App, Zelle, or any other option you selected, your funds are transferred securely and quickly. Most payments are completed the same day, so you can access your cash when you need it most.",
      illustration: "https://customer-assets.emergentagent.com/job_giftcard-trader/artifacts/y3btrbwq_ChatGPT%20Image%20Sep%2022%2C%202025%2C%2011_18_36%20PM.png"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <section className="relative bg-gradient-to-br from-pink-600 via-purple-600 to-red-500 py-12 md:py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-white text-4xl opacity-30">💳</div>
          <div className="absolute top-20 right-20 text-white text-5xl opacity-25">🎯</div>
          <div className="absolute bottom-20 left-20 text-white text-3xl opacity-30">🛍️</div>
          <div className="absolute bottom-10 right-10 text-white text-4xl opacity-25">💰</div>
          <div className="absolute top-1/2 left-1/4 text-white text-6xl opacity-15 transform -rotate-12">📱</div>
          <div className="absolute top-1/3 right-1/3 text-white text-5xl opacity-20 transform rotate-45">🎮</div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Getting Started
          </h1>
          <p className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Turn your unused gift cards into cash with our simple, secure process
          </p>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Our streamlined four-step process
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6 md:mb-12">
            Check your offer with our Rate Calculator, select your payout method, submit your card details, and 
            get paid makes turning unused gift cards into cash effortless. Whether you're clearing out your wallet 
            or cashing in on a surprise gift, we ensure top rates, iron-clad security, and same-day payouts 
            hassle-free.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 md:space-y-20">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full h-12 md:h-20 w-0.5 bg-gradient-to-b from-pink-500 to-transparent hidden md:block"></div>
                )}
                
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}>
                  {/* Content Side */}
                  <div className="flex-1 text-center lg:text-left">
                    {/* Step Number */}
                    <div className="flex items-center justify-center lg:justify-start mb-4 md:mb-6">
                      <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow-lg">
                        {step.number}
                      </div>
                      <div className="ml-4 h-px bg-gradient-to-r from-pink-500 to-transparent w-12 hidden lg:block"></div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-6">
                      {step.title}
                    </h3>
                    <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-4 md:mb-8 max-w-2xl mx-auto lg:mx-0">
                      {step.description}
                    </p>
                    
                    {/* Action Button */}
                    <div className="flex justify-center lg:justify-start">
                      {step.number === "1" && (
                        <a href="/rate-calculator" className="inline-flex items-center bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                          Try Rate Calculator <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                      )}
                      {step.number === "3" && (
                        <a href="/form-submission" className="inline-flex items-center bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                          Submit Your Card <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className="flex-1 flex justify-center">
                    <div className="relative">
                      {/* Main Image Container */}
                      <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl overflow-hidden shadow-2xl">
                        <img 
                          src={step.illustration} 
                          alt={step.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have turned their unused gift cards into cash
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/rate-calculator" 
              className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
            >
              Check Your Rate <Calculator className="ml-2 w-5 h-5" />
            </a>
            <a 
              href="/accepted-cards" 
              className="border-2 border-white text-white hover:bg-white hover:text-pink-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
            >
              View Accepted Cards <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            💡 Pro Tips for Best Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-4">📷</div>
              <h3 className="text-xl font-semibold mb-3">Clear Photos</h3>
              <p className="text-gray-600">Take high-quality photos of your card and PIN for faster processing</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Complete Details</h3>
              <p className="text-gray-600">Fill out all required fields accurately to avoid delays</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3">Keep Receipt</h3>
              <p className="text-gray-600">Upload your purchase receipt for higher rates when available</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GettingStarted;