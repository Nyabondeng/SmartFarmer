function getCropText(crop, lang) {
    const t = translations[lang] || translations.en;
    const cropVoices = {
        // 1. Sorghum
        sorghum:    t.sorghumVoice    || 'Sorghum. Planting season: May-June. Spacing: 75cm x 25cm. Pest control: Watch for armyworms after first rain. Harvest: September-October. Storage: Dry completely before storing.',
        
        // 2. Maize
        maize:      t.maizeVoice      || 'Maize. Planting season: May-June. Spacing: 75cm x 50cm. Pest control: Watch for maize stalk borer. Harvest: August-September. Storage: Dry on the cob, then remove kernels.',
        
        // 3. Millet
        millet:     t.milletVoice     || 'Millet. Planting season: May-June. Spacing: 60cm x 20cm. Pest control: Watch for birds and stem borers. Harvest: September-October. Storage: Store in sealed containers.',
        
        // 4. Groundnuts
        groundnuts: t.groundnutsVoice || 'Groundnuts. Planting season: May-June. Spacing: 50cm x 15cm. Pest control: Watch for leaf spot and aphids. Harvest: October-November. Storage: Dry thoroughly before shelling.',
        
        // 5. Cassava
        cassava:    t.cassavaVoice    || 'Cassava. Planting season: March-April. Spacing: 100cm x 100cm. Pest control: Watch for cassava mosaic disease. Harvest: 8-12 months after planting. Storage: Harvest only when needed.',
        
        // 6. Cowpeas
        cowpeas:    t.cowpeasVoice    || 'Cowpeas. Planting season: May-June. Spacing: 60cm x 20cm. Pest control: Watch for aphids and pod borers. Harvest: September-October. Storage: Dry thoroughly in pods, then shell.',
        
        // 7. Sesame
        sesame:     t.sesameVoice     || 'Sesame. Planting season: May-June. Spacing: 45cm x 15cm. Pest control: Watch for leaf spot and aphids. Harvest: October-November. Storage: Dry well, store in sealed containers.',
        
        // 8. Sweet Potato
        sweetpotato: t.sweetpotatoVoice || 'Sweet Potato. Planting season: May-June. Spacing: 30cm x 20cm. Pest control: Watch for weevils and leaf beetles. Harvest: 4-6 months. Storage: Store in a cool, dry, dark place.',
        
        // 9. Beans
        beans:      t.beansVoice      || 'Beans. Planting season: May-June. Spacing: 50cm x 10cm. Pest control: Watch for aphids and bean beetles. Harvest: September-October. Storage: Dry completely before storing.',
        
        // 10. Okra
        okra:       t.okraVoice       || 'Okra. Planting season: May-June. Spacing: 60cm x 30cm. Pest control: Watch for aphids and fruit borers. Harvest: September-October. Storage: Store in a cool, dry place.',
        
        // 11. Tomato
        tomato:     t.tomatoVoice     || 'Tomato. Planting season: May-June. Spacing: 60cm x 40cm. Pest control: Watch for tomato blight and fruit borers. Harvest: September-October. Storage: Store at room temperature, not refrigerated.',
        
        // 12. Onion
        onion:      t.onionVoice      || 'Onion. Planting season: May-June. Spacing: 30cm x 10cm. Pest control: Watch for thrips and onion flies. Harvest: October-November. Storage: Store in a dry, ventilated place.',
        
        // 13. Pumpkin
        pumpkin:    t.pumpkinVoice    || 'Pumpkin. Planting season: May-June. Spacing: 150cm x 100cm. Pest control: Watch for fruit flies and powdery mildew. Harvest: October-November. Storage: Store in a cool, dry place.',
        
        // 14. Yam
        yam:        t.yamVoice        || 'Yam. Planting season: May-June. Spacing: 100cm x 100cm. Pest control: Watch for yam beetles and nematodes. Harvest: October-November. Storage: Store in a cool, dark, well-ventilated place.',
        
        // 15. Sugarcane
        sugarcane:  t.sugarcaneVoice  || 'Sugarcane. Planting season: May-June. Spacing: 150cm x 60cm. Pest control: Watch for stalk borers and aphids. Harvest: 10-12 months. Storage: Process soon after harvest.',
        
        // 16. Rice
        rice:       t.riceVoice       || 'Rice. Planting season: May-June. Spacing: 20cm x 20cm. Pest control: Watch for rice weevils and stem borers. Harvest: October-November. Storage: Dry completely, store in sealed containers.',
        
        // 17. Sunflower
        sunflower:  t.sunflowerVoice  || 'Sunflower. Planting season: May-June. Spacing: 60cm x 30cm. Pest control: Watch for birds and head caterpillars. Harvest: October-November. Storage: Dry thoroughly, store in sealed bags.',
        
        // 18. Banana
        banana:     t.bananaVoice     || 'Banana. Planting season: Year-round. Spacing: 300cm x 300cm. Pest control: Watch for weevils and leaf spot. Harvest: 8-12 months. Storage: Harvest green, ripen at room temperature.',
        
        // 19. Watermelon
        watermelon: t.watermelonVoice || 'Watermelon. Planting season: May-June. Spacing: 200cm x 100cm. Pest control: Watch for fruit flies and powdery mildew. Harvest: September-October. Storage: Store in a cool, dry place.',
        
        // 20. Cabbage
        cabbage:    t.cabbageVoice    || 'Cabbage. Planting season: May-June. Spacing: 60cm x 40cm. Pest control: Watch for aphids and caterpillars. Harvest: September-October. Storage: Store in a cool, ventilated place.'
    };
    
    return cropVoices[crop] || 'Crop information not available.';
}

function playCropAudio(crop) {
    const lang = document.getElementById('languageSwitcher').value;
    const text = getCropText(crop, lang);
    
    if ('speechSynthesis' in window) {
        if (isPaused && currentUtterance) {
            window.speechSynthesis.resume();
            isPaused = false;
            updateButtonStates(true, false, true);
            return;
        }

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.85;
        utterance.lang = (lang === 'juba' || lang === 'ar') ? 'ar-SA' : 'en-US';
        utterance.onerror = () => alert('Sorry, voice is not available. Please try again.');
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Your browser does not support voice output. Here is the information: ' + text);
    }
}

function pauseAudio() {
    if ('speechSynthesis' in window && !isPaused && currentUtterance) {
        window.speechSynthesis.pause();
        isPaused = true;
        updateButtonStates(true, false, true);
    }
}

function stopAudio() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        isPaused = false;
        currentUtterance = null;
        updateButtonStates(true, false, false);
    }
}

function updateButtonStates(listenEnabled, pauseEnabled, stopEnabled) {
    document.querySelectorAll('.voice-btn').forEach(btn => {
        btn.disabled = !listenEnabled;
    });
    document.querySelectorAll('.pause-btn').forEach(btn => {
        btn.disabled = !pauseEnabled;
    });
    document.querySelectorAll('.stop-btn').forEach(btn => {
        btn.disabled = !stopEnabled;
    });
}

document.getElementById('languageSwitcher').addEventListener('change', function () {
    const lang = this.value;
    if (typeof applyTranslations === 'function') applyTranslations(lang);
});
