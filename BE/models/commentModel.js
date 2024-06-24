import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    content : {
        type: String,
        maxlength: 1000
    },
    like: [{
        type: mongoose.Schema.ObjectId,
            ref: "User"
    }],
    images: [String],
    author: {
        type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'A comment must belong to user']
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
    changeAt: {
        type: Date,
        default: null
    },
    post: {
        type: mongoose.Schema.ObjectId,
            ref: 'Post',
            required: [true, 'A comment must belong to user']
    },
    parentComment: {    // nếu bằng null => bình luận đầu tiên
        type: mongoose.Schema.ObjectId,
        ref: 'Comment',
        default: null
    },
    tag: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default: null
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
}
)



const Comment = mongoose.model("Comment", commentSchema)
export default Comment;