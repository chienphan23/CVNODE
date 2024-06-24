import axios from "../../setup/axios.js"

const apiGetPosts = async (page) => {
    try {
        // page đại diện cho số bài viết đã được lấy
        const posts = await axios.get(`http://localhost:3000/api/v1/posts?page=${page}`)
        return posts;
    } catch (error) {
        return error
    }
}

const apiDeletePost = async (id) => {
        try{
            const post = await axios.delete(`/posts/${id}`)
            console.log(post)
            return post
        }catch (error) {
            return error;
        }
}

const apiDeleteImageOfPost = async (id, image) => {
    try{
        const post = await axios.post(`/posts/deletePost`, {id, image})
        console.log(post)
        return post
    }catch (error) {
        return error;
    }
}

const apiLikePost = async (idPost) => {
    try{
        const post = await axios.patch(`/posts/likePost`, {idPost})
        return post
    }catch (error) {
        return error;
    }
}

const apiUnLikePost = async (idPost) => {
    try{
        const post = await axios.post(`/posts/likePost`, {idPost})
        return post
    }catch (error) {
        return error;
    }
}

export {apiGetPosts, apiDeleteImageOfPost, apiDeletePost, apiLikePost, apiUnLikePost}