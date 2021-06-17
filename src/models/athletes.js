const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const athleteSchema = new mongoose.Schema({
    rank: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
        trim: true
    },
    nationality: {
        type: String,
        required: true,
        trim: true
    },
    score: {
        type: Number,
        required: true
    }
});

athleteSchema.plugin(uniqueValidator);

const AthleteRanking = new mongoose.model("AthleteRanking", athleteSchema);

module.exports = AthleteRanking;