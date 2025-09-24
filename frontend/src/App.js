import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CheckCircle, Clock, Shield, Smartphone, Leaf, CreditCard, DollarSign } from "lucide-react";
import RateCalculator from "./pages/RateCalculator";
import FormSubmission from "./pages/FormSubmission";
import AcceptedGiftCards from "./pages/AcceptedGiftCards";
import FAQs from "./pages/FAQs";
import GettingStarted from "./pages/GettingStarted";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import TermsOfService from "./pages/TermsOfService";
import SecurityPage from "./pages/SecurityPage";

// Visible scroll-based movement effect
// Animated Counter Component - Triggers only on scroll into view
const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const counterRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.6, // Trigger when 60% of element is visible
        rootMargin: '0px 0px -100px 0px' // Start animation slightly before fully visible
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  React.useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth, impressive animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * target);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div ref={counterRef} className="text-pink-600 font-bold text-lg md:text-xl">
      {formatNumber(count)}
    </div>
  );
};

// Custom hook for scroll movement effect
const useScrollMovement = () => {
  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.scroll-move');
      
      parallaxElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.pageYOffset;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate if element is in viewport
        const elementCenter = elementTop + (elementHeight / 2);
        const distanceFromCenter = Math.abs((window.pageYOffset + windowHeight / 2) - elementCenter);
        const maxDistance = windowHeight / 2 + elementHeight / 2;
        
        if (distanceFromCenter < maxDistance) {
          // Element is visible, apply movement
          const progress = 1 - (distanceFromCenter / maxDistance);
          const moveY = progress * 15; // Move up to 15px
          const scaleValue = 1 + (progress * 0.05); // Scale up to 1.05
          
          element.style.transform = `translateY(-${moveY}px) scale(${scaleValue})`;
          element.style.opacity = 0.7 + (progress * 0.3); // Fade effect
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
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
              <div className="ml-3 premium-brand">
                <div className="brand-name">Cashifygcmart</div>
                <div className="brand-tagline">Instant Offers, Same-Day Payments</div>
              </div>
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
    <section className="bg-gradient-to-br from-pink-50 to-blue-50 py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight md:leading-tight">
              <span className="block">Sell Unused Gift Cards for</span>
              <span className="text-pink-600 block">Same-Day Cash Online</span>
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-600 max-w-lg leading-relaxed">
              CashifyGCmart is the trusted gift card exchange platform offering instant quotes, competitive rates up to 93%, and secure same-day payments. Turn your unwanted gift cards into cash today.
            </p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4">
              <a href="/form-submission">
                <button className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl transform">
                  Start Here
                </button>
              </a>
              <a href="/accepted-cards">
                <button className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl transform">
                  See 100+ Accepted Brands
                </button>
              </a>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-8 md:mt-10">
              <p className="text-sm text-gray-500 mb-4">Trusted by thousands of customers nationwide</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>No Hidden Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>Same-Day Payouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-green-600" />
                  <span>230+ Vendors</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <img 
              src="https://customer-assets.emergentagent.com/job_giftcard-trader/artifacts/gtkeecwv_Gemini_Generated_Image_57zioz57zioz57zi.png" 
              alt="Happy customers exchanging gift cards for cash online - Cashifygcmart secure platform" 
              className="hero-image w-full h-auto object-contain max-w-full"
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
    { number: "100+", label: "Choose Your Card", description: "Select a brand and enter the balance to view current offers." },
    { number: "92%", label: "Get an Instant Quote", description: "Instant transparent pricing so you know what to expect." },
    { number: "230+", label: "Trusted Vendor Network", description: "Expert resources from vetted vendors." }
  ];

  const handleStatClick = (index) => {
    setSelectedStat(selectedStat === index ? null : index);
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-10 md:mb-12">
          <h2 className="text-pink-600 font-semibold text-base md:text-lg mb-3">First Time Selling a Gift Card?</h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Easy setup, clear rates, and same-day payout options.</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const isSelected = selectedStat === index;
            return (
              <div key={index} className="text-center">
                <div 
                  onClick={() => handleStatClick(index)}
                  className={`scroll-move rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 transition-all duration-300 cursor-pointer transform
                    ${isSelected 
                      ? 'bg-pink-200 scale-105 shadow-xl' 
                      : 'bg-pink-100 hover:bg-pink-200 hover:scale-105 hover:shadow-xl'
                    }
                    active:scale-95 touch-manipulation`}
                  style={{ 
                    WebkitTapHighlightColor: 'transparent'
                  }}
                >
                  <div className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-2 transition-colors duration-200 ${
                    isSelected ? 'text-pink-700' : 'text-pink-600 hover:text-pink-700'
                  }`}>
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                  <div className="text-xs md:text-sm text-gray-600">{stat.description}</div>
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
      title: "Get Your Best Cash Offer",
      description: "See a clear, up-front quote and get the highest payout available."
    },
    {
      icon: <CreditCard className="h-12 w-12 text-white" />,
      title: "Pick a Wallet, Get Paid",
      description: "Fast payouts to the wallet you choose."
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-white" />,
      title: "Unlock Same-Day Payouts",
      description: "Quick verification and reliable same-day transfers."
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-10 md:mb-12">
          <h2 className="text-pink-400 font-semibold text-base md:text-lg mb-3">Getting Started: Sell a Gift Card</h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">We'll walk you through each step — no surprises.</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {steps.map((step, index) => (
            <div key={index} className="text-center scroll-move">
              <div className="bg-pink-600 rounded-full w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center mx-auto mb-4 md:mb-6 transform transition-transform duration-300 hover:scale-110">
                {React.cloneElement(step.icon, {
                  className: "h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-white"
                })}
              </div>
              <h4 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-4">{step.title}</h4>
              <p className="text-sm md:text-base text-gray-300 px-2">{step.description}</p>
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
      title: "Honest Pricing, Always",
      description: "Clear, up-front offers — no hidden clauses, ever."
    },
    {
      icon: <Clock className="h-12 w-12" />,
      title: "Quick Turnaround",
      description: "Fast verification and prompt payouts so you don't wait for your cash."
    },
    {
      icon: <CheckCircle className="h-12 w-12" />,
      title: "Consistent Results",
      description: "Dependable processing and predictable outcomes every time you sell."
    },
    {
      icon: <Smartphone className="h-12 w-12" />,
      title: "Designed for Everyone",
      description: "Intuitive flows and friction-free steps — sell a card in minutes."
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Privacy First",
      description: "Encrypted storage and strict fraud checks protect your information."
    },
    {
      icon: <CheckCircle className="h-12 w-12" />,
      title: "Help When You Need It",
      description: "Responsive support via chat or email — real people, real help."
    }
  ];

  const handleFeatureClick = (index) => {
    setSelectedFeature(selectedFeature === index ? null : index);
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Why Choose Us?</h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Sell your unused gift cards with ease, speed, and confidence. We offer a secure, hassle-free process and 
            transparent rates to ensure you get the best value, every time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const isSelected = selectedFeature === index;
            return (
              <div 
                key={index} 
                onClick={() => handleFeatureClick(index)}
                className={`scroll-move p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl transition-all duration-300 cursor-pointer transform
                  ${isSelected 
                    ? 'bg-pink-600 text-white scale-105 shadow-2xl' 
                    : 'bg-gray-50 hover:bg-white hover:scale-105 hover:shadow-2xl'
                  }
                  active:scale-95 touch-manipulation`}
                style={{ 
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <div className={`flex justify-center mb-4 md:mb-6 transform transition-all duration-200 
                  ${isSelected ? 'scale-110' : 'hover:scale-110'}`}>
                  {React.cloneElement(feature.icon, {
                    className: `h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 transition-colors duration-200 ${
                      isSelected ? 'text-white' : 'text-pink-600'
                    }`
                  })}
                </div>
                <h4 className={`text-base md:text-lg lg:text-xl font-semibold mb-2 md:mb-4 transition-colors duration-200 ${
                  isSelected ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h4>
                <p className={`text-xs md:text-sm lg:text-base transition-colors duration-200 ${
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
    <section className="py-12 md:py-16 bg-gradient-to-r from-pink-600 to-pink-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-white">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">
              Advantages of becoming a customer of our company.
            </h2>
            
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start">
                <div className="bg-white text-pink-600 rounded-full p-2 mr-3 md:mr-4 mt-1 flex-shrink-0">
                  <span className="font-bold text-sm md:text-base lg:text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Sell On The Go</h3>
                  <p className="text-pink-100 text-sm md:text-base">Complete a sale from anywhere in minutes using your phone.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white text-pink-600 rounded-full p-2 mr-3 md:mr-4 mt-1 flex-shrink-0">
                  <span className="font-bold text-sm md:text-base lg:text-lg">2</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Digital & Eco-Friendly</h3>
                  <p className="text-pink-100 text-sm md:text-base">Paperless processing that's faster and better for the planet.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white text-pink-600 rounded-full p-2 mr-3 md:mr-4 mt-1 flex-shrink-0">
                  <span className="font-bold text-sm md:text-base lg:text-lg">3</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Huge Brand Selection</h3>
                  <p className="text-pink-100 text-sm md:text-base">We accept hundreds of gift-card brands and any balance.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white text-pink-600 rounded-full p-2 mr-3 md:mr-4 mt-1 flex-shrink-0">
                  <span className="font-bold text-sm md:text-base lg:text-lg">4</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Fair, Upfront Offers</h3>
                  <p className="text-pink-100 text-sm md:text-base">Transparent quotes with clear fees — accept only if you're happy.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4">
              <a href="/getting-started" className="w-full sm:w-auto">
                <button className="w-full bg-white text-pink-600 hover:bg-gray-100 px-4 sm:px-6 md:px-8 py-3 rounded-lg font-semibold text-sm sm:text-base transition-colors">
                  Get Started
                </button>
              </a>
              <a href="/form-submission" className="w-full sm:w-auto">
                <button className="w-full border-2 border-white text-white hover:bg-white hover:text-pink-600 px-4 sm:px-6 md:px-8 py-3 rounded-lg font-semibold text-sm sm:text-base transition-colors">
                  Sell Gift Card
                </button>
              </a>
            </div>
          </div>
          
          <div className="relative mt-8 lg:mt-0 bg-transparent">
            <div className="clean-image-wrapper">
              <img 
                src="https://customer-assets.emergentagent.com/job_giftcard-trader/artifacts/kwthizs9_Gemini_Generated_Image_tsh5iztsh5iztsh5.png" 
                alt="Happy satisfied customers celebrating success" 
                className="success-trophy-image w-full h-auto object-contain"
                style={{background: 'transparent'}}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// How It Works Process Section
const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      icon: (
        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Select your card from our Accepted Gift Cards tab.",
      description: "If it's not listed, contact support via email or Live Chat."
    },
    {
      number: "2", 
      icon: (
        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Select your card in our Rate Calculator for an instant quote.",
      description: "Happy with the rate? Proceed to the next step."
    },
    {
      number: "3",
      icon: (
        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: "Fill in your gift card details and submit the form.",
      description: "Pick your payment method to complete."
    },
    {
      number: "4",
      icon: (
        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "We verify and approve your card.",
      description: "Funds are sent to your chosen payment method."
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-pink-600">The all-in-one solution</span> for turning
            <br />
            your unused gift cards
            <br />
            <span className="text-gray-900">into instant cash.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Steps */}
          <div className="space-y-6 md:space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="scroll-move flex items-start">
                <div className="bg-pink-600 rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center mr-4 md:mr-6 flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Rate Calculator Mockup - Responsive */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Clean phone frame - much smaller on mobile */}
              <div className="w-48 sm:w-56 md:w-64 lg:w-80 xl:w-96 bg-black rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-1 sm:p-1.5 md:p-2 shadow-2xl">
                <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-4 sm:p-6 md:p-8 h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden">
                  {/* Screen content */}
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="text-center mb-4 md:mb-6">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-blue-900 leading-tight">
                        Get the current value for your transaction
                      </h3>
                    </div>

                    {/* Gift Card Category */}
                    <div className="mb-3 md:mb-4">
                      <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2 md:mb-3">
                        Gift Card Category<span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-1.5 md:space-y-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-300 rounded mr-2"></div>
                          <span className="text-xs md:text-sm text-gray-700">Card with Receipt</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-300 rounded mr-2"></div>
                          <span className="text-xs md:text-sm text-gray-700">Card without Receipt</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-300 rounded mr-2"></div>
                          <span className="text-xs md:text-sm text-gray-700">Card Partially Used</span>
                        </div>
                      </div>
                    </div>

                    {/* Input Fields */}
                    <div className="mb-2 md:mb-3">
                      <div className="border-2 border-gray-300 rounded-lg p-2 md:p-3 text-xs md:text-sm text-gray-400">
                        Gift Card Name
                      </div>
                    </div>
                    
                    <div className="mb-4 md:mb-6">
                      <div className="border-2 border-gray-300 rounded-lg p-2 md:p-3 text-xs md:text-sm text-gray-400">
                        Value of Gift Card
                      </div>
                    </div>

                    {/* Result Display */}
                    <div className="mb-4 md:mb-6 text-center">
                      <p className="text-xs md:text-sm font-semibold text-gray-900 mb-1">How much you will get</p>
                      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">0.00</p>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-2 md:space-y-3">
                      <div className="bg-blue-600 text-white text-center py-2 md:py-3 px-3 md:px-4 rounded-full text-xs md:text-sm font-semibold">
                        Check Rate
                      </div>
                      <div className="border-2 border-gray-900 text-gray-900 text-center py-2 md:py-3 px-3 md:px-4 rounded-full text-xs md:text-sm font-semibold">
                        Proceed to Trade Card
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-10 md:mt-12">
          <div className="bg-pink-100 p-3 md:p-4 rounded-lg inline-flex flex-col sm:flex-row items-center justify-center mb-6 mx-4 sm:mx-0">
            <svg className="h-5 w-5 md:h-6 md:w-6 text-pink-600 mb-2 sm:mb-0 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div className="text-center sm:text-left">
              <div className="text-pink-600 font-semibold text-sm md:text-base">CUSTOMERS SERVED TILL DATE</div>
              <AnimatedCounter target={874458} duration={2500} />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a href="/form-submission" className="flex-1">
              <button className="w-full bg-pink-600 text-white hover:bg-pink-700 px-6 py-3 rounded-lg font-semibold text-sm transition-colors">
                Start Trading Now
              </button>
            </a>
            <a href="/rate-calculator" className="flex-1">
              <button className="w-full border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors">
                Check Rates
              </button>
            </a>
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
      name: "Jordan K., Chicago",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "I sold three cards in one go — each payout arrived the same day. CashifyGCmart made the whole process seamless."
    },
    {
      name: "Samantha W., Boston",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Reliable and transparent. CashifyGCmart is the best gift-card buyer I've tried."
    },
    {
      name: "Cameron P., Denver",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "The whole process was effortless: clear instructions, quick verification, and a reliable payout from CashifyGCmart."
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Recent <span className="text-pink-600">reviews</span> from our customers
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="scroll-move bg-gray-50 hover:bg-white p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full mx-auto mb-3 md:mb-4 transition-transform duration-200 hover:scale-110"
              />
              <div className="flex justify-center mb-3 md:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 hover:text-yellow-500 text-lg md:text-xl transition-colors duration-150">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 md:mb-6 italic hover:text-gray-800 transition-colors duration-200 text-sm md:text-base">"{testimonial.text}"</p>
              <div className="font-semibold text-gray-900 hover:text-pink-600 transition-colors duration-200 text-sm md:text-base">{testimonial.name}</div>
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
              <div className="ml-3 premium-brand">
                <div className="brand-name">Cashifygcmart</div>
                <div className="brand-tagline">Instant Offers, Same-Day Payments</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Turn Gift Cards into Cash Instantly with Cashifygcmart! Trade unused gift cards 
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
              <li><a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</a></li>
              <li><a href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="/security" className="hover:text-white transition-colors">Security & Data Protection</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li>📧 support@cashifygcmart.com</li>
              <li>📞 (555) 013-2099</li>
              <li>📍 2099 Harborview Drive, Suite 210<br />San Diego, CA 92101</li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">Copyright @cashifygcmart.com - All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const Home = () => {
  useScrollMovement();
  
  return (
    <div>
      <Header />
      <HeroSection />
      <StatsSection />
      <ProcessSection />
      <WhyChooseUsSection />
      <AdvantagesSection />
      <HowItWorksSection />
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
          <Route path="/form-submission" element={<><Header /><FormSubmission /><Footer /></>} />
          <Route path="/accepted-cards" element={<><Header /><AcceptedGiftCards /><Footer /></>} />
          <Route path="/faqs" element={<><Header /><FAQs /><Footer /></>} />
          <Route path="/getting-started" element={<><Header /><GettingStarted /><Footer /></>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/security" element={<SecurityPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;