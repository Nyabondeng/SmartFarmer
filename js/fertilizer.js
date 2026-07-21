// ========================================
// FERTILIZER DATA
// ========================================

const fertilizerData = {
    sorghum: {
        name: 'Sorghum',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '50 kg/acre', timing: 'At planting', description: 'Apply at planting for balanced nutrition' },
            { name: 'Urea (46% N)', amount: '25 kg/acre', timing: '6-8 weeks after planting', description: 'Apply as top dressing during vegetative growth' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 15-15-15 at 50kg per acre. Mix with soil in the planting hole.' },
            { stage: '6-8 Weeks', desc: 'Apply Urea at 25kg per acre as top dressing. Place near the base of the plant.' }
        ],
        tips: 'Apply fertilizer when soil is moist. Water after application if possible. Avoid applying directly to the seed.'
    },
    maize: {
        name: 'Maize',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '60 kg/acre', timing: 'At planting', description: 'Apply at planting for strong root development' },
            { name: 'Urea (46% N)', amount: '50 kg/acre', timing: '4-6 weeks after planting', description: 'Apply when plants are knee-high' },
            { name: 'CAN (25% N)', amount: '30 kg/acre', timing: '8-10 weeks after planting', description: 'Apply during tasseling stage' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 15-15-15 at 60kg per acre in the planting hole.' },
            { stage: '4-6 Weeks', desc: 'Apply Urea at 50kg per acre as top dressing when plants are knee-high.' },
            { stage: '8-10 Weeks', desc: 'Apply CAN at 30kg per acre during tasseling for grain filling.' }
        ],
        tips: 'Split nitrogen application for better uptake. Apply when leaves are dry to avoid burning. Water after application.'
    },
    millet: {
        name: 'Millet',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '40 kg/acre', timing: 'At planting', description: 'Apply at planting for balanced nutrition' },
            { name: 'Urea (46% N)', amount: '20 kg/acre', timing: '5-7 weeks after planting', description: 'Apply as top dressing before flowering' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 15-15-15 at 40kg per acre. Mix well with soil.' },
            { stage: '5-7 Weeks', desc: 'Apply Urea at 20kg per acre as top dressing before flowering.' }
        ],
        tips: 'Millet responds well to nitrogen. Apply when soil is moist. Avoid over-application.'
    },
    groundnuts: {
        name: 'Groundnuts',
        fertilizerTypes: [
            { name: 'Single Super Phosphate (SSP)', amount: '50 kg/acre', timing: 'At planting', description: 'Apply at planting for root and pod development' },
            { name: 'Potassium Chloride (KCl)', amount: '20 kg/acre', timing: 'At planting', description: 'Apply at planting for pod filling' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply SSP at 50kg per acre and KCl at 20kg per acre in the planting row.' },
            { stage: 'Flowering', desc: 'Apply Lime at 100kg per acre if soil is acidic (optional).' }
        ],
        tips: 'Groundnuts fix their own nitrogen. Avoid nitrogen fertilizers. Apply calcium for better pod development.'
    },
    cassava: {
        name: 'Cassava',
        fertilizerTypes: [
            { name: 'NPK 12-12-17', amount: '80 kg/acre', timing: 'At planting', description: 'Apply at planting for sustained growth' },
            { name: 'Urea (46% N)', amount: '40 kg/acre', timing: '3-4 months after planting', description: 'Apply during active growth phase' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 12-12-17 at 80kg per acre in the planting holes.' },
            { stage: '3-4 Months', desc: 'Apply Urea at 40kg per acre as top dressing during active growth.' }
        ],
        tips: 'Cassava is sensitive to chloride. Use chloride-free fertilizers if possible. Apply potassium for better root development.'
    },
    cowpeas: {
        name: 'Cowpeas',
        fertilizerTypes: [
            { name: 'Single Super Phosphate (SSP)', amount: '40 kg/acre', timing: 'At planting', description: 'Apply at planting for root development' },
            { name: 'Potassium Chloride (KCl)', amount: '15 kg/acre', timing: 'At planting', description: 'Apply at planting for pod filling' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply SSP at 40kg per acre and KCl at 15kg per acre in the planting row.' },
            { stage: 'Flowering', desc: 'Apply 1-2 kg/acre of Boron for better pod set (optional).' }
        ],
        tips: 'Cowpeas fix their own nitrogen. Use only phosphorus and potassium fertilizers. Inoculate seeds with rhizobium for better nitrogen fixation.'
    },
    sesame: {
        name: 'Sesame',
        fertilizerTypes: [
            { name: 'NPK 10-20-10', amount: '50 kg/acre', timing: 'At planting', description: 'Apply at planting for oil development' },
            { name: 'Urea (46% N)', amount: '15 kg/acre', timing: '4-6 weeks after planting', description: 'Apply before flowering' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 10-20-10 at 50kg per acre in the planting rows.' },
            { stage: '4-6 Weeks', desc: 'Apply Urea at 15kg per acre as top dressing before flowering.' }
        ],
        tips: 'Sesame is sensitive to salinity. Avoid over-application. Apply phosphorus for better oil production.'
    },
    sweetpotato: {
        name: 'Sweet Potato',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '40 kg/acre', timing: 'At planting', description: 'Apply at planting for vine development' },
            { name: 'Potassium Chloride (KCl)', amount: '30 kg/acre', timing: '4-6 weeks after planting', description: 'Apply for root development' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 15-15-15 at 40kg per acre in the planting ridges.' },
            { stage: '4-6 Weeks', desc: 'Apply KCl at 30kg per acre as side dressing during root development.' }
        ],
        tips: 'Sweet potatoes need potassium for root development. Avoid excessive nitrogen which promotes vine growth at expense of roots.'
    },
    beans: {
        name: 'Beans',
        fertilizerTypes: [
            { name: 'Single Super Phosphate (SSP)', amount: '45 kg/acre', timing: 'At planting', description: 'Apply at planting for root development' },
            { name: 'Potassium Chloride (KCl)', amount: '20 kg/acre', timing: 'At planting', description: 'Apply at planting for pod development' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply SSP at 45kg per acre and KCl at 20kg per acre in the planting row.' },
            { stage: 'Flowering', desc: 'Apply 1-2 kg/acre of Boron for better pod set (optional).' }
        ],
        tips: 'Beans fix nitrogen with rhizobium bacteria. Inoculate seeds before planting. Use phosphorus for better yields.'
    },
    okra: {
        name: 'Okra',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '50 kg/acre', timing: 'At planting', description: 'Apply at planting for establishment' },
            { name: 'Urea (46% N)', amount: '30 kg/acre', timing: '4 weeks after planting', description: 'Apply for vegetative growth' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 15-15-15 at 50kg per acre in the planting rows.' },
            { stage: '4 Weeks', desc: 'Apply Urea at 30kg per acre as side dressing during vegetative growth.' },
            { stage: 'Flowering', desc: 'Apply a second dose of Urea at 20kg per acre (optional).' }
        ],
        tips: 'Okra needs regular nitrogen for continuous production. Apply every 4-6 weeks for best results.'
    },
    tomato: {
        name: 'Tomato',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '80 kg/acre', timing: 'At planting', description: 'Apply at planting for establishment' },
            { name: 'CAN (25% N)', amount: '60 kg/acre', timing: '3-4 weeks after planting', description: 'Apply for vegetative growth' },
            { name: 'NPK 15-30-15', amount: '40 kg/acre', timing: 'At flowering', description: 'Apply for fruit development' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 15-15-15 at 80kg per acre in the planting holes.' },
            { stage: '3-4 Weeks', desc: 'Apply CAN at 60kg per acre as side dressing during vegetative growth.' },
            { stage: 'Flowering', desc: 'Apply NPK 15-30-15 at 40kg per acre when first flowers appear.' }
        ],
        tips: 'Tomatoes need phosphorus for flowering and fruit set. Apply calcium to prevent blossom-end rot. Water after application.'
    },
    onion: {
        name: 'Onion',
        fertilizerTypes: [
            { name: 'NPK 12-12-17', amount: '60 kg/acre', timing: 'At planting', description: 'Apply at planting for establishment' },
            { name: 'Urea (46% N)', amount: '30 kg/acre', timing: '3-4 weeks after planting', description: 'Apply for bulb development' },
            { name: 'Potassium Chloride (KCl)', amount: '25 kg/acre', timing: '6 weeks after planting', description: 'Apply for bulb filling' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 12-12-17 at 60kg per acre in the planting rows.' },
            { stage: '3-4 Weeks', desc: 'Apply Urea at 30kg per acre as side dressing during bulb development.' },
            { stage: '6 Weeks', desc: 'Apply KCl at 25kg per acre during active bulb filling stage.' }
        ],
        tips: 'Onions need sulfur for flavor development. Avoid nitrogen in late stages as it delays bulbing. Stop fertilizing 2-3 weeks before harvest.'
    },
    pumpkin: {
        name: 'Pumpkin',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '50 kg/acre', timing: 'At planting', description: 'Apply at planting for vine development' },
            { name: 'Urea (46% N)', amount: '25 kg/acre', timing: '4 weeks after planting', description: 'Apply for vine growth' },
            { name: 'NPK 15-30-15', amount: '30 kg/acre', timing: 'At flowering', description: 'Apply for fruit development' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 15-15-15 at 50kg per acre in the planting holes.' },
            { stage: '4 Weeks', desc: 'Apply Urea at 25kg per acre during active vine growth.' },
            { stage: 'Flowering', desc: 'Apply NPK 15-30-15 at 30kg per acre when first flowers appear.' }
        ],
        tips: 'Pumpkins are heavy feeders. Apply fertilizer regularly throughout the growing season. Water after application.'
    },
    yam: {
        name: 'Yam',
        fertilizerTypes: [
            { name: 'NPK 12-12-17', amount: '70 kg/acre', timing: 'At planting', description: 'Apply at planting for tuber development' },
            { name: 'Potassium Chloride (KCl)', amount: '40 kg/acre', timing: '4-6 months after planting', description: 'Apply for tuber filling' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 12-12-17 at 70kg per acre in the planting mounds.' },
            { stage: '4-6 Months', desc: 'Apply KCl at 40kg per acre as side dressing during tuber filling stage.' }
        ],
        tips: 'Yams need potassium for tuber development. Avoid excessive nitrogen which promotes vine growth. Mound soil around plants for better tuber formation.'
    },
    sugarcane: {
        name: 'Sugarcane',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '100 kg/acre', timing: 'At planting', description: 'Apply at planting for establishment' },
            { name: 'Urea (46% N)', amount: '80 kg/acre', timing: '2-3 months after planting', description: 'Apply for cane development' },
            { name: 'Potassium Chloride (KCl)', amount: '60 kg/acre', timing: '4-6 months after planting', description: 'Apply for sugar content' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 15-15-15 at 100kg per acre in the planting rows.' },
            { stage: '2-3 Months', desc: 'Apply Urea at 80kg per acre during active cane development.' },
            { stage: '4-6 Months', desc: 'Apply KCl at 60kg per acre for sugar accumulation.' }
        ],
        tips: 'Sugarcane needs high nitrogen and potassium. Apply in split applications. Water after application for better uptake.'
    },
    rice: {
        name: 'Rice',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '50 kg/acre', timing: 'At planting', description: 'Apply at planting for establishment' },
            { name: 'Urea (46% N)', amount: '60 kg/acre', timing: '4 weeks after planting', description: 'Apply for tillering' },
            { name: 'Urea (46% N)', amount: '40 kg/acre', timing: '8 weeks after planting', description: 'Apply for panicle initiation' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 15-15-15 at 50kg per acre in the planting rows.' },
            { stage: '4 Weeks', desc: 'Apply Urea at 60kg per acre during active tillering stage.' },
            { stage: '8 Weeks', desc: 'Apply Urea at 40kg per acre for panicle initiation and grain development.' }
        ],
        tips: 'Rice responds well to nitrogen. Apply in split doses. Maintain proper water level after fertilizer application. Avoid applying during rainy periods.'
    },
    sunflower: {
        name: 'Sunflower',
        fertilizerTypes: [
            { name: 'NPK 10-20-10', amount: '50 kg/acre', timing: 'At planting', description: 'Apply at planting for oil development' },
            { name: 'Urea (46% N)', amount: '30 kg/acre', timing: '4-6 weeks after planting', description: 'Apply during vegetative growth' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 10-20-10 at 50kg per acre in the planting rows.' },
            { stage: '4-6 Weeks', desc: 'Apply Urea at 30kg per acre as side dressing during vegetative growth.' }
        ],
        tips: 'Sunflowers need phosphorus for oil content. Avoid over-fertilizing with nitrogen which reduces oil content. Apply boron for better seed set.'
    },
    banana: {
        name: 'Banana',
        fertilizerTypes: [
            { name: 'NPK 12-12-17', amount: '80 kg/acre', timing: 'At planting', description: 'Apply at planting for establishment' },
            { name: 'Urea (46% N)', amount: '60 kg/acre', timing: '3-4 months after planting', description: 'Apply for vegetative growth' },
            { name: 'Potassium Chloride (KCl)', amount: '50 kg/acre', timing: '5-6 months after planting', description: 'Apply for bunch development' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 12-12-17 at 80kg per acre in the planting holes.' },
            { stage: '3-4 Months', desc: 'Apply Urea at 60kg per acre during active growth phase.' },
            { stage: '5-6 Months', desc: 'Apply KCl at 50kg per acre for bunch development.' }
        ],
        tips: 'Bananas are heavy potassium feeders. Apply frequently. Water after application. Apply at the base of the plant, not directly on the trunk.'
    },
    watermelon: {
        name: 'Watermelon',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '60 kg/acre', timing: 'At planting', description: 'Apply at planting for vine development' },
            { name: 'Urea (46% N)', amount: '30 kg/acre', timing: '4 weeks after planting', description: 'Apply for vine growth' },
            { name: 'NPK 15-30-15', amount: '40 kg/acre', timing: 'At flowering', description: 'Apply for fruit development' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 15-15-15 at 60kg per acre in the planting mounds.' },
            { stage: '4 Weeks', desc: 'Apply Urea at 30kg per acre during vine growth stage.' },
            { stage: 'Flowering', desc: 'Apply NPK 15-30-15 at 40kg per acre when vines start flowering.' }
        ],
        tips: 'Watermelons need phosphorus for flowering and fruit set. Reduce nitrogen after fruit set. Apply potassium for fruit quality and sweetness.'
    },
    cabbage: {
        name: 'Cabbage',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '60 kg/acre', timing: 'At planting', description: 'Apply at planting for establishment' },
            { name: 'Urea (46% N)', amount: '40 kg/acre', timing: '3-4 weeks after planting', description: 'Apply during head formation' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 15-15-15 at 60kg per acre in the planting rows.' },
            { stage: '3-4 Weeks', desc: 'Apply Urea at 40kg per acre during head formation stage.' }
        ],
        tips: 'Cabbage needs nitrogen for leaf development. Apply boron to prevent hollow heart. Water after application. Avoid over-fertilization.'
    },
    pigeonpeas: {
        name: 'Pigeon Peas',
        fertilizerTypes: [
            { name: 'Single Super Phosphate (SSP)', amount: '40 kg/acre', timing: 'At planting', description: 'Apply at planting for root development' },
            { name: 'Potassium Chloride (KCl)', amount: '15 kg/acre', timing: 'At planting', description: 'Apply at planting for pod development' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply SSP at 40kg per acre and KCl at 15kg per acre in the planting row.' },
            { stage: 'Flowering', desc: 'Apply 2-3 kg/acre of Boron for better pod set (optional).' }
        ],
        tips: 'Pigeon peas fix nitrogen. Use phosphorus and potassium fertilizers. Inoculate seeds with rhizobium for better nitrogen fixation.'
    },
    mangoes: {
        name: 'Mangoes',
        fertilizerTypes: [
            { name: 'NPK 12-12-17', amount: '60 kg/acre', timing: 'At planting', description: 'Apply at planting for establishment' },
            { name: 'Urea (46% N)', amount: '40 kg/acre', timing: '3-4 months after planting', description: 'Apply for vegetative growth' },
            { name: 'Potassium Chloride (KCl)', amount: '30 kg/acre', timing: 'Before flowering', description: 'Apply for flowering and fruit set' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 12-12-17 at 60kg per acre in the planting holes.' },
            { stage: '3-4 Months', desc: 'Apply Urea at 40kg per acre during vegetative growth.' },
            { stage: 'Before Flowering', desc: 'Apply KCl at 30kg per acre before flowering for better fruit set.' }
        ],
        tips: 'Mangoes need potassium for fruit quality. Apply after harvesting for next season. Water after application during dry season.'
    },
    coffee: {
        name: 'Coffee',
        fertilizerTypes: [
            { name: 'NPK 12-12-17', amount: '70 kg/acre', timing: 'At planting', description: 'Apply at planting for establishment' },
            { name: 'Urea (46% N)', amount: '50 kg/acre', timing: 'Beginning of rains', description: 'Apply for vegetative growth' },
            { name: 'Potassium Chloride (KCl)', amount: '40 kg/acre', timing: 'Before flowering', description: 'Apply for flowering and bean development' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 12-12-17 at 70kg per acre in the planting holes.' },
            { stage: 'Beginning of Rains', desc: 'Apply Urea at 50kg per acre at the beginning of rainy season.' },
            { stage: 'Before Flowering', desc: 'Apply KCl at 40kg per acre before flowering for bean development.' }
        ],
        tips: 'Coffee needs regular fertilization. Apply in split doses throughout the growing season. Mulch around trees to conserve moisture.'
    },
    tea: {
        name: 'Tea',
        fertilizerTypes: [
            { name: 'NPK 12-12-17', amount: '60 kg/acre', timing: 'At planting', description: 'Apply at planting for establishment' },
            { name: 'Urea (46% N)', amount: '50 kg/acre', timing: '3-4 weeks after planting', description: 'Apply for leaf development' },
            { name: 'NPK 15-15-15', amount: '40 kg/acre', timing: 'After each harvest', description: 'Apply after each plucking cycle' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 12-12-17 at 60kg per acre in the planting rows.' },
            { stage: '3-4 Weeks', desc: 'Apply Urea at 50kg per acre for leaf development.' },
            { stage: 'After Each Harvest', desc: 'Apply NPK 15-15-15 at 40kg per acre after each plucking cycle.' }
        ],
        tips: 'Tea needs regular nitrogen for leaf production. Apply after each harvest. Maintain soil acidity. Water after application.'
    },
    tobacco: {
        name: 'Tobacco',
        fertilizerTypes: [
            { name: 'NPK 12-12-17', amount: '70 kg/acre', timing: 'At planting', description: 'Apply at planting for establishment' },
            { name: 'Urea (46% N)', amount: '50 kg/acre', timing: '4-6 weeks after planting', description: 'Apply for leaf development' },
            { name: 'Potassium Chloride (KCl)', amount: '30 kg/acre', timing: '8-10 weeks after planting', description: 'Apply for leaf quality' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 12-12-17 at 70kg per acre in the planting rows.' },
            { stage: '4-6 Weeks', desc: 'Apply Urea at 50kg per acre during active leaf development.' },
            { stage: '8-10 Weeks', desc: 'Apply KCl at 30kg per acre for better leaf quality.' }
        ],
        tips: 'Tobacco responds well to nitrogen. Apply in split doses. Avoid over-fertilization. Stop fertilizing 3-4 weeks before harvest.'
    },
    cotton: {
        name: 'Cotton',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '60 kg/acre', timing: 'At planting', description: 'Apply at planting for establishment' },
            { name: 'Urea (46% N)', amount: '50 kg/acre', timing: '4-6 weeks after planting', description: 'Apply for vegetative growth' },
            { name: 'Potassium Chloride (KCl)', amount: '30 kg/acre', timing: 'Before flowering', description: 'Apply for boll development' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 15-15-15 at 60kg per acre in the planting rows.' },
            { stage: '4-6 Weeks', desc: 'Apply Urea at 50kg per acre during vegetative growth.' },
            { stage: 'Before Flowering', desc: 'Apply KCl at 30kg per acre for boll development and fiber quality.' }
        ],
        tips: 'Cotton needs balanced nutrition. Apply potassium for fiber quality. Avoid over-fertilization which promotes excessive growth.'
    },
    soybean: {
        name: 'Soybean',
        fertilizerTypes: [
            { name: 'Single Super Phosphate (SSP)', amount: '45 kg/acre', timing: 'At planting', description: 'Apply at planting for root development' },
            { name: 'Potassium Chloride (KCl)', amount: '20 kg/acre', timing: 'At planting', description: 'Apply at planting for pod development' },
            { name: 'Gypsum', amount: '25 kg/acre', timing: 'At flowering', description: 'Apply for pod set and bean quality' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply SSP at 45kg per acre and KCl at 20kg per acre in the planting row.' },
            { stage: 'Flowering', desc: 'Apply Gypsum at 25kg per acre for better pod set and bean quality.' }
        ],
        tips: 'Soybeans fix nitrogen. Use phosphorus and potassium fertilizers. Inoculate seeds with rhizobium. Apply sulfur for better protein content.'
    },
    fingermillet: {
        name: 'Finger Millet',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '40 kg/acre', timing: 'At planting', description: 'Apply at planting for establishment' },
            { name: 'Urea (46% N)', amount: '20 kg/acre', timing: '5-6 weeks after planting', description: 'Apply for grain development' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 15-15-15 at 40kg per acre in the planting rows.' },
            { stage: '5-6 Weeks', desc: 'Apply Urea at 20kg per acre during grain development stage.' }
        ],
        tips: 'Finger millet responds to phosphorus. Apply fertilizer when soil is moist. Avoid over-application of nitrogen.'
    },
    pearlmillet: {
        name: 'Pearl Millet',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '40 kg/acre', timing: 'At planting', description: 'Apply at planting for establishment' },
            { name: 'Urea (46% N)', amount: '25 kg/acre', timing: '5-6 weeks after planting', description: 'Apply for grain development' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 15-15-15 at 40kg per acre in the planting rows.' },
            { stage: '5-6 Weeks', desc: 'Apply Urea at 25kg per acre during grain development.' }
        ],
        tips: 'Pearl millet is drought-tolerant but responds well to fertilizer. Apply when moisture is available. Avoid over-application.'
    },
    eggplant: {
        name: 'Eggplant',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '50 kg/acre', timing: 'At planting', description: 'Apply at planting for establishment' },
            { name: 'Urea (46% N)', amount: '30 kg/acre', timing: '4-6 weeks after planting', description: 'Apply for vegetative growth' },
            { name: 'NPK 15-30-15', amount: '25 kg/acre', timing: 'At flowering', description: 'Apply for fruit development' }
        ],
        applicationSchedule: [
            { stage: 'At Planting', desc: 'Apply NPK 15-15-15 at 50kg per acre in the planting holes.' },
            { stage: '4-6 Weeks', desc: 'Apply Urea at 30kg per acre during vegetative growth.' },
            { stage: 'Flowering', desc: 'Apply NPK 15-30-15 at 25kg per acre when flowers appear.' }
        ],
        tips: 'Eggplants need consistent feeding. Apply fertilizer every 4-6 weeks. Water after application. Use mulch to conserve moisture.'
    }
};

// ========================================
// FERTILIZER DATA (JUBA ARABIC)
// ========================================

const fertilizerDataJuba = {
    sorghum: {
        name: 'الذرة الرفيعة',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '50 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتغذية متوازنة' },
            { name: 'Urea (46% N)', amount: '25 كجم/فدان', timing: 'بعد 6-8 أسابيع من الزراعة', description: 'يُستخدم كسماد سطحي خلال مرحلة النمو الخضري' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 15-15-15 بمعدل 50 كجم للفدان. اخلطه مع التربة في حفرة الزراعة.' },
            { stage: 'بعد 6-8 أسابيع', desc: 'استخدم اليوريا بمعدل 25 كجم للفدان كسماد سطحي. ضعه قرب قاعدة النبات.' }
        ],
        tips: 'استخدم السماد عندما تكون التربة رطبة. اسقِ بعد الاستخدام إن أمكن. تجنب وضع السماد مباشرة على البذور.'
    },
    maize: {
        name: 'الذرة الشامية',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '60 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتقوية نمو الجذور' },
            { name: 'Urea (46% N)', amount: '50 كجم/فدان', timing: 'بعد 4-6 أسابيع من الزراعة', description: 'يُستخدم عندما تصل النباتات إلى ارتفاع الركبة' },
            { name: 'CAN (25% N)', amount: '30 كجم/فدان', timing: 'بعد 8-10 أسابيع من الزراعة', description: 'يُستخدم خلال مرحلة التزهير' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 15-15-15 بمعدل 60 كجم للفدان في حفرة الزراعة.' },
            { stage: 'بعد 4-6 أسابيع', desc: 'استخدم اليوريا بمعدل 50 كجم للفدان كسماد سطحي عندما تصل النباتات إلى ارتفاع الركبة.' },
            { stage: 'بعد 8-10 أسابيع', desc: 'استخدم CAN بمعدل 30 كجم للفدان خلال مرحلة التزهير لامتلاء الحبوب.' }
        ],
        tips: 'قسّم استخدام النيتروجين على دفعات لامتصاص أفضل. استخدم السماد عندما تكون الأوراق جافة لتجنب حرقها. اسقِ بعد الاستخدام.'
    },
    millet: {
        name: 'الدخن',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '40 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتغذية متوازنة' },
            { name: 'Urea (46% N)', amount: '20 كجم/فدان', timing: 'بعد 5-7 أسابيع من الزراعة', description: 'يُستخدم كسماد سطحي قبل الإزهار' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 15-15-15 بمعدل 40 كجم للفدان. اخلطه جيداً مع التربة.' },
            { stage: 'بعد 5-7 أسابيع', desc: 'استخدم اليوريا بمعدل 20 كجم للفدان كسماد سطحي قبل الإزهار.' }
        ],
        tips: 'يستجيب الدخن جيداً للنيتروجين. استخدم السماد عندما تكون التربة رطبة. تجنب الإفراط في الاستخدام.'
    },
    groundnuts: {
        name: 'الفول السوداني',
        fertilizerTypes: [
            { name: 'سوبر فوسفات أحادي (SSP)', amount: '50 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لنمو الجذور وتكوين القرون' },
            { name: 'كلوريد البوتاسيوم (KCl)', amount: '20 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لامتلاء القرون' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم SSP بمعدل 50 كجم للفدان وKCl بمعدل 20 كجم للفدان في خط الزراعة.' },
            { stage: 'عند الإزهار', desc: 'استخدم الجير بمعدل 100 كجم للفدان إذا كانت التربة حمضية (اختياري).' }
        ],
        tips: 'الفول السوداني يثبّت النيتروجين بنفسه. تجنب الأسمدة النيتروجينية. استخدم الكالسيوم لتكوين قرون أفضل.'
    },
    cassava: {
        name: 'الكسافا',
        fertilizerTypes: [
            { name: 'NPK 12-12-17', amount: '80 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لنمو مستمر' },
            { name: 'Urea (46% N)', amount: '40 كجم/فدان', timing: 'بعد 3-4 أشهر من الزراعة', description: 'يُستخدم خلال مرحلة النمو النشط' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 12-12-17 بمعدل 80 كجم للفدان في حفر الزراعة.' },
            { stage: 'بعد 3-4 أشهر', desc: 'استخدم اليوريا بمعدل 40 كجم للفدان كسماد سطحي خلال النمو النشط.' }
        ],
        tips: 'الكسافا حساسة للكلوريد. استخدم أسمدة خالية من الكلوريد إن أمكن. استخدم البوتاسيوم لنمو جذور أفضل.'
    },
    cowpeas: {
        name: 'اللوبيا',
        fertilizerTypes: [
            { name: 'سوبر فوسفات أحادي (SSP)', amount: '40 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لنمو الجذور' },
            { name: 'كلوريد البوتاسيوم (KCl)', amount: '15 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لامتلاء القرون' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم SSP بمعدل 40 كجم للفدان وKCl بمعدل 15 كجم للفدان في خط الزراعة.' },
            { stage: 'عند الإزهار', desc: 'استخدم البورون بمعدل 1-2 كجم/فدان لعقد قرون أفضل (اختياري).' }
        ],
        tips: 'اللوبيا تثبّت النيتروجين بنفسها. استخدم أسمدة الفوسفور والبوتاسيوم فقط. لقّح البذور ببكتيريا الريزوبيوم لتثبيت نيتروجين أفضل.'
    },
    sesame: {
        name: 'السمسم',
        fertilizerTypes: [
            { name: 'NPK 10-20-10', amount: '50 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتكوين الزيت' },
            { name: 'Urea (46% N)', amount: '15 كجم/فدان', timing: 'بعد 4-6 أسابيع من الزراعة', description: 'يُستخدم قبل الإزهار' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 10-20-10 بمعدل 50 كجم للفدان في خطوط الزراعة.' },
            { stage: 'بعد 4-6 أسابيع', desc: 'استخدم اليوريا بمعدل 15 كجم للفدان كسماد سطحي قبل الإزهار.' }
        ],
        tips: 'السمسم حساس للملوحة. تجنب الإفراط في الاستخدام. استخدم الفوسفور لإنتاج زيت أفضل.'
    },
    sweetpotato: {
        name: 'البطاطا الحلوة',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '40 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لنمو الفروع' },
            { name: 'كلوريد البوتاسيوم (KCl)', amount: '30 كجم/فدان', timing: 'بعد 4-6 أسابيع من الزراعة', description: 'يُستخدم لنمو الجذور' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 15-15-15 بمعدل 40 كجم للفدان في مساطب الزراعة.' },
            { stage: 'بعد 4-6 أسابيع', desc: 'استخدم KCl بمعدل 30 كجم للفدان كسماد جانبي خلال نمو الجذور.' }
        ],
        tips: 'تحتاج البطاطا الحلوة إلى البوتاسيوم لنمو الجذور. تجنب النيتروجين الزائد لأنه يشجع نمو الفروع على حساب الجذور.'
    },
    beans: {
        name: 'الفول',
        fertilizerTypes: [
            { name: 'سوبر فوسفات أحادي (SSP)', amount: '45 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لنمو الجذور' },
            { name: 'كلوريد البوتاسيوم (KCl)', amount: '20 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتكوين القرون' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم SSP بمعدل 45 كجم للفدان وKCl بمعدل 20 كجم للفدان في خط الزراعة.' },
            { stage: 'عند الإزهار', desc: 'استخدم البورون بمعدل 1-2 كجم/فدان لعقد قرون أفضل (اختياري).' }
        ],
        tips: 'الفول يثبّت النيتروجين ببكتيريا الريزوبيوم. لقّح البذور قبل الزراعة. استخدم الفوسفور لإنتاج أفضل.'
    },
    okra: {
        name: 'البامية',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '50 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتأسيس النبات' },
            { name: 'Urea (46% N)', amount: '30 كجم/فدان', timing: 'بعد 4 أسابيع من الزراعة', description: 'يُستخدم للنمو الخضري' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 15-15-15 بمعدل 50 كجم للفدان في خطوط الزراعة.' },
            { stage: 'بعد 4 أسابيع', desc: 'استخدم اليوريا بمعدل 30 كجم للفدان كسماد جانبي خلال النمو الخضري.' },
            { stage: 'عند الإزهار', desc: 'استخدم جرعة ثانية من اليوريا بمعدل 20 كجم للفدان (اختياري).' }
        ],
        tips: 'تحتاج البامية إلى نيتروجين منتظم للإنتاج المستمر. استخدم السماد كل 4-6 أسابيع لأفضل النتائج.'
    },
    tomato: {
        name: 'الطماطم',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '80 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتأسيس النبات' },
            { name: 'CAN (25% N)', amount: '60 كجم/فدان', timing: 'بعد 3-4 أسابيع من الزراعة', description: 'يُستخدم للنمو الخضري' },
            { name: 'NPK 15-30-15', amount: '40 كجم/فدان', timing: 'عند الإزهار', description: 'يُستخدم لتكوين الثمار' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 15-15-15 بمعدل 80 كجم للفدان في حفر الزراعة.' },
            { stage: 'بعد 3-4 أسابيع', desc: 'استخدم CAN بمعدل 60 كجم للفدان كسماد جانبي خلال النمو الخضري.' },
            { stage: 'عند الإزهار', desc: 'استخدم NPK 15-30-15 بمعدل 40 كجم للفدان عند ظهور أول الأزهار.' }
        ],
        tips: 'تحتاج الطماطم إلى الفوسفور للإزهار وعقد الثمار. استخدم الكالسيوم لمنع تعفن الطرف الزهري. اسقِ بعد الاستخدام.'
    },
    onion: {
        name: 'البصل',
        fertilizerTypes: [
            { name: 'NPK 12-12-17', amount: '60 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتأسيس النبات' },
            { name: 'Urea (46% N)', amount: '30 كجم/فدان', timing: 'بعد 3-4 أسابيع من الزراعة', description: 'يُستخدم لنمو الأبصال' },
            { name: 'كلوريد البوتاسيوم (KCl)', amount: '25 كجم/فدان', timing: 'بعد 6 أسابيع من الزراعة', description: 'يُستخدم لامتلاء الأبصال' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 12-12-17 بمعدل 60 كجم للفدان في خطوط الزراعة.' },
            { stage: 'بعد 3-4 أسابيع', desc: 'استخدم اليوريا بمعدل 30 كجم للفدان كسماد جانبي خلال نمو الأبصال.' },
            { stage: 'بعد 6 أسابيع', desc: 'استخدم KCl بمعدل 25 كجم للفدان خلال مرحلة امتلاء الأبصال النشطة.' }
        ],
        tips: 'يحتاج البصل إلى الكبريت لتكوين النكهة. تجنب النيتروجين في المراحل المتأخرة لأنه يؤخر تكوين الأبصال. أوقف التسميد قبل الحصاد بـ 2-3 أسابيع.'
    },
    pumpkin: {
        name: 'القرع',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '50 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لنمو الفروع' },
            { name: 'Urea (46% N)', amount: '25 كجم/فدان', timing: 'بعد 4 أسابيع من الزراعة', description: 'يُستخدم لنمو الفروع' },
            { name: 'NPK 15-30-15', amount: '30 كجم/فدان', timing: 'عند الإزهار', description: 'يُستخدم لتكوين الثمار' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 15-15-15 بمعدل 50 كجم للفدان في حفر الزراعة.' },
            { stage: 'بعد 4 أسابيع', desc: 'استخدم اليوريا بمعدل 25 كجم للفدان خلال النمو النشط للفروع.' },
            { stage: 'عند الإزهار', desc: 'استخدم NPK 15-30-15 بمعدل 30 كجم للفدان عند ظهور أول الأزهار.' }
        ],
        tips: 'القرع من النباتات الشرهة للتغذية. استخدم السماد بانتظام طوال موسم النمو. اسقِ بعد الاستخدام.'
    },
    yam: {
        name: 'اليام',
        fertilizerTypes: [
            { name: 'NPK 12-12-17', amount: '70 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لنمو الدرنات' },
            { name: 'كلوريد البوتاسيوم (KCl)', amount: '40 كجم/فدان', timing: 'بعد 4-6 أشهر من الزراعة', description: 'يُستخدم لامتلاء الدرنات' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 12-12-17 بمعدل 70 كجم للفدان في تلال الزراعة.' },
            { stage: 'بعد 4-6 أشهر', desc: 'استخدم KCl بمعدل 40 كجم للفدان كسماد جانبي خلال مرحلة امتلاء الدرنات.' }
        ],
        tips: 'يحتاج اليام إلى البوتاسيوم لنمو الدرنات. تجنب النيتروجين الزائد الذي يشجع نمو الفروع. كوّم التربة حول النباتات لتكوين درنات أفضل.'
    },
    sugarcane: {
        name: 'قصب السكر',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '100 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتأسيس النبات' },
            { name: 'Urea (46% N)', amount: '80 كجم/فدان', timing: 'بعد 2-3 أشهر من الزراعة', description: 'يُستخدم لنمو العيدان' },
            { name: 'كلوريد البوتاسيوم (KCl)', amount: '60 كجم/فدان', timing: 'بعد 4-6 أشهر من الزراعة', description: 'يُستخدم لزيادة نسبة السكر' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 15-15-15 بمعدل 100 كجم للفدان في خطوط الزراعة.' },
            { stage: 'بعد 2-3 أشهر', desc: 'استخدم اليوريا بمعدل 80 كجم للفدان خلال النمو النشط للعيدان.' },
            { stage: 'بعد 4-6 أشهر', desc: 'استخدم KCl بمعدل 60 كجم للفدان لتراكم السكر.' }
        ],
        tips: 'يحتاج قصب السكر إلى كميات عالية من النيتروجين والبوتاسيوم. استخدمهما على دفعات. اسقِ بعد الاستخدام لامتصاص أفضل.'
    },
    rice: {
        name: 'الأرز',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '50 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتأسيس النبات' },
            { name: 'Urea (46% N)', amount: '60 كجم/فدان', timing: 'بعد 4 أسابيع من الزراعة', description: 'يُستخدم لمرحلة التفريع' },
            { name: 'Urea (46% N)', amount: '40 كجم/فدان', timing: 'بعد 8 أسابيع من الزراعة', description: 'يُستخدم لبداية تكوين السنابل' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 15-15-15 بمعدل 50 كجم للفدان في خطوط الزراعة.' },
            { stage: 'بعد 4 أسابيع', desc: 'استخدم اليوريا بمعدل 60 كجم للفدان خلال مرحلة التفريع النشط.' },
            { stage: 'بعد 8 أسابيع', desc: 'استخدم اليوريا بمعدل 40 كجم للفدان لبداية تكوين السنابل ونمو الحبوب.' }
        ],
        tips: 'يستجيب الأرز جيداً للنيتروجين. استخدمه على دفعات. حافظ على مستوى الماء المناسب بعد استخدام السماد. تجنب الاستخدام خلال فترات الأمطار.'
    },
    sunflower: {
        name: 'دوار الشمس',
        fertilizerTypes: [
            { name: 'NPK 10-20-10', amount: '50 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتكوين الزيت' },
            { name: 'Urea (46% N)', amount: '30 كجم/فدان', timing: 'بعد 4-6 أسابيع من الزراعة', description: 'يُستخدم خلال النمو الخضري' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 10-20-10 بمعدل 50 كجم للفدان في خطوط الزراعة.' },
            { stage: 'بعد 4-6 أسابيع', desc: 'استخدم اليوريا بمعدل 30 كجم للفدان كسماد جانبي خلال النمو الخضري.' }
        ],
        tips: 'يحتاج دوار الشمس إلى الفوسفور لنسبة الزيت. تجنب الإفراط في التسميد بالنيتروجين لأنه يقلل نسبة الزيت. استخدم البورون لعقد بذور أفضل.'
    },
    banana: {
        name: 'الموز',
        fertilizerTypes: [
            { name: 'NPK 12-12-17', amount: '80 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتأسيس النبات' },
            { name: 'Urea (46% N)', amount: '60 كجم/فدان', timing: 'بعد 3-4 أشهر من الزراعة', description: 'يُستخدم للنمو الخضري' },
            { name: 'كلوريد البوتاسيوم (KCl)', amount: '50 كجم/فدان', timing: 'بعد 5-6 أشهر من الزراعة', description: 'يُستخدم لنمو السباطات' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 12-12-17 بمعدل 80 كجم للفدان في حفر الزراعة.' },
            { stage: 'بعد 3-4 أشهر', desc: 'استخدم اليوريا بمعدل 60 كجم للفدان خلال مرحلة النمو النشط.' },
            { stage: 'بعد 5-6 أشهر', desc: 'استخدم KCl بمعدل 50 كجم للفدان لنمو السباطات.' }
        ],
        tips: 'الموز من النباتات الشرهة للبوتاسيوم. استخدم السماد بشكل متكرر. اسقِ بعد الاستخدام. ضع السماد عند قاعدة النبات وليس على الجذع مباشرة.'
    },
    watermelon: {
        name: 'البطيخ',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '60 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لنمو الفروع' },
            { name: 'Urea (46% N)', amount: '30 كجم/فدان', timing: 'بعد 4 أسابيع من الزراعة', description: 'يُستخدم لنمو الفروع' },
            { name: 'NPK 15-30-15', amount: '40 كجم/فدان', timing: 'عند الإزهار', description: 'يُستخدم لتكوين الثمار' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 15-15-15 بمعدل 60 كجم للفدان في مصاطب الزراعة.' },
            { stage: 'بعد 4 أسابيع', desc: 'استخدم اليوريا بمعدل 30 كجم للفدان خلال مرحلة نمو الفروع.' },
            { stage: 'عند الإزهار', desc: 'استخدم NPK 15-30-15 بمعدل 40 كجم للفدان عند بدء إزهار الفروع.' }
        ],
        tips: 'يحتاج البطيخ إلى الفوسفور للإزهار وعقد الثمار. قلل النيتروجين بعد عقد الثمار. استخدم البوتاسيوم لجودة الثمار وحلاوتها.'
    },
    cabbage: {
        name: 'الملفوف',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '60 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتأسيس النبات' },
            { name: 'Urea (46% N)', amount: '40 كجم/فدان', timing: 'بعد 3-4 أسابيع من الزراعة', description: 'يُستخدم خلال تكوين الرؤوس' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 15-15-15 بمعدل 60 كجم للفدان في خطوط الزراعة.' },
            { stage: 'بعد 3-4 أسابيع', desc: 'استخدم اليوريا بمعدل 40 كجم للفدان خلال مرحلة تكوين الرؤوس.' }
        ],
        tips: 'يحتاج الملفوف إلى النيتروجين لنمو الأوراق. استخدم البورون لمنع تجوف القلب. اسقِ بعد الاستخدام. تجنب الإفراط في التسميد.'
    },
    pigeonpeas: {
        name: 'اللوبيا',
        fertilizerTypes: [
            { name: 'سوبر فوسفات أحادي (SSP)', amount: '40 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لنمو الجذور' },
            { name: 'كلوريد البوتاسيوم (KCl)', amount: '15 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتكوين القرون' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم SSP بمعدل 40 كجم للفدان وKCl بمعدل 15 كجم للفدان في خط الزراعة.' },
            { stage: 'عند الإزهار', desc: 'استخدم البورون بمعدل 2-3 كجم/فدان لعقد قرون أفضل (اختياري).' }
        ],
        tips: 'هذا المحصول يثبّت النيتروجين بنفسه. استخدم أسمدة الفوسفور والبوتاسيوم. لقّح البذور ببكتيريا الريزوبيوم لتثبيت نيتروجين أفضل.'
    },
    mangoes: {
        name: 'المانجو',
        fertilizerTypes: [
            { name: 'NPK 12-12-17', amount: '60 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتأسيس النبات' },
            { name: 'Urea (46% N)', amount: '40 كجم/فدان', timing: 'بعد 3-4 أشهر من الزراعة', description: 'يُستخدم للنمو الخضري' },
            { name: 'كلوريد البوتاسيوم (KCl)', amount: '30 كجم/فدان', timing: 'قبل الإزهار', description: 'يُستخدم للإزهار وعقد الثمار' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 12-12-17 بمعدل 60 كجم للفدان في حفر الزراعة.' },
            { stage: 'بعد 3-4 أشهر', desc: 'استخدم اليوريا بمعدل 40 كجم للفدان خلال النمو الخضري.' },
            { stage: 'قبل الإزهار', desc: 'استخدم KCl بمعدل 30 كجم للفدان قبل الإزهار لعقد ثمار أفضل.' }
        ],
        tips: 'تحتاج المانجو إلى البوتاسيوم لجودة الثمار. استخدم السماد بعد الحصاد للموسم التالي. اسقِ بعد الاستخدام خلال موسم الجفاف.'
    },
    coffee: {
        name: 'القهوة',
        fertilizerTypes: [
            { name: 'NPK 12-12-17', amount: '70 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتأسيس النبات' },
            { name: 'Urea (46% N)', amount: '50 كجم/فدان', timing: 'بداية الأمطار', description: 'يُستخدم للنمو الخضري' },
            { name: 'كلوريد البوتاسيوم (KCl)', amount: '40 كجم/فدان', timing: 'قبل الإزهار', description: 'يُستخدم للإزهار ونمو حبوب البن' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 12-12-17 بمعدل 70 كجم للفدان في حفر الزراعة.' },
            { stage: 'بداية الأمطار', desc: 'استخدم اليوريا بمعدل 50 كجم للفدان في بداية موسم الأمطار.' },
            { stage: 'قبل الإزهار', desc: 'استخدم KCl بمعدل 40 كجم للفدان قبل الإزهار لنمو حبوب البن.' }
        ],
        tips: 'تحتاج القهوة إلى تسميد منتظم. استخدم السماد على دفعات طوال موسم النمو. ضع نشارة (ملش) حول الأشجار للحفاظ على الرطوبة.'
    },
    tea: {
        name: 'الشاي',
        fertilizerTypes: [
            { name: 'NPK 12-12-17', amount: '60 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتأسيس النبات' },
            { name: 'Urea (46% N)', amount: '50 كجم/فدان', timing: 'بعد 3-4 أسابيع من الزراعة', description: 'يُستخدم لنمو الأوراق' },
            { name: 'NPK 15-15-15', amount: '40 كجم/فدان', timing: 'بعد كل حصاد', description: 'يُستخدم بعد كل دورة قطف' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 12-12-17 بمعدل 60 كجم للفدان في خطوط الزراعة.' },
            { stage: 'بعد 3-4 أسابيع', desc: 'استخدم اليوريا بمعدل 50 كجم للفدان لنمو الأوراق.' },
            { stage: 'بعد كل حصاد', desc: 'استخدم NPK 15-15-15 بمعدل 40 كجم للفدان بعد كل دورة قطف.' }
        ],
        tips: 'يحتاج الشاي إلى نيتروجين منتظم لإنتاج الأوراق. استخدم السماد بعد كل حصاد. حافظ على حموضة التربة. اسقِ بعد الاستخدام.'
    },
    tobacco: {
        name: 'التبغ',
        fertilizerTypes: [
            { name: 'NPK 12-12-17', amount: '70 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتأسيس النبات' },
            { name: 'Urea (46% N)', amount: '50 كجم/فدان', timing: 'بعد 4-6 أسابيع من الزراعة', description: 'يُستخدم لنمو الأوراق' },
            { name: 'كلوريد البوتاسيوم (KCl)', amount: '30 كجم/فدان', timing: 'بعد 8-10 أسابيع من الزراعة', description: 'يُستخدم لجودة الأوراق' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 12-12-17 بمعدل 70 كجم للفدان في خطوط الزراعة.' },
            { stage: 'بعد 4-6 أسابيع', desc: 'استخدم اليوريا بمعدل 50 كجم للفدان خلال النمو النشط للأوراق.' },
            { stage: 'بعد 8-10 أسابيع', desc: 'استخدم KCl بمعدل 30 كجم للفدان لجودة أوراق أفضل.' }
        ],
        tips: 'يستجيب التبغ جيداً للنيتروجين. استخدمه على دفعات. تجنب الإفراط في التسميد. أوقف التسميد قبل الحصاد بـ 3-4 أسابيع.'
    },
    cotton: {
        name: 'القطن',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '60 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتأسيس النبات' },
            { name: 'Urea (46% N)', amount: '50 كجم/فدان', timing: 'بعد 4-6 أسابيع من الزراعة', description: 'يُستخدم للنمو الخضري' },
            { name: 'كلوريد البوتاسيوم (KCl)', amount: '30 كجم/فدان', timing: 'قبل الإزهار', description: 'يُستخدم لنمو اللوز' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 15-15-15 بمعدل 60 كجم للفدان في خطوط الزراعة.' },
            { stage: 'بعد 4-6 أسابيع', desc: 'استخدم اليوريا بمعدل 50 كجم للفدان خلال النمو الخضري.' },
            { stage: 'قبل الإزهار', desc: 'استخدم KCl بمعدل 30 كجم للفدان لنمو اللوز وجودة الألياف.' }
        ],
        tips: 'يحتاج القطن إلى تغذية متوازنة. استخدم البوتاسيوم لجودة الألياف. تجنب الإفراط في التسميد الذي يشجع النمو الزائد.'
    },
    soybean: {
        name: 'فول الصويا',
        fertilizerTypes: [
            { name: 'سوبر فوسفات أحادي (SSP)', amount: '45 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لنمو الجذور' },
            { name: 'كلوريد البوتاسيوم (KCl)', amount: '20 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتكوين القرون' },
            { name: 'الجبس', amount: '25 كجم/فدان', timing: 'عند الإزهار', description: 'يُستخدم لعقد القرون وجودة الحبوب' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم SSP بمعدل 45 كجم للفدان وKCl بمعدل 20 كجم للفدان في خط الزراعة.' },
            { stage: 'عند الإزهار', desc: 'استخدم الجبس بمعدل 25 كجم للفدان لعقد قرون أفضل وجودة حبوب أعلى.' }
        ],
        tips: 'فول الصويا يثبّت النيتروجين. استخدم أسمدة الفوسفور والبوتاسيوم. لقّح البذور ببكتيريا الريزوبيوم. استخدم الكبريت لمحتوى بروتين أفضل.'
    },
    fingermillet: {
        name: 'دخن الإصبع',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '40 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتأسيس النبات' },
            { name: 'Urea (46% N)', amount: '20 كجم/فدان', timing: 'بعد 5-6 أسابيع من الزراعة', description: 'يُستخدم لنمو الحبوب' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 15-15-15 بمعدل 40 كجم للفدان في خطوط الزراعة.' },
            { stage: 'بعد 5-6 أسابيع', desc: 'استخدم اليوريا بمعدل 20 كجم للفدان خلال مرحلة نمو الحبوب.' }
        ],
        tips: 'يستجيب دخن الإصبع للفوسفور. استخدم السماد عندما تكون التربة رطبة. تجنب الإفراط في استخدام النيتروجين.'
    },
    pearlmillet: {
        name: 'دخن اللؤلؤ',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '40 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتأسيس النبات' },
            { name: 'Urea (46% N)', amount: '25 كجم/فدان', timing: 'بعد 5-6 أسابيع من الزراعة', description: 'يُستخدم لنمو الحبوب' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 15-15-15 بمعدل 40 كجم للفدان في خطوط الزراعة.' },
            { stage: 'بعد 5-6 أسابيع', desc: 'استخدم اليوريا بمعدل 25 كجم للفدان خلال نمو الحبوب.' }
        ],
        tips: 'دخن اللؤلؤ يتحمل الجفاف لكنه يستجيب جيداً للسماد. استخدمه عند توفر الرطوبة. تجنب الإفراط في الاستخدام.'
    },
    eggplant: {
        name: 'الباذنجان',
        fertilizerTypes: [
            { name: 'NPK 15-15-15', amount: '50 كجم/فدان', timing: 'عند الزراعة', description: 'يُستخدم عند الزراعة لتأسيس النبات' },
            { name: 'Urea (46% N)', amount: '30 كجم/فدان', timing: 'بعد 4-6 أسابيع من الزراعة', description: 'يُستخدم للنمو الخضري' },
            { name: 'NPK 15-30-15', amount: '25 كجم/فدان', timing: 'عند الإزهار', description: 'يُستخدم لتكوين الثمار' }
        ],
        applicationSchedule: [
            { stage: 'عند الزراعة', desc: 'استخدم NPK 15-15-15 بمعدل 50 كجم للفدان في حفر الزراعة.' },
            { stage: 'بعد 4-6 أسابيع', desc: 'استخدم اليوريا بمعدل 30 كجم للفدان خلال النمو الخضري.' },
            { stage: 'عند الإزهار', desc: 'استخدم NPK 15-30-15 بمعدل 25 كجم للفدان عند ظهور الأزهار.' }
        ],
        tips: 'يحتاج الباذنجان إلى تغذية منتظمة. استخدم السماد كل 4-6 أسابيع. اسقِ بعد الاستخدام. استخدم النشارة للحفاظ على الرطوبة.'
    }
};

// ========================================
// FUNCTION: GET DATASET FOR CURRENT LANGUAGE
// ========================================

function getFertilizerDataset() {
    return getFertilizerLanguage() === 'juba' ? fertilizerDataJuba : fertilizerData;
}

function getCropData(key) {
    const data = getFertilizerDataset();
    // Fall back to the English entry if the crop is missing in the Arabic set
    return data[key] || fertilizerData[key];
}

// ========================================
// GET CROP NAMES FROM FERTILIZER DATA
// ========================================

const cropNames = Object.keys(fertilizerData);

// ========================================
// DOM ELEMENTS
// ========================================

const cropList = document.getElementById('cropList');
const cropSearch = document.getElementById('cropSearch');
const detailsPanel = document.getElementById('fertilizerDetails');

// ========================================
// FUNCTION: GET CURRENT LANGUAGE
// ========================================

function getFertilizerLanguage() {
    const switcher = document.getElementById('languageSwitcher');
    if (switcher) {
        const val = switcher.value;
        return (val === 'juba' || val === 'ar') ? 'juba' : 'en';
    }
    return 'en';
}

// ========================================
// FUNCTION: RENDER CROP LIST
// ========================================

function renderCropList(filter = '') {
    const lang = getFertilizerLanguage();
    const t = translations[lang] || translations.en || {};

    const filtered = cropNames.filter(name => 
        name.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
        cropList.innerHTML = `
            <div style="text-align:center; padding: 2rem 1rem; color: var(--text-muted);">
                <div style="font-size: 32px; margin-bottom: 0.5rem;">🔍</div>
                <p>${t.noFertilizerData || 'No crops found. Try a different search.'}</p>
            </div>
        `;
        return;
    }

    cropList.innerHTML = filtered.map(key => {
        const crop = getCropData(key);
        const titleKey = key + 'Title';
        const translatedName = t[titleKey] || crop.name;

        return `
            <div class="crop-option" data-crop="${key}" onclick="window.selectCrop('${key}')">
                <span class="name">${translatedName}</span>
            </div>
        `;
    }).join('');
} // <-- THIS CLOSING BRACE WAS MISSING!

// ========================================
// FUNCTION: SELECT A CROP
// ========================================

function selectCrop(key) {
    // Update active state
    document.querySelectorAll('.crop-option').forEach(el => el.classList.remove('active'));
    const selected = document.querySelector(`.crop-option[data-crop="${key}"]`);
    if (selected) selected.classList.add('active');

    // Show details
    showCropDetails(key);
}

// ========================================
// FUNCTION: SHOW CROP DETAILS
// ========================================

function showCropDetails(key) {
    const crop = getCropData(key);
    if (!crop) return;

    // Get current language and translations
    const lang = getFertilizerLanguage();
    const t = translations[lang] || translations.en || {};

    console.log('Current language:', lang);
    console.log('All translations for this language:', t);
    console.log('sorghumTitle:', t.sorghumTitle);
    console.log('sorghumFertilizer:', t.sorghumFertilizer);
    console.log('fertilizerTypesLabel:', t.fertilizerTypesLabel);

    // Get translated crop name (with fallback)
    const titleKey = key + 'Title';
    const cropTitle = t[titleKey] || crop.name;

    // Label fallbacks (prevents page from breaking if translations are missing)
    const amountLabel = t.amountLabel || 'Amount:';
    const timingLabel = t.timingLabel || 'Timing:';
    const fertilizerTypesLabel = t.fertilizerTypesLabel || 'Fertilizer Types';
    const applicationScheduleLabel = t.applicationScheduleLabel || 'Application Schedule';
    const tipLabel = t.tipLabel || 'Tip:';
    const typesLabel = t.typesLabel || 'types';

    const typesHtml = crop.fertilizerTypes.map(item => `
        <div class="fertilizer-card">
            <div class="title">${item.name}</div>
            <div class="detail"><strong>${amountLabel}</strong> ${item.amount}</div>
            <div class="detail"><strong>${timingLabel}</strong> ${item.timing}</div>
            <div class="detail">${item.description}</div>
        </div>
    `).join('');

    const timelineHtml = crop.applicationSchedule.map(item => `
        <div class="timeline-item">
            <span class="stage">${item.stage}</span>
            <span class="desc">${item.desc}</span>
        </div>
    `).join('');

    detailsPanel.innerHTML = `
        <div class="crop-header">
            <h3>${cropTitle}</h3>
        </div>

        <div class="fertilizer-section">
            <h4>${fertilizerTypesLabel} <span class="badge">${crop.fertilizerTypes.length} ${typesLabel}</span></h4>
            ${typesHtml}
        </div>

        <div class="fertilizer-section">
            <h4>${applicationScheduleLabel}</h4>
            <div class="application-timeline">
                ${timelineHtml}
            </div>
        </div>

        <div class="fertilizer-tip">
            <span><strong>${tipLabel}</strong> ${crop.tips}</span>
        </div>
    `;

    detailsPanel.classList.add('active');
    detailsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

if (cropSearch) {
    cropSearch.addEventListener('input', function() {
        renderCropList(this.value);
    });
}

// ========================================
// INITIALIZE - SELECT FIRST CROP BY DEFAULT
// ========================================

renderCropList();
if (cropNames.length > 0) {
    selectCrop(cropNames[0]);
}

// ========================================
// EXPOSE FUNCTIONS GLOBALLY
// ========================================

window.selectCrop = selectCrop;
window.renderCropList = renderCropList;


// Listen for language changes
document.addEventListener('DOMContentLoaded', function() {
    const switcher = document.getElementById('languageSwitcher');
    if (switcher) {
        switcher.addEventListener('change', function() {
            // Get the currently selected crop
            const activeCrop = document.querySelector('.crop-option.active');
            if (activeCrop) {
                const cropKey = activeCrop.getAttribute('data-crop');
                // Re-render the crop list and details in the new language
                renderCropList();
                selectCrop(cropKey);
            } else {
                // If no crop is selected, just re-render the list
                renderCropList();
                if (cropNames.length > 0) {
                    selectCrop(cropNames[0]);
                }
            }

             const lang = getFertilizerLanguage();
            const t = translations[lang] || translations.en || {};
            const searchInput = document.getElementById('cropSearch');
            if (searchInput) {
                searchInput.placeholder = t.searchCrops || 'Search crops...';
            }
        });
    }
});
