const pool = require("../config/db");

exports.getProfile = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT
            id,
            name,
            phone,
            location,
            created_at

            FROM farmers

            WHERE id=$1`,

            [req.user.id]

        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Farmer not found."
            });
        }

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
