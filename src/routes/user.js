const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');
const userValidationSchema = require('../validation/user');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

// File filter function for validating file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.'), false); // Reject file
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB file size limit
    }
});

// Register endpoint with validation middleware
router.post('/', upload.single('profilePicture'), validateRequest(userValidationSchema), (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Profile picture is required.' });
    }

    userController.registerUser(req, res, next);
});

module.exports = router;
