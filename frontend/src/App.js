import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CheckCircle, Clock, Shield, Smartphone, Leaf, CreditCard, DollarSign } from "lucide-react";
import RateCalculator from "./pages/RateCalculator";

// Custom hook for scroll animations
const useScrollAnimation = () => {
  React.useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Header Component
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-2 rounded-full">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">GiftCard Exchange</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="/" className="text-gray-900 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-110 relative hover:font-semibold">Home</a>
              <a href="/getting-started" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-110 relative hover:font-semibold">Getting Started</a>
              <a href="/accepted-cards" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-110 relative hover:font-semibold">Accepted Gift Cards</a>
              <a href="/form-submission" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-110 relative hover:font-semibold">Form Submission</a>
              <a href="/rate-calculator" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-110 relative hover:font-semibold">Rate Calculator</a>
              <a href="/faqs" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-110 relative hover:font-semibold">FAQs</a>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <a href="/" className="text-gray-900 hover:text-pink-600 block px-3 py-2 text-base font-medium">Home</a>
              <a href="/getting-started" className="text-gray-700 hover:text-pink-600 block px-3 py-2 text-base font-medium">Getting Started</a>
              <a href="/accepted-cards" className="text-gray-700 hover:text-pink-600 block px-3 py-2 text-base font-medium">Accepted Gift Cards</a>
              <a href="/form-submission" className="text-gray-700 hover:text-pink-600 block px-3 py-2 text-base font-medium">Form Submission</a>
              <a href="/rate-calculator" className="text-gray-700 hover:text-pink-600 block px-3 py-2 text-base font-medium">Rate Calculator</a>
              <a href="/faqs" className="text-gray-700 hover:text-pink-600 block px-3 py-2 text-base font-medium">FAQs</a>
            </div>
          </div>
        )}
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
              Turn Unused Gift Cards into 
              <span className="text-pink-600 block">Same-Day Cash</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              Don't let your unused gift cards go to waste. At GiftCard Exchange, we make it quick and 
              easy to convert your cards into real money. Enjoy a fast, secure, and user-friendly 
              experience – anytime, anywhere.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="/form-submission">
                <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl transform">
                  Get Cash Now
                </button>
              </a>
              <a href="/accepted-cards">
                <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl transform">
                  See Accepted Gift Cards
                </button>
              </a>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" 
              alt="Happy customers exchanging gift cards" 
              className="rounded-2xl shadow-2xl float-animation"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Statistics Section
