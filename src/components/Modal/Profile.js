import React, { useState,useEffect } from 'react';
import { Modal, Button ,Input,Select} from 'antd';
import apiEmployee from '../../Api/apiEmployee';
import openNotificationWithIcon from '../../Helpers/notifycation';
export const ChangeInputValue = (visible,setvisible,value,setValue,editValue,setEditValue,title) => {
    const [loading,setLoading] = useState(false);
    const [checknull,setCheckNull] = useState(true)
    const handle = (e)=>{
    setEditValue({...value,[title]:e.target.value})
    setCheckNull(e.target.value)
  }
  const handle2 = (e)=>{
    setEditValue({...value,[title]:e})
  }
  const handleOk = () => {
    setLoading(true)
    apiEmployee.putProfile(value.emp_id,editValue).then((res)=>{
        openNotificationWithIcon("success","Đã sửa đổi")
        setvisible(false);
        setLoading(false);
        setValue(editValue)
    })
    .catch(e=>
        {
            setLoading(false);
            setvisible(false);
            openNotificationWithIcon("error",'Email hoặc SĐT đã tồn tại')
        }
        )
  };

  const handleCancel = () => {
    setvisible(false);
  };

  return (
    <>
      <Modal confirmLoading={loading || !checknull} title="Chỉnh Sửa" visible={visible} onOk={handleOk} onCancel={handleCancel}>
        {
         title ==="sex" ?
         <Select style={{width:200}} value={editValue[title]} onChange={handle2} placeholder="Chọn">
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
        :
        <Input value={editValue[title]} onChange={handle}></Input>
        }
      </Modal>
    </>
  );
};