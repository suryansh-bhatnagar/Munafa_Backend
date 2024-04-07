const User = require("../models/UserDetails");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config()
const jwt_serret = process.env.JWT_SECRET;



exports.register = async (req, res) => {

    const { name, email, mobile, password } = req.body;
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
        return res.send({ data: "User already exists !!" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        await User.create({
            name: name,
            email: email,
            mobile,
            password: encryptedPassword,
        });
        res.send({ status: "ok", data: "User Created" });
    } catch (error) {
        res.send({ status: "error", data: error });
    }

}


exports.login = async (req, res) => {

    const { email, password } = req.body;
    const oldUser = await User.findOne({ email: email });
    if (!oldUser) {
        return res.send({ data: "User doesn't exists!!" });
    }
    if (await bcrypt.compare(password, oldUser.password)) {
        // if (password === oldUser.password) {
        const token = jwt.sign({ email: oldUser.email }, jwt_serret);
        console.log(token);
        if (res.status(201)) {
            return res.send({
                status: "ok",
                data: token,
            });
        } else {
            return res.send({ error: "error" });
        }
    }

}

// Controller for Changing Password
exports.userDetails = async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, jwt_serret);
        const useremail = user.email;

        User.findOne({ email: useremail }).then((data) => {
            return res.send({ status: "Ok", data: data });
        });
    } catch (error) {
        return res.send({ error: error });
    }
};