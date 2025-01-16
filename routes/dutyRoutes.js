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
            .populate("vehicleId", "name") // Fetch name from Vehicle model
            .populate("driverId", "name role") // Fetch name and role from Crew model (Driver)
            .populate("conductorId", "name role"); // Fetch name and role from Crew model (Conductor)

        // Group duties by date
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
            .populate('vehicleId', 'vehicleName vehicleType') // Replace with actual fields in Vehicle
            .populate('driverId', 'name role') // Replace with actual fields in Crew
            .populate('conductorId', 'name role'); // Replace with actual fields in Crew
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
