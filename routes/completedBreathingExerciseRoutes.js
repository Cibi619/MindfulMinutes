const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authmiddleware')
const CompletedBreathingExercise = require('../models/CompletedBreathingExercise')

router.post('/:id', authMiddleware, async (req, res) => {
    try {
        const id = req.params.id
        const { user_id = id, exercise_title, day_number} = req.body
        if (!user_id || !exercise_title) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newCompletedBreathingExercise = new CompletedBreathingExercise({
            user_id, exercise_title, day_number: `${await CompletedBreathingExercise.countDocuments({ user_id }) + 1}`
        })
        await newCompletedBreathingExercise.save()
        res.status(201).json({ message: 'Breathing exercise completed successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to complete breathing exercise' })
    }
})

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const id = req.params.id
        const completedBreathingExercises = await CompletedBreathingExercise.find({ user_id: id })
        res.status(200).json(completedBreathingExercises)
    } catch (error) {
        res.status(500).json({ message: 'Failed to get completed breathing exercises' })
    }
})

module.exports = router