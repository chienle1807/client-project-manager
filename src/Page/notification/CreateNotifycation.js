
import React from 'react'
import { Table, Radio, Divider, Button, Row, Col, Select, Input, Modal, notification, Form } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { checkNullValue } from "../../Helpers/checkNull"
import openNotificationWithIcon from "../../Helpers/notifycation"
import { SearchInput, Role, StatusTag, Sex } from '../../components/custom/Customize';
import { useState, useEffect } from "react"
import apiEmployee from './Api/apiNotification';
import { Link } from "react-router-dom"
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

];
// rowSelection object indicates the need for row selection



const Notifycation = () => {
  const [isActive, setIsActive] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(2)
  const [q, setQ] = useState(null)
  console.log(isActive)
  const [selectionType, setSelectionType] = useState('checkbox');
  const [emp_id,setemp_id] = useState([])
  useEffect(( ) => {
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
  }, [])

  useEffect(() => {
    const handleSearch = (e) => {
      setQ(e)
      const getData = async () => {
        try {
          const res = await apiEmployee.searchQ({ q: q.target.value, page: page, size: pageSize });
          if (e.target.value && !res.rows[0]) {
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
  }, [page, q, pageSize])
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setemp_id(selectedRows.map(item=>item.emp_id))
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  }; const { TextArea } = Input;
  return (
    <div style={{ padding: 30 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "20px" }}>
        <div></div>
        <SearchInput
          onChange={(e) => { setQ(e) }}
          style={{ marginRight: 10 }} placeholder="Tìm kiếm nhân viên" />
      </div>
      <Form
      onFinish={(e)=>{
        
        const datanotification =emp_id.map(item=>({emp_id: item, ...e}))
        const insertNotifications = async () => {
          try{
            const res =await apiEmployee.insertNotifications(datanotification)
            openNotificationWithIcon("success","Gửi thành công")
            console.log(res)
          }catch(err){console.log(err)}
        }
        if(!emp_id[0]) openNotificationWithIcon("error","Không thể gửi thông báo","Cần thêm người nhận")
        else insertNotifications()
      }}
      >
        Tiêu đề
        <Form.Item
        name="title"
        rules={[{
          required: true,
          message: "Nhập tiêu đề trước khi gửi thôn báo"
        }]}
        >
          <Input style={{ height: 40, width: 240 }} placeholder="Tiêu đề" />
        </Form.Item>
        Nội dung tiêu đề
        <Form.Item
        name="notification"
        >
          <TextArea style={{ height: 130, width: 940 }} rows={4} placeholder="Nội dung tiêu đề " />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Gửi thông báo
          </Button>
        </Form.Item>
      </Form>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >

        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>

      </Radio.Group>

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource.map((item, index) => ({ ...item, key: item.emp_id }))}
        pagination={{
          total: (total), //số dữ liệu backend trả về
          current: page,
          pageSize: pageSize,
          showSizeChanger: [5, 10, 15, 20, 30, 50, 100],
          pageSizeOptions: [2, 3, 4, 5, 6, 30, 50, 100],
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
  );
};
export default Notifycation