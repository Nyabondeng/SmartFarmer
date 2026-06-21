const translations = {
    en: {
        home: "Home",
        about: "About",
        crops: "Crop Info",
        education: "Education",
        cropLog: "Crop Log",
        contact: "Contact",
        ussd: "USSD"
    },

    /* Juba Arabic (primary Arabic variant) */
    juba: {
        home: "Bet",
        about: "An Smart Farmer",
        crops: "Malumat Zira'iya",
        education: "Ta'lim",
        cropLog: "Sijil Zira'a",
        contact: "Ittasil Bina",
        ussd: "USSD",
        welcome: "Marhaba fi Smart Farmer",
        tagline: "Nusaid mazariin bi ma'lumat zira'iya",
        getStarted: "Ibda",

        // About page translations (as requested)
        aboutTitle: "About Smart Farmer",

        whoWeAreTitle: "Who We Are",
        whoWeAreText: "Smart Farmer huwa nizam zira'i dijitali ma'mul khasan li mazariin soghar fi South Sudan. Bi'idim malumat an zaru'a, durus ta'limiya, wa sijil zira'a yishtighil bila internet.",

        missionTitle: "Mission",
        missionText: "Nidii malumat zira'iya sahla li mazariin soghar fi Yei County bi lughaat hum Arabic, English wa Bari bila haja lil internet.",

        visionTitle: "Vision",
        visionText: "Mustaqbal kul mazari fi South Sudan yikunu indahu ma'rifa wa adawat li yizid intaj ta'am wa yugallil khasarat fi mahsul.",

        offersTitle: "Smart Farmer Bidii Shinu",

        offer1: "Malumat an 5 anwa min mahsulat bi 3 lughaat",
        offer2: "Durus an zira'a, mukafahat al-afat wa hasad",
        offer3: "Sawt li mazariin ma bigru kutub kwayyis",
        offer4: "Sijil zira'a bila internet mahfuz fi talifun"
        ,
        // Crops page translations (Juba Arabic)
        cropsTitle: "Malumat an mahsulat",
        sorghumTitle: "Sorghum",
        maizeTitle: "Maize",
        milletTitle: "Millet",
        groundnutsTitle: "Groundnuts",
        cassavaTitle: "Cassava",

        plantingSeasonLabel: "Mawseem al-zira'a:",
        spacingLabel: "Al-fasila:",
        pestControlLabel: "Mokafahat al-afat:",
        harvestLabel: "Al-hasad:",
        storageLabel: "Al-takhzin:",
        voiceListenLabel: "🔊 استمع",
        // Voice message translations (Juba Arabic)
        sorghumVoice: "Sorghum. Zigri fi May au June. Fasila 75 senti bi 25 senti. Intabih li armyworms ba'd al-matar.",
        maizeVoice: "Maize. Zigri fi May au June. Fasila 75 senti bi 50 senti. Intabih li stalk borer.",
        milletVoice: "Millet. Zigri fi May au June. Fasila 60 senti bi 20 senti. Intabih li asafir wa stem borers.",
        groundnutsVoice: "Groundnuts. Zigri fi May au June. Fasila 50 senti bi 15 senti. Intabih li leaf spot wa aphids.",
        cassavaVoice: "Cassava. Zigri fi March au April. Fasila 100 senti bi 100 senti. Intabih li cassava mosaic disease. Hasad ba'd 8 ila 12 shahr.",

        plantingVoice: "Nasiha al-zira'a. Ziri fi bidayat mawseem al-matar. Istakhdim zira' nadhifa. Adi al-fasila wa izalah al-'shubat' fi thalath asabi'.",
        pestVoice: "Mokafaha al-afat. Fatah al-husbat yawmiyan. Izala al-caterpillars bi yad. Istakhdim ma'adin basita li afat soghayara.",
        postharvestVoice: "Ba'd al-hasad. Hasid lama al-hubub yikun jaff wa qawi. Nayish jayyidan qabl al-takhzin. Istakhdim ahdaar nadhifa.",
        soilVoice: "Idarat al-turab. Azil al-'shrub' qabl al-zira'a. Zid compost aw kharaj al-behemah li taslih al-turab.",
        climateVoice: "Zira'a mutanassiba ma al-manaakh. Ziri badri fi bidayat al-matar. Ikhtar mahsulat muqaawima lil-jafaf.",
    },

    bari: {
        home: "Lo Piny",
        about: "Kony Smart Farmer",
        crops: "Lonyo lo Kony",
        education: "Kujju",
        cropLog: "Buku lo Kony",
        contact: "Konye",
        ussd: "USSD",

        aboutTitle: "Kony Smart Farmer",
        whoWeAreTitle: "Ngutu Ke",
        whoWeAreText: "Smart Farmer ko sistemu lo lonyo lo kony ma ta ronyi ko'di na South Sudan. Epi lonyo lo kony, kujju, ko buku lo kony ma ijo internet.",

        missionTitle: "Mission",
        missionText: "Ti lonyo lo kony ma ronyi ko'di na Yei County ki lugeti ko Arabic, English, ko Bari ma internet.",

        visionTitle: "Vision",
        visionText: "Ronyi ko'di ke South Sudan do ma lonyo ko adia na ayii ta na toru nyanya, ka lossi ko'di, ko ayii ta na toru nyanya lo juru.",

        offersTitle: "Smart Farmer Epi",

        offer1: "Lonyo lo kony ta mahsulat 5 ki lugeti 3",
        offer2: "Kujju ta kony, afat, ko hasad",
        offer3: "Kony lo yia ma aji kutu",
        offer4: "Buku lo kony ma internet ti talifun"
        ,
        // Crops page translations (Bari)
        cropsTitle: "Elikia lo Yini",
        sorghumTitle: "Sorghum",
        maizeTitle: "Maize",
        milletTitle: "Millet",
        groundnutsTitle: "Groundnuts",
        cassavaTitle: "Cassava",

        plantingSeasonLabel: "Lanyi ti lipi:",
        spacingLabel: "Fasila:",
        pestControlLabel: "Kuwere afat:",
        harvestLabel: "Hasad:",
        storageLabel: "Teren:",
        voiceListenLabel: "🔊 Wiri",
        // Voice message translations (Bari)
        sorghumVoice: "Sorghum. Lanyi ti lipi May ka June. Fasila 75 senti x 25 senti. Aki wiri armyworms ba'di lipi.",
        maizeVoice: "Maize. Lanyi ti lipi May ka June. Fasila 75 senti x 50 senti. Aki wiri stalk borer.",
        milletVoice: "Millet. Lanyi ti lipi May ka June. Fasila 60 senti x 20 senti. Aki wiri birds la stem borers.",
        groundnutsVoice: "Groundnuts. Lanyi ti lipi May ka June. Fasila 50 senti x 15 senti. Aki wiri leaf spot ka aphids.",
        cassavaVoice: "Cassava. Lanyi ti lipi March ka April. Fasila 100 senti x 100 senti. Aki wiri cassava mosaic disease. Hasad 8-12 months.",

        plantingVoice: "Lanyi pe lipi. Lanyi pe bidayat lipi. Kony ki seed nadhifa. Fasila ma lipi. Weed pe 3 weeks.",
        pestVoice: "Kuwere afat. Check fields daily. Remove armyworms by hand. Use ash for stem borers.",
        postharvestVoice: "Post-harvest. Hasad when dry. Dry fully before storage. Use clean containers.",
        soilVoice: "Soil management. Clear weeds. Add compost or manure. Rotate crops.",
        climateVoice: "Climate-smart. Plant early with rains. Choose drought-resistant crops. Mulch to keep water.",
    },

    // Shared/common strings (default to English)
    aboutTitle: "About Us",
    contactTitle: "Contact Us",
    contactDesc: "Have questions, suggestions, or feedback? We'd love to hear from you.",
    contactSendButton: "Send Message",

    cropsTitle: "Staple Crops of South Sudan",

    cropLogTitle: "My Crop Monitoring Log",
    cropLogSubtitle: "Save your planting dates. All data stays on your phone. Works offline.",
    selectCrop: "Select Crop:",
    plantingDate: "Planting Date:",
    notesLabel: "Notes (optional):",
    saveRecord: "Save Planting Record",

    educationTitle: "Educational Modules",

    successTitle: "✅ Thank you for reaching out!",
    successBody: "Your message has been sent successfully. We will get back to you as soon as possible.",
    returnContact: "Return to Contact Page",
    whoWeAreTitle: "Who We Are",
    whoWeAreText: "Smart Farmer is a digital agricultural information system designed specifically for smallholder farmers in South Sudan. It provides crop information, educational modules, and a planting log that works offline on any device.",

    missionTitle: "Mission",
    missionText: "To provide accessible farming information to smallholder farmers in Yei County, South Sudan, in their own languages, Arabic, English, and Bari without requiring internet access.",

    visionTitle: "Vision",
    visionText: "A future where every farmer in South Sudan has the knowledge and tools to grow more food, reduce crop losses, and improve their family's food security.",

    offersTitle: "What Smart Farmer Offers",

    offer1: "Crop information for 5 staple crops in 3 languages",
    offer2: "Educational modules on planting, pest control and harvesting",
    offer3: "Voice output for low-literacy farmers",
    offer4: "Offline planting log saved on the farmer's device"

};
