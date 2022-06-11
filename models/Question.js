const mongoose = require('mongoose');


const questionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        default: 0
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('question', questionSchema)