/* ============================================
   SMART FARMER - Main Shared JavaScript
   Author: Nyabon Deng Adut
   Used by: All pages
   ============================================ */

/* ══════════════════════════════════════
   LANGUAGE MANAGEMENT
   ══════════════════════════════════════ */

// Default language is English
let currentLang = localStorage.getItem('sf_lang') || 'en';

// All UI translations
const UI_TEXT = {
  en: {
    navHome:       'Home',
    navCrops:      'Crop Info',
    navEducation:  'Education',
    navLog:        'Crop Log',
    navAbout:      'About',
    navContact:    'Contact',
    langBtn:       '🌐 EN',
    langTitle:     'Choose Your Language',
    langCancel:    'Cancel',
    footerText:    '© 2026 Smart Farmer. For smallholder farmers in South Sudan.',
    voiceListen:   '🔊 Listen in English',
    voiceStop:     '⏹ Stop',
    toastSaved:    '✅ Saved successfully',
    toastDeleted:  '🗑 Entry deleted',
    toastError:    '⚠️ Please select crop and date',
  },
  ar: {
    navHome:       'الرئيسية',
    navCrops:      'معلومات المحاصيل',
    navEducation:  'التعليم',
    navLog:        'سجل الزراعة',
    navAbout:      'حول',
    navContact:    'اتصل بنا',
    langBtn:       '🌐 AR',
    langTitle:     'اختر لغتك',
    langCancel:    'إلغاء',
    footerText:    '© 2026 المزارع الذكي. للمزارعين في جنوب السودان.',
    voiceListen:   '🔊 استمع بالعربية',
    voiceStop:     '⏹ إيقاف',
    toastSaved:    '✅ تم الحفظ بنجاح',
    toastDeleted:  '🗑 تم الحذف',
    toastError:    '⚠️ اختر المحصول والتاريخ',
  },
  ba: {
    navHome:       'Andu',
    navCrops:      'Elikia lo Yini',
    navEducation:  'Tolo',
    navLog:        'Defe lo Yini',
    navAbout:      'Pore',
    navContact:    'Yele',
    langBtn:       '🌐 BA',
    langTitle:     'Ligba lo ba',
    langCancel:    'Tobwe',
    footerText:    '© 2026 Smart Farmer. Lo ba loke lo South Sudan.',
    voiceListen:   '🔊 Wiri Bari',
    voiceStop:     '⏹ Seta',
    toastSaved:    '✅ Tabawa muke',
    toastDeleted:  '🗑 Tabawa',
    toastError:    '⚠️ Loko yini na tare',
  }
};

/* ── Set language ── */
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('sf_lang', lang);
  // Set text direction for Arabic
  document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
}

/* ── Get current language ── */
function getLang() {
  return currentLang;
}

/* ── Get translation text ── */
function t(key) {
  return UI_TEXT[currentLang]?.[key] || UI_TEXT['en'][key] || key;
}

/* ══════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════ */

/* Toggle hamburger menu open/close */
function toggleMenu() {
  const menu = document.getElementById('nav-menu');
  if (menu) menu.classList.toggle('open');
}

/* Close menu when clicking outside */
document.addEventListener('click', (e) => {
  const menu = document.getElementById('nav-menu');
  const btn  = document.getElementById('hamburger-btn');
  if (menu && menu.classList.contains('open')) {
    if (!menu.contains(e.target) && e.target !== btn) {
      menu.classList.remove('open');
    }
  }
});

/* Set active nav link based on current page */
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) link.classList.add('active');
    else link.classList.remove('active');
  });
}

/* Apply navbar translations */
function applyNavTranslations() {
  const el = (id) => document.getElementById(id);
  if (el('nav-home'))      el('nav-home').textContent      = t('navHome');
  if (el('nav-crops'))     el('nav-crops').textContent     = t('navCrops');
  if (el('nav-education')) el('nav-education').textContent = t('navEducation');
  if (el('nav-log'))       el('nav-log').textContent       = t('navLog');
  if (el('nav-about'))     el('nav-about').textContent     = t('navAbout');
  if (el('nav-contact'))   el('nav-contact').textContent   = t('navContact');
  if (el('lang-btn-text')) el('lang-btn-text').textContent = t('langBtn');
  if (el('footer-text'))   el('footer-text').textContent   = t('footerText');
  if (el('lang-title'))    el('lang-title').textContent    = t('langTitle');
  if (el('lang-cancel'))   el('lang-cancel').textContent   = t('langCancel');
}

