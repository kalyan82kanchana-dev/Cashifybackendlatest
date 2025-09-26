import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Simple Home component
const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-pink-500 to-purple-600">
    <div className="container mx-auto px-4 py-16">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-6">Cashifygcmart</h1>
        <p className="text-2xl mb-8">Sell Unused Gift Cards for Same-Day Cash Online</p>
        <div className="space-x-4">
          <Link to="/rate-calculator" className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Get Started
          </Link>
          <Link to="/accepted-cards" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600">
            See 100+ Accepted Brands
          </Link>
        </div>
      </div>
    </div>
  </div>
);

// Simple Rate Calculator component
const RateCalculator = () => (
  <div className="min-h-screen bg-gray-50 py-16">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Rate Calculator</h1>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <p className="text-gray-600 text-center">Rate calculator functionality coming soon!</p>
      </div>
    </div>
  </div>
);

// Simple Form Submission component
const FormSubmission = () => (
  <div className="min-h-screen bg-gray-50 py-16">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Submit Your Gift Card</h1>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <p className="text-gray-600 text-center">Form submission functionality coming soon!</p>
      </div>
    </div>
  </div>
);

// Navigation component
const Navigation = () => (
  <nav className="bg-white shadow-lg">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold text-pink-600">
          Cashifygcmart
        </Link>
        <div className="space-x-6">
          <Link to="/" className="text-gray-600 hover:text-pink-600">Home</Link>
          <Link to="/rate-calculator" className="text-gray-600 hover:text-pink-600">Rate Calculator</Link>
          <Link to="/form-submission" className="text-gray-600 hover:text-pink-600">Submit Card</Link>
        </div>
      </div>
    </div>
  </nav>
);

// Main App component
function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
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