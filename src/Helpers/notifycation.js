
import {notification} from "antd"
 const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      topLeft:10
    });
  };
  export default openNotificationWithIcon;