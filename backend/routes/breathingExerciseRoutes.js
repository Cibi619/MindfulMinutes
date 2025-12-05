const express = require('express')
const BreathingExercise = require('../models/BreathingExercise')
const router = express.Router()
const authMiddleware = require('../middleware/authmiddleware')

// get all breathing exercises - not for users , just api checking
router.get("/", async (req, res) => {
    try {
        const exercises = await BreathingExercise.find();
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ message: "Error fetching breathing exercises", error: err.message });
    }
});

// get random breathing exercise
router.get("/random", async (req, res) => {
    try {
        const randomExercise = await BreathingExercise.aggregate([{ $sample: { size: 1 } }]);
        if (!randomExercise.length) {
            return res.status(404).json({ message: "No exercises available" });
        }
        res.json(randomExercise[0]);
    } catch (err) {
        res.status(500).json({ message: "Error fetching random exercise", error: err.message });
    }
});

// post new breathing exercise - not for users
router.post("/", async (req, res) => {
    try {
        const { exercise_title, exercise_description, videoUrl } = req.body;
        
        // if (!exercise_title || !exercise_description || !videoUrl) {
        //     return res.status(400).json({ message: "All fields (title, description, videoUrl) are required" });
        // }

        const newExercise = new BreathingExercise({ exercise_title, exercise_description, videoUrl });
        await newExercise.save();
        
        res.status(201).json(newExercise);
    } catch (err) {
        res.status(500).json({ message: "Error creating breathing exercise", error: err.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const exercise = await BreathingExercise.findByIdAndDelete(id);
        if (!exercise) {
            return res.status(404).json({ message: "Exercise not found" });
        }
        res.json({ message: "Exercise deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting exercise", error: err.message });
    }
})

module.exports = router