const { Router } = require('express');
const User = require('../db');
const bcrypt = require('bcrypt');
const router = Router();

router.put('/', async (req, res) => {
    try {
        const { firstName, lastName, password } = req.body;

        // Validate input
        if (!firstName || !lastName || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find user by first and last name
        const user = await User.findOne({ firstName, lastName });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user password
        user.firstName = firstName;
        user.lastName = lastName;
        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Update password                  
        user.password = password;
        await user.save();

        res.status(200).json({ message: 'User updated successfully' });

    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
})