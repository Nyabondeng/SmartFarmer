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
// CROP LOG FUNCTIONS
// ============================================================

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
                <div class="empty-icon">🌱</div>
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

// ============================================================
// USER NAV FUNCTIONS
// ============================================================

function updateUserNav() {
    const user = getCurrentUser();
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    const existingUser = document.querySelector('.nav-user-link');
    const existingLogout = document.querySelector('.nav-logout-link');
    const existingAccount = navLinks.querySelector('a[href="farmer-login.html"], a[href="farmer-register.html"]');

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
    } else if (!existingAccount) {
        const accountLi = document.createElement('li');
        accountLi.className = 'nav-account-link';
        accountLi.innerHTML = '<a href="farmer-login.html" data-translate="login">Account</a>';
        navLinks.appendChild(accountLi);
    }
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
window.editCropLog = editCropLog;
window.updateCropCount = updateCropCount;
window.updateUserNav = updateUserNav;
window.getCropLogs = getCropLogs;
window.saveCropLogs = saveCropLogs;
window.formatDate = formatDate;
window.getStatusColor = getStatusColor;
