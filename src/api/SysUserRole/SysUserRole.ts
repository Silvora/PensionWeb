/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 用户角色信息
*/

import http from '../index'


/**
 * Summary 分配用户角色
*/
interface TypeSysUserRoleAddUserIdResponse{
    userId?:number
    roleIds?:undefined    
}

export function SysUserRoleAddUserId(data:TypeSysUserRoleAddUserIdResponse): Promise<any>{
    return http.request({
        url: `/sysUserRole/add/${data.userId}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 查询当前用户所有角色信息
*/
interface TypeSysUserRoleQueryByUserUserIdResponse{
    userId?:string    
}

export function SysUserRoleQueryByUserUserId(params:TypeSysUserRoleQueryByUserUserIdResponse): Promise<any>{
    return http.request({
        url: `/sysUserRole/queryByUser/${params.userId}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}