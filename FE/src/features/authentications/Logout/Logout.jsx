import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { apiLogout } from "./apiLogout"

export const Logout = () => {
    const navigate = useNavigate()
    useEffect(() => {
       
        const logout = async () => {
            return await apiLogout()
        }
        logout()
        navigate("/login")
    }
    , [navigate])
    return (
        <>
        </>
    )
}