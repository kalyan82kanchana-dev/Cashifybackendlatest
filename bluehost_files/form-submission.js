// Form Submission JavaScript
let currentStep = 1;
let cardCount = 1;
const totalSteps = 4;

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    setupEventListeners();
});

function setupEventListeners() {
    // Payment method selection
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', handlePaymentMethodChange);
    });

    // Card type selection
    document.addEventListener('change', function(e) {
        if (e.target.name && e.target.name.startsWith('cardType_')) {
            handleCardTypeChange(e.target);
        }
    });

    // Payment method selection visual
    document.addEventListener('click', function(e) {
        const paymentMethod = e.target.closest('.payment-method');
        if (paymentMethod) {
            const radio = paymentMethod.querySelector('input[type="radio"]');
            if (radio) {
                // Remove selected class from all methods
                document.querySelectorAll('.payment-method').forEach(method => {
                    method.classList.remove('selected');
                });
                // Add selected class to clicked method
                paymentMethod.classList.add('selected');
                radio.checked = true;
                handlePaymentMethodChange({ target: radio });
            }
        }
    });
}

function nextStep() {
    if (validateStep(currentStep)) {
        if (currentStep < totalSteps) {
            currentStep++;
            updateStep();
            updateProgress();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStep();
        updateProgress();
    }
}

function updateStep() {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    document.getElementById(`step${currentStep}`).classList.add('active');
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    prevBtn.disabled = currentStep === 1;
    
    if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'flex';
        updateSummary();
    } else {
        nextBtn.style.display = 'flex';
        submitBtn.style.display = 'none';
    }
}

function updateProgress() {
    const progressPercent = (currentStep / totalSteps) * 100;
    document.getElementById('progressFill').style.width = `${progressPercent}%`;
    
    // Update step icons
    for (let i = 1; i <= totalSteps; i++) {
        const icon = document.getElementById(`step${i}Icon`);
        const title = icon.parentElement.querySelector('.step-title');
        
        if (i < currentStep) {
            icon.className = 'step-icon completed';
            title.className = 'step-title completed';
            icon.innerHTML = '<svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>';
        } else if (i === currentStep) {
            icon.className = 'step-icon active';
            title.className = 'step-title active';
        } else {
            icon.className = 'step-icon inactive';
            title.className = 'step-title inactive';
        }
    }
}

function validateStep(step) {
    let isValid = true;
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.style.display = 'none');
    
    // Remove error styling
    document.querySelectorAll('.form-input.error').forEach(input => {
        input.classList.remove('error');
    });
    
    switch (step) {
        case 1:
            isValid = validatePersonalInfo();
            break;
        case 2:
            isValid = validateGiftCardDetails();
            break;
        case 3:
            isValid = validatePaymentMethod();
            break;
        case 4:
            isValid = true; // Review step, no validation needed
            break;
    }
    
    return isValid;
}

function validatePersonalInfo() {
    let isValid = true;
    
    const firstName = document.querySelector('input[name="firstName"]');
    const lastName = document.querySelector('input[name="lastName"]');
    const email = document.querySelector('input[name="email"]');
    const phone = document.querySelector('input[name="phoneNumber"]');
    
    if (!firstName.value.trim()) {
        showFieldError('firstNameError', firstName);
        isValid = false;
    }
    
    if (!lastName.value.trim()) {
        showFieldError('lastNameError', lastName);
        isValid = false;
    }
    
    if (!validateEmail(email.value)) {
        showFieldError('emailError', email);
        isValid = false;
    }
    
    if (!validatePhone(phone.value)) {
        showFieldError('phoneError', phone);
        isValid = false;
    }
    
    return isValid;
}

