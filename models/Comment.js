const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
    upvote: {
        type: Number,
        required: false
    },
    text: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: false,
    },
    user_name: {
        type: String,
        required: false,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('comments', commentsSchema)