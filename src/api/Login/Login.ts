/**
*  @Date 2024/02/02 14:20:11
*  @Auth 
*  @Desc 登录
*/

import http from '../index'


export function Login(data:any) {
    return http.request({
        url: '/auth/login',
        method: 'post',
        data
    })
}


// 退出
export function LoginOut() {
    return http.request({
        url: '/auth/loginOut',
        method: 'get',
    })
}