const mongoose = require('mongoose')

const scoreSchema = new mongoose.Schema({
    username: String,
    score: Number,
    timestamp: {type: Date, Default: Date.now}
})

module.exports = mongoose.model('Score', scoreSchema)