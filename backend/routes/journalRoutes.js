const express = require('express')
const Journal = require('../models/Journal')
const router = express.Router()
const authMiddleware = require('../middleware/authmiddleware')

// post a journal note
router.post('/', async (req, res) => {
    try {
        const { entry_text } = req.body;

        if (!entry_text) {
            return res.status(400).json({ message: 'Journal entry text is required' });
        }

        const newJournal = new Journal({
            entry_text,
            date_written: new Date(),
        });

        await newJournal.save();
        res.status(201).json(newJournal);
    } catch (err) {
        res.status(500).json({ message: 'Error creating journal entry', error: err.message });
    }
});

module.exports = router