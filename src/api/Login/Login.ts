/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 登录
*/

import http from '../index'

/**
 * Summary 登录接口
*/

interface TypeLoginResponse{
    username?:string
    password?:string    
}

export function Login(data:TypeLoginResponse): Promise<any>{
    return http.request({
        url: `/login`,
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'},
        data
    })
}