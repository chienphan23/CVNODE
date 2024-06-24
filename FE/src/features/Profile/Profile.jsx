import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { PostOfMe } from "../posts/PostOfMe";
import { Modal } from "../../ui/Modal";
import { ModalImformationUser } from "../../ui/ModalImformationUser";
import { useGetUser } from "./useGetUser";
import { useGetPostWithIdUser } from "./useGetPostWithIdUser";
import { FollowUser } from "../../ui/FollowUser";
import { UserImformation } from "../../ui/UserImformation";

export const Profile = () => {
    const navigate = useNavigate()
    const [toggleChangeImformation, setToggleChangeImformation] = useState(false)
    const {userCurrent, isLoading} = useGetUser() // lấy user
    const {posts} = useGetPostWithIdUser()// lấy posts
   
    if(isLoading) return <h1>Loading</h1>
    
    return(
        <>
        {toggleChangeImformation && <Modal changeToggle={setToggleChangeImformation}><ModalImformationUser changeToggle={setToggleChangeImformation} account={userCurrent}/></Modal>}
        <div>
            <div style={{position: "relative"}}>
                <UserImformation userDetail={userCurrent}/>
                <div style={{position: "absolute", top: "10px", right: "10%"}}>
                    <button onClick={() => navigate("/home/setting")}>⚙️ Cài đặt</button>
                </div>
            </div>
            <div>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {posts && posts.length !== 0 ? posts.map((post) => {
                        return <PostOfMe key={post.id} post={post} idUser={userCurrent._id}/>
                    }) : "Bạn chưa đăng bài viết nào."}
                </div>
            </div>
        </div>
        </>
    )
}