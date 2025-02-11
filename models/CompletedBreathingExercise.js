const mongoose = require('mongoose')

const CompletedBreathingExerciseSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    day_number: { type: String },
    exercise_title: { type: String },
    date_completed: { type: Date, default: Date.now },
})

// auto-generate day-Number to display on completedQuotes screen
CompletedBreathingExerciseSchema.pre('save', async function (next) {
    const lastEntry = await this.constructor.findOne({ user_id: this.user_id })
        .sort({ date_completed: -1 });

    const lastDayNumber = lastEntry ? parseInt(lastEntry.day_number.split('-')[1]) : 0;
    this.day_number = `${lastDayNumber + 1}`;
    next();
});

module.exports = mongoose.model('CompletedBreathingExercise', CompletedBreathingExerciseSchema)