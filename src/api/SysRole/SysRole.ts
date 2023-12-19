/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 角色信息
*/

import http from '../index'


/**
 * Summary 新增
*/
interface TypeSysRoleAddResponse{    
}

export function SysRoleAdd(data:TypeSysRoleAddResponse): Promise<any>{
    return http.request({
        url: `/sysRole/add`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 根据ID删除
*/
interface TypeSysRoleDeleteIdResponse{
    id?:number    
}

export function SysRoleDeleteId(params:TypeSysRoleDeleteIdResponse): Promise<any>{
    return http.request({
        url: `/sysRole/delete/${params.id}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}

/**
 * Summary 分页查询
*/
interface TypeSysRoleQueryPagePageSizeResponse{
    page?:number
    pageSize?:number    
}

export function SysRoleQueryPagePageSize(data:TypeSysRoleQueryPagePageSizeResponse): Promise<any>{
    return http.request({
        url: `/sysRole/query/${data.page}/${data.pageSize}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 查询所有角色
*/
interface TypeSysRoleQueryAllResponse{    
}

export function SysRoleQueryAll(data:TypeSysRoleQueryAllResponse): Promise<any>{
    return http.request({
        url: `/sysRole/queryAll`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 修改
*/
interface TypeSysRoleUpdateIdResponse{
    id?:number    
}

export function SysRoleUpdateId(data:TypeSysRoleUpdateIdResponse): Promise<any>{
    return http.request({
        url: `/sysRole/update/${data.id}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}