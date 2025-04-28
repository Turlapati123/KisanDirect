// Load initial data
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadRecentOrders();
    loadTransactions();
});

// Load recent orders
function loadRecentOrders() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const tableBody = document.getElementById('recentOrdersTable');

    if (tableBody) {
        tableBody.innerHTML = orders.map(order => `
            <tr>
                <td>${order.orderId}</td>
                <td>${order.customerName}</td>
                <td>${order.items.length} items</td>
                <td>₹${order.total}</td>
                <td><span class="status ${order.status.toLowerCase()}">${order.status}</span></td>
                <td>
                    <button onclick="viewOrder('${order.orderId}')" class="action-btn">View</button>
                    <button onclick="updateOrderStatus('${order.orderId}')" class="action-btn">Update</button>
                </td>
            </tr>
        `).join('');
    }
}

// Load transactions
function loadTransactions() {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const tableBody = document.getElementById('transactionsTable');

    if (tableBody) {
        tableBody.innerHTML = transactions.map(transaction => `
            <tr>
                <td>${transaction.referenceNumber || '-'}</td>
                <td>${new Date(transaction.timestamp).toLocaleDateString()}</td>
                <td>₹${transaction.amount}</td>
                <td>${transaction.method}</td>
                <td><span class="status ${transaction.status.toLowerCase()}">${transaction.status}</span></td>
                <td>${transaction.referenceNumber || 'N/A'}</td>
            </tr>
        `).join('');
    }
}

// Filter data based on date range
function filterData() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // In a real app, this would filter the data from the backend
    console.log('Filtering data between', startDate, 'and', endDate);
}

// View order details
function viewOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.orderId === orderId);

    if (order) {
        alert(`
            Order Details:
            Order ID: ${order.orderId}
            Customer: ${order.customerName}
            Total: ₹${order.total}
            Status: ${order.status}
            Items: ${order.items.map(item => `\n- ${item.name} (${item.quantity})`).join('')}
        `);
    }
}

// Update order status
function updateOrderStatus(orderId) {
    const newStatus = prompt('Enter new status (PENDING/PROCESSING/COMPLETED/CANCELLED):');
    if (newStatus) {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const orderIndex = orders.findIndex(o => o.orderId === orderId);

        if (orderIndex !== -1) {
            orders[orderIndex].status = newStatus.toUpperCase();
            localStorage.setItem('orders', JSON.stringify(orders));
            loadRecentOrders();
        }
    }
}

// Initialize offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed:', err);
        });
    });
}