/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 角色权限信息
*/

import http from '../index'


/**
 * Summary 新增角色权限菜单
*/
interface TypeSysRoleMenuAddRoleIdResponse{
    roleId?:number
    menuIds?:undefined    
}

export function SysRoleMenuAddRoleId(data:TypeSysRoleMenuAddRoleIdResponse): Promise<any>{
    return http.request({
        url: `/sysRoleMenu/add/${data.roleId}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data:data.menuIds
    })
}

/**
 * Summary 删除角色权限菜单
*/
interface TypeSysRoleMenuDeleteRoleIdResponse{
    roleId?:number    
}

export function SysRoleMenuDeleteRoleId(params:TypeSysRoleMenuDeleteRoleIdResponse): Promise<any>{
    return http.request({
        url: `/sysRoleMenu/delete/${params.roleId}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}