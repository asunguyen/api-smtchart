const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const chartTemplateModel = new mongoose.Schema({
    idcustom: {
        type: Number
    },
    content: {
        type: Object
    },
    name: {
        type: String,
    },
    userID: {
        type: String
    },
    page: {
        type: String
    }

}, {timestamps: true});

module.exports = mongoose.model("chartSaveTemplate", chartTemplateModel);

