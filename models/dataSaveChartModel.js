const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const dataSaveChart = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    watchList: {
        type: String
    }


}, {timestamps: true});

module.exports = mongoose.model("dataSaveChart", dataSaveChart);

