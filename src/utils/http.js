//封装http 
import axios from 'axios';
import router from '../router/index';
import Vue from 'vue';

const http = axios.create({
    baseURL: 'http://112.74.99.5:3000/web/api'
});

http.interceptors.request.use(function (config) {
    if (localStorage.getItem('token') && localStorage.getItem('id')) {
        //添加请求头
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status == 401 || error.response.status == 402) {
        //重新登录
        router.push('/login');
        Vue.prototype.$toast.fail(error.response.data.message);
    }
    return Promise.reject(error);
});

export default http;