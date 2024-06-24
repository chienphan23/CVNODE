import { useState } from "react"
import { apiChangeUser } from "../features/authentications/User/apiGetUser"

export const ModalImformationUser = ({account, changeToggle}) => {
    const [imageState, setImageState] = useState(account.avatar)

    const handleChangeImage = (e) => {
        setImageState(...e.target.files)
        
    }
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        console.log(imageState)
        const formData = new FormData()
        formData.append('avatar', imageState)
        await apiChangeUser(account.id,formData)
    }
    return (
        <>
            <div style={{backgroundColor: "white"}}>
                Thông tin
            <div onClick={() => changeToggle(false)} style={{float:"right"}}>X</div>
            <form onSubmit={(e) => handleSubmitForm(e)} >
            <div>
                Avatar: <img src={account.avatar} alt="abc"/>
                <label htmlFor="changeImage">Sua anh</label>
                <input type="file" id="changeImage" style={{display: "none"}} accept="image/*" onChange={(e) => handleChangeImage(e)}/>
            </div>
            <div>Name: {account.name}</div>
            <div>Age: {account.age}</div>
            <div>Gender: {account.gender}</div>
            <button type="submit">Sửa thông tin</button>
            </form>
            </div>
        </>
    )
}