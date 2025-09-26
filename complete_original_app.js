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
        threshold: 0.6,
        rootMargin: '0px 0px -100px 0px'
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
        
        const elementCenter = elementTop + (elementHeight / 2);
        const distanceFromCenter = Math.abs((window.pageYOffset + windowHeight / 2) - elementCenter);
        const maxDistance = windowHeight / 2 + elementHeight / 2;
        
        if (distanceFromCenter < maxDistance) {
          const progress = 1 - (distanceFromCenter / maxDistance);
          const moveY = progress * 15;
          const scaleValue = 1 + (progress * 0.05);
          
          element.style.transform = `translateY(-${moveY}px) scale(${scaleValue})`;
          element.style.opacity = 0.7 + (progress * 0.3);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
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

// Homepage Component with all sections
const HomePage = () => {
  useScrollMovement();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
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

      {/* All other sections continue here... I'll provide these separately */}
      {/* This is just the first part to test deployment */}
    </div>
  );
};

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rate-calculator" element={<RateCalculator />} />
          <Route path="/form-submission" element={<FormSubmission />} />
          <Route path="/accepted-cards" element={<AcceptedGiftCards />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/security-page" element={<SecurityPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;