import styled from 'styled-components'
import { Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import isActive from "../../Helpers/isActive"
import statusProject from "../../Helpers/statusProject"
import { Link, useNavigate } from 'react-router-dom'
import { Switch, Spin } from 'antd';
import apiEmployee from '../../Api/apiEmployee';
export const TitleInput = styled.h5`
    margin: 10px 0 3px 5px;
    font-size: 15px;
`

const InputFileContainer = styled.label`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 130px;
    width: 130px;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    cursor: pointer;   
    text-align: center;
`
export const InputImage = ({ title, onChange, avatar, name }) => {
    return (
        <div>
            <TitleInput>{title}</TitleInput>
            <InputFileContainer htmlFor='input-image' style={{ position: "relative", "Zindex": "1000" }}>
                <img src={avatar} style={{ width: "100%", height: "100%", position: "absolute", "Zindex": "-1" }} />
                <PlusOutlined style={{ fontSize: "20px" }} />
                Chọn ảnh
            </InputFileContainer>
            <input type="file" id="input-image" name={name} onChange={onChange} style={{ display: "none" }} />
        </div>
    )
}

export const ContentContainer = styled.div`
    padding: 30px;
    height: calc(100vh - 50px);
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 7px;
    }
    ::-webkit-scrollbar-thumb {
        background: gray;
    }
`

export const StatusTag = (status, setIsActive, active) => {
    let navigate = useNavigate()
    if (status.isActive)
        return (
            <div style={{ display: "flex", width: 140, justifyContent: "space-between" }}>
                <p onClick={() => { navigate(`/infoemployee/${status.emp_id}`) }} style={{ color: "blue", cursor: "pointer" }}> Xem </p>
                <p onClick={async () => {
                    isActive(status.emp_id, { isActive: !status.isActive })
                    setTimeout(() => { setIsActive(!active) }, 0)
                }

                } style={{ color: "green", cursor: "pointer" }}>hoạt động</p>

            </div>
        )
    else {
        return (
            <div style={{ display: "flex", width: 140, justifyContent: "space-between" }}>
                <p onClick={() => { navigate(`/infoemployee/${status.emp_id}`) }} style={{ color: "blue", cursor: "pointer" }}> Xem </p>
                <p onClick={() => {
                    isActive(status.emp_id, { isActive: !status.isActive })
                    setTimeout(() => { setIsActive(!active) }, 0)
                }} style={{ color: "red", cursor: "pointer" }}>Đã Chặn</p>
            </div>
        )
    }
}

export const StatusTagProject = (project, setStatusProject, status) => {
    let navigate = useNavigate()
    if (project.status === '1')
        return (
            <div style={{ display: "flex", width: 140, justifyContent: "space-between" }}>
                <p onClick={() => { navigate(`/infoProject/${project.project_id}`) }} style={{ color: "blue", cursor: "pointer" }}> Xem </p>
                <p style={{ color: "green", cursor: "pointer" }}>hoàn thành</p>

            </div>
        )
    else if (project.status === '2') {
        return (<div style={{ display: "flex", width: 140, justifyContent: "space-between" }}>
            <p onClick={() => { navigate(`/infoProject/${project.project_id}`) }} style={{ color: "blue", cursor: "pointer" }}> Xem </p>
            <p onClick={async () => {
                await statusProject(project.project_id, { status: 1 })
                await apiEmployee.putEndDate({end_date:new Date().toISOString().slice(0, 10),project_id:project.project_id})
                setTimeout(() => { setStatusProject(1) }, 0)
            }
            } style={{ color: "blue", cursor: "pointer" }}>thi công</p>

        </div>)
    }
    else if (project.status === '3') {
        return (
            <div style={{ display: "flex", width: 140, justifyContent: "space-between" }}>
                <p onClick={() => { navigate(`/infoProject/${project.project_id}`) }} style={{ color: "blue", cursor: "pointer" }}> Xem </p>
                <p onClick={async () => {
                    statusProject(project.project_id, { status: 2 })
                    setTimeout(() => { setStatusProject(2) }, 0)
                }

                } style={{ color: "orange", cursor: "pointer" }}>chờ</p>

            </div>
        )
    }
    else {
        return <div style={{ display: "flex", width: 140, justifyContent: "space-between" }}>
            <p onClick={() => { navigate(`/infoProject/${project.project_id}`) }} style={{ color: "blue", cursor: "pointer" }}> Xem </p>
            <p onClick={async () => {
                statusProject(project.project_id, { status: 3 })
                setTimeout(() => { setStatusProject(3) }, 0)
            }

            } style={{ color: "red", cursor: "pointer" }}>Hủy</p>

        </div>
    }
}

export const statusProjectItem = (status,id,st,setSt) => {
    if (status === '1') return <p style={{ color: "green" }} >Hoàn thành </p>
    if (status === '2') return <p
    onClick = {
        async ()=>{
            await statusProject(id, { status: 1 })
            await apiEmployee.putEndDate({end_date:new Date().toISOString().slice(0, 10),project_id:id})
            setSt(!st)
        }
    }
    style={{ color: "blue" }}>Đang thi công</p>
    if (status === '3') return <p
    onClick = {
        async ()=>{
            await statusProject(id, { status: 2 })
            setSt(!st)
        }
    }
    style={{ color: "orange" }}>Chuẩn bị thi công</p>
    else return <p style={{ color: 'red' }}>Hủy</p>
}
export const switchStatus = (id, action, setaction) => {

    return <div style={{ position: 'relative', left: 300 }} >
        <div>
            <Switch
                checkedChildren="acitve"
                unCheckedChildren="block"
                style={{ margin: "0 0 3px 0" }}
                checked={action}
                onClick={async () => {
                    isActive(id, { isActive: !action })
                    setTimeout(() => { setaction(!action) }, 0)
                }
                } />
        </div>
        <p style={{color:"blue"}}>Trạng thái</p>

    </div>
}
export const Sex = (sex) => {
    if (sex === "M")
        return (
            <p>Nam</p>
        )
    else if (sex === "F")
        return (
            <p>Nữ</p>
        )
    else if (sex === "K")
        return (
            <p>Giới Tính Khác</p>
        )
    else return (
        <div>Không xác định</div>
    )
}

export const Role = (role) => {
    if (role === "1")
        return (
            <Tag style={{ width: "120px", textAlign: "center", color: "red" }}>Admin</Tag>
        )
    else if (role === "2")
        return (
            <Tag style={{ width: "120px", textAlign: "center", color: "green" }}>Quản lí</Tag>
        )
    else if (role === "3")
        return (
            <Tag style={{ width: "120px", textAlign: "center", color: "orange" }}>Quản lí dự án</Tag>
        )
    else if (role === "4") {
        return (
            <Tag style={{ width: "120px", textAlign: "center" }}>Nhân Viên</Tag>
        )
    }
    else return (
        <div>Không xác định</div>
    )
}

export const SearchInput = styled.input`
    width: 250px;
    border: 0px;
    border-bottom: 1px solid #d9d9d9;
    padding: 3px;
    margin-left: 30px;
    &:focus {
        outline: none;
        border-bottom: 1px solid #40a9ff;
    }
`

