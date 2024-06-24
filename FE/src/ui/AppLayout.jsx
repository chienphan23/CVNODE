import { Outlet, useLocation } from "react-router-dom"
import "../../css/appLayout.css"
import { Tab } from "./Tab"

const AppLayout = () => {
    const location = useLocation()
    
    return (
        <div className="container" > 
         <div className="row layout-wrap ">
            <div className="layout-navbar d-none d-md-block col-lg-2 col-sm-2 mr-lg-3"  style={{position: "relative"}}>
                <div style={{position: "fixed",width: "12.66667%"}}>
                <div><img src="/icons/Logo.png" alt="logo"/></div>
                <Tab key={"tab-1"} iconImage={"home"} text={"Trang chủ"} active={location.pathname === '/home' ? "Active" : ""}/>
                <Tab key={"tab-2"} iconImage={"search"} text={"Tìm kiếm"} link={"search"} active={location.pathname === '/home/search' ? "Active" : ""}/>
                <Tab key={"tab-3"} iconImage={"add"} text={"Tạo bài viết"} link={"createPost"} active={location.pathname === '/home/createPost' ? "Active" : ""}/>
                <Tab key={"tab-4"} iconImage={"heart"} text={"Thông báo"} link={"notifications"} active={location.pathname === '/home/notifications' ? "Active" : ""}/>
                <Tab key={"tab-5"} iconImage={"user"} text={"Trang cá nhân"} link={"profile"} active={location.pathname === '/home/profile' ? "Active" : ""}/>
                <Tab key={"tab-6"} iconImage={"setting"} text={"Cài đặt"} link={"setting"} active={location.pathname === '/home/setting' ? "Active" : ""}/>
                <Tab key={"tab-7"} iconImage={"chatBox"} text={"Tin nhắn"} link={"chatBox"} active={location.pathname === '/home/chatBox' ? "Active" : ""}/>
                <Tab key={"tab-8"} iconImage={"logout"} text={"Đăng xuất"} link={"logout"} />
                </div>
            </div>
            <div className="layout-post col-12 col-lg-10 col-sm-10 " >
            <main >
                <Outlet/>
            </main>
            </div>
            {/* <div className="layout-right" style={{display: `${location.pathname === '/home/profile' ? "none" :"block"}`}}>qc</div> */}
        </div>
        </div>
    )
}
export default AppLayout