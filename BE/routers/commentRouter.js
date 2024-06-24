
import express from "express"
import { createComment, getCommentByIdPost, getCountComment, getParentCommentByIdPost, getCountChildComment, getChildCommentByIdParentComment, changeComment, deleteComment, getCountParentComment} from "../controllers/commentController.js";

const router = express.Router();

router.route("/createComment").post(createComment)
router.route("/getComment").get(getCommentByIdPost)
router.route("/getCountComment").get(getCountComment)
router.route("/getCountParentComment").get(getCountParentComment)
router.route("/getParentComment").get(getParentCommentByIdPost)
router.route("/getCountChildComment").get(getCountChildComment)
router.route("/getChildCommentByIdParentComment").get(getChildCommentByIdParentComment)
router.route("/changeComment").patch(changeComment)
router.route("/deleteComment/:idComment").delete(deleteComment)

export default router;