const mongoose = require('mongoose')

const JournalSchema = new mongoose.Schema({
    entry_text: { type: String, required: true },
    date_written: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Journal', JournalSchema)