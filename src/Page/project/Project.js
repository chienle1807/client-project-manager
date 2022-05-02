import React from 'react'
import { Table, Button, Row, Col, Select, Input, Modal, notification } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { checkNullValue} from "../../Helpers/checkNull"
import openNotificationWithIcon from "../../Helpers/notifycation"
import { SearchInput, Role, StatusTagProject, Sex } from '../../components/custom/Customize';
import { useState, useEffect } from "react"
import apiProject from './Api/apiProject';
import { Link,useNavigate } from "react-router-dom"
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
const Project = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(2)
  const [q,setQ] = useState(null)
  const columns = [
    {
      title: 'Mã Dự Án',
      dataIndex: 'project_id',
      key: 'project_id',
    },
    {
      title: 'Tên dự án',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email Quản lí',
      dataIndex: 'email_manager',
      key: 'email_manager',
    },
    {
      title: 'Số tiền của dự án',
      dataIndex: 'project_money',
      key: 'project_money',
      render:(record)=>{
        return  <p style={{width:100}}>{record}$</p>
      }
    },
    {
      title: 'Số tiền chi trả',
      dataIndex: 'pay',
      key: 'pay',
      render:(record)=>{
        return  <p style={{width:100}}>{record}$</p>
      }
    },
    {
      title: 'Lợi nhuận',
      dataIndex: 'profit',
      key: 'profit',
      render:(record)=>{
        if(record>0) return <p style={{color:"green",width:"80px"}}>{record}$</p>
        else if(record<0) return <p style={{color:"red",width:"80px"}}>{record}$</p>
        else return <p style={{color:"yellow"}}>{record}$</p>
      }
    },
    {
      title: 'Manmonth',
      dataIndex: 'manmonth',
      key: 'manmonth',
    },
    {
      key: "status",
      title: "action",
      render: (record) => {
        return StatusTagProject(record, setStatus, status)
      }
    }
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await apiProject.getAllProject({ page: page, size: pageSize });
        setStatus(res.status)
        setTotal(res.count)
        setDataSource(res.rows);

      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [status])

  //searchbar
  
  useEffect(() => {
    const  handleSearch= (e) => {
      setQ(e)
      const getData = async () => {
        try {
         const res = await apiProject.searchQ({ q: q.target.value, page: page, size: pageSize });
          if(e.target.value && !res.rows[0]){
           setPage(1)
         }
          setTotal(res.count)
          setDataSource(res.rows);
        } catch (err) {
          console.log(err);
        }
      }
      getData();
    }
    !!q && handleSearch(q)
  },[page,q,pageSize])

 
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "20px" }}>
        <Link to="/client-project-manager/insert/project"> <Button type="primary"> + {" "}Tạo dự án</Button></Link>
        <SearchInput
          onChange={(e)=>{setQ(e)}}
          style={{ marginRight: 10 }} placeholder="Tìm kiếm" />
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={record => record.id}
        pagination={{
          total: (total), //số dữ liệu backend trả về
          current: page,
          pageSize: pageSize,
          showSizeChanger: [5, 10, 15, 20, 30, 50, 100],
          pageSizeOptions: [2, 3, 4, 5, 6 , 30, 50, 100],
          onChange: (page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
            const getData = async () => {
              try {
                const res = await apiProject.getAllProject({ page: page, size: pageSize });
                setTotal(res.count)
                setDataSource(res.rows);
              } catch (err) {
                console.log(err);
              }
            }
          !q && getData()
          }
        }}
      />
    </div>
  )
}

export default Project