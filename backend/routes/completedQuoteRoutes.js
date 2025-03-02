const express = require('express')
const router = express.Router()
const CompletedQuote = require('../models/CompletedQuote')
const authMiddleware = require('../middleware/authmiddleware')

// adding the completed Quote
router.post('/:id', authMiddleware, async (req, res) => {
    try {
        const user_id = req.params.id // clarification needed what to do with this id
        const { quote_id, quote } = req.body
        if (!user_id || !quote) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const completedQuote = new CompletedQuote({
            user_id, quote_id, quote, day_number: `Day-${await CompletedQuote.countDocuments({ user_id }) + 1}`
        })
        await completedQuote.save()
        res.status(201).json({ message: 'Quote added successfully' })

    } catch (err) {
        console.error(err)
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const user_id = req.params.id
        const completedQuotes = await CompletedQuote.find({ user_id })
        res.status(200).json(completedQuotes)
    } catch (err) {
        res.status(400).json({ message: 'Error fetching quotes' })
    }
})

module.exports = router