const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const CompletedQuote = require('../models/CompletedQuote')
const authMiddleware = require('../middleware/authmiddleware')

// adding the completed Quote
router.post('/:id', async (req, res) => {
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

router.get('/:id', async (req, res) => {
    try {
        const user_id = req.params.id
        const completedQuotes = await CompletedQuote.find({ user_id })
        res.status(200).json(completedQuotes)
    } catch (err) {
        res.status(400).json({ message: 'Error fetching quotes' })
    }
})

// delete completed quotes
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        
        const result = await CompletedQuote.deleteMany({ user_id: id });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No quotes found for this user' });
        }
        
        res.status(200).json({ 
            message: 'Quotes deleted successfully',
            deletedCount: result.deletedCount
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete quotes' });
    }
})

module.exports = router