// USSD simulator — talks to the real backend USSD endpoint when reachable,
// and falls back to the built-in client-side simulation when offline.
const USSD_ENDPOINT     = 'https://smartfarmer-m7x3.onrender.com/ussd';
const USSD_SERVICE_CODE = '*384*12990#';
const USSD_TIMEOUT_MS   = 8000;

let inputPath    = [];                     // accumulated USSD entries, joined by '*'
let sessionId    = 'sim-' + Date.now();    // one id per USSD session
let sessionEnded = false;
let busy         = false;

// Local fallback data (mirrors the backend menu structure)
const CROPS = {
  '1': {
    name: 'Sorghum',
    planting: `Smart Farmer\nSorghum - Planting Guide\n\nPlant April-August.\nPlough soil 20cm deep.\nRow spacing: 60-75cm.\nSeed depth: 3-4cm.\nWait for first rain.\n\nTip: Do not plant in\ndry soil.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nSorghum - Pest Control\n\nWatch for armyworms\nafter first rain.\nCheck fields weekly.\nUse yellow traps.\nSpray if needed.\n\nTip: Yellow leaves or\nholes in stem = act fast.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nSorghum - Harvest Guide\n\nReady: 90-120 days.\nGrains turn brown/red.\nLower leaves dry out.\n\nStorage:\nDry well before storing.\nUse sealed bags.\nCheck every 2 weeks.\n\n0. Back\n00. Main Menu`
  },
  '2': {
    name: 'Maize',
    planting: `Smart Farmer\nMaize - Planting Guide\n\nPlant March-July.\nAdd organic compost.\n2 seeds per hole, 5cm.\nRow spacing: 75cm.\n\nTip: Needs regular\nwatering during grain\nformation.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nMaize - Pest Control\n\nWatch for fall armyworm\nin the funnel.\nCheck leaf undersides\nfor eggs.\nRemove infected plants.\n\nTip: Rotate crops\nevery season.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nMaize - Harvest Guide\n\nReady: 90-100 days.\nLeaves around cob\ndry and turn brown.\n\nStorage:\nRemove husks.\nSun-dry 3-5 days.\nStore in waxed bags.\n\n0. Back\n00. Main Menu`
  },
  '3': {
    name: 'Millet',
    planting: `Smart Farmer\nMillet - Planting Guide\n\nPlant May-September.\nTolerates drought well.\nPlough to 15cm depth.\n5-6 seeds per hole.\nRow spacing: 50-60cm.\n\nTip: Needs rain during\nflowering stage.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nMillet - Pest Control\n\nMain threat: Birds.\nPlace bird scarers\nin the field.\nInspect grain heads\nweekly.\n\nTip: Guard field from\nbirds near harvest.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nMillet - Harvest Guide\n\nReady: 75-90 days.\nGrains turn golden brown.\n\nStorage:\nCut heads, sun-dry\none week.\nRub to separate grain.\nKeeps up to 1 year.\n\n0. Back\n00. Main Menu`
  },
  '4': {
    name: 'Groundnuts',
    planting: `Smart Farmer\nGroundnuts - Planting\n\nPlant April-August.\nNeeds light sandy soil.\nSeed depth: 5-6cm.\nRow spacing: 45-50cm.\nNo nitrogen fertiliser.\n\nTip: Heavy clay soil\ndamages pod formation.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nGroundnuts - Pest Control\n\nWatch for leaf spot\n(brown-yellow spots).\nDo not overwater.\nSpray fungicide early.\nRotate with maize.\n\nTip: Excess moisture\ncauses aflatoxin.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nGroundnuts - Harvest\n\nReady: 90-120 days.\nPull one plant to check.\nPods mature when veins\ndarken inside.\n\nStorage:\nSun-dry 2-3 days.\nNEVER store wet.\nBecomes toxic if wet.\n\n0. Back\n00. Main Menu`
  },
  '5': {
    name: 'Cassava',
    planting: `Smart Farmer\nCassava - Planting Guide\n\nPlant any time of year.\nBest: start of rains.\nCut stems 25-30cm.\nPlant at an angle.\nSpacing: 1m x 1m.\n\nTip: Use healthy\ndisease-free cuttings.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nCassava - Pest Control\n\nWatch for mealybug\n(small white insect).\nRemove infected leaves\nand burn them.\nUse disease-free\ncuttings always.\n\nTip: Sensitive to\nviral diseases.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nCassava - Harvest Guide\n\nReady: 8-18 months.\nLeaves turn yellow\nwhen tubers ready.\n\nStorage:\nFresh: max 2-3 days.\nPeel and sun-dry\nfor flour.\n\nTip: Harvest only\nwhat you need.\n\n0. Back\n00. Main Menu`
  },
  '6': {
    name: 'Cowpeas',
    planting: `Smart Farmer\nCowpeas - Planting Guide\n\nPlant May-June.\nSpacing: 60cm x 20cm.\n2 seeds per hole.\nDepth: 3-4cm.\n\nTip: Fixes nitrogen\nin soil.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nCowpeas - Pest Control\n\nWatch for aphids and\npod borers.\nCheck pods regularly.\nUse neem spray.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nCowpeas - Harvest\n\nReady: Sept-Oct.\nDry pods turn brown.\nHarvest when dry.\n\nStorage:\nDry thoroughly\nin pods, then shell.\n\n0. Back\n00. Main Menu`
  },
  '7': {
    name: 'Sesame',
    planting: `Smart Farmer\nSesame - Planting Guide\n\nPlant May-June.\nSpacing: 45cm x 15cm.\nDepth: 2-3cm.\n\nTip: Needs well-drained\nsoil for oil content.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nSesame - Pest Control\n\nWatch for leaf spot\nand aphids.\nRemove infected leaves.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nSesame - Harvest\n\nReady: Oct-Nov.\nPods turn brown.\nHarvest when dry.\n\nStorage:\nDry well,\nstore in sealed\ncontainers.\n\n0. Back\n00. Main Menu`
  },
  '8': {
    name: 'Sweet Potato',
    planting: `Smart Farmer\nSweet Potato - Planting\n\nPlant May-June.\nSpacing: 30cm x 20cm.\nUse vine cuttings.\n\nTip: Grows well in\npoor soils.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nSweet Potato - Pest\n\nWatch for weevils and\nleaf beetles.\nRemove infected plants.\nRotate crops.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nSweet Potato - Harvest\n\nReady: 4-6 months.\nLeaves turn yellow.\n\nStorage:\nStore in cool,\ndry, dark place.\n\n0. Back\n00. Main Menu`
  },
  '9': {
    name: 'Beans',
    planting: `Smart Farmer\nBeans - Planting Guide\n\nPlant May-June.\nSpacing: 50cm x 10cm.\nDepth: 3-4cm.\n\nTip: Rich in protein\nand fiber.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nBeans - Pest Control\n\nWatch for aphids and\nbean beetles.\nSpray soapy water.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nBeans - Harvest\n\nReady: Sept-Oct.\nPods dry and turn brown.\n\nStorage:\nDry completely\nbefore storing.\n\n0. Back\n00. Main Menu`
  },
  '10': {
    name: 'Okra',
    planting: `Smart Farmer\nOkra - Planting Guide\n\nPlant May-June.\nSpacing: 60cm x 30cm.\nDepth: 3-4cm.\n\nTip: Grows quickly,\nyields well.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nOkra - Pest Control\n\nWatch for aphids and\nfruit borers.\nCheck pods regularly.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nOkra - Harvest\n\nReady: Sept-Oct.\nHarvest when pods\nare 5-8cm.\n\nStorage:\nStore in cool,\ndry place.\n\n0. Back\n00. Main Menu`
  },
  '11': {
    name: 'Tomato',
    planting: `Smart Farmer\nTomato - Planting Guide\n\nPlant May-June.\nSpacing: 60cm x 40cm.\nDepth: 1-2cm.\n\nTip: High-value\nvegetable crop.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nTomato - Pest Control\n\nWatch for tomato blight\nand fruit borers.\nRemove infected plants.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nTomato - Harvest\n\nReady: Sept-Oct.\nHarvest when ripe.\n\nStorage:\nStore at room\ntemperature.\nNot refrigerated.\n\n0. Back\n00. Main Menu`
  },
  '12': {
    name: 'Onion',
    planting: `Smart Farmer\nOnion - Planting Guide\n\nPlant May-June.\nSpacing: 30cm x 10cm.\nDepth: 2-3cm.\n\nTip: Good storage life.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nOnion - Pest Control\n\nWatch for thrips and\nonion flies.\nCheck bulbs regularly.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nOnion - Harvest\n\nReady: Oct-Nov.\nLeaves fall over.\n\nStorage:\nStore in dry,\nventilated place.\n\n0. Back\n00. Main Menu`
  },
  '13': {
    name: 'Pumpkin',
    planting: `Smart Farmer\nPumpkin - Planting Guide\n\nPlant May-June.\nSpacing: 150cm x 100cm.\nDepth: 3-4cm.\n\nTip: Provides food\nand income.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nPumpkin - Pest Control\n\nWatch for fruit flies\nand powdery mildew.\nRemove infected leaves.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nPumpkin - Harvest\n\nReady: Oct-Nov.\nFruit turns orange.\n\nStorage:\nStore in cool,\ndry place.\n\n0. Back\n00. Main Menu`
  },
  '14': {
    name: 'Yam',
    planting: `Smart Farmer\nYam - Planting Guide\n\nPlant May-June.\nSpacing: 100cm x 100cm.\nDepth: 10-15cm.\n\nTip: High market\ndemand.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nYam - Pest Control\n\nWatch for yam beetles\nand nematodes.\nUse healthy seed yams.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nYam - Harvest\n\nReady: Oct-Nov.\nLeaves turn yellow.\n\nStorage:\nStore in cool,\ndark, ventilated\nplace.\n\n0. Back\n00. Main Menu`
  },
  '15': {
    name: 'Sugarcane',
    planting: `Smart Farmer\nSugarcane - Planting\n\nPlant May-June.\nSpacing: 150cm x 60cm.\nUse stem cuttings.\n\nTip: Cash crop for\nsugar production.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nSugarcane - Pest\n\nWatch for stalk borers\nand aphids.\nRemove infected stems.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nSugarcane - Harvest\n\nReady: 10-12 months.\nCut when mature.\n\nStorage:\nProcess soon\nafter harvest.\n\n0. Back\n00. Main Menu`
  },
  '16': {
    name: 'Rice',
    planting: `Smart Farmer\nRice - Planting Guide\n\nPlant May-June.\nSpacing: 20cm x 20cm.\nDepth: 2-3cm.\n\nTip: Needs irrigation\nor rainfed areas.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nRice - Pest Control\n\nWatch for rice weevils\nand stem borers.\nCheck fields regularly.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nRice - Harvest\n\nReady: Oct-Nov.\nGrains turn golden.\n\nStorage:\nDry completely,\nstore in sealed\ncontainers.\n\n0. Back\n00. Main Menu`
  },
  '17': {
    name: 'Sunflower',
    planting: `Smart Farmer\nSunflower - Planting\n\nPlant May-June.\nSpacing: 60cm x 30cm.\nDepth: 3-4cm.\n\nTip: Oilseed crop\nwith good demand.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nSunflower - Pest\n\nWatch for birds and\nhead caterpillars.\nProtect heads.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nSunflower - Harvest\n\nReady: Oct-Nov.\nHeads turn brown.\n\nStorage:\nDry thoroughly,\nstore in sealed bags.\n\n0. Back\n00. Main Menu`
  },
  '18': {
    name: 'Banana',
    planting: `Smart Farmer\nBanana - Planting Guide\n\nPlant Year-round.\nSpacing: 300cm x 300cm.\nUse suckers.\n\nTip: Year-round\nproduction.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nBanana - Pest Control\n\nWatch for weevils and\nleaf spot.\nRemove infected plants.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nBanana - Harvest\n\nReady: 8-12 months.\nBunch turns yellow.\n\nStorage:\nHarvest green,\nripen at room\ntemperature.\n\n0. Back\n00. Main Menu`
  },
  '19': {
    name: 'Watermelon',
    planting: `Smart Farmer\nWatermelon - Planting\n\nPlant May-June.\nSpacing: 200cm x 100cm.\nDepth: 3-4cm.\n\nTip: Popular fruit\nwith high demand.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nWatermelon - Pest\n\nWatch for fruit flies\nand powdery mildew.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nWatermelon - Harvest\n\nReady: Sept-Oct.\nFruit sounds hollow.\n\nStorage:\nStore in cool,\ndry place.\n\n0. Back\n00. Main Menu`
  },
  '20': {
    name: 'Cabbage',
    planting: `Smart Farmer\nCabbage - Planting\n\nPlant May-June.\nSpacing: 60cm x 40cm.\nDepth: 2-3cm.\n\nTip: Leafy vegetable\nwith good demand.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nCabbage - Pest\n\nWatch for aphids and\ncaterpillars.\nCheck leaves regularly.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nCabbage - Harvest\n\nReady: Sept-Oct.\nHeads are firm.\n\nStorage:\nStore in cool,\nventilated place.\n\n0. Back\n00. Main Menu`
  },
  '21': {
    name: 'Pigeon Peas',
    planting: `Smart Farmer\nPigeon Peas - Planting\n\nPlant May-June.\nSpacing: 75cm x 30cm.\nDepth: 3-4cm.\n\nTip: Fixes nitrogen\nin soil.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nPigeon Peas - Pest\n\nWatch for pod borers\nand wilt.\nRemove infected plants.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nPigeon Peas - Harvest\n\nReady: Oct-Nov.\nPods turn brown.\n\nStorage:\nDry thoroughly,\nstore in sealed\ncontainers.\n\n0. Back\n00. Main Menu`
  },
  '22': {
    name: 'Mangoes',
    planting: `Smart Farmer\nMangoes - Planting\n\nPlant March-April.\nSpacing: 1000cm x 800cm.\n\nTip: Popular fruit\nacross the country.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nMangoes - Pest\n\nWatch for fruit flies\nand mealybugs.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nMangoes - Harvest\n\nReady: Nov-Jan.\nFruit turns yellow.\n\nStorage:\nStore at room\ntemperature\nuntil ripe.\n\n0. Back\n00. Main Menu`
  },
  '23': {
    name: 'Coffee',
    planting: `Smart Farmer\nCoffee - Planting\n\nPlant beginning of rains.\nSpacing: 250cm x 250cm.\n\nTip: Cash crop in\nGreen Belt region.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nCoffee - Pest\n\nWatch for coffee\nberry borer.\nCheck berries.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nCoffee - Harvest\n\nReady: Dry season.\nBerries turn red.\n\nStorage:\nDry and store\nin cool, dry place.\n\n0. Back\n00. Main Menu`
  },
  '24': {
    name: 'Tea',
    planting: `Smart Farmer\nTea - Planting Guide\n\nPlant rainy season.\nSpacing: 100cm x 75cm.\n\nTip: Cash crop in\nGreen Belt region.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nTea - Pest Control\n\nWatch for tea\nmosquito bug.\nCheck leaves.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nTea - Harvest\n\nReady: Year-round.\nPick young leaves.\n\nStorage:\nProcess and dry\nsoon after harvest.\n\n0. Back\n00. Main Menu`
  },
  '25': {
    name: 'Tobacco',
    planting: `Smart Farmer\nTobacco - Planting\n\nPlant beginning of rains.\nSpacing: 90cm x 60cm.\n\nTip: Cash crop in\nYei, Maridi, Magwi.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nTobacco - Pest\n\nWatch for aphids\nand hornworms.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nTobacco - Harvest\n\nReady: Dry season.\nLeaves turn yellow.\n\nStorage:\nCure and dry\nbefore storage.\n\n0. Back\n00. Main Menu`
  },
  '26': {
    name: 'Cotton',
    planting: `Smart Farmer\nCotton - Planting\n\nPlant May-June.\nSpacing: 100cm x 30cm.\n\nTip: Oil seed cash\ncrop from 1940s.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nCotton - Pest\n\nWatch for bollworms\nand aphids.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nCotton - Harvest\n\nReady: Oct-Nov.\nBolls open.\n\nStorage:\nKeep dry and\nprotected from pests.\n\n0. Back\n00. Main Menu`
  },
  '27': {
    name: 'Soybean',
    planting: `Smart Farmer\nSoybean - Planting\n\nPlant May-June.\nSpacing: 50cm x 10cm.\nDepth: 3-4cm.\n\nTip: High nutritional\nvalue bean.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nSoybean - Pest\n\nWatch for pod borers.\nCheck pods.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nSoybean - Harvest\n\nReady: Sept-Oct.\nPods turn brown.\n\nStorage:\nDry completely\nbefore storing.\n\n0. Back\n00. Main Menu`
  },
  '28': {
    name: 'Finger Millet',
    planting: `Smart Farmer\nFinger Millet - Planting\n\nPlant May-June.\nSpacing: 45cm x 15cm.\nDepth: 2-3cm.\n\nTip: Indigenous crop\nfor low rainfall.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nFinger Millet - Pest\n\nWatch for birds\nand stem borers.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nFinger Millet - Harvest\n\nReady: Sept-Oct.\nHeads turn brown.\n\nStorage:\nStore in sealed\ncontainers.\n\n0. Back\n00. Main Menu`
  },
  '29': {
    name: 'Pearl Millet',
    planting: `Smart Farmer\nPearl Millet - Planting\n\nPlant May-June.\nSpacing: 60cm x 20cm.\nDepth: 2-3cm.\n\nTip: Hardy grain for\nlow rainfall areas.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nPearl Millet - Pest\n\nWatch for birds\nand stem borers.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nPearl Millet - Harvest\n\nReady: Sept-Oct.\nHeads turn brown.\n\nStorage:\nStore in sealed\ncontainers.\n\n0. Back\n00. Main Menu`
  },
  '30': {
    name: 'Eggplant',
    planting: `Smart Farmer\nEggplant - Planting\n\nPlant May-June.\nSpacing: 60cm x 45cm.\nDepth: 2-3cm.\n\nTip: Versatile\nvegetable for stews.\n\n0. Back\n00. Main Menu`,
    pest: `Smart Farmer\nEggplant - Pest\n\nWatch for flea beetles\nand fruit borers.\n\n0. Back\n00. Main Menu`,
    harvest: `Smart Farmer\nEggplant - Harvest\n\nReady: Aug-Oct.\nFruit turns purple.\n\nStorage:\nStore in cool,\ndry place.\n\n0. Back\n00. Main Menu`
  }
};

