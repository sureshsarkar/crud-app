const mongoose = require('mongoose');
const userModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const sendToken = require('../utils/jwtToken');
// const { validationResult } = require('express-validator');
// get all user
exports.getAllUsers = async (req, res) => {

    try {
        const users = await userModel.find()

        res.status(201).send({
            message: "Fetch all users",
            success: true,
            users: users
        })

    } catch (error) {
        res.status(404).send({
            success: false
        })
    }
}

// create user registration 
exports.registerUser = async (req, res) => {

    try {
        const { name, mobile, email, password } = req.body;


        if (!name || !email || !mobile || !password) {
            return res.status(400).send({
                message: 'Please fill all fields',
                success: 'false'
            })
        }

        // check user exist or not
        let userData = await userModel.findOne({ mobile: req.body.mobile });
        if (userData) {
            return res.status(300).send({
                message: 'User already exists',
                success: 'false',
                data: req.body
            })
        }

        // create a password hash
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);


        // save data in MongoDB database
        userData = await userModel.create({
            name: name,
            email: email,
            mobile: mobile,
            password: passwordHash
        })

        sendToken(userData, 200, res);

    } catch (error) {

        return res.status(400).send({
            message: 'Error in register callback',
            success: 'false',
            error: error
        })
    }
}


// Delete user registration 
exports.deleteUser = async (req, res) => {

    try {
        const user = await userModel.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(300).send({
                message: 'This user does not exist',
                success: 'false',
                data: req.body
            })
        }

        return res.status(200).send({
            message: 'User deleted',
            success: 'true',
            user: user
        })

    } catch (error) {

        return res.status(400).send({
            message: 'Error in register callback',
            success: 'false',
            error: error
        })
    }
}

// UpdateUser user registration 

exports.updateUser = async (req, res) => {

    try {
        const { id } = req.params;

        const user = await userModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        );

        return res.status(200).send({
            message: 'User updated',
            success: 'true',
            user: user
        })

    } catch (error) {
        return res.status(400).send({
            message: 'Error in register callback',
            success: 'false',
            error: error
        })
    }
}


// User login 

exports.userLogin = async (req, res) => {
    const { mobile, password } = req.body;
    // console.log(req.body);
    try {

        if (!mobile || !password) {
            return res.status(400).send({
                message: "Please fill the details",
                success: false
            })
        }
        const user = await userModel.findOne({ mobile }).select("+password");

        if (!user) {
            return res.status(400).send({
                message: "User not exists",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).send({
                message: "Invalid password",
                success: false
            })
        }

        sendToken(user, 200, res);


    } catch (error) {
        return res.status(400).send({
            message: 'Error in register callback',
            success: 'false',
            error: error
        })
    }
}

// user Logout

exports.userLogout = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: "Logged Out",
        });

    } catch (error) {
        return res.status(400).send({
            message: 'Error in register callback',
            success: 'false',
            error: error
        })
    }
}

