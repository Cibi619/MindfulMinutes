require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRoutes = require('./routes/userRoutes')
const quoteRoutes = require('./routes/quoteRoutes');
const journalRoutes = require('./routes/journalRoutes')
const BreathingExerciseRoutes = require('./routes/breathingExerciseRoutes')
const CompletedQuoteRoutes = require('./routes/completedQuoteRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes)
app.use('/api/quotes', quoteRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/breathingExercise', BreathingExerciseRoutes)
app.use('/api/completedQuotes', CompletedQuoteRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Routes
app.get('/', (req, res) => {
    res.send('MindfulMinutes API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
