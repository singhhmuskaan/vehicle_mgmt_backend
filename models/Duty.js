const mongoose = require('mongoose');

const dutySchema = mongoose.Schema({
    vehicleId: { type: String, required: true },
    driverName: { type: String, required: true },
    conductorName: { type: String, required: true },
    startTime: { type: String, required: true },
    duration: { type: String, required: true },
    date: { type: Date, required: true },
});

const Duty = mongoose.model('Duty', dutySchema);
module.exports = Duty;
