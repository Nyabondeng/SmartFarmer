// Get crop logs from localStorage
function getCropLogs() {
    const logs = localStorage.getItem('cropLogs');
    return logs ? JSON.parse(logs) : [];
}

// Save crop logs to localStorage
function saveCropLogs(logs) {
    localStorage.setItem('cropLogs', JSON.stringify(logs));
}

// Save a new crop log record
function saveCropLog() {
    const crop = document.getElementById('cropSelect').value;
    const plantDate = document.getElementById('plantDate').value;
    const expectedHarvest = document.getElementById('expectedHarvest').value;
    const farmLocation = document.getElementById('farmLocation').value;
    const status = document.getElementById('cropStatus').value;
    const notes = document.getElementById('notes').value;

    // Validate required fields
    if (!crop || !plantDate) {
        alert('Please select a crop and enter a planting date.');
        return;
    }

    const logs = getCropLogs();
    const newRecord = {
        id: Date.now(),
        crop: crop,
        plantDate: plantDate,
        expectedHarvest: expectedHarvest || '',
        farmLocation: farmLocation || '',
        status: status || 'Planted',
        notes: notes || '',
        createdAt: new Date().toISOString()
    };

    logs.unshift(newRecord); // Add to beginning of array
    saveCropLogs(logs);
    displayCropLogs();
    updateCropCount();

    // Clear form
    document.getElementById('plantDate').value = '';
    document.getElementById('expectedHarvest').value = '';
    document.getElementById('farmLocation').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('cropStatus').value = 'Planted';
    
    // Show success message
    alert('Record saved successfully!');
}

// Delete a crop log record
function deleteCropLog(id) {
    if (!confirm('Are you sure you want to delete this record?')) {
        return;
    }

    let logs = getCropLogs();
    logs = logs.filter(log => log.id !== id);
    saveCropLogs(logs);
    displayCropLogs();
    updateCropCount();
    
    alert('Record deleted successfully!');
}

// Edit a crop log record - populate form with existing data
function editCropLog(id) {
    const logs = getCropLogs();
    const record = logs.find(log => log.id === id);
    
    if (!record) return;

    // Populate form with existing data
    document.getElementById('cropSelect').value = record.crop;
    document.getElementById('plantDate').value = record.plantDate;
    document.getElementById('expectedHarvest').value = record.expectedHarvest || '';
    document.getElementById('farmLocation').value = record.farmLocation || '';
    document.getElementById('cropStatus').value = record.status || 'Planted';
    document.getElementById('notes').value = record.notes || '';

    // Change button to update
    const saveBtn = document.querySelector('.save-btn');
    saveBtn.textContent = 'Update Record';
    saveBtn.onclick = function() {
        updateCropLog(id);
    };

    // Scroll to form
    document.querySelector('.log-form').scrollIntoView({ behavior: 'smooth' });
}

// Update an existing crop log record
function updateCropLog(id) {
    const crop = document.getElementById('cropSelect').value;
    const plantDate = document.getElementById('plantDate').value;
    const expectedHarvest = document.getElementById('expectedHarvest').value;
    const farmLocation = document.getElementById('farmLocation').value;
    const status = document.getElementById('cropStatus').value;
    const notes = document.getElementById('notes').value;

    if (!crop || !plantDate) {
        alert('Please select a crop and enter a planting date.');
        return;
    }

    let logs = getCropLogs();
    const index = logs.findIndex(log => log.id === id);
    
    if (index !== -1) {
        logs[index] = {
            ...logs[index],
            crop: crop,
            plantDate: plantDate,
            expectedHarvest: expectedHarvest || '',
            farmLocation: farmLocation || '',
            status: status || 'Planted',
            notes: notes || '',
            updatedAt: new Date().toISOString()
        };
        
        saveCropLogs(logs);
        displayCropLogs();
        updateCropCount();

        // Reset form
        document.getElementById('plantDate').value = '';
        document.getElementById('expectedHarvest').value = '';
        document.getElementById('farmLocation').value = '';
        document.getElementById('notes').value = '';
        document.getElementById('cropStatus').value = 'Planted';

        // Reset button
        const saveBtn = document.querySelector('.save-btn');
        saveBtn.textContent = 'Save Planting Record';
        saveBtn.onclick = function() {
            saveCropLog();
        };

        alert('Record updated successfully!');
    }
}

// Display all crop logs
function displayCropLogs() {
    const logList = document.getElementById('logList');
    const logs = getCropLogs();

    if (!logList) return;

    if (logs.length === 0) {
        logList.innerHTML = `
            <div class="empty-message">
                <div class="empty-icon">🌱</div>
                <p>No records yet. Save your first planting date.</p>
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

// Helper function to get status color
function getStatusColor(status) {
    const colors = {
        'Planted': '#3b82f6',
        'Growing': '#22c55e',
        'Harvested': '#f59e0b',
        'Pending': '#6b7280'
    };
    return colors[status] || '#6b7280';
}

// Helper function to format date
function formatDate(dateString) {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Update crop count in hero stats
function updateCropCount() {
    const logs = getCropLogs();
    const countEl = document.getElementById('totalCropsCount');
    if (countEl) {
        countEl.textContent = logs.length;
    }
}

// Clear all crop logs
function clearAllLogs() {
    if (!confirm('Are you sure you want to delete all records?')) {
        return;
    }
    saveCropLogs([]);
    displayCropLogs();
    updateCropCount();
    alert('All records cleared successfully!');
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
    displayCropLogs();
    updateCropCount();

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
