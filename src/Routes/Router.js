import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar"
import SignUp from "../Page/auth/SignUp"
import SignIn from "../Page/auth/SignIn"
import SideMenu from "../components/SideMenu";
import { menuItems } from "./index"
import { useState } from "react";
import { InfoEmployee } from '../Page';
import { InfoProject } from '../Page';
import ProtectedRoutes from "./PrivateRouter"
import { AuthContext } from "../Auth/AuthContext";
import { useContext } from "react";
import Home from "../Page/home/Home"
import EmployeeProject from '../Page/project/EmployeeProject';
import {CreateEmployee,CreateProject} from '../Page'
const Router = () => {
    const { setAuthState, authState } = useContext(AuthContext);
    const [inactive, setInactive] = useState(false);
    console.log(authState)
    return (
        <div className="/client-project-managerrouter">
            {authState.status && <>
                <SideMenu
                    onCollapse={(inactive) => {
                        setInactive(inactive);
                    }}
                />
                <Navbar />
            </>}
            <div className={`container ${inactive ? "inactive" : ""}`}>
                <Routes>
                    <Route element={<ProtectedRoutes />}>
                        <Route >
                            {menuItems.map((menu, index) => (
                                <>
                                <Route key={menu.name} key={index} path={menu.to} element={menu.component}></Route>
                                    {menu.subMenus && menu.subMenus.length > 0
                                        ? menu.subMenus.map((subMenu, index) => (
                                            <Route key={subMenu.name} key={index} path={subMenu.to} element={subMenu.component}>
                                            </Route>
                                        ))
                                        : null}
                                </>
                            )
                            )}
                            <Route path="/client-project-manager/auth" element={<SignUp />}></Route>
                            <Route path="/client-project-manager/infoEmployee/:id" element={<InfoEmployee />}></Route>
                            <Route path="/client-project-manager/changepassworld" />
                            <Route path="/client-project-manager/infoProject/:id" element={<InfoProject />}></Route>
                            <Route path="/client-project-manager/EmployeeProject/:id" element={<EmployeeProject />}></Route>
                            <Route path="/client-project-manager/insert/employee" element={<CreateEmployee/>} />
                            <Route path="/client-project-manager/insert/project" element={<CreateProject/>} />
                        </Route>
                        <Route path="/client-project-manager/" element={<h1>Xin ch??o <span style={{color: 'blue'}}>{authState.email}</span></h1>}></Route>
                    </Route>
                </Routes>
            </div>
        </div>
    )
}
export default Router