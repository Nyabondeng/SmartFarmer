// ============================================================
// CROP DETAILS TOGGLE FUNCTIONALITY
// ============================================================

function fillCropDetails(cropName, detailsDiv) {
    const lang = getCurrentTranslateLanguage();
    const t = translations[lang] || translations.en || {};

    {
        if (cropName && translations[lang]) {
            const cropData = translations[lang];
            const overviewKey = cropName + 'Overview';
            const plantingKey = cropName + 'PlantingSeason';
            const soilKey = cropName + 'SoilType';
            const landKey = cropName + 'LandPreparation';
            const seedKey = cropName + 'SeedRate';
            const waterKey = cropName + 'WaterRequirement';
            const pestsKey = cropName + 'Pests';
            const diseasesKey = cropName + 'Diseases';
            const marketKey = cropName + 'MarketTips';
            
            // Get all info sections
            const sections = detailsDiv.querySelectorAll('.info-section');
            
            if (sections.length >= 9) {
                // ============================================================
                // INDEX 0: Overview - UPDATE HEADING AND CONTENT
                // ============================================================
                const overviewH4 = sections[0].querySelector('h4');
                if (overviewH4 && t.overviewHeading) {
                    overviewH4.textContent = t.overviewHeading;
                }
                const overviewP = sections[0].querySelector('p');
                if (overviewP && cropData[overviewKey]) {
                    overviewP.textContent = cropData[overviewKey];
                }
                
                // ============================================================
                // INDEX 1: Planting Season - UPDATE HEADING AND CONTENT
                // ============================================================
                const plantingH4 = sections[1].querySelector('h4');
                if (plantingH4 && t.plantingHeading) {
                    plantingH4.textContent = t.plantingHeading;
                }
                const plantingP = sections[1].querySelector('p');
                if (plantingP && cropData[plantingKey]) {
                    plantingP.textContent = cropData[plantingKey];
                }
                
                // ============================================================
                // INDEX 2: Soil Type - UPDATE HEADING AND CONTENT
                // ============================================================
                const soilH4 = sections[2].querySelector('h4');
                if (soilH4 && t.soilHeading) {
                    soilH4.textContent = t.soilHeading;
                }
                const soilP = sections[2].querySelector('p');
                if (soilP && cropData[soilKey]) {
                    soilP.textContent = cropData[soilKey];
                }
                
                // ============================================================
                // INDEX 3: Land Preparation - UPDATE HEADING AND CONTENT
                // ============================================================
                const landH4 = sections[3].querySelector('h4');
                if (landH4 && t.landHeading) {
                    landH4.textContent = t.landHeading;
                }
                const landP = sections[3].querySelector('p');
                if (landP && cropData[landKey]) {
                    landP.textContent = cropData[landKey];
                }
                
                // ============================================================
                // INDEX 4: Seed Rate - UPDATE HEADING AND CONTENT
                // ============================================================
                const seedH4 = sections[4].querySelector('h4');
                if (seedH4 && t.seedHeading) {
                    seedH4.textContent = t.seedHeading;
                }
                const seedP = sections[4].querySelector('p');
                if (seedP && cropData[seedKey]) {
                    seedP.textContent = cropData[seedKey];
                }
                
                // ============================================================
                // INDEX 5: Water Requirement - UPDATE HEADING AND CONTENT
                // ============================================================
                const waterH4 = sections[5].querySelector('h4');
                if (waterH4 && t.waterHeading) {
                    waterH4.textContent = t.waterHeading;
                }
                const waterP = sections[5].querySelector('p');
                if (waterP && cropData[waterKey]) {
                    waterP.textContent = cropData[waterKey];
                }
                
                // ============================================================
                // INDEX 6: Pests - UPDATE HEADING AND CONTENT
                // ============================================================
                const pestsH4 = sections[6].querySelector('h4');
                if (pestsH4 && t.pestsHeading) {
                    pestsH4.textContent = t.pestsHeading;
                }
                const pestList = sections[6].querySelector('.pest-list');
                if (pestList && cropData[pestsKey]) {
                    const pestItems = cropData[pestsKey].split('.').filter(item => item.trim().length > 0);
                    pestList.innerHTML = '';
                    pestItems.forEach(item => {
                        const cleanItem = item.trim();
                        if (cleanItem.includes(' - ')) {
                            const parts = cleanItem.split(' - ');
                            const li = document.createElement('li');
                            li.innerHTML = `<strong>${parts[0].trim()}</strong> - ${parts.slice(1).join(' - ').trim()}`;
                            pestList.appendChild(li);
                        } else {
                            const li = document.createElement('li');
                            li.textContent = cleanItem;
                            pestList.appendChild(li);
                        }
                    });
                }
                
                // ============================================================
                // INDEX 7: Diseases - UPDATE HEADING AND CONTENT
                // ============================================================
                const diseasesH4 = sections[7].querySelector('h4');
                if (diseasesH4 && t.diseasesHeading) {
                    diseasesH4.textContent = t.diseasesHeading;
                }
                const diseaseList = sections[7].querySelector('.disease-list');
                if (diseaseList && cropData[diseasesKey]) {
                    const diseaseItems = cropData[diseasesKey].split('.').filter(item => item.trim().length > 0);
                    diseaseList.innerHTML = '';
                    diseaseItems.forEach(item => {
                        const cleanItem = item.trim();
                        if (cleanItem.includes(' - ')) {
                            const parts = cleanItem.split(' - ');
                            const li = document.createElement('li');
                            li.innerHTML = `<strong>${parts[0].trim()}</strong> - ${parts.slice(1).join(' - ').trim()}`;
                            diseaseList.appendChild(li);
                        } else {
                            const li = document.createElement('li');
                            li.textContent = cleanItem;
                            diseaseList.appendChild(li);
                        }
                    });
                }
                
                // ============================================================
                // INDEX 8: Market Tips - UPDATE HEADING AND CONTENT
                // ============================================================
                const marketH4 = sections[8].querySelector('h4');
                if (marketH4 && t.marketHeading) {
                    marketH4.textContent = t.marketHeading;
                }
                const marketP = sections[8].querySelector('p');
                if (marketP && cropData[marketKey]) {
                    marketP.textContent = cropData[marketKey];
                }
            }
        }
    }
}

