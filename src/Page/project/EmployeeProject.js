import { Button, Divider } from "antd";
import {
  Skeleton,
  Select,
  Switch,
  Card,
  Avatar,
  Form,
  Input,
  Modal,
  AutoComplete,
} from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import apiProject from "./Api/apiProject";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Sex } from "../../components/custom/Customize";
import { AuthContext } from "../../Auth/AuthContext";
import openNotificationWithIcon from "../../Helpers/notifycation";
import { UserOutlined } from "@ant-design/icons";
import React from "react";

const container = {
  padding: "20px",
};
const row = {
  display: "flex",
  justifyContent: "space-between",
};
const divider = {
  width: "100%",
  height: "1px",
  backgroundColor: "black",
};
let incre = 0;
const EmployeeProject = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [visible, setvisible] = useState(false);
  const [visible1, setvisible1] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [emp_id, setemp_id] = useState(null);
  const [dataproject, setdataproject] = useState({});
  const [CompeleteEmp, setCompeleteEmp] = useState([]);
  const [Employee, setEmployee] = useState("");
  const [emp_id_insert, setemp_id_insert] = useState(null);
  const productivity = [
    25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300,
  ];
  const renderItem = (title) => ({
    value: title,
    label: (
      <div key={title}>
        <UserOutlined />
        <span>{title}</span>
      </div>
    ),
  });
  const options1 = CompeleteEmp.map((item) => {
    return { options: [renderItem(item.email)] };
  });
  const onChange1 = (email) => {
    const insertEmployee = async () => {
      try {
        const res = await apiProject.getEmployeeAutoComplete({ email });
        setCompeleteEmp(res);
      } catch (err) {
        console.log(err);
      }
    };
    insertEmployee();
  };
  useEffect(() => {
    const infoproject = async () => {
      console.log("chienkem")
      try {
        const res = await apiProject.getInfoEmployee(id);
        setEmployee(res.data_emp.map((item) => item.email));
        setData(res.data_emp);
        setdataproject(res.data_project);
      } catch (err) {
        console.log(err);
      }
    };
    infoproject();
  }, [visible]);
  const { Meta } = Card;
  return (
    <div style={container}>
      <div>
        <h1>{dataproject.name}</h1>
        <div style={row}>
          <h2>Thành Viên</h2>
          <div></div>
          {/* <Button onClick={()=>{setvisible1(true)}} type="primary">Thêm thành viên</Button> */}
        </div>
        <div style={divider}></div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data.map((item) => {
          return (
            <Card
              style={{ width: 350, position: "relative", margin: "16px 20px" }}
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={`${item.name}`}
                description={Sex(item.sex)}
              />
              <p
                className="ability"
                onClick={() => {
                  console.log(item.emp_id);
                  setemp_id(item.emp_id);
                  setvisible(true);
                }}
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                Đánh giá
              </p>
              <div>
                <span style={{ fontSize: 15, fontWeight: 500 }}>
                  Manmonth:{" "}
                </span>
                <span>{item.manmonth}tháng</span>
              </div>
              <div>
                <span style={{ fontSize: 15, fontWeight: 500 }}>
                  Nhận xét:{" "}
                </span>
                <span>{item.ability}</span>
              </div>
              <div>
                <span style={{ fontSize: 15, fontWeight: 500 }}>
                  Đánh giá năng lực:{" "}
                </span>
                <span>{item.productivity || "chưa có đánh giá"}</span>
              </div>
            </Card>
          );
        })}
      </div>
      <Modal
        onCancel={() => {
          setvisible(false);
        }}
        visible={visible}
        footer={[]}
      >
        <Form
          form={form}
          onFinish={(data) => {
            const ability = async () => {
              try {
                await apiProject.ability({
                  ...data,
                  project_id: dataproject.id,
                  emp_id: emp_id,
                });
                setvisible(false);
                form.resetFields();
              } catch (err) {
                console.log(err);
              }
            };
            ability();
          }}
        >
          <Form.Item
            labelCol={{ span: 3 }}
            labelAlign="left"
            name="productivity"
            rules={[
              {
                required: true,
                message: "vui lòng nhập đầy đủ thông tin",
              },
            ]}
          >
            <Select style={{ marginTop: 25 }} placeholder="Năng suất làm việc">
              {productivity.map((item) => {
                return (
                  <Select.Option
                    key={item.id}
                    value={item}
                  >{`${item}%`}</Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            style={{ marginTop: 20 }}
            labelCol={{ span: 7 }}
            labelAlign="left"
            name="ability"
            rules={[
              {
                required: true,
                message: "vui lòng nhập đầy đủ thông tin",
              },
            ]}
          >
            <TextArea rows={4} placeholder="Đánh giá năng lực" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={() => {}}>
              Đánh giá
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* <Modal
        onCancel={() => { setvisible1(false) }}
        visible={visible1}
        footer={[]}
      > */}
      {/* <Form
          form={form}
          onFinish={(data) => {
            console.log(data)
            form.resetFields();
            const insertEmployee = async () => {
              try {
                  if (!Employee.includes(data.email)) {
                    setvisible1(false)
                  }
                  else {
                    openNotificationWithIcon("error", "nhân viên đã được thêm trước đo")
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
      </Modal> */}
    </div>
  );
};

export default EmployeeProject;
