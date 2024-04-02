const OrderModel = require("../models/ordersModel");
const orderController = {
    createOrder: async (req, res) => {
        try {
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
            res.json({ code: 500, error: err });
        }
    },
};
module.exports = orderController;