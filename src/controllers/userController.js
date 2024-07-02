const userService = require('../services/userService');
const userValidationSchema = require('../validation/user');

const registerUser = async (req, res) => {
    try {
        const result = await userService.registerUser(req.body, req.file);
        res.status(201).json({ message: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    registerUser,
};