function mainMenu() {
    return {
        header: '*384*12990#',
        body: `Smart Farmer\nFarming Info System\n\nWelcome! Choose a crop:\n\n1. Sorghum\n2. Maize\n3. Millet\n4. Groundnuts\n5. Cassava\n6. Cowpeas\n7. Sesame\n8. Sweet Potato\n9. Beans\n10. Okra\n11. Tomato\n12. Onion\n13. Pumpkin\n14. Yam\n15. Sugarcane\n16. Rice\n17. Sunflower\n18. Banana\n19. Watermelon\n20. Cabbage\n21. Pigeon Peas\n22. Mangoes\n23. Coffee\n24. Tea\n25. Tobacco\n26. Cotton\n27. Soybean\n28. Finger Millet\n29. Pearl Millet\n30. Eggplant\n\n0. Exit`
    };
}

function cropMenuContent(num) {
    return {
        header: `*384*12990*${num}#`,
        body: `Smart Farmer\n${CROPS[num].name}\n\nSelect information:\n\n1. Planting Guide\n2. Pest Control\n3. Harvest Guide\n\n0. Back to crops`
    };
}

function currentHeader() {
    return inputPath.length === 0
        ? USSD_SERVICE_CODE
        : `*384*12990*${inputPath.join('*')}#`;
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function updateScreen(header, body, showInput, showBack, extraHtml) {
    document.getElementById('ussd-header').textContent = header;
    const lines = body.split('\n');
    document.getElementById('ussd-body').innerHTML = lines.map((line, i) => {
        const safe = escapeHtml(line);
        if (i === 0) return `<div class="ussd-title">${safe}</div>`;
        if (i === 1) return `<div class="ussd-subtitle">${safe}</div>`;
        return `<div>${safe || '&nbsp;'}</div>`;
    }).join('') + (extraHtml || '');
    document.getElementById('ussd-input-area').style.display = showInput ? 'flex' : 'none';
    document.getElementById('ussd-back-btn').style.display   = showBack  ? 'block' : 'none';
    document.getElementById('ussd-input').value = '';
}

// ---- Live mode: POST the accumulated path to the real backend ----

function requestBackend(text) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), USSD_TIMEOUT_MS);
    const params = new URLSearchParams({
        sessionId:   sessionId,
        serviceCode: USSD_SERVICE_CODE,
        phoneNumber: '+211000000000',
        text:        text
    });
    return fetch(USSD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
        signal: controller.signal
    }).then((res) => {
        if (!res.ok) throw new Error('USSD backend HTTP ' + res.status);
        return res.text();
    }).then((raw) => {
        const reply = raw.trim() ? raw : '';
        if (!/^(CON|END)[ \n]/.test(reply)) throw new Error('Unexpected USSD response');
        return reply;
    }).finally(() => clearTimeout(timer));
}

