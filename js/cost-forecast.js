// Crop Data
const cropData = {
    sorghum: {
        name: 'Sorghum',
        seedCostPerAcre: 25000,
        fertilizerCostPerAcre: 35000,
        laborCostPerAcre: 40000,
        yieldPerAcre: 1200,
        pricePerKg: 500,
        growingMonths: 4,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'September-October',
        alternativeSeasons: [
            { months: 'July-August', yieldReduction: 25, warning: 'Late planting may result in lower yields due to moisture stress.' }
        ]
    },
    maize: {
        name: 'Maize',
        seedCostPerAcre: 30000,
        fertilizerCostPerAcre: 45000,
        laborCostPerAcre: 45000,
        yieldPerAcre: 1500,
        pricePerKg: 400,
        growingMonths: 4,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'August-September',
        alternativeSeasons: [
            { months: 'July-August', yieldReduction: 30, warning: 'Late planting risks drought stress during critical tasseling stage.' },
            { months: 'March-April', yieldReduction: 15, warning: 'Early planting possible if soil moisture is adequate.' }
        ]
    },
    millet: {
        name: 'Millet',
        seedCostPerAcre: 20000,
        fertilizerCostPerAcre: 25000,
        laborCostPerAcre: 35000,
        yieldPerAcre: 1000,
        pricePerKg: 450,
        growingMonths: 3,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'September-October',
        alternativeSeasons: [
            { months: 'July-August', yieldReduction: 20, warning: 'Late planting can reduce grain fill and yield.' }
        ]
    },
    groundnuts: {
        name: 'Groundnuts',
        seedCostPerAcre: 40000,
        fertilizerCostPerAcre: 30000,
        laborCostPerAcre: 50000,
        yieldPerAcre: 800,
        pricePerKg: 700,
        growingMonths: 4,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'October-November',
        alternativeSeasons: [
            { months: 'July-August', yieldReduction: 35, warning: 'Late planting significantly reduces pod formation and yield.' }
        ]
    },
    cassava: {
        name: 'Cassava',
        seedCostPerAcre: 15000,
        fertilizerCostPerAcre: 20000,
        laborCostPerAcre: 35000,
        yieldPerAcre: 8000,
        pricePerKg: 250,
        growingMonths: 10,
        bestSeason: 'March-April (Early rains)',
        harvestTime: '8-12 months after planting',
        alternativeSeasons: [
            { months: 'May-June', yieldReduction: 10, warning: 'Slightly lower yields but still acceptable.' },
            { months: 'July-August', yieldReduction: 30, warning: 'Late planting reduces tuber size and quality.' }
        ]
    },
    cowpeas: {
        name: 'Cowpeas',
        seedCostPerAcre: 25000,
        fertilizerCostPerAcre: 20000,
        laborCostPerAcre: 35000,
        yieldPerAcre: 700,
        pricePerKg: 600,
        growingMonths: 3,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'September-October',
        alternativeSeasons: [
            { months: 'July-August', yieldReduction: 25, warning: 'Late planting reduces pod setting and seed quality.' }
        ]
    },
    sesame: {
        name: 'Sesame',
        seedCostPerAcre: 20000,
        fertilizerCostPerAcre: 20000,
        laborCostPerAcre: 35000,
        yieldPerAcre: 500,
        pricePerKg: 800,
        growingMonths: 4,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'October-November',
        alternativeSeasons: [
            { months: 'July-August', yieldReduction: 30, warning: 'Late planting reduces oil content and yield.' }
        ]
    },
    sweetpotato: {
        name: 'Sweet Potato',
        seedCostPerAcre: 20000,
        fertilizerCostPerAcre: 20000,
        laborCostPerAcre: 40000,
        yieldPerAcre: 6000,
        pricePerKg: 300,
        growingMonths: 5,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: '4-6 months after planting',
        alternativeSeasons: [
            { months: 'March-April', yieldReduction: 10, warning: 'Early planting is possible with irrigation.' },
            { months: 'July-August', yieldReduction: 20, warning: 'Late planting reduces tuber size.' }
        ]
    },
    beans: {
        name: 'Beans',
        seedCostPerAcre: 30000,
        fertilizerCostPerAcre: 25000,
        laborCostPerAcre: 40000,
        yieldPerAcre: 800,
        pricePerKg: 550,
        growingMonths: 3,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'September-October',
        alternativeSeasons: [
            { months: 'July-August', yieldReduction: 30, warning: 'Late planting reduces pod formation and bean quality.' }
        ]
    },
    okra: {
        name: 'Okra',
        seedCostPerAcre: 15000,
        fertilizerCostPerAcre: 30000,
        laborCostPerAcre: 45000,
        yieldPerAcre: 4000,
        pricePerKg: 350,
        growingMonths: 3,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'September-October',
        alternativeSeasons: [
            { months: 'March-April', yieldReduction: 10, warning: 'Early planting possible with adequate moisture.' },
            { months: 'July-August', yieldReduction: 25, warning: 'Late planting reduces yield and pod quality.' }
        ]
    },
    tomato: {
        name: 'Tomato',
        seedCostPerAcre: 35000,
        fertilizerCostPerAcre: 50000,
        laborCostPerAcre: 60000,
        yieldPerAcre: 5000,
        pricePerKg: 400,
        growingMonths: 4,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'September-October',
        alternativeSeasons: [
            { months: 'March-April', yieldReduction: 15, warning: 'Early planting possible with irrigation.' },
            { months: 'July-August', yieldReduction: 35, warning: 'Late planting increases disease risk and reduces yield.' }
        ]
    },
    onion: {
        name: 'Onion',
        seedCostPerAcre: 25000,
        fertilizerCostPerAcre: 35000,
        laborCostPerAcre: 50000,
        yieldPerAcre: 4000,
        pricePerKg: 450,
        growingMonths: 5,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'October-November',
        alternativeSeasons: [
            { months: 'March-April', yieldReduction: 20, warning: 'Early planting possible in well-drained soils.' },
            { months: 'July-August', yieldReduction: 40, warning: 'Late planting significantly reduces bulb size and yield.' }
        ]
    },
    pumpkin: {
        name: 'Pumpkin',
        seedCostPerAcre: 15000,
        fertilizerCostPerAcre: 20000,
        laborCostPerAcre: 30000,
        yieldPerAcre: 3000,
        pricePerKg: 250,
        growingMonths: 4,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'October-November',
        alternativeSeasons: [
            { months: 'July-August', yieldReduction: 20, warning: 'Late planting reduces fruit size.' }
        ]
    },
    yam: {
        name: 'Yam',
        seedCostPerAcre: 40000,
        fertilizerCostPerAcre: 25000,
        laborCostPerAcre: 45000,
        yieldPerAcre: 5000,
        pricePerKg: 350,
        growingMonths: 8,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'October-November',
        alternativeSeasons: [
            { months: 'March-April', yieldReduction: 15, warning: 'Early planting possible with adequate moisture.' },
            { months: 'July-August', yieldReduction: 30, warning: 'Late planting reduces tuber size.' }
        ]
    },
    sugarcane: {
        name: 'Sugarcane',
        seedCostPerAcre: 35000,
        fertilizerCostPerAcre: 40000,
        laborCostPerAcre: 50000,
        yieldPerAcre: 30000,
        pricePerKg: 100,
        growingMonths: 11,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: '10-12 months after planting',
        alternativeSeasons: [
            { months: 'March-April', yieldReduction: 10, warning: 'Early planting possible with irrigation.' },
            { months: 'July-August', yieldReduction: 25, warning: 'Late planting reduces sugar content.' }
        ]
    },
    rice: {
        name: 'Rice',
        seedCostPerAcre: 30000,
        fertilizerCostPerAcre: 40000,
        laborCostPerAcre: 50000,
        yieldPerAcre: 1800,
        pricePerKg: 450,
        growingMonths: 5,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'October-November',
        alternativeSeasons: [
            { months: 'July-August', yieldReduction: 20, warning: 'Late planting reduces tillering and grain fill.' }
        ]
    },
    sunflower: {
        name: 'Sunflower',
        seedCostPerAcre: 20000,
        fertilizerCostPerAcre: 25000,
        laborCostPerAcre: 35000,
        yieldPerAcre: 600,
        pricePerKg: 700,
        growingMonths: 4,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'October-November',
        alternativeSeasons: [
            { months: 'July-August', yieldReduction: 25, warning: 'Late planting reduces seed set and oil content.' }
        ]
    },
    banana: {
        name: 'Banana',
        seedCostPerAcre: 50000,
        fertilizerCostPerAcre: 35000,
        laborCostPerAcre: 50000,
        yieldPerAcre: 8000,
        pricePerKg: 300,
        growingMonths: 10,
        bestSeason: 'Year-round (with adequate irrigation)',
        harvestTime: '8-12 months after planting',
        alternativeSeasons: [
            { months: 'May-June', yieldReduction: 0, warning: 'Best planted at start of rains for optimum growth.' },
            { months: 'July-August', yieldReduction: 10, warning: 'May need irrigation if dry conditions persist.' }
        ]
    },
    watermelon: {
        name: 'Watermelon',
        seedCostPerAcre: 25000,
        fertilizerCostPerAcre: 30000,
        laborCostPerAcre: 40000,
        yieldPerAcre: 5000,
        pricePerKg: 350,
        growingMonths: 3,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'September-October',
        alternativeSeasons: [
            { months: 'March-April', yieldReduction: 15, warning: 'Early planting possible with irrigation.' },
            { months: 'July-August', yieldReduction: 30, warning: 'Late planting reduces fruit size and quality.' }
        ]
    },
    cabbage: {
        name: 'Cabbage',
        seedCostPerAcre: 20000,
        fertilizerCostPerAcre: 35000,
        laborCostPerAcre: 45000,
        yieldPerAcre: 4000,
        pricePerKg: 300,
        growingMonths: 4,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'September-October',
        alternativeSeasons: [
            { months: 'March-April', yieldReduction: 10, warning: 'Early planting possible with adequate moisture.' },
            { months: 'July-August', yieldReduction: 25, warning: 'Late planting increases pest pressure.' }
        ]
    },
    pigeonpeas: {
        name: 'Pigeon Peas',
        seedCostPerAcre: 25000,
        fertilizerCostPerAcre: 20000,
        laborCostPerAcre: 35000,
        yieldPerAcre: 600,
        pricePerKg: 600,
        growingMonths: 5,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'October-November',
        alternativeSeasons: [
            { months: 'July-August', yieldReduction: 20, warning: 'Late planting reduces pod set.' }
        ]
    },
    mangoes: {
        name: 'Mangoes',
        seedCostPerAcre: 40000,
        fertilizerCostPerAcre: 25000,
        laborCostPerAcre: 35000,
        yieldPerAcre: 5000,
        pricePerKg: 400,
        growingMonths: 12,
        bestSeason: 'March-April (Before rains)',
        harvestTime: 'November-January',
        alternativeSeasons: [
            { months: 'May-June', yieldReduction: 15, warning: 'Planting during heavy rains may cause root rot.' },
            { months: 'July-August', yieldReduction: 30, warning: 'Late planting delays establishment.' }
        ]
    },
    coffee: {
        name: 'Coffee',
        seedCostPerAcre: 45000,
        fertilizerCostPerAcre: 30000,
        laborCostPerAcre: 50000,
        yieldPerAcre: 800,
        pricePerKg: 1200,
        growingMonths: 12,
        bestSeason: 'Beginning of rains (Green Belt region)',
        harvestTime: 'Dry season',
        alternativeSeasons: [
            { months: 'May-June', yieldReduction: 10, warning: 'Planting at start of rains is ideal for establishment.' },
            { months: 'July-August', yieldReduction: 25, warning: 'Late planting stresses young plants.' }
        ]
    },
    tea: {
        name: 'Tea',
        seedCostPerAcre: 40000,
        fertilizerCostPerAcre: 30000,
        laborCostPerAcre: 45000,
        yieldPerAcre: 1000,
        pricePerKg: 800,
        growingMonths: 12,
        bestSeason: 'Rainy season (Green Belt region)',
        harvestTime: 'Year-round',
        alternativeSeasons: [
            { months: 'May-June', yieldReduction: 10, warning: 'Planting at start of rains is ideal.' },
            { months: 'July-August', yieldReduction: 20, warning: 'Late planting may require irrigation.' }
        ]
    },
    tobacco: {
        name: 'Tobacco',
        seedCostPerAcre: 35000,
        fertilizerCostPerAcre: 35000,
        laborCostPerAcre: 60000,
        yieldPerAcre: 1000,
        pricePerKg: 1000,
        growingMonths: 5,
        bestSeason: 'Beginning of rains (Yei, Kajo-Keji, Maridi, Magwi)',
        harvestTime: 'Dry season',
        alternativeSeasons: [
            { months: 'May-June', yieldReduction: 10, warning: 'Plant at start of rains for optimal growth.' },
            { months: 'July-August', yieldReduction: 30, warning: 'Late planting reduces leaf quality.' }
        ]
    },
    cotton: {
        name: 'Cotton',
        seedCostPerAcre: 30000,
        fertilizerCostPerAcre: 30000,
        laborCostPerAcre: 50000,
        yieldPerAcre: 800,
        pricePerKg: 900,
        growingMonths: 6,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'October-November',
        alternativeSeasons: [
            { months: 'July-August', yieldReduction: 30, warning: 'Late planting reduces boll development.' }
        ]
    },
    soybean: {
        name: 'Soybean',
        seedCostPerAcre: 35000,
        fertilizerCostPerAcre: 25000,
        laborCostPerAcre: 40000,
        yieldPerAcre: 700,
        pricePerKg: 650,
        growingMonths: 4,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'September-October',
        alternativeSeasons: [
            { months: 'July-August', yieldReduction: 25, warning: 'Late planting reduces pod fill and bean size.' }
        ]
    },
    fingermillet: {
        name: 'Finger Millet',
        seedCostPerAcre: 20000,
        fertilizerCostPerAcre: 20000,
        laborCostPerAcre: 35000,
        yieldPerAcre: 900,
        pricePerKg: 500,
        growingMonths: 4,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'September-October',
        alternativeSeasons: [
            { months: 'July-August', yieldReduction: 20, warning: 'Late planting reduces grain fill.' }
        ]
    },
    pearlmillet: {
        name: 'Pearl Millet',
        seedCostPerAcre: 20000,
        fertilizerCostPerAcre: 20000,
        laborCostPerAcre: 35000,
        yieldPerAcre: 900,
        pricePerKg: 500,
        growingMonths: 3,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'September-October',
        alternativeSeasons: [
            { months: 'July-August', yieldReduction: 15, warning: 'Late planting reduces yield but still possible in drier areas.' }
        ]
    },
    eggplant: {
        name: 'Eggplant',
        seedCostPerAcre: 20000,
        fertilizerCostPerAcre: 30000,
        laborCostPerAcre: 45000,
        yieldPerAcre: 3500,
        pricePerKg: 350,
        growingMonths: 4,
        bestSeason: 'May-June (Beginning of rains)',
        harvestTime: 'August-October',
        alternativeSeasons: [
            { months: 'March-April', yieldReduction: 10, warning: 'Early planting possible in Juba, Yambio, Yei with irrigation.' },
            { months: 'July-August', yieldReduction: 30, warning: 'Late planting reduces fruit set and quality.' }
        ]
    }
};

