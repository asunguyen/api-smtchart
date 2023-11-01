const User = require("../models/user");
const authMiddl = require("../middlewares/authmidd");
const bcrypt = require('bcrypt');
const userController = {
    getAllUser: async (req, res) => {
        try {
            let pageSize = parseInt(req.query.pageSize || 20);
            let page = parseInt(req.query.page || 1);
            let skips = (page - 1) * pageSize;
            const user = await User.find({role: 0}, "username email phone active isAdmin amount expired role").skip(skips).limit(pageSize).sort({ createdAt: -1 });
            const count = await User.countDocuments({role: 0});
            res.json({ code: 200, data: user, totalItem: count });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    getAllEmploy: async(req, res) => {
        try {
            let pageSize = parseInt(req.query.pageSize || 20);
            let page = parseInt(req.query.page || 1);
            let skips = (page - 1) * pageSize;
            const user = await User.find({role: {$ne: 0}}, "username email phone active isAdmin amount expired role").skip(skips).limit(pageSize).sort({ createdAt: -1 });
            res.json({ code: 200, data: user });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.json({ code: 200, data: user });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    getInfo: async (req, res) => {
        authMiddl.verifyToken(req, res, async () => {
            try {
                const user = await User.findById(req.user.id);
                if (user) {
                    res.json({ code: 200, data: user });
                } else {
                    res.json({ code: 403, error: "You're not allowed to delete other" });
                }
            } catch (err) {
                res.json({ code: 502, error: "You're not allowed to delete other" });
            }

        })
    },
    changePass: async(req, res) => {
        authMiddl.verifyToken(req, res, async() => {
            try {
                const user = await User.findById(req.user.id);
                const validPass = await bcrypt.compare(req.body.password, user.password);
                if (!validPass) {
                    res.json({code: 404, error: "Password không chính xác"});
                    return;
                } 
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(req.body.newPassword, salt);
                const userUD = await User.findByIdAndUpdate(user.id, {password: hashed});
                const accessToken = jwt.sign({
                    id: userUD._id,
                    admin: userUD.isAdmin
                }, process.env.jwtKey, {expiresIn: "365d"});
                const {password, ...others} = userUD._doc;
                res.json({code: 200, data: {...others}, token: accessToken});
            } catch(err) {
                res.json({ code: 502, error: "Thay đổi mật khẩu không thành công, vui lòng thử lại hoặc liên hệ với chúng tôi" });
            }
        })
    }
}

module.exports = userController;