import toast, { Toaster } from "react-hot-toast";
import { apiDeletePost } from "./apiGetPosts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const ModalContentPost = ({post, togglePost, setTogglePost, handleClickEditPost, handleOnClickToggle}) => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (idPost) => apiDeletePost(idPost),
        onMutate: () => {   //đánh dấu dữ liệu cũ và sẽ refetching khi mutationFn thành công
            toast.success("Deleting")
            queryClient.invalidateQueries({queryKey: "postsOfMe"}) 
        }
    })

    
    const handleDeletePost = async (e) => {
        console.log("alo")
        mutation.mutate(post.id)
    }
    if(mutation.isLoading) return <><h1>Đang Xoá</h1></>

    return (
        <>
        <Toaster/>
        <div id={`modal-${post.id}`} style={{height: "100%",zIndex: 10,width: "100%",top:0,left:0,position: "fixed", display: `${togglePost === false ? "none": "block"}`}} onClick={(e) => handleOnClickToggle(e)}>
            <div id={`modalContent-${post.id}`} style={{position: "fixed",right:"50%",top:"50%",display: `${togglePost === false ? "none": "block"}`,backgroundColor: "#fff",zIndex:100,boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)", border: "0.5px solid #ccc",boxSizing: "border-box",padding:"10px",borderRadius: "6px" }} onClick={(e) => handleOnClickToggle(e)}>
                <div id={`modalConten1-${post.id}`} onClick={(e) => handleClickEditPost(e)}>Chỉnh sửa</div>
                <div id={`modalConten2-${post.id}`} onClick={(e) => handleDeletePost(e)}>Xoá</div>
            </div>
        </div>
        </>
    )
}