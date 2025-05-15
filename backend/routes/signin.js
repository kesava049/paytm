const { Router } = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../db');

router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, password } = req.body;

        // Validate input
        if (!firstName || !lastName || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find user
        const user = await User.findOne({ firstName, lastName });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName
        }, process.env.JWT_SECRET || 'your-secret-key', {
            expiresIn: '24h'
        });

        res.json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ message: 'Error during signin' });
    }
});

module.exports = router;