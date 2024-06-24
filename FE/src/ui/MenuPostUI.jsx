import { useState } from "react"
import { apiDeleteComment } from "../features/Comment/apiComment"

export const MenuPostUI = ({isOpenMenu, setIsOpenMenu,setIsChangingContent, idComment}) => {
    const [isOpenFormDelete, setIsOpenFormDelete] = useState(false)

    const handleChangeOpen = (e) => {
        if(!isOpenMenu){
            setIsOpenMenu(!isOpenMenu)
        }
        if(e.target.className === "Modal"){
            setIsOpenMenu(!isOpenMenu)
        }
        
    }
    const handleOnClickDelete = () => {
        setIsOpenFormDelete(!isOpenFormDelete)
    } 
    const handleDeleteComment = async () => {
        console.log(idComment)
        await apiDeleteComment(idComment)
        setIsOpenFormDelete(!isOpenFormDelete)
        setIsOpenMenu(!isOpenMenu)
    }
    return(
        <div className="Modal-change">
            <div style={{float: "right", fontSize: "20px"}} onClick={e => handleChangeOpen(e)}>
            {!isOpenMenu ? "..."
            : 
            <div className="Modal" style={{position: "fixed", top:"0", right:"0", left:"0", bottom:"0", height: "100vh"}}>
                <div style={{position: "absolute",top:"50%",left:"50%", backgroundColor:"white", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)"}}>
                <div className="Modal-child" onClick={() => {
                    setIsChangingContent(true)
                    setIsOpenMenu(!isOpenMenu)
                }}>
                    Chỉnh sửa
                </div>
                <div className="Modal-child" onClick={() => handleOnClickDelete()}>
                    Xoá
                </div>
                </div>
            </div>
            }
            </div>

            {
                isOpenFormDelete ?
                <div style={{position: "fixed", left: "50%", top:"50%", width: "200px", backgroundColor:"white", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)"}}>
                    <div>Xoá bình luận? <label onClick={() => setIsOpenFormDelete(false)}>❌</label></div>
                    <label>Bạn có chắc chắn muốn xoá bình luận này không?</label>
                    <div>
                    <button onClick={() => setIsOpenFormDelete(!isOpenFormDelete)}>Không</button><button onClick={handleDeleteComment}>Xoá</button>
                    </div>
                </div>
                : null
            }
            

        </div>
    )
}