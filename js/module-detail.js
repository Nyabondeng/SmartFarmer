// ============================================
// SMART FARMER - MODULE DETAIL JAVASCRIPT
// ============================================

(function() {
    'use strict';

    function normalizeLanguage(lang) {
        let normalized = lang || 'en';
        if (normalized === 'ba') normalized = 'bari';
        if (normalized === 'ar') normalized = 'juba';
        if (!['en', 'juba', 'bari'].includes(normalized)) normalized = 'en';
        return normalized;
    }

    function getCurrentModuleKey() {
        const path = window.location.pathname || '';
        const match = path.match(/module-([a-z-]+)\.html$/i);
        return match ? match[1].toLowerCase() : 'planting';
    }

    function applyDataTranslations(root, t) {
        root.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (!key) return;

            const value = t[key];
            if (value === undefined || value === null || value === '') return;

            const useHtml = el.hasAttribute('data-translate-html') || /HeroTitle$/i.test(key);
            if (useHtml) {
                el.innerHTML = value;
            } else {
                el.textContent = value;
            }
        });
    }

    function translateModulePage() {
        if (typeof translations === 'undefined') return;

        const lang = normalizeLanguage(localStorage.getItem('smartfarmer_lang')
            || localStorage.getItem('sf_lang')
            || localStorage.getItem('language')
            || 'en');
        const t = translations[lang] || translations.en || {};
        const pageKey = getCurrentModuleKey();

        const navMap = {
            home: t.home || 'Home',
            about: t.about || 'About',
            crops: t.crops || 'Crop Info',
            education: t.education || 'Education',
            cropLog: t.cropLog || 'Crop Log',
            contact: t.contact || 'Contact',
            ussd: t.ussd || 'USSD'
        };

        document.querySelectorAll('.nav-links a').forEach(link => {
            const href = (link.getAttribute('href') || '').toLowerCase();
            if (href.includes('index.html')) link.textContent = navMap.home;
            else if (href.includes('about.html')) link.textContent = navMap.about;
            else if (href.includes('crops.html')) link.textContent = navMap.crops;
            else if (href.includes('education.html')) link.textContent = navMap.education;
            else if (href.includes('crop-log.html')) link.textContent = navMap.cropLog;
            else if (href.includes('contact.html')) link.textContent = navMap.contact;
            else if (href.includes('ussd.html')) link.textContent = navMap.ussd;
        });

        const backLink = document.querySelector('.back-link');
        if (backLink && t.backToEducation) {
            backLink.textContent = t.backToEducation;
        }

        const heroTitle = document.querySelector('.module-hero h1');
        const heroTitleKey = `${pageKey}HeroTitle`;
        if (heroTitle && t[heroTitleKey]) {
            heroTitle.innerHTML = t[heroTitleKey];
        }

        const heroText = document.querySelector('.module-hero > p');
        const heroTextKey = `${pageKey}HeroText`;
        if (heroText && t[heroTextKey]) {
            heroText.textContent = t[heroTextKey];
        }

        const listenBtn = document.querySelector('.pulse-btn');
        if (listenBtn && t.listenToThisModule) {
            listenBtn.textContent = t.listenToThisModule;
        }

        const prevLink = document.querySelector('.module-nav .prev');
        if (prevLink && t.prevModule) {
            prevLink.textContent = t.prevModule;
        }

        const nextLink = document.querySelector('.module-nav .next');
        if (nextLink && t.nextModule) {
            nextLink.textContent = t.nextModule;
        }

        const selector = document.getElementById('languageSwitcher');
        if (selector) {
            selector.value = lang;
        }

        applyDataTranslations(document, t);
    }

    // ─── PROGRESS BAR ────────────────────────────────
    function initProgressBar() {
        const bar = document.querySelector('.progress-bar');
        if (!bar) return;

        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = progress + '%';
        });
    }

    // ─── SCROLL REVEAL ────────────────────────────────
    function initScrollReveal() {
        const sections = document.querySelectorAll('.content-section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -20px 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    // ─── NUMBER COUNTER ───────────────────────────────
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        if (!counters.length) return;

        let counted = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    counted = true;
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
                        let current = 0;
                        const increment = Math.ceil(target / 50);
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                counter.textContent = target;
                                clearInterval(timer);
                            } else {
                                counter.textContent = current;
                            }
                        }, 30);
                    });
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
    }

    // ─── VOICE FUNCTION ───────────────────────────────
    function playModuleAudio(module, lang) {
        if (typeof translations !== 'undefined') {
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
            const text = voiceMap[module] || 'Audio content coming soon.';
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = 0.85;
                utterance.lang = lang === 'juba' ? 'ar-SA' : 'en-US';
                window.speechSynthesis.speak(utterance);
            } else {
                alert(text);
            }
        } else {
            alert('Audio content coming soon.');
        }
    }

    // ─── INIT ──────────────────────────────────────────
    function init() {
        initProgressBar();
        initScrollReveal();
        initCounters();
        translateModulePage();

        // Make functions globally accessible
        window.playModuleAudio = function(module) {
            const selector = document.getElementById('languageSwitcher');
            const lang = selector ? selector.value : 'en';
            playModuleAudio(module, lang);
        };

        // Toggle menu
        window.toggleMenu = function() {
            const nav = document.querySelector('.nav-links');
            if (nav) nav.classList.toggle('active');
        };

        window.translatePage = translateModulePage;
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
