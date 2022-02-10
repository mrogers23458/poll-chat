const { Schema, model } = require('mongoose')

const messageSchema = new Schema (
    {
        id: String,
        content: String
    }
)

const Message = model('Message', messageSchema)
module.exports = Message