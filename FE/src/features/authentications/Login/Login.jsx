import { useEffect, useState } from "react"
import { apiLogin, handleCheckTokenExists } from "./apiLogin"
import { useNavigate } from "react-router-dom"
import "../../../../css/login.css";
import toast, { Toaster } from "react-hot-toast";
import {userLogin} from "../userSlice";
import { useDispatch } from "react-redux";


const Login = () => {
    const [screen, setScreen] = useState(window.innerWidth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isError, setIsError] = useState(false)
    const [messageError, setMessageError] = useState("")

    

    const handleSubmitFormLogin = async (e) => {
        e.preventDefault()
        if(!email){
            toast.error("Vui lòng nhập email")
            return;
        }
        if(!password) {
            toast.error("vui lòng nhập password")
            return;
        }
        const token= await apiLogin(email, password)
        if(token.data?.message === "Login success"){
            // const result = await handleCheckTokenExists();
            // console.log(result)

            // dispatch(userLogin(result?.user?.id))
            navigate("/")
        }else{
            toast.error("Email hoặc mật khẩu không chính xác")
        }
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    // useEffect(() => {
    //     const checkToken = async () => {
    //         const result = await handleCheckTokenExists()
    //         console.log(result)
    //         if(result?.message === "logged"){
    //             dispatch(userLogin({idUser: result?.user?.id}))
    //             navigate("/")
    //         } 
    //     }
    //     checkToken()
    //     }, [])
    return(
        <div>
            
        <Toaster/>
        <h1 style={{textAlign: "center", margin: "0 0 50px 0", paddingTop: "10px", fontWeight: "bold"}}>Chào mừng bạn đến với ConnectSocial</h1>
        <div className="login-wrap" style={{backgroundImage: "url(/imagesApp/BackgroundLogin.png)",backgroundRepeat: "no-repeat",backgroundPosition:"left",backgroundPositionY: "center", alignItems: window.innerWidth < 900 ? "center" : "", justifyContent: window.innerWidth < 900 ? "center": ""}}>
            <div className="login-1" style={{display: screen < 900 ? "none" : "block" }}></div>
            <div className="login-2" style={{display: screen < 900 ? "none" : "block" }}></div>
            <div className="login-2" style={{display: "flex", flexDirection: "column", alignItems:"center", width: "100%"}}>
                <div className="login-right" style={{backgroundColor: "#ebeded", width: "90%", border: "2px solid #a7a6a6", borderRadius: "4px"}}>
                <form onSubmit={handleSubmitFormLogin}>
                    <h4 style={{textAlign: "center"}}>ConnectSocial</h4>
                    <div style={{padding: screen < 400 ? "5px" : "15px 75px",boxSizing: "border-box"}}>
                    <label className="login-form-label">Email:</label>
                    <input onChange={e => onChangeEmail(e)}  className="login-input" type="email"/>
                    <label className="login-form-label">Mật khẩu:</label>
                    <input onChange={e => onChangePassword(e)}  className="login-input" type="password"/>
                    <button type="submit" className="login-form-button">Đăng nhập</button>
                    <p style={{color: "red", fontSize: "14px"}}>{isError ? messageError : ""}</p>
                    </div>
                </form>
                </div>    
                <div className="login-right" style={{marginTop: "10px",padding: screen < 400 ? "20px" : "15px 90px",boxSizing: "border-box", backgroundColor: "#ebeded", width: "90%", border: "2px solid #a7a6a6", borderRadius: "4px"}}>
                    <p className="login-forgotPassword--1" style={{marginBottom: "4px"}}>Bạn quên mật khẩu vui lòng bấm </p><p onClick={() => navigate("/forgotPassword")} className="login-forgotPassword--2">vào đây</p><br></br>
                    <p className="login-forgotPassword--1">Bạn Chưa có tài khoản? </p><p onClick={() => {navigate("/signup")}} className="login-forgotPassword--2">Đăng ký.</p>
                </div>
            </div>
            <div className="login-1" style={{display: screen < 900 ? "none" : "block" }}></div>
        </div>
        </div>
    )
}

export default Login