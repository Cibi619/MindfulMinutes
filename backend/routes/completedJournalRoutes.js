const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const authMiddleware = require('../middleware/authmiddleware')
const CompletedJournal = require('../models/CompletedJournal')

// adding the completed journal
router.post('/:id', authMiddleware, async (req, res) => {
    try {
        const user_id = req.params.id
        const { journal_content } = req.body
        
        if (!mongoose.isValidObjectId(user_id)) {
            return res.status(400).json({ message: "Invalid user ID" })
        }
        
        if (!journal_content) {
            return res.status(400).json({ message: "Journal content is required" })
        }
        const count = await CompletedJournal.countDocuments({ user_id });
        const day_number = Number.isInteger(count) ? count + 1 : 1;
        const newCompletedJournal = new CompletedJournal({
            user_id,
            journal_content,
            day_number: day_number 
        });
        await newCompletedJournal.save();
        res.status(201).json({ message: 'Journal added successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to add journal' })
    }
})

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const user_id = req.params.id
        
        if (!mongoose.isValidObjectId(user_id)) {
            return res.status(400).json({ message: "Invalid user ID" })
        }
        
        const journals = await CompletedJournal.find({ user_id })
        res.status(200).json(journals)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to fetch journals' })
    }
})

// delete all completed Journals
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const user_id = req.params.id
        if (!mongoose.isValidObjectId(user_id)) {
            return res.status(400).json({ message: "Invalid user ID" })
        }
        const result = await CompletedJournal.deleteMany({ user_id })
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No journals found for this user' });
        }
        
        res.status(200).json({ 
            message: 'Journals deleted successfully',
            deletedCount: result.deletedCount
        });
    } catch (error) {
        console.log(error, "--error")
    }
})

module.exports = router