import Message from "../models/messageModel.js"
import multer from "multer";
import sharp from "sharp";

const multerStorage = multer.memoryStorage();// lưu vào storage
const multerFilter = (req, file, cb) => {    //bộ lọc, kiểm tra có ảnh không
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }else{
        cb(new Error("'Not an image! Please upload only image.'"), false)
    }
}
const upload = multer({storage: multerStorage, fileFilter: multerFilter})// cấu hình multer

const uploadImages = upload.fields([    
    {name: 'imagesMess', maxCount: 5},
])// sẽ trả về req.files

const resizeImagesPost = async (req, res, next) => {
    if(!req.files){
        console.log("khong co anh")
    }
    req.body.images = []
    await Promise.all(
        req.files.imagesMess.map(async (file, i) => {
            const ImageName = `post-${Date.now()}-${i}.jpeg`
            await sharp(file.buffer).resize(500,500).toFormat('jpeg').jpeg({quantity: 90}).toFile(`public/imgMessage/${ImageName}`)
            req.body.images.push(ImageName)
        })
    )
    next();
}

const createMessageImages = async (req, res) => {// gửi ảnh
    try {
        if(req.body.images.length !== 0){

            const message = await Message.create({images: req.body.images,
                from: req.body.from,
                to: req.body.to,
                conversation: req.body.conversation})
                return res.status(200).json({
                    status: "success",
                    data: message
                })
            }
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error
        })
    }

}

const createMessage = async (req, res) => {
    try {
        console.log(req.body.images)
        console.log(req.body.from)
        if(req.body.messageText !== null){

            const message = await Message.create({messageText: req.body.messageText,
                from: req.body.from,
                to: req.body.to,
                conversation: req.body.conversation})
                return res.status(200).json({
                    status: "success",
                    data: message
                })
            }
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error
        })
    }

}

const getMessage = async (req, res) => {
    try {
        console.log(req.query.pageParam)
        if(req.query.pageParam === "1"){
            req.query.pageParam = 0
        }
        const message = await Message.find({conversation: req.query.conversation}).sort({sentDatetime: -1}).limit(10).skip(req.query.pageParam)
    return res.status(200).json({
        status: "success",
        data: message,
    })
    } catch (error) {
        return res.status(404).json({
            status: "fail",
            message: error,
        })
    }
}
export {createMessage, getMessage, createMessageImages,uploadImages, resizeImagesPost,}