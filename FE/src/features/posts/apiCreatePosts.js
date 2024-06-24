import axios from "../../setup/axios.js"

const apiCreatePosts = async (formData) => {
    try {
        console.log(formData)
        const posts = await axios.post(`http://localhost:3000/api/v1/posts`, formData)
        console.log(posts)
        return posts;
    } catch (error) {
        return error
    }
}

const apiUpdatePost = async ( id, formData) => {
    try {
        for (var pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        const posts = await axios.patch(`http://localhost:3000/api/v1/posts/${id}`, formData,{  // nếu gửi bằng form data thì cần phải có multer (ở phía express)
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        console.log(posts)
        return posts;
    } catch (error) {
        return error
    }
}
export {apiCreatePosts, apiUpdatePost}