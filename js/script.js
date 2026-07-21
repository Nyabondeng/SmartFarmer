// The saved language is the single source of truth ('en' or 'juba').
// The dropdown is restored from it on every page load, so the choice
// survives navigation and both text and voice read the same value.
function getStoredLanguage() {
    const stored = localStorage.getItem('smartfarmer_lang')
        || localStorage.getItem('sf_lang')
        || localStorage.getItem('language');
    return (stored === 'juba' || stored === 'ar') ? 'juba' : 'en';
}

function setStoredLanguage(lang) {
    localStorage.setItem('smartfarmer_lang', lang);
    localStorage.setItem('sf_lang', lang);
    localStorage.setItem('language', lang);
}

function getCurrentTranslateLanguage() {
    const selector = document.getElementById('languageSwitcher');
    if (selector && selector.value) {
        return (selector.value === 'juba' || selector.value === 'ar') ? 'juba' : 'en';
    }
    return getStoredLanguage();
}



function applyNavigationTranslations() {
    const lang = getCurrentTranslateLanguage();
    const t = window.translations ? window.translations[lang] : null;
    
    if (!t) {
        console.warn('Translations not loaded for language:', lang);
        return;
    }

    const navLinks = document.querySelectorAll('.nav-links a[data-translate]');
    navLinks.forEach(link => {
        const key = link.getAttribute('data-translate');
        if (t[key]) {
            link.textContent = t[key];
        }
    });

    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
        if (el.closest('.nav-links')) return;
        const key = el.getAttribute('data-translate');
        if (t[key]) {
            if (el.hasAttribute('placeholder')) {
                el.placeholder = t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });
}


