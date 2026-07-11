const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// Register User
exports.register = async (req, res) => {
    try {
        const { full_name, email, phone, password } = req.body;

        if (!full_name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        // Check if user exists
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Email already registered."
            });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users
            (full_name,email,phone,password)
            VALUES($1,$2,$3,$4)
            RETURNING id,full_name,email,phone`,
            [full_name, email, phone, hashedPassword]
        );

        res.status(201).json({
            success: true,
            message: "Registration successful.",
            user: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Login User
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success:false,
                message:"User not found."
            });
        }

        const user = result.rows[0];

        const match = await bcrypt.compare(password,user.password);

        if(!match){
            return res.status(401).json({
                success:false,
                message:"Incorrect password."
            });
        }

        const token = jwt.sign(

            {
                id:user.id,
                email:user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"7d"
            }

        );

        res.json({

            success:true,
            message:"Login successful.",
            token,

            user:{
                id:user.id,
                full_name:user.full_name,
                email:user.email,
                phone:user.phone
            }

        });

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};
