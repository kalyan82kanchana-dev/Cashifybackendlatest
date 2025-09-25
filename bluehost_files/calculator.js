// Rate Calculator JavaScript
let selectedCategory = '';
let selectedCard = '';
let cardAmount = 0;

function updateCategory() {
    const radios = document.querySelectorAll('input[name="category"]');
    radios.forEach(radio => {
        if (radio.checked) {
            selectedCategory = radio.value;
        }
    });
    calculateRate();
}

function updateCard() {
    selectedCard = document.getElementById('giftCardSelect').value;
    calculateRate();
}

function updateAmount() {
    cardAmount = parseFloat(document.getElementById('cardAmount').value) || 0;
    calculateRate();
}

function calculateRate() {
    const errorElement = document.getElementById('errorMessage');
    const amountElement = document.getElementById('calculatedAmount');
    
    if (!cardAmount || cardAmount < 50) {
        errorElement.classList.remove('hidden');
        amountElement.textContent = '$0.00';
        return;
    }
    
    errorElement.classList.add('hidden');
    
    if (!selectedCategory || !selectedCard) {
        amountElement.textContent = '$0.00';
        return;
    }
    
    let percentCalc = 0;
    
    // High-value cards (92% with receipt, 78% without, 60%/55% partially used)
    if (['adidas', 'amazon', 'bestbuy', 'costco', 'doordash'].includes(selectedCard)) {
        if (selectedCategory === 'withReceipt') {
            percentCalc = (92 / 100) * cardAmount;
        } else if (selectedCategory === 'withoutReceipt') {
            percentCalc = (78 / 100) * cardAmount;
        } else if (selectedCategory === 'partiallyUsed') {
            percentCalc = (60 / 100) * cardAmount;
        }
    }
    // AirBnb specific rates
    else if (selectedCard === 'airbnb') {
        if (selectedCategory === 'withReceipt') {
            percentCalc = (85 / 100) * cardAmount;
        } else if (selectedCategory === 'withoutReceipt') {
            percentCalc = (74 / 100) * cardAmount;
        } else if (selectedCategory === 'partiallyUsed') {
            percentCalc = (55 / 100) * cardAmount;
        }
    }
    // American Express specific rates
    else if (selectedCard === 'amexp') {
        if (selectedCategory === 'withReceipt') {
            percentCalc = (92 / 100) * cardAmount;
        } else if (selectedCategory === 'withoutReceipt') {
            percentCalc = (75 / 100) * cardAmount;
        } else if (selectedCategory === 'partiallyUsed') {
            percentCalc = (55 / 100) * cardAmount;
        }
    }
    // Standard high-value cards
    else if (['apple', 'ebay', 'kohls', 'roblox', 'visa'].includes(selectedCard)) {
        if (selectedCategory === 'withReceipt') {
            percentCalc = (92 / 100) * cardAmount;
        } else if (selectedCategory === 'withoutReceipt') {
            percentCalc = (78 / 100) * cardAmount;
        } else if (selectedCategory === 'partiallyUsed') {
            percentCalc = (50 / 100) * cardAmount;
        }
    }
    // Standard premium cards
    else if (['disney', 'googleplay', 'homedepot', 'hotels', 'itunes', 'lowes', 'macy\'s', 'mastercard', 'myvanilla', 'nike', 'nordstorm', 'onevanilla', 'psnetwork', 'samclub', 'starbucks', 'steam', 'ulta', 'walmart'].includes(selectedCard)) {
        if (selectedCategory === 'withReceipt') {
            percentCalc = (92 / 100) * cardAmount;
        } else if (selectedCategory === 'withoutReceipt') {
            percentCalc = (78 / 100) * cardAmount;
        } else if (selectedCategory === 'partiallyUsed') {
            percentCalc = (55 / 100) * cardAmount;
        }
    }
    // Default for other cards
    else {
        if (selectedCategory === 'withReceipt') {
            percentCalc = (85 / 100) * cardAmount;
        } else if (selectedCategory === 'withoutReceipt') {
            percentCalc = (70 / 100) * cardAmount;
        } else if (selectedCategory === 'partiallyUsed') {
            percentCalc = (45 / 100) * cardAmount;
        }
    }
    
    amountElement.textContent = `$${percentCalc.toFixed(2)}`;
}