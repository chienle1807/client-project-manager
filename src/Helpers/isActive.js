import notification from "./notifycation"
import apiEmployee from '../Api/apiEmployee'
 const isActive = async (id,data) => {
    try {
      const res = await apiEmployee.putActive(id,data);
      // notification("success","Thành Công")
    } catch (err) {
      notification("error","Bạn không thể chăn người này")
    }
  }
  export default isActive