let currentUtterance = null;
let isPaused = false;
let currentCrop = '';
let currentLang = '';
let isSpeaking = false;

function getCropText(crop, lang) {
    const t = translations[lang] || translations.en;
    const cropVoices = {
        sorghum:    t.sorghumVoice    || 'Sorghum. Planting season: May-June. Spacing: 75 centimeters by 25 centimeters. Pest control: Watch for armyworms after first rain. Harvest: September-October. Storage: Dry completely before storing.',
        maize:      t.maizeVoice      || 'Maize. Planting season: May-June. Spacing: 75 centimeters by 50 centimeters. Pest control: Watch for maize stalk borer. Harvest: August-September. Storage: Dry on the cob, then remove kernels.',
        millet:     t.milletVoice     || 'Millet. Planting season: May-June. Spacing: 60 centimeters by 20 centimeters. Pest control: Watch for birds and stem borers. Harvest: September-October. Storage: Store in sealed containers.',
        groundnuts: t.groundnutsVoice || 'Groundnuts. Planting season: May-June. Spacing: 50 centimeters by 15 centimeters. Pest control: Watch for leaf spot and aphids. Harvest: October-November. Storage: Dry thoroughly before shelling.',
        cassava:    t.cassavaVoice    || 'Cassava. Planting season: March-April. Spacing: 100 centimeters by 100 centimeters. Pest control: Watch for cassava mosaic disease. Harvest: 8 to 12 months after planting. Storage: Harvest only when needed.',
        cowpeas:    t.cowpeasVoice    || 'Cowpeas. Planting season: May-June. Spacing: 60 centimeters by 20 centimeters. Pest control: Watch for aphids and pod borers. Harvest: September-October. Storage: Dry thoroughly in pods, then shell.',
        sesame:     t.sesameVoice     || 'Sesame. Planting season: May-June. Spacing: 45 centimeters by 15 centimeters. Pest control: Watch for leaf spot and aphids. Harvest: October-November. Storage: Dry well, store in sealed containers.',
        sweetpotato: t.sweetpotatoVoice || 'Sweet Potato. Planting season: May-June. Spacing: 30 centimeters by 20 centimeters. Pest control: Watch for weevils and leaf beetles. Harvest: 4 to 6 months. Storage: Store in a cool, dry, dark place.',
        beans:      t.beansVoice      || 'Beans. Planting season: May-June. Spacing: 50 centimeters by 10 centimeters. Pest control: Watch for aphids and bean beetles. Harvest: September-October. Storage: Dry completely before storing.',
        okra:       t.okraVoice       || 'Okra. Planting season: May-June. Spacing: 60 centimeters by 30 centimeters. Pest control: Watch for aphids and fruit borers. Harvest: September-October. Storage: Store in a cool, dry place.',
        tomato:     t.tomatoVoice     || 'Tomato. Planting season: May-June. Spacing: 60 centimeters by 40 centimeters. Pest control: Watch for tomato blight and fruit borers. Harvest: September-October. Storage: Store at room temperature, not refrigerated.',
        onion:      t.onionVoice      || 'Onion. Planting season: May-June. Spacing: 30 centimeters by 10 centimeters. Pest control: Watch for thrips and onion flies. Harvest: October-November. Storage: Store in a dry, ventilated place.',
        pumpkin:    t.pumpkinVoice    || 'Pumpkin. Planting season: May-June. Spacing: 150 centimeters by 100 centimeters. Pest control: Watch for fruit flies and powdery mildew. Harvest: October-November. Storage: Store in a cool, dry place.',
        yam:        t.yamVoice        || 'Yam. Planting season: May-June. Spacing: 100 centimeters by 100 centimeters. Pest control: Watch for yam beetles and nematodes. Harvest: October-November. Storage: Store in a cool, dark, well-ventilated place.',
        sugarcane:  t.sugarcaneVoice  || 'Sugarcane. Planting season: May-June. Spacing: 150 centimeters by 60 centimeters. Pest control: Watch for stalk borers and aphids. Harvest: 10 to 12 months. Storage: Process soon after harvest.',
        rice:       t.riceVoice       || 'Rice. Planting season: May-June. Spacing: 20 centimeters by 20 centimeters. Pest control: Watch for rice weevils and stem borers. Harvest: October-November. Storage: Dry completely, store in sealed containers.',
        sunflower:  t.sunflowerVoice  || 'Sunflower. Planting season: May-June. Spacing: 60 centimeters by 30 centimeters. Pest control: Watch for birds and head caterpillars. Harvest: October-November. Storage: Dry thoroughly, store in sealed bags.',
        banana:     t.bananaVoice     || 'Banana. Planting season: Year-round. Spacing: 300 centimeters by 300 centimeters. Pest control: Watch for weevils and leaf spot. Harvest: 8 to 12 months. Storage: Harvest green, ripen at room temperature.',
        watermelon: t.watermelonVoice || 'Watermelon. Planting season: May-June. Spacing: 200 centimeters by 100 centimeters. Pest control: Watch for fruit flies and powdery mildew. Harvest: September-October. Storage: Store in a cool, dry place.',
        cabbage:    t.cabbageVoice    || 'Cabbage. Planting season: May-June. Spacing: 60 centimeters by 40 centimeters. Pest control: Watch for aphids and caterpillars. Harvest: September-October. Storage: Store in a cool, ventilated place.',
        pigeonpeas: t.pigeonpeasVoice || 'Pigeon Peas. Planting season: May-June. Spacing: 75 centimeters by 30 centimeters. Pest control: Watch for pod borers and wilt. Harvest: October-November. Storage: Dry thoroughly, store in sealed containers.',
        mangoes:    t.mangoesVoice    || 'Mangoes. Planting season: March-April. Spacing: 1000 centimeters by 800 centimeters. Pest control: Watch for fruit flies and mealybugs. Harvest: November-January. Storage: Store at room temperature until ripe.',
        coffee:     t.coffeeVoice     || 'Coffee. Planting season: Beginning of rains. Spacing: 250 centimeters by 250 centimeters. Pest control: Watch for coffee berry borer. Harvest: Dry season. Storage: Dry and store in cool, dry place.',
        tea:        t.teaVoice        || 'Tea. Planting season: Rainy season. Spacing: 100 centimeters by 75 centimeters. Pest control: Watch for tea mosquito bug. Harvest: Year-round. Storage: Process and dry soon after harvest.',
        tobacco:    t.tobaccoVoice    || 'Tobacco. Planting season: Beginning of rains. Spacing: 90 centimeters by 60 centimeters. Pest control: Watch for aphids and hornworms. Harvest: Dry season. Storage: Cure and dry before storage.',
        cotton:     t.cottonVoice     || 'Cotton. Planting season: May-June. Spacing: 100 centimeters by 30 centimeters. Pest control: Watch for bollworms and aphids. Harvest: October-November. Storage: Keep dry and protected from pests.',
        soybean:    t.soybeanVoice    || 'Soybean. Planting season: May-June. Spacing: 50 centimeters by 10 centimeters. Pest control: Watch for pod borers. Harvest: September-October. Storage: Dry completely before storing.',
        fingermillet: t.fingermilletVoice || 'Finger Millet. Planting season: May-June. Spacing: 45 centimeters by 15 centimeters. Pest control: Watch for birds and stem borers. Harvest: September-October. Storage: Store in sealed containers.',
        pearlmillet: t.pearlmilletVoice || 'Pearl Millet. Planting season: May-June. Spacing: 60 centimeters by 20 centimeters. Pest control: Watch for birds and stem borers. Harvest: September-October. Storage: Store in sealed containers.',
        eggplant:   t.eggplantVoice   || 'Eggplant. Planting season: May-June. Spacing: 60 centimeters by 45 centimeters. Pest control: Watch for flea beetles and fruit borers. Harvest: August-October. Storage: Store in a cool, dry place.'
    };
    return cropVoices[crop] || 'Crop information not available.';
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
}function updateButtonState(crop, state) {
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

function toggleCropAudio(crop) {
    console.log('🔊 toggleCropAudio called for:', crop);
    
    if (currentCrop !== crop || !isSpeaking) {
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
        if ('speechSynthesis' in window) {
            window.speechSynthesis.pause();
            isPaused = true;
            updateButtonState(crop, 'resume');
        }
    } else if (isPaused) {
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
        
        // ===== VOICE SETTINGS =====
        utterance.rate = 0.75;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        let voices = window.speechSynthesis.getVoices();
        let selectedVoice = null;
        
        // ===== CHECK LANGUAGE FIRST =====
        if (lang === 'juba') {
            // Juba Arabic - use Arabic voice
            // Try Microsoft Naayf specifically
            selectedVoice = voices.find(v => v.lang === 'ar-SA');
            // If not found, try any Arabic voice
            if (!selectedVoice) {
                selectedVoice = voices.find(v => v.lang.startsWith('ar'));
            }
            // If still no Arabic voice, fallback to English
            if (!selectedVoice) {
                selectedVoice = voices.find(v => v.lang === 'en-US') || voices[0];
            }
            
            // Set language to Arabic
            utterance.lang = 'ar-SA';
            
        } else if (lang === 'bari') {
            // Bari - use English (East African preferred)
            const preferredVoices = ['en-KE', 'en-UG', 'en-TZ', 'en-ZA', 'en-NG'];
            for (let langCode of preferredVoices) {
                selectedVoice = voices.find(v => v.lang === langCode);
                if (selectedVoice) break;
            }
            if (!selectedVoice) {
                selectedVoice = voices.find(v => v.lang.startsWith('en-') && v.lang !== 'en-US' && v.lang !== 'en-GB') 
                    || voices.find(v => v.lang === 'en-GB')
                    || voices.find(v => v.lang === 'en-US')
                    || voices[0];
            }
            utterance.lang = selectedVoice ? selectedVoice.lang : 'en-US';
            
        } else {
            // English - use East African voices
            const preferredVoices = ['en-KE', 'en-UG', 'en-TZ', 'en-ZA', 'en-NG'];
            for (let langCode of preferredVoices) {
                selectedVoice = voices.find(v => v.lang === langCode);
                if (selectedVoice) break;
            }
            if (!selectedVoice) {
                selectedVoice = voices.find(v => v.lang.startsWith('en-') && v.lang !== 'en-US' && v.lang !== 'en-GB') 
                    || voices.find(v => v.lang === 'en-GB')
                    || voices.find(v => v.lang === 'en-US')
                    || voices[0];
            }
            utterance.lang = selectedVoice ? selectedVoice.lang : 'en-US';
        }
        
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        
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
        
        utterance.onerror = function(event) {
            console.error('Speech error:', event);
            isSpeaking = false;
            isPaused = false;
            currentUtterance = null;
            updateButtonState(crop, 'listen');
            if (event.error !== 'not-allowed' && event.error !== 'canceled') {
                alert('Speech error: ' + event.error);
            }
        };

        currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
        updateButtonState(crop, 'pause');
    } else {
        alert('Your browser does not support voice output. Here is the information: ' + text);
    }
}
