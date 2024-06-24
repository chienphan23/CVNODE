import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getMessage } from "../features/Profile/apiCreateMessage";

export const BoxMessage = ({ messAll, id, from}) => {
      const [searchParams, setSearchParams] = useSearchParams()
      const {data: messageOld, hasNextPage, fetchNextPage, isLoading} = useInfiniteQuery({
      queryKey: ['messagesInfinite'],
      queryFn: ({pageParam = 1}) => getMessage(searchParams.get('idConversation'), pageParam),
      getNextPageParam: (lastPage, allPages) =>  {
          if(lastPage.length === 0){
              return undefined
          }
          const nextPage = allPages.length *10
          return nextPage
      }
  })

  useEffect(() => {
    if(messageOld && messageOld.pages.length === 1){
        scrollChatToBottom()
    }

    let div = document.getElementById('chat-box')
    if(div !== null){

      let fetching = false
      const onScroll = async () => {
        if(!fetching && div.scrollTop === 0){
          fetching = true
          if(hasNextPage){
            await fetchNextPage();
          }else{
            console.log("hết tin nhắn")
          }
          
        }
      }
      div.addEventListener("scroll", onScroll)
      
      return () => {
        div.removeEventListener("scroll", onScroll)
      }
    }
  }, [fetchNextPage, hasNextPage, messageOld])

    if(isLoading) return <div>Loading</div>

    // const reverseArr = messageOld.pages[0].slice().reverse() // đảo ngược để tin nhắn đúng thứ tự
    let renderMessOld = messageOld &&
    messageOld.pages.slice().reverse().map((item, indexFirst) => 
      item.slice().reverse().map((m, index) => 
        <div key={indexFirst+ "a" + index}
          style={{backgroundColor: m.from === from.id ? "blue" : "white",textAlign: m.from === from.id ? "right": "left" , width: "100%",boxSizing: "border-box",padding:"10px"}}
        >
          {m.messageText}
          {m.images.length > 0 && m.images.map((image, index) => 
            <img key={image+index} src={`http://localhost:3000/imgMessage/${image}`} width={"200px"} height={"200px"} alt="avartar" style={{display: "inline-block",borderRadius: "8px"}} />
          )}
        </div>
      )
    ) 

     const renderMess =  messAll.map((m, index) => 
     <div 
         key={index} 
         style={{textAlign: m.id === id ? "right": "left" , width: "100%",boxSizing: "border-box",padding:"10px"}}
     >
       {m.content}
       {m.images && m.images.length > 0 ? m.images.map((image, index) => { // trả về là 1 loại arraybuffer => cần chuyển sang blob
          const blob = new Blob([image], { type: 'image/jpeg' });
          return(
            <img src={URL.createObjectURL(blob)} key={index} width={"200px"} height={"200px"} alt="avartar" style={{display: "inline-block",borderRadius: "8px"}} />)}
          )
        : null }
     </div>
    )
    function scrollChatToBottom() {
      var chatBox = document.getElementById('chat-box');
      chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    return(
        <div id="chat-box" style={{height: "80%", width: "100%",overflowY: "scroll"}}>
            {renderMessOld}
            {renderMess}
        </div>
    )
}