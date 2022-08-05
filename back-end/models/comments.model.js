const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({ 
    comment: String,
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    movie_id: {

        type: mongoose.Types.ObjectId,
        ref: 'Movie'
    }

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const Comment = mongoose.model('Comments', commentsSchema)

module.exports = Comment