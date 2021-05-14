const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CardioSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: String,
            name: String,
            duration: Number,
            distance: Number
        }
    ]
});

const Cardio = mongoose.model("Cardio", CardioSchema);

module.exports = Cardio;