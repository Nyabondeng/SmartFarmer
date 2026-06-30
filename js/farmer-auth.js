const API_URL = 'https://smartfarmer-m7x3.onrender.com';


async function registerFarmer() {
    const name = document.getElementById('regName').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const location = document.getElementById('regLocation').value.trim();


    if (!name || !phone) {
        showMessage('Please enter your full name and phone number.', 'error');
        return;
    }

    // Show loading state
    const btn = document.querySelector('#registerForm button');
    const originalText = btn.textContent;
    btn.textContent = 'Registering...';
    btn.disabled = true;

    try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, location })
        });

        const result = await response.json();

        if (result.success) {
            // Save farmer data to localStorage
            localStorage.setItem('farmer_id', result.data.id);
            localStorage.setItem('farmer_name', result.data.name);
            localStorage.setItem('farmer_phone', result.data.phone);

            showMessage('✅ ' + result.message, 'success');

            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'crop-log.html';
            }, 2000);

        } else {
            showMessage('❌ ' + result.error, 'error');
            btn.textContent = originalText;
            btn.disabled = false;
        }

    } catch (error) {
        console.error('Registration error:', error);
        showMessage('❌ Network error. Please try again.', 'error');
        btn.textContent = originalText;
        btn.disabled = false;
    }
}


async function loginFarmer() {
    const phone = document.getElementById('loginPhone').value.trim();

    if (!phone) {
        showMessage('Please enter your phone number.', 'error');
        return;
    }

    const btn = document.querySelector('#loginForm button');
    const originalText = btn.textContent;
    btn.textContent = 'Logging in...';
    btn.disabled = true;

    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone })
        });

        const result = await response.json();

        if (result.success) {
            localStorage.setItem('farmer_id', result.data.id);
            localStorage.setItem('farmer_name', result.data.name);
            localStorage.setItem('farmer_phone', result.data.phone);

            showMessage('✅ ' + result.message, 'success');

            setTimeout(() => {
                window.location.href = 'crop-log.html';
            }, 2000);

        } else {
            showMessage('❌ ' + result.error, 'error');
            btn.textContent = originalText;
            btn.disabled = false;
        }

    } catch (error) {
        console.error('Login error:', error);
        showMessage('❌ Network error. Please try again.', 'error');
        btn.textContent = originalText;
        btn.disabled = false;
    }
}


function logout() {
    localStorage.removeItem('farmer_id');
    localStorage.removeItem('farmer_name');
    localStorage.removeItem('farmer_phone');
    window.location.href = 'index.html';
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
