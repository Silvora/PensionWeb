/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 发现接口
*/

import http from '../index'


/**
 * Summary 新增
*/
interface TypeDiscoveryInfoAddResponse{    
}

export function DiscoveryInfoAdd(data:TypeDiscoveryInfoAddResponse): Promise<any>{
    return http.request({
        url: `/discoveryInfo/add`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 根据ID删除
*/
interface TypeDiscoveryInfoDeleteIdResponse{
    id?:string    
}

export function DiscoveryInfoDeleteId(params:TypeDiscoveryInfoDeleteIdResponse): Promise<any>{
    return http.request({
        url: `/discoveryInfo/delete/${params.id}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        //params
    })
}

/**
 * Summary 根据ID获取详细信息
*/
interface TypeDiscoveryInfoGetIdResponse{
    id?:string    
}

export function DiscoveryInfoGetId(data:TypeDiscoveryInfoGetIdResponse): Promise<any>{
    return http.request({
        url: `/discoveryInfo/get/${data.id}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 分页查询
*/
interface TypeDiscoveryInfoQueryPagePageSizeResponse{
    currentPage?:number
    pageSize?:number    
}

export function DiscoveryInfoQueryPagePageSize(data:TypeDiscoveryInfoQueryPagePageSizeResponse): Promise<any>{
    return http.request({
        url: `/discoveryInfo/query/${data.currentPage}/${data.pageSize}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 修改
*/
interface TypeDiscoveryInfoUpdateIdResponse{
    id?:string    
}

export function DiscoveryInfoUpdateId(data:TypeDiscoveryInfoUpdateIdResponse): Promise<any>{
    return http.request({
        url: `/discoveryInfo/update/${data.id}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}