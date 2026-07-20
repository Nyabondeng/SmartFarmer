// ============================================================
// CROP LOG — cloud + offline hybrid
// Logged in  -> records saved to the backend (/api/logs)
// Logged out -> records saved to localStorage on this device
// ============================================================

const CROPLOG_API = 'https://smartfarmer-m7x3.onrender.com';

// true when the user is logged in AND the server is reachable
let cloudMode = false;

// the records currently shown (normalized shape, either source)
let currentLogs = [];

function getToken() {
    return localStorage.getItem('token');
}

function authHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken()
    };
}

// Convert a backend row to the shape the page renders
function normalizeCloudLog(row) {
    return {
        id: row.id,
        crop: row.crop,
        plantDate: row.planting_date ? row.planting_date.slice(0, 10) : '',
        expectedHarvest: row.harvest_date ? row.harvest_date.slice(0, 10) : '',
        farmLocation: row.location || '',
        status: row.status || 'Planted',
        notes: row.notes || ''
    };
}

// Read the values currently in the form
function readForm() {
    return {
        crop: document.getElementById('cropSelect').value,
        plantDate: document.getElementById('plantDate').value,
        expectedHarvest: document.getElementById('expectedHarvest').value,
        farmLocation: document.getElementById('farmLocation').value,
        status: document.getElementById('cropStatus').value,
        notes: document.getElementById('notes').value
    };
}

function clearForm() {
    document.getElementById('plantDate').value = '';
    document.getElementById('expectedHarvest').value = '';
    document.getElementById('farmLocation').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('cropStatus').value = 'Planted';
}

// ============================================================
// LOCAL STORAGE (guest / offline mode)
// ============================================================

function getLocalLogs() {
    const logs = localStorage.getItem('cropLogs');
    return logs ? JSON.parse(logs) : [];
}

function saveLocalLogs(logs) {
    localStorage.setItem('cropLogs', JSON.stringify(logs));
}

// ============================================================
// LOADING
// ============================================================

async function loadCropLogs() {
    if (getToken()) {
        try {
            const response = await fetch(`${CROPLOG_API}/api/logs`, {
                headers: authHeaders()
            });

            if (response.status === 401) {
                // token expired — behave as logged out
                cloudMode = false;
                setSyncStatus('Your session expired. Log in again to sync records to the cloud.');
                currentLogs = getLocalLogs();
                renderLogs();
                return;
            }

            const data = await response.json();
            cloudMode = true;
            currentLogs = (data.data || []).map(normalizeCloudLog);
            setSyncStatus('☁ Synced to your account — available on any device.');
            renderLogs();

            offerLocalSync();
            return;
        } catch (err) {
            // server unreachable — fall back to device records
            cloudMode = false;
            setSyncStatus('📴 Offline — showing records saved on this device.');
            currentLogs = getLocalLogs();
            renderLogs();
            return;
        }
    }

    cloudMode = false;
    setSyncStatus('📱 Stored on this device only. Log in to save records to the cloud.');
    currentLogs = getLocalLogs();
    renderLogs();
}

// If the user logged in but still has records on the device,
// offer to upload them once so nothing is lost.
async function offerLocalSync() {
    const localLogs = getLocalLogs();
    if (!cloudMode || localLogs.length === 0) return;

    const upload = confirm(
        `You have ${localLogs.length} record(s) saved on this device. ` +
        'Upload them to your account so they are available on any device?'
    );
    if (!upload) return;

    let failed = 0;
    for (const log of localLogs) {
        try {
            const response = await fetch(`${CROPLOG_API}/api/logs`, {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({
                    crop: log.crop,
                    planting_date: log.plantDate,
                    harvest_date: log.expectedHarvest || null,
                    notes: log.notes || '',
                    status: log.status || 'Planted',
                    location: log.farmLocation || ''
                })
            });
            if (!response.ok) failed++;
        } catch (err) {
            failed++;
        }
    }

    if (failed === 0) {
        saveLocalLogs([]);
        alert('All device records uploaded to your account.');
    } else {
        alert(`${failed} record(s) could not be uploaded and were kept on this device.`);
    }
    loadCropLogs();
}

