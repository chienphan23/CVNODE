import { FollowUser } from "./FollowUser"

export const UserImformation = ({userDetail}) => {
    return (
        <div style={{display: "flex", backgroundColor:"white", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#FFF"}}>
            <div style={{display: "flex", justifyContent: "center", width: "30%"}}><img src={`http://localhost:3000/imgPost/${userDetail.avatar}`} alt="avatar" width={"150px"} height={"150px"} style={{borderRadius: "50%", display: "block"}}/></div>
            <div style={{width: "70%"}}>
            <div>
            <h3 style={{display: "block"}}>{userDetail.name}</h3>
            <h4 style={{display: "block"}}>{userDetail.bio}123</h4>
            </div>
            <FollowUser followers={userDetail.followers.length} following={userDetail.following.length} postCount={userDetail.posts.length}/>
            </div>
        </div>
    )
}