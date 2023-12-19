/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 系统配置信息
*/

import http from '../index'


/**
 * Summary 根据KEY获取配置信息
*/
interface TypeSysDictGetKeyResponse{
    key?:string    
}

export function SysDictGetKey(params:TypeSysDictGetKeyResponse): Promise<any>{
    return http.request({
        url: `/sysDict/get/${params.key}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}

/**
 * Summary 根据父级KEY获取配置信息
*/
interface TypeSysDictGetByParentParentKeyResponse{
    parentKey?:string    
}

export function SysDictGetByParentParentKey(params:TypeSysDictGetByParentParentKeyResponse): Promise<any>{
    return http.request({
        url: `/sysDict/getByParent/${params.parentKey}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        //params
    })
}