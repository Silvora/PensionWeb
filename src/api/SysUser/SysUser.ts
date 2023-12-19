/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 管理员信息
*/

import http from '../index'


/**
 * Summary 新增管理员
*/
interface TypeSysUserAddResponse{    
}

export function SysUserAdd(data:TypeSysUserAddResponse): Promise<any>{
    return http.request({
        url: `/sysUser/add`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 分页查询
*/
interface TypeSysUserQueryPagePageSizeResponse{
    currentPage?:number
    pageSize?:number    
}

export function SysUserQueryPagePageSize(data:TypeSysUserQueryPagePageSizeResponse): Promise<any>{
    return http.request({
        url: `/sysUser/query/${data.currentPage}/${data.pageSize}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 修改
*/
interface TypeSysUserUpdateIdResponse{
    id?:string    
}

export function SysUserUpdateId(data:TypeSysUserUpdateIdResponse): Promise<any>{
    return http.request({
        url: `/sysUser/update/${data.id}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 修改角色
*/
interface TypeSysUserUpdateRoleIdResponse{
    id?:string    
}

export function SysUserUpdateRoleId(data:TypeSysUserUpdateRoleIdResponse): Promise<any>{
    return http.request({
        url: `/sysUser/updateRole/${data.id}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 停用0/启用1
*/
interface TypeSysUserUpdateStatusIdStatusResponse{
    id?:string
    status?:number    
}

export function SysUserUpdateStatusIdStatus(params:TypeSysUserUpdateStatusIdStatusResponse): Promise<any>{
    return http.request({
        url: `/sysUser/updateStatus/${params.id}/${params.status}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
       // params
    })
}