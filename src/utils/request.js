import axios from "axios"
import router from "@/router";

const instance = axios.create({
    baseURL: 'http://sell.h5.itsource.cn:8087',
    timeout: 10000,
});
// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        // 携带token
        config.headers.Authorization = "Bearer " + sessionStorage.getItem('token')
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);
// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        // 响应码在2xx时触发
        return response;
    },
    function (error) {
        // 响应码在200以外的时候触发
        // 对响应错误做点什么
        console.log(error);
        if (error.response.status == 401) {
            router.push('/login')
        }
        return Promise.reject(error);
    }
);
export default instance