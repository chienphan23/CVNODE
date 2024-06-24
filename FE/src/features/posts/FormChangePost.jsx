import { useState } from "react"
import { apiCreatePosts } from "./apiCreatePosts"
import { apiDeleteImageOfPost } from "./apiGetPosts"
// eslint-disable-next-line no-unused-vars
export const FormChangePost = ({_id, content, images}) => {
    const [contentState, setContent] = useState(content)
    const [imagesState, setImages] = useState(images)
    const handleChangeContent = (e) => {
        setContent(e.target.value)
    }
    const handleImageChange = (e) => {
        console.log(imagesState)
        console.log(...e.target.files)
        const newArray = imagesState.concat(...e.target.files);
        setImages(newArray)
    }
    const handleSubmitForm =async (e) => {
        e.preventDefault()
        // const formData = new FormData();
        // formData.append('content', content);
        // for (let i = 0; i < images.length; i++) {
        //     formData.append(`imagesPost`, images[i]);
        // }
        // await apiCreatePosts(formData)
    }
    const handleDeleteImage = async (e,image) => {
        e.preventDefault()
        console.log(image)
        if(imagesState.length !== 0) {
            const newImages = imagesState.filter((image1) => {
                return image1 !== image                
            })
            setImages(newImages)
        }
        // await apiDeleteImageOfPost(_id, image)
    }



// LÀM THÊM ẢNH VÀO BÀI VIẾT (IMAGESTATE HIỆN ĐANG LÀ ẢNH CÓ SẴN), ĐỔI ẢNH KHÁC



    return(
        <form onSubmit={handleSubmitForm} key={_id}>
            {console.log(imagesState)}
            <label>Nội dung:</label>
            <input value={contentState} onChange={e => handleChangeContent(e)}/>
            <br/>
            <label htmlFor="inputFile" style={{border: "2px solid #ccc"}}>Thêm ảnh</label>
            <input type="file" id="inputFile" onChange={e => handleImageChange(e)} accept="image/*" multiple encType="multipart/form-data" style={{display: "none"}}/>
            <br/>
           {imagesState.length > 0 &&    // images hiện tại là 1 filelist nên cần huỷ ra lấy các phần tử
            [...imagesState].map((image, index) => 
            <>
                {/* {console.log(image)} */}
                <img src={`http://localhost:3000/imgPost/${image}`} width="200px" alt="."/>
                <button type="button" onClick={(e) => {handleDeleteImage(e,image)}}>Xoá ảnh</button>
            </>
            )
           }
            <br/>
            <button type="submit" >Sửa bài viết</button>
        </form>
    )
}