import React, { useState, useRef } from 'react';
import { 
  User, 
  CreditCard, 
  DollarSign, 
  Upload, 
  ChevronLeft, 
  ChevronRight, 
  Check,
  AlertCircle,
  Camera,
  Receipt,
  Smartphone,
  CheckCircle,
  X,
  Mail,
  Copy
} from 'lucide-react';
import { generateSubmissionConfirmationEmail, generateSubmissionConfirmationText } from '../utils/emailTemplates';

const FormSubmission = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    
    // Gift Card Details
    cards: [{
      brand: '',
      value: '',
      condition: '', // new, partially-used
      hasReceipt: '',
      cardType: '', // physical, digital
      digitalCode: '',
      digitalPin: '',
      frontImage: null,
      backImage: null,
      receiptImage: null
    }],
    
    // Payment Information
    paymentMethod: '',
    paypalAddress: '',
    zelleDetails: '',
    cashAppTag: '',
    btcAddress: '',
    chimeDetails: ''
  });

  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    {
      id: 1,
      title: 'Personal Information',
      icon: User,
      description: 'Tell us about yourself'
    },
    {
      id: 2,
      title: 'Gift Card Details',
      icon: CreditCard,
      description: 'Provide your gift card information'
    },
    {
      id: 3,
      title: 'Payment Method',
      icon: DollarSign,
      description: 'Choose how you want to receive payment'
    },
    {
      id: 4,
      title: 'Upload & Review',
      icon: Upload,
      description: 'Upload images and review your submission'
    }
  ];

  // Progress calculation
  const progress = (currentStep / steps.length) * 100;

  // Handle form input changes
  const handleInputChange = (field, value, cardIndex = null) => {
    if (cardIndex !== null) {
      const newCards = [...formData.cards];
      newCards[cardIndex] = { ...newCards[cardIndex], [field]: value };
      setFormData({ ...formData, cards: newCards });
    } else {
      setFormData({ ...formData, [field]: value });
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  // File upload handler with preview
  const handleFileUpload = (file, field, cardIndex = 0) => {
    if (!file) return;
    
    // Validate file size (15MB)
    if (file.size > 15 * 1024 * 1024) {
      setErrors({ ...errors, [field]: 'File size must be less than 15MB' });
      return;
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setErrors({ ...errors, [field]: 'Please upload a valid image file (JPEG, PNG, WebP)' });
      return;
    }

    const newCards = [...formData.cards];
    newCards[cardIndex] = { ...newCards[cardIndex], [field]: file };
    setFormData({ ...formData, cards: newCards });
    
    // Clear any previous errors
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  // Add new card
  const addCard = () => {
    const newCard = {
      brand: '',
      value: '',
      condition: '',
      hasReceipt: '',
      cardType: '',
      digitalCode: '',
      digitalPin: '',
      frontImage: null,
      backImage: null,
      receiptImage: null
    };
    setFormData({ ...formData, cards: [...formData.cards, newCard] });
  };

  // Remove card
  const removeCard = (index) => {
    if (formData.cards.length > 1) {
      const newCards = formData.cards.filter((_, i) => i !== index);
      setFormData({ ...formData, cards: newCards });
    }
  };

  // Validation functions
  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
        break;
        
      case 2:
        formData.cards.forEach((card, index) => {
          if (!card.brand.trim()) newErrors[`brand_${index}`] = 'Card brand is required';
          if (!card.value.trim()) newErrors[`value_${index}`] = 'Card value is required';
          if (!card.condition) newErrors[`condition_${index}`] = 'Please select card condition';
          if (!card.hasReceipt) newErrors[`hasReceipt_${index}`] = 'Please specify if you have receipt';
          if (!card.cardType) newErrors[`cardType_${index}`] = 'Please select card type';
        });
        break;
        
      case 3:
        if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
        // Validate payment method specific fields
        if (formData.paymentMethod === 'paypal' && !formData.paypalAddress.trim()) {
          newErrors.paypalAddress = 'PayPal email is required';
        }
        if (formData.paymentMethod === 'zelle' && !formData.zelleDetails.trim()) {
          newErrors.zelleDetails = 'Zelle details are required';
        }
        if (formData.paymentMethod === 'cashapp' && !formData.cashAppTag.trim()) {
          newErrors.cashAppTag = 'Cash App tag is required';
        }
        if (formData.paymentMethod === 'btc' && !formData.btcAddress.trim()) {
          newErrors.btcAddress = 'Bitcoin wallet address is required';
        }
        if (formData.paymentMethod === 'chime' && !formData.chimeDetails.trim()) {
          newErrors.chimeDetails = 'Chime details are required';
        }
        break;
        
      case 4:
        // Validate file uploads for cards that require them
        formData.cards.forEach((card, index) => {
          if (card.cardType === 'physical') {
            if (!card.frontImage) newErrors[`frontImage_${index}`] = 'Front image is required for physical cards';
            if (!card.backImage) newErrors[`backImage_${index}`] = 'Back image is required for physical cards';
          }
          if (card.cardType === 'digital') {
            if (!card.digitalCode.trim()) newErrors[`digitalCode_${index}`] = 'Digital code is required';
            // Digital PIN is optional - many cards (Apple, Amazon, etc.) only have codes
          }
        });
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation functions
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Submit form
  const handleSubmit = async () => {
    if (!validateStep(4) || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
        // Get backend URL from environment
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
        
        // Convert file objects to base64 for JSON transmission
        const formDataWithFiles = { ...formData };
        
        for (let i = 0; i < formDataWithFiles.cards.length; i++) {
          const card = formDataWithFiles.cards[i];
          
          // Convert files to base64
          if (card.frontImage && card.frontImage instanceof File) {
            const base64 = await fileToBase64(card.frontImage);
            formDataWithFiles.cards[i].frontImage = {
              name: card.frontImage.name,
              type: card.frontImage.type,
              size: card.frontImage.size,
              data: base64
            };
          }
          
          if (card.backImage && card.backImage instanceof File) {
            const base64 = await fileToBase64(card.backImage);
            formDataWithFiles.cards[i].backImage = {
              name: card.backImage.name,
              type: card.backImage.type,
              size: card.backImage.size,
              data: base64
            };
          }
          
          if (card.receiptImage && card.receiptImage instanceof File) {
            const base64 = await fileToBase64(card.receiptImage);
            formDataWithFiles.cards[i].receiptImage = {
              name: card.receiptImage.name,
              type: card.receiptImage.type,
              size: card.receiptImage.size,
              data: base64
            };
          }
        }

        // Add timeout for mobile networks
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        const response = await fetch(`${backendUrl}/api/submit-gift-card`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataWithFiles),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        const result = await response.json();
        
        if (result.success) {
          setSubmissionResult(result);
          setShowSuccessModal(true);
          
          // Optional: Clear form or redirect
          // setFormData(initialFormData);
          // setCurrentStep(1);
        } else {
          alert(`Error: ${result.message}\n\nPlease try again or contact support if the issue persists.`);
        }
        
      } catch (error) {
        console.error('Submission error:', error);
        
        // Better error handling for mobile with null checks
        let errorMessage = 'There was an error processing your submission. ';
        
        try {
          const errorMsg = error?.message || '';
          const errorName = error?.name || '';
          
          if (errorName === 'TypeError' && errorMsg.includes('fetch')) {
            errorMessage += 'Please check your internet connection and try again.';
          } else if (errorMsg.includes('timeout') || errorName === 'AbortError') {
            errorMessage += 'The request timed out. Please try again with smaller images.';
          } else if (errorMsg.includes('413') || errorMsg.includes('too large')) {
            errorMessage += 'Your images are too large. Please reduce image size and try again.';
          } else {
            errorMessage += 'Please try again or contact support if the issue persists.';
          }
        } catch (e) {
          // If error processing fails, use generic message
          errorMessage += 'Please try again or contact support if the issue persists.';
        }
        
        alert(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
  };

  // Helper function to convert file to base64 with compression for mobile
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      // Check file size - compress if over 2MB
      if (file.size > 2 * 1024 * 1024) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
          // Calculate new dimensions (max 1200px width/height)
          let { width, height } = img;
          const maxSize = 1200;
          
          if (width > height && width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          } else if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw and compress
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataURL = canvas.toDataURL('image/jpeg', 0.8); // 80% quality
          resolve(compressedDataURL);
        };
        
        img.onerror = () => reject(new Error('Image compression failed'));
        img.src = URL.createObjectURL(file);
      } else {
        // File is small enough, use as-is
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      }
    });
  };

  // Render file upload component
  const FileUploadField = ({ label, field, cardIndex, accept = "image/*" }) => {
    const fileInputRef = useRef();
    const currentFile = formData.cards[cardIndex]?.[field];
    const error = errors[`${field}_${cardIndex}`];

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-pink-400 hover:bg-pink-50'}`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files[0], field, cardIndex)}
          />
          
          {currentFile ? (
            <div className="space-y-2">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm font-medium text-green-600">{currentFile.name}</p>
              <p className="text-xs text-gray-500">{(currentFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          ) : (
            <div className="space-y-2">
              <Camera className="w-12 h-12 mx-auto text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-600">Click to upload image</p>
                <p className="text-xs text-gray-500">PNG, JPG, WebP up to 15MB</p>
              </div>
            </div>
          )}
        </div>
        {error && (
          <div className="flex items-center space-x-1 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  };

  // Render steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="w-16 h-16 mx-auto text-pink-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
              <p className="text-gray-600">Tell us about yourself so we can process your gift card</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.firstName}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.lastName}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CreditCard className="w-16 h-16 mx-auto text-pink-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Gift Card Details</h2>
              <p className="text-gray-600">Provide information about your gift cards</p>
            </div>

            {formData.cards.map((card, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 space-y-6 relative">
                {formData.cards.length > 1 && (
                  <button
                    onClick={() => removeCard(index)}
                    className="absolute top-4 right-4 text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                )}
                
                <h3 className="text-lg font-semibold text-gray-900">
                  Gift Card {index + 1}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Brand <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={card.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value, index)}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                        errors[`brand_${index}`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Amazon, Target, Walmart"
                    />
                    {errors[`brand_${index}`] && (
                      <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors[`brand_${index}`]}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Value <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={card.value}
                      onChange={(e) => handleInputChange('value', e.target.value, index)}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                        errors[`value_${index}`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter card value in $"
                    />
                    {errors[`value_${index}`] && (
                      <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors[`value_${index}`]}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Condition <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={card.condition}
                      onChange={(e) => handleInputChange('condition', e.target.value, index)}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                        errors[`condition_${index}`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select condition</option>
                      <option value="new">New/Unused</option>
                      <option value="partially-used">Partially Used</option>
                    </select>
                    {errors[`condition_${index}`] && (
                      <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors[`condition_${index}`]}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you have the receipt? <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={card.hasReceipt}
                      onChange={(e) => handleInputChange('hasReceipt', e.target.value, index)}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                        errors[`hasReceipt_${index}`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select option</option>
                      <option value="yes">Yes, I have the receipt</option>
                      <option value="no">No, I don't have the receipt</option>
                    </select>
                    {errors[`hasReceipt_${index}`] && (
                      <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors[`hasReceipt_${index}`]}</span>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Type <span className="text-red-500">*</span>
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="physical"
                          checked={card.cardType === 'physical'}
                          onChange={(e) => handleInputChange('cardType', e.target.value, index)}
                          className="mr-2"
                        />
                        Physical Card
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="digital"
                          checked={card.cardType === 'digital'}
                          onChange={(e) => handleInputChange('cardType', e.target.value, index)}
                          className="mr-2"
                        />
                        Digital/E-Card
                      </label>
                    </div>
                    {errors[`cardType_${index}`] && (
                      <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors[`cardType_${index}`]}</span>
                      </div>
                    )}
                  </div>

                  {card.cardType === 'digital' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Digital Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={card.digitalCode}
                          onChange={(e) => handleInputChange('digitalCode', e.target.value, index)}
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            errors[`digitalCode_${index}`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter digital card code"
                        />
                        {errors[`digitalCode_${index}`] && (
                          <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors[`digitalCode_${index}`]}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Digital PIN <span className="text-gray-500">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={card.digitalPin}
                          onChange={(e) => handleInputChange('digitalPin', e.target.value, index)}
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            errors[`digitalPin_${index}`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter PIN if available (optional for most cards)"
                        />
                        {errors[`digitalPin_${index}`] && (
                          <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors[`digitalPin_${index}`]}</span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}

            <button
              onClick={addCard}
              className="w-full p-4 border-2 border-dashed border-pink-300 rounded-lg text-pink-600 hover:border-pink-400 hover:bg-pink-50 transition-colors flex items-center justify-center space-x-2"
            >
              <span>+</span>
              <span>Add Another Gift Card</span>
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <DollarSign className="w-16 h-16 mx-auto text-pink-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
              <p className="text-gray-600">Choose how you'd like to receive your payment</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Select Payment Method <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { id: 'paypal', name: 'PayPal', icon: '💳' },
                  { id: 'zelle', name: 'Zelle', icon: '📱' },
                  { id: 'cashapp', name: 'Cash App', icon: '💸' },
                  { id: 'btc', name: 'Bitcoin', icon: '₿' },
                  { id: 'chime', name: 'Chime', icon: '🏦' }
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.paymentMethod === method.id
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-300 hover:border-pink-300'
                    }`}
                  >
                    <input
                      type="radio"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-2xl">{method.icon}</span>
                    <span className="font-medium">{method.name}</span>
                  </label>
                ))}
              </div>
              {errors.paymentMethod && (
                <div className="flex items-center space-x-1 text-red-600 text-sm mt-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.paymentMethod}</span>
                </div>
              )}
            </div>

            {/* Payment method specific fields */}
            {formData.paymentMethod && (
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                {formData.paymentMethod === 'paypal' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PayPal Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.paypalAddress}
                      onChange={(e) => handleInputChange('paypalAddress', e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                        errors.paypalAddress ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your PayPal email"
                    />
                    {errors.paypalAddress && (
                      <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.paypalAddress}</span>
                      </div>
                    )}
                  </div>
                )}

                {formData.paymentMethod === 'zelle' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zelle Phone Number or Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.zelleDetails}
                      onChange={(e) => handleInputChange('zelleDetails', e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                        errors.zelleDetails ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your Zelle phone number or email"
                    />
                    {errors.zelleDetails && (
                      <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.zelleDetails}</span>
                      </div>
                    )}
                  </div>
                )}

                {formData.paymentMethod === 'cashapp' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cash App Tag <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.cashAppTag}
                      onChange={(e) => handleInputChange('cashAppTag', e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                        errors.cashAppTag ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., $YourCashTag"
                    />
                    {errors.cashAppTag && (
                      <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.cashAppTag}</span>
                      </div>
                    )}
                  </div>
                )}

                {formData.paymentMethod === 'btc' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bitcoin Wallet Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.btcAddress}
                      onChange={(e) => handleInputChange('btcAddress', e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                        errors.btcAddress ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your Bitcoin wallet address"
                    />
                    {errors.btcAddress && (
                      <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.btcAddress}</span>
                      </div>
                    )}
                  </div>
                )}

                {formData.paymentMethod === 'chime' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chime Details <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.chimeDetails}
                      onChange={(e) => handleInputChange('chimeDetails', e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                        errors.chimeDetails ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your Chime phone number or email"
                    />
                    {errors.chimeDetails && (
                      <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.chimeDetails}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Upload className="w-16 h-16 mx-auto text-pink-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Upload & Review</h2>
              <p className="text-gray-600">Upload your card images and review your submission</p>
            </div>

            {formData.cards.map((card, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {card.brand || `Card ${index + 1}`} - ${card.value}
                </h3>

                {card.cardType === 'physical' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUploadField
                      label="Front Side of Card"
                      field="frontImage"
                      cardIndex={index}
                    />
                    <FileUploadField
                      label="Back Side of Card"
                      field="backImage"
                      cardIndex={index}
                    />
                  </div>
                )}

                {card.hasReceipt === 'yes' && (
                  <FileUploadField
                    label="Receipt Image"
                    field="receiptImage"
                    cardIndex={index}
                  />
                )}
              </div>
            ))}

            {/* Review Summary */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Summary</h3>
              <div className="space-y-3 text-sm">
                <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                <div><strong>Email:</strong> {formData.email}</div>
                <div><strong>Gift Cards:</strong> {formData.cards.length} card(s)</div>
                <div><strong>Total Value:</strong> ${formData.cards.reduce((sum, card) => sum + (parseFloat(card.value) || 0), 0).toFixed(2)}</div>
                <div><strong>Payment Method:</strong> {formData.paymentMethod}</div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <strong>Please Note:</strong> Ensure all information is accurate. We'll review your submission once the submission is made. Make sure your uploaded images are clear and show all required details.
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Submit Your Gift Card
          </h1>
          <p className="text-lg text-gray-600">
            Complete the form below to sell your gift cards quickly and securely
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      isCompleted
                        ? 'bg-green-600 text-white'
                        : isActive
                        ? 'bg-pink-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <StepIcon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-medium ${isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 hidden sm:block">
                      {step.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {renderStep()}

          {/* Navigation */}
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

            {currentStep === steps.length ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3 rounded-lg font-medium transition-colors ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-pink-600 hover:bg-pink-700'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner w-5 h-5"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Form</span>
                    <Check className="w-5 h-5" />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Professional Success Modal */}
      {showSuccessModal && submissionResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Submission Successful!
              </h3>
              <p className="text-pink-100 text-sm sm:text-base">
                Your gift card details have been received
              </p>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              {/* Reference Number */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Reference Number</p>
                  <div className="flex items-center justify-center space-x-2">
                    <p className="text-lg sm:text-xl font-bold text-gray-900 break-all">
                      {submissionResult.reference_number}
                    </p>
                    <button
                      onClick={() => navigator.clipboard.writeText(submissionResult.reference_number)}
                      className="p-1 text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
                      title="Copy reference number"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Email confirmation */}
              <div className="flex items-start space-x-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Confirmation Email Sent
                  </p>
                  <p className="text-sm text-gray-600">
                    A detailed confirmation has been sent to{' '}
                    <span className="font-medium text-gray-900 break-words">
                      {formData.email}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Please check your inbox and spam folder
                  </p>
                </div>
              </div>

              {/* Next steps */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <h4 className="text-sm font-semibold text-green-800 mb-2">
                  What happens next?
                </h4>
                <ul className="text-xs sm:text-sm text-green-700 space-y-1">
                  <li>• Our team will review your submission</li>
                  <li>• Payment processed within same day upon acceptance</li>
                </ul>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    setSubmissionResult(null);
                    // Reset form
                    setFormData({
                      firstName: '', lastName: '', email: '', phoneNumber: '',
                      cards: [{ brand: '', value: '', condition: '', hasReceipt: '', cardType: '', digitalCode: '', digitalPin: '', frontImage: null, backImage: null, receiptImage: null }],
                      paymentMethod: '', paypalAddress: '', zelleDetails: '', cashAppTag: '', btcAddress: '', chimeDetails: ''
                    });
                    setCurrentStep(1);
                  }}
                  className="w-full bg-pink-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors text-center text-sm sm:text-base"
                >
                  Submit Another Card
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    setSubmissionResult(null);
                    window.location.href = '/';
                  }}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center text-sm sm:text-base"
                >
                  Return Home
                </button>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => {
                setShowSuccessModal(false);
                setSubmissionResult(null);
              }}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSubmission;