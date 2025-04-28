// Sample product data
const products = [
    {
        id: 1,
        name: "Organic Wheat",
        price: 30,
        unit: "kg",
        farmer: "Ramesh Kumar",
        location: "Punjab",
        image: "https://images.unsplash.com/photo-1565591452825-67d6b7df1d47?w=800"
    },
    {
        id: 2,
        name: "Fresh Tomatoes",
        price: 40,
        unit: "kg",
        farmer: "Suresh Patel",
        location: "Maharashtra",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800"
    },
    {
        id: 3,
        name: "Basmati Rice",
        price: 65,
        unit: "kg",
        farmer: "Gurpreet Singh",
        location: "Haryana",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800"
    }
];

// Cart functionality
let cart = [];

function loadProducts() {
    const container = document.getElementById('product-container');
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}/${product.unit}</p>
            <p>Farmer: ${product.farmer}</p>
            <p>Location: ${product.location}</p>
            <button onclick="addToCart(${product.id})" class="primary-btn">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>₹${item.price} x ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `₹${total}`;

    // Update cart button
    document.querySelector('.cart-btn').textContent = `Cart (${cart.reduce((sum, item) => sum + item.quantity, 0)})`;
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        cart = cart.filter(item => item.id !== productId);
    } else {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
        }
    }
    updateCart();
}

// Cart sidebar
function openCart() {
    document.getElementById('cart-sidebar').classList.add('open');
}

function closeCart() {
    document.getElementById('cart-sidebar').classList.remove('open');
}

// Checkout process
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    document.getElementById('address-modal').style.display = 'block';
}

// Address form submission
document.getElementById('address-form').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('address-modal').style.display = 'none';
    document.getElementById('payment-modal').style.display = 'block';
});

// Payment processing
function processPayment() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (!selectedPayment) {
        alert('Please select a payment method');
        return;
    }

    // Simulate payment processing
    alert('Processing payment...');
    setTimeout(() => {
        alert('Payment successful! Your order has been placed.');
        cart = [];
        updateCart();
        document.getElementById('payment-modal').style.display = 'none';
        closeCart();
    }, 2000);
}

// Language selection
document.getElementById('language-selector').addEventListener('change', function(e) {
    // Implement language change logic here
    console.log('Language changed to:', e.target.value);
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
});

// Close modals when clicking outside
window.onclick = function(event) {
    const addressModal = document.getElementById('address-modal');
    const paymentModal = document.getElementById('payment-modal');
    if (event.target === addressModal) {
        addressModal.style.display = 'none';
    }
    if (event.target === paymentModal) {
        paymentModal.style.display = 'none';
    }
}