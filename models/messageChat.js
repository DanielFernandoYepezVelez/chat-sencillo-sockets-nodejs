const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
    nick: String,
    message: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('chats', chatSchema);