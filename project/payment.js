let currentPaymentMethod = null;
let selectedUPIApp = null;

// Show selected payment form
function showPaymentForm(method) {
    // Hide all forms first
    document.querySelectorAll('.payment-form').forEach(form => {
        form.style.display = 'none';
    });

    // Show selected form
    document.getElementById(`${method}Form`).style.display = 'block';
    currentPaymentMethod = method;

    // Reset active state on payment methods
    document.querySelectorAll('.payment-method').forEach(method => {
        method.classList.remove('active');
    });

    // Add active state to selected method
    event.currentTarget.classList.add('active');
}

// Select UPI app
function selectUPIApp(app) {
    selectedUPIApp = app;
    document.querySelectorAll('.upi-app').forEach(appElement => {
        appElement.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

// Process UPI payment
function processUPIPayment(event) {
    event.preventDefault();
    
    if (!selectedUPIApp) {
        alert('Please select a UPI app');
        return;
    }

    const upiId = document.getElementById('upiId').value;
    
    // Simulate payment processing
    simulatePayment({
        method: 'UPI',
        upiId: upiId,
        upiApp: selectedUPIApp,
        amount: getOrderTotal()
    });
}

// Process card payment
function processCardPayment(event) {
    event.preventDefault();
    const cardData = {
        number: document.getElementById('cardNumber').value,
        expiry: document.getElementById('expiryDate').value,
        cvv: document.getElementById('cvv').value,
        name: document.getElementById('cardName').value
    };

    // Basic card validation
    if (!validateCard(cardData)) {
        return;
    }

    // Simulate payment processing
    simulatePayment({
        method: 'CARD',
        cardNumber: cardData.number.slice(-4),
        amount: getOrderTotal()
    });
}

// Validate card details
function validateCard(cardData) {
    // Remove spaces from card number
    const cardNumber = cardData.number.replace(/\s/g, '');
    
    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
        alert('Please enter a valid 16-digit card number');
        return false;
    }

    const [month, year] = cardData.expiry.split('/');
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (!month || !year || month > 12 || year < currentYear || 
        (year == currentYear && month < currentMonth)) {
        alert('Please enter a valid expiry date');
        return false;
    }

    if (cardData.cvv.length !== 3 || !/^\d+$/.test(cardData.cvv)) {
        alert('Please enter a valid CVV');
        return false;
    }

    return true;
}

// Process net banking payment
function processNetBankingPayment(event) {
    event.preventDefault();
    const bank = document.getElementById('bank').value;

    // Simulate payment processing
    simulatePayment({
        method: 'NET_BANKING',
        bank: bank,
        amount: getOrderTotal()
    });
}

// Process COD payment
function processCODPayment(event) {
    event.preventDefault();

    // Create COD order
    const orderDetails = {
        method: 'COD',
        amount: getOrderTotal(),
        status: 'PENDING',
        timestamp: new Date().toISOString()
    };

    saveTransaction(orderDetails);
    showSuccessMessage('Order placed successfully! You will pay ₹' + orderDetails.amount + ' at the time of delivery.');
}

// Simulate payment processing
function simulatePayment(paymentDetails) {
    showLoadingState();

    setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate for demo
        
        if (success) {
            const transaction = {
                ...paymentDetails,
                status: 'SUCCESS',
                referenceNumber: generateReferenceNumber(),
                timestamp: new Date().toISOString()
            };

            saveTransaction(transaction);
            showSuccessMessage('Payment successful! Reference number: ' + transaction.referenceNumber);
        } else {
            showErrorMessage('Payment failed. Please try again.');
        }

        hideLoadingState();
    }, 2000);
}

// Helper functions
function getOrderTotal() {
    return parseFloat(document.getElementById('orderTotal').textContent.replace('₹', ''));
}

function generateReferenceNumber() {
    return 'REF' + Date.now().toString().slice(-8);
}

function saveTransaction(transaction) {
    let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function showLoadingState() {
    const button = document.querySelector('.payment-button');
    button.disabled = true;
    button.innerHTML = '<div class="spinner"></div> Processing...';
}

function hideLoadingState() {
    const button = document.querySelector('.payment-button');
    button.disabled = false;
    button.innerHTML = 'Pay Now';
}

function showSuccessMessage(message) {
    alert(message);
    setTimeout(() => {
        window.location.href = 'transactions.html';
    }, 1000);
}

function showErrorMessage(message) {
    alert(message);
}

// Format card number input
document.getElementById('cardNumber')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(.{4})/g, '$1 ').trim();
    e.target.value = value;
});

// Format expiry date input
document.getElementById('expiryDate')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0,2) + '/'  + value.slice(2);
    }
    e.target.value = value;
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Load order total from localStorage or URL params
    const orderTotal = localStorage.getItem('orderTotal') || '1000';
    document.getElementById('orderTotal').textContent = '₹' + orderTotal;
});