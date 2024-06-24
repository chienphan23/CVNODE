import { useNavigate } from "react-router-dom"
import "../../../../css/signup.css"
import { useState } from "react"
import { signupUser } from "./apiSignup"
import toast, { Toaster } from "react-hot-toast"

const SignUp = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [togglePassword, setTogglePassword] = useState(false)
    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
   
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const onChangePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!email || !password || !name || !passwordConfirm){
            toast.error("Vui lòng nhập đầy đủ thông tin đăng ký")
            return;
        }
        const result = await signupUser(email, password, name, passwordConfirm)
        console.log(result)
        if(result.data?.status === "success"){
            toast.success("Đăng ký tài khoản thành công")
        }
        if(result?.response?.data?.message.startsWith("E11000")){
            if(result.response.data.message.includes("email_1")){
                toast.error("Email đã được đăng ký trước đây, vui lòng nhập email khác.")
                return;
            }
            if(result.response.data.message.includes("name_1")){
                toast.error("Tên người dùng đã tồn tại, vui lòng nhập tên khác.")
                return;
            }
        }
        if(result?.response?.data?.message === "User validation failed: passwordConfirm: PasswordComfirm is not same password"){
            toast.error("Mật khẩu xác nhận không chính xác.")
            return;
        }
    }
    return(
        <>
        <Toaster />
        <h1 style={{textAlign: "center", margin: "0 0 50px 0", paddingTop: "10px", fontWeight: "bold"}}>Đăng ký tài khoản của bạn</h1>
        <div style={{padding: window.innerWidth < 900 ? "5px" : "5px 550px", display: "flex", flexDirection: "column",alignItems: "center"}}>
            <div  className="wrap-form" style={{backgroundColor: "#ebeded", width: "90%", border: "2px solid #a7a6a6", borderRadius: "4px"}}>
                <form onSubmit={e => handleSubmit(e)}>
                    <label className="signup-form-label"  htmlFor="signup-input-email">Nhập địa chỉ email của bạn</label>
                    <input type="email" placeholder="Your email" className="signup-form-input" id="signup-input-email" onChange={(e) => onChangeEmail(e)}/>
                    <label className="signup-form-label" htmlFor="signup-input-name">Nhập tên người dùng</label>
                    <input placeholder="Your name" className="signup-form-input" id="signup-input-name" onChange={(e) => onChangeName(e)}/>
                    <label className="signup-form-label" htmlFor="signup-input-password">Nhập mật khẩu</label>
                    <input placeholder="password" className="signup-form-input" id="signup-input-password" onChange={(e) => onChangePassword(e)}  type={togglePassword? "text":"password"}/>
                    <label className="signup-form-label" htmlFor="signup-input-passwordConfirm">Xác nhận mật khẩu</label>
                    <input placeholder="Password comfirm" className="signup-form-input" id="signup-input-passwordConfirm" onChange={(e) => onChangePasswordConfirm(e)} type={togglePassword? "text":"password"}/>
                    <div style={{marginTop: "5px"}}>
                        <input type="checkbox" onChange={() => setTogglePassword(!togglePassword)} id="signup-form-checkbox"/><label htmlFor="signup-form-checkbox">Hiển thị mật khẩu</label>
                    </div>
                    <button type="submit" className="signup-form-button">Đăng nhập</button>
                </form>
            </div>
            <div className="wrap-form">
                <p className="login-text--1">Bạn đã có tài khoản ? </p><p onClick={() => navigate("/login")}  className="login-text--2">Đăng nhập</p>
            </div>
        </div>
        </>
    )
}
export default SignUp