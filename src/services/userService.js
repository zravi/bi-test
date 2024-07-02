const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const sendEmail = require('./emailService');



const registerUser = async (userData, file) => {
    const { name, email, password } = userData;
    const profilePicture = file ? file.path : null;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email is already taken');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword, profilePicture });
    await newUser.save();

    // Send confirmation email
    const subject = 'Email Confirmation';
    const text = 'Please confirm your email by clicking the following link: ...';
    await sendEmail(email, subject, text);

    return 'User registered successfully. Please check your email for confirmation.';
};

module.exports = {
    registerUser,
};
