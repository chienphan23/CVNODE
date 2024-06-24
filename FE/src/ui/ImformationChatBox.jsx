  
export const ImformationChatBox = ({avatar, name}) => {
    return(
        <div style={{display: "flex", alignItems: "center", boxSizing: "border-box", padding: "6px 16px",height: "10%"}}>
        <img src={`http://localhost:3000/imgPost/${avatar}`} alt="avatar" width={"44px"} height={"44px"} style={{borderRadius: "50%", display: "inline-block"}}/>
        <strong style={{display: "inline-block", fontSize: "20px", padding: "0 6px", boxSizing: "border-box"}}>{name}</strong>
        </div>
    )
}