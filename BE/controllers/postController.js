import multer from "multer";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import sharp from "sharp";

// nếu gửi bằng formdata thì cần có multer
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
    {name: 'imagesPost'},
    // {name: 'content'} 
])// sẽ trả về req.files

const resizeImagesPost = async (req, res, next) => {
    if(!req.files){
        console.log("khong co anh")
    }
    if(!req.files || !req.files.imagesPost) {
        console.log("khong co anh")
        return next();
    }
    req.body.images = []
    console.log("alo")
    console.log(req.files)
    await Promise.all(
        req.files.imagesPost.map(async (file, i) => {
            const ImageName = `post-${Date.now()}-${i}.jpeg`
            await sharp(file.buffer).resize(500,500).toFormat('jpeg').jpeg({quantity: 90}).toFile(`public/imgPost/${ImageName}`)
            req.body.images.push(ImageName)
        })
    )
    if(req.body.imagesPost ){    // nếu chỉ thêm ảnh
        if(typeof req.body.imagesPost !== "string"){
            req.body.images = [...req.body.images, ...req.body.imagesPost]
        }else{
            req.body.images = [...req.body.images, req.body.imagesPost]
        }
    }
    next();
}

const createPost = catchAsync(async (req, res) => {
    // console.log(req.body.images)
    const post = await Post.create({content: req.body.content, images: req.body.images,user: req.user.id})
    const updateUser = await User.findByIdAndUpdate(post.user, {$push: {posts: post._id}})
    return res.status(200).json({
        status: "success",
        data: post
    })
})
const updatePost = async (req, res) => {
    try {
        console.log(req.body)
        console.log("this ís")
        let post
        // nếu có thêm ảnh
        if(req.body.images){
            console.log("co")
            post = await Post.findByIdAndUpdate({_id: req.params.id}, {content: req.body.content, $set: {images: req.body.images}},{
                new: true,          
                runValidators: true 
            })
        }
        if(!req.body.images && req.body.imagesPost){   // nếu không thay đổi ảnh, chỉ xoá ảnh hoặc thay đổi content
            console.log("hello")
            post = await Post.findByIdAndUpdate({_id: req.params.id}, {content: req.body.content, $set: {images: req.body.imagesPost}},{
            new: true,          
            runValidators: true 
        })
        }
        
        if(!post) {
            return res.status(404).json({
                status: "fail",
                message: "No document found with that ID"
            })
        }
        return res.status(200).json({
            status: "success",
            data: post
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error
        })
    }
}
const getAllPost = catchAsync(async (req, res) => {
    // console.log(req.user.following[0])
    if(req.query.page === "1"){
        req.query.page = 0
    }
    const allPost = await Post.find({user: req.user.following}).sort({ createAt: -1 }).skip(req.query.page).limit(3)
    .populate({
        path: 'user',
        select: 'avatar name'
    });
    return res.status(200).json({
        status: "success",
        data: allPost,
        // user: req.user
    })
})
const getPostWithIdUser = async (req, res) => {
    const allPost = await Post.find({user: req.user._id}).sort({ createAt: -1 }).populate({
        path: 'user'
    });
    return res.status(200).json({
        status: "success",
        data: allPost,
    })
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.deleteOne({_id: req.params.id})
        const user = await User.findById({_id: req.user._id})
        if(user) {
            await User.findByIdAndUpdate({_id: req.user._id}, {$pull: {posts: req.params.id}})
        }
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error
        })
    }
}

const deleteImageOfPost = async (req, res) => {
    try {
        console.log(req.body.id)
        const post = await Post.findById(req.body.id);
        if(!post){
            return res.status(404).json({ 
                status: "fail",
                message: 'Post not found' 
            });
        }
        post.images.pull(req.body.image)
        await post.save();
        return res.status(200).json({
            status: "success",
            message: "image deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error
        })
    }
}

const likePost = async (req, res) => {
    try {
        // console.log("alo"+ req.body.idPost)
        const post = await Post.updateOne({_id: req.body.idPost}, {$push: {like: req.user._id}})
        return res.status(200).json({
            status: "success",
            message: "liked"
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error
        })
    }
}


const unLikePost = async (req, res) => {
    try {
        console.log("alo"+ req.body.idPost)
        const post = await Post.updateOne({_id: req.body.idPost}, {$pull: {like: req.user._id}})
        return res.status(200).json({
            status: "success",
            message: "liked"
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error
        })
    }
}

export {createPost, getPostWithIdUser,getAllPost, uploadImages, resizeImagesPost, deleteImageOfPost, deletePost, updatePost, likePost, unLikePost};