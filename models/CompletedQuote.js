const mongoose = require('mongoose')

const CompletedQuoteSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quote_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote', required: true },
    date_completed: { type: Date, default: Date.now },
})

module.exports = mongoose.model('CompletedQuote', CompletedQuoteSchema)