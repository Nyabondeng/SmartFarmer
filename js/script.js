const API_BASE_URL = 'https://smartfarmer-m7x3.onrender.com';

// ============================================================
// LANGUAGE HELPERS (KEEP ONLY ONE)
// ============================================================

function getCurrentTranslateLanguage() {
    const selector = document.getElementById('languageSwitcher');
    const selected = selector ? selector.value : 'en';
    return selected === 'ba' ? 'bari' : (selected === 'ar' ? 'juba' : selected);
}

// ============================================================
// APPLY NAVIGATION TRANSLATIONS (KEEP ONLY ONE)
// ============================================================

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

// ============================================================
// TRANSLATE PAGE (KEEP ONLY ONE)
// ============================================================

function translatePage() {
    const lang = getCurrentTranslateLanguage();
    const t = window.translations ? window.translations[lang] : null;
    
    if (!t) {
        console.warn('Translations not loaded for language:', lang);
        return;
    }

    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
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

// ============================================================
// TOGGLE MENU (KEEP ONLY ONE)
// ============================================================

function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    const btn = document.querySelector('.menu-icon');
    if (!nav) return;
    nav.classList.toggle('active');
    if (btn) btn.setAttribute('aria-expanded', nav.classList.contains('active'));
}

// ============================================================
// DOM CONTENT LOADED (KEEP ONLY ONE)
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // Apply navigation translations
    applyNavigationTranslations();
    
    // Translate the page
    translatePage();
    
    // Language switcher listener
    const languageSwitcher = document.getElementById('languageSwitcher');
    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', function() {
            applyNavigationTranslations();
            translatePage();
            document.dispatchEvent(new Event('languagechange'));
        });
    }

    // Update user nav
    updateUserNav();
    
    // Display crop logs if on crop-log page
    if (document.getElementById('logList')) {
        displayCropLogs();
    }
    
    // Install banner
    showInstallBanner();
    
    // Contact form
    if (document.getElementById('contactForm')) {
        document.getElementById('contactForm').addEventListener('submit', async function(e) {
            // ... contact form code ...
        });
    }
    
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

// ============================================================
// LANGUAGE CHANGE LISTENER (KEEP ONLY ONE)
// ============================================================

document.addEventListener('languagechange', function() {
    applyNavigationTranslations();
    translatePage();
});

// ============================================================
// ALL OTHER FUNCTIONS GO HERE...
// ============================================================

// ... (keep all other functions like getAuthToken, isLoggedIn, apiRegisterUser, etc.)
// ... (keep saveCropLog, displayCropLogs, clearAllLogs, etc.)
// ... (keep playAudio, speakWithSynthesis, etc.)
// ... (keep updateUserNav, etc.)

// ============================================================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE
// ============================================================

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
window.getCurrentTranslateLanguage = getCurrentTranslateLanguage;
window.applyNavigationTranslations = applyNavigationTranslations;
window.dismissInstallBanner = dismissInstallBanner;
window.showInstallBanner = showInstallBanner;
