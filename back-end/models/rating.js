const mongoose = require('mongoose')

const rateSchema = new mongoose.Schema({ 
    rate: String,
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

const Message = mongoose.model('Rate', rateSchema)

module.exports = Message