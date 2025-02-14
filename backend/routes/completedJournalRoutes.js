const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authmiddleware')
const completedJournal = require('../models/CompletedJournal')

// adding the completed journal
router.post('/:id', authMiddleware, async (req, res) => {
    try {
        const id = req.params.id
        const { user_id = id, journal_content, day_number } = req.body
        if (!user_id || !journal_content) {
            return res.status(400).json({ message: "Please fill in all fields" })
        }
        const newJournal = new completedJournal({
            user_id, journal_content, day_number: `${await completedJournal.countDocuments({ user_id }) + 1}`
        })
        await newJournal.save()
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