/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 产品方案
*/

import http from '../index'


/**
 * Summary 新增
*/
interface TypeProductAddResponse{    
}

export function ProductAdd(data:TypeProductAddResponse): Promise<any>{
    return http.request({
        url: `/product/add`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 根据ID删除
*/
interface TypeProductDeleteIdResponse{
    id?:string    
}

export function ProductDeleteId(params:TypeProductDeleteIdResponse): Promise<any>{
    return http.request({
        url: `/product/delete/${params.id}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}

/**
 * Summary 根据ID获取详细信息
*/
interface TypeProductGetIdResponse{
    id?:string    
}

export function ProductGetId(params:TypeProductGetIdResponse): Promise<any>{
    return http.request({
        url: `/product/get/${params.id}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}

/**
 * Summary 分页查询
*/
interface TypeProductQueryPagePageSizeResponse{
    currentPage?:number
    pageSize?:number    
}

export function ProductQueryPagePageSize(data:TypeProductQueryPagePageSizeResponse): Promise<any>{
    return http.request({
        url: `/product/query/${data.currentPage}/${data.pageSize}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 修改
*/
interface TypeProductUpdateIdResponse{
    id?:string    
}

export function ProductUpdateId(data:TypeProductUpdateIdResponse): Promise<any>{
    return http.request({
        url: `/product/update/${data.id}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}