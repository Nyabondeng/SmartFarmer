// Smart Farmer - Main JavaScript

// Voice output: try pre-recorded audio files for Juba/Bari, fall back to speechSynthesis for English
function playAudio(topic) {
    // Determine user's selected language (prefer sf_lang, then language)
    const stored = localStorage.getItem('sf_lang') || localStorage.getItem('language') || 'en';
    let lang = stored;
    if (lang === 'ba') lang = 'bari';
    if (lang === 'ar') lang = 'juba';

    // Build voice key (e.g., 'sorghumVoice') and look up translation
    const voiceKey = topic + 'Voice';
    // Prefer the chosen language, then fall back to English translations
    let message = '';
    if (translations[lang] && translations[lang][voiceKey]) {
        message = translations[lang][voiceKey];
    } else if (translations['en'] && translations['en'][voiceKey]) {
        message = translations['en'][voiceKey];
    }

    // Fallback to English hardcoded messages if still empty
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

    // For Juba and Bari, try to load pre-recorded audio files first
    if ((lang === 'juba' || lang === 'bari') && topic) {
        const audioPath = `/audio/${lang}/${topic}.mp3`;
        const audio = new Audio(audioPath);
        
        audio.addEventListener('error', () => {
            // If audio file not found, fall back to speechSynthesis with the translated message
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
            return; // Exit early; audio is playing or will handle fallback
        } catch (err) {
            console.log(`Error loading audio: ${err}. Falling back to speechSynthesis with ${lang} text.`);
            speakWithSynthesis(message, lang);
            return;
        }
    }

    // For English or as fallback, use speechSynthesis
    speakWithSynthesis(message, lang);
}

// Helper function: speak text using Web Speech API
function speakWithSynthesis(message, lang) {
    if ('speechSynthesis' in window) {
        const speak = (msg, prefLang) => {
            let voices = speechSynthesis.getVoices();

            // map our page language keys to voice language prefixes
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
                // 1) exact lang match (startsWith)
                if (prefCode) {
                    const v = voicesList.find(v => v.lang && v.lang.toLowerCase().startsWith(prefCode.toLowerCase()));
                    if (v) return v;
                }
                // 2) name contains language hint (e.g., 'Arabic', 'عربي')
                const nameHint = (prefCode === 'ar') ? ['arabic', 'عرب'] : (prefCode === 'en' ? ['english', 'en'] : []);
                for (const hint of nameHint) {
                    const v = voicesList.find(voice => voice.name && voice.name.toLowerCase().includes(hint));
                    if (v) return v;
                }
                // 3) fallback to first voice matching region-neutral same script (e.g., any 'ar' in lang)
                const anyAr = voicesList.find(v => v.lang && v.lang.toLowerCase().includes('ar'));
                if (prefCode === 'ar' && anyAr) return anyAr;
                // 4) fallback to first available voice
                return voicesList[0];
            };

            const voice = pickVoice(voices, prefLang);
            console.log('speechSynthesis voices:', voices.length, 'picked:', voice ? voice.name + ' (' + voice.lang + ')' : null);
            const utterance = new SpeechSynthesisUtterance(msg);
            if (voice) {
                utterance.voice = voice;
                utterance.lang = voice.lang || utterance.lang;
            } else {
                // fallback locales
                utterance.lang = (prefLang === 'juba') ? 'ar-SA' : ((prefLang === 'bari') ? 'en-US' : prefLang);
            }
            utterance.rate = 0.9;
            speechSynthesis.cancel();
            speechSynthesis.speak(utterance);
        };

        // voices may not be loaded immediately — handle that
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

    document.querySelectorAll("[data-translate]").forEach(element => {

        const key = element.getAttribute("data-translate");

        // Prefer language-specific translation, fall back to shared/default key
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        } else if (translations[key]) {
            element.textContent = translations[key];
        }

    });

}

