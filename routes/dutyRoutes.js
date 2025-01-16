const express = require('express');
const router = express.Router();
const moment = require('moment');
const Duty = require('../models/Duty');

router.post("/week", async (req, res) => {
    const { weekRange } = req.body;

    try {
        const duties = await Duty.find({
            date: {
                $gte: new Date(weekRange[0]),
                $lte: new Date(weekRange[6]),
            },
        })
            .populate("vehicleId", "name")
            .populate("driverId", "name role")
            .populate("conductorId", "name role");

        const groupedDuties = weekRange.map((day) => ({
            date: day,
            duties: duties
                .filter((duty) => moment(duty.date).format("YYYY-MM-DD") === day)
                .map((duty) => ({
                    id: duty._id,
                    vehicle: duty.vehicleId.name, // Get vehicle name from populated data
                    driver: `${duty.driverId.name} (${duty.driverId.role})`, // Get driver name and role
                    conductor: `${duty.conductorId.name} (${duty.conductorId.role})`, // Get conductor name and role
                    startTime: duty.startTime,
                    duration: duty.duration,
                })),
        }));

        res.status(200).json(groupedDuties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const duties = await Duty.find()
            .populate('vehicleId', 'name')
            .populate('driverId', 'name role')
            .populate('conductorId', 'name role');
        res.json(duties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/', async (req, res) => {
    const { vehicleId, driverId, conductorId, startTime, duration, date } = req.body;

    try {
        // Create a new duty document
        const newDuty = new Duty({
            vehicleId,
            driverId,
            conductorId,
            startTime,
            duration,
            date,
        });

        // Save to the database
        const duty = await newDuty.save();
        res.status(201).json(duty);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
