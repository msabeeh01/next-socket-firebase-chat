const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    msg: String,
    room: String,
    user: String,
    username: String,
    date: { type: Date, default: Date.now }
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;