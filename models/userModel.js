const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "learnwiths2";
// const crypto = require("crypto");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Name is required']
    },
    email: {
        type: String,
        require: [true, 'Email is required']
    },
    mobile: {
        type: Number,
        unique: true,
        require: [true, 'Mobile is required']

    },
    password: {
        type: String,
        require: [true, 'Password is required'],
        select: false,
    },
    role: {
        type: String,
        require: [true, 'Role is required']
    }
},
    { timestamps: true })

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel;