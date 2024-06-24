import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.js";
import { Email } from "../utils/Email.js";
import AppError from "../utils/appError.js"
import { createToken, refreshToken } from "./tokenController.js";
import { token } from "morgan";

const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign({id: user._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_REFRESH_EXPIRES_IN});
  // console.log("ENV: ", process.env.JWT_SECRET)
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 *60 *1000),
    //httpOnly: true, // trình duyệt không thể truy cập hoặc sửa đổi theo bất kỳ cách nào khác => ngăn chặn tấn công chéo trang
    // secure: true
  }
  // res.cookie('jwt', token, cookieOptions);
    user.password = undefined // không select password ra màn hình
    res.status(statusCode).json({
        status: 'success',
        data: {
            user
        },
        token
        
    })

};

const protect = async (req, res, next) => {
  try {
    let token;// access token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(" ")[1]
  }else if(req.cookies.access_token) {
    token = req.cookies.access_token
  }
  if(!token){
    return next(new AppError('you are not logged in ! please log in to get access', 200))
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET)
  const currentUser = await User.findById(decoded.id)
    if(!currentUser){
        return res.status(200).json({
            status: 'fail',
            message: "The user belonging to this token does no longer exist."
        })
    }
    // 4) Check if user changed password after the token was issued // thay đổi mật khẩu sau khi tạo token
    if(currentUser.changedPasswordAfter(decoded.iat)){// iat => thời gian phát hành token
        return res.status(200).json({
            status: 'fail',
            message: 'User recently changed password! please log in again'
        })
    }
    //GRANT ACCESS TO PROTECTED ROUTE
    //=> req.user = currentUser
    req.user = currentUser;// add user into req
    res.locals.user= currentUser
    next()
  } catch (error) {
    let statusCode = 200
        if(error.name === 'JsonWebTokenError') {// sai token
            error.notic = 'Invalid token, Please login again'
            statusCode = 200
            error.code = 401
        }
        if(error.name === 'TokenExpiredError'){// token hết hạn
            error.notic = 'Your token has expired! Please login again'
            error.code = 401
            statusCode = 200
        }
        res.status(statusCode).json({
            status: 'fail',
            message: error.name,
            error: error
        })
  }
}

const checkTokenExists = async (req, res) => {
  try{
    let token;// access token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(" ")[1]
    }else if(req.cookies.access_token) {
      token = req.cookies.access_token
    }
    if(!token){
      return res.status(200).json({
        status: "fail",
        message: "not logged in yet"
      })
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const currentUser = await User.findById(decoded.id)
    if(!currentUser){
        return res.status(200).json({
            status: 'fail',
            message: "The user belonging to this token does no longer exist."
        })
    }
    req.user = currentUser;// add user into req
    res.locals.user= currentUser
    return res.status(200).json({
      status: "success",
      user: req.user,
      message: "logged"
    })
  } catch (error) {
    return res.status(200).json({
      status: "fail",
      message: "not logged in yet"
    })
  }
}

const restrictTo = (...roles) => {
  return (req, res, next) => {
      // console.log(req.user.role)
      //roles = ['admin','lead-guide'] // khác user thì cho phép thực hiện xoá tour
      if(!roles.includes(req.user.role)){ // req.user lấy ở middleware phía trước (protect)
          return res.status(403).json({
              status: 'fail',
              message: 'You do not have permission to perform this action'
      })
      }
      next()
  }
}

const signUp = catchAsync(async (req, res) => {
  const newUser = await User(req.body).save({validator: true});
  createSendToken(newUser, 201, res)
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }
  const user = await User.findOne({email}).select('+password')
  if(!user || !(await user.correctPassword(password, user.password))){
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect email or password!'
    })
  }
  // createSendToken(user, 200, res)
  createToken(user._id, 200, res)
});

const logout = catchAsync(async (req, res) => {
  // res.cookie('access_token', 'loggedout', {
  //   expires: new Date(Date.now() + 10 * 1000),
  //   // httpOnly: true
  // })
  res.status(200).json({status: 'success', token: "loggedout"})
})

const forgotPassword = catchAsync(async (req, res) => {
  const user = await User.findOne({email: req.body.email})
  if(!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'There is no user with email address.'
    })
  }
  const resetToken = user.createPasswordResetToken()
  await user.save({validateBeforeSave: false})
  const resetUrl = `http://localhost:3000/api/v1/users/resetPassword/${user.passwordResetToken}`
  // await new Email(user, resetUrl).sendPasswordReset()
  await new Email(user, user.passwordResetToken).sendPasswordReset()

  res.status(200).json({
    status: 'success',
    message: 'Token sent to email'
  })
})
const resetPassword = catchAsync(async (req, res) => {
  const user = await User.findOne({passwordResetToken: req.params.resetToken, passwordResetExpires: {$gt: Date.now()}})
  if(!user){
    res.status(404).json({
      status: 'fail',
      message: "Token invalid or has expires"
    })
  }
  user.password = req.body.password  // đổi thành mật khẩu ở form
  user.passwordConfirm = req.body.passwordConfirm // đổi thành mật khẩu ở form
  user.passwordResetExpires= undefined
  user.passwordResetToken = undefined
  await user.save()
  res.status(200).json({
    message: user
  })
})

export { signUp, login, logout, forgotPassword, resetPassword, protect, restrictTo, checkTokenExists };
