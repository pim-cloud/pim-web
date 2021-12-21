import axios from 'axios'
import store from '../store/index'
import { ElMessage } from "element-plus";


const service = axios.create({
    baseURL: import.meta.env.VITE_APP_HTTP_URL,
    timeout: 5000,
})

service.interceptors.request.use(
    config => {
        const token = store.state.global.token;
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
service.interceptors.response.use(
    response => {
        if (response.status === 200 && response.data) {
            switch (response.data.code) {
                case 200:
                    return Promise.resolve(response.data)
                case 202:
                    ElMessage.error(response.data.msg);
                    return Promise.reject();
                case 0:
                    ElMessage.error(response.data.msg);
                    return Promise.reject();
                default:
                    return Promise.reject();
            }

        } else {
            return Promise.reject(new Error('请求失败'))
        }
    },
    error => {
        if (error.response) {
            this.$router.replace({
                path: "/login",
                query: { redirect: this.$router.currentRoute.fullPath } //登录成功后跳入浏览的当前页面
            });
            switch (error.response.status) {
                case 401:
                    ElMessage.error('token过期，请重新登录')
                    store.commit("delToken");
                    break;
                case 500:
                    ElMessage.error('服务器暂时无响应');
                    break;
                case 404:
                    ElMessage.error('资源不存在');
                    break;
            }
        } else {
            ElMessage({
                message: '请求超时，请重试',
                grouping: true,
                type: 'error',
            })
        }
        return Promise.reject(error)
    }
)

export default service