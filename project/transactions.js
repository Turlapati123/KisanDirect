// Sample transaction data
const sampleTransactions = [
    {
        referenceNumber: 'REF20240301',
        amount: 2500,
        method: 'UPI',
        status: 'SUCCESS',
        timestamp: '2024-03-01T10:30:00',
        upiId: 'user1@upi'
    },
    {
        referenceNumber: 'REF20240302',
        amount: 1800,
        method: 'CARD',
        status: 'SUCCESS',
        timestamp: '2024-03-02T14:15:00',
        cardNumber: '4111'
    },
    {
        referenceNumber: 'REF20240303',
        amount: 3200,
        method: 'NET_BANKING',
        status: 'SUCCESS',
        timestamp: '2024-03-03T09:45:00',
        bank: 'SBI'
    },
    {
        referenceNumber: 'REF20240304',
        amount: 1500,
        method: 'UPI',
        status: 'FAILED',
        timestamp: '2024-03-04T16:20:00',
        upiId: 'user2@upi'
    },
    {
        referenceNumber: 'REF20240305',
        amount: 4200,
        method: 'CARD',
        status: 'SUCCESS',
        timestamp: '2024-03-05T11:10:00',
        cardNumber: '5123'
    },
    {
        referenceNumber: 'REF20240306',
        amount: 2800,
        method: 'COD',
        status: 'PENDING',
        timestamp: '2024-03-06T13:25:00'
    },
    {
        referenceNumber: 'REF20240307',
        amount: 3600,
        method: 'UPI',
        status: 'SUCCESS',
        timestamp: '2024-03-07T15:40:00',
        upiId: 'user3@upi'
    },
    {
        referenceNumber: 'REF20240308',
        amount: 1900,
        method: 'NET_BANKING',
        status: 'SUCCESS',
        timestamp: '2024-03-08T10:05:00',
        bank: 'HDFC'
    },
    {
        referenceNumber: 'REF20240309',
        amount: 2700,
        method: 'CARD',
        status: 'SUCCESS',
        timestamp: '2024-03-09T14:30:00',
        cardNumber: '9876'
    },
    {
        referenceNumber: 'REF20240310',
        amount: 3100,
        method: 'UPI',
        status: 'SUCCESS',
        timestamp: '2024-03-10T12:15:00',
        upiId: 'user4@upi'
    },
    {
        referenceNumber: 'REF20240311',
        amount: 2300,
        method: 'COD',
        status: 'PENDING',
        timestamp: '2024-03-11T09:20:00'
    },
    {
        referenceNumber: 'REF20240312',
        amount: 4500,
        method: 'CARD',
        status: 'SUCCESS',
        timestamp: '2024-03-12T16:45:00',
        cardNumber: '4321'
    },
    {
        referenceNumber: 'REF20240313',
        amount: 2900,
        method: 'UPI',
        status: 'SUCCESS',
        timestamp: '2024-03-13T11:30:00',
        upiId: 'user5@upi'
    },
    {
        referenceNumber: 'REF20240314',
        amount: 1700,
        method: 'NET_BANKING',
        status: 'FAILED',
        timestamp: '2024-03-14T13:50:00',
        bank: 'ICICI'
    },
    {
        referenceNumber: 'REF20240315',
        amount: 3800,
        method: 'CARD',
        status: 'SUCCESS',
        timestamp: '2024-03-15T15:25:00',
        cardNumber: '6789'
    },
    {
        referenceNumber: 'REF20240316',
        amount: 2100,
        method: 'UPI',
        status: 'SUCCESS',
        timestamp: '2024-03-16T10:40:00',
        upiId: 'user6@upi'
    },
    {
        referenceNumber: 'REF20240317',
        amount: 4100,
        method: 'COD',
        status: 'PENDING',
        timestamp: '2024-03-17T14:15:00'
    },
    {
        referenceNumber: 'REF20240318',
        amount: 2600,
        method: 'CARD',
        status: 'SUCCESS',
        timestamp: '2024-03-18T12:30:00',
        cardNumber: '5432'
    },
    {
        referenceNumber: 'REF20240319',
        amount: 3400,
        method: 'UPI',
        status: 'SUCCESS',
        timestamp: '2024-03-19T09:55:00',
        upiId: 'user7@upi'
    },
    {
        referenceNumber: 'REF20240320',
        amount: 1600,
        method: 'NET_BANKING',
        status: 'SUCCESS',
        timestamp: '2024-03-20T16:20:00',
        bank: 'PNB'
    },
    {
        referenceNumber: 'REF20240321',
        amount: 2900,
        method: 'CARD',
        status: 'SUCCESS',
        timestamp: '2024-03-21T11:45:00',
        cardNumber: '8765'
    },
    {
        referenceNumber: 'REF20240322',
        amount: 3700,
        method: 'UPI',
        status: 'SUCCESS',
        timestamp: '2024-03-22T13:10:00',
        upiId: 'user8@upi'
    },
    {
        referenceNumber: 'REF20240323',
        amount: 2400,
        method: 'COD',
        status: 'PENDING',
        timestamp: '2024-03-23T15:35:00'
    },
    {
        referenceNumber: 'REF20240324',
        amount: 4300,
        method: 'CARD',
        status: 'SUCCESS',
        timestamp: '2024-03-24T10:25:00',
        cardNumber: '3456'
    },
    {
        referenceNumber: 'REF20240325',
        amount: 2800,
        method: 'UPI',
        status: 'FAILED',
        timestamp: '2024-03-25T14:50:00',
        upiId: 'user9@upi'
    },
    {
        referenceNumber: 'REF20240326',
        amount: 1900,
        method: 'NET_BANKING',
        status: 'SUCCESS',
        timestamp: '2024-03-26T12:15:00',
        bank: 'AXIS'
    },
    {
        referenceNumber: 'REF20240327',
        amount: 3500,
        method: 'CARD',
        status: 'SUCCESS',
        timestamp: '2024-03-27T09:40:00',
        cardNumber: '7654'
    },
    {
        referenceNumber: 'REF20240328',
        amount: 2200,
        method: 'UPI',
        status: 'SUCCESS',
        timestamp: '2024-03-28T16:05:00',
        upiId: 'user10@upi'
    },
    {
        referenceNumber: 'REF20240329',
        amount: 4000,
        method: 'COD',
        status: 'PENDING',
        timestamp: '2024-03-29T11:30:00'
    },
    {
        referenceNumber: 'REF20240330',
        amount: 2700,
        method: 'CARD',
        status: 'SUCCESS',
        timestamp: '2024-03-30T13:55:00',
        cardNumber: '2345'
    }
];

