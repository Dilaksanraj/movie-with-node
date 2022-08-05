const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require('dotenv').config()

const ratingModel = require('../models/rating')
const AppsConst = require('../share/AppsConst')
const Response = require('../share/Response')

const Router = express.Router()

Router.post('/create-rate', async (req, res) => {
    
    const movie_id = req.body.movie_id;
    const user_id = req.body.user_id;
    const rate = req.body.rate;

    try {
        const Rate = new ratingModel({
            rate: rate,
            user_id: user_id,
            movie_id: movie_id
        })

        const rate = await Rate.save()


        const get_all_rates = await ratingModel.find({}).populate('user_id').populate('movie_id')

        return res.status(AppsConst.AppsConst.RequestType.CODE_200).json({
            message: Response.success_create,
            data: get_all_rates
        })

    } catch (error) {

        return res.status(AppsConst.AppsConst.RequestType.CODE_500)
            .json({
                message: error.message,
                code: AppsConst.AppsConst.RequestType.CODE_500
            })
    }

})


Router.get('/get-all-rate', async (req, res) => {

    try {

        // loading comment with created_by (user_id)
        const rating = await ratingModel.find({}).populate('user_id')

        if (!rating) {

            return res.status(AppsConst.AppsConst.RequestType.CODE_200).json({
                message: 'No data',
                data: []

            })
        }
        
        return res.status(AppsConst.AppsConst.RequestType.CODE_200).json({
            message: Response.success_request,
            data: rating

        })

    }
    catch (err) {

        return res.status(AppsConst.AppsConst.RequestType.CODE_500).json({
            message: err.message,
            data: []

        })

    }

})

module.exports = Router