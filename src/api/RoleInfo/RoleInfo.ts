/**
*  @Date 2024/02/02 14:20:11
*  @Auth 
*  @Desc 角色信息
*/

import http from '../index'

// 添加角色
export function Role(data:any) {
    return http.request({
        url: '/role',
        method: 'post',
        data
    })
}


// 获取角色id
export function RoleId(data:any) {
    return http.request({
        url: `/role/${data.id}`,
        method: 'get',
    })
}



// 获取角色列表
export function RoleList(params:any) {
    return http.request({
        url: `/role/list`,
        method: 'get',
        params,
    })
}

// 下架角色
export function RoleOffline (data:any) {
    return http.request({
        url: `/role/offline`,
        method: 'put',
        data
    })
}

// 批量下架角色
export function RoleOfflineBatch (data:any) {
    return http.request({
        url: `/role/offlineBatch`,
        method: 'put',
        data
    })
}

// 上架角色
export function RoleOnline (data:any) {
    return http.request({
        url: `/role/online`,
        method: 'put',
        data
    })
}

// 批量上架角色
export function RoleOnlineBatch (data:any) {
    return http.request({
        url: `/role/onlineBatch`,
        method: 'put',
        data
    })
}

// 删除角色
export function RoleRemoveId (data:any) {
    return http.request({
        url: `/role/remove/${data.id}`,
        method: 'delete',
        // data
    })
}

// 批量删除角色
export function RoleRemoveBatch(data:any) {
    return http.request({
        url: `/role/removeBatch`,
        method: 'delete',
        data
    })
}


// 更新角色
export function RoleUpdateId(params:any,data:any) {
    return http.request({
        url: `/role/update/${params.id}`,
        method: 'put',
        data
    })
}
