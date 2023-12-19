/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 广告管理
*/

import http from '../index'


/**
 * Summary 新增
*/
interface TypeAdInfoAddResponse{    
}

export function AdInfoAdd(data:TypeAdInfoAddResponse): Promise<any>{
    return http.request({
        url: `/adInfo/add`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 根据ID删除
*/
interface TypeAdInfoDeleteIdResponse{
    id?:string    
}

export function AdInfoDeleteId(params:TypeAdInfoDeleteIdResponse): Promise<any>{
    return http.request({
        url: `/adInfo/delete/${params.id}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        //params
    })
}

/**
 * Summary 分页查询
*/
interface TypeAdInfoQueryPagePageSizeResponse{
    currentPage?:number
    pageSize?:number    
}

export function AdInfoQueryPagePageSize(data:TypeAdInfoQueryPagePageSizeResponse): Promise<any>{
    return http.request({
        url: `/adInfo/query/${data.currentPage}/${data.pageSize}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 修改
*/
interface TypeAdInfoUpdateIdResponse{
    id?:string    
}

export function AdInfoUpdateId(data:TypeAdInfoUpdateIdResponse): Promise<any>{
    return http.request({
        url: `/adInfo/update/${data.id}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}