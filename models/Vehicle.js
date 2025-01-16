const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
    name: { type: String, required: true },
});

const Vehicle = mongoose.model('vehicle', vehicleSchema);

module.exports = Vehicle;
