import User from "../models/userModel.js"
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
const uploadImage = upload.fields([    
    {name: 'avatar', maxCount: 1},
])// sẽ trả về req.files

const resizeImagesPost = async (req, res, next) => {
    if(!req.files){
        console.log("khong co anh")
    }
    if(!req.files || !req.files.avatar) {
        console.log("khong co anh")
        return next();
    }
    req.body.image = "default.jpg"
    const ImageName = `post-${Date.now()}.jpeg`
    await sharp(req.files.avatar[0].buffer).resize(500,500).toFormat('jpeg').jpeg({quantity: 90}).toFile(`public/imgPost/${ImageName}`)
    req.body.image = ImageName
    next();
}

const getUser = async (req, res) => {
    try {
        
        const user = await User.findOne({_id: req.user.id}).populate({
            path: 'posts',
            select: '-__v'
        })
        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: `Can't get user with this id`,
            error: error
        })
    }
} 
const detailUserOfPost = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id}).populate({
            path: 'posts',
            select: '-__v'
        })
        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: `Can't get user with this id`,
            error: error
        })
    }
}
const updateUser = async (req, res) => {
    try {
        let user
        if(req.body.image){
            user = await User.findByIdAndUpdate({_id: req.params.id}, {avatar: req.body.image, name: req.body.name, bio: req.body.bio, gender: req.body.gender}, {new: true, runValidators: true})
        }
        else {
            user = await User.findByIdAndUpdate({_id: req.params.id}, {name: req.body.name, bio: req.body.bio, gender: req.body.gender}, {new: true, runValidators: true})
        }
        return res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: `Can't get user with this id`,
            error: error
        })
    }
}

const followUser = async (req, res) => {
    try {
        console.log(req.user)
        const user = await User.findByIdAndUpdate(req.user, {$push: {following: req.body.idUser}}) // thêm người theo dõi vào array 
        const userTracked = await User.findByIdAndUpdate({_id: req.body.idUser}, {$push: {followers: req.user._id}})//thêm following cho người được follow 
        return res.status(200).json({
        status: "success",
        user: user
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        })
    }
}
const unFollowUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user, {$pull: {following: req.body.idUser}}) // 
        const userTracked = await User.findByIdAndUpdate({_id: req.body.idUser}, {$pull: {followers: req.user._id}})// 
        return res.status(200).json({
        status: "success",
        user: user
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        })
    }
}

const searchUser = async (req, res) => {
    try {
        // Tạo một regular expression từ `searchString` với 'i' để tìm kiếm không phân biệt chữ hoa chữ thường
        const regex = new RegExp(req.body.name, 'i');
        // Truy vấn tất cả các sản phẩm có tên chứa từ `searchString`
        const user = await User.find({name: {$regex: regex } }).select("_id name avatar")
        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: `Can't get user with this name`,
            error: error
        })
    }
}

export {getUser, updateUser, uploadImage, resizeImagesPost, detailUserOfPost, followUser, unFollowUser, searchUser}