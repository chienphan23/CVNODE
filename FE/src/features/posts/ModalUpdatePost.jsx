import { apiUpdatePost } from "./apiCreatePosts";

export const ModalUpdatePost = ({post, contentState, imagesState, setContent, setImages, toggleEditPost, handleClickEditPost}) => {

    const handleChangeContent = (e) => {
        console.log(contentState)
        setContent(e.target.value)
    }

    const handleImageChange = (e) => {
        e.preventDefault()
        setImages((i) => [...i,...e.target.files])
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

    const handleSubmitForm =async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('content', contentState);
        for (let i = 0; i < imagesState.length; i++) {
            formData.append(`imagesPost`, imagesState[i]);
        }
       
        await apiUpdatePost(post.id, formData)
    }

    return (
        <>
            <div id={`modalEdit-${post.id}`} style={{height: "100%",zIndex: 10,width: "100%",top:0,left:0,position: "fixed", display: `${toggleEditPost === false ? "none": "block"}`}} onClick={(e) => handleClickEditPost(e)}>
                <div id={`modalEditPost-${post.id}`} style={{position: "fixed",right:"50%",top:"0",display: `${toggleEditPost === false ? "none": "block"}`,backgroundColor: "#fff",zIndex:100,boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)", border: "0.5px solid #ccc",boxSizing: "border-box",padding:"10px",borderRadius: "6px" }} >
                    <div id={`Conten1-${post.id}`} >Chỉnh sửa</div>
                    {/*  */}
                    
                    <form onSubmit={handleSubmitForm} >
                        <label>Nội dung:</label>
                        <input value={contentState} onChange={e => handleChangeContent(e)}/>
                        <br/>
                        {/* Nếu không thêm post.id thì khi bấm vào label sẽ ăn vào input đầu tiên (lấy id đầu tiên của trang) */}
                        <label htmlFor={`inputFile-${post.id}`} style={{border: "2px solid #ccc"}}>Thêm ảnh</label>  
                        <input type="file" id={`inputFile-${post.id}`} onChange={e => handleImageChange(e)} accept="image/*" multiple encType="multipart/form-data" style={{display: "none"}}/>
                        <br/>
                            {imagesState.length > 0 &&    // images hiện tại là 1 filelist nên cần huỷ ra lấy các phần tử
                                [...imagesState].map((image, index) => 
                                    <div key={index}>
                                    {image.type?.startsWith("image") ?
                                    
                                            <img src={URL.createObjectURL(image)} width="200px" alt="." />
                                    :
                                            <img src={`http://localhost:3000/imgPost/${image}`} width="200px" alt="." />
                                            
                                        }
                                        <button type="button" onClick={(e) => {handleDeleteImage(e,image)}}>Xoá ảnh</button>
                                        
                                    </div>
                                )
                            }
                        <br/>
                        <button type="submit" >Sửa bài viết</button>
                    </form>
                </div>
            </div>
            </>
    )
}