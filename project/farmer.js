// Load initial data
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadInventory();
});

// Add new product
function addProduct(event) {
    event.preventDefault();

    const product = {
        id: Date.now(),
        name: document.getElementById('productName').value,
        category: document.getElementById('category').value,
        quantity: document.getElementById('quantity').value,
        price: document.getElementById('price').value,
        season: document.getElementById('season').value,
        harvestDate: document.getElementById('harvestDate').value,
        description: document.getElementById('description').value,
        image: document.getElementById('productImage').files[0] ? URL.createObjectURL(document.getElementById('productImage').files[0]) : null,
        farmer: JSON.parse(localStorage.getItem('currentUser')).fullName,
        status: 'ACTIVE'
    };

    // Save product
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

    // Reset form and reload inventory
    event.target.reset();
    loadInventory();
    alert('Product added successfully!');
}

// Load inventory
function loadInventory() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const products = JSON.parse(localStorage.getItem('products') || '[]')
        .filter(p => p.farmer === currentUser.fullName);

    const tableBody = document.getElementById('inventoryTable');

    if (tableBody) {
        tableBody.innerHTML = products.map(product => `
            <tr>
                <td>
                    <div class="product-cell">
                        <img src="${product.image}" alt="${product.name}" width="50">
                        <span>${product.name}</span>
                    </div>
                </td>
                <td>${product.category}</td>
                <td>${product.quantity} kg</td>
                <td>₹${product.price}/kg</td>
                <td>${product.season}</td>
                <td><span class="status ${product.status.toLowerCase()}">${product.status}</span></td>
                <td>
                    <button onclick="editProduct(${product.id})" class="action-btn">Edit</button>
                    <button onclick="toggleProductStatus(${product.id})" class="action-btn">
                        ${product.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

// Edit product
function editProduct(productId) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const product = products.find(p => p.id === productId);

    if (product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('category').value = product.category;
        document.getElementById('quantity').value = product.quantity;
        document.getElementById('price').value = product.price;
        document.getElementById('season').value = product.season;
        document.getElementById('harvestDate').value = product.harvestDate;
        document.getElementById('description').value = product.description;

        // Scroll to form
        document.getElementById('add-product-section').scrollIntoView({ behavior: 'smooth' });
    }
}

// Toggle product status
function toggleProductStatus(productId) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex !== -1) {
        products[productIndex].status = products[productIndex].status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        localStorage.setItem('products', JSON.stringify(products));
        loadInventory();
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