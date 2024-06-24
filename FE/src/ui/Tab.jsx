import { Link } from "react-router-dom"
import { CountNotifications } from "./CountNotifications";
import  "../../css/tab.css";

export const Tab = ({iconImage, text, link, active}) => {
    

    if(link && link === "logout") {
        return(
            <Link to={`/logout`} style={{cursor: "pointer",textDecoration: "none", color: "#333"}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center",height: "11.111vh", backgroundColor: "white", borderBottom: "1px solid rgb(204,204,204)", borderRight: "1px solid rgb(204,204,204)", borderRadius: "8px",boxSizing: "border-box",padding: "0 5px"}}>
                        <div style={{flex: "1", textAlign: "center"}}>
                        <img src= {`/icons/${iconImage}.png`} alt="icon" style={{width: "30px",height: "30px", boxSizing: "border-box", padding: "5px"}}/>
                        </div>
                        <p className="d-none d-lg-block" style={{margin: "0", fontSize: "18px", lineHeight: "30px", flex:"3"}}>{text}</p>
                    </div>
            </Link>
        )
   }

   

   if(link && link === "notifications"){
    return(
        
        <Link to={link ? `/home/${link}` : '/home'} style={{cursor: "pointer",textDecoration: "none", color: "#333"}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center",height: "11.111vh", backgroundColor: "white", borderBottom: "1px solid rgb(204,204,204)", borderRight: "1px solid rgb(204,204,204)", borderRadius: "8px",boxSizing: "border-box",padding: "0 5px"}}>
                <div style={{flex: "1", textAlign: "center"}}>
                <img src= {`/icons/${iconImage}${active}.png`} alt="icon" style={{width: "30px",height: "30px", boxSizing: "border-box", padding: "5px"}}/>
                </div>
                <p className="d-none d-lg-block" style={{margin: "0", fontSize: "18px", lineHeight: "30px", flex:"3"}}>
                    {text}
                </p>
                    <CountNotifications link={link}/>
            </div>
        </Link>
        
    )
   }

    return(
        
        <Link className="link-wrap hover-link" to={link ? `/home/${link}` : '/home'}  >
            <div className={`link-wrap-div ${active? "active" : ""}`}>
                <div  style={{flex: "1", textAlign: "center"}}>
                <img src= {`/icons/${iconImage}${active}.png`} alt="icon" className={`link-wrap-div-img ${active? "active" : ""}`}/>
                </div>
                
                <p className="d-none d-lg-block" style={{margin: "0", fontSize: "18px", lineHeight: "30px", flex:"3"}}>{text}</p>
            </div>
        </Link>
        
    )
}
