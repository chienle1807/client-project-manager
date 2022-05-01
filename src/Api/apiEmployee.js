import axiosClient from "./axiosClient";

const apiEmployee = {
    getAllProject: (query) => {
        const url = `/project`;
        return axiosClient.get(url,{
            params: query
        });
    },
    get: (query) => {
        const url = `/employee`;
        return axiosClient.get(url,{
            params: query
        });
    },
    getAuth:()=>{
        const url = `/auth`;
        return axiosClient.get(url);
    },

    putProfile: (id, data) => {
        const url = `/profile/edit/${id}`;
        return axiosClient.put(url, data);
    },

    putActive: (id, data) => {
        const url = `/employee/edit/active/${id}`;
        return axiosClient.put(url, data);
    },
    putStatus: (id, data) => {
        const url = `/project/edit/status/${id}`;
        return axiosClient.put(url, data);
    },
    putEndDate: (data) => {
        const url = `/project/end_date`;
        return axiosClient.put(url,data);
    },

    //


}

export default apiEmployee;