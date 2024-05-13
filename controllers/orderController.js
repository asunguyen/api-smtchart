const OrderModel = require("../models/ordersModel");
const UserModel = require("../models/user");
const authMiddl = require("../middlewares/authmidd");
const moment = require('moment');

function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

const orderController = {
    createOrder: async (req, res) => {
        authMiddl.verifyToken(req, res, async () => {
            try {
                process.env.TZ = 'Asia/Ho_Chi_Minh';

                let date = new Date();
                let createDate = moment(date).format('YYYYMMDDHHmmss');
                let ipAddr = req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress;
                let config = require('config');
                let tmnCode = config.get('vnp_TmnCode');
                let secretKey = config.get('vnp_HashSecret');
                let vnpUrl = config.get('vnp_Url');
                let returnUrl = config.get('vnp_ReturnUrl');
                let orderId = moment(date).format('DDHHmmss');
                let amount = req.body.amount;
                let months = req.body.months;
                const newOrder = await new OrderModel({
                    amount: amount,
                    goi: months,
                    userID: req.user.id,
                    timeUse: months*30
                })
                const licenseItem = await newOrder.save();
                let bankCode = req.body.bankCode || "VNPAYQR";

                let locale = req.body.language || "vn";
                if (locale === null || locale === '') {
                    locale = 'vn';
                }
                let currCode = 'VND';
                let vnp_Params = {};
                vnp_Params['vnp_Version'] = '2.1.0';
                vnp_Params['vnp_Command'] = 'pay';
                vnp_Params['vnp_TmnCode'] = tmnCode;
                vnp_Params['vnp_Locale'] = locale;
                vnp_Params['vnp_CurrCode'] = currCode;
                vnp_Params['vnp_TxnRef'] = licenseItem._id;
                vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + licenseItem._id;
                vnp_Params['vnp_OrderType'] = 'other';
                vnp_Params['vnp_Amount'] = amount * 100;
                vnp_Params['vnp_ReturnUrl'] = returnUrl;
                vnp_Params['vnp_IpAddr'] = ipAddr;
                vnp_Params['vnp_CreateDate'] = createDate;
                if (bankCode !== null && bankCode !== '') {
                    vnp_Params['vnp_BankCode'] = bankCode;
                }
                vnp_Params = sortObject(vnp_Params);

                let querystring = require('qs');
                let signData = querystring.stringify(vnp_Params, { encode: false });
                let crypto = require("crypto");
                let hmac = crypto.createHmac("sha512", secretKey);
                let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
                vnp_Params['vnp_SecureHash'] = signed;
                vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
                res.json({code: 200, data: vnpUrl});
            } catch (err) {
                res.json({ code: 500, error: err });
            }
        })
    },
    updateOrder: async(req, res) => {
        authMiddl.verifyToken(req, res, async () => {
            try{
                let idOrder = req.body.id;
                let orderUpdate = await OrderModel.findByIdAndUpdate(idOrder, {status: "success"});
                let user = await UserModel.findById(req.user.id);
                let expired = new Date(user.expired);
                if(expired.getTime() < new Date().getTime()) {
                    expired = new Date();
                }
                expired.setDate(expired.getDate() + orderUpdate.timeUse);
                user = await UserModel.findByIdAndUpdate(req.user.id, {expired: expired});
                res.json({code: 200, data: user.expired});
            }catch(err) {
                res.json({code: 500, error: "Vui lòng liên hệ admin"});
            }
        })
    }
};
module.exports = orderController;