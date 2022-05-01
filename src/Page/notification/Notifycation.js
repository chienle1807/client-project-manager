import React from 'react'
import {Table} from "antd"
import { useEffect,useState } from 'react'
import apiNotification from './Api/apiNotification'

 
const Notifycation = () => {
  const [datasource,setdatasource] = useState([])
  const [isReading,setIsReading] = useState(false)
  const cutString = (str)=>{
    if (!str) return 
    else return str.substring(0,10)
  }
  const isRead = (is,record)=>{

    if(is ==='0')   return <p style={{cursor:"pointer",color:"red"}} onClick={()=>{
      apiNotification.isRead({id:record.id})
      setTimeout(()=>{setIsReading(!isReading)},0)
    }}>chưa đọc</p>

    else if (is ==='1') return <p style={{cursor:"pointer",color:'blue'}} onClick={
      ()=>{
        apiNotification.isRead({id:record.id})
        setTimeout(()=>{setIsReading(!isReading)},0)
      }
    }>đã đọc</p>
  }
  const columns = [
    {
      title:"id",
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'notification',
    },
    {
      title: 'Nội dung',
      dataIndex: 'notification',
      key: 'notification',
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: function (record) {
        return cutString(record)
      }
    },
    {
      title: '',
      key: 'action',
      render: function (record) {
      return isRead(record.isRead,record)
      }
    },
  ]

 
  useEffect(( ) => {
    const getAllNotifcation = async () =>{
     const res = await apiNotification.getallNotification()
     setdatasource(res.Notifications)
    }
    getAllNotifcation()
  },[isReading])
  return (
    <div style={{padding:30}}>
      <Table columns={columns} dataSource={datasource} />
    </div>
  )
}

export default Notifycation