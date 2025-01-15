const express = require('express');
const router = express.Router();
const Duty = require('../models/Duty');


router.get('/', async (req, res) => {
    try {
        const duties = await Duty.find();
        res.json(duties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { vehicleId, driverName, conductorName, startTime, duration, date } = req.body;

    try {
        const newDuty = new Duty({
            vehicleId,
            driverName,
            conductorName,
            startTime,
            duration,
            date,
        });

        const duty = await newDuty.save();
        res.status(201).json(duty);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
