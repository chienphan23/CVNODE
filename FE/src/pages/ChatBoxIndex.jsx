import { useEffect, useState } from "react"
import { useGetConversation } from "../features/Profile/useGetConversation"
import { useGetUser } from "../features/Profile/useGetUser"
import { getAllConversation } from "../features/Profile/apiGetAllConversation"
import { Link } from "react-router-dom"

export const ChatBoxIndex = () => {
    const {userCurrent, isLoading} = useGetUser()
    const [conversations, setConversations] = useState({})

    useEffect(() => {
         const fetchAllConversation = async () => {
           if(userCurrent.id){
            const data = await getAllConversation(userCurrent.id)
           setConversations(data)
           }
        }
        fetchAllConversation()
    }, [userCurrent.id])

    if(isLoading) return <h1>LOADING</h1>

    if(Object.keys(conversations).length === 0) return <h1>LOADING2</h1>

    return (
        <>
       {console.log(conversations)}
        <div>alo</div>
        {conversations.map((conversation) => 
            conversation.users.map(user => 
                        user.id !== userCurrent.id ? 
                        <div key={user.id}>
                            <Link to={`${user.id}?idConversation=${conversation._id}`} style={{display: "flex",alignItems: "center", cursor:"pointer", color: "#1e1d1d",textDecoration: "none"}}>
                                <img src={`http://localhost:3000/imgPost/${user.avatar}`} width={"50px"} height={"50px"} alt="avartar" style={{display: "inline-block",borderRadius: "50%"}} />
                                <div style={{marginLeft: "10px", display: "flex",flexDirection:"column",justifyContent:"space-between"}}>
                                <h5 style={{margin: 0}}>{user.name}</h5>
                                </div>
                            </Link>
                             </div> 
                        : null
            ) 
        )}
        </>
    )
}