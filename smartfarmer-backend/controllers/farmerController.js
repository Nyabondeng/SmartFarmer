const pool = require("../config/db");

exports.getProfile = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT
            id,
            full_name,
            email,
            phone,
            created_at

            FROM users

            WHERE id=$1`,

            [req.user.id]

        );

        res.json({

            success: true,
            user: result.rows[0]

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
