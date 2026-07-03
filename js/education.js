(function() {
    'use strict';


    function toggleMenu() {
        const nav = document.querySelector('.nav-links');
        if (nav) nav.classList.toggle('active');
    }


    function initFilterPills() {
        document.querySelectorAll('.filter-pill').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }


    function initLanguageSwitcher() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }



    function updateButtonState(moduleId, state) {
    const button = document.querySelector(`.voice-btn[data-module="${moduleId}"]`);
    if (!button) return;
    
    switch(state) {
        case 'listen':
            button.textContent = '🔊 Listen';
            button.className = 'voice-btn idle';
            break;
        case 'pause':
            button.textContent = '⏸️ Pause';
            button.className = 'voice-btn playing';
            break;
        case 'resume':
            button.textContent = '▶️ Resume';
            button.className = 'voice-btn paused';
            break;
    }
}

    // ===== LANGUAGE SWITCHER =====
function initLanguageSelector() {
    const selector = document.getElementById('languageSwitcher');
    if (!selector) return;

    // Try multiple storage keys for language
    let savedLang = localStorage.getItem('smartfarmer_lang') 
                 || localStorage.getItem('sf_lang') 
                 || localStorage.getItem('language') 
                 || 'en';
    
    // Normalize language codes
    if (savedLang === 'ba') savedLang = 'bari';
    if (savedLang === 'ar') savedLang = 'juba';
    
    // Make sure it's a valid language
    if (!['en', 'juba', 'bari'].includes(savedLang)) {
        savedLang = 'en';
    }
    
    // Save to all storage keys to keep them in sync
    localStorage.setItem('smartfarmer_lang', savedLang);
    localStorage.setItem('sf_lang', savedLang);
    localStorage.setItem('language', savedLang);
    
    selector.value = savedLang;

    selector.addEventListener('change', function() {
        const lang = this.value;
        // Save to all storage keys
        localStorage.setItem('smartfarmer_lang', lang);
        localStorage.setItem('sf_lang', lang);
        localStorage.setItem('language', lang);
        translatePage();
        // Re-initialize voice buttons
        initVoiceButtons();
    });
}


  // ===== TRANSLATION =====
function translatePage() {
    // Try multiple storage keys for language
    let lang = localStorage.getItem('smartfarmer_lang') 
            || localStorage.getItem('sf_lang') 
            || localStorage.getItem('language') 
            || 'en';
    
    // Normalize language codes
    if (lang === 'ba') lang = 'bari';
    if (lang === 'ar') lang = 'juba';
    
    // Make sure it's a valid language
    if (!['en', 'juba', 'bari'].includes(lang)) {
        lang = 'en';
    }

    console.log('🌐 Translating to:', lang);
    
    // Check if translations exist
    if (typeof translations === 'undefined') {
        console.warn('Translations not loaded');
        return;
    }

    let translatedCount = 0;
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        let translation = null;
        
        // Try to find translation
        if (translations[lang] && translations[lang][key]) {
            translation = translations[lang][key];
        } else if (translations['en'] && translations['en'][key]) {
            translation = translations['en'][key];
        }
        
        if (translation) {
            el.textContent = translation;
            translatedCount++;
        }
    });
    
    console.log(`✅ Translated ${translatedCount} elements to ${lang}`);
}


    function init() {

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initFilterPills();
                initLanguageSwitcher();
                initLanguageSelector();
                translatePage();
            });
        } else {
            initFilterPills();
            initLanguageSwitcher();
            initLanguageSelector();
            translatePage();
        }

        // Make functions globally accessible (for onclick in HTML)
        window.toggleMenu = toggleMenu;
        window.playAudio = playAudio;
    }

    init();

})();

// Filter modules by category
document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const selected = this.textContent.trim().toLowerCase();
        document.querySelectorAll('.module-card').forEach(card => {
            const category = card.getAttribute('data-category').toLowerCase();
            if (selected === 'all modules' || category === selected) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== EXPOSE FUNCTIONS GLOBALLY =====
window.toggleMenu = toggleMenu;
window.playAudio = playAudio;
window.translatePage = translatePage;
