let currentUtterance = null;
let isPaused = false;
let currentCrop = '';
let currentLang = '';
let isSpeaking = false;

function getCropText(crop, lang) {
    const t = translations[lang] || translations.en;
    const cropVoices = {
        sorghum:    t.sorghumVoice    || 'Sorghum. Planting season: May-June. Spacing: 75cm x 25cm. Pest control: Watch for armyworms after first rain. Harvest: September-October. Storage: Dry completely before storing.',
        maize:      t.maizeVoice      || 'Maize. Planting season: May-June. Spacing: 75cm x 50cm. Pest control: Watch for maize stalk borer. Harvest: August-September. Storage: Dry on the cob, then remove kernels.',
        millet:     t.milletVoice     || 'Millet. Planting season: May-June. Spacing: 60cm x 20cm. Pest control: Watch for birds and stem borers. Harvest: September-October. Storage: Store in sealed containers.',
        groundnuts: t.groundnutsVoice || 'Groundnuts. Planting season: May-June. Spacing: 50cm x 15cm. Pest control: Watch for leaf spot and aphids. Harvest: October-November. Storage: Dry thoroughly before shelling.',
        cassava:    t.cassavaVoice    || 'Cassava. Planting season: March-April. Spacing: 100cm x 100cm. Pest control: Watch for cassava mosaic disease. Harvest: 8-12 months after planting. Storage: Harvest only when needed.',
        cowpeas:    t.cowpeasVoice    || 'Cowpeas. Planting season: May-June. Spacing: 60cm x 20cm. Pest control: Watch for aphids and pod borers. Harvest: September-October. Storage: Dry thoroughly in pods, then shell.',
        sesame:     t.sesameVoice     || 'Sesame. Planting season: May-June. Spacing: 45cm x 15cm. Pest control: Watch for leaf spot and aphids. Harvest: October-November. Storage: Dry well, store in sealed containers.',
        sweetpotato: t.sweetpotatoVoice || 'Sweet Potato. Planting season: May-June. Spacing: 30cm x 20cm. Pest control: Watch for weevils and leaf beetles. Harvest: 4-6 months. Storage: Store in a cool, dry, dark place.',
        beans:      t.beansVoice      || 'Beans. Planting season: May-June. Spacing: 50cm x 10cm. Pest control: Watch for aphids and bean beetles. Harvest: September-October. Storage: Dry completely before storing.',
        okra:       t.okraVoice       || 'Okra. Planting season: May-June. Spacing: 60cm x 30cm. Pest control: Watch for aphids and fruit borers. Harvest: September-October. Storage: Store in a cool, dry place.',
        tomato:     t.tomatoVoice     || 'Tomato. Planting season: May-June. Spacing: 60cm x 40cm. Pest control: Watch for tomato blight and fruit borers. Harvest: September-October. Storage: Store at room temperature, not refrigerated.',
        onion:      t.onionVoice      || 'Onion. Planting season: May-June. Spacing: 30cm x 10cm. Pest control: Watch for thrips and onion flies. Harvest: October-November. Storage: Store in a dry, ventilated place.',
        pumpkin:    t.pumpkinVoice    || 'Pumpkin. Planting season: May-June. Spacing: 150cm x 100cm. Pest control: Watch for fruit flies and powdery mildew. Harvest: October-November. Storage: Store in a cool, dry place.',
        yam:        t.yamVoice        || 'Yam. Planting season: May-June. Spacing: 100cm x 100cm. Pest control: Watch for yam beetles and nematodes. Harvest: October-November. Storage: Store in a cool, dark, well-ventilated place.',
        sugarcane:  t.sugarcaneVoice  || 'Sugarcane. Planting season: May-June. Spacing: 150cm x 60cm. Pest control: Watch for stalk borers and aphids. Harvest: 10-12 months. Storage: Process soon after harvest.',
        rice:       t.riceVoice       || 'Rice. Planting season: May-June. Spacing: 20cm x 20cm. Pest control: Watch for rice weevils and stem borers. Harvest: October-November. Storage: Dry completely, store in sealed containers.',
        sunflower:  t.sunflowerVoice  || 'Sunflower. Planting season: May-June. Spacing: 60cm x 30cm. Pest control: Watch for birds and head caterpillars. Harvest: October-November. Storage: Dry thoroughly, store in sealed bags.',
        banana:     t.bananaVoice     || 'Banana. Planting season: Year-round. Spacing: 300cm x 300cm. Pest control: Watch for weevils and leaf spot. Harvest: 8-12 months. Storage: Harvest green, ripen at room temperature.',
        watermelon: t.watermelonVoice || 'Watermelon. Planting season: May-June. Spacing: 200cm x 100cm. Pest control: Watch for fruit flies and powdery mildew. Harvest: September-October. Storage: Store in a cool, dry place.',
        cabbage:    t.cabbageVoice    || 'Cabbage. Planting season: May-June. Spacing: 60cm x 40cm. Pest control: Watch for aphids and caterpillars. Harvest: September-October. Storage: Store in a cool, ventilated place.'
    };
    return cropVoices[crop] || 'Crop information not available.';
}


