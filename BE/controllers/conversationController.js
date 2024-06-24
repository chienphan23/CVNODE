import Conversation from "../models/conversationModel.js"

const createConversation = async (req, res) => {
    try {
        const conversation = await Conversation.create({users:  [req.body.user1, req.body.user2]})
        return res.status(200).json({
            status: "success",
            data: conversation
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error
        })
    }
}
const getAllConversation = async (req, res) => {
    try {
        console.log(req.body.user1)
        if(req.body.user1){
            let conversation = await Conversation.find({
                users: {$elemMatch: {$eq: req.body.user1}}
            }).populate({
                path: 'users',
                select: 'avatar name'
            })
           

            return res.status(200).json({
                status: "success",
                data: conversation
            })
           
        }else{
            return res.status(404).json({
                status: "success",
                message: "Don't exists user"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error
        })
    }
}
const getOneConversation = async (req, res) => {
    try {
        if(req.body.user1 && req.body.user2){
            let conversation = await Conversation.findOne({
                users: {$all: [req.body.user1, req.body.user2]}
            })
            if(conversation.length === 0){
                conversation = await Conversation.create({users:  [req.body.user1, req.body.user2]})
            }

            return res.status(200).json({
                status: "success",
                data: conversation
            })
           
        }else{
            return res.status(404).json({
                status: "success",
                message: "Don't exists user"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error
        })
    }
}
export {createConversation, getAllConversation, getOneConversation}