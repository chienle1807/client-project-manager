
import React from 'react'
import axios from "axios"
import { useState } from "react"
import { Button, Form, Checkbox, DatePicker, Input, Select, Row, Col, Tag, AutoComplete } from 'antd'
import apiProject from './Api/apiProject'
import openNotificationWithIcon from "../../Helpers/notifycation"
import { useNavigate } from 'react-router-dom'
import { Modal } from 'antd'
import { UserOutlined } from '@ant-design/icons';

const CreateProject = () => {
  const [visible, setvisible] = useState(false)
  const [Employee, setEmployee] = useState([])
  const [Manager, setManager] = useState([])
  const [CompeleteEmp,setCompeleteEmp] = useState([])
  const [form] = Form.useForm();
  const emailManager = Manager.map(item => item.email)
 const d = new Date()
  const renderItem = (title) => ({
    value: title,
    label: (
      <div key={title}
      >
        <UserOutlined />
        <span>
          {title}
        </span>
      </div>
    ),
  });
  const options = Manager.map(item => { return { options: [renderItem(item.email)] } })
  const options1 = CompeleteEmp.map(item => { return { options: [renderItem(item.email)] } })
  const onClose = (email) => {
    setEmployee(Employee.filter(item => item.email !== email))
  }
  //Compelete 
  const onChange = (email) => {
    const insertManager = async () => {
      try {
        const res = await apiProject.getManager({ email })
       
        setManager(res)
        //setManager([...Manager,res])
      }
      catch (err) { console.log(err) }
    }
    insertManager()
  }
  //Compelete nhân Viên
  const onChange1 = (email) => {
    const insertEmployee = async () => {
      try {
        const res = await apiProject.getEmployeeAutoComplete({ email })
        setCompeleteEmp(res)
        //setManager([...Manager,res])
      }
      catch (err) { console.log(err) }
    }
    insertEmployee()
  }
  //CompeleteEm
  const emailEmp = Employee.map((item)=> item.email)
  return (
    // Form Tạo Tài Khoản
    <Form
      onFinish={(data) => {
        const o=[]
        const dataEmployWork = Employee.map(item=>({...o,emp_id:item.emp_id,manmonth:item.manmonth}))
        const project_money = data.manmonth*30
        const emp_number = Employee.length
        const manmontharry = Employee.map(item=>item.manmonth*30)
       const pay = manmontharry.reduce((total, item) => total + item)
        const profit = project_money - pay
        const databody ={...data,project_money,emp_number,pay,profit,dataEmployWork}
  
        const insertProject = async ()=>{
          try {
           const result = await apiProject.insertProject(databody)
            if(result.error) openNotificationWithIcon('error',"Không thể tạo được dự án","tên dự án và email quản lí không được trùng")
            else openNotificationWithIcon('success',"tạo dự án thành công")
          }catch (err) {console.log(err)}
        }
        insertProject ()
      }}
      style={{ padding: "40px 100px" }}>
      <Form.Item
        name="name"
        label="Tên"
        labelCol={{ span: 3 }}
        labelAlign="left"
        rules={[
          {
            required: true,
            message: "vui lòng nhập đầy đủ thông tin"
          },
          { whitespace: true, message: "vui lòng nhập đầy đủ thông tin" },
          {
            min: 3
            , message: "Ít nhất 3 kí tự"
          }
        ]}
        hasFeedback
      >
        <Input placeholder="Tên dự án" />
        {/* email */}
      </Form.Item>

      {/* Mannmonth project */}
      <Form.Item name="manmonth"
        labelCol={{ span: 3 }}
        labelAlign="left"
        label="Số manmonth"
        rules={[
          {
            required: true,
            message: "vui lòng nhập đầy đủ thông tin"
          },
        ]}
      >
        <Input type="number" placeholder="số manmonth dự án" />
      </Form.Item>

      {/* Start Date */}
      <Form.Item labelCol={{ span: 3 }}
        labelAlign="left" name="start_date" label="Ngày bắt đầu"
        rules={[
          {
            required: true,
            message: "vui lòng nhập đầy đủ thông tin"
          },
          {
            validator: (_, value) =>
            (value >= d? Promise.resolve() : Promise.reject("Ngày khởi công phải lớn hơn hoặc bằng ngày hiện tại"))
          }
        ]}
      >
        <DatePicker picker="date" style={{ width: '100%' }} placeholder="Chọn"></DatePicker>
      </Form.Item>
      {/* Dự kiến kết thúc */}
      <Form.Item labelCol={{ span: 3 }}
        labelAlign="left" name="foresee_end_date" label="Dự kiến hoàn thàn"
        rules={[
          {
            required: true,
            message: "vui lòng nhập đầy đủ thông tin"
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
                if (!value || getFieldValue("start_date") < value) {
                    return Promise.resolve()
                }
                else {
                    return Promise.reject("Ngày dự kiến hoàn thành phải lớn hơn ngày khởi công")
                }
            }
        })
        ]}
      >
        <DatePicker style={{ width: '100%' }} picker="date" placeholder="Chọn"></DatePicker>
      </Form.Item>
      {/* Lấy thông tin quản lí */}
      <Form.Item
        name="email_manager"
        label=" Quản lí dự án"
        labelCol={{ span: 3 }}
        labelAlign="left"
        rules={[
          {
            required: true,
            message: "vui lòng nhập đầy đủ thông tin"
          },
          {
            validator: (_, value) =>
            (value && emailManager.includes(value) ? Promise.resolve() : Promise.reject("Không tìm thấy email"))
          }
        ]}
        hasFeedback
      >
        <AutoComplete
          options={options}
          // onSelect={onSelect}
          // onSearch={onSearch}
          onChange={onChange}
          placeholder="Nhập email quản lí"
        />
      </Form.Item>
      <Button style={{ height: 30, marginBottom: 20 }} onClick={() => { setvisible(true) }} >++Thêm Nhân Viên</Button>
      <Modal
        onCancel={() => { setvisible(false) }}
        visible={visible}
        footer={[]}
      >
        <Form
          form={form}
          onFinish={(data) => {
            form.resetFields();
            const o = Employee.map(item => {
              return item.email
            })
            const insertEmployee = async () => {
              try {
                const res = await apiProject.getEmployee(data)
                if (!res.email) {
                  openNotificationWithIcon("error", "email không tồn tại")
                }
                else {
                  if (!o.includes(data.email)) {
                    setEmployee([...Employee, { ...res, manmonth: data.manmonth }])
                    setvisible(false)
                  }
                  else {
                    openNotificationWithIcon("error", "nhân viên đã được thêm trước đo")
                  }

                }
              }
              catch (err) { console.log(err) }
            }
            insertEmployee()
          }}
        >
          <Form.Item
            style={{ marginTop: 20 }}
            labelCol={{ span: 7 }}
            labelAlign="left"
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "vui lòng nhập đầy đủ thông tin"
              }
            ]}
          >
            <AutoComplete
              options={options1}
              // onSelect={onSelect}
              // onSearch={onSearch}
              onChange={onChange1}
              placeholder="Nhập email nhân viên"
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: 20 }}
            labelCol={{ span: 7 }}
            labelAlign="left"
            name="manmonth"
            label="manmonth"
            rules={[
              {
                required: true,
                message: "vui lòng nhập đầy đủ thông tin"
              }
            ]}
          >
            <Input type="number" placeholder="manmonth dự án" />
          </Form.Item>
          <Form.Item>
            <Button style={{ position: 'relative', top: 20, left: 340 }} type="primary" htmlType='submit'>Thêm Nhân Viên</Button>
          </Form.Item>
        </Form>
      </Modal>
      {
        Employee.map((item, index) => {
          return <div key={index} style={{ marginBottom: 20 }}>
            <Tag style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", width: 700 }} closable onClose={() => { onClose(item.email) }}>
              <p style={{ fontSize: 14, marginTop: 10, width: 500 }}><strong>Tên:{" "}</strong>{item.name}</p>
              <p style={{ fontSize: 14, marginTop: 10, width: 500 }}><strong>Số manmonth:{" "}</strong>{item.manmonth} tháng</p>
            </Tag></div>

        })
      }
      <div><Button style={{ width: 200, height: 43 }} type="primary" htmlType='submit' 
      onClick={()=>{console.log(!!Employee[0])
        !Employee[0] && openNotificationWithIcon('error',"Không thể tạo dự án","Cần thêm nhân viên")}}
      >Tạo dự án</Button></div>

    </Form>
  )
}

export default CreateProject