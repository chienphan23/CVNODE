import express from "express"
import { createPost, getAllPost, resizeImagesPost, uploadImages, deleteImageOfPost, deletePost, updatePost, likePost, unLikePost, getPostWithIdUser} from "../controllers/postController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.use(protect)
router.route("/getPostWithIdUser").get(protect,getPostWithIdUser)
router.route("/likePost").patch(likePost).post(unLikePost)
router.route("/deletePost").post(deleteImageOfPost)
router.route("/:id").delete(deletePost).patch(uploadImages,resizeImagesPost,updatePost)// nếu không để xuống dưới sẽ gây ra lỗi
router.route("/").post(uploadImages,resizeImagesPost,createPost).get(protect,getAllPost)

export default router