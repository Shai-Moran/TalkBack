const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = {
    senderId: {
        type: String,
        required: true
    },
    reciverId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;