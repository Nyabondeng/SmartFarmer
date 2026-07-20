const pool = require("../config/db");

const CropLog = {

    async create(farmerId, crop, plantingDate, harvestDate, notes, status, location) {

        const result = await pool.query(

            `INSERT INTO crop_logs
            (farmer_id, crop, planting_date, harvest_date, notes, status, location)

            VALUES ($1,$2,$3,$4,$5,$6,$7)

            RETURNING *`,

            [farmerId, crop, plantingDate, harvestDate, notes, status || 'Planted', location]

        );

        return result.rows[0];

    },

    async findByFarmer(farmerId) {

        const result = await pool.query(

            `SELECT *

             FROM crop_logs

             WHERE farmer_id=$1

             ORDER BY planting_date DESC`,

            [farmerId]

        );

        return result.rows;

    },

    async update(id, farmerId, crop, plantingDate, harvestDate, notes, status, location) {

        const result = await pool.query(

            `UPDATE crop_logs

            SET crop=$1,
                planting_date=$2,
                harvest_date=$3,
                notes=$4,
                status=$5,
                location=$6

            WHERE id=$7
            AND farmer_id=$8

            RETURNING *`,

            [crop, plantingDate, harvestDate, notes, status || 'Planted', location, id, farmerId]

        );

        return result.rows[0];

    },

    async delete(id, farmerId) {

        await pool.query(

            `DELETE FROM crop_logs

             WHERE id=$1

             AND farmer_id=$2`,

            [id, farmerId]

        );

    }

};

module.exports = CropLog;
