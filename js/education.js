(function() {
    'use strict';

    // ===== VOICE STATE =====
    const voiceState = {
        currentModule: null,
        utterance: null,
        isPaused: false,
        isSpeaking: false,
        currentText: ''
    };

    // ===== MODULE TEXT DATA (FALLBACK) =====
    const moduleTextData = {
        module1: {
            title: 'Module 1: Planting Techniques',
            tips: [
                'Plant at the beginning of the rainy season (May-June)',
                'Use clean, disease-free seeds',
                'Space crops properly to avoid overcrowding',
                'Plant seeds at the right depth (2-5cm depending on crop)',
                'Weed within the first 3 weeks after planting'
            ]
        },
        module2: {
            title: 'Module 2: Pest Management',
            tips: [
                'Armyworms: Check fields daily. Remove by hand.',
                'Stem borers: Use ash or neem powder around plant stems.',
                'Aphids: Spray with soapy water.',
                'Birds: Use scarecrows or nets during harvest time.',
                'Always check your fields early morning or evening.'
            ]
        },
        module3: {
            title: 'Module 3: Post-Harvest Handling',
            tips: [
                'Harvest at the right time (when grains are hard and dry)',
                'Dry crops completely before storing',
                'Store in clean, dry, rodent-proof containers',
                'Use ash or crushed neem leaves to keep insects away',
                'Sell surplus when market prices are good'
            ]
        },
        module4: {
            title: 'Module 4: Soil Management',
            tips: [
                'Clear weeds before planting.',
                'Add compost or animal manure to improve fertility.',
                'Avoid over-cultivating the land.',
                'Rotate crops every season to reduce soil exhaustion.',
                'Use mulch to conserve moisture and reduce erosion.'
            ]
        },
        module5: {
            title: 'Module 5: Climate-Smart Farming',
            tips: [
                'Plant early when the rainy season begins.',
                'Choose drought-resistant crop varieties.',
                'Harvest and store rainwater when possible.',
                'Use mulching to reduce water loss.',
                'Follow local weather forecasts before planting.'
            ]
        },
        module6: {
            title: 'Module 6: Water & Irrigation',
            tips: [
                'Collect and store rainwater during the wet season.',
                'Water crops early in the morning to reduce evaporation.',
                'Use drip or bucket irrigation to save water.',
                'Avoid waterlogging, ensure fields drain properly.',
                'Cover soil with mulch to retain moisture longer.'
            ]
        },
        module7: {
            title: 'Module 7: Market & Selling',
            tips: [
                'Track local market prices before selling your harvest.',
                'Store crops to wait for better market prices when possible.',
                'Sell in groups with other farmers to get better deals.',
                'Grade and sort your produce, higher quality earns more.',
                'Keep simple records of sales and expenses every season.'
            ]
        },
        module8: {
            title: 'Module 8: Fertilizer Use',
            tips: [
                'Use compost or animal manure as a natural fertilizer first.',
                'Apply fertilizer at the right growth stage, not too early.',
                'Do not over-fertilize, it can burn roots and waste money.',
                'Mix fertilizer into the soil, not on top of leaves.',
                'Water the soil after applying fertilizer to help it absorb.'
            ]
        },
        module9: {
            title: 'Module 9: Crop Disease Control',
            tips: [
                'Inspect leaves and stems weekly for spots, wilting, or rot.',
                'Remove and burn diseased plants immediately to stop spread.',
                'Avoid working in wet fields, disease spreads faster then.',
                'Use disease-resistant seed varieties when available.',
                'Rotate crops each season to break disease cycles in the soil.'
            ]
        },
        module10: {
            title: 'Module 10: Farm Tools & Equipment',
            tips: [
                'Clean tools after every use to prevent rust and disease spread.',
                'Sharpen hoes and machetes regularly for easier work.',
                'Store tools in a dry, shaded place to extend their life.',
                'Use the right tool for the right job, don\'t force tools.',
                'Share or borrow tools with neighbors to reduce costs.'
            ]
        }
    };

    // ===== GET MODULE TEXT =====
    function getModuleText(moduleId) {
        // Get current language
        const lang = localStorage.getItem('smartfarmer_lang') 
                  || localStorage.getItem('sf_lang') 
                  || localStorage.getItem('language') 
                  || 'en';
        
        let currentLang = lang;
        if (currentLang === 'ba') currentLang = 'bari';
        if (currentLang === 'ar') currentLang = 'juba';
        
        // Get translations for current language
        const t = translations[currentLang] || translations.en || {};
        
        // Check if there's a pre-made voice message
        const voiceKey = moduleId + 'Voice';
        if (t[voiceKey]) {
            console.log('✅ Found voice message for:', moduleId);
            return t[voiceKey];
        }
        
        // If no voice message, build from individual tips
        console.log('🔨 Building voice message from tips for:', moduleId);
        
        const moduleNum = moduleId.replace('module', '');
        const titleKey = 'module' + moduleNum + 'Title';
        const title = t[titleKey] || moduleTextData[moduleId]?.title || 'Module ' + moduleNum;
        
        let text = title + '. ';
        
        // Add each tip
        for (let i = 1; i <= 5; i++) {
            const tipKey = 'module' + moduleNum + 'Li' + i;
            const tip = t[tipKey] || moduleTextData[moduleId]?.tips[i-1];
            if (tip) {
                text += 'Tip ' + i + ': ' + tip + '. ';
            }
        }
        
        // If no tips found, use fallback
        if (text === title + '. ') {
            const fallbackData = {
                module1: 'Module 1: Planting Techniques. Plant at the beginning of the rainy season. Use clean seeds. Space crops properly. Plant at right depth. Weed within 3 weeks.',
                module2: 'Module 2: Pest Management. Check fields daily. Remove armyworms by hand. Use ash for stem borers. Spray soapy water for aphids. Use scarecrows for birds.',
                module3: 'Module 3: Post-Harvest Handling. Harvest at right time. Dry crops completely. Store in clean containers. Use ash to keep insects away. Sell surplus when prices are good.',
                module4: 'Module 4: Soil Management. Clear weeds. Add compost. Avoid over-cultivating. Rotate crops. Use mulch.',
                module5: 'Module 5: Climate-Smart Farming. Plant early. Choose drought-resistant crops. Store rainwater. Use mulching. Follow weather forecasts.',
                module6: 'Module 6: Water and Irrigation. Collect rainwater. Water early morning. Use drip irrigation. Avoid waterlogging. Cover soil with mulch.',
                module7: 'Module 7: Market and Selling. Track market prices. Store for better prices. Sell in groups. Grade your produce. Keep records.',
                module8: 'Module 8: Fertilizer Use. Use compost first. Apply at right stage. Don\'t over-fertilize. Mix into soil. Water after applying.',
                module9: 'Module 9: Crop Disease Control. Inspect weekly. Remove diseased plants. Avoid wet fields. Use resistant seeds. Rotate crops.',
                module10: 'Module 10: Farm Tools. Clean tools. Sharpen regularly. Store in dry place. Use right tool. Share with neighbors.'
            };
            text = fallbackData[moduleId] || 'Module content coming soon.';
        }
        
        return text;
    }

    function getButtonLabel(state) {
        const lang = normalizeLanguage(localStorage.getItem('smartfarmer_lang')
            || localStorage.getItem('sf_lang')
            || localStorage.getItem('language')
            || 'en');
        const t = translations[lang] || translations.en || {};

        switch(state) {
            case 'pause':
                return t.voicePauseLabel || '⏸ Pause';
            case 'resume':
                return lang === 'juba' ? '▶️ استئناف' : (t.voicePauseLabel || '▶️ Resume');
            case 'listen':
            default:
                return t.voiceListenLabel || '🔊 Listen';
        }
    }

    // ===== UPDATE BUTTON STATE =====
    function updateButtonState(moduleId, state) {
        const button = document.querySelector(`.voice-btn[data-module="${moduleId}"]`);
        if (!button) return;
        
        switch(state) {
            case 'listen':
                button.textContent = getButtonLabel('listen');
                button.className = 'voice-btn idle';
                break;
            case 'pause':
                button.textContent = getButtonLabel('pause');
                button.className = 'voice-btn playing';
                break;
            case 'resume':
                button.textContent = getButtonLabel('resume');
                button.className = 'voice-btn paused';
                break;
        }
    }

    function normalizeLanguage(lang) {
        let normalized = lang || 'en';
        if (normalized === 'ba') normalized = 'bari';
        if (normalized === 'ar') normalized = 'juba';
        if (!['en', 'juba', 'bari'].includes(normalized)) normalized = 'en';
        return normalized;
    }

    function applyLanguage(lang) {
        const normalizedLang = normalizeLanguage(lang);
        localStorage.setItem('smartfarmer_lang', normalizedLang);
        localStorage.setItem('sf_lang', normalizedLang);
        localStorage.setItem('language', normalizedLang);

        const selector = document.getElementById('languageSwitcher');
        if (selector) {
            selector.value = normalizedLang;
        }

        document.querySelectorAll('.lang-btn').forEach(btn => {
            const isActive = btn.getAttribute('data-lang') === normalizedLang;
            btn.classList.toggle('active', isActive);
        });

        translatePage();
        initVoiceButtons();
    }

    // ===== TOGGLE MODULE AUDIO =====
    function toggleModuleAudio(moduleId) {
        console.log('🔊 toggleModuleAudio called for:', moduleId);
        
        // If same module is currently speaking, pause it
        if (voiceState.currentModule === moduleId && voiceState.isSpeaking) {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.pause();
                voiceState.isPaused = true;
                updateButtonState(moduleId, 'resume');
            }
            return;
        }

        // If paused and same module, resume
        if (voiceState.currentModule === moduleId && voiceState.isPaused) {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.resume();
                voiceState.isPaused = false;
                updateButtonState(moduleId, 'pause');
            }
            return;
        }

        // Start new module
        startModuleAudio(moduleId);
    }

    // ===== START MODULE AUDIO =====
    function startModuleAudio(moduleId) {
        // Cancel any ongoing speech
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }

        // Get the text to speak
        const text = getModuleText(moduleId);
        console.log('📝 Speaking:', text.substring(0, 100) + '...');

        voiceState.currentModule = moduleId;
        voiceState.currentText = text;
        voiceState.isPaused = false;

        if (!('speechSynthesis' in window)) {
            alert('Your browser does not support voice output.');
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.75;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        const currentLang = normalizeLanguage(localStorage.getItem('smartfarmer_lang')
            || localStorage.getItem('sf_lang')
            || localStorage.getItem('language')
            || 'en');

        let voices = window.speechSynthesis.getVoices();
        let selectedVoice = null;

        if (currentLang === 'juba') {
            selectedVoice = voices.find(v => v.lang === 'ar-SA')
                || voices.find(v => v.lang === 'ar-EG')
                || voices.find(v => v.lang.startsWith('ar'))
                || null;

            if (selectedVoice) {
                utterance.voice = selectedVoice;
                utterance.lang = selectedVoice.lang;
            } else {
                utterance.lang = 'ar-SA';
            }
        } else {
            const preferredVoices = ['en-KE', 'en-UG', 'en-TZ', 'en-ZA', 'en-NG'];
            for (let langCode of preferredVoices) {
                selectedVoice = voices.find(v => v.lang === langCode);
                if (selectedVoice) break;
            }

            if (!selectedVoice) {
                selectedVoice = voices.find(v => v.lang === 'en-GB')
                    || voices.find(v => v.lang === 'en-US')
                    || voices[0];
            }

            if (selectedVoice) {
                utterance.voice = selectedVoice;
                utterance.lang = selectedVoice.lang;
            } else {
                utterance.lang = 'en-US';
            }
        }

        utterance.onstart = function() {
            voiceState.isSpeaking = true;
            voiceState.isPaused = false;
            updateButtonState(moduleId, 'pause');
        };

        utterance.onend = function() {
            voiceState.isSpeaking = false;
            voiceState.isPaused = false;
            voiceState.currentModule = null;
            updateButtonState(moduleId, 'listen');
        };

        utterance.onerror = function(event) {
            console.error('Speech error:', event);
            voiceState.isSpeaking = false;
            voiceState.isPaused = false;
            voiceState.currentModule = null;
            updateButtonState(moduleId, 'listen');
        };

        voiceState.utterance = utterance;
        window.speechSynthesis.speak(utterance);
    }

    // ===== TOGGLE MENU =====
    function toggleMenu() {
        const nav = document.querySelector('.nav-links');
        if (nav) nav.classList.toggle('active');
    }

    // ===== FILTER PILLS =====
    function initFilterPills() {
        document.querySelectorAll('.filter-pill').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // ===== LANGUAGE SWITCHER =====
    function initLanguageSwitcher() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                applyLanguage(this.getAttribute('data-lang'));
            });
        });
    }

    // ===== LANGUAGE SELECTOR =====
    function initLanguageSelector() {
        const selector = document.getElementById('languageSwitcher');
        if (!selector) return;

        const savedLang = normalizeLanguage(localStorage.getItem('smartfarmer_lang')
            || localStorage.getItem('sf_lang')
            || localStorage.getItem('language')
            || 'en');

        localStorage.setItem('smartfarmer_lang', savedLang);
        localStorage.setItem('sf_lang', savedLang);
        localStorage.setItem('language', savedLang);
        
        selector.value = savedLang;

        selector.addEventListener('change', function() {
            applyLanguage(this.value);
        });
    }

    // ===== TRANSLATION =====
    function translatePage() {
        const lang = normalizeLanguage(localStorage.getItem('smartfarmer_lang')
            || localStorage.getItem('sf_lang')
            || localStorage.getItem('language')
            || 'en');

        console.log('🌐 Translating to:', lang);
        
        if (typeof translations === 'undefined') {
            console.warn('Translations not loaded');
            return;
        }

        let translatedCount = 0;
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            let translation = null;
            
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
        
        console.log('✅ Translated ' + translatedCount + ' elements to ' + lang);
    }

    // ===== INIT VOICE BUTTONS =====
    function initVoiceButtons() {
        document.querySelectorAll('.voice-btn').forEach(btn => {
            const moduleId = btn.getAttribute('data-module');
            if (moduleId) {
                btn.textContent = getButtonLabel('listen');
                btn.className = 'voice-btn idle';
            }
        });
    }

    // ===== INIT =====
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initFilterPills();
                initLanguageSwitcher();
                initLanguageSelector();
                translatePage();
                initVoiceButtons();
            });
        } else {
            initFilterPills();
            initLanguageSwitcher();
            initLanguageSelector();
            translatePage();
            initVoiceButtons();
        }

        // Make functions globally accessible
        window.toggleMenu = toggleMenu;
        window.toggleModuleAudio = toggleModuleAudio;
        window.translatePage = translatePage;
        window.initVoiceButtons = initVoiceButtons;
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
window.toggleModuleAudio = toggleModuleAudio;
window.translatePage = translatePage;
window.initVoiceButtons = initVoiceButtons;
