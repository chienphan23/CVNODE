import mongoose from "mongoose"
import Notification from "../models/notificationModel.js"

const createNotification = async (req, res) => {
    try {
    
    let content = ""
    let idPostOfFollow = ""
    let notification = {}
    let checkFromExist = ""
    if(req.body && req.body.type === "Follow") {
        content = "Vừa theo dõi bạn. Nhấn để xem"
        req.body.idPost = "65ef06d4e9771597dee98cbe"
    }
    const checkNotification = await Notification.find({to: req.body.to, idPost: req.body.idPost, type: req.body.type})
    
    if(checkNotification && checkNotification.length === 1 ){
        
        if(req.body && req.body.type === "Like"){
            if(checkNotification.length !== 0 ){
                checkFromExist = checkNotification[0].from.includes(req.body.from)// nếu người này đã bình luận => không tạo thông báo
            }
            if(checkFromExist){
                return res.status(200).json({
                    status: "success",
                })
            }else{
                content = "và những người khác đã thích bài viết của bạn"
            }
        }
        if(req.body && req.body.type === "Comment"){
            if(checkNotification.length !== 0 ){
                checkFromExist = checkNotification[0].from.includes(req.body.from)// nếu người này đã bình luận => không tạo thông báo
            }
            if(checkFromExist){
                return res.status(200).json({
                    status: "success",
                })
            }else{
                content = "và những người khác đã bình luận về bài viết của bạn"
            }
        }
        notification = await Notification.findByIdAndUpdate({_id: checkNotification[0]._id}, 
                { $set: { content: content, updateAt: Date.now(), checked: false }, $push: { from: req.body.from }}).exec()
    }else{
        if(req.body && req.body.type === "Like"){
            content = "Đã thích bài viết của bạn"
        }
        if(req.body && req.body.type === "Comment"){
            content = "Đã bình luận về bài viết của bạn"
        }
        if(req.body && req.body.type === "Follow") {
            content = "Vừa theo dõi bạn. Nhấn để xem"
            req.body.idPost = "65ef06d4e9771597dee98cbe"
        }
        const data = {
            type: req.body.type,
            content: content,
            idPost: req.body.idPost,
            to: req.body.to,
            from: req.body.from
        }
        notification = await Notification.create(data)
    }

    return res.status(200).json({
        status: "success",
        data: notification,
    })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "fail",
            message: error
        })
    }
}

const updateCheckedNotifications = async (req, res) => {
    try {
        const notifications = await Notification.updateMany({to: req.body.to}, {$set: {checked: true}})
        return res.status(200).json({
            status: "success",
            data: notifications,
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error
        })
    }
}
const getCountNotificationsCheck = async (req, res) => {
    try {
        const idAuthor = new mongoose.Types.ObjectId(req.body.to);   // đổi string => ObjectId
        // console.log("alo")
        const notifications = await Notification.aggregate([
            {
                $match: {
                    to: idAuthor,     // where
                    checked: false
                }
            },
            {
                $group: {
                    _id: "$notifications",   // nhóm các cmt của 1 post
                    sum: {$sum: 1}
                }
            },
            {
                $project: {
                    _id: 0,
                    sum: 1
                }
            }
        ])
        let sum = 0
        sum = notifications.length > 0 ? notifications[0].sum : 0
        return res.status(200).json({
            status: "success",
            countNotifi: sum
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            stauts: 'fail',
            message: error
        })
    }
}

const getHanldeNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({to: req.body.user, idPost: req.body.idPost, type: req.body.type}).sort({ updateAt: -1 })
        return res.status(200).json({
            status: "success",
            data: notifications
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error
        })
    }
}

const getAllNotification = async (req, res) => {
    try {
        // console.log("alo"+ req.user)
        const notifications = await Notification.find({to: req.user._id}).sort({ updateAt: -1 })
        return res.status(200).json({
            status: "success",
            data: notifications
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error
        })
    }
}

export {createNotification, getAllNotification, getHanldeNotifications, updateCheckedNotifications, getCountNotificationsCheck};