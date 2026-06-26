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


    function playAudio(topic) {


        if (typeof translations !== 'undefined') {
            const langSelect = document.getElementById('languageSwitcher');
            const lang = langSelect ? langSelect.value : 'en';
            const t = translations[lang] || translations.en;


            const voiceMap = {
                planting: t.plantingVoice,
                pest: t.pestVoice,
                postharvest: t.postharvestVoice,
                soil: t.soilVoice,
                climate: t.climateVoice,
                water: t.waterVoice || t.climateVoice,
                market: t.marketVoice || t.climateVoice,
                fertilizer: t.fertilizerVoice || t.climateVoice,
                disease: t.diseaseVoice || t.climateVoice,
                tools: t.toolsVoice || t.climateVoice
            };

            let text = voiceMap[topic];
            if (!text) {
                text = 'Audio content coming soon.';
            }


            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = 0.85;
                if (lang === 'juba' || lang === 'ar') {
                    utterance.lang = 'ar-SA';
                } else {
                    utterance.lang = 'en-US';
                }


                const voices = window.speechSynthesis.getVoices();
                let matchingVoice = null;
                for (let v of voices) {
                    if (lang === 'juba' && v.lang.startsWith('ar')) {
                        matchingVoice = v;
                        break;
                    } else if (lang === 'en' && v.lang.startsWith('en')) {
                        matchingVoice = v;
                        break;
                    }
                }
                if (matchingVoice) {
                    utterance.voice = matchingVoice;
                }

                utterance.onerror = function(e) {
                    console.warn('Speech error:', e);
                };
                window.speechSynthesis.speak(utterance);
            } else {
                alert(text);
            }
        } else {
            alert('Audio content coming soon.');
        }
    }


    function initLanguageSelector() {
        const selector = document.getElementById('languageSwitcher');
        if (!selector) return;

        // Set initial language from localStorage
        const savedLang = localStorage.getItem('smartfarmer_lang');
        if (savedLang) {
            selector.value = savedLang;
        }

        selector.addEventListener('change', function() {
            const lang = this.value;
            localStorage.setItem('smartfarmer_lang', lang);
            translatePage();
        });
    }


    function translatePage() {
        const lang = localStorage.getItem('smartfarmer_lang') || 'en';
        if (typeof translations === 'undefined') return;

        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            } else if (translations.en && translations.en[key]) {
                el.textContent = translations.en[key];
            }
        });
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
