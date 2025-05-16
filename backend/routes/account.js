const express = require('express');
const { Account } = require('../db');
const authMiddleware = require('../middleware');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get('/balance', authMiddleware, async(req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId
        });
        
        if (!account) {
            return res.status(404).send({
                msg: "Account not found."
            });
        }
        
        res.json({
            msg: "Balance fetched successfully.",
            balance: account.balance
        })
    }
    catch(e){
        res.status(500).send({
            msg: "Error while fetching Balance."
        })
    }   
    
})

router.post('/transfer', authMiddleware, async(req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { to, amount } = req.body;
    
    // Debug logs
    console.log("Transfer request:", { 
        fromUserId: req.userId, 
        toUserId: to, 
        amount: amount 
    });

    const account = await Account.findOne({ userId: req.userId }).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).send({
            msg: "Insufficient balance."
        })
    }
    const toAccount = await Account.findOne({ userId: to }).session(session);  
    
    // More debug info if account is not found
    if(!toAccount){
        console.log("Recipient account not found for userId:", to);
        await session.abortTransaction();
        return res.status(400).send({
            msg: "Invalid account."
        })
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount }}).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount }}).session(session);
    
    await session.commitTransaction();
    session.endSession();
    res.status(200).send({
        msg: "Transfer successful."
    })
})

module.exports = router;