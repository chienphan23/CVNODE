import {  useState } from "react"
import { apiChangeUser } from "./apiGetUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast, { Toaster } from "react-hot-toast"


export const FormChangeUser = ({account}) => {
    const queryClient = useQueryClient()
    const [imageState, setImageState] = useState(account.avatar)
    const [nameState, setNameState] = useState(account.name)
    const [bioState, setBioState] = useState(account.bio)
    const [genderState, setGender] = useState(account.gender)
    const [formState , setFormState] = useState({})
    ///////////////////////////////
    const mutationUpdateUser = useMutation({
        mutationFn: () =>  apiChangeUser(account.id,formState),
        onMutate: () => {
            queryClient.invalidateQueries("userCurrent")
            toast.success("Sửa thông tin thành công")
        } 
    })

    const handleChangeImage = (e) => {
        setImageState(...e.target.files)
    }
    const handleOnchageName = (e) => {
        setNameState(e.target.value)
    }
    const handleChangeBio = (e) => {
        setBioState(e.target.value)
    }
    const handleSubmitForm = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', nameState)
        formData.append('bio', bioState)
        formData.append('avatar', imageState)
        formData.append('gender', genderState)
        setFormState(formData)
        mutationUpdateUser.mutate()
    }
    const handleChangeGender = async (e) => {
        setGender(e.target.value)
    }

    return(
        <>
        <Toaster/>
        <div style={{width: "20%"}}></div>

            <div style={{backgroundColor: "white", flexGrow: "1", backgroundColor: "white", boxSizing: "border-box", padding: "30px", border: "0.2px solid #cecece", borderRadius: "8px",boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)"}}>
                <h2 style={{display: "block", padding: "5px 0 10px 15px", margin: 0}}>Cài đặt</h2>
            <div style={{display: "flex"}}>

            <div style={{width: "60%"}}>
                <form onSubmit={(e) => handleSubmitForm(e)} >
                <div>
                    {typeof imageState === 'object' ? 

                    
                        <img src={URL.createObjectURL(imageState)} alt="avatar" width={"120px"} height={"120px"}  style={{borderRadius: "50%"}}/>
                    
                     :
                    <img src={`http://localhost:3000/imgPost/${imageState}`} width={"120px"} height={"120px"} alt="avatar" style={{borderRadius: "50%"}}/>
                    }
                    <div>
                    <label htmlFor="changeImage" style={{backgroundColor: "#1877f2", color: "white", boxSizing: "border-box", padding: "8px 10px", display: "inline-block", borderRadius: "6px", fontWeight: "600", margin: "5px 0"}}>Sửa ảnh</label>
                    <input type="file" id="changeImage" style={{display: "none"}} accept="image/*" onChange={(e) => handleChangeImage(e)}/>
                    </div>
                </div>
                <div>
                    <p style={{fontSize: "18px", fontWeight: "bold"}}>Tên</p>
                    <input value={nameState} onChange={(e) => handleOnchageName(e)} type="text" style={{display: "block", width: "100%",height: "60px", fontSize: "18px", boxSizing: "border-box", padding:"5px 10px", borderRadius: "8px"}}/> 
                </div>
                <div>
                    <p style={{fontSize: "18px", fontWeight: "bold"}}>Tiểu sử</p>
                    <input value={bioState} onChange={(e) => handleChangeBio(e)} style={{display: "block", width: "100%",height: "60px", fontSize: "18px", boxSizing: "border-box", padding:"5px 10px", borderRadius: "8px"}}/> 
                </div>
                <div>
                    <p style={{fontSize: "18px", fontWeight: "bold", display: "inline-block",marginRight: "15px"}}>Gender:</p>
                    <select style={{fontSize: "16px", width: "20%", boxSizing: "border-box", padding: "5px"}} value={genderState} onChange={(e) => handleChangeGender(e)}>
                        <option value={true}>Nam</option>
                        <option value={false}>Nữ</option>
                    </select>
                </div>

                <button type="submit" style={{backgroundColor: "#1877f2", color: "white", boxSizing: "border-box", padding: "8px 10px", display: "inline-block", borderRadius: "6px", fontWeight: "600", margin: "5px 0", border: "none"}}>Sửa thông tin</button>
                </form>
            </div>

            </div>
            </div>
            <div style={{width: "20%"}}></div>
        </>
    )
}