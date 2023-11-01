
const bcrypt = require('bcrypt');
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const authController = {
    //register
    registerUser: async(req, res) => {
        try{
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
                phone: req.body.phone
            });
            const user = await newUser.save();
            const { password, ...others } = user._doc;
            res.json({code: 200, data: { ...others } });
        }catch(err) {
            res.json({code: 502, error: err});
        }
    },
    loginUser: async(req, res) => {
        try {
            const user = await User.findOne({username: req.body.username});
            if (!user) {
                res.json({code: 404, error: "Wrong username"});
                return;
            }
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass) {
                res.json({code: 404, error: "Wrong password"});
                return;
            } 
            if (user && validPass) {
                const accessToken = jwt.sign({
                    id: user._id,
                    admin: user.isAdmin,

                }, process.env.jwtKey, {expiresIn: "365d"});
                const {password, ...others} = user._doc;
                res.json({code: 200, data: {...others}, token: accessToken});
            }
            
        } catch(err) {
            res.json({code: 500, error: "có lỗi xảy ra"});
        }
    },
};
module.exports = authController;