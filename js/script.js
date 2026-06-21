// Smart Farmer - Main JavaScript

// Voice output using browser speech synthesis
function playAudio(topic) {
    let message = '';
    switch(topic) {
        case 'sorghum':
            message = 'Sorghum. Plant in May or June. Space 75 centimeters by 25 centimeters. Watch for armyworms after rain.';
            break;
        case 'maize':
            message = 'Maize. Plant in May or June. Space 75 centimeters by 50 centimeters. Watch for stalk borer.';
            break;
        case 'millet':
            message = 'Millet. Plant in May or June. Space 60 centimeters by 20 centimeters. Watch for birds and stem borers.';
            break;
        case 'groundnuts':
            message = 'Groundnuts. Plant in May or June. Space 50 centimeters by 15 centimeters. Watch for leaf spot and aphids.';
            break;
        case 'cassava':
            message = 'Cassava. Plant in March or April. Space 100 centimeters by 100 centimeters. Watch for cassava mosaic disease. Harvest after 8 to 12 months.';
            break;
        case 'planting':
            message = 'Planting tips. Plant at the beginning of the rainy season. Use clean seeds. Space crops properly. Weed within the first 3 weeks.';
            break;
        case 'pest':
            message = 'Pest control. Check fields daily. Remove armyworms by hand. Use ash around stems for stem borers. Spray soapy water for aphids. Use scarecrows for birds.';
            break;
        case 'postharvest':
            message = 'Post-harvest handling. Harvest when grains are hard and dry. Dry crops completely before storing. Store in clean, dry containers. Use ash to keep insects away.';
            break;

        case 'soil':
            message = 'Soil management. Clear weeds before planting. Add compost or animal manure to improve soil fertility. Rotate crops regularly and use mulch to conserve moisture and reduce erosion.';
            break;

        case 'climate':
            message = 'Climate-smart farming. Plant early when the rainy season begins. Choose drought-resistant crops. Harvest rainwater when possible. Use mulching to reduce water loss and follow weather forecasts before planting.';
            break;
        
        default:
            message = 'Information available in English. Voice in Bari and Arabic coming soon.';
    }
    
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    } else {
        alert('Your browser does not support voice output. ' + message);
    }
}



function translatePage(language) {

    document.querySelectorAll("[data-translate]").forEach(element => {

        const key = element.getAttribute("data-translate");

        if (
            translations[language] &&
            translations[language][key]
        ) {
            element.textContent = translations[language][key];
        }

    });

}

document.addEventListener("DOMContentLoaded", () => {

    const savedLanguage =
        localStorage.getItem("language") || "en";

    translatePage(savedLanguage);

    const languageSwitcher =
        document.getElementById("languageSwitcher");

    if (languageSwitcher) {

        languageSwitcher.value = savedLanguage;

        languageSwitcher.addEventListener("change", () => {

            const selectedLanguage =
                languageSwitcher.value;

            localStorage.setItem(
                "language",
                selectedLanguage
            );

            translatePage(selectedLanguage);

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
