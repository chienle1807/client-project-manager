
import React from 'react'
import axios from "axios"
import { Button, Form, Checkbox, DatePicker, Input, Select, Row, Col } from 'antd'
import apiEmployee from '../../Api/apiEmployee'
import openNotificationWithIcon from "../../Helpers/notifycation"
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../Auth/AuthContext'
const SignIn = () => {
    const { setAuthState } = useContext(AuthContext)
    return (
        <div style={{
            height: "100vh", display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginLeft:-300,
        }}>
            <img
                style={{
                    height: 80,
                    width: 206,
                    marginBottom:10
                }}
            src ="https://tinasoft.vn/wp-content/uploads/2021/02/Asset-3.png"></img>
            <p style={
                {
                    fontSize:30,
                    fontWeight: "700",

                }
            }>Đăng nhập vào <span
                style={
                {
                  color:'blue'

                }
            }
            >TinaSoft</span></p>
            <Form
                autocomplete="off"
                onFinish={(data) => {
                    const login = async () => {
                        try {
                            axios.post(`${process.env.REACT_APP_API_URL}login`, data).then((response) => {
                                if (response.data.error) {
                                    alert(response.data.error);
                                } else {
                                    window.location.href = '/client-project-manage'
                                    localStorage.setItem("accessToken", response.data.token);
                                    setAuthState({ 
                                        username: response.data.username,
                                        id: response.data.username.emp_id,
                                        role:response.data.username.role,
                                        isActive:response.data.username.isActive,
                                        status: true })
                                }
                            });
                        } catch (err) {
                            alert("error", "lỗi")
                        }
                    }
                    login()
                }}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}>
                <Form.Item
                    name="email"
                   
                    rules={[
                        {
                            required: true,
                            message: "vui lòng nhập đầy đủ thông tin"
                        },
                        { type: "email", message: "email không hợp lệ" },
                    ]}
                    hasFeedback
                >
                    <Input
                     style={{
                        width: "300px",
                        height: 60,
                        width: 385,
                        borderRadius: 6,
                    }}
                     placeholder="nhập địa chỉ email" />
                </Form.Item>
                {/* Mật khẩu */}
                <Form.Item

                    name="password"
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
                    <Input.Password
                        style={{
                            width: "300px",
                            height: 60,
                            width: 385,
                            borderRadius: 6,

                        }}
                    placeholder="nhập mật khẩu"
                    />
                </Form.Item>
                <Form.Item

                    name="submit" >
                    <Button type="primary" htmlType='submit'
                        style={{
                            height: 64,
                            width: 385,
                            borderRadius: 6,
                            fontSize:20,
                            marginBottom:"60px"
                        }}
                    >Đăng Nhập</Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default SignIn