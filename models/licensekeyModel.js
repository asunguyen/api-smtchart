const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const licenseKeySchema = new mongoose.Schema({
    licenseType: {
        type: Number,
        default: 1 //
    },
    typePackage: {
        type: Number,
        default: 1 // 1 là gói sử dụng thông thường, 2 là gói nâng cao có thêm tính năng
    },
    package: {
        type: Number,
        default: 0, //0 là miễn phí, 1 là 1 tháng, 3 là 3 tháng, 6 là 6 tháng, 12 là một năm
    },
    userSD: ObjectId,
    userCreate: ObjectId,
    active: {
        type: Boolean,
        default: false
    },
    amount: {
        type: Number,
        default: 0
    }

}, {timestamps: true});

module.exports = mongoose.model("license", licenseKeySchema);