function toggleCropDetails(button) {
    const cropCard = button.closest('.crop-card');
    const cropName = cropCard ? cropCard.dataset.crop : null;
    const detailsDiv = button.nextElementSibling;

    // Check if it's hidden (style display none or not set)
    const isHidden = detailsDiv.style.display === 'none' || detailsDiv.style.display === '';

    const lang = getCurrentTranslateLanguage();
    const t = translations[lang] || translations.en || {};

    if (isHidden) {
        fillCropDetails(cropName, detailsDiv);

        detailsDiv.style.display = 'block';
        button.textContent = (t.hideDetailsLabel || 'Hide Details');
        button.classList.add('active');

        // Smooth scroll to show the details
        setTimeout(() => {
            detailsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        detailsDiv.style.display = 'none';
        button.textContent = (t.viewDetails || 'View Full Details');
        button.classList.remove('active');
    }
}

function initCropDetails() {
    const detailsDivs = document.querySelectorAll('.crop-expanded-details');
    detailsDivs.forEach(div => {
        div.style.display = 'none';
    });
    
    const buttons = document.querySelectorAll('.crop-expand-btn');
    buttons.forEach(btn => {
        const lang = getCurrentTranslateLanguage();
        const t = translations[lang] || translations.en || {};
        btn.textContent = (t.viewDetails || 'View Full Details');
        btn.classList.remove('active');
    });
}

// ============================================================
// VOICE/AUDIO FUNCTIONALITY
// ============================================================

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
    
    const lang = getCurrentTranslateLanguage();
    const t = translations[lang] || translations.en || {};
    
    switch(state) {
        case 'listen':
            button.textContent = t.voiceListenLabel || '🔊 Listen';
            button.className = 'voice-btn idle';
            break;
        case 'pause':
            button.textContent = t.voicePauseLabel || '⏸ Pause';
            button.className = 'voice-btn playing';
            break;
        case 'resume':
            button.textContent = t.voiceResumeLabel || '▶ Resume';
            button.className = 'voice-btn paused';
            break;
    }
}

function getCurrentTranslateLanguage() {
    const selector = document.getElementById('languageSwitcher');
    const selected = selector && selector.value
        ? selector.value
        : (window.getStoredLanguage ? window.getStoredLanguage() : 'en');
    return (selected === 'juba' || selected === 'ar') ? 'juba' : 'en';
}

function applyCropsPageTranslations() {
    const lang = getCurrentTranslateLanguage();
    const t = translations[lang] || translations.en || {};

    const sectionLabel = document.querySelector('.section-label');
    if (sectionLabel && t.allCropsLabel) {
        sectionLabel.textContent = t.allCropsLabel;
    }

    document.querySelectorAll('.btn-forecast').forEach(btn => {
        if (t.forecastButton) btn.textContent = t.forecastButton;
    });

    document.querySelectorAll('.btn-fertilizer').forEach(btn => {
        if (t.fertilizerButton) btn.textContent = t.fertilizerButton;
    });
    
    // Update expand button texts
    const expandButtons = document.querySelectorAll('.crop-expand-btn');
    expandButtons.forEach(btn => {
        if (!btn.classList.contains('active')) {
            btn.textContent = (t.viewDetails || 'View Full Details');
        } else {
            btn.textContent = (t.hideDetailsLabel || 'Hide Details');
        }
    });

    // Re-fill already expanded sections (headings AND content) in the new language
    const expandedDetails = document.querySelectorAll('.crop-expanded-details[style*="display: block"]');
    expandedDetails.forEach(detailsDiv => {
        const cropCard = detailsDiv.closest('.crop-card');
        const cropName = cropCard ? cropCard.dataset.crop : null;
        if (cropName) {
            fillCropDetails(cropName, detailsDiv);
        }
    });
}

// ============================================================
// MAIN INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initCropDetails();
    applyCropsPageTranslations();
    
    if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
        };
    }
});

document.addEventListener('languagechange', () => {
    applyCropsPageTranslations();
});



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
    const lang = getCurrentTranslateLanguage();
    const text = getCropText(crop, lang);
    
    currentCrop = crop;
    currentLang = lang;
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        
        utterance.rate = 0.75;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        let voices = window.speechSynthesis.getVoices();
        let selectedVoice = null;
        
        if (lang === 'juba') {
            selectedVoice = voices.find(v => v.lang === 'ar-SA');
            if (!selectedVoice) {
                selectedVoice = voices.find(v => v.lang.startsWith('ar'));
            }
            if (!selectedVoice) {
                selectedVoice = voices.find(v => v.lang === 'en-US') || voices[0];
            }
            utterance.lang = 'ar-SA';
        } else {
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

// ============================================================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE
// ============================================================

window.toggleCropDetails = toggleCropDetails;
window.toggleCropAudio = toggleCropAudio;
window.initCropDetails = initCropDetails;
window.getCurrentTranslateLanguage = getCurrentTranslateLanguage;
