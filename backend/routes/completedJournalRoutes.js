const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authmiddleware')
const CompletedJournal = require('../models/CompletedJournal')

// adding the completed journal
router.post('/:id', authMiddleware, async (req, res) => {
    try {
        const user_id = req.params.id
        const { journal_content } = req.body
        if (!user_id || !journal_content) {
            return res.status(400).json({ message: "Please fill in all fields" })
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
        const id = req.params.id
        const journals = await completedJournal.find({ user_id: id })
        res.status(200).json(journals)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch journals' })
    }
})

module.exports = router