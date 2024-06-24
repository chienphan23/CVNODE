import { format } from "date-fns"
import { useEffect, useState } from "react"

export const CreateAtPost = ({createAt}) => {
    const [dateShow, setDateShow] = useState(0)
    useEffect(() => {
        const currentDate = new Date()
        const dateOfPost = new Date(createAt);
        if(dateOfPost.getFullYear() !== currentDate.getFullYear() || dateOfPost.getMonth() !== currentDate.getMonth()){
            const formatDate = format(dateOfPost, "dd-MM-yyyy")
            setDateShow(formatDate)
            return;
        }
        // console.log("result: "+Math.ceil(result / 1000/ 60/60/24))// ngày
        // console.log("result: "+Math.ceil(result / 1000/ 60/60)) // giây
        if( (dateOfPost.getDate() === currentDate.getDate()) && (dateOfPost.getMonth() === currentDate.getMonth()) && (dateOfPost.getFullYear() === currentDate.getFullYear()) ){
            // cùng 1 ngày
            setDateShow(0)
            return;
        }
        if( (dateOfPost.getDay() !== currentDate.getDate()) && (dateOfPost.getMonth() === currentDate.getMonth()) && (dateOfPost.getFullYear() === currentDate.getFullYear()) ){
            // cùng 1 tháng
            setDateShow(currentDate.getDate() - dateOfPost.getDate())
            return;
        }
    }, [dateShow, createAt])
    return (
        <>
        <h5 style={{margin: "0"}}>{dateShow === 0 ? "Hôm nay" : dateShow < 32 ? `${dateShow} ngày trước` : dateShow} </h5>
        </>
    )
}