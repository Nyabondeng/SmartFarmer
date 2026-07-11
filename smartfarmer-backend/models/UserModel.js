const pool = require("../config/db");

const createUser = async (name, phone, location) => {
    const result = await pool.query(
        `INSERT INTO farmers(name, phone, location)
         VALUES($1,$2,$3)
         RETURNING *`,
        [name, phone, location]
    );

    return result.rows[0];
};

const findUserByPhone = async (phone) => {
    const result = await pool.query(
        `SELECT * FROM farmers WHERE phone=$1`,
        [phone]
    );

    return result.rows[0];
};

const findUserById = async (id) => {
    const result = await pool.query(
        `SELECT * FROM farmers WHERE id=$1`,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    createUser,
    findUserByPhone,
    findUserById
};
