const mongoose = require("mongoose");
require("dotenv").config();


const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true, 
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: { 
        type: String, 
        required: true,
        minLength: 6,
    },
    firstName: { 
        type: String,
        required: true, 
        trim: true,
        maxLength: 30
    },
    lastName: { 
        type: String,
        required: true, 
        trim: true,
        maxLength: 30 
    },
}, {
    timestamps: true
});



const User = mongoose.model("User", userSchema);
module.exports = User;