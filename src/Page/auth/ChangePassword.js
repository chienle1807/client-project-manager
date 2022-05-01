
import React from 'react'
import { Button, Form, Checkbox, DatePicker, Input, Select, Row, Col, Modal } from 'antd'
import openNotificationWithIcon from "../../Helpers/notifycation"
import { useContext, useState, } from 'react'
import { AuthContext } from '../../Auth/AuthContext'
import apiAuth from './Api/apiAuth';

const ChangePassword = (visible, setvisible) => {
    const { setAuthState } = useContext(AuthContext)
    const [loading, setLoading] = useState('')
    const [form] = Form.useForm();
    const onCancel = ()=>{
        form.resetFields();
        setvisible(false)
    } 
    return (
        <Modal
            confirmLoading={loading}
            title="Chỉnh Sửa" visible={visible}
            onCancel={onCancel}
            footer={[
                <h1></h1>
            ]}
        >
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}>
                <img
                    style={{
                        height: 80,
                        width: 206,
                        marginBottom: 10
                    }}
                    src="https://tinasoft.vn/wp-content/uploads/2021/02/Asset-3.png"></img>
                <p style={
                    {
                        fontSize: 30,
                        fontWeight: "700",

                    }
                }>Đổi mật khẩu <span
                    style={
                        {
                            color: 'blue'

                        }
                    }
                >TinaSoft</span></p>
                <Form
                     form={form}
                    autocomplete="off"
                    initialValues={{oldpassword:"*************"}}
                    onFinish={(data) => {
                        form.resetFields();
                        const changepassworld = async () => {
                            try {
                              apiAuth.updatatePassword(data)
                              .then((res)=>{
                                  if(res.error){
                                      openNotificationWithIcon("error","mật khẩu cũ không chính xác")
                                  }
                                  else{
                                    setvisible(false);
                                    openNotificationWithIcon("success","đổi mật khẩu thành công")
                                  }
                                 
                                  console.log(res)})
                              .catch((err) => {
                                  console.log(err)})
                              
                            } catch (err) {
                                alert("error", "lỗi")
                            }
                        }
                        changepassworld()
                    }}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}>
                    <Form.Item
                        name="oldpassword"
                        rules={[
                            {
                                required: true,
                                message: "vui lòng nhập đầy đủ thông tin"
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            style={{
                                width: "385px",
                                height: 60,
                                borderRadius: 6,
                            }}
                            placeholder="nhập mật khẩu cũ " />
                    </Form.Item>
                    {/* Mật khẩu */}
                    <Form.Item

                        name="newpassword"
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
                                width: "385px",

                                height: 60,

                                borderRadius: 6,

                            }}
                            placeholder="nhập mật khẩu mới"
                        />
                    </Form.Item>
                    <Form.Item
                        
                        name="confirmpassword"
                        dependencies={["newpassword"]}
                        rules={[{
                            required: true,
                            message: "vui lòng nhập đầy đủ thông tin"
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("newpassword") === value) {
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
                        <Input.Password style={
                            {
                                width: "385px",
                                height: 60,
                                borderRadius: 6,
                            }
                        }
                        
                        placeholder="Nhập lại mật khẩu" />
                    </Form.Item>

                    <Form.Item

                        name="submit" >
                        <Button type="primary" htmlType='submit'
                            style={{
                                height: 64,
                                width: 385,
                                borderRadius: 6,
                                fontSize: 20,

                            }}
                        >Đổi mật khẩu</Button>
                    </Form.Item>
                </Form>
            </div >
        </Modal>
    )
}

export default ChangePassword