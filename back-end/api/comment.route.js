const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require('dotenv').config()

const commentModel = require('../models/comments.model')
const userModel = require('../models/userModel')
const AppsConst = require('../share/AppsConst')
const Response = require('../share/Response')

const Router = express.Router()

Router.post('/create-comment', async (req, res) => {
    console.log(req.body);
    const movie_id = req.body.movie_id;
    const user_id = req.body.user_id;
    const text = req.body.text;

    try {
        const Comment = new commentModel({
            comment: text,
            user_id: user_id,
            movie_id: movie_id
        })

        const movie = await Comment.save()


        const get_all_comments = await commentModel.find({}).populate('user_id')

        return res.status(AppsConst.AppsConst.RequestType.CODE_200).json({
            message: Response.success_create,
            data: get_all_comments
        })

    } catch (error) {

        return res.status(AppsConst.AppsConst.RequestType.CODE_500)
            .json({
                message: error.message,
                code: AppsConst.AppsConst.RequestType.CODE_500
            })
    }

})


Router.get('/get-all-comments', async (req, res) => {

    try {
        console.log('get all comments');

        // loading comment with created_by (user_id)
        const comments = await commentModel.find({}).populate('user_id')

        if (!comments) {

            return res.status(AppsConst.AppsConst.RequestType.CODE_200).json({
                message: 'No data',
                data: []

            })
        }

        const commentsArray = [];
        
        return res.status(AppsConst.AppsConst.RequestType.CODE_200).json({
            message: Response.success_request,
            data: comments

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



Router.get('/delete-comments', async (req, res) => {

    try {

        const id = req.query.index;
       
        const deleteComments = await commentModel.findByIdAndDelete(id);

        const comments = await commentModel.find({}).populate('user_id')

        if (!comments) {

            return res.status(AppsConst.AppsConst.RequestType.CODE_200).json({
                message: 'No data',
                data: []

            })
        }

        const commentsArray = [];
        
        return res.status(AppsConst.AppsConst.RequestType.CODE_200).json({
            message: Response.success_request,
            data: comments

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

module.exports = Router