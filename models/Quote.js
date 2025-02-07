const mongoose = require('mongoose')

const QuoteSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quote_text: { type: String, required: true },
    date_opened: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
})

module.exports = mongoose.model('Quote', QuoteSchema)