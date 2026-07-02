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

// DOM Elements
const cropSelect = document.getElementById('cropSelect');
const landSize = document.getElementById('landSize');
const calculateBtn = document.getElementById('calculateBtn');
const resultsPanel = document.getElementById('resultsPanel');

function formatCurrency(amount) {
    return 'SSP ' + Number(amount).toLocaleString();
}

function calculateCosts() {
    const cropKey = cropSelect.value;
    const acres = parseFloat(landSize.value);

    if (!cropKey || !acres || acres <= 0) {
        alert('Please select a crop and enter a valid land size.');
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
    document.getElementById('seasonValue').textContent = crop.bestSeason;
    document.getElementById('growingPeriod').textContent = crop.growingMonths + ' months';
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
        
        document.getElementById('warningTitle').textContent = '⚠️ Caution: ' + altSeason.months + ' Planting';
        document.getElementById('warningDesc').textContent = altSeason.warning;
        yieldReductionEl.innerHTML = 'Estimated yield reduction: <span class="highlight">' + altSeason.yieldReduction + '%</span>';
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
    document.getElementById('yieldValue').textContent = yieldKg.toLocaleString() + ' kg';
    document.getElementById('revenueValue').textContent = formatCurrency(revenue);
    
    const profitEl = document.getElementById('profitValue');
    profitEl.textContent = formatCurrency(profit);
    profitEl.className = 'value ' + (profit >= 0 ? 'positive' : 'negative');

    resultsPanel.classList.add('active');
    resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

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
