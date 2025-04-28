// Product categories and data
const categories = [
    "Grains & Pulses",
    "Fresh Vegetables",
    "Fresh Fruits",
    "Organic Products",
    "Dairy & Poultry"
];

const products = [
    {
        id: 1,
        name: "Organic Wheat",
        price: 30,
        unit: "kg",
        farmer: "Ramesh Kumar",
        location: "Punjab",
        category: "Grains & Pulses",
        image: "https://images.unsplash.com/photo-1565591452825-67d6b7df1d47?w=800",
        description: "Premium quality organic wheat directly from Punjab farms"
    },
    {
        id: 2,
        name: "Fresh Tomatoes",
        price: 40,
        unit: "kg",
        farmer: "Suresh Patel",
        location: "Maharashtra",
        category: "Fresh Vegetables",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800",
        description: "Farm-fresh, locally grown tomatoes"
    },
    {
        id: 3,
        name: "Basmati Rice",
        price: 65,
        unit: "kg",
        farmer: "Gurpreet Singh",
        location: "Haryana",
        category: "Grains & Pulses",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800",
        description: "Premium aged basmati rice"
    },
    {
        id: 4,
        name: "Fresh Apples",
        price: 120,
        unit: "kg",
        farmer: "Vijay Thakur",
        location: "Himachal Pradesh",
        category: "Fresh Fruits",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800",
        description: "Sweet and juicy Himalayan apples"
    },
    {
        id: 5,
        name: "Organic Honey",
        price: 450,
        unit: "kg",
        farmer: "Prakash Raj",
        location: "Karnataka",
        category: "Organic Products",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800",
        description: "Pure organic forest honey"
    },
    {
        id: 6,
        name: "Fresh Milk",
        price: 55,
        unit: "liter",
        farmer: "Rajesh Kumar",
        location: "Gujarat",
        category: "Dairy & Poultry",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800",
        description: "Farm-fresh organic milk"
    },
    {
        id: 7,
        name: "Organic Potatoes",
        price: 35,
        unit: "kg",
        farmer: "Mohan Singh",
        location: "Uttar Pradesh",
        category: "Fresh Vegetables",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800",
        description: "Fresh organic potatoes"
    },
    {
        id: 8,
        name: "Free Range Eggs",
        price: 90,
        unit: "dozen",
        farmer: "Anita Desai",
        location: "Maharashtra",
        category: "Dairy & Poultry",
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800",
        description: "Farm-fresh free-range eggs"
    }
];

let currentCategory = 'all';
let cart = [];

function loadCategories() {
    const container = document.getElementById('category-filters');
    if (container) {
        container.innerHTML = `
            <button class="category-btn active" onclick="filterProducts('all')">All</button>
            ${categories.map(category => `
                <button class="category-btn" onclick="filterProducts('${category}')">${category}</button>
            `).join('')}
        `;
    }
}

function filterProducts(category) {
    currentCategory = category;
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    loadProducts();
}

function loadProducts() {
    const container = document.getElementById('product-container');
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(p => p.category === currentCategory);

    container.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-card-content">
                <h3>${product.name}</h3>
                <p class="price">₹${product.price}/${product.unit}</p>
                <p class="description">${product.description}</p>
                <p>Farmer: ${product.farmer}</p>
                <p>Location: ${product.location}</p>
                <div class="product-actions">
                    <button onclick="addToCart(${product.id})" class="primary-btn">Add to Cart</button>
                    <button onclick="buyNow(${product.id})" class="secondary-btn">Buy Now</button>
                </div>
            </div>
        </div>
    `).join('');
}

function buyNow(productId) {
    const product = products.find(p => p.id === productId);
    cart = [{ ...product, quantity: 1 }];
    updateCart();
    proceedToCheckout();
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
    openCart();
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

function openCart() {
    document.getElementById('cart-sidebar').classList.add('open');
}

function closeCart() {
    document.getElementById('cart-sidebar').classList.remove('open');
}

function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    document.getElementById('address-modal').style.display = 'block';
    closeCart();
}

function validateAddress(formData) {
    const requiredFields = ['fullName', 'street', 'city', 'state', 'pincode', 'phone'];
    for (const field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
            return false;
        }
    }
    return true;
}

// Address form submission
document.getElementById('address-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    if (!validateAddress(formData)) {
        return;
    }

    // Save address data
    const addressData = {
        fullName: formData.get('fullName'),
        street: formData.get('street'),
        city: formData.get('city'),
        state: formData.get('state'),
        pincode: formData.get('pincode'),
        phone: formData.get('phone')
    };

    // Store address for order processing
    localStorage.setItem('deliveryAddress', JSON.stringify(addressData));
    
    document.getElementById('address-modal').style.display = 'none';
    document.getElementById('payment-modal').style.display = 'block';
});

function processPayment() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (!selectedPayment) {
        alert('Please select a payment method');
        return;
    }

    const paymentMethod = selectedPayment.value;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Show payment processing UI
    document.getElementById('payment-details').innerHTML = `
        <div class="payment-processing">
            <p>Processing payment of ₹${total} via ${paymentMethod.toUpperCase()}...</p>
            <div class="spinner"></div>
        </div>
    `;

    // Simulate payment processing
    setTimeout(() => {
        const orderDetails = {
            items: cart,
            total: total,
            paymentMethod: paymentMethod,
            address: JSON.parse(localStorage.getItem('deliveryAddress')),
            orderId: 'ORD' + Date.now()
        };

        // Store order details
        localStorage.setItem('lastOrder', JSON.stringify(orderDetails));

        alert(`Order Successful!\nOrder ID: ${orderDetails.orderId}\nThank you for shopping with us!`);
        cart = [];
        updateCart();
        document.getElementById('payment-modal').style.display = 'none';
        window.location.href = '#marketplace';
    }, 2000);
}

document.getElementById('language-selector').addEventListener('change', function(e) {
    console.log('Language changed to:', e.target.value);
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
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

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}