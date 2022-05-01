import axiosClient from "../../../Api/axiosClient";

const apiProfile = {
   

    getProfile:()=>{
        const url = `/profile`;
        return axiosClient.get(url);
    },
    //

    putProfile: (id, data) => {
        const url = `/profile/edit/${id}`;
        return axiosClient.put(url, data);
    },
    //

}

export default apiProfile;