/* ============================================
   SMART FARMER - USSD Simulator Logic
   Author: Nyabon Deng Adut
   ============================================ */

let currentMenu  = 'main';
let selectedCrop = null;

const CROPS = {
    '1': {
        name: 'Sorghum',
        planting: 'Smart Farmer\nSorghum - Planting Guide\n\nPlant April-August.\nPlough soil 20cm deep.\nRow spacing: 60-75cm.\nSeed depth: 3-4cm.\nWait for first rain.\n\nTip: Do not plant in\ndry soil.\n\n0. Back\n00. Main Menu',
        pest:     'Smart Farmer\nSorghum - Pest Control\n\nWatch for armyworms\nafter first rain.\nCheck fields weekly.\nUse yellow traps.\nSpray if needed.\n\nTip: Yellow leaves or\nholes in stem = act fast.\n\n0. Back\n00. Main Menu',
        harvest:  'Smart Farmer\nSorghum - Harvest Guide\n\nReady: 90-120 days.\nGrains turn brown/red.\nLower leaves dry out.\n\nStorage:\nDry well before storing.\nUse sealed bags.\nCheck every 2 weeks.\n\n0. Back\n00. Main Menu'
    },
    '2': {
        name: 'Maize',
        planting: 'Smart Farmer\nMaize - Planting Guide\n\nPlant March-July.\nAdd organic compost.\n2 seeds per hole, 5cm.\nRow spacing: 75cm.\n\nTip: Needs regular\nwatering during grain\nformation.\n\n0. Back\n00. Main Menu',
        pest:     'Smart Farmer\nMaize - Pest Control\n\nWatch for fall armyworm\nin the funnel.\nCheck leaf undersides.\nRemove infected plants.\n\nTip: Rotate crops\nevery season.\n\n0. Back\n00. Main Menu',
        harvest:  'Smart Farmer\nMaize - Harvest Guide\n\nReady: 90-100 days.\nLeaves around cob\ndry and turn brown.\n\nStorage:\nRemove husks.\nSun-dry 3-5 days.\nStore in waxed bags.\n\n0. Back\n00. Main Menu'
    },
    '3': {
        name: 'Millet',
        planting: 'Smart Farmer\nMillet - Planting Guide\n\nPlant May-September.\nTolerates drought well.\nPlough to 15cm depth.\n5-6 seeds per hole.\nRow spacing: 50-60cm.\n\nTip: Needs rain during\nflowering stage.\n\n0. Back\n00. Main Menu',
        pest:     'Smart Farmer\nMillet - Pest Control\n\nMain threat: Birds.\nPlace bird scarers\nin the field.\nInspect grain heads\nweekly.\n\nTip: Guard field from\nbirds near harvest.\n\n0. Back\n00. Main Menu',
        harvest:  'Smart Farmer\nMillet - Harvest Guide\n\nReady: 75-90 days.\nGrains turn golden brown.\n\nStorage:\nCut heads, sun-dry\none week.\nRub to separate grain.\nKeeps up to 1 year.\n\n0. Back\n00. Main Menu'
    },
    '4': {
        name: 'Groundnuts',
        planting: 'Smart Farmer\nGroundnuts - Planting\n\nPlant April-August.\nNeeds light sandy soil.\nSeed depth: 5-6cm.\nRow spacing: 45-50cm.\nNo nitrogen fertiliser.\n\nTip: Heavy clay soil\ndamages pod formation.\n\n0. Back\n00. Main Menu',
        pest:     'Smart Farmer\nGroundnuts - Pest Control\n\nWatch for leaf spot\n(brown-yellow spots).\nDo not overwater.\nSpray fungicide early.\nRotate with maize.\n\nTip: Excess moisture\ncauses aflatoxin.\n\n0. Back\n00. Main Menu',
        harvest:  'Smart Farmer\nGroundnuts - Harvest\n\nReady: 90-120 days.\nPull one plant to check.\nPods mature when veins\ndarken inside.\n\nStorage:\nSun-dry 2-3 days.\nNEVER store wet.\nBecomes toxic if wet.\n\n0. Back\n00. Main Menu'
    },
    '5': {
        name: 'Cassava',
        planting: 'Smart Farmer\nCassava - Planting Guide\n\nPlant any time of year.\nBest: start of rains.\nCut stems 25-30cm.\nPlant at an angle.\nSpacing: 1m x 1m.\n\nTip: Use healthy\ndisease-free cuttings.\n\n0. Back\n00. Main Menu',
        pest:     'Smart Farmer\nCassava - Pest Control\n\nWatch for mealybug\n(small white insect).\nRemove infected leaves\nand burn them.\nUse disease-free\ncuttings always.\n\nTip: Sensitive to\nviral diseases.\n\n0. Back\n00. Main Menu',
        harvest:  'Smart Farmer\nCassava - Harvest Guide\n\nReady: 8-18 months.\nLeaves turn yellow\nwhen tubers ready.\n\nStorage:\nFresh: max 2-3 days.\nPeel and sun-dry\nfor flour.\n\nTip: Harvest only\nwhat you need.\n\n0. Back\n00. Main Menu'
    }
};

