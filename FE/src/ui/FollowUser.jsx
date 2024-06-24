
export const FollowUser = ({followers, following, postCount}) => {
    return (
        <>
        <h4 style={{display: "inline-block", marginRight: "20px"}}>Posts: {postCount}</h4>
        <h4 style={{display: "inline-block", marginRight: "20px"}}>Follower: {followers}</h4>
        <h4 style={{display: "inline-block"}}>Following: {following}</h4>
        <br></br>
        </>
    )
}