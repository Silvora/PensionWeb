/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 门店管理
*/

import http from '../index'


/**
 * Summary 新增
*/
interface TypeShopInfoAddResponse{    
}

export function ShopInfoAdd(data:TypeShopInfoAddResponse): Promise<any>{
    return http.request({
        url: `/shopInfo/add`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 根据ID获取详细信息
*/
interface TypeShopInfoGetIdResponse{
    id?:string    
}

export function ShopInfoGetId(params:TypeShopInfoGetIdResponse): Promise<any>{
    return http.request({
        url: `/shopInfo/get/${params.id}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}

/**
 * Summary 分页查询
*/
interface TypeShopInfoQueryPagePageSizeResponse{
    currentPage?:number
    pageSize?:number    
}

export function ShopInfoQueryPagePageSize(data:TypeShopInfoQueryPagePageSizeResponse): Promise<any>{
    return http.request({
        url: `/shopInfo/query/${data.currentPage}/${data.pageSize}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 修改
*/
interface TypeShopInfoUpdateIdResponse{
    id?:string    
}

export function ShopInfoUpdateId(data:TypeShopInfoUpdateIdResponse): Promise<any>{
    return http.request({
        url: `/shopInfo/update/${data.id}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 启用/禁用
*/
interface TypeShopInfoUpdateStatusIdStatusResponse{
    id?:string
    status?:number    
}

export function ShopInfoUpdateStatusIdStatus(params:TypeShopInfoUpdateStatusIdStatusResponse): Promise<any>{
    return http.request({
        url: `/shopInfo/updateStatus/${params.id}/${params.status}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
       // params
    })
}