function mainMenuContent() {
    return {
        header: '*384*12990#',
        body: 'Smart Farmer\nFarming Info System\n\nWelcome! Choose a crop:\n\n1. Sorghum\n2. Maize\n3. Millet\n4. Groundnuts\n5. Cassava\n\n0. Back'
    };
}

function cropMenuContent(num) {
    return {
        header: `*384*12990*${num}#`,
        body: `Smart Farmer\n${CROPS[num].name}\n\nSelect information:\n\n1. Planting Guide\n2. Pest Control\n3. Harvest Guide\n\n0. Back to crops`
    };
}

function updateScreen(header, body, showInput, showBack) {
    document.getElementById('ussd-header').textContent = header;
    const lines = body.split('\n');
    document.getElementById('ussd-body').innerHTML = lines.map((line, i) => {
        if (i === 0) return `<div class="ussd-title">${line}</div>`;
        if (i === 1) return `<div class="ussd-subtitle">${line}</div>`;
        return `<div>${line}</div>`;
    }).join('');
    document.getElementById('ussd-input-area').style.display = showInput ? 'flex' : 'none';
    document.getElementById('ussd-back-btn').style.display   = showBack  ? 'block' : 'none';
    document.getElementById('ussd-input').value = '';
}

function handleInput() {
    const input = document.getElementById('ussd-input').value.trim();
    if (currentMenu === 'main') {
        if (CROPS[input]) {
            selectedCrop = input;
            currentMenu  = 'crop';
            const m = cropMenuContent(input);
            updateScreen(m.header, m.body, true, false);
        } else { showError(); }
    } else if (currentMenu === 'crop') {
        if (input === '0') {
            currentMenu = 'main';
            const m = mainMenuContent();
            updateScreen(m.header, m.body, true, false);
        } else if (input === '1') {
            currentMenu = 'info';
            updateScreen(`*384*12990*${selectedCrop}*1#`, CROPS[selectedCrop].planting, false, true);
        } else if (input === '2') {
            currentMenu = 'info';
            updateScreen(`*384*12990*${selectedCrop}*2#`, CROPS[selectedCrop].pest, false, true);
        } else if (input === '3') {
            currentMenu = 'info';
            updateScreen(`*384*12990*${selectedCrop}*3#`, CROPS[selectedCrop].harvest, false, true);
        } else { showError(); }
    }
}

function goBack() {
    if (currentMenu === 'info') {
        currentMenu = 'crop';
        const m = cropMenuContent(selectedCrop);
        updateScreen(m.header, m.body, true, false);
    } else {
        currentMenu = 'main';
        const m = mainMenuContent();
        updateScreen(m.header, m.body, true, false);
    }
}

function showError() {
    document.getElementById('ussd-body').innerHTML =
        '<div class="ussd-title">Smart Farmer</div>' +
        '<div style="color:#c0392b;margin-top:10px;">Invalid option.<br>Please try again.</div>';
    setTimeout(() => {
        if (currentMenu === 'main') {
            const m = mainMenuContent();
            updateScreen(m.header, m.body, true, false);
        } else {
            const m = cropMenuContent(selectedCrop);
            updateScreen(m.header, m.body, true, false);
        }
    }, 1500);
}

document.getElementById('ussd-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleInput();
});

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}
