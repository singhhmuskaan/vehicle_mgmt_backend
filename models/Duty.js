const mongoose = require('mongoose');

const dutySchema = mongoose.Schema({
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'vehicle', required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'crew', required: true },
    conductorId: { type: mongoose.Schema.Types.ObjectId, ref: 'crew', required: true },
    startTime: { type: String, required: true },
    duration: { type: String, required: true },
    date: { type: Date, required: true },
});

const Duty = mongoose.model('Duty', dutySchema);

module.exports = Duty;
