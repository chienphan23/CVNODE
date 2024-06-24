import { useEffect, useRef, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { apiDetailUserOfPost } from "../features/authentications/User/apiGetUser";
import { useGetUser } from "../features/Profile/useGetUser";
import { createImagesMessage, createMessage, getMessage } from "../features/Profile/apiCreateMessage";
import { useGetMessage } from "../features/Profile/useGetMessage";
import { useGetDetailUser } from "../features/Profile/useGetDetailUser";
import { ImformationChatBox } from "../ui/imformationChatBox";
import { BoxMessage } from "../ui/BoxMessage";
import { AddImagesMessage } from "../ui/AddImagesMessage";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getOneConversation } from "../features/Profile/apiGetAllConversation";

const host = "http://localhost:3000";
export const ChatBox = () => {
  const {idChat} = useParams()  // id to
    const {userCurrent: from} = useGetUser()  // id from, get user from
    const {userDetail: userChat} = useGetDetailUser(idChat) // get user to
    
    const [searchParams, setSearchParams] = useSearchParams() // lấy ra id conversation nếu có 
    // const {data: messageOld, isLoading, refetch} = useGetMessage(searchParams.get('idConversation'))  // get tin nhắn cũ
  //   const {data: messageOld, hasNextPage, fetchNextPage, isLoading} = useInfiniteQuery({
  //     queryKey: ['messagesInfinite'],
  //     queryFn: ({pageParam = 1}) => getMessage(searchParams.get('idConversation'), pageParam),
  //     getNextPageParam: (lastPage, allPages) =>  {
  //         if(lastPage.data.length === 0){
  //             return undefined
  //         }
  //         const nextPage = allPages.length *2
  //         return nextPage
  //     }
  // })



    const [id, setId] = useState(); // cần id này để xem ai gửi trong real-time
    
    const socketRef = useRef()// dùng để giữ real-time
    const [messAll, setMessAll] = useState([]);
    const [message, setMessage] = useState("");
    const [imagesMsg, setImagesMsg] = useState([]);
    
    const handleEnter = async (e) => {
        // chặn xuống dòng trong textarea
      if(e.key === 'Enter'){  // gửi tinh nhắn
        e.preventDefault()
        if(message !== null && message.trim().length !== 0) {
          console.log(message)
          const msg = {
            content: message,
            id:id
          }
          socketRef.current.emit('message', { room: searchParams.get('idConversation'), msg });
          setMessage("")
          await saveMessage()
        }
      }
      if(imagesMsg.length !== 0 && e.key === 'Enter'){ // gửi ảnh
        const formData = new FormData();
        formData.append("from", from.id)
        formData.append("to", userChat.id)
        formData.append("conversation", searchParams.get('idConversation'))
        for (let i = 0; i < imagesMsg.length; i++) {
          formData.append(`imagesMess`, imagesMsg[i]);
        }
        const msg = {
          images: imagesMsg,
          id:id
        }
        socketRef.current.emit('message', { room: searchParams.get('idConversation'), msg });
        
        await createImagesMessage(formData)
      }
    }

    const saveMessage = async () => {
      if(message && userChat){
        await createMessage(message, from.id, userChat.id, searchParams.get('idConversation'))
      }
    }
    
    

    const handleImageChange = (e) => {
      // const newArray = imagesMsg.concat(...e.target.files);
        setImagesMsg(i => i.concat(...e.target.files))
    }


    useEffect(() => {
      // refetch()// gọi tin nhắn cũ lần đầu tiên
      const fetchConversation = async () => {
        return await getOneConversation(from._id, userChat._id)
      }
      if((Object.keys(from).length !== 0 && Object.keys(userChat).length !== 0 && searchParams.get('idConversation') === "undefined") || (Object.keys(from).length !== 0 && Object.keys(userChat).length !== 0 && searchParams.get('idConversation') === null)){
        fetchConversation().then(rs => setSearchParams({idConversation: rs._id}))
      }

      if(idChat && userChat){ // nếu có ng chat thì mới tạo ra socket

        socketRef.current = socketIOClient.connect(host)  // giữ lại sau các lần render

        socketRef.current.on('getId', data => {
          setId(data)
        })

        // tạo phòng
        socketRef.current.emit('joinRoom', {nameRoom: searchParams.get('idConversation')});
        socketRef.current.on('sendDataServerRoom', dataGot => {
          console.log(dataGot)
          setMessAll(oldMsgs => [...oldMsgs, dataGot.data])
        }) // mỗi khi có tin nhắn thì mess sẽ được render thêm 
      
          return () => {
            socketRef.current.disconnect();
          };
       }   
    }, [idChat, from, userChat, searchParams, setSearchParams])


    if(searchParams.get('idConversation') === "undefined" || searchParams.get('idConversation') === null) return <h1>Loading</h1>

    return (
      <div style={{width: "60%", height: "100vh", boxSizing: "border-box"}}>
        {idChat ? 
        <ImformationChatBox avatar={userChat.avatar} name={userChat.name}/>
        : "Vui lòng chọn liên hệ"
        }
        <div style={{width: "100%", height: "80%"}}>
            <BoxMessage messAll={messAll}  id={id} from={from}/>

            <AddImagesMessage imagesMsg={imagesMsg}/>

            <div className="send-box" style={{height: "20%"}}>
            <label htmlFor="inputFile" style={{cursor: "pointer",fontSize: "20px",fontWeight: "700"}}><p style={{display: "inline-block", margin: "0", fontSize: "18px", backgroundColor: "rgb(161, 158, 158)", borderRadius: "50%", padding: "6px"}}>📷</p></label>
            <input type="file" id="inputFile" onChange={e => handleImageChange(e)} accept="image/*" multiple encType="multipart/form-data" style={{display: "none"}}/>
            <textarea 
                value={message}  
                onChange={(e) => {setMessage(e.target.value)}} 
                placeholder="Nhập tin nhắn ..." 
                onKeyDown={(e) => handleEnter(e)}
                style={{width: "90%", float: "right"}}
            />

                <button onClick={() => {
                }}>
                    Send
                </button>

                </div>
            </div>
        </div>
    )
}