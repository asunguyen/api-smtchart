const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const ordersSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    goi: {
        type: Number,//1, 3, 6, 12
        default: 1
    },
    status: {
        type: String,
        default: "create", //create, payment, success
    },
    amount: {
        type: Number,
        default: 600000
    },
    timeUse: {
        type: Number,
        default: 30
    },

}, {timestamps: true});

module.exports = mongoose.model("orders", ordersSchema);

