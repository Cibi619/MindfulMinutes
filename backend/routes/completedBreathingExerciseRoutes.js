const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const authMiddleware = require('../middleware/authmiddleware')
const CompletedBreathingExercise = require('../models/CompletedBreathingExercise')

router.post('/:id', authMiddleware, async (req, res) => {
    try {
        const user_id = req.params.id
        const { exercise_title } = req.body
        if (!user_id || !exercise_title) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // const newCompletedBreathingExercise = new CompletedBreathingExercise({
        //     user_id, exercise_title, day_number: `${await CompletedBreathingExercise.countDocuments({ user_id }) + 1}`
        // })
        const count = await CompletedBreathingExercise.countDocuments({ user_id });
        const day_number = Number.isInteger(count) ? count + 1 : 1;
        const newCompletedBreathingExercise = new CompletedBreathingExercise({
            user_id,
            exercise_title,
            day_number: day_number 
        });
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

// delete all completed breathing exercises
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
            const id = req.params.id
            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }

            const result = await CompletedBreathingExercise.deleteMany({ user_id: id })
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'No exercises found for this user' });
            }
            
            res.status(200).json({ 
                message: 'Breathing Exercises deleted successfully',
                deletedCount: result.deletedCount
            });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete completed breathing exercises' })
    }
})

module.exports = router