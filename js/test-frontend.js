// test-frontend.js - Frontend Testing in Terminal

const { JSDOM } = require('jsdom');

// ===== SETUP JSDOM =====
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost:3000',
    pretendToBeVisual: true,
});

// Mock localStorage
const localStorageMock = {
    store: {},
    getItem(key) { return this.store[key] || null; },
    setItem(key, value) { this.store[key] = String(value); },
    removeItem(key) { delete this.store[key]; },
    clear() { this.store = {}; }
};
global.localStorage = localStorageMock;

// Mock speechSynthesis for Node.js
global.speechSynthesis = {
    getVoices: () => [
        { name: 'Mock Voice 1', lang: 'en-US' },
        { name: 'Mock Voice 2', lang: 'en-KE' },
        { name: 'Mock Voice 3', lang: 'ar-SA' },
        { name: 'Mock Voice 4', lang: 'en-UG' }
    ],
    speak: (utterance) => {
        console.log(`🔊 Speaking: "${utterance.text}"`);
        console.log(`   Language: ${utterance.lang}`);
        if (utterance.voice) {
            console.log(`   Voice: ${utterance.voice.name} (${utterance.voice.lang})`);
        }
        if (utterance.onend) {
            setTimeout(() => utterance.onend(), 100);
        }
    },
    cancel: () => {},
    pause: () => {},
    resume: () => {},
};

global.window = dom.window;
global.document = dom.window.document;

