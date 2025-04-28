// Handle user type selection in registration
document.getElementById('userType')?.addEventListener('change', function(e) {
    const farmerFields = document.getElementById('farmerFields');
    if (farmerFields) {
        farmerFields.style.display = e.target.value === 'farmer' ? 'block' : 'none';
    }
});

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('userType').value;

    // In a real application, this would be an API call
    const user = {
        email,
        userType
    };

    // Store user data in localStorage for demo purposes
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Redirect based on user type
    switch(userType) {
        case 'admin':
            window.location.href = 'admin.html';
            break;
        case 'farmer':
            window.location.href = 'farmer-dashboard.html';
            break;
        default:
            window.location.href = 'index.html';
    }
}

// Handle registration
function handleRegister(event) {
    event.preventDefault();
    
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value,
        userType: document.getElementById('userType').value
    };

    if (formData.userType === 'farmer') {
        formData.farmDetails = {
            farmName: document.getElementById('farmName').value,
            location: document.getElementById('farmLocation').value,
            farmingType: document.getElementById('farmingType').value
        };
    }

    // Store user data in localStorage for demo purposes
    localStorage.setItem('currentUser', JSON.stringify(formData));

    // Redirect to appropriate dashboard
    if (formData.userType === 'farmer') {
        window.location.href = 'farmer-dashboard.html';
    } else {
        window.location.href = 'index.html';
    }
}

// Handle logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Check authentication status
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
    }
    return JSON.parse(currentUser);
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