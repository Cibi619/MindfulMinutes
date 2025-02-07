const mongoose = require('mongoose')

const JournalSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    entry_text: { type: String, required: true },
    date_written: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Journal', JournalSchema)