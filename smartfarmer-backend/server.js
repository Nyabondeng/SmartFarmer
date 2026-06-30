const express = require('express');
const { Pool } = require('pg');
const app     = express();
const PORT    = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(__dirname));



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
    pest:     `Smart Farmer\nSorghum - Pest Control\n\nWatch for armyworms\nafter first rain.\nCheck fields weekly.\nUse yellow traps.\nSpray if needed.\n\nTip: Yellow leaves or\nholes in stem = act fast.\n\n0. Back\n00. Main Menu`,
    harvest:  `Smart Farmer\nSorghum - Harvest Guide\n\nReady: 90-120 days.\nGrains turn brown/red.\nLower leaves dry out.\n\nStorage:\nDry well before storing.\nUse sealed bags.\nCheck every 2 weeks.\n\n0. Back\n00. Main Menu`
  },
  '2': {
    name: 'Maize',
    planting: `Smart Farmer\nMaize - Planting Guide\n\nPlant March-July.\nAdd organic compost.\n2 seeds per hole, 5cm.\nRow spacing: 75cm.\n\nTip: Needs regular\nwatering during grain\nformation.\n\n0. Back\n00. Main Menu`,
    pest:     `Smart Farmer\nMaize - Pest Control\n\nWatch for fall armyworm\nin the funnel.\nCheck leaf undersides\nfor eggs.\nRemove infected plants.\n\nTip: Rotate crops\nevery season.\n\n0. Back\n00. Main Menu`,
    harvest:  `Smart Farmer\nMaize - Harvest Guide\n\nReady: 90-100 days.\nLeaves around cob\ndry and turn brown.\n\nStorage:\nRemove husks.\nSun-dry 3-5 days.\nStore in waxed bags.\n\n0. Back\n00. Main Menu`
  },
  '3': {
    name: 'Millet',
    planting: `Smart Farmer\nMillet - Planting Guide\n\nPlant May-September.\nTolerates drought well.\nPlough to 15cm depth.\n5-6 seeds per hole.\nRow spacing: 50-60cm.\n\nTip: Needs rain during\nflowering stage.\n\n0. Back\n00. Main Menu`,
    pest:     `Smart Farmer\nMillet - Pest Control\n\nMain threat: Birds.\nPlace bird scarers\nin the field.\nInspect grain heads\nweekly.\n\nTip: Guard field from\nbirds near harvest.\n\n0. Back\n00. Main Menu`,
    harvest:  `Smart Farmer\nMillet - Harvest Guide\n\nReady: 75-90 days.\nGrains turn golden brown.\n\nStorage:\nCut heads, sun-dry\none week.\nRub to separate grain.\nKeeps up to 1 year.\n\n0. Back\n00. Main Menu`
  },
  '4': {
    name: 'Groundnuts',
    planting: `Smart Farmer\nGroundnuts - Planting\n\nPlant April-August.\nNeeds light sandy soil.\nSeed depth: 5-6cm.\nRow spacing: 45-50cm.\nNo nitrogen fertiliser.\n\nTip: Heavy clay soil\ndamages pod formation.\n\n0. Back\n00. Main Menu`,
    pest:     `Smart Farmer\nGroundnuts - Pest Control\n\nWatch for leaf spot\n(brown-yellow spots).\nDo not overwater.\nSpray fungicide early.\nRotate with maize.\n\nTip: Excess moisture\ncauses aflatoxin.\n\n0. Back\n00. Main Menu`,
    harvest:  `Smart Farmer\nGroundnuts - Harvest\n\nReady: 90-120 days.\nPull one plant to check.\nPods mature when veins\ndarken inside.\n\nStorage:\nSun-dry 2-3 days.\nNEVER store wet.\nBecomes toxic if wet.\n\n0. Back\n00. Main Menu`
  },
  '5': {
    name: 'Cassava',
    planting: `Smart Farmer\nCassava - Planting Guide\n\nPlant any time of year.\nBest: start of rains.\nCut stems 25-30cm.\nPlant at an angle.\nSpacing: 1m x 1m.\n\nTip: Use healthy\ndisease-free cuttings.\n\n0. Back\n00. Main Menu`,
    pest:     `Smart Farmer\nCassava - Pest Control\n\nWatch for mealybug\n(small white insect).\nRemove infected leaves\nand burn them.\nUse disease-free\ncuttings always.\n\nTip: Sensitive to\nviral diseases.\n\n0. Back\n00. Main Menu`,
    harvest:  `Smart Farmer\nCassava - Harvest Guide\n\nReady: 8-18 months.\nLeaves turn yellow\nwhen tubers ready.\n\nStorage:\nFresh: max 2-3 days.\nPeel and sun-dry\nfor flour.\n\nTip: Harvest only\nwhat you need.\n\n0. Back\n00. Main Menu`
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

  const { sessionId, phoneNumber, networkCode, text } = req.body;


  try {
    await pool.query(
      'INSERT INTO ussd_logs (phone, session_id, menu_path) VALUES ($1, $2, $3)',
      [phoneNumber, sessionId, text || 'main']
    );
  } catch (error) {
    console.error('Error logging USSD:', error.message);
  }


  const textArray = text ? text.split('*') : [];
  const level     = textArray.length;

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
    const infoChoice = textArray[1];
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
    id:    key,
    name:  CROPS[key].name,
  }));
  res.json({ success: true, data: crops });
});


app.get('/api/health', (req, res) => {
  res.json({
    success:   true,
    message:   'Smart Farmer server is running',
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


app.use((req, res) => {
 res.sendFile(path.join(__dirname, '..', 'index.html'));
});


app.listen(PORT, () => {
  console.log('=========================================');
  console.log('  Smart Farmer server is running!');
  console.log(`  Open: http://localhost:${PORT}`);
  console.log(`  USSD endpoint: http://localhost:${PORT}/ussd`);
  console.log(`  Database: PostgreSQL`);
  console.log('=========================================');
});
