import mongoose, { get } from "mongoose";
import Comment from "../models/commentModel.js"

const createComment = async (req, res) => {
    try {
        let comment;
        if(req.body.parentComment){ // nếu có id comment => reply comment
            comment = await Comment.create({content: req.body.content, author: req.body.author, post: req.body.post, parentComment: req.body.parentComment, tag: req.body.tag})
        }else{
            comment = await Comment.create({content: req.body.content, author: req.body.author, post: req.body.post})
        }
        
        return res.status(200).json({
            status: "success",
            comment: comment
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: "Can't create comment"
        })
    }
}


const getCommentByIdPost = async (req, res) => {
    try {
        const comments = await Comment.find({post: req.query.post}).populate({
            path: 'author',
            select: 'name _id'
        });
        return res.status(200).json({
            status: 'success',
            comment: comments,

        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: "Can't get comment by this post id"
        })
    }
}
const getParentCommentByIdPost = async (req, res) => {
    try {
        let pageParam = req.query.pageParam;
        pageParam = pageParam - 1; // giảm 1 số tránh skip nhầm
        
        const comments = await Comment.find({$and : [{post: req.query.post}, {parentComment : {$eq: null}}]}).limit(15).skip(pageParam * 15).populate({
            path: 'author',
            select: 'name avatar'
        });
        return res.status(200).json({
            status: 'success',
            comment: comments,

        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: "Can't get comment by this post id"
        })
    }
}
const getChildCommentByIdParentComment = async (req, res) => {
    try {
        const comments = await Comment.find({parentComment : req.query.parentComment}).sort({ createAt: -1 }).populate({
            path: 'author',
            select: 'name'
        }).populate({
            path: 'tag',
            select: "name"
        });
        return res.status(200).json({
            status: 'success',
            comments: comments,
            pageParam: pageParam
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: "Can't get comment by this post id"
        })
    }
}

const getCountParentComment = async (req, res) => {
    try {
        const postObjectId = new mongoose.Types.ObjectId(req.query.post);   // đổi string => ObjectId
        const comments = await Comment.aggregate([
            {
                $match: {
                    post: postObjectId,     // where
                    parentComment: null
                }
            },
            {
                $group: {
                    _id: "$post",   // nhóm các cmt của 1 post
                    sum: {$sum: 1}
                }
            },
            {
                $project: {
                    _id: 0,
                    sum: 1
                }
            }
        ])
        let sum = 0
        sum = comments.length > 0 ? comments[0].sum : 0
        return res.status(200).json({
            status: "success",
            comments: sum
        })

    } catch (error) {
        return res.status(400).json({
            stauts: 'fail',
            message: error
        })
    }
}

const getCountComment = async (req, res) => {
    try {
        const postObjectId = new mongoose.Types.ObjectId(req.query.post);   // đổi string => ObjectId
        const comments = await Comment.aggregate([
            {
                $match: {
                    post: postObjectId      // where
                }
            },
            {
                $group: {
                    _id: "$post",   // nhóm các cmt của 1 post
                    sum: {$sum: 1}
                }
            },
            {
                $project: {
                    _id: 0,
                    sum: 1
                }
            }
        ])
        let sum = 0
        sum = comments.length > 0 ? comments[0].sum : 0
        return res.status(200).json({
            status: "success",
            comments: sum
        })

    } catch (error) {
        return res.status(400).json({
            stauts: 'fail',
            message: error
        })
    }
}
const getCountChildComment = async (req, res) => {
    try {
        const childCommentObjectId = new mongoose.Types.ObjectId(req.query.parentComment);   // đổi string => ObjectId
        const comments = await Comment.aggregate([
            {
                $match: {
                    parentComment: childCommentObjectId      // where
                }
            },
            {
                $group: {
                    _id: "$post",   // nhóm các cmt của 1 post
                    sum: {$sum: 1}
                }
            },
            {
                $project: {
                    _id: 0,
                    sum: 1
                }
            }
        ])
        let sum = 0
        sum = comments.length > 0 ? comments[0].sum : 0
        return res.status(200).json({
            status: "success",
            comments: sum
        })

    } catch (error) {
        return res.status(400).json({
            stauts: 'fail',
            message: error
        })
    }
}

const changeComment = async (req, res) => {
    try {
        const currentTime = new Date()
        const comments = await Comment.findOneAndUpdate( {_id : req.body.idComment}, {$set: {changeAt: currentTime, content: req.body.content}})
        return res.status(200).json({
            status: 'success',
            comments: comments,

        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: "Can't change comment by this post id"
        })
    }
}
const deleteComment = async (req, res) => {
    try {
        await Comment.deleteOne( {_id : req.params.idComment})
        return res.status(200).json({
            status: 'success',
            message: "deleted comment",

        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: "Can't change comment by this post id"
        })
    }
}

export {createComment, getCommentByIdPost, getCountComment, getParentCommentByIdPost, getCountChildComment, getChildCommentByIdParentComment, changeComment, deleteComment, getCountParentComment}