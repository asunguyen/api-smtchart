const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    active: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    amount: {
        type: Number,
        default: 0
    },
    timeUse: {
        type: Number,
        default: 0
    },
    expired: {
        type: Date,
        default: new Date()
    },
    role: {
        type: Number,
        default: 0
    }

}, {timestamps: true});

module.exports = mongoose.model("user", userSchema);

