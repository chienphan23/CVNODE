import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "A post must have a content"],
            trim: true,
            maxlength: [1000, 'A post content must have less or equal then 1000 character']
        },
        like: [{
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }],
        createAt: {
            type: Date,
            default: Date.now(),
        },
        comments: [
           {
            type: mongoose.Schema.ObjectId,
            ref: "Comment"
           }
        ],
        tagFriends: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "User"  
            }
        ],
        images: [String],
        privicy: {
            type: String,
            enum: ['public','friends','alone'],
            default: 'public'
        },
        addressPost: {
            type: "String",
            maxlength: [200, "The length of the string exceeds the limit"]
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'A post must belong to user']
        }
    },
    {
        toJSON: {virtuals: true},   // trường ảo không có dữ liệu trong db
        toObject: {virtuals: true}
    }
) 
// postSchema.pre(/^find/,function (next) {
//     this.populate({
//         path: 'user',
//     })
//     next()
// })

const Post = mongoose.model('Post', postSchema)
export default Post;