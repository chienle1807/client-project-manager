import axiosClient from "../../../Api/axiosClient";
const apiAuth = {
    updatatePassword: ( data) => { 
        const url = `/changepassword`;
        return axiosClient.put(url, data);
    },
}
export default apiAuth;