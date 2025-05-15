const { Router } = require('express');
const User = require('../db');
const bcrypt = require('bcryptjs');
const router = Router();

router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, password } = req.body;

        // Validate input
        if (!firstName || !lastName || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ firstName, lastName });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            firstName,
            lastName,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully' });
        
    } catch (error) {
        console.error('Signup error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'User already exists' });
        }
        res.status(500).json({ message: 'Error creating user' });
    }
});

module.exports = router;