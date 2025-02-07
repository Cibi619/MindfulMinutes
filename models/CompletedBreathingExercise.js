const mongoose = require('mongoose')

const CompletedBreathingExerciseSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exercise_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BreathingExercise', required: true },
    date_completed: { type: Date, default: Date.now },
})

module.exports = mongoose.model('CompletedBreathingExercise', CompletedBreathingExerciseSchema)