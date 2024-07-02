require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./src/routes/user');
const connectDB = require('./src/db')
const path = require('path');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
connectDB();//connect to mongo
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use(express.static(path.join(__dirname, 'public')));

// Use the user router for /register endpoint
app.use('/register', userRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`test file served at http://localhost:${PORT}/index.html`);
});