import { Link } from "react-router-dom";
import { Like } from "../../ui/Like";
import { CreateAtPost } from "../../ui/CreateAtPost";
import CommentPost from "../../ui/CommentPost";
import { useEffect, useState } from "react";
import { apiGetCountComment } from "../Comment/apiComment";


const Post = ({post, userCurrent}) => {
    const {_id: idPost, content, like, createAt,user: userOfPost, images} = post
    const {_id: idUser} = userCurrent
    const [numCommentShow, setNumCommentShow] = useState(0)
    const [isOpenComment, setIsOpenComment] = useState(false)

    useEffect(() => {
        const getComment = async () => {
            const getComments = await apiGetCountComment(idPost)
            setNumCommentShow(getComments.comments)
        }
        getComment()



    }, [idPost])

    return (
        <div >
        <div style={{padding: "15px", boxSizing: "border-box", border: "1px solid #ccc", margin: "10px 0px", borderRadius: "8px", backgroundColor: "#FFF"}}>
        
        <Link to={`/home/${userOfPost._id}`} style={{display: "flex",alignItems: "center", cursor:"pointer", color: "#1e1d1d",textDecoration: "none"}}>
            <img src={`http://localhost:3000/imgPost/${userOfPost.avatar}`} width={"50px"} height={"50px"} alt="avartar" style={{display: "inline-block",borderRadius: "50%"}} />
            <div style={{marginLeft: "10px", display: "flex",flexDirection:"column",justifyContent:"space-between"}}>
            <h5 style={{margin: 0}}>{userOfPost.name}</h5>
            <CreateAtPost createAt={createAt}/>
            </div>
        </Link>
        <div>
        {images.length === 0 ? 
        <div style={{display: "flex",alignItems:"center",justifyContent: "center"}}>
            <div style={{width: "500px", height: "500px", display: "flex",justifyContent: "center", alignItems: "center",backgroundImage: "url(/imagesApp/backgroundPost1.jpg)", backgroundRepeat: "no-repeat", backgroundPosition: "", borderRadius: "8px", }}>
            <p style={{fontSize: "18px",fontWeight: "600"}}>{content}</p>
        </div>
        </div>
        :
        <p style={{fontSize: "18px", display:"block", margin: "10px 5px"}}>{content}</p> 
        }
        </div>

        {images.length > 0 &&
        <div style={{display: "flex", justifyContent: "center", alignItems: "center",flexWrap: "wrap", borderBottom: "0.2px solid #ccc", borderTop: "0.2px solid #ccc", boxSizing: "border-box", padding: "20px 0", borderRadius: "8px"}}>
            {images.length === 1 &&
            images.map((image, index) => {
                return(
                    <img src={`http://localhost:3000/imgPost/${image}`} alt="1" key={index} style={{width: "500px",height: "500px"}}/>
                    )
                })
            }
            {images.length > 1 && images.length <= 4  &&
            images.map((image, index) => {
                return(
                    <img src={`http://localhost:3000/imgPost/${image}`} alt="1" key={index} style={{width: "300px",height: "300px"}}/>
                    )
                })
            }    
            {images.length >4 &&
            images.map((image, index) => {
                if(index <= 2){
                    return(
                        <img src={`http://localhost:3000/imgPost/${image}`} alt="1" key={index} style={{width: "400px",height: "400px"}}/>
                        )
                    }
                    if(index === 3 && images.length >= 4){
                        return(
                            <div style={{position: "relative"}}>
                            <img src={`http://localhost:3000/imgPost/${image}`} alt="1" key={index} style={{width: "400px",height: "400px", position: "relative", filter: "blur(2px)"}}/>
                                <p style={{position: "absolute",top:"190px",right:"140px", fontWeight: "bold"}}>xem thêm {images.length - 4} ảnh</p>
                        </div>
                        
                        )
                    }
                    
                })
            }
        </div>
        }
        <Like like={like} idPost={idPost} idUser={idUser} idOwnerPost = {userOfPost._id}/>
        <CommentPost idPost={idPost} userCurrent={userCurrent} nameAuthorOfPost={userOfPost.name} authorOfPost={userOfPost._id}/>
        </div>
        </div>
    )
}
export default Post;