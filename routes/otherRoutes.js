const express = require('express');
const router = express.Router();
const Crew = require('../models/Crew');
const Vehicle = require('../models/Vehicle');


router.get('/crew', async (req, res) => {
    try {
        const crew = await Crew.find();
        console.log('Database Query Result:', crew);
        res.json(crew);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/vehicles', async (req, res) => {
    try {
        const vehicle = await Vehicle.find();
        console.log('Database Query Result:', vehicle);
        res.json(vehicle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