/* ══════════════════════════════════════
   LANGUAGE SWITCHER OVERLAY
   ══════════════════════════════════════ */

/* Open language switcher */
function openLangSwitcher() {
  const overlay = document.getElementById('lang-overlay');
  if (overlay) {
    overlay.classList.add('open');
    // Close nav menu if open
    const menu = document.getElementById('nav-menu');
    if (menu) menu.classList.remove('open');
  }
}

/* Close language switcher */
function closeLangSwitcher() {
  const overlay = document.getElementById('lang-overlay');
  if (overlay) overlay.classList.remove('open');
}

/* Select a language */
function selectLanguage(lang) {
  setLanguage(lang);
  closeLangSwitcher();
  // Reload page to apply translations
  window.location.reload();
}

/* ══════════════════════════════════════
   VOICE OUTPUT
   ══════════════════════════════════════ */

let voicePlaying = false;

/* Speak text aloud */
function speakText(text, onEnd) {
  if (!('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  // Stop any current speech first
  window.speechSynthesis.cancel();

  const langMap = { en: 'en-US', ar: 'ar-SA', ba: 'en-US' };
  const utt     = new SpeechSynthesisUtterance(text);
  utt.lang      = langMap[currentLang] || 'en-US';
  utt.rate      = 0.9;
  utt.pitch     = 1;

  utt.onend   = () => { voicePlaying = false; if (onEnd) onEnd(); };
  utt.onerror = () => { voicePlaying = false; if (onEnd) onEnd(); };

  voicePlaying = true;
  window.speechSynthesis.speak(utt);
}

/* Stop speech */
function stopSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  voicePlaying = false;
}

/* Toggle voice button */
function toggleVoice(btnId, text) {
  const btn   = document.getElementById(btnId);
  if (!btn) return;

  if (voicePlaying) {
    stopSpeech();
    btn.textContent = t('voiceListen');
    btn.classList.remove('playing');
    return;
  }

  btn.textContent = t('voiceStop');
  btn.classList.add('playing');

  speakText(text, () => {
    btn.textContent = t('voiceListen');
    btn.classList.remove('playing');
  });
}

/* ══════════════════════════════════════
   LOCAL STORAGE — PLANTING LOG
   ══════════════════════════════════════ */

/* Get all log entries */
function getLogs() {
  return JSON.parse(localStorage.getItem('sf_logs') || '[]');
}

/* Save a new log entry */
function saveLog(entry) {
  const logs = getLogs();
  entry.id   = Date.now();
  logs.unshift(entry);
  localStorage.setItem('sf_logs', JSON.stringify(logs));
  return entry;
}

/* Delete a log entry by ID */
function deleteLog(id) {
  const logs    = getLogs();
  const updated = logs.filter(l => l.id !== id);
  localStorage.setItem('sf_logs', JSON.stringify(updated));
}

/* ══════════════════════════════════════
   UTILITY FUNCTIONS
   ══════════════════════════════════════ */

/* Show toast notification */
function showToast(message, duration = 2500) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

/* Format date for display */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const date   = new Date(dateStr);
  const locale = currentLang === 'ar' ? 'ar-SA' : 'en-GB';
  return date.toLocaleDateString(locale, {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

/* Get URL parameter */
function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

/* ══════════════════════════════════════
   INITIALISE ON PAGE LOAD
   ══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved language
  setLanguage(currentLang);

  // Apply translations to navbar
  applyNavTranslations();

  // Set active nav link
  setActiveNav();

  // Set today's date in date inputs
  document.querySelectorAll('input[type="date"]').forEach(input => {
    if (!input.value) input.valueAsDate = new Date();
  });

  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('Smart Farmer: offline ready'))
      .catch(err => console.log('SW error:', err));
  }
});