document.addEventListener("DOMContentLoaded", () => {

    // Prefer the `sf_lang` key (used by main.js), fall back to legacy `language`
    const savedLanguage =
        localStorage.getItem("sf_lang") ||
        localStorage.getItem("language") ||
        "en";

    // Normalize code to match keys in translations.js
    let translateKey = savedLanguage;
    if (translateKey === 'ba') translateKey = 'bari';
    // Map stored shorthand 'ar' (used by main.js) to 'juba' used in translations
    if (translateKey === 'ar') translateKey = 'juba';

    translatePage(translateKey);

    const languageSwitcher = document.getElementById("languageSwitcher");

    if (languageSwitcher) {
        // Ensure the select shows a compatible value
        languageSwitcher.value = (savedLanguage === 'ba') ? 'bari' : (savedLanguage === 'ar' ? 'juba' : savedLanguage);

        languageSwitcher.addEventListener("change", () => {
            const selectedLanguage = languageSwitcher.value; // e.g. 'bari', 'juba', 'en'

            // Persist both keys so main.js and this script stay in sync.
            localStorage.setItem("language", selectedLanguage);
            // main.js expects 'ba' and 'ar' shorthands; map back when necessary
            const sfLang = (selectedLanguage === 'bari') ? 'ba' : (selectedLanguage === 'juba' ? 'ar' : selectedLanguage);
            localStorage.setItem('sf_lang', sfLang);

            // Translate using the key matching translations.js
            const pageKey = (selectedLanguage === 'bari') ? 'bari' : (selectedLanguage === 'juba' ? 'juba' : selectedLanguage);
            translatePage(pageKey);
            // if user selected Juba and no voice saved, try to auto-select first ar-* voice
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

    // Voice picker: populate with available speechSynthesis voices and persist selection
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
                // If current page language is Juba and no saved voice, auto-select first Arabic voice
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

        // populate now or when voices load
        populateVoices();
        speechSynthesis.onvoiceschanged = populateVoices;

        voicePicker.addEventListener('change', () => {
            const sel = voicePicker.value;
            if (sel) localStorage.setItem('sf_voice', sel);
            else localStorage.removeItem('sf_voice');
        });
    }

});

// Crop Log Functions (Local Storage)
function saveCropLog() {
    let crop = document.getElementById('cropSelect').value;
    let date = document.getElementById('plantDate').value;
    let notes = document.getElementById('notes').value;
    
    if (!date) {
        alert('Please select a planting date');
        return;
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
    
    alert('Planting record saved!');
}

function displayCropLogs() {
    let logs = localStorage.getItem('cropLogs');
    let logList = document.getElementById('logList');
    
    if (!logList) return;
    
    if (logs && JSON.parse(logs).length > 0) {
        logs = JSON.parse(logs);
        let html = '';
        for (let i = logs.length - 1; i >= 0; i--) {
            html += '<p><strong>' + logs[i].crop + '</strong> - Planted: ' + logs[i].date;
            if (logs[i].notes) {
                html += '<br><small>Note: ' + logs[i].notes + '</small>';
            }
            html += '</p>';
        }
        logList.innerHTML = html;
    } else {
        logList.innerHTML = '<p>No records yet. Save your first planting date above.</p>';
    }
}

function clearAllLogs() {
    if (confirm('Are you sure? This will delete all your saved planting records.')) {
        localStorage.removeItem('cropLogs');
        displayCropLogs();
        alert('All records cleared.');
    }
}

// Contact Form Handler
if (document.getElementById('contactForm')) {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let name = document.getElementById('name').value;
        document.getElementById('formStatus').innerHTML = '<p style="color: green;">Thank you, ' + name + '! Your message has been sent. (Demo)</p>';
        document.getElementById('contactForm').reset();
    });
}

// Load crop logs when crop-log page loads
if (document.getElementById('logList')) {
    displayCropLogs();
}

// Improved mobile menu toggle (centralized)
function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    const btn = document.querySelector('.menu-icon');
    if (!nav) return;
    nav.classList.toggle('active');
    if (btn) btn.setAttribute('aria-expanded', nav.classList.contains('active'));
}

// Service Worker for Offline Capability
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


// ============================================
// SMART FARMER - INSTALL BANNER (PWA)
// ============================================

let deferredPrompt;

// ─── DISMISS BANNER ────────────────────────────────
function dismissInstallBanner() {
    const banner = document.getElementById('installBanner');
    if (banner) {
        banner.style.display = 'none';
        localStorage.setItem('installBannerDismissed', 'true');
    }
}

// ─── SHOW BANNER ────────────────────────────────────
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

// ─── INSTALL PROMPT ─────────────────────────────────
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    const banner = document.getElementById('installBanner');
    if (banner) {
        banner.style.display = 'block';
    }
});

// ─── INSTALL BUTTON CLICK ──────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const installBtn = document.getElementById('installBtn');
    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                // Native install prompt
                deferredPrompt.prompt();
                const choiceResult = await deferredPrompt.userChoice;
                if (choiceResult.outcome === 'accepted') {
                    console.log('✅ Smart Farmer installed');
                    const banner = document.getElementById('installBanner');
                    if (banner) banner.style.display = 'none';
                } else {
                    console.log('❌ Install dismissed');
                }
                deferredPrompt = null;
            } else {
                // FALLBACK: If native prompt is not available, show instructions
                alert('To install Smart Farmer:\n\n1. Tap the Share icon\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" to install');
            }
        });
    }

    // Close button
    const closeBtn = document.querySelector('.close-install');
    if (closeBtn) {
        closeBtn.addEventListener('click', dismissInstallBanner);
    }

    // Show the banner on page load
    showInstallBanner();
});

// ─── APP INSTALLED ──────────────────────────────────
window.addEventListener('appinstalled', () => {
    console.log('✅ Smart Farmer installed successfully');
    const banner = document.getElementById('installBanner');
    if (banner) banner.style.display = 'none';
});

// ─── HIDE BANNER IF ALREADY INSTALLED ──────────────
if (window.matchMedia('(display-mode: standalone)').matches) {
    const banner = document.getElementById('installBanner');
    if (banner) banner.style.display = 'none';
}

// ─── EXPOSE FUNCTIONS GLOBALLY ─────────────────────
window.dismissInstallBanner = dismissInstallBanner;
window.showInstallBanner = showInstallBanner;
