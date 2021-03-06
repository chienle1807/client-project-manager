import React from 'react'
import styled from 'styled-components'
import { Divider,Row,Col, } from 'antd'
import apiProfile from './Api/apiProfile'
import {useEffect,useState,useContext} from "react"
import { AuthContext } from '../../Auth/AuthContext'
import { Role,Sex } from '../../components/custom/Customize'
import { ChangeInputValue } from '../../components/Modal/Profile'
import ChangePassword from "../auth/ChangePassword"
import { Link, useNavigate } from "react-router-dom"
const Header = styled.div`
display: flex;
justify-content:center;
align-items:center;
background-color:#FAFBFC;

`
const Body = styled.div`
width: 100%;
`

const Profile = () => {
  const {authState} = useContext(AuthContext)
  const [dataInfo,setDataInfo] = useState({})
  const [visible,setvisible] = useState(false)
  const [displaychangePW,setDisplayChangePW] = useState(false)
  const [editValue,setEditValue] = useState({})
  const [title,setTitle] = useState("")
  useEffect(() => {
   const getProfile = async () => {
      try{
        apiProfile.getProfile({email:authState.email}).then((res) => {
          setDataInfo(res)
        })
      }
        catch(err){
          console.log(err)
      }
    }
    getProfile()
  },[])
  const {name,email,phone,sex,detailaddress,productivity,role,isActive} = dataInfo
  return (
    <div>

      <Header>
        <div style={{display: 'flex',alignItems: 'center',padding:20}}>
          <img style={{width:50,height:50,objectFit:"cover",marginBottom:10,borderRadius:"50%"}} src="https://www.imgacademy.com/sites/default/files/styles/scale_1700w/public/2020-04/OG-boarding-school.jpg?itok=vCBnXXAJ" />
          <div style={{paddingLeft:"20px"}}>
            <h3 style={{fontWeight:"bold"}}>{Role(role)}</h3>
            <p>{name}</p>
          </div>
        </div>
      </Header>
      <Body style={{padding:"10px 20px"}}>
        {ChangePassword(displaychangePW,setDisplayChangePW)}
        {ChangeInputValue(visible,setvisible,dataInfo,setDataInfo,editValue,setEditValue,title)}
        <div>
            <h2 style={{fontWeight:"bold"}}>Ch???nh s???a th??ng tin c?? nh??n</h2>
            <div style={{width:"100%",height:"1px",background:"black",marginBottom:19}}></div>
        </div>
       <div style={{display:"flex"}}>
         <div className="title">T??n</div>
         <div style={{width:"700px"}}>{name}</div>
         <div class="edit" onClick={()=>{setvisible(true)
          setTitle("name")
          setEditValue(dataInfo)
        }} >Ch???nh s???a</div>

       </div>
       <Divider/>
       <div style={{display:"flex"}}>
         <div className="title">Email</div>
         <div style={{width:"700px"}}>{email}</div>
         <div class="edit"
         onClick={()=>{
           setvisible(true)
          setTitle("email")
          setEditValue(dataInfo)
        }}
         >Ch???nh s???a</div>

       </div>
       <Divider/>
       <div style={{display:"flex"}}>
         <div className="title">SDT</div>
         <div style={{width:"700px"}}>{phone}</div>
         <div class="edit" 
           onClick={()=>{
           setvisible(true)
           setTitle("phone")
           setEditValue(dataInfo)
         }}
         >Ch???nh s???a</div>
       </div>
       <Divider/>
       <div style={{display:"flex"}}>
         <div className="title">N??ng su???t l??m vi???c</div>
         <div style={{width:"700px"}}>{productivity}</div>
       </div>
       <Divider/>
       <div style={{display:"flex"}}>
         <div className="title">Gi???i t??nh</div>
         <div style={{width:"700px"}}>{Sex(sex)}</div>
         <div class="edit" 
          onClick={()=>{
            setvisible(true)
            setTitle("sex")
            setEditValue(dataInfo)
          }}
         >Ch???nh s???a</div>
       </div>
       <Divider/>
       <div style={{display:"flex"}}>
         <div className="title">M???t kh???u</div>
         <div style={{width:"700px"}}>*******</div>
         <div class="edit"
         onClick={()=>{
          setDisplayChangePW(true)
        }}
         >?????i m???t kh???u</div>

       </div>
       <Divider/>
       <div style={{display:"flex"}}>
         <div className="title">Qu?? Qu??n</div>
         <div style={{width:"700px"}}>{detailaddress}</div>
         <div class="edit"
           onClick={()=>{
            setvisible(true)
            setTitle("detailaddress")
            setEditValue(dataInfo)
          }}
         >Ch???nh s???a</div>
       </div>
       <Divider/>
       <div style={{display:"flex"}}>
         <div className="title">Ch???c v???</div>
         <div style={{width:"700px"}}>{Role(role)}</div>
       </div>
       <Divider/>
      </Body>
    </div>
  )
}

export default Profile