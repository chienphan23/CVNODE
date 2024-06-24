import { useEffect, useRef, useState } from "react"
import { apiCreateComment, apiCreateCommentReply, apiGetParentComment, apiGetCountComment, apiGetCountParentComment } from "../features/Comment/apiComment"
import { Modal } from "./Modal"
import { CommentItemUI } from "./CommentItemUI"
import { useInfiniteQuery } from "@tanstack/react-query"
import socketIOClient from "socket.io-client";
import { apiCreateNotifications } from "../features/Notifications/apiCreateNotifications"

let pageUnit = 15;
const host = "http://localhost:3000";

const CommentPost = ({idPost, userCurrent, nameAuthorOfPost, authorOfPost}) => {
    const socketRef = useRef()

    const {data, hasNextPage, fetchNextPage} = useInfiniteQuery({
        enabled: false,
        queryKey: ['commentOfPost'],
        queryFn: ({pageParam = 1}) => apiGetParentComment(idPost, pageParam),
        getNextPageParam: (lastPage, allPages) =>  {
            if(lastPage.length === 0){
                return undefined
            }
            const nextPage = allPages.length + 1
            return nextPage
        }
    })
    const [numCommentShow, setNumCommentShow] = useState(0)
    const [content, setContent] = useState("")
    const [comments, setComments] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [reply, setReply] = useState(false)   // đang cmt hay trả lời cmt
    const [replyName, setReplyName] = useState("")
    const [idCommentReply, setIdCommentReply] = useState("")
    const [authorId, setAuthorId] = useState("")// dùng để đưa vào tag
    const [numParentComment, setNumParentComment] = useState(0)
    


    const onChangeContent = (e) => {
            setContent(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(reply && idCommentReply !== null){
            await apiCreateCommentReply(content, idPost, userCurrent._id, idCommentReply, authorId)
        }else{
            await apiCreateComment(content, idPost, userCurrent._id)
        }
        socketRef.current = socketIOClient.connect(host)
            socketRef.current.emit('Comment', {recipient: authorOfPost, message: "chào bạn"})
            setTimeout(() => {
                socketRef.current.disconnect();
              }, 1000);
        await apiCreateNotifications("Comment", userCurrent._id, idPost, authorOfPost)
    }
    const handleClickComment = async () => {
        setIsOpen(true)
        
        await fetchNextPage()  
    }
    const handleFetchMoreComment = async () => {
        await fetchNextPage()
    }
    const handleReply = async (name, idCommentReply, authorId) => {
        setReplyName(name)
        setReply(true)
        setIdCommentReply(idCommentReply)
        setAuthorId(authorId)
    }
    const handleCancelReply = () => {
        setReply(false)
        setIdCommentReply("")
        setAuthorId("")
    }

    useEffect(() => {
        const getComment = async () => {
            const getComments = await apiGetCountComment(idPost)
            setNumCommentShow(getComments.comments)
        }
        const getCountParentComment = async() => {
            const getNumParentComment = await apiGetCountParentComment(idPost)
            setNumParentComment(getNumParentComment)
        }
        if(isOpen){
            getCountParentComment()
        }
        getComment()

    }, [idPost, isOpen])

    if(isOpen && !data) return <h1>Loading</h1>

    return(
        <div>
            <div onClick={handleClickComment}>
                🗨️ {numCommentShow !==0 ? numCommentShow : "Chưa có bình luận nào"}
                {/* {isOpenComment && <CommentPost idPost={idPost} userCurrent={userCurrent} nameAuthorOfPost={userOfPost.name} numCommentShow={numCommentShow}/>} */}

            </div>
            { isOpen &&
                <Modal changeToggle={setIsOpen}>
                    <div style={{backgroundColor: "white", width: "60%", height: "80%", position:"relative", overflowY: "scroll"}}>
                        <h1>Bài viết của {nameAuthorOfPost}</h1>
                        <div style={{float: "right", position: "absolute", right:"2%", top:"8%"}} onClick={() => setIsOpen(!isOpen)}>❌</div>
                        {data.pages.map(page => 
                            page.map((comment, index) => 
                        <div key={idPost + index}>
                            <CommentItemUI comment={comment} idPost={idPost} userCurrent={userCurrent} index={index} handleReply ={handleReply} role={"parent"}/>
                        </div>
                        ))}

                        {data.pages.length*pageUnit < numParentComment && 
                        <div onClick={handleFetchMoreComment}>
                            Hiển thị thêm bình luận
                        </div>
                        }
                        
                        <hr/>
                        <div style={{ width: "100%"}}>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            {reply > 0 && "Đang trả lời @"+replyName} <div onClick={() => handleCancelReply()}>{reply && "❌"}</div>
                            <input placeholder="Thêm bình luận của bạn" onChange={(e) => onChangeContent(e)} style={{outline: "none", border: "none", borderBottom: "1px solid #ccc", width: "100%", fontSize:"14px", padding:"0"}}/>
                        </form>
                        </div>
                    </div>
                </Modal>
                }
        </div>
    )
}
export default CommentPost