
const API_BASE_URL = 'https://smartfarmer-m7x3.onrender.com';

function getAuthToken() {
    return localStorage.getItem('token');
}

function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function isLoggedIn() {
    return !!getAuthToken();
}

async function apiRegisterUser(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            return { success: true, user: data.user };
        }
        return { success: false, error: data.message || 'Registration failed' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function apiLoginUser(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            return { success: true, user: data.user };
        }
        return { success: false, error: data.message || 'Login failed' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

function apiLogoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

async function apiGetCropLogs() {
    const token = getAuthToken();
    if (!token) {
        return { success: false, error: 'Please login first' };
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/crop-logs`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (response.ok) {
            return { success: true, logs: data.logs || [] };
        }
        return { success: false, error: data.message || 'Failed to fetch logs' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function apiSaveCropLog(cropData) {
    const token = getAuthToken();
    if (!token) {
        return { success: false, error: 'Please login first' };
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/crop-logs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(cropData)
        });
        const data = await response.json();
        if (response.ok) {
            return { success: true, log: data.log };
        }
        return { success: false, error: data.message || 'Failed to save log' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function apiDeleteCropLog(logId) {
    const token = getAuthToken();
    if (!token) {
        return { success: false, error: 'Please login first' };
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/crop-logs/${logId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (response.ok) {
            return { success: true };
        }
        return { success: false, error: data.message || 'Failed to delete log' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function apiSendContactMessage(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.ok) {
            return { success: true };
        }
        return { success: false, error: data.message || 'Failed to send message' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}



function playAudio(topic) {
    const stored = localStorage.getItem('sf_lang') || localStorage.getItem('language') || 'en';
    let lang = stored;
    if (lang === 'ba') lang = 'bari';
    if (lang === 'ar') lang = 'juba';

    const voiceKey = topic + 'Voice';
    let message = '';
    if (translations[lang] && translations[lang][voiceKey]) {
        message = translations[lang][voiceKey];
    } else if (translations['en'] && translations['en'][voiceKey]) {
        message = translations['en'][voiceKey];
    }

    const defaultMessages = {
        sorghum: 'Sorghum. Plant in May or June. Space 75 centimeters by 25 centimeters. Watch for armyworms after rain.',
        maize: 'Maize. Plant in May or June. Space 75 centimeters by 50 centimeters. Watch for stalk borer.',
        millet: 'Millet. Plant in May or June. Space 60 centimeters by 20 centimeters. Watch for birds and stem borers.',
        groundnuts: 'Groundnuts. Plant in May or June. Space 50 centimeters by 15 centimeters. Watch for leaf spot and aphids.',
        cassava: 'Cassava. Plant in March or April. Space 100 centimeters by 100 centimeters. Watch for cassava mosaic disease. Harvest after 8 to 12 months.',
        planting: 'Planting tips. Plant at the beginning of the rainy season. Use clean seeds. Space crops properly. Weed within the first 3 weeks.',
        pest: 'Pest control. Check fields daily. Remove armyworms by hand. Use ash around stems for stem borers. Spray soapy water for aphids. Use scarecrows for birds.',
        postharvest: 'Post-harvest handling. Harvest when grains are hard and dry. Dry crops completely before storing. Store in clean, dry containers. Use ash to keep insects away.',
        soil: 'Soil management. Clear weeds before planting. Add compost or animal manure to improve soil fertility. Rotate crops regularly and use mulch to conserve moisture and reduce erosion.',
        climate: 'Climate-smart farming. Plant early when the rainy season begins. Choose drought-resistant crops. Harvest rainwater when possible. Use mulching to reduce water loss and follow weather forecasts before planting.'
    };

    if (!message) {
        message = defaultMessages[topic] || 'Information available in English. Voice in Bari and Juba Arabic coming soon.';
    }

    console.log('playAudio()', { topic, voiceKey, lang, message });

    if ((lang === 'juba' || lang === 'bari') && topic) {
        const audioPath = `/audio/${lang}/${topic}.mp3`;
        const audio = new Audio(audioPath);
        
        audio.addEventListener('error', () => {
            console.log(`Audio file not found: ${audioPath}. Falling back to speechSynthesis with ${lang} text.`);
            speakWithSynthesis(message, lang);
        });

        audio.addEventListener('ended', () => {
            console.log(`Finished playing: ${audioPath}`);
        });

        try {
            audio.play().catch(err => {
                console.log(`Could not play audio: ${err}. Falling back to speechSynthesis with ${lang} text.`);
                speakWithSynthesis(message, lang);
            });
            return;
        } catch (err) {
            console.log(`Error loading audio: ${err}. Falling back to speechSynthesis with ${lang} text.`);
            speakWithSynthesis(message, lang);
            return;
        }
    }

    speakWithSynthesis(message, lang);
}

function toggleModuleAudio(topic) {
    playAudio(topic);
}

function speakWithSynthesis(message, lang) {
    if ('speechSynthesis' in window) {
        const speak = (msg, prefLang) => {
            let voices = speechSynthesis.getVoices();

            const mapPref = (p) => {
                if (!p) return '';
                if (p === 'juba') return 'ar';
                if (p === 'bari') return 'en';
                return p;
            };

            const pickVoice = (voicesList, prefer) => {
                const savedVoiceName = localStorage.getItem('sf_voice');
                if (savedVoiceName) {
                    const sv = voicesList.find(v => v.name === savedVoiceName);
                    if (sv) return sv;
                }
                if (!voicesList || voicesList.length === 0) return null;

                const prefCode = mapPref(prefer);
                if (prefCode) {
                    const v = voicesList.find(v => v.lang && v.lang.toLowerCase().startsWith(prefCode.toLowerCase()));
                    if (v) return v;
                }
                const nameHint = (prefCode === 'ar') ? ['arabic', 'عرب'] : (prefCode === 'en' ? ['english', 'en'] : []);
                for (const hint of nameHint) {
                    const v = voicesList.find(voice => voice.name && voice.name.toLowerCase().includes(hint));
                    if (v) return v;
                }
                const anyAr = voicesList.find(v => v.lang && v.lang.toLowerCase().includes('ar'));
                if (prefCode === 'ar' && anyAr) return anyAr;
                return voicesList[0];
            };

            const voice = pickVoice(voices, prefLang);
            console.log('speechSynthesis voices:', voices.length, 'picked:', voice ? voice.name + ' (' + voice.lang + ')' : null);
            const utterance = new SpeechSynthesisUtterance(msg);
            if (voice) {
                utterance.voice = voice;
                utterance.lang = voice.lang || utterance.lang;
            } else {
                utterance.lang = (prefLang === 'juba') ? 'ar-SA' : ((prefLang === 'bari') ? 'en-US' : prefLang);
            }
            utterance.rate = 0.9;
            speechSynthesis.cancel();
            speechSynthesis.speak(utterance);
        };

        if (speechSynthesis.getVoices().length === 0) {
            speechSynthesis.onvoiceschanged = () => speak(message, lang);
        } else {
            speak(message, lang);
        }
    } else {
        alert('Your browser does not support voice output. ' + message);
    }
}



function translatePage(language) {
    document.querySelectorAll("[data-translate], [data-translate-html]").forEach(element => {
        const key = element.getAttribute("data-translate") || element.getAttribute("data-translate-html");
        if (!key) return;

        const value = (translations[language] && translations[language][key])
            || translations[key]
            || (translations.en && translations.en[key]);

        if (value !== undefined && value !== null) {
            if (element.hasAttribute('data-translate-html')) {
                element.innerHTML = value;
            } else {
                element.textContent = value;
            }
        }
    });
}



function updateUserNav() {
    const user = getCurrentUser();
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    const existingLogin = document.querySelector('.nav-login-link');
    const existingRegister = document.querySelector('.nav-register-link');
    const existingUser = document.querySelector('.nav-user-link');
    const existingLogout = document.querySelector('.nav-logout-link');
    
    if (existingLogin) existingLogin.remove();
    if (existingRegister) existingRegister.remove();
    if (existingUser) existingUser.remove();
    if (existingLogout) existingLogout.remove();

    if (user) {
        const userLi = document.createElement('li');
        userLi.className = 'nav-user-link';
        userLi.innerHTML = `<a href="#">👤 ${user.name || 'User'}</a>`;
        
        const logoutLi = document.createElement('li');
        logoutLi.className = 'nav-logout-link';
        logoutLi.innerHTML = `<a href="#" onclick="apiLogoutUser(); return false;">Logout</a>`;
        
        navLinks.appendChild(userLi);
        navLinks.appendChild(logoutLi);
    } else {
        const loginLi = document.createElement('li');
        loginLi.className = 'nav-login-link';
        loginLi.innerHTML = `<a href="farmer-login.html">Login</a>`;
        
        const registerLi = document.createElement('li');
        registerLi.className = 'nav-register-link';
        registerLi.innerHTML = `<a href="farmer-register.html">Register</a>`;
        
        navLinks.appendChild(loginLi);
        navLinks.appendChild(registerLi);
    }
}



async function saveCropLog() {
    let crop = document.getElementById('cropSelect').value;
    let date = document.getElementById('plantDate').value;
    let notes = document.getElementById('notes').value;
    
    if (!date) {
        alert('Please select a planting date');
        return;
    }
    
    if (isLoggedIn()) {
        const result = await apiSaveCropLog({
            crop: crop,
            plantingDate: date,
            notes: notes || ''
        });
        
        if (result.success) {
            alert('Planting record saved to cloud!');
            await displayCropLogs();
            document.getElementById('plantDate').value = '';
            document.getElementById('notes').value = '';
            return;
        } else {
            alert('Error saving to cloud: ' + result.error + '. Saving locally instead.');
        }
    }
    
    let logs = localStorage.getItem('cropLogs');
    if (logs) {
        logs = JSON.parse(logs);
    } else {
        logs = [];
    }
    
    logs.push({
        crop: crop,
        date: date,
        notes: notes || '',
        timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('cropLogs', JSON.stringify(logs));
    displayCropLogs();
    
    document.getElementById('plantDate').value = '';
    document.getElementById('notes').value = '';
    
    alert('Planting record saved locally!');
}

async function displayCropLogs() {
    let logList = document.getElementById('logList');
    if (!logList) return;
    
    let logs = [];
    let source = 'local';
    
    if (isLoggedIn()) {
        const result = await apiGetCropLogs();
        if (result.success && result.logs.length > 0) {
            logs = result.logs.map(log => ({
                crop: log.crop,
                date: log.plantingDate,
                notes: log.notes || '',
                timestamp: log.createdAt || new Date().toISOString(),
                id: log.id
            }));
            source = 'cloud';
        }
    }
    
    if (logs.length === 0) {
        const localLogs = localStorage.getItem('cropLogs');
        if (localLogs) {
            logs = JSON.parse(localLogs);
            source = 'local';
        }
    }
    
    if (logs.length > 0) {
        let html = '';
        for (let i = logs.length - 1; i >= 0; i--) {
            const log = logs[i];
            html += `<p><strong>${log.crop}</strong> - Planted: ${log.date}`;
            if (log.notes) {
                html += `<br><small>Note: ${log.notes}</small>`;
            }
            if (source === 'cloud' && log.id) {
                html += ` <button onclick="deleteCloudLog('${log.id}')" style="color:red;border:none;background:none;cursor:pointer;">✕</button>`;
            }
            html += '</p>';
        }
        if (source === 'cloud') {
            html += '<p style="font-size:12px;color:green;">✓ Synced to cloud</p>';
        }
        logList.innerHTML = html;
    } else {
        logList.innerHTML = '<p>No records yet. Save your first planting date above.</p>';
    }
}

async function deleteCloudLog(logId) {
    if (confirm('Are you sure you want to delete this log?')) {
        const result = await apiDeleteCropLog(logId);
        if (result.success) {
            await displayCropLogs();
        } else {
            alert('Error deleting: ' + result.error);
        }
    }
}

function clearAllLogs() {
    if (confirm('Are you sure? This will delete all your saved planting records.')) {
        localStorage.removeItem('cropLogs');
        displayCropLogs();
        alert('All records cleared.');
    }
}


if (document.getElementById('contactForm')) {
    document.getElementById('contactForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const statusEl = document.getElementById('formStatus');
        
        statusEl.innerHTML = '<p style="color: blue;">Sending message...</p>';
        
        const result = await apiSendContactMessage({ name, email, message });
        
        if (result.success) {
            statusEl.innerHTML = '<p style="color: green;">Thank you, ' + name + '! Your message has been sent.</p>';
            document.getElementById('contactForm').reset();
        } else {
            statusEl.innerHTML = '<p style="color: red;">Error: ' + result.error + '. Please try again.</p>';
        }
    });
}



function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    const btn = document.querySelector('.menu-icon');
    if (!nav) return;
    nav.classList.toggle('active');
    if (btn) btn.setAttribute('aria-expanded', nav.classList.contains('active'));
}

function pauseModuleAudio() {
    console.log("Pausing audio...");

    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); // stops speech synthesis
    }

    // If you use HTML audio files too
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully');
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}



let deferredPrompt;

function dismissInstallBanner() {
    const banner = document.getElementById('installBanner');
    if (banner) {
        banner.style.display = 'none';
        localStorage.setItem('installBannerDismissed', 'true');
    }
}

function showInstallBanner() {
    const banner = document.getElementById('installBanner');
    if (!banner) return;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isDismissed = localStorage.getItem('installBannerDismissed');

    if (isMobile && !isStandalone && !isDismissed) {
        setTimeout(() => {
            banner.style.display = 'block';
        }, 3000);
    }
}

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    const banner = document.getElementById('installBanner');
    if (banner) {
        banner.style.display = 'block';
    }
});

document.addEventListener('DOMContentLoaded', () => {

    updateUserNav();


    const installBtn = document.getElementById('installBtn');
    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const choiceResult = await deferredPrompt.userChoice;
                if (choiceResult.outcome === 'accepted') {
                    console.log('Smart Farmer installed');
                    const banner = document.getElementById('installBanner');
                    if (banner) banner.style.display = 'none';
                } else {
                    console.log('Install dismissed');
                }
                deferredPrompt = null;
            } else {
                alert('To install Smart Farmer:\n\n1. Tap the Share icon\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" to install');
            }
        });
    }


    const closeBtn = document.querySelector('.close-install');
    if (closeBtn) {
        closeBtn.addEventListener('click', dismissInstallBanner);
    }


    showInstallBanner();

    if (document.getElementById('logList')) {
        displayCropLogs();
    }
});



window.addEventListener('appinstalled', () => {
    console.log('Smart Farmer installed successfully');
    const banner = document.getElementById('installBanner');
    if (banner) banner.style.display = 'none';
});

if (window.matchMedia('(display-mode: standalone)').matches) {
    const banner = document.getElementById('installBanner');
    if (banner) banner.style.display = 'none';
}



document.addEventListener("DOMContentLoaded", () => {
    const savedLanguage =
        localStorage.getItem("sf_lang") ||
        localStorage.getItem("language") ||
        "en";

    let translateKey = savedLanguage;
    if (translateKey === 'ba') translateKey = 'bari';
    if (translateKey === 'ar') translateKey = 'juba';

    translatePage(translateKey);

    const languageSwitcher = document.getElementById("languageSwitcher");

    if (languageSwitcher) {
        languageSwitcher.value = (savedLanguage === 'ba') ? 'bari' : (savedLanguage === 'ar' ? 'juba' : savedLanguage);

        languageSwitcher.addEventListener("change", () => {
            const selectedLanguage = languageSwitcher.value;

            localStorage.setItem("language", selectedLanguage);
            const sfLang = (selectedLanguage === 'bari') ? 'ba' : (selectedLanguage === 'juba' ? 'ar' : selectedLanguage);
            localStorage.setItem('sf_lang', sfLang);

            const pageKey = (selectedLanguage === 'bari') ? 'bari' : (selectedLanguage === 'juba' ? 'juba' : selectedLanguage);
            translatePage(pageKey);
            document.dispatchEvent(new CustomEvent('languagechange', { detail: { language: pageKey } }));
            
            if (selectedLanguage === 'juba' && !localStorage.getItem('sf_voice') && 'speechSynthesis' in window) {
                const voices = speechSynthesis.getVoices();
                const ar = voices.find(v => v.lang && v.lang.startsWith('ar'));
                if (ar) {
                    localStorage.setItem('sf_voice', ar.name);
                    const vp = document.getElementById('voicePicker');
                    if (vp) vp.value = ar.name;
                    console.log('Auto-selected Arabic voice for Juba:', ar.name, ar.lang);
                }
            }
        });
    }

    const voicePicker = document.getElementById('voicePicker');
    if (voicePicker && 'speechSynthesis' in window) {
        const populateVoices = () => {
            const voices = speechSynthesis.getVoices();
            voicePicker.innerHTML = '<option value="">Select voice...</option>';
            voices.forEach(v => {
                const opt = document.createElement('option');
                opt.value = v.name;
                opt.textContent = `${v.name} — ${v.lang}`;
                voicePicker.appendChild(opt);
            });
            const saved = localStorage.getItem('sf_voice');
            if (saved) {
                voicePicker.value = saved;
            } else {
                const savedLang = localStorage.getItem('sf_lang') || localStorage.getItem('language') || 'en';
                let pageKey = savedLang;
                if (pageKey === 'ba') pageKey = 'bari';
                if (pageKey === 'ar') pageKey = 'juba';
                if (pageKey === 'juba') {
                    const ar = voices.find(v => v.lang && v.lang.startsWith('ar'));
                    if (ar) {
                        localStorage.setItem('sf_voice', ar.name);
                        voicePicker.value = ar.name;
                        console.log('Auto-selected Arabic voice on load for Juba:', ar.name, ar.lang);
                    }
                }
            }
        };

        populateVoices();
        speechSynthesis.onvoiceschanged = populateVoices;

        voicePicker.addEventListener('change', () => {
            const sel = voicePicker.value;
            if (sel) localStorage.setItem('sf_voice', sel);
            else localStorage.removeItem('sf_voice');
        });
    }
});



window.dismissInstallBanner = dismissInstallBanner;
window.showInstallBanner = showInstallBanner;
window.toggleMenu = toggleMenu;
window.saveCropLog = saveCropLog;
window.displayCropLogs = displayCropLogs;
window.clearAllLogs = clearAllLogs;
window.deleteCloudLog = deleteCloudLog;
window.playAudio = playAudio;
window.apiLogoutUser = apiLogoutUser;
window.translatePage = translatePage;
window.updateUserNav = updateUserNav;
window.isLoggedIn = isLoggedIn;
window.getCurrentUser = getCurrentUser;
window.apiRegisterUser = apiRegisterUser;
window.apiLoginUser = apiLoginUser;
window.apiGetCropLogs = apiGetCropLogs;
window.apiSaveCropLog = apiSaveCropLog;
window.apiDeleteCropLog = apiDeleteCropLog;
window.apiSendContactMessage = apiSendContactMessage;
window.toggleModuleAudio = toggleModuleAudio;
window.pauseModuleAudio = pauseModuleAudio;
