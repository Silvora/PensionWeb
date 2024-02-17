/**
*  @Date 2024/02/02 14:20:11
*  @Auth 
*  @Desc 角色权限
*/

import http from '../index'

// 保存角色权限
export function RolePermission(data:any) {
    return http.request({
        url: '/rolePermission',
        method: 'put',
        data
    })
}

// 获取角色权限
export function RolePermissionId(data:any) {
    return http.request({
        url: `/rolePermission/${data.id}`,
        method: 'get',
    })
}
