import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(req => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

axiosInstance.interceptors.response.use(
    response => {
        return response.data;
    },
    async error => {
        // todo: handle expired token
        if (error.code === "ERR_BAD_RESPONSE") {
            console.log(error.message);
            throw error;
        }
        throw error.response.data;
    }
);

export { axiosInstance };
