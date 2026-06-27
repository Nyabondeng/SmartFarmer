function getCropText(crop, lang) {
    const t = translations[lang] || translations.en;
    const cropVoices = {
        sorghum:    t.sorghumVoice    || 'Sorghum. Planting season: May-June. Spacing: 75cm x 25cm. Pest control: Watch for armyworms after first rain. Harvest: September-October. Storage: Dry completely before storing.',
        maize:      t.maizeVoice      || 'Maize. Planting season: May-June. Spacing: 75cm x 50cm. Pest control: Watch for maize stalk borer. Harvest: August-September. Storage: Dry on the cob, then remove kernels.',
        millet:     t.milletVoice     || 'Millet. Planting season: May-June. Spacing: 60cm x 20cm. Pest control: Watch for birds and stem borers. Harvest: September-October. Storage: Store in sealed containers.',
        groundnuts: t.groundnutsVoice || 'Groundnuts. Planting season: May-June. Spacing: 50cm x 15cm. Pest control: Watch for leaf spot and aphids. Harvest: October-November. Storage: Dry thoroughly before shelling.',
        cassava:    t.cassavaVoice    || 'Cassava. Planting season: March-April. Spacing: 100cm x 100cm. Pest control: Watch for cassava mosaic disease. Harvest: 8-12 months after planting. Storage: Harvest only when needed.'
    };
    return cropVoices[crop] || 'Crop information not available.';
}


function playCropAudio(crop) {
    const lang = document.getElementById('languageSwitcher').value;
    const text = getCropText(crop, lang);
    if ('speechSynthesis' in window) {
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


document.getElementById('languageSwitcher').addEventListener('change', function () {
    const lang = this.value;
    if (typeof applyTranslations === 'function') applyTranslations(lang);
});
