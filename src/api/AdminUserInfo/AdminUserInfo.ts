/**
*  @Date 2024/02/02 14:20:11
*  @Auth 
*  @Desc 管理员用户
*/

import http from '../index'

// 创建管理员用户
export function AdminUser(data:any) {
    return http.request({
        url: '/adminUser',
        method: 'post',
        data
    })
}


// 获取用户信息
export function AdminUserGetId(data:any) {
    return http.request({
        url: `/adminUser/${data.id}`,
        method: 'get',
        data
    })
}


// 修改用户
export function AdminUserPutId(params:any,data:any) {
    return http.request({
        url: `/adminUser/${params.id}`,
        method: 'put',
        data
    })
}


// 获取个人信息和权限
export function AdminUserInfo() {
    return http.request({
        url: '/adminUser/info',
        method: 'get',
    })
}

// 获取用户列表
export function AdminUserList(params:any) {
    return http.request({
        url: '/adminUser/list',
        method: 'get',
        params
    })
}


// 下架用户
export function AdminUserOffline(data:any) {
    return http.request({
        url: '/adminUser/offline',
        method: 'put',
        data
    })
}

// 批量下架用户
export function AdminUserOfflineBatch(data:any) {
    return http.request({
        url: '/adminUser/offlineBatch',
        method: 'put',
        data
    })
}


// 上架用户
export function AdminUserOnline(data:any) {
    return http.request({
        url: '/adminUser/online',
        method: 'put',
        data
    })
}

// 批量上架用户
export function AdminUserOnlineBatch(data:any) {
    return http.request({
        url: '/adminUser/onlineBatch',
        method: 'put',
        data
    })
}



// 删除用户
export function AdminUserRemove(data:any) {
    return http.request({
        url: `/adminUser/remove/${data.userId}`,
        method: 'delete',
        data
    })
}

// 删除用户
export function AdminUserRemoveBatch(data:any) {
    return http.request({
        url: '/adminUser/removeBatch',
        method: 'delete',
        data
    })
}


//重置用户密码
export function AdminUserResetPassword(data:any) {
   return http.request({
        url: `/adminUser/resetPassword/${data.id}`,
        method: 'put',
        data
    })
}


//重置用户密码
export function AdminUserUpdatePassword(data:any) {
    return http.request({
        url: `/adminUser/updatePassword`,
        method: 'put',
        data
    })
}

//修改用户状态
export function AdminUserUpdateStatus(data:any) {
    return http.request({
        url: '/adminUser/updateStatus',
        method: 'put',
        data
    })
}