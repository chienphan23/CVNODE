import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './features/authentications/Login/Login'
import SignUp from './features/authentications/Signup/SignUp'
import ForgotPassword from './features/authentications/ForgotPassword/ForgotPassword'
import ResetPassword from './features/authentications/ForgotPassword/ResetPassword'
import Home from './pages/Home'
import ProtectingRouter from './ui/ProtectingRouter'
import AppLayout from './ui/AppLayout'
import { DetailUser } from './pages/DetailUser'
import { CreatePost } from './pages/CreatePost'
import { Profile } from './features/Profile/Profile'
import { SettingUser } from './features/authentications/User/SettingUser'
import { Logout } from './features/authentications/Logout/Logout'
import { PageError } from './ui/PageError'
import { ChatBox } from './pages/ChatBox'
import { ChatBoxIndex } from './pages/ChatBoxIndex'
import { SearchSection } from './ui/SearchSection'
import { Notifications } from './pages/Notifications'



function App() {

  const queryClient = new QueryClient()

  return (
    
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}/>
      <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="home"  />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/forgotPassword' element={<ForgotPassword/>}></Route>
        <Route path='/resetPassword/:tokenReset' element={<ResetPassword/>}></Route>
        <Route element={<ProtectingRouter><AppLayout/></ProtectingRouter>}>
          <Route path='/home' element={<Home/>}/>
          <Route path='/home/:id' element={<DetailUser/>} />
          <Route path='/home/createPost' element={<CreatePost/>}/>
          <Route path='/home/profile' element={<Profile/>} />
          <Route path='/home/setting' element={<SettingUser/>}/>
          <Route path='/home/chatBox' element={<ChatBoxIndex/>}/>
          <Route path='/home/search' element={<SearchSection/>}/>
          <Route path='/home/chatBox/:idChat' element={<ChatBox/>}/>
          <Route path='/home/notifications' element={<Notifications/>}/>
        </Route>
        <Route path='/pageError' element={<PageError/>}></Route>
      </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
