const jwt = require("jsonwebtoken");
const userModel = require("../../models/UserModel");
exports.isAuthUser = async (req, res, next) => {
    let { token } = req.cookies;
    if (!token) {
        return res.status(400).send({
            message: "Login to continue",
            success: false
        })
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    res.user = await userModel.findById(decodedData.id);
    next();
};

exports.authRoles = (...roles) => {
    return (req, res, next) => {
        if (roles != "admin") {
            return res.status(400).send({
                message: "Your are not allowed to continue",
                success: false
            })
        }
        next();
    };
};