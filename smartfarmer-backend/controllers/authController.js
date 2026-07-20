const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// Register Farmer
exports.register = async (req, res) => {
    try {
        const { name, phone, location, password } = req.body;

        if (!name || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        console.log("Checking existing farmer...");

        // Check if farmer already exists
        const existingFarmer = await pool.query(
            "SELECT * FROM farmers WHERE phone = $1",
            [phone]
        );

        if (existingFarmer.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Phone number already registered."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        console.log("Inserting farmer...");
        
        // Insert farmer
        const result = await pool.query(
            `INSERT INTO farmers (name, phone, location, password)
             VALUES ($1, $2, $3, $4)
             RETURNING id, name, phone, location`,
            [name, phone, location || null, hashedPassword]
        );

        const newFarmer = result.rows[0];

        const token = jwt.sign(
            {
                id: newFarmer.id,
                phone: newFarmer.phone
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(201).json({
            success: true,
            message: "Registration successful.",
            token,
            user: newFarmer
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Login Farmer
exports.login = async (req, res) => {

    try {

        const { phone, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM farmers WHERE phone = $1",
            [phone]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Farmer not found."
            });
        }

        const farmer = result.rows[0];

        const match = await bcrypt.compare(password, farmer.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password."
            });
        }

        const token = jwt.sign(
            {
                id: farmer.id,
                phone: farmer.phone
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: farmer.id,
                name: farmer.name,
                phone: farmer.phone,
                location: farmer.location
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