// Load and display transactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sample data if no transactions exist
    if (!localStorage.getItem('transactions')) {
        localStorage.setItem('transactions', JSON.stringify(sampleTransactions));
    }
    loadTransactions();
    updateTransactionStats();
});

function loadTransactions() {
    const transactions = getTransactions();
    const tbody = document.getElementById('transactionsList');
    
    tbody.innerHTML = transactions.map(transaction => `
        <tr class="transaction-row ${transaction.status.toLowerCase()}">
            <td>${new Date(transaction.timestamp).toLocaleDateString()}</td>
            <td>${transaction.referenceNumber}</td>
            <td>₹${transaction.amount}</td>
            <td>${formatPaymentMethod(transaction.method)}</td>
            <td>
                <span class="status-badge ${transaction.status.toLowerCase()}">
                    ${transaction.status}
                </span>
            </td>
            <td>
                <button onclick="showTransactionDetails('${transaction.referenceNumber}')" class="view-details-btn">
                    View Details
                </button>
            </td>
        </tr>
    `).join('');
}

function getTransactions() {
    return JSON.parse(localStorage.getItem('transactions') || '[]');
}

function updateTransactionStats() {
    const transactions = getTransactions();
    const totalTransactions = transactions.length;
    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
    const successfulTransactions = transactions.filter(t => t.status === 'SUCCESS').length;

    document.getElementById('totalTransactions').textContent = totalTransactions;
    document.getElementById('totalAmount').textContent = `₹${totalAmount}`;
    document.getElementById('successfulTransactions').textContent = successfulTransactions;
}

