import { useEffect, useRef, useState } from "react"
import { apiCreateCommentReply, apiGetChildComment, apiGetCountChildComment } from "../features/Comment/apiComment"
import { Link } from "react-router-dom"
import { CommentItemUI } from "./CommentItemUI"
import socketIOClient from "socket.io-client";
import { apiCreateNotifications } from "../features/Notifications/apiCreateNotifications";

const host = "http://localhost:3000";
export const CommentPostGrandChildren = ({idComment, userCurrent, idPost, authorOfPost}) => {
    const socketRef = useRef()
    const [isOpen , setIsOpen] = useState(true)
    const [content, setContent] = useState("")
    const [countGrandChildComment, setCountGrandChildComment] = useState(0)
    const [grandChildComment, setgrandChildComment] = useState([])
    const [reply, setReply] = useState(false)
    const [replyName, setReplyName] = useState("")
    const [replyTag, setReplyTag] = useState("")
    const [replyCommentId, setReplyCommentId] = useState("")


    useEffect(() => {
        const getCountChildComment = async () => {
            const getCount = await apiGetCountChildComment(idComment)
            setCountGrandChildComment(getCount.comments)
        }
        getCountChildComment()
    })
    const handleToggleReply = async () => {
        if(isOpen){
            const grandChildComment = await apiGetChildComment(idComment)   // get comment grandchild
            setgrandChildComment(grandChildComment.comments)
        }
        setIsOpen(!isOpen)
    }
    const handleReply = (name, tag, commentId) => {
        setReply(!reply)
        setReplyName(name)
        setReplyTag(tag)
        setReplyCommentId(commentId)
    }
    const handleChangeContent = (e) => {
        setContent(e.target.value)
    }
    const handleCancelReply = () => {
        setReply(!reply)
        setReplyName("")
        setReplyTag("")
        setReplyCommentId("")
    }
    const handleSubmitCreateGrandChildComment = async (e, tag) => { // comment parent là comment child không lấy grandchild
        e.preventDefault()
        if(replyCommentId === ""){
            await apiCreateCommentReply(content, idPost, userCurrent, idComment, null) // nếu ở child nhưng không trả lời thì không đưa tag
        }else{
            await apiCreateCommentReply(content, idPost, userCurrent, replyCommentId, replyTag) // có trả lời => đưa tag
        }
        socketRef.current = socketIOClient.connect(host)
            socketRef.current.emit('Comment', {recipient: authorOfPost, message: "chào bạn"})
            setTimeout(() => {
                socketRef.current.disconnect();
              }, 1000);
        await apiCreateNotifications("Comment", userCurrent._id, idPost, authorOfPost)
    }

    return (
        <>
            <div>
                {
                    countGrandChildComment > 0  && isOpen?
                    <div onClick={handleToggleReply}>
                        {isOpen && `Các câu trả lời ${countGrandChildComment}`}
                    </div>
                    : countGrandChildComment > 0 && !isOpen ? 
                    <div>
                        
                    <div style={{boxSizing: "border-box", paddingLeft: "20px"}}>
                        {grandChildComment.map((comment, index) =>
                        <div key={idComment + index}>
                            <CommentItemUI comment={comment} idPost={idPost} userCurrent={userCurrent} index={index} handleReply ={handleReply} role={"grandChild"}/>
                        </div>
                        )}
                        <form onSubmit={(e) => handleSubmitCreateGrandChildComment(e)}>
                                {reply > 0 && "Đang trả lời @"+replyName} <div onClick={() => handleCancelReply()}>{reply && "❌"}</div>
                                <input placeholder="Thêm trả lời của bạn" onChange={(e) => handleChangeContent(e)} style={{outline: "none", border: "none", borderBottom: "1px solid #ccc"}}/>
                        </form>
                    </div>
                </div>
                    : null

                }
            </div>
        </>
    )
}