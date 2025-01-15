const mongoose = require('mongoose');

const crewSchema = mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
});

const Crew = mongoose.model('crew', crewSchema);

module.exports = Crew;
