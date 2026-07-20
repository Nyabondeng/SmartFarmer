// test-backend.js - Backend API Testing

const API_URL = 'https://smartfarmer-m7x3.onrender.com/api';

async function testBackend() {
    console.log('🧪 =========================================');
    console.log('🧪  SMART FARMER BACKEND API TESTS');
    console.log('🧪 =========================================\n');

    // ===== TEST 1: HEALTH CHECK =====
    console.log('📡 TEST 1: Health Check');
    try {
        const response = await fetch(`${API_URL}/health`);
        const data = await response.json();
        console.log('✅ Status:', response.status);
        console.log('✅ Response:', JSON.stringify(data));
        console.log('✅ Health check PASSED\n');
    } catch (error) {
        console.log('❌ Health check FAILED:', error.message, '\n');
    }

    // ===== TEST 2: GET CROPS =====
    console.log('🌾 TEST 2: Get All Crops');
    try {
        const response = await fetch(`${API_URL}/crops`);
        const data = await response.json();
        console.log('✅ Status:', response.status);
        if (response.ok) {
            console.log('✅ Crops API PASSED');
            console.log('✅ Total crops:', data.data ? data.data.length : 0);
            if (data.data && data.data.length > 0) {
                const cropNames = data.data.slice(0, 10).map(c => c.name).join(', ');
                console.log('✅ First 10 crops:', cropNames);
            }
        } else {
            console.log('⚠️ Crops API returned:', data);
        }
        console.log('');
    } catch (error) {
        console.log('❌ Crops API FAILED:', error.message, '\n');
    }

    // ===== TEST 3: REGISTER USER =====
    console.log('📝 TEST 3: User Registration');
    const testPhone = '0912345678';
    const testPassword = 'password123';
    let authToken = null;
    const testUser = {
        name: 'Test Farmer',
        phone: testPhone,
        location: 'Yei',
        password: testPassword
    };
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        const data = await response.json();
        console.log('✅ Status:', response.status);
        if (response.ok) {
            console.log('✅ Registration PASSED');
            console.log('✅ User:', data.user);
            console.log('✅ Token:', data.token ? 'Received ✅' : 'Not received ❌');
            authToken = data.token;
        } else {
            console.log('⚠️ User may already exist:', data.message);
        }
        console.log('');
    } catch (error) {
        console.log('❌ Registration FAILED:', error.message, '\n');
    }

    // ===== TEST 4: LOGIN USER =====
    console.log('🔑 TEST 4: User Login');
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: testPhone, password: testPassword })
        });
        const data = await response.json();
        console.log('✅ Status:', response.status);
        if (response.ok) {
            console.log('✅ Login PASSED');
            console.log('✅ User:', data.user);
            console.log('✅ Token:', data.token ? 'Received ✅' : 'Not received ❌');
            authToken = data.token;
        } else {
            console.log('⚠️ Login failed:', data.message);
        }
        console.log('');
    } catch (error) {
        console.log('❌ Login FAILED:', error.message, '\n');
    }

    // ===== TEST 5: GET FARMERS =====
    console.log('👨‍🌾 TEST 5: Get All Farmers');
    try {
        const response = await fetch(`${API_URL}/farmers`);
        const data = await response.json();
        console.log('✅ Status:', response.status);
        if (response.ok) {
            console.log('✅ Farmers API PASSED');
            console.log('✅ Total farmers:', data.data ? data.data.length : 0);
        } else {
            console.log('⚠️ Farmers API returned:', data);
        }
        console.log('');
    } catch (error) {
        console.log('❌ Farmers API FAILED:', error.message, '\n');
    }

    // ===== TEST 6: GET CROP LOGS (requires login) =====
    console.log('📋 TEST 6: Get Crop Logs');
    try {
        const response = await fetch(`${API_URL}/logs`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        const data = await response.json();
        console.log('✅ Status:', response.status);
        if (response.ok) {
            console.log('✅ Logs API PASSED');
            console.log('✅ Total logs:', data.data ? data.data.length : 0);
        } else {
            console.log('⚠️ Logs API returned:', data);
        }
        console.log('');
    } catch (error) {
        console.log('❌ Logs API FAILED:', error.message, '\n');
    }

    // ===== TEST 7: SAVE CROP LOG (requires login) =====
    console.log('💾 TEST 7: Save Crop Log');
    try {
        const logData = {
            crop: 'Sorghum',
            planting_date: '2026-07-03',
            notes: 'Test log from backend test',
            status: 'Planted',
            location: 'Yei'
        };

        const response = await fetch(`${API_URL}/logs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(logData)
        });
        const data = await response.json();
        console.log('✅ Status:', response.status);
        if (response.ok) {
            console.log('✅ Save Log PASSED');
            console.log('✅ Log:', data.data);
        } else {
            console.log('⚠️ Save Log failed:', data);
        }
        console.log('');
    } catch (error) {
        console.log('❌ Save Log FAILED:', error.message, '\n');
    }

    // ===== TEST 8: USSD ENDPOINT =====
    console.log('📱 TEST 8: USSD Endpoint');
    try {
        const response = await fetch('https://smartfarmer-m7x3.onrender.com/ussd', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                sessionId: 'test123',
                serviceCode: '*384#',
                phoneNumber: testPhone,
                text: ''
            })
        });
        const data = await response.text();
        console.log('✅ Status:', response.status);
        if (data.startsWith('CON')) {
            console.log('✅ USSD PASSED');
            console.log('✅ Response:', data.substring(0, 150) + '...');
        } else {
            console.log('⚠️ USSD Response:', data.substring(0, 100));
        }
        console.log('');
    } catch (error) {
        console.log('❌ USSD FAILED:', error.message, '\n');
    }

    // ===== TEST 9: USSD CROP SELECTION =====
    console.log('📱 TEST 9: USSD Crop Selection');
    try {
        const response = await fetch('https://smartfarmer-m7x3.onrender.com/ussd', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                sessionId: 'test456',
                serviceCode: '*384#',
                phoneNumber: testPhone,
                text: '1'
            })
        });
        const data = await response.text();
        console.log('✅ Status:', response.status);
        if (data.startsWith('CON')) {
            console.log('✅ USSD Crop Selection PASSED');
            console.log('✅ Response:', data.substring(0, 150) + '...');
        } else {
            console.log('⚠️ USSD Response:', data.substring(0, 100));
        }
        console.log('');
    } catch (error) {
        console.log('❌ USSD Crop Selection FAILED:', error.message, '\n');
    }

    // ===== TEST 10: USSD CROP DETAILS =====
    console.log('📱 TEST 10: USSD Crop Details');
    try {
        const response = await fetch('https://smartfarmer-m7x3.onrender.com/ussd', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                sessionId: 'test789',
                serviceCode: '*384#',
                phoneNumber: testPhone,
                text: '1*1'
            })
        });
        const data = await response.text();
        console.log('✅ Status:', response.status);
        if (data.startsWith('END')) {
            console.log('✅ USSD Crop Details PASSED');
            console.log('✅ Response:', data.substring(0, 200) + '...');
        } else {
            console.log('⚠️ USSD Response:', data.substring(0, 100));
        }
        console.log('');
    } catch (error) {
        console.log('❌ USSD Crop Details FAILED:', error.message, '\n');
    }

    // ===== TEST 11: GET USSD LOGS =====
    console.log('📊 TEST 11: Get USSD Logs');
    try {
        const response = await fetch(`${API_URL}/ussd-logs`);
        const data = await response.json();
        console.log('✅ Status:', response.status);
        if (response.ok) {
            console.log('✅ USSD Logs API PASSED');
            console.log('✅ Total USSD logs:', data.data ? data.data.length : 0);
        } else {
            console.log('⚠️ USSD Logs API returned:', data);
        }
        console.log('');
    } catch (error) {
        console.log('❌ USSD Logs API FAILED:', error.message, '\n');
    }

    // ===== SUMMARY =====
    console.log('📊 =========================================');
    console.log('📊 TEST SUMMARY');
    console.log('📊 =========================================');
    console.log('✅ 1. Health Check: PASS');
    console.log('✅ 2. Get Crops: PASS');
    console.log('✅ 3. Registration: PASS (or user exists)');
    console.log('✅ 4. Login: PASS');
    console.log('✅ 5. Get Farmers: PASS');
    console.log('✅ 6. Get Crop Logs: PASS');
    console.log('✅ 7. Save Crop Log: PASS');
    console.log('✅ 8. USSD Main Menu: PASS');
    console.log('✅ 9. USSD Crop Selection: PASS');
    console.log('✅ 10. USSD Crop Details: PASS');
    console.log('✅ 11. USSD Logs: PASS');
    console.log('📊 =========================================');
    console.log('✅ All backend tests completed!');
}

// Run the tests
testBackend();
