import axiosClient from "../../../Api/axiosClient";

const apiProject = {
    getAllProject: (query) => {
        const url = `/project`;
        return axiosClient.get(url,{
            params: query
        });
    },
    getInfo:(id)=>{
        const url = `/${id}`;
        return axiosClient.get(url);
    },
    getInfoEmployee:(id)=>{
        const url = `project/info/${id}`;
        return axiosClient.get(url);
    },
    getEmployee: (data) => {
        const url = `/project/employee/insert`;
        return axiosClient.post(url,data);
    },
    getManager: (data) => {
        const url = `/project/manager/insert`;
        return axiosClient.post(url,data);
    },
    getEmployeeAutoComplete: (data) => {
        const url = `/project/employee/autoComplete`;
        return axiosClient.post(url,data);
    },
    insertProject: (data) => {
        const url = `/project/insert`;
        return axiosClient.post(url,data);
    },
    searchQ:(q) => {
        const url = `/project/searchQ`;
        return axiosClient.get(url,{
            params: q
        });
    },
    getProjectItem:(id)=>{
        const url = `/project/${id}`;
        return axiosClient.get(url);
    },
    ability:(data)=>{
        const url = `/project/ability`;
        return axiosClient.put(url,data);
    }
}

export default apiProject;