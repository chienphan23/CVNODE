import { useState } from "react"

export const ImagePost = ({images, idPost}) => {
    const [indexShow, setIndexShow] = useState(0)
    const handleClickLeft = () => {
        setIndexShow(i => i-1)
    }
    const handleClickRight = () => {
        setIndexShow(i => i+1)
    }  
    return (
        <>
            {images.map((image, index) => {
                
                if(index === indexShow){
                    return(
                        <>
                        <div style={{position: "relative"}} key={idPost}>
                            <div style={{position: "absolute", right: "10px", top: "10px"}}>{images.length > 1 ? `${index + 1} /${images.length}` : ""}</div>
                            <img src={`http://localhost:3000/imgPost/${image}`} alt="1" key={index} width={"100%"} height={"100%"} style={{borderRadius: "6px", boxShadow: "6px 6px 4px #c5c3c3", border: "0.5px solid #c5c3c3", marginBottom: "10px"}}/>
                            {images.length > 1 ? 
                            <>
                            {index === 0 ? "" :
                            <div style={{position: "absolute", top: "50%", left: "10px", backgroundColor: "rgb(238, 235, 235,0.8)", borderRadius: "50%", cursor: "pointer"}}><img src="/imagesApp/arrowLeft.png" alt="left" onClick={handleClickLeft}/></div>
                            }
                            {index === images.length -1 ? "" :
                            <div style={{position: "absolute", top: "50%", right: "10px", backgroundColor: "rgb(238, 235, 235,0.8)", borderRadius: "50%", cursor: "pointer"}}><img src="/imagesApp/arrowRight.png" alt="right" onClick={handleClickRight}/></div>
                            }
                            </>
                        : ""}
                        </div>
                    </>
                    )              
                }
                return <></>
                })}
        </>
    )
}