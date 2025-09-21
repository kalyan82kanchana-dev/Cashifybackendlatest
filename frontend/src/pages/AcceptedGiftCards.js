import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Star, 
  TrendingUp, 
  Grid, 
  List,
  ArrowRight,
  DollarSign,
  Users,
  Zap
} from 'lucide-react';

const AcceptedGiftCards = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Gift cards data with categories and rates
  const giftCards = [
    // Popular Cards
    { name: 'Apple', category: 'popular', rate: '88%', logo: '🍎', popular: true },
    { name: 'Home Depot', category: 'popular', rate: '88%', logo: '🔨', popular: true },
    { name: 'Best Buy', category: 'popular', rate: '86%', logo: '📺', popular: true },
    { name: 'Nordstrom', category: 'popular', rate: '85%', logo: '👗', popular: true },
    { name: 'Macy\'s', category: 'popular', rate: '82%', logo: '👔', popular: true },
    
    // Retail
    { name: 'Amazon', category: 'retail', rate: '92%', logo: '🛒', trending: true },
    { name: 'iTunes', category: 'retail', rate: '87%', logo: '🎵' },
    { name: 'Starbucks', category: 'retail', rate: '85%', logo: '☕' },
    { name: 'Target', category: 'retail', rate: '90%', logo: '🎯', trending: true },
    { name: 'Walmart', category: 'retail', rate: '89%', logo: '🛍️' },
    { name: 'Best Buy', category: 'retail', rate: '86%', logo: '📺' },
    { name: 'Home Depot', category: 'retail', rate: '88%', logo: '🔨' },
    { name: 'Lowe\'s', category: 'retail', rate: '87%', logo: '🏠' },
    { name: 'CVS', category: 'retail', rate: '84%', logo: '💊' },
    { name: 'Costco', category: 'retail', rate: '91%', logo: '🛒' },
    { name: 'Macy\'s', category: 'retail', rate: '82%', logo: '👔' },
    { name: 'Nordstrom', category: 'retail', rate: '85%', logo: '👗' },
    { name: 'Sephora', category: 'retail', rate: '86%', logo: '💄' },
    { name: 'Victoria\'s Secret', category: 'retail', rate: '83%', logo: '🌺' },
    { name: 'eBay', category: 'retail', rate: '89%', logo: '🏷️' },
    
    // Fashion & Apparel  
    { name: 'Nike', category: 'fashion', rate: '87%', logo: '👟' },
    { name: 'Adidas', category: 'fashion', rate: '86%', logo: '👕' },
    { name: 'GAP', category: 'fashion', rate: '82%', logo: '👖' },
    { name: 'Old Navy', category: 'fashion', rate: '81%', logo: '👔' },
    { name: 'TJ Maxx', category: 'fashion', rate: '84%', logo: '🛍️' },
    { name: 'Footlocker', category: 'fashion', rate: '85%', logo: '👟' },
    { name: 'Michael Kors', category: 'fashion', rate: '88%', logo: '👜' },
    
    // Food & Dining
    { name: 'Uber Eats', category: 'dining', rate: '88%', logo: '🍔' },
    { name: 'DoorDash', category: 'dining', rate: '87%', logo: '🚗' },
    { name: 'Grubhub', category: 'dining', rate: '86%', logo: '🍕' },
    { name: 'Subway', category: 'dining', rate: '83%', logo: '🥪' },
    
    // Gaming
    { name: 'PlayStation', category: 'gaming', rate: '89%', logo: '🎮' },
    { name: 'Xbox', category: 'gaming', rate: '88%', logo: '🎮' },
    { name: 'Steam', category: 'gaming', rate: '90%', logo: '🎮' },
    { name: 'Roblox', category: 'gaming', rate: '85%', logo: '🎮' },
    { name: 'Nintendo', category: 'gaming', rate: '87%', logo: '🎮' },
    { name: 'GameStop', category: 'gaming', rate: '84%', logo: '🎮' },
    
    // Entertainment
    { name: 'Netflix', category: 'entertainment', rate: '86%', logo: '🎬' },
    { name: 'Spotify', category: 'entertainment', rate: '85%', logo: '🎵' },
    { name: 'Disney', category: 'entertainment', rate: '88%', logo: '🏰' },
    
    // Travel & Hotels
    { name: 'Airbnb', category: 'travel', rate: '89%', logo: '🏠' },
    { name: 'Hotels.com', category: 'travel', rate: '87%', logo: '🏨' },
    { name: 'Booking.com', category: 'travel', rate: '88%', logo: '✈️' },
    
    // Financial & Cards
    { name: 'Visa', category: 'financial', rate: '93%', logo: '💳', trending: true },
    { name: 'Mastercard', category: 'financial', rate: '92%', logo: '💳' },
    { name: 'American Express', category: 'financial', rate: '90%', logo: '💳' },
    { name: 'Vanilla Visa', category: 'financial', rate: '91%', logo: '💳' },
  ];

  const categories = [
    { id: 'all', name: 'All Cards', icon: Grid, count: giftCards.length },
    { id: 'popular', name: 'Most Popular', icon: Star, count: giftCards.filter(c => c.popular).length },
    { id: 'retail', name: 'Retail & Shopping', icon: Users, count: giftCards.filter(c => c.category === 'retail').length },
    { id: 'fashion', name: 'Fashion & Apparel', icon: Zap, count: giftCards.filter(c => c.category === 'fashion').length },
    { id: 'dining', name: 'Food & Dining', icon: DollarSign, count: giftCards.filter(c => c.category === 'dining').length },
    { id: 'gaming', name: 'Gaming', icon: TrendingUp, count: giftCards.filter(c => c.category === 'gaming').length },
    { id: 'entertainment', name: 'Entertainment', icon: Star, count: giftCards.filter(c => c.category === 'entertainment').length },
    { id: 'travel', name: 'Travel & Hotels', icon: Users, count: giftCards.filter(c => c.category === 'travel').length },
    { id: 'financial', name: 'Cards & Financial', icon: DollarSign, count: giftCards.filter(c => c.category === 'financial').length },
  ];

  // Filter cards based on search and category
  const filteredCards = useMemo(() => {
    return giftCards.filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                              card.category === selectedCategory || 
                              (selectedCategory === 'popular' && card.popular);
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Handle card click - navigate to rate calculator with pre-filled brand
  const handleCardClick = (cardName) => {
    navigate('/rate-calculator', { 
      state: { selectedBrand: cardName }
    });
  };

  // Get trending cards
  const trendingCards = giftCards.filter(card => card.trending);
  const popularCards = giftCards.filter(card => card.popular);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-pink-600">Supported</span> Gift Cards
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            We accept 100+ gift card brands with competitive rates
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> All rates shown are current as of today and subject to market conditions
            </p>
          </div>
        </div>

        {/* Trending Cards Banner */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Trending High Rates</h2>
              </div>
              <p className="text-pink-100">These cards are currently offering our best exchange rates</p>
            </div>
            <div className="hidden md:flex space-x-4">
              {trendingCards.map((card, index) => (
                <div 
                  key={index}
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-3 cursor-pointer hover:bg-white/30 transition-colors"
                  onClick={() => handleCardClick(card.name)}
                >
                  <div className="text-2xl mb-1">{card.logo}</div>
                  <div className="text-sm font-medium">{card.name}</div>
                  <div className="text-xs text-pink-100">Up to {card.rate}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search gift cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-6">
            {/* Mobile: Horizontal scrollable categories */}
            <div className="md:hidden">
              <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide">
                {categories.map((category) => {
                  const CategoryIcon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                        selectedCategory === category.id
                          ? 'bg-pink-600 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <CategoryIcon className="w-4 h-4" />
                      <span className="hidden sm:inline">{category.name}</span>
                      <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        selectedCategory === category.id
                          ? 'bg-white/20 text-white'
                          : 'bg-white text-gray-600'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop: Wrapped categories */}
            <div className="hidden md:block">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const CategoryIcon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-pink-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <CategoryIcon className="w-4 h-4" />
                      <span>{category.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        selectedCategory === category.id
                          ? 'bg-white/20 text-white'
                          : 'bg-white text-gray-600'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Gift Cards' : 
               selectedCategory === 'popular' ? 'Most Popular Cards' :
               categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-gray-600">
              Showing {filteredCards.length} card{filteredCards.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="hidden md:flex space-x-6 text-sm text-gray-600">
            <div className="text-center">
              <div className="font-bold text-lg text-pink-600">{giftCards.length}+</div>
              <div>Brands</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-green-600">Up to 93%</div>
              <div>Best Rate</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-blue-600">Same Day</div>
              <div>Payment</div>
            </div>
          </div>
        </div>

        {/* Gift Cards Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {filteredCards.map((card, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(card.name)}
                className="group bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 hover:border-pink-300 hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                {/* Trending Badge */}
                {card.trending && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    🔥 Hot
                  </div>
                )}
                
                {/* Popular Badge */}
                {card.popular && !card.trending && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    ⭐ Popular
                  </div>
                )}

                {/* Card Content */}
                <div className="text-center">
                  <div className="text-3xl md:text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                    {card.logo}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base group-hover:text-pink-600 transition-colors">
                    {card.name}
                  </h3>
                  
                  {/* Rate Display */}
                  <div className="bg-green-50 text-green-700 text-xs md:text-sm font-medium px-3 py-1 rounded-full mb-3">
                    Up to {card.rate}
                  </div>
                  
                  {/* Hover Action */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex items-center justify-center text-pink-600 text-sm font-medium">
                      Get Quote <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-3">
            {filteredCards.map((card, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(card.name)}
                className="group bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:border-pink-300 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                      {card.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                        {card.name}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {card.category === 'popular' ? 'Most Popular' : card.category.replace(/([A-Z])/g, ' $1')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {card.trending && (
                      <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        🔥 Trending
                      </span>
                    )}
                    {card.popular && !card.trending && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        ⭐ Popular
                      </span>
                    )}
                    <div className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                      Up to {card.rate}
                    </div>
                    <ArrowRight className="w-5 h-5 text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredCards.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No cards found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or category filter
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="bg-gray-900 rounded-lg p-8 mt-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Don't see your gift card?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            We're constantly adding new brands. Contact us to inquire about your specific gift card, 
            or submit it anyway - we might still be able to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/form-submission')}
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Submit Anyway
            </button>
            <button className="border border-gray-600 hover:border-gray-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptedGiftCards;