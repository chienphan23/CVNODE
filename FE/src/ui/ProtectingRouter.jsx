import Cookies from "js-cookie"
import { useEffect } from "react"
// import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { handleExpireAccessToken } from "../features/authentications/Login/apiLogin"
// import { handleExpireAccessToken } from "../features/authentications/Login/apiLogin"

const ProtectingRouter = ({children}) => {
    const navigate = useNavigate()
    // const userID = useSelector(state => state.user.userID)
    useEffect(() => async () => {
        // const refreshToken = Cookies.get("refresh_token")
        // const accessToken = Cookies.get("access_token")
        // if(!accessToken){
        //     handleExpireAccessToken()
        // }
        // if(!accessToken && !refreshToken){
        //     navigate("/login")
        // }
        // if(!refreshToken){
        //     navigate("/login")
        // }
        
        // // const resetAccessToken = await handleExpireAccessToken()
        // console.log("this is protec")
    })
    
    return children

}
export default ProtectingRouter