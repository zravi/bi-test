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
const upload = multer({ storage });

// Register endpoint with validation middleware
router.post('/', upload.single('profilePicture'), validateRequest(userValidationSchema), userController.registerUser);

module.exports = router;
