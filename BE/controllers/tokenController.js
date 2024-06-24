import Token from "../models/tokenModel.js"
import jwt from "jsonwebtoken";


const createAccessToken = (id) => {
    const token = jwt.sign({id }, process.env.JWT_SECRET, {expiresIn: "15m"});//process.env.JWT_ACCESS_EXPIRES_IN
    
    return token;
}
const createRefreshToken = (id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_REFRESH_EXPIRES_IN});
    
    return token;
}

const createToken = async (id, statusCode, res) => {
    const tokenAccess = createAccessToken(id)
    const tokenRefresh = createRefreshToken(id)
    const tokenAccessNew = await Token.create({refresh_token: tokenRefresh})
    
    res.cookie('access_token', tokenAccess)
    res.cookie('refresh_token', tokenRefresh)
    res.status(statusCode).json({
        status: 'success',
        data: {
            message: 'Login success',
            tokenAccess
        }
    })
}


const refreshToken = async (req, res) => {
    try {
        const oldRefreshToken = req.cookies.refresh_token
        const decoded = await  jwt.verify(oldRefreshToken, process.env.JWT_SECRET)
        const currentTime =  Math.floor(new Date().getTime() / 1000);
        const oldTimeStamp = decoded.exp - currentTime
        let newAccessToken = createAccessToken(decoded.id) // tạo ra access token mới
        // update refresh token mỗi khi access token hết hạn
        let newRefreshToken = jwt.sign({id: decoded.id}, process.env.JWT_SECRET, {expiresIn: oldTimeStamp})// không thay đổi thời gian của refresh mới
        console.log(newAccessToken)
        await Token.updateOne({refresh_token: oldRefreshToken},{refresh_token: newRefreshToken})
        res.cookie('access_token', newAccessToken)
        res.cookie('refresh_token', newRefreshToken)
        res.status(200).json({
            status: 'success',
            token: 'update token success'
        })
    } catch (error) {
        res.status(500).json({
            alo: error,
            status: 'fail',
            message: "Can't find refresh token or refresh token has expired",
            instruction: 'logout'
        })
    }
}
const deleteRefreshToken = async (req, res) => {
    try {
        const deleteToken = await Token.deleteOne({refresh_token: req.cookies.refresh_token})
        res.status(200).json({
            status: 'success',
            message: "deleted"
        })
    } catch (error) {
        res.status(500).json({
            alo: error,
            status: 'fail',
            message: "Can't find refresh token or refresh token has expired",
            instruction: 'logout'
        })
    }
}
export {createToken, refreshToken, deleteRefreshToken}
