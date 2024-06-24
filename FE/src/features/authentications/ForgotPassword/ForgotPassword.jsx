import { useState } from "react"
import "../../../../css/forgotPassword.css"
import { forgotPassword } from "./apiForgotPassword"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!email){
            toast.error("Vui lòng nhập địa chỉ email.")
            return;
        }
        const token = await forgotPassword(email)
        if(token.status === 200){
            toast.success("Vui lòng kiểm tra tin nhắn trong email của bạn để đổi mật khẩu")
        }else{
            toast.error("Không người dùng với địa chỉ email này!")
        }
        setEmail("")
    }
    return (
        <div style={{width: "100%",display: "flex", justifyContent:"center",alignItems:"center"}}>
        <Toaster/>
        <div style={{height: "100vh", margin: "0",padding: "150px 0",boxSizing: "border-box", width: window.innerWidth < 900 ? "90%" : "50%", display: "flex", justifyContent:"center",alignItems:"center"}}>
        <div className="forgotPassword-wrap" style={{width: "100%"}}>
            <h1 className="forgot-h1">Tìm lại tài khoản của bạn</h1>
            <div>
               <p className="forgot-p">Vui lòng nhập email để tìm kiếm tài khoản của bạn</p> 
               <form onSubmit={(e) => handleSubmit(e)}>
                    <input className="forgot-input" placeholder="Enter your email" onChange={(e) => {onChangeEmail(e)}} value={email} type="email" />
                    <div className="wrap-button">
                    <button className="cancel" onClick={() => navigate("/login")} type="button">Huỷ</button><button type="submit" className="send">Gửi</button>
                    </div>
               </form>

            </div>
            </div>
        </div>  
        </div>
    )
}
export default ForgotPassword