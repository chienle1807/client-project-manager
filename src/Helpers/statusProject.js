import notification from "./notifycation"
import apiEmployee from '../Api/apiEmployee'
 const statusProject = async (id,data) => {
    try {
      const res = await apiEmployee.putStatus(id,data);
      // notification("success","Thành Công")
    } catch (err) {
      notification("error","Bạn không đủ quyền để thực hiện")
    }
  }
  export default statusProject