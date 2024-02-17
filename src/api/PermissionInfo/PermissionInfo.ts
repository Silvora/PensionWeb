/**
*  @Date 2024/02/02 14:20:11
*  @Auth 
*  @Desc 权限信息
*/

import http from '../index'


// 添加权限
export function Permission(data:any) {
    return http.request({
        url: '/permission',
        method: 'post',
        data
    })
}


// 获取权限
export function PermissionId(params:any) {
    return http.request({
        url: `/permission/${params.id}`,
        method: 'get',
    })
}

// 获取权限
export function PermissionList(params:any) {
    return http.request({
        url: `/permission/list`,
        method: 'get',
        params
    })
}

// 修改权限
export function PermissionPutId(params:any,data:any) {
    return http.request({
        url: `/permission/${data.id}`,
        method: 'put',
        params,
        data
    })
}

// 删除权限
export function PermissionRemoveId(data:any) {
    return http.request({
        url: `/permission/${data.id}`,
        method: 'delete',
    })
}