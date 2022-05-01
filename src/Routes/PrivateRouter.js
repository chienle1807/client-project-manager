import { useNavigate, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import { useContext } from "react";
import { Spin } from "antd";
import { SignIn } from "../Page";


const ProtectedRoutes = () => {
  let navigate = useNavigate()
  const { setAuthState, authState } = useContext(AuthContext);

  console.log(authState.isActive)
  if(authState.status && authState.isActive){
    return <Outlet/>
  }
  else if(!authState.isActive){
    return <h1>Không thể truy cập.Bạn đamg bị chặn bởi addmin</h1>
  }
  else{
    return <>
  <Routes>
    <Route path="/" element={<SignIn />}></Route>
  </Routes>
  </>
  } 
}


export default ProtectedRoutes;