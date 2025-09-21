import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CheckCircle, Clock, Shield, Smartphone, Leaf, CreditCard, DollarSign } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Header Component
const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-2 rounded-full">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900">GiftCard Exchange</span>
          </div>
          
          {/* Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="text-gray-900 hover:text-pink-600 px-3 py-2 text-sm font-medium">Home</a>
              <a href="#getting-started" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium">Getting Started</a>
              <a href="#accepted-cards" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium">Accepted Gift Cards</a>
              <a href="#form-submission" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium">Form Submission</a>
              <a href="#rate-calculator" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium">Rate Calculator</a>
              <a href="#faqs" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium">FAQs</a>
            </div>
          </div>
          
          {/* Upload Card Button */}
          <div className="flex items-center">
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Upload Card
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-pink-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Turn Unused Gift Cards
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-600">
                into Same-Day Cash
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              Don't let your unused gift cards go to waste. At GiftCard Exchange, we make it quick and 
              easy to convert your cards into real money. Enjoy a fast, secure, and user-friendly 
              experience – anytime, anywhere.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Get Cash Now
              </button>
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                See Accepted Gift Cards
              </button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" 
              alt="Happy customers exchanging gift cards" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Statistics Section
const StatsSection = () => {
  const stats = [
    { number: "100+", label: "Choose Your Card", description: "Select the gift card brand and enter its balance." },
    { number: "93%", label: "Get an Instant Quote", description: "We'll show you how much cash you can get - instantly and transparently." },
    { number: "650+", label: "Partnering with Trusted Vendors", description: "Partnering with 650+ trusted entities to power our expansive network." },
    { number: "+120", label: "Receive Your Cash", description: "Get is sent quickly from our team, within 24 hours in most cases." }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-pink-600 font-semibold text-lg mb-4">NEW TO GIFT CARD TRADING?</h2>
        <h3 className="text-4xl font-bold text-gray-900 mb-16">We've Got You Covered.</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-pink-100 rounded-2xl p-8 mb-4">
                <div className="text-4xl font-bold text-pink-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Process Section
const ProcessSection = () => {
  const steps = [
    {
      icon: <DollarSign className="h-12 w-12 text-white" />,
      title: "See Your Savings",
      description: "Top cash value with clear, up-front quotes."
    },
    {
      icon: <CreditCard className="h-12 w-12 text-white" />,
      title: "Customize Your Cash-Out",
      description: "Choose digital wallets or crypto get paid your way."
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-white" />,
      title: "Enjoy Instant Liquidity",
      description: "Secure verification and same-day payouts."
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-pink-400 font-semibold text-lg mb-4">Benefit-Focused Steps</h2>
        <h3 className="text-4xl font-bold text-white mb-16">How to Sell Your Gift Cards</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-pink-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                {step.icon}
              </div>
              <h4 className="text-xl font-semibold text-white mb-4">{step.title}</h4>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Section
const WhyChooseUsSection = () => {
  const features = [
    {
      icon: <Shield className="h-12 w-12 text-pink-600" />,
      title: "Anchored in Integrity",
      description: "At GiftCard Exchange, we value honesty. Every transaction is clear, transparent, and free from hidden terms or fine print."
    },
    {
      icon: <Clock className="h-12 w-12 text-pink-600" />,
      title: "Speed & Efficiency",
      description: "Time is money — we process your gift card trades swiftly, ensuring you receive your cash without delay."
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-pink-600" />,
      title: "Dependable Service",
      description: "Count on consistent, reliable service every time you trade. Whether it's your first card or your fiftieth, we're here to deliver."
    },
    {
      icon: <Smartphone className="h-12 w-12 text-pink-600" />,
      title: "Simplicity at Its Best",
      description: "No confusion. No tech headaches. Our platform is designed to be clean, user-friendly, and accessible for everyone."
    },
    {
      icon: <Shield className="h-12 w-12 text-pink-600" />,
      title: "Advanced Security",
      description: "Your privacy matters. We use industry-grade encryption and fraud protection to safeguard your card details and transactions."
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-pink-600" />,
      title: "Customer-First Support",
      description: "Have a question? Our responsive support team is just a message away — ready to assist you at any step of the journey."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
        <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
          Sell your unused gift cards with ease, speed, and confidence. We offer a secure, hassle-free process and 
          transparent rates to ensure you get the best value, every time.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`p-8 rounded-2xl ${index === 2 ? 'bg-pink-600 text-white' : 'bg-gray-50'}`}>
              <div className="flex justify-center mb-6">
                {React.cloneElement(feature.icon, {
                  className: `h-12 w-12 ${index === 2 ? 'text-white' : 'text-pink-600'}`
                })}
              </div>
              <h4 className={`text-xl font-semibold mb-4 ${index === 2 ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h4>
              <p className={index === 2 ? 'text-pink-100' : 'text-gray-600'}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Advantages Section
const AdvantagesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-8">
              Advantages of becoming a customer of our company.
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-white text-pink-600 rounded-full p-2 mr-4 mt-1">
                  <span className="font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Mobile-First Convenience</h3>
                  <p className="text-pink-100">Sell your gift cards in seconds, straight from your phone.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white text-pink-600 rounded-full p-2 mr-4 mt-1">
                  <span className="font-bold text-lg">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Eco-Friendly Digital Processing</h3>
                  <p className="text-pink-100">Go fully digital to cut waste and carbon emissions.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white text-pink-600 rounded-full p-2 mr-4 mt-1">
                  <span className="font-bold text-lg">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Extensive Card Coverage</h3>
                  <p className="text-pink-100">We buy hundreds of major gift-card brands, no matter the balance.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white text-pink-600 rounded-full p-2 mr-4 mt-1">
                  <span className="font-bold text-lg">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
                  <p className="text-pink-100">See your exact payout up front with zero hidden fees.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors">
                Getting Started
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-pink-600 px-8 py-4 rounded-lg font-semibold transition-colors">
                Sell Your Gift Card
              </button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop" 
              alt="Success illustration" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Payment Methods Section
const PaymentMethodsSection = () => {
  const paymentMethods = [
    { name: "PayPal", logo: "💳" },
    { name: "Cash App", logo: "💵" },
    { name: "Zelle", logo: "⚡" },
    { name: "Google Pay", logo: "📱" },
    { name: "Chime", logo: "🏦" },
    { name: "Bitcoin", logo: "₿" }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop" 
              alt="Cash out your way illustration" 
              className="rounded-2xl shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Cash Out Your Way</h2>
            <p className="text-lg text-gray-600 mb-8">
              Choose PayPal, Cash App, Zelle, Google Pay, Chime, or Bitcoin, 
              enter your details, and receive your payment often within hours, 
              with no hidden fees and full security.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              {paymentMethods.map((method, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                  <div className="text-2xl mb-2">{method.logo}</div>
                  <div className="text-sm font-medium text-gray-700">{method.name}</div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="bg-pink-100 p-4 rounded-lg">
                <div className="text-pink-600 font-semibold">CUSTOMERS SERVED TILL DATE 9,45670</div>
              </div>
              <div className="bg-pink-100 p-4 rounded-lg">
                <div className="text-pink-600 font-semibold">PAYMENTS PROCESSED 6 MILLION $</div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 rounded-lg font-semibold transition-colors">
                Getting Started
              </button>
              <button className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                Sell Your Gift Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Olivia S",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "I've used GC Swapmart multiple times and they've never let me down. It's secure, fast, and I always get fair value for my gift cards. Can't ask for more!"
    },
    {
      name: "Cleveland Des",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "GC Swapmart is now my go-to for selling gift cards. Their site is clean, easy to use, and I always get top rates. Great experience every time!"
    },
    {
      name: "Davis Jordan",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "I was skeptical at first, but GC Swapmart exceeded expectations. The process was simple, and I had cash in my account fast. Highly recommend for anyone."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Recent <span className="text-pink-600">reviews</span> from our customers
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-2xl">
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
              <div className="font-semibold text-gray-900">{testimonial.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-2 rounded-full">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold">GiftCard Exchange</span>
            </div>
            <p className="text-gray-400 mb-6">
              Turn Gift Cards into Cash Instantly with GiftCard Exchange! Trade unused gift cards 
              for quick cash - fast, easy and hassle-free!
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#getting-started" className="hover:text-white transition-colors">Getting Started</a></li>
              <li><a href="#accepted-cards" className="hover:text-white transition-colors">Accepted Gift Cards</a></li>
              <li><a href="#form-submission" className="hover:text-white transition-colors">Form Submission</a></li>
              <li><a href="#important-notice" className="hover:text-white transition-colors">Important Notice</a></li>
            </ul>
          </div>
          
          {/* Menu */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Menu</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#faqs" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#cookie-policy" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#rate-calculator" className="hover:text-white transition-colors">Rate Calculator</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#refund-policy" className="hover:text-white transition-colors">Refund Policy</a></li>
              <li><a href="#imp-guidelines" className="hover:text-white transition-colors">IMP Guidelines</a></li>
            </ul>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">📧 support@giftcardexchange.com</p>
          </div>
          <div>
            <p className="text-gray-400">📞 +1-305-389-8091</p>
          </div>
          <div>
            <p className="text-gray-400">📍 (321) 208-7512 111 Longwood Ave<br />Rockledge, Florida FL, 32955</p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">Copyright @giftcardexchange.com - All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <StatsSection />
      <ProcessSection />
      <WhyChooseUsSection />
      <AdvantagesSection />
      <PaymentMethodsSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;