import express from 'express';
import { checkTokenExists, forgotPassword, login, logout, protect, resetPassword, signUp} from '../controllers/authController.js';
import { deleteRefreshToken, refreshToken } from '../controllers/tokenController.js';
import { getUser, updateUser, uploadImage, resizeImagesPost, detailUserOfPost, followUser, unFollowUser, searchUser} from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signUp)
router.post('/login', login)
router.get('/logout', logout)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword/:resetToken', resetPassword)
router.get('/protect', protect)
router.post('/refreshToken', refreshToken)
router.delete('/deleteToken', deleteRefreshToken)
router.get('/checkTokenExists',checkTokenExists)

router.route('/getUser').get(protect,getUser)
router.route('/followUser').patch(protect, followUser).post(protect, unFollowUser)
router.route('/:id').patch(protect, uploadImage, resizeImagesPost,updateUser).get(protect, detailUserOfPost)
router.route('/searchUser').post(searchUser)

export default router