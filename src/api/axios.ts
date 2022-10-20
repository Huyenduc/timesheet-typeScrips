import axiosinstance from 'axios'
import {BASE_URL} from "./endpoint";
import appConstants from '../constants/appConstants';


const apiCallStack = []

const axios = axiosinstance.create({
    baseURL: BASE_URL,
    timeout: 30000
})

axios.interceptors.request.use(function (config: any) {

    const userToken = localStorage.getItem(appConstants.USER_TOKEN)

    const backgroundCall = config.data && config.data.background === true

    if (!backgroundCall) {
        apiCallStack.push(config.url)
    }

    const headers = {
        'Content-type': 'application/json;charset=UTF-8'
    }
    if (userToken){
       config.headers.Authorization = `Bearer ${userToken}`;
    }

    config.headers.common = headers;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


axios.interceptors.response.use(function (response) {

    return response;
}, function (error) {

    return Promise.reject(error);
});

export default axios;

