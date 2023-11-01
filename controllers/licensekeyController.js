const License = require("../models/licensekeyModel");
const User = require("../models/user");
const authMiddl = require("../middlewares/authmidd");
const { default: mongoose } = require("mongoose");

const licenseKeyController = {
    getAll: async(req, res) => {
        authMiddl.verifyTokenAdmin(req, res, async() => {
            try{
                let pageSize = parseInt(req.query.pageSize || 20);
                let page = parseInt(req.query.page || 1);
                let skips = (page - 1) * pageSize;
                const listLicense = await License.find().skip(skips).limit(pageSize).sort({ createdAt: -1 });
                res.json({code: 200, data: listLicense});
            }catch(err) {
                res.json({code: 500, error: "Có lỗi xảy ra, vui lòng liên hệ với chúng tôi!"});
            }
        });
    },
    getDetail: async(req, res) => {
        try{
            const licenseItem = await License.findById(req.params.id);
            res.json({code: 200, data: licenseItem});
        }catch(err) {
            res.json({code: 500, error: "Có lỗi xảy ra, vui lòng liên hệ với chúng tôi!"});
        }
    },
    createLicense: async(req, res) => {
        authMiddl.verifyToken(req, res, async() => {
            try {
                const newLicense = await new License({
                    typePackage: req.body.typePackage,
                    package: req.body.package,
                    userCreate: new mongoose.mongo.ObjectId(req.user.id),
                })
                const licenseItem = await newLicense.save();
                res.json({code: 200, data: licenseItem});
            } catch(err) {
                res.json({code: 500, error: "Có lỗi xảy ra, vui lòng liên hệ với chúng tôi!"});
            }
        })
    },
    active: async(req, res) => {
        authMiddl.verifyTokenAdmin(req, res, async () => {
            try{
                const licenseItem = await License.findById(req.body.license);
                if (licenseItem && licenseItem.active == false) {
                    const updateLicense = await License.findByIdAndUpdate(licenseItem._id, {active: true, userSD: licenseItem.userCreate});
                    const userSD = await User.findById(updateLicense.userSD);
                    const timeUse = userSD.timeUse + updateLicense.package * 30;
                    let expired = new Date(userSD.expired);
                    expired.setDate(expired.getDate() + updateLicense.package * 30);
                    const userUpdate = await User.findByIdAndUpdate(updateLicense.userSD, {timeUse: timeUse, expired: expired});
                    const {password, ...others} = userUpdate._doc;
                    res.json({code: 200, data: {...others}});
                } else {
                    res.json({code: 403, error: "License đã được sử dụng"});
                }

            } catch(err) {
                res.json({code: 502, error: "You're not allowed to delete other"});
            }
            
        })
    },
    createLicenseByAdmin: async(req, res) => {
        
    },
    userLicense: async(req, res) => {
        authMiddl.verifyToken(req, res, async() => {
            try{
                const licenseItem = await License.findById(req.body.license);
                if (licenseItem && licenseItem.active == false) {
                    const updateLicense = await License.findByIdAndUpdate(licenseItem._id, {active: true, userSD: licenseItem.userCreate});
                    const userSD = await User.findById(updateLicense.userSD);
                    const timeUse = userSD.timeUse + updateLicense.package * 30;
                    let expired = new Date(userSD.expired);
                    expired.setDate(expired.getDate() + updateLicense.package * 30);
                    const userUpdate = await User.findByIdAndUpdate(updateLicense.userSD, {timeUse: timeUse, expired: expired});
                    const {password, ...others} = userUpdate._doc;
                    res.json({code: 200, data: {...others}});
                } else {
                    res.json({code: 403, error: "License đã được sử dụng"});
                }

            } catch(err) {
                res.json({code: 502, error: "You're not allowed to delete other"});
            }
        })
    }
}

module.exports = licenseKeyController;