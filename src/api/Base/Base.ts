/**
*  @Date 2024/02/02 14:20:11
*  @Auth 
*  @Desc 基础接口
*/

import http from '../index'


export function GetBaseSetting(){
    return http.request({
        url: '/base/setting',
        method: 'get',
    })
}


export function BaseSetting(data:any){
    return http.request({
        url: '/base/setting',
        method: 'post',
        data
    })
}