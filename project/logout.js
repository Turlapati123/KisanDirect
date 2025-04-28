function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const userType = document.getElementById("userType").value;

    // Basic Login Logic (For demonstration)
    if (email === "admin@kisandirect.com" && password === "admin123") {
        alert(`Login successful as ${userType}!`);

        // Show logout button
        document.getElementById("dashboardLinks").style.display = "block";
    } else {
        alert("Invalid email or password. Please try again.");
    }
}

function logout() {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        sessionStorage.clear(); // Clear session data
        localStorage.clear(); // Clear persistent data
        window.location.href = 'index.html'; // Redirect to Home Page
    }
}