// ---- Offline fallback: replay the accumulated path through the local menus ----

function localUssd(text) {
    const segs = text === '' ? [] : text.split('*');
    let level = 'lang', crop = null, topic = null, invalid = false;

    for (const seg of segs) {
        invalid = false;
        if (level === 'lang') {
            // Mirror the backend's language menu; the offline fallback
            // only has English content, so both choices continue in English
            if (seg === '1' || seg === '2') { level = 'main'; }
            else invalid = true;
        } else if (level === 'main') {
            if (CROPS[seg])          { level = 'crop'; crop = seg; }
            else if (seg === '0')    return 'END Thank you for using\nSmart Farmer.';
            else invalid = true;
        } else if (level === 'crop') {
            if (seg === '1' || seg === '2' || seg === '3') { level = 'info'; topic = seg; }
            else if (seg === '0')    { level = 'main'; crop = null; }
            else invalid = true;
        } else { // info screen
            if (seg === '0')         { level = 'crop'; topic = null; }
            else if (seg === '00')   { level = 'main'; crop = null; topic = null; }
            else invalid = true;
        }
    }

    let body;
    if (level === 'lang')      body = 'Smart Farmer\nChoose language / اختر اللغة:\n\n1. English\n2. عربي جوبا';
    else if (level === 'main') body = mainMenu().body;
    else if (level === 'crop') body = cropMenuContent(crop).body;
    else {
        const key = topic === '1' ? 'planting' : topic === '2' ? 'pest' : 'harvest';
        body = CROPS[crop][key];
    }
    if (invalid) body += '\n\nInvalid option. Try again.';
    return 'CON ' + body;
}

