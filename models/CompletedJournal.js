const mongoose = require('mongoose')

const CompletedJournalSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    journal_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Journal', required: true },
    date_completed: { type: Date, default: Date.now },
})

module.exports = mongoose.model('CompletedJournal', CompletedJournalSchema)