function validateGiftCardDetails() {
    let isValid = true;
    
    // Validate each card
    for (let i = 0; i < cardCount; i++) {
        const brand = document.querySelector(`select[name="brand_${i}"]`);
        const value = document.querySelector(`input[name="value_${i}"]`);
        const condition = document.querySelector(`select[name="condition_${i}"]`);
        const hasReceipt = document.querySelector(`select[name="hasReceipt_${i}"]`);
        const cardType = document.querySelector(`select[name="cardType_${i}"]`);
        
        if (!brand?.value) {
            brand?.classList.add('error');
            isValid = false;
        }
        
        if (!value?.value || parseFloat(value.value) < 50) {
            value?.classList.add('error');
            isValid = false;
        }
        
        if (!condition?.value) {
            condition?.classList.add('error');
            isValid = false;
        }
        
        if (!hasReceipt?.value) {
            hasReceipt?.classList.add('error');
            isValid = false;
        }
        
        if (!cardType?.value) {
            cardType?.classList.add('error');
            isValid = false;
        }
        
        // Validate digital code if it's a digital card
        if (cardType?.value === 'digital') {
            const digitalCode = document.querySelector(`input[name="digitalCode_${i}"]`);
            if (!digitalCode?.value.trim()) {
                digitalCode?.classList.add('error');
                isValid = false;
            }
        }
    }
    
    return isValid;
}

function validatePaymentMethod() {
    let isValid = true;
    
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!paymentMethod) {
        return false;
    }
    
    // Validate payment method specific fields
    const method = paymentMethod.value;
    let requiredField = null;
    
    switch (method) {
        case 'paypal':
            requiredField = document.querySelector('input[name="paypalAddress"]');
            break;
        case 'zelle':
            requiredField = document.querySelector('input[name="zelleDetails"]');
            break;
        case 'cashapp':
            requiredField = document.querySelector('input[name="cashAppTag"]');
            break;
        case 'btc':
            requiredField = document.querySelector('input[name="btcAddress"]');
            break;
    }
    
    if (requiredField && !requiredField.value.trim()) {
        requiredField.classList.add('error');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(errorId, inputElement) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.style.display = 'flex';
    }
    if (inputElement) {
        inputElement.classList.add('error');
    }
}

