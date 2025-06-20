const express = require('express');
const router = express.Router();

const { User, Account } = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const authMiddleware = require('../middleware');

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

router.post('/signup', async (req, res) => {
    const { username, password, firstName, lastName } = req.body;

    const {success} = signupSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({ message: 'Invalid inputs' });
    }
    
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashedPassword,
            firstName,
            lastName
        });

        // Creating New Account
        const userId = user._id;
        const account = await Account.create({
            userId,
            balance: 1 + Math.random() * 1000
        });
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: {
            id: user._id,
            username,
            firstName: user.firstName,
            lastName: user.lastName,
            balance: account.balance
        } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        
        // Get the account to include balance
        const account = await Account.findOne({ userId: user._id });
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: {
            id: user._id,
            username,
            firstName: user.firstName,
            lastName: user.lastName,
            balance: account ? account.balance : 0
        } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

router.put('/update', authMiddleware, async (req, res) => {
    const {success} = updateBody.safeParse(req.body);   
    if (!success) {
        return res.status(411).json({ message: 'Invalid inputs' });
    }
    await User.updateOne({ _id: req.userId }, req.body);
    res.status(200).json({ message: 'User updated successfully' });
})



router.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        _id: { $ne: req.userId }, 
        $or: [
            {
                firstName: {
                    "$regex": filter,
                    "$options": "i" // Case-insensitive
                }
            },
            {
                lastName: {
                    "$regex": filter,
                    "$options": "i"
                }
            }
        ]
    });

    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});

module.exports = router;