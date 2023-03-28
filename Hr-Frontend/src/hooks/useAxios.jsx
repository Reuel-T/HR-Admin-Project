import axios from "axios";
import { useContext } from "react";
import  TokenUserContext  from '../context/TokenUserContext';

const useAxios = () => {
    const { token } = useContext(TokenUserContext);

    const axiosInstance = axios.create({
        baseURL: "http://localhost:5252/",
        headers: {
            "Content-type": "application/json"
        }
    });

    axiosInstance.interceptors.request.use((config) => {
        console.log(token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    return axiosInstance;
}

export default useAxios;