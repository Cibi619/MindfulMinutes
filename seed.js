const mongoose = require('mongoose');
require('dotenv').config();

// Import Models
const User = require('./models/User');
const Quote = require('./models/Quote');
const BreathingExercise = require('./models/BreathingExercise');
const Journal = require('./models/Journal');
const CompletedQuote = require('./models/CompletedQuote');
const CompletedExercise = require('./models/CompletedBreathingExercise');
const CompletedJournal = require('./models/CompletedJournal');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Insert Sample Data
const seedDB = async () => {
    await User.deleteMany();
    await Quote.deleteMany();
    await BreathingExercise.deleteMany();
    await Journal.deleteMany();
    await CompletedQuote.deleteMany();
    await CompletedExercise.deleteMany();
    await CompletedJournal.deleteMany();

    // Create a Sample User
    const user = await User.create({ 
        name: 'John Doe', 
        email: 'john@example.com', 
        password: 'hashedpassword' 
    });

    // Insert Sample Quotes
    const quote = await Quote.create({ 
        user_id: user._id, 
        quote_text: 'Stay positive and keep pushing forward!', 
        status: 'Pending' 
    });

    // Insert Sample Breathing Exercises
    const exercise = await BreathingExercise.create({ 
        user_id: user._id, 
        exercise_type: 'Deep Breathing', 
        duration: 5 
    });

    // Insert Sample Journal Entry
    const journal = await Journal.create({ 
        user_id: user._id, 
        entry_text: 'Feeling great today after meditating!' 
    });

    // Insert Completed Quotes
    await CompletedQuote.create({
        user_id: user._id,
        quote_id: quote._id,
        date_completed: new Date()
    });

    // Insert Completed Exercises
    await CompletedExercise.create({
        user_id: user._id,
        exercise_id: exercise._id,
        date_completed: new Date()
    });

    // Insert Completed Journal Entry
    await CompletedJournal.create({
        user_id: user._id,
        journal_id: journal._id,
        date_completed: new Date()
    });

    console.log('✅ Sample Data Inserted');
    mongoose.connection.close();
};

// Run the Seed Function
seedDB();