function filterTransactions() {
    const dateRange = document.getElementById('dateRange').value;
    const status = document.getElementById('status').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    let transactions = getTransactions();

    // Apply date filter
    if (dateRange !== 'all') {
        const now = new Date();
        const startDate = new Date();

        switch(dateRange) {
            case 'today':
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'week':
                startDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(now.getMonth() - 1);
                break;
            case 'year':
                startDate.setFullYear(now.getFullYear() - 1);
                break;
        }

        transactions = transactions.filter(t => new Date(t.timestamp) >= startDate);
    }

    // Apply status filter
    if (status !== 'all') {
        transactions = transactions.filter(t => t.status.toLowerCase() === status);
    }

    // Apply payment method filter
    if (paymentMethod !== 'all') {
        transactions = transactions.filter(t => t.method.toLowerCase() === paymentMethod);
    }

    // Update display
    const tbody = document.getElementById('transactionsList');
    tbody.innerHTML = transactions.map(transaction => `
        <tr class="transaction-row ${transaction.status.toLowerCase()}">
            <td>${new Date(transaction.timestamp).toLocaleDateString()}</td>
            <td>${transaction.referenceNumber}</td>
            <td>₹${transaction.amount}</td>
            <td>${formatPaymentMethod(transaction.method)}</td>
            <td>
                <span class="status-badge ${transaction.status.toLowerCase()}">
                    ${transaction.status}
                </span>
            </td>
            <td>
                <button onclick="showTransactionDetails('${transaction.referenceNumber}')" class="view-details-btn">
                    View Details
                </button>
            </td>
        </tr>
    `).join('');
}

function formatPaymentMethod(method) {
    const methods = {
        UPI: 'UPI',
        CARD: 'Card Payment',
        NET_BANKING: 'Net Banking',
        COD: 'Cash on Delivery'
    };
    return methods[method] || method;
}

function showTransactionDetails(referenceNumber) {
    const transactions = getTransactions();
    const transaction = transactions.find(t => t.referenceNumber === referenceNumber);
    
    if (!transaction) return;

    const modal = document.getElementById('transactionModal');
    const detailsContainer = document.getElementById('transactionDetails');

    detailsContainer.innerHTML = `
        <div class="transaction-detail-grid">
            <div class="detail-row">
                <span class="detail-label">Transaction ID:</span>
                <span class="detail-value">${transaction.referenceNumber}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date & Time:</span>
                <span class="detail-value">${new Date(transaction.timestamp).toLocaleString()}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Amount:</span>
                <span class="detail-value">₹${transaction.amount}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Payment Method:</span>
                <span class="detail-value">${formatPaymentMethod(transaction.method)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value status-badge ${transaction.status.toLowerCase()}">
                    ${transaction.status}
                </span>
            </div>
            ${transaction.upiId ? `
                <div class="detail-row">
                    <span class="detail-label">UPI ID:</span>
                    <span class="detail-value">${transaction.upiId}</span>
                </div>
            ` : ''}
            ${transaction.cardNumber ? `
                <div class="detail-row">
                    <span class="detail-label">Card Number:</span>
                    <span class="detail-value">xxxx-xxxx-xxxx-${transaction.cardNumber}</span>
                </div>
            ` : ''}
            ${transaction.bank ? `
                <div class="detail-row">
                    <span class="detail-label">Bank:</span>
                    <span class="detail-value">${transaction.bank}</span>
                </div>
            ` : ''}
        </div>
    `;

    modal.style.display = 'block';
}

function closeTransactionModal() {
    document.getElementById('transactionModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('transactionModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}