// ============================================================
// TRANSLATION FUNCTIONS
// ============================================================

function getCurrentLanguage() {
    const selector = document.getElementById('languageSwitcher');
    return selector ? selector.value : 'en';
}

function getTranslation(key) {
    const lang = getCurrentLanguage();
    const t = costForecast && costForecast[lang] ? costForecast[lang] : 
              (costForecast && costForecast.en ? costForecast.en : {});
    return t[key] || key;
}

function applyCostForecastTranslations() {
    const lang = getCurrentLanguage();
    const t = costForecast && costForecast[lang] ? costForecast[lang] : 
              (costForecast && costForecast.en ? costForecast.en : {});

    if (!t || Object.keys(t).length === 0) {
        console.warn('Cost forecast translations not loaded');
        return;
    }

    // Hero Section
    const heroTitle = document.querySelector('.forecast-hero h2');
    if (heroTitle && t.forecastTitle) {
        heroTitle.innerHTML = t.forecastTitle;
    }

    const heroDesc = document.querySelector('.forecast-hero p');
    if (heroDesc && t.forecastDesc) {
        heroDesc.textContent = t.forecastDesc;
    }

    // Section Label
    const sectionLabel = document.querySelector('.section-label');
    if (sectionLabel && t.costSimulator) {
        sectionLabel.textContent = t.costSimulator;
    }

    // Form
    const formTitle = document.querySelector('.forecast-form h3');
    if (formTitle && t.enterFarmDetails) {
        formTitle.textContent = t.enterFarmDetails;
    }

    const subtitle = document.querySelector('.forecast-form .subtitle');
    if (subtitle && t.simulatorSubtitle) {
        subtitle.textContent = t.simulatorSubtitle;
    }

    const cropLabel = document.querySelector('.form-group label[for="cropSelect"]');
    if (cropLabel && t.selectCrop) {
        cropLabel.textContent = t.selectCrop;
    }

    const landLabel = document.querySelector('.form-group label[for="landSize"]');
    if (landLabel && t.landSize) {
        landLabel.textContent = t.landSize;
    }

    const landHint = document.querySelector('.form-group .hint');
    if (landHint && t.landSizeHint) {
        landHint.textContent = t.landSizeHint;
    }

    const calcBtn = document.getElementById('calculateBtn');
    if (calcBtn && t.calculateCost) {
        calcBtn.textContent = t.calculateCost;
    }

    // Results
    const resultsTitle = document.querySelector('.results-header h3');
    if (resultsTitle && t.resultsTitle) {
        const cropNameSpan = resultsTitle.querySelector('.crop-name');
        if (cropNameSpan) {
            resultsTitle.innerHTML = t.resultsTitle + ' <span class="crop-name" id="resultCropName">—</span>';
        } else {
            resultsTitle.textContent = t.resultsTitle + ' —';
        }
    }

    // Season Info Labels
    const seasonLabels = document.querySelectorAll('#seasonInfo .row .label');
    if (seasonLabels.length >= 3) {
        if (t.bestPlantingSeason) seasonLabels[0].textContent = t.bestPlantingSeason;
        if (t.growingPeriod) seasonLabels[1].textContent = t.growingPeriod;
        if (t.harvestTime) seasonLabels[2].textContent = t.harvestTime;
    }

    // Warning
    const warningTitle = document.getElementById('warningTitle');
    if (warningTitle && t.warningTitle) {
        warningTitle.textContent = t.warningTitle;
    }

    const warningDesc = document.getElementById('warningDesc');
    if (warningDesc && t.warningDesc) {
        warningDesc.textContent = t.warningDesc;
    }

    // Yield Impact Label
    const yieldImpact = document.querySelector('.yield-impact');
    if (yieldImpact && t.estimatedYieldReduction) {
        const highlight = yieldImpact.querySelector('.highlight');
        if (highlight) {
            yieldImpact.innerHTML = t.estimatedYieldReduction + ' <span class="highlight" id="yieldReduction">—</span>';
        } else {
            yieldImpact.textContent = t.estimatedYieldReduction + ' —';
        }
    }

    // Result Cards
    const resultLabels = document.querySelectorAll('.result-card .label');
    const resultLabelsText = ['totalCost', 'estimatedYield', 'estimatedRevenue', 'estimatedProfit'];
    resultLabels.forEach((label, index) => {
        if (index < resultLabelsText.length && t[resultLabelsText[index]]) {
            label.textContent = t[resultLabelsText[index]];
        }
    });

    // Cost Breakdown
    const breakdownTitle = document.querySelector('.result-breakdown h4');
    if (breakdownTitle && t.costBreakdown) {
        breakdownTitle.textContent = t.costBreakdown;
    }

    const breakdownItems = document.querySelectorAll('.breakdown-item .label');
    const breakdownLabels = ['seedCost', 'fertilizerCost', 'laborCost', 'totalCost'];
    breakdownItems.forEach((item, index) => {
        if (index < breakdownLabels.length && t[breakdownLabels[index]]) {
            item.textContent = t[breakdownLabels[index]];
        }
    });

    // Result Note
    const resultNote = document.querySelector('.result-note span');
    if (resultNote && t.resultNote) {
        resultNote.textContent = t.resultNote;
    }

    // Crop Options in Select
    const cropSelectElement = document.getElementById('cropSelect');
    if (cropSelectElement) {
        const options = cropSelectElement.querySelectorAll('option');
        options.forEach(option => {
            const value = option.value;
            if (value && t[value]) {
                option.textContent = t[value];
            }
            if (value === '' && t.selectCrop) {
                option.textContent = '— ' + t.selectCrop + ' —';
            }
        });
    }
}

