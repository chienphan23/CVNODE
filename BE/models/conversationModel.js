import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    // conversationName: {
    //     type: String,
    //     required: [true, "A conversation must have a name"],
    //     trim: true,
    //     maxlength: [200, 'A conversation name must have less or equal then 200 character']
    // }
    users: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'A post must belong to user']
        }
    ]
})
const Conversation = mongoose.model('Conversation', conversationSchema)
export default Conversation