function translatePage() {
    const lang = getCurrentTranslateLanguage();
    const t = window.translations ? window.translations[lang] : null;

    // Mirror the page for Arabic (right-to-left)
    document.documentElement.setAttribute('dir', lang === 'juba' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang === 'juba' ? 'ar' : 'en');

    if (!t) {
        console.warn('Translations not loaded for language:', lang);
        return;
    }

    // Accept the key from either attribute form:
    //   data-translate="key"  (optionally with a data-translate-html flag)
    //   data-translate-html="key"
    const elements = document.querySelectorAll('[data-translate], [data-translate-html]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate') || el.getAttribute('data-translate-html');
        if (!key) return;
        if (el.closest('.nav-links')) return;
        if (el.closest('.crop-expanded-details')) return;

        if (t[key]) {
            if (el.hasAttribute('placeholder')) {
                el.placeholder = t[key];
            } else if (el.hasAttribute('data-translate-html')) {
                el.innerHTML = t[key];
            } else {
                el.textContent = t[key];
            }
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



function saveCropLog() {
    const crop = document.getElementById('cropSelect')?.value || '';
    const date = document.getElementById('plantDate')?.value || '';
    const notes = document.getElementById('notes')?.value || '';
    
    if (!date) {
        alert('Please select a planting date');
        return;
    }
    
    const logs = getCropLogs();
    const newRecord = {
        id: Date.now(),
        crop: crop,
        plantDate: date,
        expectedHarvest: document.getElementById('expectedHarvest')?.value || '',
        farmLocation: document.getElementById('farmLocation')?.value || '',
        status: document.getElementById('cropStatus')?.value || 'Planted',
        notes: notes || '',
        createdAt: new Date().toISOString()
    };

    logs.unshift(newRecord);
    saveCropLogs(logs);
    displayCropLogs();
    updateCropCount();

    // Clear form
    if (document.getElementById('plantDate')) document.getElementById('plantDate').value = '';
    if (document.getElementById('expectedHarvest')) document.getElementById('expectedHarvest').value = '';
    if (document.getElementById('farmLocation')) document.getElementById('farmLocation').value = '';
    if (document.getElementById('notes')) document.getElementById('notes').value = '';
    if (document.getElementById('cropStatus')) document.getElementById('cropStatus').value = 'Planted';
    
    alert('Record saved successfully!');
}

function displayCropLogs() {
    const logList = document.getElementById('logList');
    if (!logList) return;

    const logs = getCropLogs();
    const t = window.translations ? window.translations[getCurrentTranslateLanguage()] : {};

    if (logs.length === 0) {
        logList.innerHTML = `
            <div class="empty-message">
                <p>${t.noRecords || 'No records yet. Save your first planting date.'}</p>
            </div>
        `;
        return;
    }

    let html = '<div class="log-items">';
    logs.forEach((log) => {
        const statusColor = getStatusColor(log.status);
        const statusText = log.status || 'Planted';
        
        html += `
            <div class="log-item" data-id="${log.id}">
                <div class="log-item-header">
                    <span class="log-crop-name">${log.crop}</span>
                    <span class="log-status" style="background: ${statusColor};">${statusText}</span>
                </div>
                <div class="log-item-details">
                    <div class="log-detail-row">
                        <span class="log-label">${t.plantingDateLabel || 'Planting Date'}:</span>
                        <span class="log-value">${formatDate(log.plantDate)}</span>
                    </div>
                    ${log.expectedHarvest ? `
                        <div class="log-detail-row">
                            <span class="log-label">${t.expectedHarvest || 'Expected Harvest'}:</span>
                            <span class="log-value">${formatDate(log.expectedHarvest)}</span>
                        </div>
                    ` : ''}
                    ${log.farmLocation ? `
                        <div class="log-detail-row">
                            <span class="log-label">${t.farmLocation || 'Farm Location'}:</span>
                            <span class="log-value">${log.farmLocation}</span>
                        </div>
                    ` : ''}
                    ${log.notes ? `
                        <div class="log-detail-row">
                            <span class="log-label">${t.notesLabelShort || 'Notes'}:</span>
                            <span class="log-value">${log.notes}</span>
                        </div>
                    ` : ''}
                </div>
                <div class="log-item-actions">
                    <button class="edit-btn" onclick="editCropLog(${log.id})">${t.edit || 'Edit'}</button>
                    <button class="delete-btn" onclick="deleteCropLog(${log.id})">${t.delete || 'Delete'}</button>
                </div>
            </div>
        `;
    });
    html += '</div>';
    logList.innerHTML = html;
}

function getCropLogs() {
    const logs = localStorage.getItem('cropLogs');
    return logs ? JSON.parse(logs) : [];
}

function saveCropLogs(logs) {
    localStorage.setItem('cropLogs', JSON.stringify(logs));
}

function getStatusColor(status) {
    const colors = {
        'Planted': '#3b82f6',
        'Growing': '#22c55e',
        'Harvested': '#f59e0b',
        'Pending': '#6b7280'
    };
    return colors[status] || '#6b7280';
}

function formatDate(dateString) {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function updateCropCount() {
    const logs = getCropLogs();
    const countEl = document.getElementById('totalCropsCount');
    if (countEl) {
        countEl.textContent = logs.length;
    }
}

function deleteCropLog(id) {
    const t = window.translations ? window.translations[getCurrentTranslateLanguage()] : {};
    if (!confirm(t.confirmDelete || 'Are you sure you want to delete this record?')) {
        return;
    }

    let logs = getCropLogs();
    logs = logs.filter(log => log.id !== id);
    saveCropLogs(logs);
    displayCropLogs();
    updateCropCount();
    alert(t.recordDeleted || 'Record deleted successfully!');
}

function editCropLog(id) {
    const logs = getCropLogs();
    const record = logs.find(log => log.id === id);
    
    if (!record) return;

    document.getElementById('cropSelect').value = record.crop;
    document.getElementById('plantDate').value = record.plantDate;
    if (document.getElementById('expectedHarvest')) {
        document.getElementById('expectedHarvest').value = record.expectedHarvest || '';
    }
    if (document.getElementById('farmLocation')) {
        document.getElementById('farmLocation').value = record.farmLocation || '';
    }
    if (document.getElementById('cropStatus')) {
        document.getElementById('cropStatus').value = record.status || 'Planted';
    }
    document.getElementById('notes').value = record.notes || '';

    const saveBtn = document.querySelector('.save-btn');
    const t = window.translations ? window.translations[getCurrentTranslateLanguage()] : {};
    saveBtn.textContent = t.update || 'Update Record';
    saveBtn.dataset.editId = id;

    document.querySelector('.log-form').scrollIntoView({ behavior: 'smooth' });
}

function clearAllLogs() {
    const t = window.translations ? window.translations[getCurrentTranslateLanguage()] : {};
    if (!confirm(t.confirmDelete || 'Are you sure you want to delete all records?')) {
        return;
    }
    saveCropLogs([]);
    displayCropLogs();
    updateCropCount();
    alert(t.recordDeleted || 'All records cleared successfully!');
}



function updateUserNav() {
    const user = getCurrentUser();
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    // Remove anything this function added on a previous run
    document.querySelectorAll('.nav-user-link, .nav-logout-link, .nav-account-link')
        .forEach(el => el.remove());

    // The Account link hard-coded in the page's nav. Substring match on
    // purpose: Netlify's pretty-URLs rewrites "farmer-login.html" to
    // "/farmer-login" on deploy, which an exact/suffix match would miss.
    const staticAccount = navLinks.querySelector(
        'a[href*="farmer-login"], a[href*="farmer-register"]'
    );
    const staticAccountLi = staticAccount ? staticAccount.closest('li') : null;

    if (user) {
        // Logged in: hide the Account link, show name + logout instead
        if (staticAccountLi) staticAccountLi.style.display = 'none';

        const t = (window.translations || {})[getCurrentTranslateLanguage()] || {};

        const userLi = document.createElement('li');
        userLi.className = 'nav-user-link';
        userLi.innerHTML = `<a href="my-account.html">👤 ${user.name || 'User'}</a>`;

        const logoutLi = document.createElement('li');
        logoutLi.className = 'nav-logout-link';
        logoutLi.innerHTML = `<a href="#" onclick="logoutUser(); return false;">${t.logout || 'Logout'}</a>`;

        navLinks.appendChild(userLi);
        navLinks.appendChild(logoutLi);
    } else if (staticAccountLi) {
        // Logged out: show the page's own Account link, add nothing
        staticAccountLi.style.display = '';
    } else {
        const accountLi = document.createElement('li');
        accountLi.className = 'nav-account-link';
        accountLi.innerHTML = '<a href="farmer-login.html" data-translate="login">Account</a>';
        navLinks.appendChild(accountLi);
    }
}

function getCurrentUser() {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('farmer_name');
    return (token && name) ? { name: name } : null;
}

function isLoggedIn() {
    return !!localStorage.getItem('token');
}

function playAudio(topic) {
    const lang = getCurrentTranslateLanguage();

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
        message = defaultMessages[topic] || 'Information not available.';
    }

    console.log('playAudio()', { topic, voiceKey, lang, message });

    if (lang === 'juba' && topic) {
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

function speakWithSynthesis(message, lang) {
    if ('speechSynthesis' in window) {
        const speak = (msg, prefLang) => {
            let voices = speechSynthesis.getVoices();

            const mapPref = (p) => {
                if (!p) return '';
                if (p === 'juba') return 'ar';
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
                utterance.lang = (prefLang === 'juba') ? 'ar-SA' : 'en-US';
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

function toggleModuleAudio(topic) {
    playAudio(topic);
}

function pauseModuleAudio() {
    console.log("Pausing audio...");
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
    }
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
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

function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('farmer_id');
    localStorage.removeItem('farmer_name');
    localStorage.removeItem('farmer_location');
    window.location.href = 'index.html';
}


document.addEventListener('DOMContentLoaded', function() {
    // Restore the saved language BEFORE translating, so the choice
    // survives navigation between pages
    const languageSwitcher = document.getElementById('languageSwitcher');
    if (languageSwitcher) {
        languageSwitcher.value = getStoredLanguage();
    }

    // Apply navigation translations
    applyNavigationTranslations();

    // Translate the page
    translatePage();

    // Language switcher listener
    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', function() {
            setStoredLanguage(getCurrentTranslateLanguage());
            applyNavigationTranslations();
            translatePage();
            updateUserNav();
            document.dispatchEvent(new Event('languagechange'));
        });
    }

    // Update user nav
    updateUserNav();

    // Install banner
    showInstallBanner();

    // Service Worker
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
});


document.addEventListener('languagechange', function() {
    applyNavigationTranslations();
    translatePage();
});


window.toggleMenu = toggleMenu;
window.saveCropLog = saveCropLog;
window.displayCropLogs = displayCropLogs;
window.clearAllLogs = clearAllLogs;
window.playAudio = playAudio;
window.translatePage = translatePage;
window.updateUserNav = updateUserNav;
window.logoutUser = logoutUser;
window.toggleModuleAudio = toggleModuleAudio;
window.pauseModuleAudio = pauseModuleAudio;
window.getCurrentTranslateLanguage = getCurrentTranslateLanguage;
window.getStoredLanguage = getStoredLanguage;
window.setStoredLanguage = setStoredLanguage;
window.applyNavigationTranslations = applyNavigationTranslations;
window.dismissInstallBanner = dismissInstallBanner;
window.showInstallBanner = showInstallBanner;
window.editCropLog = editCropLog;
window.updateCropCount = updateCropCount;
window.getCropLogs = getCropLogs;
window.saveCropLogs = saveCropLogs;
window.formatDate = formatDate;
window.getStatusColor = getStatusColor;
