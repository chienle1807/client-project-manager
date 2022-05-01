import React from 'react'
import styled from 'styled-components'
import { Divider,Row,Col, } from 'antd'
import { useEffect,useState,useContext } from 'react'
import apiProject from './Api/apiProject'
import {statusProjectItem} from '../../components/custom/Customize'
import BarChart from "../../components/BarChart";
import { useParams,Link } from 'react-router-dom'
import {AuthContext} from '../../Auth/AuthContext'
const Header = styled.div`
display: flex;
justify-content:center;
align-items:center;
background-color:#FAFBFC;

`
const Body = styled.div`

`

const InfoProject = () => {
  const {authState} = useContext(AuthContext)
  const {id}= useParams()
  console.log(id)
  const [data,setData] = useState({})
  const [status,setStatus] = useState(true)
  useEffect(() => {
    const infoproject = async () => {
      try{
        const res =await apiProject.getProjectItem(id)
          setData(res)
      }catch (err) {console.log(err);}
    }
    infoproject()
  },[status])
  const cutString = (str)=>{
    if (!str) return 
    else return str.substring(0,10)
  }
  const colorprofit = (profit)=>{
    if(profit>0) return <p style={{color:"green"}}>{profit}</p>
    if(profit<0) return <p style={{color:"red"}}>{profit}</p>
  }
  const dataProject =  [
    {
      id: 'money_project',
      labale: "Số tiền dự án",
      money: data.project_money,

    },
    {
      id: "pay",
      labale: "Số tiền chi trả",
      money: data.pay,
    },
  ];
   const userData ={
     labels: dataProject.map((data) => data.labale),
     datasets: [
       {
         label: "Số tiền dự án",
         data: dataProject.map((data) => data.money),
         backgroundColor: [
           "rgba(75,192,192,1)",
           "#ecf0f1",
         ],
         borderColor: "black",
         borderWidth: 1,
       },
     ],
   }
  return (
    <div>
      <Header>
        <div style={{display: 'flex',alignItems: 'center',padding:20}}>
          <img style={{width:50,height:50,objectFit:"cover",marginBottom:10,borderRadius:"50%"}} src="https://www.imgacademy.com/sites/default/files/styles/scale_1700w/public/2020-04/OG-boarding-school.jpg?itok=vCBnXXAJ" />
          <div style={{paddingLeft:"20px"}}>
            <h3 style={{fontWeight:"bold"}}>{data.name}</h3>
              <span style={{fontWeight:"550"}}>PM</span><span>: {data.email_manager}</span>
          </div>
        </div>
      </Header>
      <Body style={{padding:"10px 10px 60px 20px"}}>
        <div>
            <h2 style={{fontWeight:"bold"}}>Thông tin dự án</h2>
            <div style={{width:"100%",height:"1px",background:"black",marginBottom:19}}></div>
        </div>
       <div style={{display:"flex"}}>
         <div className="title" >Tên</div>
         <div style={{width:"700px"}}>{data.name}</div>
       </div>
       <Divider/>
       <div style={{display:"flex"}}>
         <div className="title" className="title">Số Thành Viên</div>
         <div style={{width:"700px"}}>{data.emp_number}</div>
         {authState.role < 4 && <Link to = {`/EmployeeProject/${data.project_id}`}><div class="edit" >Xem Chi Tiết</div></Link>}
       </div>
       <Divider/>
       <div style={{display:"flex"}}>
         <div className="title" className="title">Quản Lí</div>
         <div style={{width:"700px"}}>{data.email_manager}</div>
       </div>
       <Divider/>
       <div style={{display:"flex"}}>
         <div className="title">Ngày khởi tạo</div>
         <div style={{width:"700px"}}>{cutString(data.start_date)}</div>
       </div>
       <Divider/>
       <div style={{display:"flex"}}>
         <div className="title">Ngày Dự Kiến Hoàn Thành</div>
         <div style={{width:"700px"}}>{cutString(data.foresee_end_date)}</div>
       </div>
       <Divider/>
       <div style={{display:"flex"}}>
         <div className="title">Ngày Kết Thúc</div>
         <div style={{width:"700px"}}>{cutString(data.end_date)||"chưa kết thúc"}</div>
       </div>
       <Divider/>
      {
        authState.role <4 && <div>
        <div style={{display:"flex"}}>
           <div className="title">Số Tiền Của Dự Án</div>
           <div style={{width:"700px"}}>{data.project_money}</div>
         
         </div>
         <Divider/>
         <div style={{display:"flex"}}>
           <div className="title">Số ManMonth dự án</div>
           <div style={{width:"700px"}}>{data.manmonth}</div>
         </div>
         <Divider/>
         <div style={{display:"flex"}}>
           <div className="title">Số Tiền Chi Trả Nhân Công</div>
           <div style={{width:"700px"}}>{data.pay}</div>
         </div>
         <Divider/>
         <div style={{display:"flex"}}>
           <div className="title">Số Tiền Lời Của Dự Án</div>
           <div style={{width:"700px"}}>{colorprofit(data.profit) || "0"}</div>
         </div>
         <Divider/>
         <div style={{display:"flex"}}>
           <div className="title">Tỷ Suất Lỗ/Lãi</div>
           <div style={{width:"700px"}}>{ (data.pay/data.project_money)*100}%</div>
         </div>
         <Divider/>
        </div>
      }
       <div style={{display:"flex"}}>
         <div className="title">Trạng Thái</div>
         <div style={{width:"700px",cursor: "pointer"}}>{statusProjectItem(data.status,id,status,setStatus)}</div>
       </div>
      </Body>
    {authState.role <4 &&  <div style={{width:"500px",position:"absolute",top:800,right:10}}> <BarChart style={{height:"12"}} chartData={userData} /></div> }
    </div>
  )
}

export default InfoProject