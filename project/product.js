function redirectTo(page) {
    window.location.href = page; // Redirect to specified page
}

// Sample Product List
const products = [
    { name: "Organic Tomatoes", price: "₹30/kg" },
    { name: "Fresh Potatoes", price: "₹20/kg" },
    { name: "Green Chillies", price: "₹40/kg" }
];

window.onload = function() {
    const productList = document.getElementById("product-list");
    products.forEach(product => {
        const item = document.createElement("div");
        item.className = "product-item";
        item.innerHTML = `<h3>${product.name}</h3><p>${product.price}</p>`;
        productList.appendChild(item);
    });
};