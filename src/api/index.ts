import { getToken } from '@/utils/token';
import axios from 'axios'

import { Message } from "view-ui-plus";

const http = axios.create({
    baseURL: '/api',
    timeout: 30000
})

/* 请求拦截器 */
http.interceptors.request.use(
    async (config) => {
        /**  */
        const token =  await getToken('ing-Token')
        config.headers['token'] = token
        
        return config
    },
    (error) => Promise.reject(error)
)

/* 响应拦截器 */
http.interceptors.response.use(
    (response) => {

        if (!response.data) {
            Message.error(response.data.msg);
            return Promise.resolve(response.data);
        }
        // 请求成功
        if (response.data.code === 200 || response.data.code === 0) {
            return Promise.resolve(response.data);
        }
        // 请求成功，状态不为成功时
        Message.error(response.data.message);
        return Promise.reject(new Error(response.data.message));
    },
    (error) => {
        // console.log(error)
        Message.error(error.message);
        //Message.error(error.response.data.message);
        return Promise.reject(error);
    }
)


export default http