const StatsSection = () => {
  const [selectedStat, setSelectedStat] = React.useState(null);

  const stats = [
    { number: "100+", label: "Choose Your Card", description: "Select the gift card brand and enter its balance." },
    { number: "93%", label: "Get an Instant Quote", description: "We'll show you how much cash you can get - instantly and transparently." },
    { number: "650+", label: "Partnering with Trusted Vendors", description: "Partnering with 650+ trusted entities to power our expansive network." },
    { number: "+120", label: "Receive Your Cash", description: "Get is sent quickly from our team, within 24 hours in most cases." }
  ];

  const handleStatClick = (index) => {
    setSelectedStat(selectedStat === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="scroll-animate slide-up">
          <h2 className="text-pink-600 font-semibold text-lg mb-4">NEW TO GIFT CARD TRADING?</h2>
          <h3 className="text-4xl font-bold text-gray-900 mb-16">We've Got You Covered.</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const isSelected = selectedStat === index;
            return (
              <div key={index} className="text-center">
                <div 
                  onClick={() => handleStatClick(index)}
                  className={`scroll-animate slide-up rounded-2xl p-8 mb-4 transition-all duration-300 cursor-pointer transform
                    ${isSelected 
                      ? 'bg-pink-200 scale-105 shadow-xl' 
                      : 'bg-pink-100 hover:bg-pink-200 hover:scale-105 hover:shadow-xl'
                    }
                    active:scale-95 touch-manipulation`}
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className={`text-4xl font-bold mb-2 transition-colors duration-200 ${
                    isSelected ? 'text-pink-700' : 'text-pink-600 hover:text-pink-700'
                  }`}>
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </div>
              </div>
            );
          })}
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
        <div className="scroll-animate slide-up">
          <h2 className="text-pink-400 font-semibold text-lg mb-4">Benefit-Focused Steps</h2>
          <h3 className="text-4xl font-bold text-white mb-16">How to Sell Your Gift Cards</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center scroll-animate" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="bg-pink-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 transform transition-transform duration-300 hover:scale-110">
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
  const [selectedFeature, setSelectedFeature] = React.useState(null);

  const features = [
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Anchored in Integrity",
      description: "At GiftCard Exchange, we value honesty. Every transaction is clear, transparent, and free from hidden terms or fine print."
    },
    {
      icon: <Clock className="h-12 w-12" />,
      title: "Speed & Efficiency",
      description: "Time is money — we process your gift card trades swiftly, ensuring you receive your cash without delay."
    },
    {
      icon: <CheckCircle className="h-12 w-12" />,
      title: "Dependable Service",
      description: "Count on consistent, reliable service every time you trade. Whether it's your first card or your fiftieth, we're here to deliver."
    },
    {
      icon: <Smartphone className="h-12 w-12" />,
      title: "Simplicity at Its Best",
      description: "No confusion. No tech headaches. Our platform is designed to be clean, user-friendly, and accessible for everyone."
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Advanced Security",
      description: "Your privacy matters. We use industry-grade encryption and fraud protection to safeguard your card details and transactions."
    },
    {
      icon: <CheckCircle className="h-12 w-12" />,
      title: "Customer-First Support",
      description: "Have a question? Our responsive support team is just a message away — ready to assist you at any step of the journey."
    }
  ];

  const handleFeatureClick = (index) => {
    setSelectedFeature(selectedFeature === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="scroll-animate slide-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
            Sell your unused gift cards with ease, speed, and confidence. We offer a secure, hassle-free process and 
            transparent rates to ensure you get the best value, every time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const isSelected = selectedFeature === index;
            return (
              <div 
                key={index} 
                onClick={() => handleFeatureClick(index)}
                className={`scroll-animate slide-right p-8 rounded-2xl transition-all duration-300 cursor-pointer transform
                  ${isSelected 
                    ? 'bg-pink-600 text-white scale-105 shadow-2xl' 
                    : 'bg-gray-50 hover:bg-white hover:scale-105 hover:shadow-2xl'
                  }
                  active:scale-95 touch-manipulation`}
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className={`flex justify-center mb-6 transform transition-all duration-200 
                  ${isSelected ? 'scale-110' : 'hover:scale-110'}`}>
                  {React.cloneElement(feature.icon, {
                    className: `h-12 w-12 transition-colors duration-200 ${
                      isSelected ? 'text-white' : 'text-pink-600'
                    }`
                  })}
                </div>
                <h4 className={`text-xl font-semibold mb-4 transition-colors duration-200 ${
                  isSelected ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h4>
                <p className={`transition-colors duration-200 ${
                  isSelected ? 'text-pink-100' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            );
          })}
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
              <a href="/getting-started">
                <button className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors">
                  Getting Started
                </button>
              </a>
              <a href="/form-submission">
                <button className="border-2 border-white text-white hover:bg-white hover:text-pink-600 px-8 py-4 rounded-lg font-semibold transition-colors">
                  Sell Your Gift Card
                </button>
              </a>
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
                <div key={index} className="bg-white hover:bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-xl text-center transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="text-2xl mb-2 transition-transform duration-200 hover:scale-125">{method.logo}</div>
                  <div className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors duration-200">{method.name}</div>
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
              <a href="/getting-started">
                <button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 rounded-lg font-semibold transition-colors">
                  Getting Started
                </button>
              </a>
              <a href="/form-submission">
                <button className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                  Sell Your Gift Card
                </button>
              </a>
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
        <div className="scroll-animate slide-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Recent <span className="text-pink-600">reviews</span> from our customers
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="scroll-animate slide-up bg-gray-50 hover:bg-white p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer" style={{ animationDelay: `${index * 0.2}s` }}>
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 transition-transform duration-200 hover:scale-110"
              />
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 hover:text-yellow-500 text-xl transition-colors duration-150">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic hover:text-gray-800 transition-colors duration-200">"{testimonial.text}"</p>
              <div className="font-semibold text-gray-900 hover:text-pink-600 transition-colors duration-200">{testimonial.name}</div>
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
              <li><a href="/getting-started" className="hover:text-white transition-colors">Getting Started</a></li>
              <li><a href="/accepted-cards" className="hover:text-white transition-colors">Accepted Gift Cards</a></li>
              <li><a href="/form-submission" className="hover:text-white transition-colors">Form Submission</a></li>
              <li><a href="/rate-calculator" className="hover:text-white transition-colors">Rate Calculator</a></li>
            </ul>
          </div>
          
          {/* Menu */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Menu</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="/faqs" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li>📧 support@giftcardexchange.com</li>
              <li>📞 +1-305-389-8091</li>
              <li>📍 111 Longwood Ave<br />Rockledge, Florida FL, 32955</li>
            </ul>
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
  useScrollAnimation();
  
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
          <Route path="/rate-calculator" element={<><Header /><RateCalculator /><Footer /></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;