// ---- Shared rendering for both modes ----

function renderReply(reply, offline) {
    const ended = reply.startsWith('END');
    const body  = reply.replace(/^(CON|END)[ \n]/, '');
    const note  = offline
        ? '<div style="opacity:.55;font-size:.75em;margin-top:10px;">offline mode</div>'
        : '';

    if (ended) {
        sessionEnded = true;
        const redial = `<button class="ussd-send-btn" style="margin-top:14px;" onclick="restartUssd()">Dial ${USSD_SERVICE_CODE} again</button>`;
        updateScreen(currentHeader(), body, false, false, redial + note);
    } else {
        updateScreen(currentHeader(), body, true, inputPath.length > 0, note);
        const input = document.getElementById('ussd-input');
        if (input) input.focus();
    }
}

function submitPath() {
    if (busy) return;
    busy = true;
    const text = inputPath.join('*');
    document.getElementById('ussd-body').innerHTML =
        '<div class="ussd-subtitle">USSD code running...</div>';

    requestBackend(text)
        .then((reply) => {
            console.log('[USSD] live mode');
            renderReply(reply, false);
        })
        .catch((err) => {
            console.log('[USSD] offline fallback:', err.message);
            renderReply(localUssd(text), true);
        })
        .finally(() => { busy = false; });
}

function handleInput() {
    if (busy || sessionEnded) return;
    const input = document.getElementById('ussd-input').value.trim();
    if (!input) return;
    inputPath.push(input);
    submitPath();
}

function goBack() {
    if (busy || sessionEnded) return;
    inputPath.push('0');   // '0' = back one level; users can type '00' for the main menu
    submitPath();
}

function restartUssd() {
    inputPath    = [];
    sessionId    = 'sim-' + Date.now();
    sessionEnded = false;
    busy         = false;
    submitPath();          // dial with empty text -> main menu
}

document.getElementById('ussd-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleInput();
});

// Initial dial
restartUssd();

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}