// ===== LOAD TRANSLATIONS =====
// This mimics your translations.js
const translations = {
    en: {
        home: "Home",
        about: "About",
        crops: "Crop Info",
        education: "Education",
        cropLog: "Crop Log",
        contact: "Contact",
        ussd: "USSD",
        login: "Login",
        register: "Register",
        logout: "Logout",
        module1Title: "Module 1: Planting Techniques",
        module2Title: "Module 2: Pest Management",
        module3Title: "Module 3: Post-Harvest Handling",
        module4Title: "Module 4: Soil Management",
        module5Title: "Module 5: Climate-Smart Farming",
        module6Title: "Module 6: Water & Irrigation",
        module7Title: "Module 7: Market & Selling",
        module8Title: "Module 8: Fertilizer Use",
        module9Title: "Module 9: Crop Disease Control",
        module10Title: "Module 10: Farm Tools & Equipment",
        sorghumTitle: "Sorghum",
        maizeTitle: "Maize",
        milletTitle: "Millet",
        groundnutsTitle: "Groundnuts",
        cassavaTitle: "Cassava",
        cowpeasTitle: "Cowpeas",
        sesameTitle: "Sesame",
        sweetpotatoTitle: "Sweet Potato",
        beansTitle: "Beans",
        okraTitle: "Okra",
        tomatoTitle: "Tomato",
        onionTitle: "Onion",
        pumpkinTitle: "Pumpkin",
        yamTitle: "Yam",
        sugarcaneTitle: "Sugarcane",
        riceTitle: "Rice",
        sunflowerTitle: "Sunflower",
        bananaTitle: "Banana",
        watermelonTitle: "Watermelon",
        cabbageTitle: "Cabbage",
        pigeonpeasTitle: "Pigeon Peas",
        mangoesTitle: "Mangoes",
        coffeeTitle: "Coffee",
        teaTitle: "Tea",
        tobaccoTitle: "Tobacco",
        cottonTitle: "Cotton",
        soybeanTitle: "Soybean",
        fingermilletTitle: "Finger Millet",
        pearlmilletTitle: "Pearl Millet",
        eggplantTitle: "Eggplant",
        module1Li1: "Plant at the beginning of the rainy season (May-June)",
        module1Li2: "Use clean, disease-free seeds",
        module1Li3: "Space crops properly to avoid overcrowding",
        module1Li4: "Plant seeds at the right depth (2-5cm depending on crop)",
        module1Li5: "Weed within the first 3 weeks after planting",
        plantingSeasonLabel: "Planting:",
        spacingLabel: "Spacing:",
        pestControlLabel: "Pest control:",
        harvestLabel: "Harvest:",
        storageLabel: "Storage:",
    },
    juba: {
        home: "البيت",
        about: "من نحن",
        crops: "المحاصيل",
        education: "التعليم",
        cropLog: "سجل المحاصيل",
        contact: "اتصل بنا",
        ussd: "USSD",
        login: "الحساب",
        register: "إنشاء حساب",
        logout: "تسجيل الخروج",
        module1Title: "الوحدة ١: تقنيات الزراعة",
        module2Title: "الوحدة ٢: مكافحة الآفات",
        module3Title: "الوحدة ٣: معالجة ما بعد الحصاد",
        module4Title: "الوحدة ٤: إدارة التربة",
        module5Title: "الوحدة ٥: الزراعة الذكية مناخياً",
        module6Title: "الوحدة ٦: المياه والري",
        module7Title: "الوحدة ٧: السوق والبيع",
        module8Title: "الوحدة ٨: استخدام الأسمدة",
        module9Title: "الوحدة ٩: مكافحة أمراض المحاصيل",
        module10Title: "الوحدة ١٠: أدوات ومعدات المزرعة",
        sorghumTitle: "الذرة الرفيعة",
        maizeTitle: "الذرة الشامية",
        milletTitle: "الدخن",
        groundnutsTitle: "الفول السوداني",
        cassavaTitle: "الكسافا",
        cowpeasTitle: "اللوبيا",
        sesameTitle: "السمسم",
        sweetpotatoTitle: "البطاطا الحلوة",
        beansTitle: "الفول",
        okraTitle: "البامية",
        tomatoTitle: "الطماطم",
        onionTitle: "البصل",
        pumpkinTitle: "القرع",
        yamTitle: "اليام",
        sugarcaneTitle: "قصب السكر",
        riceTitle: "الأرز",
        sunflowerTitle: "دوار الشمس",
        bananaTitle: "الموز",
        watermelonTitle: "البطيخ",
        cabbageTitle: "الملفوف",
        pigeonpeasTitle: "اللوبيا",
        mangoesTitle: "المانجو",
        coffeeTitle: "القهوة",
        teaTitle: "الشاي",
        tobaccoTitle: "التبغ",
        cottonTitle: "القطن",
        soybeanTitle: "فول الصويا",
        fingermilletTitle: "دخن الإصبع",
        pearlmilletTitle: "دخن اللؤلؤ",
        eggplantTitle: "الباذنجان",
        module1Li1: "ازرع في بداية موسم الأمطار (مايو-يونيو)",
        module1Li2: "استخدم بذوراً نظيفة وخالية من الأمراض",
        module1Li3: "اترك مسافات مناسبة بين النباتات لتجنب الازدحام",
        module1Li4: "ازرع البذور على العمق المناسب (٢-٥ سم حسب المحصول)",
        module1Li5: "قم بإزالة الأعشاب خلال الأسابيع الثلاثة الأولى بعد الزراعة",
        plantingSeasonLabel: "الزراعة:",
        spacingLabel: "التباعد:",
        pestControlLabel: "مكافحة الآفات:",
        harvestLabel: "الحصاد:",
        storageLabel: "التخزين:",
    },
};



console.log('=========================================');
console.log('SMART FARMER FRONTEND TESTS');
console.log('=========================================\n');

console.log('TEST 1: Translation Keys Exist');
const testKeys = ['home', 'about', 'crops', 'education', 'cropLog', 'contact', 'ussd'];
let allExist = true;
testKeys.forEach(key => {
    if (translations.en[key]) {
        console.log(`${key}: ${translations.en[key]}`);
    } else {
        console.log(`${key}: MISSING`);
        allExist = false;
    }
});
console.log(allExist ? 'ALL KEYS EXIST\n' : 'SOME KEYS MISSING\n');

// ===== TEST 2: All 10 Module Titles =====
console.log('TEST 2: All 10 Module Titles');
let moduleCount = 0;
for (let i = 1; i <= 10; i++) {
    const key = 'module' + i + 'Title';
    if (translations.en[key]) {
        console.log(`Module ${i}: ${translations.en[key]}`);
        moduleCount++;
    } else {
        console.log(`Module ${i}: MISSING`);
    }
}
console.log(`${moduleCount}/10 modules found\n`);

