
import axiosClient from "../../../Api/axiosClient";
const apiEmployee = {
    get: (query) => {
        const url = `/employee`;
        return axiosClient.get(url,{
            params: query
        });
    }, 

    post: (data) => {
        const url = `/employee/insert`;
        return axiosClient.post(url, data);
    },
    
    getInfo:(id)=>{
        const url = `/employee/${id}`;
        return axiosClient.get(url);
    },

    put: (id, data) => {
        const url = `/employee/edit/${id}`;
        return axiosClient.put(url, data);
    },

    searchQ:(q) => {
        const url = `/searchQ`;
        return axiosClient.get(url,{
            params: q
        });
    }
}

export default apiEmployee;