function toggleCropAudio(crop) {
    console.log('🔊 toggleCropAudio called for:', crop);
    
    // If this is a new crop or no speech is active, start fresh
    if (currentCrop !== crop || !isSpeaking) {
        // Cancel any ongoing speech
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        isPaused = false;
        isSpeaking = false;
        currentUtterance = null;
        startSpeaking(crop);
        return;
    }


    if (isSpeaking && !isPaused) {
        // Pause
        if ('speechSynthesis' in window) {
            window.speechSynthesis.pause();
            isPaused = true;
            updateButtonState(crop, 'resume');
        }
    } else if (isPaused) {
        // Resume
        if ('speechSynthesis' in window) {
            window.speechSynthesis.resume();
            isPaused = false;
            updateButtonState(crop, 'pause');
        }
    }
}


function startSpeaking(crop) {
    const lang = document.getElementById('languageSwitcher').value;
    const text = getCropText(crop, lang);
    
    currentCrop = crop;
    currentLang = lang;
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.85;
        utterance.lang = (lang === 'juba' || lang === 'ar') ? 'ar-SA' : 'en-US';
        
        utterance.onstart = function() {
            isSpeaking = true;
            isPaused = false;
            updateButtonState(crop, 'pause');
        };
        
        utterance.onend = function() {
            isSpeaking = false;
            isPaused = false;
            currentUtterance = null;
            updateButtonState(crop, 'listen');
        };
        
        utterance.onerror = function() {
            isSpeaking = false;
            isPaused = false;
            currentUtterance = null;
            updateButtonState(crop, 'listen');
            alert('Sorry, voice is not available. Please try again.');
        };
        
        currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
        updateButtonState(crop, 'pause');
    } else {
        alert('Your browser does not support voice output. Here is the information: ' + text);
    }
}

function updateButtonState(crop, state) {
    const button = document.querySelector(`.voice-btn[data-crop="${crop}"]`);
    if (!button) return;
    
    switch(state) {
        case 'listen':
            button.textContent = '🔊 Listen';
            button.className = 'voice-btn idle';
            break;
        case 'pause':
            button.textContent = '⏸️ Pause';
            button.className = 'voice-btn playing';
            break;
        case 'resume':
            button.textContent = '▶️ Resume';
            button.className = 'voice-btn paused';
            break;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.voice-btn').forEach(btn => {
        const crop = btn.getAttribute('data-crop');
        if (crop) {
            btn.textContent = '🔊 Listen';
            btn.className = 'voice-btn idle';
        }
    });
});


document.getElementById('languageSwitcher').addEventListener('change', function () {
    const lang = this.value;

    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
    isSpeaking = false;
    isPaused = false;
    currentUtterance = null;
    document.querySelectorAll('.voice-btn').forEach(btn => {
        const crop = btn.getAttribute('data-crop');
        if (crop) updateButtonState(crop, 'listen');
    });
    if (typeof applyTranslations === 'function') applyTranslations(lang);
});


window.toggleCropAudio = toggleCropAudio;
