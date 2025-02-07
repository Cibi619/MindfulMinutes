const mongoose = require('mongoose')

const BreathingExerciseSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exercise_type: { type: String, required: true },
    duration: { type: Number, required: true }, // In minutes
    date_completed: { type: Date, default: Date.now },
})

module.exports = mongoose.model('BreathingExercise', BreathingExerciseSchema)