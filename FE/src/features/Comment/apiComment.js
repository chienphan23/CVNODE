import axios from "../../setup/axios"

export const apiCreateComment = async (content, post, author) => {
    try {
        const comment = await axios.post("/comment/createComment", {content, post, author})
        return comment;
    } catch (error) {
        console.log(error)
        return;
    }
}
export const apiCreateCommentReply = async(content, post, author, idComment, tag) => {
    try {
        const comment = await axios.post("/comment/createComment", {content, post, author, parentComment: idComment, tag: tag})
        return comment;
    } catch (error) {
        console.log(error)
        return;
    }
}
export const apiGetParentComment = async (idPost, pageParam) => {
    try {
        const comment = await axios.get(`/comment/getParentComment?post=${idPost}&pageParam=${pageParam}`)
        return comment.comment;
    } catch (error) {
        console.log(error)
        return;
    }
}

export const apiGetCountComment = async (idPost) => {
    try {
        const comment = await axios.get(`/comment/getCountComment?post=${idPost}`)
        return comment;
    } catch (error) {
        console.log(error)
        return;
    }
}

export const apiGetCountParentComment = async (idPost) => {
    try {
        const comment = await axios.get(`/comment/getCountParentComment?post=${idPost}`)
        return comment.comments;
    } catch (error) {
        console.log(error)
        return;
    }
}

export const apiGetCountChildComment = async (idComment) => {
    try {
        const comment = await axios.get(`/comment/getCountChildComment?parentComment=${idComment}`)
        return comment;
    } catch (error) {
        console.log(error)
        return;
    }
}
export const apiGetChildComment = async (idComment) => {
    try {
        const comment = await axios.get(`/comment/getChildCommentByIdParentComment?parentComment=${idComment}`)
        return comment;
    } catch (error) {
        console.log(error)
        return;
    }
}
export const apiChangeComment = async (idComment, content) => {
    try {
        const comment = await axios.patch(`/comment/changeComment`, {idComment, content})
        return comment;
    } catch (error) {
        console.log(error)
        return;
    }
}
export const apiDeleteComment = async (idComment) => {
    try {
        const comment = await axios.delete(`/comment/deleteComment/${idComment}`)
        return comment;
    } catch (error) {
        console.log(error)
        return;
    }
}

