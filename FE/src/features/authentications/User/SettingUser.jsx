import { FormChangeUser } from "./FormChangeUser"
import { useGetUser } from "../../Profile/useGetUser"

export const SettingUser = () => {
    const {userCurrent: account} = useGetUser()
    
    if(!account || !account.name) return <h1>Loading</h1>

    return (
        <>
            <div style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                <FormChangeUser account={account}/>
            </div>
        </>
    )
}