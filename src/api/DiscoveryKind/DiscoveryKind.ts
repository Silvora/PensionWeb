/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 发现栏目管理
*/

import http from '../index'


/**
 * Summary 新增
*/
interface TypeDiscoveryKindAddResponse{    
}

export function DiscoveryKindAdd(data:TypeDiscoveryKindAddResponse): Promise<any>{
    return http.request({
        url: `/discoveryKind/add`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 根据ID删除
*/
interface TypeDiscoveryKindDeleteIdResponse{
    id?:string    
}

export function DiscoveryKindDeleteId(params:TypeDiscoveryKindDeleteIdResponse): Promise<any>{
    return http.request({
        url: `/discoveryKind/delete/${params.id}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        //params
    })
}

/**
 * Summary 根据ID获取详细信息
*/
interface TypeDiscoveryKindGetIdResponse{
    id?:string    
}

export function DiscoveryKindGetId(params:TypeDiscoveryKindGetIdResponse): Promise<any>{
    return http.request({
        url: `/discoveryKind/get/${params.id}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}

/**
 * Summary 分页查询
*/
interface TypeDiscoveryKindQueryPagePageSizeResponse{
    currentPage?:number
    pageSize?:number    
}

export function DiscoveryKindQueryPagePageSize(data:TypeDiscoveryKindQueryPagePageSizeResponse): Promise<any>{
    return http.request({
        url: `/discoveryKind/query/${data.currentPage}/${data.pageSize}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 查询所有栏目
*/
interface TypeDiscoveryKindQueryAllResponse{    
}

export function DiscoveryKindQueryAll(data:TypeDiscoveryKindQueryAllResponse): Promise<any>{
    return http.request({
        url: `/discoveryKind/queryAll`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 修改
*/
interface TypeDiscoveryKindUpdateIdResponse{
    id?:string    
}

export function DiscoveryKindUpdateId(data:TypeDiscoveryKindUpdateIdResponse): Promise<any>{
    return http.request({
        url: `/discoveryKind/update/${data.id}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}