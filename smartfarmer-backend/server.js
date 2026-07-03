const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({origin: "https://smrtfarmer.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false 
    }
});


pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
    } else {
        console.log('Database connected successfully');
        release();
    }
});



async function createTables() {
    try {

      await pool.query(`
            CREATE TABLE IF NOT EXISTS farmers (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                phone VARCHAR(20) UNIQUE,
                location VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);


        await pool.query(`
            CREATE TABLE IF NOT EXISTS crop_logs (
                id SERIAL PRIMARY KEY,
                farmer_id INTEGER REFERENCES farmers(id) ON DELETE CASCADE,
                crop VARCHAR(50),
                planting_date DATE,
                harvest_date DATE,
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);


        await pool.query(`
            CREATE TABLE IF NOT EXISTS ussd_logs (
                id SERIAL PRIMARY KEY,
                phone VARCHAR(20),
                session_id VARCHAR(100),
                menu_path TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Database tables created successfully');
    } catch (error) {
        console.error('Error creating tables:', error.message);
    }
}


createTables();


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
  return `CON Smart Farmer\nFarming Info System\n\nWelcome! Choose a crop:\n\n1. Sorghum\n2. Maize\n3. Millet\n4. Groundnuts\n5. Cassava`;
}

function cropMenu(cropNum) {
  const crop = CROPS[cropNum];
  return `CON Smart Farmer\n${crop.name}\n\nSelect information:\n\n1. Planting Guide\n2. Pest Control\n3. Harvest Guide\n\n0. Back to crops`;
}


app.post('/ussd', async (req, res) => {
  const { sessionId, phoneNumber, text } = req.body;


  try {
    await pool.query(
      'INSERT INTO ussd_logs (phone, session_id, menu_path) VALUES ($1, $2, $3)',
      [phoneNumber, sessionId, text || 'main']
    );
  } catch (error) {
    console.error('Error logging USSD:', error.message);
  }

  const textArray = text ? text.split('*') : [];
  const level = textArray.length;
  let response = '';

  if (text === '') {
    response = mainMenu();
  } else if (level === 1) {
    const cropChoice = textArray[0];
    if (CROPS[cropChoice]) {
      response = cropMenu(cropChoice);
    } else {
      response = `CON Smart Farmer\n\nInvalid option.\nPlease try again.\n\n0. Back to main menu`;
    }
  } else if (level === 2) {
    const cropChoice = textArray[0];
    const infoChoice = textArray[1];

    if (infoChoice === '0') {
      response = mainMenu();
    } else if (CROPS[cropChoice]) {
      const crop = CROPS[cropChoice];
      if (infoChoice === '1') {
        response = `END ${crop.planting}`;
      } else if (infoChoice === '2') {
        response = `END ${crop.pest}`;
      } else if (infoChoice === '3') {
        response = `END ${crop.harvest}`;
      } else {
        response = cropMenu(cropChoice);
      }
    } else {
      response = mainMenu();
    }
  } else if (level === 3) {
    const cropChoice = textArray[0];
    const backChoice = textArray[2];
    if (backChoice === '0') {
      response = cropMenu(cropChoice);
    } else if (backChoice === '00') {
      response = mainMenu();
    } else {
      response = mainMenu();
    }
  } else {
    response = mainMenu();
  }

  res.set('Content-Type', 'text/plain');
  res.send(response);
});


app.get('/api/crops', (req, res) => {
  const crops = Object.keys(CROPS).map(key => ({
    id: key,
    name: CROPS[key].name,
  }));
  res.json({ success: true, data: crops });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Smart Farmer server is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/farmers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM farmers ORDER BY id');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/farmers', async (req, res) => {
  const { name, phone, location } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO farmers (name, phone, location) VALUES ($1, $2, $3) RETURNING *',
      [name, phone, location]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/logs', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT l.*, f.name as farmer_name, f.phone as farmer_phone
      FROM crop_logs l
      LEFT JOIN farmers f ON l.farmer_id = f.id
      ORDER BY l.created_at DESC
    `);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/logs', async (req, res) => {
  const { farmer_id, crop, planting_date, harvest_date, notes } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO crop_logs (farmer_id, crop, planting_date, harvest_date, notes)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [farmer_id, crop, planting_date, harvest_date, notes]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/ussd-logs', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM ussd_logs ORDER BY created_at DESC LIMIT 50'
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


app.get('/', (req, res) => {
  res.send('Smart Farmer Backend Running');
});


app.use(express.static(path.join(__dirname, '..')));


app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

console.log('PORT from Render:', process.env.PORT);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);

  console.log('=========================================');
  console.log('  Smart Farmer server is running!');
  console.log(`  Open: http://localhost:${PORT}`);
  console.log(`  USSD endpoint: http://localhost:${PORT}/ussd`);
  console.log('  Database: PostgreSQL');
  console.log('=========================================');
});
