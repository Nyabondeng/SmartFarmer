const CropLog = require("../models/cropLogModel");

exports.createLog = async (req, res) => {

    try {

        const {

            crop,
            planting_date,
            harvest_date,
            notes

        } = req.body;

        const log = await CropLog.create(

            req.user.id,

            crop,

            planting_date,

            harvest_date,

            notes

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

            req.body.harvest_date,

            req.body.notes

        );

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
