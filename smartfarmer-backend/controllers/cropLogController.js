const CropLog = require("../models/CropLogModel");

exports.createLog = async (req, res) => {

    try {

        const {

            crop,
            planting_date,
            harvest_date,
            notes,
            status,
            location

        } = req.body;

        if (!crop || !planting_date) {
            return res.status(400).json({
                success: false,
                message: "Crop and planting date are required."
            });
        }

        const log = await CropLog.create(

            req.user.id,

            crop,

            planting_date,

            harvest_date || null,

            notes,

            status,

            location

        );

        res.status(201).json({

            success: true,

            data: log

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.getLogs = async (req, res) => {

    try {

        const logs = await CropLog.findByFarmer(

            req.user.id

        );

        res.json({

            success: true,

            data: logs

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.updateLog = async (req, res) => {

    try {

        const log = await CropLog.update(

            req.params.id,

            req.user.id,

            req.body.crop,

            req.body.planting_date,

            req.body.harvest_date || null,

            req.body.notes,

            req.body.status,

            req.body.location

        );

        if (!log) {
            return res.status(404).json({
                success: false,
                message: "Crop log not found."
            });
        }

        res.json({

            success: true,

            data: log

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.deleteLog = async (req, res) => {

    try {

        await CropLog.delete(

            req.params.id,

            req.user.id

        );

        res.json({

            success: true,

            message: "Crop log deleted."

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
