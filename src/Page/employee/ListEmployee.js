import React from 'react'
import { Table, Button, Row, Col, Select, Input, Modal, notification } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { checkNullValue} from "../../Helpers/checkNull"
import openNotificationWithIcon from "../../Helpers/notifycation"
import { SearchInput, Role, StatusTag, Sex } from '../../components/custom/Customize';
import { useState, useEffect } from "react"
import apiEmployee from './Api/apiEmployee';
import { Link } from "react-router-dom"
const Employee = () => {
  const [isActive, setIsActive] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(2)
  const [q,setQ] = useState(null)
  console.log(isActive)
  const columns = [
    {
      title: 'Mã Nhân Viên',
      dataIndex: 'emp_id',
      key: 'emp_id',
    },
    {
      title: 'Họ Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Giới tính',
      dataIndex: 'sex',
      key: 'sex',
      render: (record) => {
        return Sex(record)
      }
    },
    {
      title: 'Năng Suất ',
      dataIndex: 'productivity',
      key: 'productivity',
      render: (record) => {
        return `${record}%`
      }
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'detailaddress',
      key: 'detailaddress',
    },
    {
      title: 'Chức Vụ',
      dataIndex: 'role',
      key: 'role',
      render: (record) => {
        return Role(record)
      }
    },
    {
      key: "action",
      title: "action",
      render: (record) => {
        return StatusTag(record, setIsActive, isActive)
      }
    }
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await apiEmployee.get({ page: page, size: pageSize });
        setTotal(res.count)
        setDataSource(res.rows);

      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [isActive])

  //searchbar
  
  useEffect(() => {
    const  handleSearch= (e) => {
      setQ(e)
      const getData = async () => {
        try {
         const res = await apiEmployee.searchQ({ q: q.target.value, page: page, size: pageSize });
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
        <Link to="/insert/employee"> <Button type="primary"> + {" "}Thêm Nhân Viên</Button></Link>
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
                const res = await apiEmployee.get({ page: page, size: pageSize });
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

export default Employee