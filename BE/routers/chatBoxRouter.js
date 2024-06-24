import express from 'express'
import { createConversation, getAllConversation, getOneConversation } from '../controllers/conversationController.js'
import { createMessage, getMessage, createMessageImages, uploadImages, resizeImagesPost, } from '../controllers/messageController.js'

const router = express.Router()

router.route("/createConversation").post(createConversation)
router.route("/getAllConversation").post(getAllConversation)
router.route("/getOneConversation").post(getOneConversation)
router.route("/createMessage").post(createMessage)
router.route("/createMessageImages").post(uploadImages, resizeImagesPost,createMessageImages)
router.route("/getMessage").get(getMessage)


export default router