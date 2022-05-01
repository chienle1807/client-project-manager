import React from 'react'
import { Switch } from 'antd';
import { useState } from 'react';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import Project from '../project/Project'
import Home from '../home/Home'
const ContainerProject = () => {
    const [istable,setisTable] = useState(true)
    const handleSwitchOnChange = (e)=>{
        if(e) setisTable(true)
        else setisTable(false)
    }
    const d=new Date()
  return (
    <div>
        <Switch style={{margin:"10px 0 0 20px"}} onChange={handleSwitchOnChange} checkedChildren="Table" unCheckedChildren="Card" defaultChecked />
        {istable ? <Project/> : <Home/>}
    </div>
  )
}

export default ContainerProject