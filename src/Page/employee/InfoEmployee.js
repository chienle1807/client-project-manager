
import React from 'react'
import axios from "axios"
import { Button, Form, Checkbox, DatePicker, Input, Select, Row, Col } from 'antd'
import apiEmployee from './Api/apiEmployee'
import styled from 'styled-components'
import openNotificationWithIcon from "../../Helpers/notifycation"
import { useNavigate, useParams, } from 'react-router-dom'
import { useEffect, useState ,useContext} from 'react'
import { Role, switchStatus } from '../../components/custom/Customize'
import { Switch, Divider,Spin } from 'antd';
import { Link } from "react-router-dom"
import { ArrowLeftOutlined } from '@ant-design/icons'
import {AuthContext} from '../../Auth/AuthContext'

const Header = styled.div`
display: flex;
justify-content:center;
align-items:center;
background-color:#FAFBFC;

`
const InfoEmployee = () => {
  let params = useParams();
  const {authState} = useContext(AuthContext)
  let navigate = useNavigate()
  const [dataSource, setDataSource] = useState()
  const [isActive, setIsActive] = useState()
  const background = isActive ? { backgroundColor: "white" } : { opacity: 0.4 }
 const productivity = [25,50,75,100,125,150,175,200,225,250,275,300]
  useEffect(() => {
    const getInfoEmployee = async () => {
      try {
        apiEmployee.getInfo(params.id)
          .then((res) => {
            setDataSource(res)
            setIsActive(res.isActive)
          })
      }
      catch {

      }
    }
    getInfoEmployee()
  }, [isActive])
  return (
    // Form Tạo Tài Khoản
    <>

      {
        dataSource ?
          <div  >
            <Header >
              <div style={{ display: 'flex', alignItems: 'center', padding: 20 }}>
                <img style={{ width: 50, height: 50, objectFit: "cover", marginBottom: 10, borderRadius: "50%" }} src="https://www.imgacademy.com/sites/default/files/styles/scale_1700w/public/2020-04/OG-boarding-school.jpg?itok=vCBnXXAJ" />
                <div style={{ paddingLeft: "20px" }}>
                  <h3 style={{ fontWeight: "bold" }}>{Role(dataSource.role)}</h3>
                  <p>{dataSource.name}</p>
                </div>
              </div>
              {switchStatus(dataSource.emp_id, isActive, setIsActive)}
            </Header>

            <h2 style={{ display: 'flex', justifyContent: "space-between", padding: "0px 100px" }}>Chỉnh sửa thông tin cá nhân</h2>
           
            <Divider />
            <Form
              autocomplete="off"
              initialValues={dataSource}
              onFinish={(data) => {
                const UpdateData = async () => {
                  try {
                    const res = await apiEmployee.put(params.id, data)
                    console.log(res)
                    if (res.error) {
                      openNotificationWithIcon("error", "Lỗi")
                    
                    }
                    else {
                      openNotificationWithIcon("success", "Thêm Thành Công")
                     
                    }
                  } catch (err) {
                    openNotificationWithIcon("error", "Email hoặc Số điện thoại đã được sử dụng")
                  }
                }
                UpdateData()
              }}
              style={{ padding: "0px 100px 30px 100px" }}>
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
                <Input
                  placeholder="nhập tên của bạn" />
                {/* email */}
              </Form.Item>
              <Form.Item name="email"
                labelCol={{ span: 3 }}
                labelAlign="left"
                rules={[
                  {
                    required: true,
                    message: "vui lòng nhập đầy đủ thông tin"
                  },
                  { type: "email", message: "email không hợp lệ" },
                ]}
                hasFeedback
                label="Email">
                <Input placeholder="nhập địa chỉ email" />
              </Form.Item>
              {/* SĐT */}
              <Form.Item name="phone"
                labelCol={{ span: 3 }}
                labelAlign="left"
                label="SĐT"
                rules={[
                  {
                    required: true,
                    message: "vui lòng nhập đầy đủ thông tin"
                  },
                  {
                    validator: (_, value) =>
                    (value && value[0] === "0" ? Promise.resolve() : Promise.reject("SĐT không hợp lệ")
                    )
                  }
                ]}
              >
                <Input placeholder="nhập SĐT của bạn" />
              </Form.Item>
              {/* Giới Tính */}
              <Form.Item labelCol={{ span: 3 }}
                labelAlign="left" name="sex" label="Giới tính"
                rules={[
                  {
                    required: true,
                    message: "vui lòng nhập đầy đủ thông tin"
                  },
                ]}
              >
                <Select placeholder="Chọn">
                  <Select.Option value="M">
                    Nam
                  </Select.Option>
                  <Select.Option value="F">
                    Nữ
                  </Select.Option>
                  <Select.Option value="K">
                    Giới Tính Khác
                  </Select.Option>
                </Select >
              </Form.Item>
              {/* Năng suất làm việc */}
              <Form.Item labelCol={{ span: 3 }}
                labelAlign="left"
                name="productivity"
                label="Năng suất"
                rules={[
                  {
                    required: true,
                    message: "vui lòng nhập đầy đủ thông tin"
                  }
                ]}
              >
                <Select placeholder="Chọn">
                  {
                    productivity.map(item=>{
                      return <Select.Option key={item.id} value={item}>{`${item}%`}</Select.Option>
                    })
                  }
                  </Select>
              </Form.Item>
              {/* Ngày sinh nhật */}
              {/* <Form.Item labelCol={{span:3}}
      labelAlign="left" name="dob" label="Ngày Sinh"
        rules={[
          {
            required: true,
            message: "vui lòng nhập đầy đủ thông tin"
          }
        ]}
      >
      <DatePicker picker="date" placeholder="Chọn"></DatePicker>
      </Form.Item> */}

              <Form.Item labelCol={{ span: 3 }}
                labelAlign="left"
                name="detailaddress"
                label="Địa chỉ"
                rules={[
                  {
                    required: true,
                    message: "vui lòng nhập đầy đủ thông tin"
                  },
                ]}
              >
                <Input placeholder="địa chỉ chi tiết" />
              </Form.Item>
              {/* Mật khẩu */}
              {/* <Form.Item labelCol={{span:3}}
      labelAlign="left"
        name="oldpassword"
        label="Mật khẩu Cũ"
        rules={[{
          required: true,
          message: "vui lòng nhập đầy đủ thông tin"
        },
        { min: 6, message: "độ dài mật khẩu từ 6 kí tự trở lên" }
          ,
          // {
          //   validator:(_,value)=>
          //     (value && value.includes("A")? Promise.resolve():Promise.reject("Mật khẩu phải gồm các chữ in hoa")
          //     )
          // }
        ]}
        hasFeedback

      >
        <Input.Password placeholder="nhập mật khẩu"
        /> */}
              {/* Nhập lại mật khẩu */}
              {/* </Form.Item>
      <Form.Item labelCol={{span:3}}
      labelAlign="left"
        name="password"
        label="Mật khẩu Cũ"
        rules={[{
          required: true,
          message: "vui lòng nhập đầy đủ thông tin"
        },
        { min: 6, message: "độ dài mật khẩu từ 6 kí tự trở lên" }
          ,
          // {
          //   validator:(_,value)=>
          //     (value && value.includes("A")? Promise.resolve():Promise.reject("Mật khẩu phải gồm các chữ in hoa")
          //     )
          // }
        ]}
        hasFeedback

      >
        <Input.Password placeholder="nhập mật khẩu"
        />
        {/* Nhập lại mật khẩu */}
              {/* </Form.Item> */}
              {/* <Form.Item labelCol={{span:3}}
      labelAlign="left"
        name="confirmpassword"
        label="Xác nhận"
        dependencies={["password"]}
        rules={[{
          required: true,
          message: "vui lòng nhập đầy đủ thông tin"
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve()
            }
            else {
              return Promise.reject("Tài khoản và mật khẩu không khớp")
            }
          }
        })
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Nhập lại mật khẩu" />
      </Form.Item>  */}
              {/*Chức Vụ  */}
              <Form.Item labelCol={{ span: 3 }}
                labelAlign="left" name="role" label="Chức Vụ"
                rules={[{
                  required: true,
                  message: "vui lòng nhập đầy đủ thông tin"
                }]}
              >
                <Select placeholder="Chọn">
                  {
                    authState.role === '1' &&   
                    <Select.Option value="2">
                    Quản lí
                  </Select.Option>
                  }
                  <Select.Option value="4">
                    Nhân Viên
                  </Select.Option>
                  <Select.Option value="3">
                    Quản lí Dự Án
                  </Select.Option>
                </Select >
              </Form.Item>
              <Form.Item labelCol={{ span: 3 }}
                labelAlign="left"
                name="submit" >
 
               <Button type="primary" htmlType='submit' >Chỉnh sửa thông tin</Button>
                <Button style={{color:"blue",marginLeft:20}} onClick={()=>{navigate(-1)}}> <ArrowLeftOutlined />Quay lại</Button>

              </Form.Item>
            </Form>
          </div> :   <Spin style={{display:"flex",
          justifyContent: "center",marginTop:200}} size="large" />
      }
    </>

  )
}

export default InfoEmployee