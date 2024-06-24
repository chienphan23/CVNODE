import { useEffect, useRef, useState } from "react"
import { apiCreateCommentReply, apiGetChildComment, apiGetCountChildComment } from "../features/Comment/apiComment"
import socketIOClient from "socket.io-client";
import { CommentItemUI } from "./CommentItemUI"
import { apiCreateNotifications } from "../features/Notifications/apiCreateNotifications";

const host = "http://localhost:3000";
export const CommentPostChild = ({idComment, idPost, userCurrent, authorOfPost}) => {
    const socketRef = useRef()
    const [countChildComment, setCountChildComment] = useState(0)
    const [content, setContent] = useState("")
    const [isOpen, setIsOpen] = useState(true)
    const [childComments, setChildComments] = useState([])
    const [reply, setReply] = useState(false)
    const [replyName, setReplyName] = useState("")
    const [replyTag, setReplyTag] = useState("")
    const [replyCommentId, setReplyCommentId] = useState("")

    useEffect(() => {
        const getCountChildComment = async () => {
            const getCount = await apiGetCountChildComment(idComment)
            setCountChildComment(getCount.comments)
        }
        getCountChildComment()
    })

    const handleToggleReply = async () => {
        if(isOpen){
            const childComments = await apiGetChildComment(idComment)
            setChildComments(childComments.comments)
        }
        setIsOpen(!isOpen)
    }
    const handleReply = (name, tag, commentId) => {
        setReply(!reply)
        setReplyName(name)
        setReplyTag(tag)
        setReplyCommentId(commentId)
    }
    const handleCancelReply = () => {
        setReply(!reply)
        setReplyName("")
        setReplyTag("")
        setReplyCommentId("")
    }
    const handleChangeContent = (e) => {
        setContent(e.target.value)
    }
    const handleSubmitCreateChildComment = async (e) => {
        e.preventDefault()
        let newComment
        if(replyCommentId === ""){
            console.log("alo")
            newComment = await apiCreateCommentReply(content, idPost, userCurrent, idComment, null) // nếu ở child nhưng không trả lời thì không đưa tag
        }else{
            newComment = await apiCreateCommentReply(content, idPost, userCurrent, replyCommentId, replyTag) // có trả lời => đưa tag
        }
        socketRef.current = socketIOClient.connect(host)
            socketRef.current.emit('Comment', {recipient: authorOfPost, message: "chào bạn"})
            setTimeout(() => {
                socketRef.current.disconnect();
              }, 1000);
        await apiCreateNotifications("Comment", userCurrent._id, idPost, authorOfPost)
        console.log(newComment)
    }

    return (
        <>
        {
            countChildComment > 0 && isOpen ?
            <div onClick={handleToggleReply}>
                 {isOpen && `Các câu trả lời ${countChildComment}`}
            </div>
            : countChildComment > 0 && !isOpen ? 
            <div>
                <div style={{boxSizing: "border-box", paddingLeft: "20px"}}>
                    {childComments.map((comment, index) =>
                        <div key={comment.id + index}>
                            <CommentItemUI role={"child"} handleReply={handleReply} comment={comment} index={index} userCurrent={userCurrent} idPost={idPost} />
                        </div>
                    )}
                    <form onSubmit={(e) => handleSubmitCreateChildComment(e)}>
                            {reply > 0 && "Đang trả lời @"+replyName} <div onClick={() => handleCancelReply()}>{reply && "❌"}</div>
                            <input placeholder="Thêm trả lời của bạn" onChange={(e) => handleChangeContent(e)} style={{outline: "none", border: "none", borderBottom: "1px solid #ccc"}}/>
                    </form>
                    
                </div>
            </div>

            : null
        }
        </>
    )
}