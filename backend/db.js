const mongoose = require("mongoose");
require("dotenv").config();


const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});



const User = mongoose.model("User", userSchema);
module.exports = User;