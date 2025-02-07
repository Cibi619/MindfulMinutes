require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRoutes = require('./routes/userRoutes')
const quoteRoutes = require('./routes/quoteRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes)
app.use('/api/quotes', quoteRoutes);

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