// ============================================================
// DOM ELEMENTS
// ============================================================

const cropSelect = document.getElementById('cropSelect');
const landSize = document.getElementById('landSize');
const calculateBtn = document.getElementById('calculateBtn');
const resultsPanel = document.getElementById('resultsPanel');

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function formatCurrency(amount) {
    const lang = getCurrentLanguage();
    if (lang === 'juba') {
        return 'جنيه سوداني ' + Number(amount).toLocaleString('ar-SA');
    }
    return 'SSP ' + Number(amount).toLocaleString();
}

function formatNumber(num) {
    const lang = getCurrentLanguage();
    if (lang === 'juba') {
        return Number(num).toLocaleString('ar-SA');
    }
    return Number(num).toLocaleString();
}

// ============================================================
// MAIN CALCULATE FUNCTION
// ============================================================

function calculateCosts() {
    const cropKey = cropSelect.value;
    const acres = parseFloat(landSize.value);

    if (!cropKey || !acres || acres <= 0) {
        const t = costForecast && costForecast[getCurrentLanguage()] ? 
                  costForecast[getCurrentLanguage()] : 
                  (costForecast && costForecast.en ? costForecast.en : {});
        alert(t.selectCrop || 'Please select a crop and enter a valid land size.');
        return;
    }

    const crop = cropData[cropKey];
    if (!crop) return;

    // Calculate costs
    const seedCost = crop.seedCostPerAcre * acres;
    const fertilizerCost = crop.fertilizerCostPerAcre * acres;
    const laborCost = crop.laborCostPerAcre * acres;
    const totalCost = seedCost + fertilizerCost + laborCost;
    const yieldKg = crop.yieldPerAcre * acres;
    const revenue = yieldKg * crop.pricePerKg;
    const profit = revenue - totalCost;

    // Update season info
    const lang = getCurrentLanguage();
    const t = costForecast && costForecast[lang] ? costForecast[lang] : 
              (costForecast && costForecast.en ? costForecast.en : {});

    document.getElementById('seasonValue').textContent = crop.bestSeason;
    document.getElementById('growingPeriod').textContent = crop.growingMonths + ' ' + (t.months || 'months');
    document.getElementById('harvestTime').textContent = crop.harvestTime;

    // Check for alternative season warnings
    const warningEl = document.getElementById('seasonWarning');
    const yieldReductionEl = document.getElementById('yieldReduction');
    
    if (crop.alternativeSeasons && crop.alternativeSeasons.length > 0) {
        const altSeason = crop.alternativeSeasons[0];
        warningEl.classList.add('show');
        
        if (altSeason.yieldReduction >= 30) {
            warningEl.classList.add('danger');
        } else {
            warningEl.classList.remove('danger');
        }
        
        const warningTitle = document.getElementById('warningTitle');
        if (warningTitle) {
            warningTitle.textContent = (t.caution || 'Caution') + ': ' + altSeason.months + ' ' + (t.planting || 'Planting');
        }
        
        const warningDesc = document.getElementById('warningDesc');
        if (warningDesc) {
            warningDesc.textContent = altSeason.warning;
        }
        
        if (yieldReductionEl) {
            const reductionText = lang === 'juba' ? 'انخفاض الإنتاج المتوقع: ' : (t.estimatedYieldReduction || 'Estimated yield reduction:');
            yieldReductionEl.innerHTML = reductionText + ' <span class="highlight">' + altSeason.yieldReduction + '%</span>';
        }
    } else {
        warningEl.classList.remove('show', 'danger');
    }

    // Update results
    document.getElementById('resultCropName').textContent = crop.name;
    document.getElementById('seedCost').textContent = formatCurrency(seedCost);
    document.getElementById('fertilizerCost').textContent = formatCurrency(fertilizerCost);
    document.getElementById('laborCost').textContent = formatCurrency(laborCost);
    document.getElementById('totalCostBreakdown').textContent = formatCurrency(totalCost);

    document.getElementById('totalCostValue').textContent = formatCurrency(totalCost);
    document.getElementById('yieldValue').textContent = formatNumber(yieldKg) + ' kg';
    document.getElementById('revenueValue').textContent = formatCurrency(revenue);
    
    const profitEl = document.getElementById('profitValue');
    profitEl.textContent = formatCurrency(profit);
    profitEl.className = 'value ' + (profit >= 0 ? 'positive' : 'negative');

    resultsPanel.classList.add('active');
    resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================================
// EVENT LISTENERS
// ============================================================

// Auto-calculate when crop or land size changes
cropSelect.addEventListener('change', function() {
    if (cropSelect.value && landSize.value > 0) {
        calculateCosts();
    }
});

landSize.addEventListener('input', function() {
    if (cropSelect.value && landSize.value > 0) {
        calculateCosts();
    }
});

calculateBtn.addEventListener('click', calculateCosts);

// Allow Enter key on land size input
landSize.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateCosts();
    }
});

// ============================================================
// DOM CONTENT LOADED
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // Apply translations
    applyCostForecastTranslations();
    
    // Listen for language changes
    const languageSwitcher = document.getElementById('languageSwitcher');
    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', function() {
            applyCostForecastTranslations();
            // Re-calculate if there's a result showing
            if (cropSelect.value && landSize.value > 0) {
                calculateCosts();
            }
        });
    }
});

// Also listen for the global languagechange event
document.addEventListener('languagechange', function() {
    applyCostForecastTranslations();
    if (cropSelect.value && landSize.value > 0) {
        calculateCosts();
    }
});

// ============================================================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE
// ============================================================

window.calculateCosts = calculateCosts;
window.applyCostForecastTranslations = applyCostForecastTranslations;
window.formatCurrency = formatCurrency;
window.formatNumber = formatNumber;
