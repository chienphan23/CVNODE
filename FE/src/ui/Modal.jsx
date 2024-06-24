export const Modal = ({changeToggle, children}) => {
    function handleClose(e) {
        if(e.target.className === "modal"){
            changeToggle(false)
        }
    }
    return (
        <>
        <div id="modal"  style={{position: "fixed",top:0,right:0,left:0,bottom:0,background:"rgba(164, 164, 164, 0.4)",zIndex:2,display:"flex",justifyContent:"center",alignItems:"center"}} onClick={(e) => handleClose(e)}>
        <div className="modal" style={{zIndex:5,width:"100%",height:"100vh",display: "flex",justifyContent:"center",alignItems:"center"}} >{children}</div>
        </div>
        </>
    )
}