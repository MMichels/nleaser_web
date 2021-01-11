import axios from 'axios';
import { getToken } from './auth';
import environment from '../configs/enviroment.dev';


const api = axios.create({
    baseURL: environment["api_url"]
});


api.interceptors.request.use(async config => {
    const token = getToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if(error.response){
        return Promise.reject(error.response.data);
    }
    return error;
})

export default api