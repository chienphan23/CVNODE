import { useEffect, useState } from "react"
import { CommentPostChild } from "./CommentPostChild"
import { MenuPostUI } from "./MenuPostUI"
import { Link } from "react-router-dom"
import { apiChangeComment } from "../features/Comment/apiComment"
import { CommentPostGrandChildren } from "./CommentPostGrandChildren"

export const CommentItemUI = ({comment, idPost, userCurrent, index, handleReply, role}) => {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [isChangingContent, setIsChangingContent] = useState(false)
    const [contentChange, setContentChange] = useState("")

    useEffect(() => {
        setContentChange(comment.content)
    }, [comment.content])
    const onChangeContent = (e) => {
        setContentChange(e.target.value)
    }
    const handleSubmitChangeContent = async (e) => {
        e.preventDefault()
        await apiChangeComment(comment.id, contentChange)
    }

    if(role === "parent"){
        return(
            <div key={idPost + index} style={{height: "20%"}}>
                           <div>
                           <img src={`http://localhost:3000/imgPost/${comment.author.avatar}`} width={"32px"} height={"32px"} alt="avartar" style={{display: "inline-block",borderRadius: "50%"}}/>
                           <Link to={`/home/${comment.author.id}`} style={{display: "inline-block", fontWeight: "bold",alignItems: "center", cursor:"pointer", color: "#1e1d1d",textDecoration: "none"}}>
                            <div>{comment.author.name}</div>
                            </Link>
                           </div>
                            <div style={{paddingLeft: "15px", boxSizing: "border-box"}}>
                                {!isChangingContent ?  comment.content
                                :
                                <form onSubmit={(e) => handleSubmitChangeContent(e)}>
                                    <input value={contentChange} onChange={e => onChangeContent(e)} autoFocus/> 
                                    <button type="submit">Sửa</button>
                                </form>
                                }
                            </div>
                            <div style={{display: "flex", paddingLeft: "15px", boxSizing: "border-box"}}>
                                <div style={{marginRight: "15px"}}>Like</div>
                                <div onClick={() => handleReply(comment.author.name, comment._id, comment.author.id) }> Trả lời</div>
                            </div>

                            {
                                userCurrent._id === comment.author.id && <MenuPostUI isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} setIsChangingContent={setIsChangingContent} isChangingContent={isChangingContent} idComment={comment.id}/>
                            }

                            <CommentPostChild idComment={comment._id} idPost={idPost} userCurrent={userCurrent} authorOfPost={comment.author.id}/>
                            <br/>
                        </div>
        )
    }
    if(role === "child"){
        return(
            <div key={comment.id + index}>
                        {comment.tag !== null && <Link to={`/home/${comment.tag._id}`} style={{display: "inline-block", fontWeight: "bold",alignItems: "center", cursor:"pointer", color: "#1e1d1d",textDecoration: "none"}}>{comment.tag.name}</Link>} 
                            <div style={{paddingLeft: "15px", boxSizing: "border-box"}}>
                                {!isChangingContent ?  comment.content
                                :
                                <form onSubmit={(e) => handleSubmitChangeContent(e)}>
                                    <input value={contentChange} onChange={e => onChangeContent(e)} autoFocus/> 
                                    <button type="submit">Sửa</button>
                                </form>
                                }
                            </div>
                            <div style={{display: "flex", paddingLeft: "15px", boxSizing: "border-box"}}>
                                <div style={{marginRight: "15px"}}>Like</div>
                                <div onClick={() => handleReply(comment.author.name, comment.author.id, comment.id)}>Trả lời</div>
                            </div>
                        {
                            userCurrent._id === comment.author.id && <MenuPostUI isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} setIsChangingContent={setIsChangingContent} isChangingContent={isChangingContent} idComment={comment.id}/>
                        }
                        <div>
                            <CommentPostGrandChildren idComment={comment.id} userCurrent={userCurrent} idPost={idPost} authorOfPost={comment.author.id}/>
                        </div>

                    </div>
        )
    }
    if(role === "grandChild"){
        return(
            <div key={comment.id + index}>
                {comment.tag !== null && <Link to={`/home/${comment.tag._id}`} style={{display: "inline-block", fontWeight: "bold",alignItems: "center", cursor:"pointer", color: "#1e1d1d",textDecoration: "none"}}>{comment.tag.name}</Link>} 
                            <div style={{paddingLeft: "15px", boxSizing: "border-box"}}>
                                {!isChangingContent ?  comment.content
                                :
                                <form onSubmit={(e) => handleSubmitChangeContent(e)}>
                                    <input value={contentChange} onChange={e => onChangeContent(e)} autoFocus/> 
                                    <button type="submit">Sửa</button>
                                </form>
                                }
                            </div>
                            <div style={{display: "flex", paddingLeft: "15px", boxSizing: "border-box"}}>
                                <div style={{marginRight: "15px"}}>Like</div>
                                <div onClick={() => handleReply(comment.author.name, comment.author.id, comment.id)}>Trả lời</div>
                            </div>
                {
                    userCurrent._id === comment.author.id && <MenuPostUI isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} setIsChangingContent={setIsChangingContent} isChangingContent={isChangingContent} idComment={comment.id}/>
                }
            </div>
        )
    }
}