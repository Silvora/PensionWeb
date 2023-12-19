/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 菜单权限信息
*/

import http from '../index'


/**
 * Summary 新增菜单
*/
interface TypeSysMenuAddResponse{    
}

export function SysMenuAdd(data:TypeSysMenuAddResponse): Promise<any>{
    return http.request({
        url: `/sysMenu/add`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 根据ID批量删除菜单
*/
interface TypeSysMenuDeleteResponse{
    ids?:undefined    
}

export function SysMenuDelete(data:TypeSysMenuDeleteResponse): Promise<any>{
    return http.request({
        url: `/sysMenu/delete`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 根据ID删除菜单
*/
interface TypeSysMenuDeleteIdResponse{
    id?:number    
}

export function SysMenuDeleteId(params:TypeSysMenuDeleteIdResponse): Promise<any>{
    return http.request({
        url: `/sysMenu/delete/${params.id}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
       // params
    })
}

/**
 * Summary 查询当前用户菜单下的按钮
*/
interface TypeSysMenuQueryActionsByUserPidResponse{
    pid?:number    
}

export function SysMenuQueryActionsByUserPid(params:TypeSysMenuQueryActionsByUserPidResponse): Promise<any>{
    return http.request({
        url: `/sysMenu/queryActionsByUser/${params.pid}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}

/**
 * Summary 查询所有菜单信息
*/
interface TypeSysMenuQueryAllResponse{    
}

export function SysMenuQueryAll(params:TypeSysMenuQueryAllResponse): Promise<any>{
    return http.request({
        url: `/sysMenu/queryAll`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}

/**
 * Summary 查询一级菜单目录
*/
interface TypeSysMenuQueryAllMenuDirResponse{    
}

export function SysMenuQueryAllMenuDir(params:TypeSysMenuQueryAllMenuDirResponse): Promise<any>{
    return http.request({
        url: `/sysMenu/queryAllMenuDir`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}

/**
 * Summary 根据角色获取菜单信息
*/
interface TypeSysMenuQueryByRoleRoleIdResponse{
    roleId?:number    
}

export function SysMenuQueryByRoleRoleId(params:TypeSysMenuQueryByRoleRoleIdResponse): Promise<any>{
    return http.request({
        url: `/sysMenu/queryByRole/${params.roleId}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    })
}

/**
 * Summary 查询当前用户所有菜单
*/
interface TypeSysMenuQueryByUserResponse{    
}

export function SysMenuQueryByUser(params:TypeSysMenuQueryByUserResponse): Promise<any>{
    return http.request({
        url: `/sysMenu/queryByUser`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}

/**
 * Summary 修改菜单信息
*/
interface TypeSysMenuUpdateIdResponse{
    id?:number    
}

export function SysMenuUpdateId(data:TypeSysMenuUpdateIdResponse): Promise<any>{
    return http.request({
        url: `/sysMenu/update/${data.id}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}