import React, { useState, useEffect } from 'react';
import { Calculator, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

const RateCalculator = () => {
  const [cardCategory, setCardCategory] = useState({
    withReceipt: false,
    withoutReceipt: false,
    partiallyUsed: false
  });
  
  const [selectedCard, setSelectedCard] = useState('');
  const [cardAmount, setCardAmount] = useState('');
  const [calculatedAmount, setCalculatedAmount] = useState('0.00');
  const [showLimitError, setShowLimitError] = useState(false);

  const giftCards = [
    { value: "adidas", label: "Adidas Gift Card" },
    { value: "airbnb", label: "AirBnb Gift Card" },
    { value: "amazon", label: "Amazon Gift Card" },
    { value: "amexp", label: "American Express Gift Card" },
    { value: "apple", label: "Apple Gift Card" },
    { value: "athleta", label: "Athleta" },
    { value: "bbb", label: "Bed Bath And Beyond Gift Card" },
    { value: "bestbuy", label: "Best Buy Gift Card" },
    { value: "banana", label: "Banana Republic" },
    { value: "booking", label: "Booking.com Gift Card" },
    { value: "costco", label: "Costco Cash Card" },
    { value: "cvs", label: "CVS Gift Card" },
    { value: "dell", label: "Dell Gift Card" },
    { value: "disney", label: "Disney Gift Card" },
    { value: "doordash", label: "Door Dash Gift Card" },
    { value: "ebay", label: "eBay Gift Card" },
    { value: "footlocker", label: "Footlocker Sports Gift Card" },
    { value: "gap", label: "GAP" },
    { value: "gamestop", label: "GameStop Gift Card" },
    { value: "googleplay", label: "Google Play Gift Card" },
    { value: "grubhub", label: "Grubhub Gift Card" },
    { value: "homedepot", label: "Home Depot Gift Card" },
    { value: "homegoods", label: "Home Goods" },
    { value: "hotels", label: "Hotels.com Gift Card" },
    { value: "ikea", label: "IKEA Gift Card" },
    { value: "itunes", label: "iTunes Gift Card" },
    { value: "kohls", label: "Kohls Store Gift Card" },
    { value: "lowes", label: "Lowes Gift Card" },
    { value: "lyft", label: "Lyft Gift Card" },
    { value: "macy's", label: "Macy's Gift Card" },
    { value: "mastercard", label: "MasterCard Gift Card" },
    { value: "master", label: "Master Gift Cards" },
    { value: "microsoft", label: "Microsoft Gift Card" },
    { value: "myvanilla", label: "My Vanilla Prepaid Card" },
    { value: "netflix", label: "Netflix Gift Card" },
    { value: "nike", label: "Nike Gift Card" },
    { value: "nintendo", label: "Nintendo eShop Digital Card/Gift Card" },
    { value: "nordstorm", label: "Nordstorm Gift Card" },
    { value: "oldnavy", label: "Old Navy eGift Card" },
    { value: "onevanilla", label: "One Vanilla VISA/MasterCard Gift Card" },
    { value: "petco", label: "Petco Gift Card" },
    { value: "psnetwork", label: "Play Station Network Gift Card" },
    { value: "razorgold", label: "Razor Gold Gift Card" },
    { value: "reebok", label: "Reebok Gift Card" },
    { value: "roblox", label: "Roblox Game Card" },
    { value: "samclub", label: "Sam's Club" },
    { value: "saks", label: "Saks Fifth Avenue Gift Card" },
    { value: "sephora", label: "Sephora Gift Card" },
    { value: "spotify", label: "Spotify Gift Card" },
    { value: "sierra", label: "Sierra" },
    { value: "starbucks", label: "Starbucks Card" },
    { value: "steam", label: "Steam Wallet Gift Card" },
    { value: "target", label: "Target Gift Card" },
    { value: "targetvisa", label: "Target VISA Gift Card" },
    { value: "tjmaxx", label: "Tjmaxx" },
    { value: "ubereats", label: "Uber Eats" },
    { value: "ulta", label: "Ulta Gift Card" },
    { value: "vicsecret", label: "Victoria's Secret Gift Card" },
    { value: "visa", label: "VISA Gift Card" },
    { value: "walmart", label: "Walmart Gift Card" }
  ];

  const calculateRate = () => {
    const amount = parseFloat(cardAmount);
    
    if (!amount || amount < 50) {
      setShowLimitError(true);
      setCalculatedAmount('0.00');
      return;
    }
    
    setShowLimitError(false);
    let percentCalc = 0;

    // High-value cards (92% with receipt, 78% without, 60%/55% partially used)
    if (['adidas', 'amazon', 'bestbuy', 'costco', 'doordash'].includes(selectedCard)) {
      if (cardCategory.withReceipt && cardCategory.partiallyUsed) {
        percentCalc = ((92 + 60) / 2 / 100) * amount;
      } else if (cardCategory.withoutReceipt && cardCategory.partiallyUsed) {
        percentCalc = (60 / 100) * amount;
      } else if (cardCategory.withReceipt) {
        percentCalc = (92 / 100) * amount;
      } else if (cardCategory.withoutReceipt) {
        percentCalc = (78 / 100) * amount;
      } else if (cardCategory.partiallyUsed) {
        percentCalc = (60 / 100) * amount;
      }
    }
    // AirBnb specific rates
    else if (selectedCard === 'airbnb') {
      if (cardCategory.withReceipt && cardCategory.partiallyUsed) {
        percentCalc = ((85 + 55) / 2 / 100) * amount;
      } else if (cardCategory.withoutReceipt && cardCategory.partiallyUsed) {
        percentCalc = (55 / 100) * amount;
      } else if (cardCategory.withReceipt) {
        percentCalc = (85 / 100) * amount;
      } else if (cardCategory.withoutReceipt) {
        percentCalc = (74 / 100) * amount;
      } else if (cardCategory.partiallyUsed) {
        percentCalc = (55 / 100) * amount;
      }
    }
    // American Express specific rates
    else if (selectedCard === 'amexp') {
      if (cardCategory.withReceipt && cardCategory.partiallyUsed) {
        percentCalc = ((92 + 55) / 2 / 100) * amount;
      } else if (cardCategory.withoutReceipt && cardCategory.partiallyUsed) {
        percentCalc = (55 / 100) * amount;
      } else if (cardCategory.withReceipt) {
        percentCalc = (92 / 100) * amount;
      } else if (cardCategory.withoutReceipt) {
        percentCalc = (75 / 100) * amount;
      } else if (cardCategory.partiallyUsed) {
        percentCalc = (55 / 100) * amount;
      }
    }
    // Standard high-value cards
    else if (['apple', 'ebay', 'kohls', 'roblox', 'visa'].includes(selectedCard)) {
      if (cardCategory.withReceipt && cardCategory.partiallyUsed) {
        percentCalc = ((92 + 50) / 2 / 100) * amount;
      } else if (cardCategory.withoutReceipt && cardCategory.partiallyUsed) {
        percentCalc = (50 / 100) * amount;
      } else if (cardCategory.withReceipt) {
        percentCalc = (92 / 100) * amount;
      } else if (cardCategory.withoutReceipt) {
        percentCalc = (78 / 100) * amount;
      } else if (cardCategory.partiallyUsed) {
        percentCalc = (50 / 100) * amount;
      }
    }
    // Standard premium cards
    else if (['disney', 'googleplay', 'homedepot', 'hotels', 'itunes', 'lowes', 'macy\'s', 'mastercard', 'myvanilla', 'nike', 'nordstorm', 'onevanilla', 'psnetwork', 'samclub', 'starbucks', 'steam', 'ulta', 'walmart'].includes(selectedCard)) {
      if (cardCategory.withReceipt && cardCategory.partiallyUsed) {
        percentCalc = ((92 + 55) / 2 / 100) * amount;
      } else if (cardCategory.withoutReceipt && cardCategory.partiallyUsed) {
        percentCalc = (55 / 100) * amount;
      } else if (cardCategory.withReceipt) {
        percentCalc = (92 / 100) * amount;
      } else if (cardCategory.withoutReceipt) {
        percentCalc = (78 / 100) * amount;
      } else if (cardCategory.partiallyUsed) {
        percentCalc = (55 / 100) * amount;
      }
    }
    // Default for other cards
    else {
      if (cardCategory.withReceipt) {
        percentCalc = (85 / 100) * amount;
      } else if (cardCategory.withoutReceipt) {
        percentCalc = (70 / 100) * amount;
      } else if (cardCategory.partiallyUsed) {
        percentCalc = (45 / 100) * amount;
      }
    }

    setCalculatedAmount(percentCalc.toFixed(2));
  };

  const handleCategoryChange = (category) => {
    setCardCategory(prev => ({
      withReceipt: category === 'withReceipt' ? !prev.withReceipt : false,
      withoutReceipt: category === 'withoutReceipt' ? !prev.withoutReceipt : false,
      partiallyUsed: category === 'partiallyUsed' ? !prev.partiallyUsed : false
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Calculator className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Rate Calculator</h1>
          <p className="text-lg text-gray-600">
            Get instant quotes for your gift cards and see how much cash you can get today.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h2 className="text-2xl font-bold text-white text-center">
              Get the current value for your transaction
            </h2>
          </div>
          
          <div className="p-8">
            {/* Gift Card Category */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Gift Card Category <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={cardCategory.withReceipt}
                    onChange={() => handleCategoryChange('withReceipt')}
                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700">Card with Receipt</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={cardCategory.withoutReceipt}
                    onChange={() => handleCategoryChange('withoutReceipt')}
                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700">Card without Receipt</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={cardCategory.partiallyUsed}
                    onChange={() => handleCategoryChange('partiallyUsed')}
                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700">Card Partially Used</span>
                </label>
              </div>
            </div>

            {/* Gift Card Name */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Gift Card Name <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedCard}
                onChange={(e) => setSelectedCard(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="">Select Gift Card...</option>
                {giftCards.map((card) => (
                  <option key={card.value} value={card.value}>
                    {card.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Card Amount */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Value of Gift Card <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={cardAmount}
                onChange={(e) => setCardAmount(e.target.value)}
                min="0"
                placeholder="Enter amount..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>

            {/* Result Display */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-700 mb-2">How much you will get</p>
              <div className="text-4xl font-bold text-blue-600 mb-4">
                ${calculatedAmount}
              </div>
              {showLimitError && (
                <div className="flex items-center text-red-600">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span>Sorry! We don't process cards less than $50</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={calculateRate}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors flex items-center justify-center"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Check Rate
              </button>
              <button
                onClick={() => window.location.href = '/form-submission'}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-colors flex items-center justify-center"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Proceed to Trade Card
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 rounded-xl p-8">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">1. Select Category</h4>
                <p className="text-gray-600">Choose whether you have a receipt, no receipt, or the card is partially used.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">2. Enter Details</h4>
                <p className="text-gray-600">Select your gift card brand and enter the current balance amount.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">3. Get Quote</h4>
                <p className="text-gray-600">Click 'Check Rate' to see your instant cash offer and proceed to trade.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateCalculator;