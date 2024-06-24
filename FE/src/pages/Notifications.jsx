import { useEffect, useRef, useState } from "react";
import { useGetUser } from "../features/Profile/useGetUser"
import socketIOClient from "socket.io-client";
import { useGetNotifications } from "../features/Notifications/useGetNotifications";
import { apiUpdateCheckedNotifications } from "../features/Notifications/apiUpdateCheckedNotification";

const host = "http://localhost:3000";

export const Notifications = () => {

    const {data, isLoading, refetch} = useGetNotifications();

    const socketRef = useRef()// dùng để giữ real-time
    const {userCurrent, isLoading: isLoading1} = useGetUser() // lấy user
    const [ notificationsAll ,setNotificationsAll] = useState([])

    useEffect(() => {
        if(userCurrent._id !== undefined){
            socketRef.current = socketIOClient.connect(host)
            socketRef.current.emit('setIdUser', {idUser: userCurrent._id})
            
            socketRef.current.on('RefecthDataFromServer', dataGot => { // nhận tạo thông báo (refetch) từ server
                console.log("alo alo")
                refetch()
                refetch()
                setNotificationsAll((oldNotifi) => [...oldNotifi,dataGot.data])
            }) // Mỗi khi có thông báo => query lại danh sách
            
            return () => {
                socketRef.current.disconnect();
                apiUpdateCheckedNotifications(userCurrent._id)
            }
        }
    }, [refetch, userCurrent])

    if(isLoading || isLoading1) return <div>Loading</div>
    return(
        <>
        <div>
            Trang thông báo
        </div>
        <button onClick={() => socketRef.current.emit('sendMessageToUser', {recipient: "6589438dea6a3db6eb2c15dc", message: "chào bạn"})} >Nhấn</button>
        <div>
            {notificationsAll.map(no => 
            <div>
                {no}
            </div>
                )}

            {data.data.map((item, index) => 
                <div key={index}>
                    {item.content} {index}
                </div>
            )}
        </div>
        </>
    )
}