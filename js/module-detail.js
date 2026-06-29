// ============================================
// SMART FARMER - MODULE DETAIL JAVASCRIPT
// ============================================

(function() {
    'use strict';

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
        // This will use translations.js if available
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
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
