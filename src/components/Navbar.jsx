import React from 'react'
import styled from "styled-components";
import { Badge } from 'antd';
import 'antd/dist/antd.css';
import { BarsOutlined, LoginOutlined, BellOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import  {useState,useContext} from "react"
import { Button, notification } from 'antd';
import { AuthContext } from "../Auth/AuthContext";
const NavbarContainer = styled.div`
    padding: 0 20px 0 20px;
    background-color: #026AA7;
    border-bottom: 1px solid #E5E9F2;
    display:flex;
    justify-content: space-between;
    color:white;
    height:70px;
    `
const Left = styled.div`
display: flex;
align-items: center;
`
const Icon = styled.div`
cursor:pointer;
`
const MenuTitle = styled.div`
    font-weight: 400;
    margin:0 0 0 20px;
    color:white;
    font-size:16px;
`
const Right = styled.div`
display: flex;
align-items: center;
`
const LogOutContainer = styled.div`
margin-left: 20px;
display: flex;
align-items: center;
cursor: pointer;
`
const LogOutTitle = styled.div`
padding-left: 10px;
font-weight: 400;
color:white;
font-size:15px;
margin:0;
`

const Navbar = () => {
    const [displayNotify,setDisplayNotify] = useState(false)
    const {setAuthState,authState} = useContext(AuthContext)
    const handleLogout = ()=>{
        localStorage.removeItem("accessToken")
        setAuthState({...authState,status:false})
        window.location.href="/"
    }
    return (
       <NavbarContainer >
            <Left>
    
            </Left>
            <Right>
                <Icon>
                    {/* <Badge  size="small" count="5">
                        <BellOutlined onClick={()=>{setDisplayNotify(!displayNotify)}} style={{fontSize: "25px", color:"#fff"}}/>
                        {displayNotify && <h1 style={{position:"absolute"}}>notify</h1>}
                    </Badge> */}
                </Icon>
                <LogOutContainer
                >
                    <Icon>
                        <LoginOutlined style={{fontSize: "20px"}}/>
                    </Icon>
                    <LogOutTitle onClick={handleLogout}>Đăng Xuất</LogOutTitle>
                </LogOutContainer>
            </Right>
       </NavbarContainer>
    )
}

export default Navbar