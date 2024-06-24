import { useEffect, useState } from "react";
import { useGetUser } from "../features/Profile/useGetUser";
import { apigetCheckNotifications } from "../features/Notifications/apiGetCheckNotifications";
import { useCountNotifications } from "../features/Notifications/useGetCountNotifications";
import { useLocation } from "react-router-dom";

export const CountNotifications = () => {
    const location = useLocation()
    const {userCurrent, isLoading} = useGetUser()
    const [countNotifications, setCountNotifications] = useState(0)
    
    useEffect(() => {
        
        if(userCurrent && userCurrent._id){
            getCount(userCurrent._id)
        }
        
    }, [location.pathname, isLoading, userCurrent])

    const getCount = async (id) => {
        let count1 = await apigetCheckNotifications(id)
        setCountNotifications(count1.countNotifi)
    }

    if(isLoading || countNotifications === 0){
        return(
            <></>
        )
    }

   return (
    <div style={{position: "absolute", right: "0", top: "0",fontSize: "12px", backgroundColor: "red",color: "white",borderRadius:"50%",boxSizing:"border-box",padding:"4px"}}>
        
        {countNotifications}    
    </div>
   )
}