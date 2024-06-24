import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    messageText: {
        type: String,
        maxlength: [500, 'message text must have less or equal then 1000 character']
    },
    images: [{
        type: String
    }],
    type: {
        type: String,
        enum: ['text', 'image']
    },
    from: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A post must belong to user']
    },
    to: [
        {
         type: mongoose.Schema.ObjectId,
         ref: "User"
        }
    ],
    sentDatetime: {
        type: Date,
        default: Date.now(),
    },
    conversation : {
        type: mongoose.Schema.ObjectId,
        ref: 'Conversation',
    }
})

const Message = mongoose.model('Message', messageSchema)
export default Message