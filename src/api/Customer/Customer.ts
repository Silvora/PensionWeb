/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 客户管理
*/

import http from '../index'


/**
 * Summary 根据ID获取详细信息
*/
interface TypeCustomerGetIdResponse{
    id?:string    
}

export function CustomerGetId(params:TypeCustomerGetIdResponse): Promise<any>{
    return http.request({
        url: `/customer/get/${params.id}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
       // params
    })
}

/**
 * Summary 分页查询
*/
interface TypeCustomerQueryPagePageSizeResponse{
    currentPage?:number
    pageSize?:number    
}

export function CustomerQueryPagePageSize(data:TypeCustomerQueryPagePageSizeResponse): Promise<any>{
    return http.request({
        url: `/customer/query/${data.currentPage}/${data.pageSize}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}