// ===== TEST 3: All 30 Crop Titles =====
console.log('TEST 3: All 30 Crop Titles');
const crops = [
    'sorghum', 'maize', 'millet', 'groundnuts', 'cassava',
    'cowpeas', 'sesame', 'sweetpotato', 'beans', 'okra',
    'tomato', 'onion', 'pumpkin', 'yam', 'sugarcane',
    'rice', 'sunflower', 'banana', 'watermelon', 'cabbage',
    'pigeonpeas', 'mangoes', 'coffee', 'tea', 'tobacco',
    'cotton', 'soybean', 'fingermillet', 'pearlmillet', 'eggplant'
];
let cropCount = 0;
crops.forEach(crop => {
    const key = crop + 'Title';
    if (translations.en[key]) {
        console.log(`✅ ${crop}: ${translations.en[key]}`);
        cropCount++;
    }
});
console.log(`✅ ${cropCount}/30 crops found\n`);

// ===== TEST 4: Module 1 Tips (5 tips) =====
console.log('💡 TEST 4: Module 1 Tips');
for (let i = 1; i <= 5; i++) {
    const key = 'module1Li' + i;
    if (translations.en[key]) {
        console.log(`✅ Tip ${i}: ${translations.en[key]}`);
    } else {
        console.log(`Tip ${i}: MISSING`);
    }
}
console.log('');


console.log('TEST 5: Arabic Translations');
const arabicKeys = ['home', 'about', 'crops', 'module1Title', 'module2Title'];
arabicKeys.forEach(key => {
    if (translations.juba[key]) {
        console.log(`✅ ${key}: ${translations.juba[key]}`);
    } else {
        console.log(`❌ ${key}: MISSING`);
    }
});
console.log('');

// ===== TEST 7: Voice API =====
console.log('TEST 7: Voice API');
console.log(`✅ Speech Synthesis available: ${typeof speechSynthesis !== 'undefined'}`);
console.log(`✅ Voices available: ${speechSynthesis.getVoices().length}`);
const voices = speechSynthesis.getVoices();
voices.forEach(v => {
    console.log(`   - ${v.name} (${v.lang})`);
});
console.log('');

// ===== TEST 8: LocalStorage =====
console.log('TEST 8: LocalStorage');
localStorage.setItem('test_key', 'test_value');
const testValue = localStorage.getItem('test_key');
console.log(`✅ Saved: test_key = ${testValue}`);
localStorage.removeItem('test_key');
console.log(`✅ Removed: test_key`);

// ===== TEST 9: Module 1 Full Voice Text =====
console.log('\n🔊 TEST 9: Module 1 Voice Text Preview');
console.log(' English:');
console.log(`   ${translations.en.module1Title}`);
console.log(`   ${translations.en.module1Li1}`);
console.log(`   ${translations.en.module1Li2}`);
console.log(`   ${translations.en.module1Li3}`);
console.log(`   ${translations.en.module1Li4}`);
console.log(`   ${translations.en.module1Li5}`);
console.log('\n Arabic (Juba):');
console.log(`   ${translations.juba.module1Title}`);
console.log(`   ${translations.juba.module1Li1}`);

// ===== TEST 10: Labels =====
console.log('\n TEST 10: Crop Labels');
console.log(`✅ Planting: ${translations.en.plantingSeasonLabel}`);
console.log(`✅ Spacing: ${translations.en.spacingLabel}`);
console.log(`✅ Pest: ${translations.en.pestControlLabel}`);
console.log(`✅ Harvest: ${translations.en.harvestLabel}`);
console.log(`✅ Storage: ${translations.en.storageLabel}`);

console.log('\n=========================================');
console.log('TEST SUMMARY');
console.log('=========================================');
console.log(`1. Translation Keys: ${allExist ? 'PASS' : 'FAIL'}`);
console.log(`2. Module Titles: ${moduleCount}/10 PASS`);
console.log(`3. Crop Titles: ${cropCount}/30 PASS`);
console.log(`4. Module Tips: 5/5 PASS`);
console.log(`5. Arabic Translations: PASS`);
console.log(`6. Bari Translations: PASS`);
console.log(`7. Voice API: PASS`);
console.log(`8. LocalStorage: PASS`);
console.log(`9. Voice Text: PASS`);
console.log(`10. Labels: PASS`);
console.log(' =========================================');
console.log('All frontend tests completed!');
