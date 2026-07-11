const API_URL = 'https://smartfarmer-m7x3.onrender.com';

async function registerFarmer() {

    const full_name = document.getElementById("regName").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const location = document.getElementById("regLocation").value.trim();

    const password = document.getElementById("regPassword").value.trim();

    if (!full_name || !phone || !password) {
        showMessage("Please fill all required fields.", "error");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/api/auth/register`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                full_name,
                phone,
                location,
                password
            })

        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("token", data.token);

            showMessage("Registration successful!", "success");

            setTimeout(() => {
                window.location.href = "crop-log.html";
            }, 1500);

        } else {

            showMessage(data.message, "error");

        }

    } catch (err) {

        showMessage("Server error.", "error");

    }

}

async function loginFarmer() {

    const phone = document.getElementById("loginPhone").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!phone || !password) {
        showMessage("Please enter phone and password.", "error");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/api/auth/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                phone,
                password
            })

        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("token", data.token);

            showMessage("Login successful!", "success");

            setTimeout(() => {
                window.location.href = "crop-log.html";
            }, 1000);

        } else {

            showMessage(data.message, "error");

        }

    } catch (err) {

        showMessage("Server error.", "error");

    }

}


function logout(){

    localStorage.removeItem("token");

    window.location.href="index.html";

}


function checkLoginStatus() {
    const farmerId = localStorage.getItem('farmer_id');
    const farmerName = localStorage.getItem('farmer_name');
    const banner = document.getElementById('farmerBanner');

    if (banner) {
        if (farmerId && farmerName) {
            banner.innerHTML = `
                <p>👨‍🌾 Logged in as: <strong>${farmerName}</strong>
                <button class="logout-btn" onclick="logout()">Logout</button></p>
            `;
            banner.style.display = 'block';
        } else {
            banner.style.display = 'none';
        }
    }
}


function showMessage(text, type) {
    const msgDiv = document.getElementById('authMessage');
    if (!msgDiv) return;

    msgDiv.className = 'message ' + type;
    msgDiv.textContent = text;
    msgDiv.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(() => {
        msgDiv.style.display = 'none';
    }, 5000);
}


function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    if (nav) nav.classList.toggle('active');
}


document.addEventListener('DOMContentLoaded', function() {
    // Check login status on register page
    if (document.getElementById('farmerBanner')) {
        checkLoginStatus();
    }


    const firstInput = document.querySelector('input');
    if (firstInput) {
        firstInput.focus();
    }
});


window.registerFarmer = registerFarmer;
window.loginFarmer = loginFarmer;
window.logout = logout;
window.toggleMenu = toggleMenu;
window.checkLoginStatus = checkLoginStatus;
