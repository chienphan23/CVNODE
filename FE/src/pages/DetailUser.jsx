import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Post from "../features/posts/Post";
import { apiFollowUser, apiUnFollowUser } from "../features/authentications/User/apiFollow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetUser } from "../features/Profile/useGetUser";
import { useGetDetailUser } from "../features/Profile/useGetDetailUser";
import { UserImformation } from "../ui/UserImformation";
import { apiCreateNotifications } from "../features/Notifications/apiCreateNotifications";
import socketIOClient from "socket.io-client";

const host = "http://localhost:3000";

export const DetailUser = () => {
    const socketRef = useRef()
    const {id} = useParams();
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [followButton, setFollowButton] = useState(false)
    const {userCurrent} = useGetUser() // lấy user
    const {userDetail, isLoading} = useGetDetailUser(id)
    const mutationFollow = useMutation({
        mutationFn: (id) => apiFollowUser(id),
        onMutate: () => queryClient.invalidateQueries("userCurrent")
    })
    const mutationUnFollow = useMutation({
        mutationFn: (id) => apiUnFollowUser(id),
        onMutate: () => queryClient.invalidateQueries("userCurrent")
    })
    useEffect(() => {
        if(Object.keys(userDetail).length !== 0 && Object.keys(userCurrent).length !== 0){
            if(userDetail._id === userCurrent._id){
                navigate("/home/profile", {replace: true})
            }
            if(Object.keys(userDetail).length === 0){
                navigate("/pageError", {replace: true})
            }
            if(userCurrent.following.includes(userDetail.id)){
                setFollowButton(true)
            }
        }
        
    }, [id, navigate, userCurrent, userDetail])

    if(isLoading) return <><h1>Loading</h1></>

    const handleFollower = async () => {
        setFollowButton(!followButton)
        if(followButton === false){
            mutationFollow.mutate(userDetail._id)
            socketRef.current = socketIOClient.connect(host)
            socketRef.current.emit('Follow', {recipient: id, message: "chào bạn"})// gửi sign vào sever để gửi đi id tạo ra thông báo cho người được nhận
            setTimeout(() => {
                socketRef.current.disconnect();
              }, 1000);
            await apiCreateNotifications("Follow", userCurrent._id, "", id)
        }else{
            mutationUnFollow.mutate(userDetail._id)
        }
    }
    const handleMessage = async () => {
        navigate(`/home/chatBox/${id}`)
    }


    return(
        <>
        <div>
            <UserImformation userDetail={userDetail}/>
            <div style={{display: "flex", justifyContent: "space-around"}}>
                <div>
                <button style={{backgroundColor: !followButton ? "#1877f2": "#DBDBDB", color: "white", border:"none",borderRadius: "4px",boxSizing: "border-box", padding: "8px", fontWeight: "600", width: "80px"}} onClick={handleFollower}>{!followButton ? "Follow" : "Following"}</button>
                <button style={{backgroundColor: "#484646", color: "white", border:"none",borderRadius: "4px",boxSizing: "border-box", padding: "8px", fontWeight: "600", width: "80px", cursor: "pointer"}} onClick={handleMessage}>Message</button>
                </div>
                <div ></div>
            </div>
            {userDetail.posts.map(post => <Post key={post.id} post={post} userCurrent={userDetail}/>)}
        </div>
        </>
    )
}