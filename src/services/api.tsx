import axios, { AxiosInstance } from 'axios';
import { getToken } from './auth';
import environment from '../configs/enviroment';


const api: AxiosInstance = axios.create({
    baseURL: environment["api_url"]
});


api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(response => {
    if (response.data)
        return response.data;
    else
        return response
}, error => {
    console.log("Api error: ");
    if (error.response && error.response.data) {
        console.log(error.response);
        if (error.response.status === 403) {
            window.location.assign(`/login?logout=true&error=${error.response.data.error}`);
            return;
        }
        else
            return Promise.reject(error.response.data);
    } if (!error.status) {
        return Promise.reject({
            "status": "offline",
            "error": "A aplicação esta em manutenção no momento, tente novamente mais tarde"
        });
    }
    console.log(error);
    return Promise.reject(error);
})

export default api