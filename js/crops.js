function toggleMenu() {
            const nav = document.querySelector('.nav-links');
            if (nav) nav.classList.toggle('active');
        }

        function saveCropLog() {
            let crop = document.getElementById('cropSelect').value;
            let date = document.getElementById('plantDate').value;
            let notes = document.getElementById('notes').value;

            if (!date) {
                alert('Please select a planting date');
                return;
            }

            let logs = localStorage.getItem('cropLogs');
            logs = logs ? JSON.parse(logs) : [];

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
                    html += `<div class="log-item">
                        <div class="log-item-header">
                            <span class="log-crop">${logs[i].crop}</span>
                            <span class="log-date">${logs[i].date}</span>
                        </div>
                        ${logs[i].notes ? `<p class="log-note">${logs[i].notes}</p>` : ''}
                    </div>`;
                }
                logList.innerHTML = html;
            } else {
                logList.innerHTML = `<div class="empty-message">
                    <div class="empty-icon">🌱</div>
                    <p>No records yet. Save your first planting date.</p>
                </div>`;
            }
        }

        function clearAllLogs() {
            if (confirm('Are you sure? This will delete all your saved planting records.')) {
                localStorage.removeItem('cropLogs');
                displayCropLogs();
                alert('All records cleared.');
            }
        }

        displayCropLogs();
