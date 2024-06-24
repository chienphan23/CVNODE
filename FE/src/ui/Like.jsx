import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiLikePost, apiUnLikePost } from "../features/posts/apiGetPosts"
import { useEffect, useRef, useState } from "react"
import socketIOClient from "socket.io-client";
import { apiCreateNotifications } from "../features/Notifications/apiCreateNotifications";

const host = "http://localhost:3000";

export const Like = ({like, idPost, idUser, idOwnerPost}) => {
    const socketRef = useRef()
    const queryClient = useQueryClient()
    const [liked, setLiked] = useState(false)

    const mutationLike = useMutation({
        mutationFn: () => apiLikePost(idPost),
        onMutate: () => {
            queryClient.invalidateQueries("posts") // mất hiệu lực tất cả các truy vấn đang hoạt động
        }
    })
    const mutationUnLike = useMutation({
        mutationFn: () => apiUnLikePost(idPost),
        onSuccess: () => {
            queryClient.invalidateQueries("posts") // mất hiệu lực tất cả các truy vấn đang hoạt động
        }
    })
    const mutationCreateNotification = useMutation({
        mutationFn: () => apiCreateNotifications("Like", idUser, idPost, idOwnerPost)

    })

    const handleClickLike = () => {
        setLiked(!liked)
        if(liked === false){
            mutationLike.mutate(idPost)
            mutationCreateNotification.mutate()
            socketRef.current = socketIOClient.connect(host)
            socketRef.current.emit('Like', {recipient: idOwnerPost, message: "chào bạn"})// gửi sign vào sever để gửi đi id tạo ra thông báo cho người được nhận
            setTimeout(() => {
                socketRef.current.disconnect();
              }, 1000);
            
        }else{
            mutationUnLike.mutate(idPost)
        }
    }
    useEffect(() => {
        if(like.includes(idUser)){
            setLiked(true)
        }
    }, [like, idUser])

    return (
        <>
        <h5 onClick={handleClickLike} style={{margin: "0px"}}><img style={{width: "25px",height: "25px"}} src={liked ? "/icons/liked.png" : "/icons/like.png"} alt="like"/>{like.length}</h5>
        </>
    )
}