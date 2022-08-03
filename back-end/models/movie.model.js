const mongoose = require('mongoose')
const AppsConst = require('../share/AppsConst')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
    },
    releaseDate: {
        type: String,
        trim: true,
        default: null
    },
    category: {
        type: String
    },
    movieDirector: {
        type: String
    },
    poster:{
        type: String,
        default: null
    },
    link:{
        type: String,
        default: null
    },
    desc:{
        type: String,
        default: null
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Movie', movieSchema)