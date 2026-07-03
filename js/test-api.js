const API_URL = 'https://smartfarmer-m7x3.onrender.com/api';

async function testApi() {
    console.log('Testing Smart Farmer API...\n');

    try {
        const health = await fetch(`${API_URL}/health`);
        console.log('Server health:', await health.json());
    } catch (e) {
        console.log('Server not reachable:', e.message);
    }

    try {
        const register = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Farmer',
                email: 'test@smartfarmer.com',
                password: 'password123',
                phone: '123456789',
                location: 'Yei'
            })
        });
        const data = await register.json();
        console.log('Register:', data);
    } catch (e) {
        console.log('Register failed:', e.message);
    }
}

testApi();