function addCard() {
    cardCount++;
    const container = document.getElementById('cardsContainer');
    
    const cardHtml = `
        <div class="card-form" data-card-index="${cardCount - 1}" style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e5e7eb;">
            <h3 style="font-weight: 600; margin-bottom: 1rem; color: #374151;">Gift Card ${cardCount}</h3>
            
            <div class="grid-cols-2">
                <div class="form-group">
                    <label class="form-label">Gift Card Brand <span class="required">*</span></label>
                    <select name="brand_${cardCount - 1}" class="form-select" required>
                        <option value="">Select Brand</option>
                        <option value="Amazon">Amazon</option>
                        <option value="Apple">Apple</option>
                        <option value="Best Buy">Best Buy</option>
                        <option value="Costco">Costco</option>
                        <option value="eBay">eBay</option>
                        <option value="Google Play">Google Play</option>
                        <option value="iTunes">iTunes</option>
                        <option value="Nike">Nike</option>
                        <option value="Starbucks">Starbucks</option>
                        <option value="Target">Target</option>
                        <option value="Walmart">Walmart</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Card Value ($) <span class="required">*</span></label>
                    <input type="number" name="value_${cardCount - 1}" class="form-input" min="50" step="0.01" required>
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Card Condition <span class="required">*</span></label>
                <select name="condition_${cardCount - 1}" class="form-select" required>
                    <option value="">Select Condition</option>
                    <option value="new-unused">New/Unused</option>
                    <option value="lightly-used">Lightly Used</option>
                    <option value="partially-used">Partially Used</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Do you have the receipt? <span class="required">*</span></label>
                <select name="hasReceipt_${cardCount - 1}" class="form-select" required>
                    <option value="">Select Option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Card Type <span class="required">*</span></label>
                <select name="cardType_${cardCount - 1}" class="form-select" required>
                    <option value="">Select Type</option>
                    <option value="physical">Physical Card</option>
                    <option value="digital">Digital/E-Gift Card</option>
                </select>
            </div>

            <div class="digital-fields" style="display: none;">
                <div class="form-group">
                    <label class="form-label">Digital Code/Number <span class="required">*</span></label>
                    <input type="text" name="digitalCode_${cardCount - 1}" class="form-input">
                </div>

                <div class="form-group">
                    <label class="form-label">Digital PIN (if applicable)</label>
                    <input type="text" name="digitalPin_${cardCount - 1}" class="form-input">
                </div>
            </div>

            <button type="button" onclick="removeCard(${cardCount - 1})" class="btn btn-secondary" style="margin-top: 1rem; background-color: #fee2e2; color: #dc2626; border: 1px solid #fecaca;">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
                Remove Card
            </button>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', cardHtml);
}

function removeCard(index) {
    const cardForm = document.querySelector(`[data-card-index="${index}"]`);
    if (cardForm && cardCount > 1) {
        cardForm.remove();
        cardCount--;
    }
}

function handleCardTypeChange(selectElement) {
    const cardIndex = selectElement.name.split('_')[1];
    const digitalFields = selectElement.closest('.card-form').querySelector('.digital-fields');
    const digitalCodeInput = document.querySelector(`input[name="digitalCode_${cardIndex}"]`);
    
    if (selectElement.value === 'digital') {
        digitalFields.style.display = 'block';
        digitalCodeInput.required = true;
    } else {
        digitalFields.style.display = 'none';
        digitalCodeInput.required = false;
        digitalCodeInput.value = '';
    }
}

function handlePaymentMethodChange(event) {
    const method = event.target.value;
    const detailsContainer = document.getElementById('paymentDetails');
    
    let html = '';
    
    switch (method) {
        case 'paypal':
            html = `
                <div class="form-group">
                    <label class="form-label">PayPal Email Address <span class="required">*</span></label>
                    <input type="email" name="paypalAddress" class="form-input" placeholder="Enter your PayPal email" required>
                </div>
            `;
            break;
        case 'zelle':
            html = `
                <div class="form-group">
                    <label class="form-label">Zelle Phone Number or Email <span class="required">*</span></label>
                    <input type="text" name="zelleDetails" class="form-input" placeholder="Enter your Zelle phone number or email" required>
                </div>
            `;
            break;
        case 'cashapp':
            html = `
                <div class="form-group">
                    <label class="form-label">Cash App Tag <span class="required">*</span></label>
                    <input type="text" name="cashAppTag" class="form-input" placeholder="e.g., $YourCashTag" required>
                </div>
            `;
            break;
        case 'btc':
            html = `
                <div class="form-group">
                    <label class="form-label">Bitcoin Wallet Address <span class="required">*</span></label>
                    <input type="text" name="btcAddress" class="form-input" placeholder="Enter your Bitcoin wallet address" required>
                </div>
            `;
            break;
    }
    
    detailsContainer.innerHTML = html;
    detailsContainer.style.display = html ? 'block' : 'none';
}

function updateSummary() {
    const formData = new FormData(document.getElementById('giftCardForm'));
    const summaryContainer = document.getElementById('summaryContent');
    
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const paymentMethod = formData.get('paymentMethod');
    
    let totalValue = 0;
    let cardsHtml = '';
    
    for (let i = 0; i < cardCount; i++) {
        const brand = formData.get(`brand_${i}`);
        const value = parseFloat(formData.get(`value_${i}`)) || 0;
        
        if (brand && value) {
            totalValue += value;
            cardsHtml += `<div class="summary-item"><span>${brand}</span><span>$${value.toFixed(2)}</span></div>`;
        }
    }
    
    const paymentMethodNames = {
        'paypal': 'PayPal',
        'zelle': 'Zelle',
        'cashapp': 'Cash App',
        'btc': 'Bitcoin'
    };
    
    summaryContainer.innerHTML = `
        <div class="summary-item"><span><strong>Name:</strong></span><span>${firstName} ${lastName}</span></div>
        <div class="summary-item"><span><strong>Email:</strong></span><span>${email}</span></div>
        <div class="summary-item"><span><strong>Gift Cards:</strong></span><span>${cardCount} card(s)</span></div>
        ${cardsHtml}
        <div class="summary-item" style="border-top: 1px solid #e5e7eb; padding-top: 0.5rem; margin-top: 0.5rem;">
            <span><strong>Total Value:</strong></span><span><strong>$${totalValue.toFixed(2)}</strong></span>
        </div>
        <div class="summary-item"><span><strong>Payment Method:</strong></span><span>${paymentMethodNames[paymentMethod] || paymentMethod}</span></div>
    `;
}

async function submitForm() {
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitIcon = document.getElementById('submitIcon');
    const submitSpinner = document.getElementById('submitSpinner');
    
    // Show loading state
    submitBtn.disabled = true;
    submitText.textContent = 'Submitting...';
    submitIcon.style.display = 'none';
    submitSpinner.style.display = 'block';
    
    try {
        const formData = new FormData(document.getElementById('giftCardForm'));
        
        // Build submission data
        const submissionData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phoneNumber: formData.get('phoneNumber'),
            paymentMethod: formData.get('paymentMethod'),
            cards: []
        };
        
        // Add payment method details
        const paymentMethod = formData.get('paymentMethod');
        if (paymentMethod === 'paypal') {
            submissionData.paypalAddress = formData.get('paypalAddress');
        } else if (paymentMethod === 'zelle') {
            submissionData.zelleDetails = formData.get('zelleDetails');
        } else if (paymentMethod === 'cashapp') {
            submissionData.cashAppTag = formData.get('cashAppTag');
        } else if (paymentMethod === 'btc') {
            submissionData.btcAddress = formData.get('btcAddress');
        }
        
        // Add cards data
        for (let i = 0; i < cardCount; i++) {
            const brand = formData.get(`brand_${i}`);
            const value = formData.get(`value_${i}`);
            
            if (brand && value) {
                const card = {
                    brand: brand,
                    value: value,
                    condition: formData.get(`condition_${i}`),
                    hasReceipt: formData.get(`hasReceipt_${i}`),
                    cardType: formData.get(`cardType_${i}`),
                    digitalCode: formData.get(`digitalCode_${i}`) || '',
                    digitalPin: formData.get(`digitalPin_${i}`) || ''
                };
                
                submissionData.cards.push(card);
            }
        }
        
        // Submit to PHP backend
        const response = await fetch('submit-form.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submissionData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Show success modal
            showSuccessModal(result.reference_number, submissionData.email);
        } else {
            throw new Error(result.message || 'Submission failed');
        }
        
    } catch (error) {
        console.error('Submission error:', error);
        showNotification('There was an error submitting your form. Please try again.', 'error');
        
        // Reset button state
        submitBtn.disabled = false;
        submitText.textContent = 'Submit Form';
        submitIcon.style.display = 'block';
        submitSpinner.style.display = 'none';
    }
}

function showSuccessModal(referenceNumber, email) {
    const modal = document.getElementById('successModal');
    const refNumber = document.getElementById('modalReferenceNumber');
    const emailAddress = document.getElementById('modalEmailAddress');
    
    refNumber.textContent = referenceNumber;
    emailAddress.textContent = email;
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('successModal').classList.remove('active');
}

function copyReference() {
    const refNumber = document.getElementById('modalReferenceNumber').textContent;
    navigator.clipboard.writeText(refNumber).then(() => {
        showNotification('Reference number copied to clipboard!', 'success');
    });
}

function submitAnother() {
    closeModal();
    // Reset form
    document.getElementById('giftCardForm').reset();
    currentStep = 1;
    cardCount = 1;
    
    // Remove extra cards
    const extraCards = document.querySelectorAll('[data-card-index]:not([data-card-index="0"])');
    extraCards.forEach(card => card.remove());
    
    // Reset UI
    updateStep();
    updateProgress();
    
    // Reset button states
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitIcon = document.getElementById('submitIcon');
    const submitSpinner = document.getElementById('submitSpinner');
    
    submitBtn.disabled = false;
    submitText.textContent = 'Submit Form';
    submitIcon.style.display = 'block';
    submitSpinner.style.display = 'none';
}

function returnHome() {
    window.location.href = '/';
}