import { useState } from "react"
import { apiCreatePosts } from "./apiCreatePosts"
import toast, { Toaster } from "react-hot-toast"

export const FormCreatePost = () => {
    const [content, setContent] = useState("")
    const [images, setImages] = useState([])
    const handleChangeContent = (e) => {
        setContent(e.target.value.trim())
    }
    const handleImageChange = (e) => {
            setImages(e.target.files)
    }
    const handleSubmitForm =async (e) => {
        e.preventDefault()
        if(content.replace(/\s/g, "") !== "" ){
        const formData = new FormData();
        formData.append('content', content);
            if(images.length > 0){
                for (let i = 0; i < images.length; i++) {
                    formData.append(`imagesPost`, images[i]);
                }
            }
        await apiCreatePosts(formData)
        setContent("")
        setImages([])
        toast.success("Thêm bài viết thành công")

        }else{
            toast(
                "Vui lòng nhập nội dung bài viết",
                {
                  duration: 6000,
                }
              );
        }
    }
    return(
        <>
        <Toaster/>
        <div style={{display: "flex", flexGrow: 1}}>
        <div style={{width: "20%"}}></div>

        <div style={{width: "60%", backgroundColor: "white", boxSizing: "border-box", padding: "30px", border: "0.2px solid #cecece", borderRadius: "8px",boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)"}}>
            <div style={{textAlign: "center", fontWeight: "900", fontSize: "24px",margin: "10px 0" }}>Tạo bài viết mới của bạn 📝</div>
        <form onSubmit={handleSubmitForm} >
            <label style={{fontSize: "20px",fontWeight: "700", marginBottom: "8px", display: "block"}}>Nội dung:</label>
            <div >
            <textarea onChange={e => handleChangeContent(e)} type="text" value={content} style={{width: "100%", height: "60px", padding: "5px 5px 5px 10px", borderRadius: "8px",fontSize: "18px", resize: "none"}}/>
            </div>
            <br/>
            <label htmlFor="inputFile" style={{cursor: "pointer",fontSize: "20px",fontWeight: "700"}}>Thêm ảnh vào bài viết của bạn: <h5 style={{display: "inline-block", marginLeft: "10px", fontSize: "18px", backgroundColor: "rgb(161, 158, 158)", borderRadius: "50%", padding: "6px"}}>📷</h5></label>
            <input type="file" id="inputFile" onChange={e => handleImageChange(e)} accept="image/*" multiple encType="multipart/form-data" style={{display: "none"}}/>
            <br/>
           {images.length > 0 &&    // images hiện tại là 1 filelist nên cần huỷ ra lấy các phần tử
            [...images].map((image, index) => 
                <img src={URL.createObjectURL(image)} width="200px" alt="." key={index}/>
            )
           }
            <br/>
            <button type="submit" style={{backgroundColor: "#1877f2", color: "white", boxSizing: "border-box", padding: "8px 10px", display: "inline-block", borderRadius: "6px", fontWeight: "600", margin: "5px 0", border: "none"}} >Tạo bài viết</button>
        </form>
        </div>

        <div style={{width: "20%"}}></div>
        </div>
        </>
    )
}