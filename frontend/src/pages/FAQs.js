import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  HelpCircle, 
  MessageCircle,
  Mail,
  Phone,
  Clock,
  Shield,
  CreditCard,
  FileText,
  Users,
  AlertCircle
} from 'lucide-react';

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');

  // FAQ Data organized by categories
  const faqData = [
    {
      category: 'General',
      icon: HelpCircle,
      color: 'blue',
      questions: [
        {
          id: 'what-is-cashiygcmart',
          question: 'What is cashiygcmart.com?',
          answer: 'cashiygcmart.com buys unwanted gift cards and pays you cash. Use our Rate Calculator to get a quote, submit the card via the Form Submission page, and we\'ll verify and pay out.'
        },
        {
          id: 'which-cards-accepted',
          question: 'Which gift cards do you accept?',
          answer: 'We accept major retailer and brand gift cards. The full, up-to-date list is on the Accepted Gift Cards page.'
        }
      ]
    },
    {
      category: 'Offers & Rates',
      icon: CreditCard,
      color: 'green',
      questions: [
        {
          id: 'check-card-value',
          question: 'How do I check my card\'s value?',
          answer: 'Open the Rate Calculator, select the brand and face value, and you\'ll see a quoted offer instantly.'
        },
        {
          id: 'quote-final',
          question: 'Is the quote final?',
          answer: 'The quote is your quoted offer based on the information you provide. Final payout may change after verification (card condition, PIN visibility, purchase/transaction history, or fraud checks).'
        },
        {
          id: 'hidden-fees',
          question: 'Are there hidden fees?',
          answer: 'No hidden fees — any fees or bonuses are reflected in the quoted offer you see before submitting.'
        }
      ]
    },
    {
      category: 'Submitting Your Card',
      icon: FileText,
      color: 'purple',
      questions: [
        {
          id: 'info-needed',
          question: 'What information do I need to submit?',
          answer: 'Typical fields: full name, email, phone, card brand, face value, card number/PIN or clear photos of the card, and preferred payout method. The exact form shows required fields.'
        },
        {
          id: 'after-submit',
          question: 'What happens after I submit the form?',
          answer: 'You\'ll receive an automated confirmation email from support@cashiygcmart.com with a unique reference number. The submission is sent to our operations team for verification.'
        },
        {
          id: 'multiple-cards',
          question: 'Can I submit more than one card?',
          answer: 'Yes. The form supports multiple-card submissions. For very large lots, contact support for a bulk quote.'
        }
      ]
    },
    {
      category: 'Verification & Processing',
      icon: Clock,
      color: 'orange',
      questions: [
        {
          id: 'verification-time',
          question: 'How long does verification take?',
          answer: 'We aim for same-day payouts after verification when submissions are received before our daily cutoff. Verification speed depends on card type and the completeness of your submission.'
        },
        {
          id: 'delays-rejections',
          question: 'What could delay or reject my submission?',
          answer: 'Delays or rejections often result from unreadable card details, scratched/obscured PINs, mismatched face value, evidence of prior tampering, or fraud indicators. We\'ll notify you with next steps.'
        },
        {
          id: 'more-info-needed',
          question: 'What if you need more information?',
          answer: 'We\'ll email you (using your submitted email) requesting additional photos or clarifications. Reply quickly to speed processing.'
        }
      ]
    },
    {
      category: 'Payments & Payouts',
      icon: CreditCard,
      color: 'pink',
      questions: [
        {
          id: 'payout-methods',
          question: 'Which payout methods do you support?',
          answer: 'We pay via:\n\n💳 PayPal\n📱 Zelle\n💸 Cash App\n₿ Bitcoin\n🏦 Chime\n\nChoose your preferred payout method on the submission form. Availability may vary by region.'
        },
        {
          id: 'payment-timing',
          question: 'When will I receive payment?',
          answer: 'Payouts are typically processed same business day after verification, subject to cutoff times and the chosen payout method. Some methods (e.g., Bitcoin, PayPal) may clear faster; bank-related transfers might take standard clearing times.'
        },
        {
          id: 'payout-limits',
          question: 'Are there minimum or maximum payout limits?',
          answer: 'Limits vary by card type and payout method. Any limits will be shown in the Rate Calculator or during submission.'
        }
      ]
    },
    {
      category: 'Security & Privacy',
      icon: Shield,
      color: 'indigo',
      questions: [
        {
          id: 'data-protection',
          question: 'How do you protect my data and card images?',
          answer: 'We encrypt data in transit and at rest, restrict access to authorized staff, and store card images only as long as required for verification. We follow best practices for secure handling of sensitive information.'
        },
        {
          id: 'share-info',
          question: 'Do you share my personal information?',
          answer: 'We do not sell your personal data. We only share information with service providers needed to process payouts or as required by law. See our Privacy Policy for full details.'
        }
      ]
    },
    {
      category: 'Problems, Disputes & Cancellations',
      icon: AlertCircle,
      color: 'red',
      questions: [
        {
          id: 'submission-rejected',
          question: 'My submission was rejected — what do I do?',
          answer: 'You\'ll get an email explaining why. Reply with supporting info and your reference number to request a re-review.'
        },
        {
          id: 'cancel-submission',
          question: 'I want to cancel my submission — is that possible?',
          answer: 'You can request cancellation before verification completes. After verification/payout, cancellation may not be possible. Contact support@cashiygcmart.com immediately and include your reference number.'
        },
        {
          id: 'dispute-payment',
          question: 'I was paid less than the quoted amount — how do I dispute?',
          answer: 'Reply to your confirmation email with your reference number and details. Our ops team will investigate and respond per our SLA.'
        }
      ]
    },
    {
      category: 'Business & Bulk',
      icon: Users,
      color: 'teal',
      questions: [
        {
          id: 'bulk-cards',
          question: 'Do you accept bulk or corporate gift card lots?',
          answer: 'Yes. Contact support for a dedicated bulk intake and quote. We can handle high-volume submissions and custom payout arrangements.'
        },
        {
          id: 'partner-integrations',
          question: 'Do you offer partner integrations or APIs?',
          answer: 'We support partnerships and integrations. Email partnerships@cashiygcmart.com to discuss.'
        }
      ]
    },
    {
      category: 'Taxes & Legal',
      icon: FileText,
      color: 'gray',
      questions: [
        {
          id: 'tax-reporting',
          question: 'Do I need to report this on my taxes?',
          answer: 'Tax treatment depends on local law. We do not provide tax advice — consult your tax advisor. We may issue tax documents if legally required.'
        }
      ]
    },
    {
      category: 'Contact & Support',
      icon: MessageCircle,
      color: 'blue',
      questions: [
        {
          id: 'reach-support',
          question: 'How do I reach support?',
          answer: 'Email support@cashiygcmart.com and include your reference number for fastest service.'
        },
        {
          id: 'check-status',
          question: 'How can I check submission status?',
          answer: 'After submission you\'ll receive a confirmation email with your reference number. Reply to that email or use the status lookup tool (if available in your account) to check progress.'
        }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: faqData.reduce((acc, cat) => acc + cat.questions.length, 0) },
    ...faqData.map(cat => ({ 
      id: cat.category.toLowerCase().replace(/[^a-z0-9]/g, '-'), 
      name: cat.category, 
      count: cat.questions.length,
      color: cat.color,
      icon: cat.icon
    }))
  ];

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    let filtered = faqData;
    
    if (selectedCategory !== 'all') {
      filtered = faqData.filter(cat => 
        cat.category.toLowerCase().replace(/[^a-z0-9]/g, '-') === selectedCategory
      );
    }
    
    if (searchTerm) {
      filtered = filtered.map(category => ({
        ...category,
        questions: category.questions.filter(q =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.questions.length > 0);
    }
    
    return filtered;
  }, [searchTerm, selectedCategory]);

  // Toggle expanded state
  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Get color classes
  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200',
      pink: 'bg-pink-50 text-pink-700 border-pink-200',
      indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      teal: 'bg-teal-50 text-teal-700 border-teal-200',
      gray: 'bg-gray-50 text-gray-700 border-gray-200',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-pink-600">Questions</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to common questions about selling your gift cards
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const CategoryIcon = category.icon || HelpCircle;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-pink-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category.icon && <CategoryIcon className="w-4 h-4" />}
                  <span>{category.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing {filteredFAQs.reduce((acc, cat) => acc + cat.questions.length, 0)} question
            {filteredFAQs.reduce((acc, cat) => acc + cat.questions.length, 0) !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* FAQ Content */}
        <div className="space-y-8">
          {filteredFAQs.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <div key={category.category} className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Category Header */}
                <div className={`px-6 py-4 border-b border-gray-200 ${getColorClasses(category.color)}`}>
                  <div className="flex items-center space-x-3">
                    <CategoryIcon className="w-6 h-6" />
                    <h2 className="text-xl font-semibold">{category.category}</h2>
                    <span className="text-sm bg-white/30 px-2 py-1 rounded-full">
                      {category.questions.length} questions
                    </span>
                  </div>
                </div>

                {/* Questions */}
                <div className="divide-y divide-gray-200">
                  {category.questions.map((faq) => {
                    const isExpanded = expandedItems[faq.id];
                    return (
                      <div key={faq.id} className="px-6 py-4">
                        <button
                          onClick={() => toggleExpanded(faq.id)}
                          className="w-full flex items-center justify-between text-left group focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-lg p-2 -m-2"
                        >
                          <h3 className="text-lg font-medium text-gray-900 group-hover:text-pink-600 transition-colors pr-4">
                            {faq.question}
                          </h3>
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-pink-600 transition-colors flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-pink-600 transition-colors flex-shrink-0" />
                          )}
                        </button>
                        
                        {isExpanded && (
                          <div className="mt-4 pl-2">
                            <div className="prose prose-gray max-w-none">
                              {faq.answer.split('\n').map((line, index) => (
                                <p key={index} className={`text-gray-600 ${index > 0 ? 'mt-2' : ''}`}>
                                  {line}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or category filter
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Quick Tips Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mt-12 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">💡 Quick Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white/20 rounded-lg p-4 mb-4">
                📷
              </div>
              <h3 className="font-semibold mb-2">Clear Photos</h3>
              <p className="text-blue-100 text-sm">Take clear photos of the card and PIN (if required)</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-lg p-4 mb-4">
                💳
              </div>
              <h3 className="font-semibold mb-2">Complete Details</h3>
              <p className="text-blue-100 text-sm">Provide complete payout details to avoid delays</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-lg p-4 mb-4">
                📧
              </div>
              <h3 className="font-semibold mb-2">Keep Confirmation</h3>
              <p className="text-blue-100 text-sm">Keep your confirmation email — it contains your reference number</p>
            </div>
          </div>
        </div>

        {/* Contact Support CTA */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mt-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@cashiygcmart.com"
              className="flex items-center justify-center space-x-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Email Support</span>
            </a>
            <button 
              onClick={() => window.location.href = '/form-submission'}
              className="flex items-center justify-center space-x-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <FileText className="w-5 h-5" />
              <span>Submit a Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;