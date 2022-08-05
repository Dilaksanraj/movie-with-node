const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require('dotenv').config()

const movieModel = require('../models/movie.model')
const AppsConst = require('../share/AppsConst')
const Response = require('../share/Response')

const Router = express.Router()

Router.post('/create-movie', async (req, res) => {
    
    const release_date = req.body.release_date;
    const poster = req.body.poster;
    const title = req.body.title;
    const link = req.body.link;
    const desc = req.body.desc;

    try {
        const Movie = new movieModel({
            title: title,
            releaseDate: release_date,
            poster: poster,
            link: link,
            desc: desc
        })

        const movie = await Movie.save()


        const get_all_movie = await movieModel.find({})

        return res.status(AppsConst.AppsConst.RequestType.CODE_200).json({
            message: Response.success_create,
            data: get_all_movie
        })

    } catch (error) {

        return res.status(AppsConst.AppsConst.RequestType.CODE_500)
            .json({
                message: error.message,
                code: AppsConst.AppsConst.RequestType.CODE_500
            })
    }

})


Router.get('/get-all-movie', async (req, res) => {

    try {
        console.log('get movie here');

        const movie = await movieModel.find({})

        if (!movie) {

            return res.status(AppsConst.AppsConst.RequestType.CODE_200).json({
                message: 'No data',
                data: []

            })
        }

        return res.status(AppsConst.AppsConst.RequestType.CODE_200).json({
            message: Response.success_request,
            data: movie

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

Router.get('/movie/get-all-movie-filter', async (req, res) => {

    try {

        const movie = await movieModel.find({
            where:[]
        })

        if (!movie) {

            return res.status(AppsConst.AppsConst.RequestType.CODE_200).json({
                message: 'No data',
                data: []

            })
        }

        return res.status(AppsConst.AppsConst.RequestType.CODE_200).json({
            message: Response.success_request,
            data: movie

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