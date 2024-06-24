import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            enum: ['Đã thích bài viết của bạn', 'Đã bình luận về bài viết của bạn', 'Vừa theo dõi bạn. Nhấn để xem']
        },
        updateAt: {
            type: Date,
            default: Date.now(),
        },
        type: {
            type: String,
            enum: ['Like', 'Comment', 'Follow']
        },
        from: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "User"  
            }
        ],
        idPost : {
            type: mongoose.Schema.ObjectId,
            ref: 'Post',
            
        },
        to: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'A notification must belong to user']
        },
        checked: {
            type: Boolean,
            default: false
        }
    },
    {
        toJSON: {virtuals: true},   // trường ảo không có dữ liệu trong db
        toObject: {virtuals: true}
    }
) 


const Notification = mongoose.model('Notification', notificationSchema)
export default Notification;