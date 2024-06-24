import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "../../../../css/resetPassword.css"
import { resetPassword } from "./apiResetPassword"
import toast, { Toaster } from "react-hot-toast"

const ResetPassword = () => {
    const navigate = useNavigate()
    const {tokenReset} = useParams()
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const onChangePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value)
    }
    const onSubmitFormResetPassword = async (e) => {
        e.preventDefault()
        if(!password || !passwordConfirm){
            toast.error("Vui lòng cung cập mật khẩu mới và xác nhận mật khẩu.")
            return;
        }

        const result = await resetPassword(tokenReset, password, passwordConfirm)
        console.log(result)
        if(result.response?.data.message === "User validation failed: passwordConfirm: PasswordComfirm is not same password"){
            toast.error("Mật khẩu xác nhận không đúng.")
        }
        if(result?.response?.data?.message === "Token invalid or has expires"){
            toast.error("Thời gian đổi mật khẩu đã hết vui lòng gửi lại email để tiếp tục.")
        }
        if(result?.status === 200){
            toast.success("Bạn đã đổi mật khẩu thành công.")
            setTimeout(() => {
                navigate("/login")
            },5000)
        }
    }
    return (
        <>
        <Toaster/>
        <div style={{padding: "150px 0"}}>
        <div className="resetPassword-wrap">
        <h1 style={{margin: "8px 0"}}>Lấy lại mật khẩu</h1>
            <form onSubmit={(e) => onSubmitFormResetPassword(e)}>
                <label  style={{margin: "4px 0", display: "block"}}>Nhập mật khẩu mới: </label>
                <input placeholder="New password" onChange={e => onChangePassword(e)} style={{marginBottom: "6px"}}/>
                <label style={{margin: "4px 0", display: "block"}}>Xác nhận mật khẩu</label>
                <input placeholder="Password confirm" onChange={e => onChangePasswordConfirm(e)}/>
                <div style={{textAlign: "end"}}>
                <button type="submit" className="btn-confirm">Xác nhận</button>
                </div>
            </form>
        </div>
        </div>
        </>
    )
}
export default ResetPassword