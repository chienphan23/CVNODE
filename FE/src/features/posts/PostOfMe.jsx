import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { ModalContentPost } from "./ModalCotentPost";
import { ModalUpdatePost } from "./ModalUpdatePost";
import { Like } from "../../ui/Like";
import { CreateAtPost } from "../../ui/CreateAtPost";
import { ImagePost } from "../../ui/ImagePost";


export const PostOfMe = ({post, setListPosts, idUser}) => {
    const [togglePost, setTogglePost] = useState(false)
    const [toggleEditPost, setToggleEditPost] = useState(false)
    const {content, like, createAt, images, _id: idPost} = post
    const [contentState, setContent] = useState(content)
    const [imagesState, setImages] = useState(images)

   
    const handleOnClickToggle = (e) => {
        console.log(e.target.id)
        if(e.target.id.startsWith("togglePost")  ){
            setTogglePost(!togglePost)
        }
        // if(e.target.id.startsWith("modal")){
        //     setTogglePost(!togglePost)
        // }
    }
    const handleClickEditPost = (e) => {
        // console.log(e.target.id)
        setTogglePost(false)
        if(e.target.id.startsWith("modalConten1")){
            setToggleEditPost(!toggleEditPost)
        }
        if(e.target.id.startsWith("modalEdit")){
            setToggleEditPost(!toggleEditPost)
        }
    }
    
    return (
        <div key={idPost} style={{width:"30%"}}>
        <Toaster/>
        <div style={{padding: "15px", boxSizing: "border-box", border: "1px solid #ccc", margin: "10px 10px", borderRadius: "8px", backgroundColor: "#FFF",position: "relative"}}>
        <div id={`togglePost-${post.id}`} style={{position: "absolute",right:"15px", display: `${togglePost === false ? "block": "none"}` }} onClick={(e) => handleOnClickToggle(e)}>...</div>
        {/* modal of post */}
        <ModalContentPost post = {post} togglePost={togglePost} handleClickEditPost={handleClickEditPost} handleOnClickToggle={handleOnClickToggle} setContent={setContent} />
        <ModalUpdatePost contentState={contentState} imagesState={imagesState} post={post} setContent={setContent} setImages={setImages} toggleEditPost={toggleEditPost} handleClickEditPost={handleClickEditPost}/>
        
        <p>{images.length ===0 ? "💭🗯️":  content}</p> 
        <ImagePost images={images} idPost={idPost}/>
        {images.length === 0 ? 
            <>
                <div style={{width: "335.15px", height: "335.15px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "6px", boxShadow: "6px 6px 4px #c5c3c3", border: "0.5px solid #c5c3c3", marginBottom: "10px"}}>{content}</div>
            </>
            : ""
        }
        <CreateAtPost createAt={createAt}/>
        <Like like={like} idPost={idPost} idUser={idUser}/>
        </div>
        </div>
    )
}