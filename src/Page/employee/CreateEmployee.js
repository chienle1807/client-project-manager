
import React from 'react'
import { Button, Form, Checkbox, DatePicker, Input, Select, Row, Col } from 'antd'
import apiEmployee from './Api/apiEmployee'
import openNotificationWithIcon from '../../Helpers/notifycation'
import { useNavigate } from 'react-router-dom'
const CreateEmployee = () => {
  let navigate = useNavigate()
  const productivity = [25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300]
  const [form] = Form.useForm();
  return (  
    // Form Tạo Tài Khoản
    <Form
      autocomplete="off"
      onFinish={(data) => {
        console.log(data)
        const PostData = async () => {
          try {
            const res = await apiEmployee.post(data)
              .then(res => {
                if (res.error) {
                  openNotificationWithIcon("error", "Lỗi", "email dã được sử dụng")
                }
                else {
                  openNotificationWithIcon("success", "Thêm Thành Công")
                  setTimeout(function () {
                    navigate("/employee")
                  }, 900)
                }
              })
          } catch (err) {
            openNotificationWithIcon("Kiểm tra lại nguồn thông tin")
          }
        }
        PostData()
      }}
      style={{ padding: "40px 100px" }}>
      <Form.Item
        name="name"
        label="Tên"
        labelCol={{ span: 2 }}
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
        <Input placeholder="nhập tên của bạn" />
        {/* email */}
      </Form.Item>
      <Form.Item name="email"
        labelCol={{ span: 2 }}
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
        labelCol={{ span: 2 }}
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
        <Input type="number" placeholder="nhập SĐT của bạn" />
      </Form.Item>
      {/* Giới Tính */}
      <Form.Item labelCol={{ span: 2 }}
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
      <Form.Item labelCol={{ span: 2 }}
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
            productivity.map(item => {
              return <Select.Option key={item.id} value={item}>{`${item}%`}</Select.Option>
            })
          }
        </Select>
      </Form.Item>
      {/* Ngày sinh nhật */}
      <Form.Item labelCol={{ span: 2 }}
        labelAlign="left" name="dob" label="Ngày Sinh"
        rules={[
          {
            required: true,
            message: "vui lòng nhập đầy đủ thông tin"
          }
        ]}
      >
        <DatePicker picker="date" placeholder="Chọn"></DatePicker>
      </Form.Item>

      <Form.Item labelCol={{ span: 2 }}
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
      <Form.Item labelCol={{ span: 2 }}
        labelAlign="left"
        name="password"
        label="Mật khẩu"
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
      </Form.Item>
      <Form.Item labelCol={{ span: 2 }}
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
      </Form.Item>
      {/*Chức Vụ  */}
      <Form.Item labelCol={{ span: 2 }}
        labelAlign="left" name="role" label="Chức Vụ"
        rules={[{
          required: true,
          message: "vui lòng nhập đầy đủ thông tin"
        }]}
      >
        <Select placeholder="Chọn">
          <Select.Option value="4">
            Nhân Viên
          </Select.Option>
          <Select.Option value="3">
            Quản lí dự án
          </Select.Option>
          <Select.Option value="2">
            Quản lí
          </Select.Option>
        </Select >
      </Form.Item>
      <Form.Item labelCol={{ span: 2 }}
        labelAlign="left"
        name="submit" >
        <Button type="primary" htmlType='submit' >Thêm Nhân Viên</Button>
      </Form.Item>
    </Form>
  )
}

export default CreateEmployee