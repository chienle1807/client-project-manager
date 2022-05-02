import React, { useEffect, useState } from "react";
import logo from "../assets/logo/webscript.png";
import user from "../assets/user.jpg";
import {menuItems} from "../Routes/index"
import {Role} from '../components/custom/Customize'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import MenuItem from "./MenuItem";
import { useContext } from 'react'
import { AuthContext } from '../Auth/AuthContext'

import { NavLink, Outlet, useLocation } from "react-router-dom";
const SideMenu = (props) => {
  const [inactive, setInactive] = useState(false);
  const {authState} = useContext(AuthContext)
  
  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

  
  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

 
  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) =>
        el.classList.remove("active"));
        el.classList.toggle("active")
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, [authState]);
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="webscript" />
        </div>
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (

            <div
              style={{ display: 'flex' }}>
              <MenuUnfoldOutlined />
              {
                    menuItems.map(({to, name,subMenus}, i) => (
                        (((to === location.pathname) ||  (subMenus?subMenus[0].to===location.pathname:false)) && 
                        <h5 
                        style={{ position: 'absolute', width: '400px', marginLeft: 40,color:'white',top:-4}}>
                          {name} 
                        </h5>) 
                    ))
                }
            </div>
          ) : (
            <div
            style={{ display: 'flex' }}>
           <MenuFoldOutlined />
            {
                  menuItems.map(({to, name,subMenus}, i) => (
                     ( (to === location.pathname ) || (subMenus?subMenus[0].to===location.pathname:false) )&& 
                      <h5 style=
                      {{ position: 'absolute', width: '400px', marginLeft: 50,color:'white',top:-4}}>
                        {name}
                        </h5>
                  ))
              }
          </div>
          )}
        </div>
      </div>

      <div className="divider"></div>

      <div className="main-menu">
        <ul>
        {menuItems.map((menuItem, index) =>{
              console.log(authState.role)
              if(menuItem.role.includes(Number(authState.role))){
                return  <MenuItem 
                key={index}
                name={menuItem.name}
                exact={menuItem.exact}
                to={menuItem.to}
                subMenus={menuItem.subMenus || []}
                icon={menuItem.icon}
                onClick={(e) => {
                  if (inactive) {
                    setInactive(false);
                  }
                }}
              />
              }
            } )}
        </ul>
      </div>

      <div className="side-menu-footer">
        <NavLink to="/client-project-managerna/profile">
          <div className="avatar">
            <img src={user} alt="user" />
          </div>
          <div className="user-info">
            <h5>{authState.email}</h5>
            <p>{Role(authState.role)}</p>
          </div>
        </NavLink>
      </div>
    </div>
    <Outlet/>
    </>
  );
};

export default SideMenu;