// ============================================================
// SAVE / UPDATE / DELETE
// ============================================================

async function saveCropLog() {
    const form = readForm();

    if (!form.crop || !form.plantDate) {
        alert('Please select a crop and enter a planting date.');
        return;
    }

    if (cloudMode) {
        try {
            const response = await fetch(`${CROPLOG_API}/api/logs`, {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({
                    crop: form.crop,
                    planting_date: form.plantDate,
                    harvest_date: form.expectedHarvest || null,
                    notes: form.notes || '',
                    status: form.status || 'Planted',
                    location: form.farmLocation || ''
                })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Save failed');

            clearForm();
            alert('Record saved to your account!');
            loadCropLogs();
            return;
        } catch (err) {
            alert('Could not reach the server. The record was saved on this device instead.');
            // fall through to local save
        }
    }

    const logs = getLocalLogs();
    logs.unshift({
        id: Date.now(),
        crop: form.crop,
        plantDate: form.plantDate,
        expectedHarvest: form.expectedHarvest || '',
        farmLocation: form.farmLocation || '',
        status: form.status || 'Planted',
        notes: form.notes || '',
        createdAt: new Date().toISOString()
    });
    saveLocalLogs(logs);

    clearForm();
    if (!cloudMode && !getToken()) alert('Record saved on this device!');
    loadCropLogs();
}

async function deleteCropLog(id) {
    if (!confirm('Are you sure you want to delete this record?')) {
        return;
    }

    if (cloudMode) {
        try {
            const response = await fetch(`${CROPLOG_API}/api/logs/${id}`, {
                method: 'DELETE',
                headers: authHeaders()
            });
            if (!response.ok) throw new Error('Delete failed');
            alert('Record deleted successfully!');
            loadCropLogs();
            return;
        } catch (err) {
            alert('Could not reach the server. Please try again.');
            return;
        }
    }

    saveLocalLogs(getLocalLogs().filter(log => log.id !== id));
    alert('Record deleted successfully!');
    loadCropLogs();
}

function editCropLog(id) {
    const record = currentLogs.find(log => log.id === id);
    if (!record) return;

    document.getElementById('cropSelect').value = record.crop;
    document.getElementById('plantDate').value = record.plantDate;
    document.getElementById('expectedHarvest').value = record.expectedHarvest || '';
    document.getElementById('farmLocation').value = record.farmLocation || '';
    document.getElementById('cropStatus').value = record.status || 'Planted';
    document.getElementById('notes').value = record.notes || '';

    const saveBtn = document.querySelector('.save-btn');
    saveBtn.textContent = 'Update Record';
    saveBtn.onclick = function() {
        updateCropLog(id);
    };

    document.querySelector('.log-form').scrollIntoView({ behavior: 'smooth' });
}

async function updateCropLog(id) {
    const form = readForm();

    if (!form.crop || !form.plantDate) {
        alert('Please select a crop and enter a planting date.');
        return;
    }

    if (cloudMode) {
        try {
            const response = await fetch(`${CROPLOG_API}/api/logs/${id}`, {
                method: 'PUT',
                headers: authHeaders(),
                body: JSON.stringify({
                    crop: form.crop,
                    planting_date: form.plantDate,
                    harvest_date: form.expectedHarvest || null,
                    notes: form.notes || '',
                    status: form.status || 'Planted',
                    location: form.farmLocation || ''
                })
            });
            if (!response.ok) throw new Error('Update failed');
        } catch (err) {
            alert('Could not reach the server. Please try again.');
            return;
        }
    } else {
        const logs = getLocalLogs();
        const index = logs.findIndex(log => log.id === id);
        if (index !== -1) {
            logs[index] = {
                ...logs[index],
                crop: form.crop,
                plantDate: form.plantDate,
                expectedHarvest: form.expectedHarvest || '',
                farmLocation: form.farmLocation || '',
                status: form.status || 'Planted',
                notes: form.notes || '',
                updatedAt: new Date().toISOString()
            };
            saveLocalLogs(logs);
        }
    }

    clearForm();
    resetSaveButton();
    alert('Record updated successfully!');
    loadCropLogs();
}

function resetSaveButton() {
    const saveBtn = document.querySelector('.save-btn');
    saveBtn.textContent = 'Save Planting Record';
    saveBtn.onclick = function() {
        saveCropLog();
    };
}

async function clearAllLogs() {
    if (!confirm('Are you sure you want to delete all records?')) {
        return;
    }

    if (cloudMode) {
        for (const log of currentLogs) {
            try {
                await fetch(`${CROPLOG_API}/api/logs/${log.id}`, {
                    method: 'DELETE',
                    headers: authHeaders()
                });
            } catch (err) {
                // keep going; reload shows what is left
            }
        }
    } else {
        saveLocalLogs([]);
    }

    alert('All records cleared successfully!');
    loadCropLogs();
}

// ============================================================
// RENDERING
// ============================================================

function setSyncStatus(text) {
    let el = document.getElementById('syncStatus');
    if (!el) {
        const savedLogs = document.querySelector('.saved-logs');
        if (!savedLogs) return;
        el = document.createElement('div');
        el.id = 'syncStatus';
        el.style.cssText = 'padding:8px 12px;margin-bottom:12px;border-radius:8px;' +
            'background:#f0fdf4;border:1px solid #bbf7d0;font-size:0.85rem;color:#166534;';
        savedLogs.insertBefore(el, savedLogs.firstChild);
    }
    el.textContent = text;
}

function renderLogs() {
    const logList = document.getElementById('logList');
    if (!logList) return;

    updateCropCount();

    if (currentLogs.length === 0) {
        logList.innerHTML = `
            <div class="empty-message">
                <div class="empty-icon">🌱</div>
                <p>No records yet. Save your first planting date.</p>
            </div>
        `;
        return;
    }

    let html = '<div class="log-items">';
    currentLogs.forEach((log) => {
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
                        <span class="log-label">Planting Date:</span>
                        <span class="log-value">${formatDate(log.plantDate)}</span>
                    </div>
                    ${log.expectedHarvest ? `
                        <div class="log-detail-row">
                            <span class="log-label">Expected Harvest:</span>
                            <span class="log-value">${formatDate(log.expectedHarvest)}</span>
                        </div>
                    ` : ''}
                    ${log.farmLocation ? `
                        <div class="log-detail-row">
                            <span class="log-label">Farm Location:</span>
                            <span class="log-value">${log.farmLocation}</span>
                        </div>
                    ` : ''}
                    ${log.notes ? `
                        <div class="log-detail-row">
                            <span class="log-label">Notes:</span>
                            <span class="log-value">${log.notes}</span>
                        </div>
                    ` : ''}
                </div>
                <div class="log-item-actions">
                    <button class="edit-btn" onclick="editCropLog(${log.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteCropLog(${log.id})">Delete</button>
                </div>
            </div>
        `;
    });
    html += '</div>';
    logList.innerHTML = html;
}

// Kept for compatibility with older callers
function displayCropLogs() {
    loadCropLogs();
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
    const countEl = document.getElementById('totalCropsCount');
    if (countEl) {
        countEl.textContent = currentLogs.length;
    }
}

// ============================================================
// TOGGLE MENU FUNCTION
// ============================================================

function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    if (nav) nav.classList.toggle('active');
}

// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    loadCropLogs();

    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    const plantDateInput = document.getElementById('plantDate');
    if (plantDateInput) {
        plantDateInput.value = today;
    }
});

// ============================================================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE
// ============================================================

window.toggleMenu = toggleMenu;
window.saveCropLog = saveCropLog;
window.deleteCropLog = deleteCropLog;
window.editCropLog = editCropLog;
window.updateCropLog = updateCropLog;
window.clearAllLogs = clearAllLogs;
window.displayCropLogs = displayCropLogs;
window.updateCropCount = updateCropCount;
