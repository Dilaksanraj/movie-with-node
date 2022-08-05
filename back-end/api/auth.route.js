const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require('dotenv').config()

const userModel = require('../models/userModel')
const AppsConst = require('../share/AppsConst')
const Response = require('../share/Response')

const Router = express.Router()

Router.post('/register-user', async (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const fName = req.body.first_name;
    const lName = req.body.last_name;
    const dob = req.body.dob;
    const password = req.body.password;

    if ((email && email !== "") && (password && password !== "" && password.length >= 6)) {
        const hash = bcrypt.hashSync(password, 10)

        console.log(hash);

        try {
            const User = new userModel({
                email: email,
                first_name: fName,
                last_name: lName ? lName : null,
                dob: dob ? dob : new Date(now()),
                type: AppsConst.AppsConst.userType.user,
                password: hash,
                active: 1
            })

            const user = await User.save()
            return res.status(AppsConst.AppsConst.RequestType.CODE_200).json({
                message: Response.success_create,
                data: user
            })

        } catch (error) {

            return res.status(AppsConst.AppsConst.RequestType.CODE_500)
                .json({
                    message: error.message,
                    code: AppsConst.AppsConst.RequestType.CODE_500
                })
        }
    } else {
        return res.status(AppsConst.AppsConst.RequestType.CODE_500).json({ "msg": "Email and password are required, and password should be at least 6 caracters !" })
    }
})

/*
 * Params: Email and Password
 * Check if information are good (use bcrypt)
 * if it's good send back the user
 * try to add session to express
 */
Router.post('/login', async (req, res) => {
    const { email, password } = req.body

    console.log(bcrypt.hashSync(password, 10));

    if ((email && email !== "") && (password && password !== "")) {
        try {
            const user = await userModel.findOne({ 'email': email })

            console.log(user);
            if (!user) {

                return res.status(AppsConst.AppsConst.RequestType.CODE_500).json({ message: 'User not found !' })
            }

            if (!user.active) {
                return res.status(AppsConst.AppsConst.RequestType.CODE_500).json({ message: 'User not active !' })
            }

            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(AppsConst.AppsConst.RequestType.CODE_500).json({ message: "Email or Password don't match !" })
            }

            req.session.user = {
                "_id": user._id
            }

            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            return res.status(AppsConst.AppsConst.RequestType.CODE_200)
                .json({
                    message: Response.success_login,
                    'token': token,
                    user: user
                })

        } catch (error) {
            return res.status(AppsConst.AppsConst.RequestType.CODE_500).json({ message: error.message })
        }
    } else {
        return res.status(AppsConst.AppsConst.RequestType.CODE_500).json({ "msg": "Email and password are required !" })
    }
})

Router.get('/auth-user', async (req, res) => {
    if (req.session.user) {

        const user = await userModel.findById(req.session.user._id, {
            'password': 0
        })

        if (!user) {
            return res.status(AppsConst.AppsConst.RequestType.CODE_500).json({ "msg": "You are not authenticated !" })
        }

        if (!user.active) {
            return res.status(AppsConst.AppsConst.RequestType.CODE_500).json({ message: 'User not active !' })
        }

        return res.status(AppsConst.AppsConst.RequestType.CODE_500).json(user)
    }

    return res.status(AppsConst.AppsConst.RequestType.CODE_500).json({ "msg": "You are not authenticated !" })
})

Router.get('/get-all-user', async (req, res) => {

    try {
        const user = await userModel.find({})

        if (!user) {

            return res.status(AppsConst.AppsConst.RequestType.CODE_200).json({
                message: 'No data',
                data: []

            })
        }

        return res.status(AppsConst.AppsConst.RequestType.CODE_200).json({
            message: Response.success_request,
            data: user

        })

    }
    catch (err) {

        console.log(err);
        return res.status(AppsConst.AppsConst.RequestType.CODE_500).json({
            message: err.message,
            data: []

        })

    }

})

Router.get('/logout', (req, res) => {
    if (req.session.user) {
        delete req.session
    }

    return res.status(AppsConst.AppsConst.RequestType.CODE_200).json({
        message: Response.success_request,
        data: []

    })
})



module.exports = Router