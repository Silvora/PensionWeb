/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 用户订单
*/

import http from '../index'


/**
 * Summary 下单
*/
interface TypeUserOrderAddResponse{    
}

export function UserOrderAdd(data:TypeUserOrderAddResponse): Promise<any>{
    return http.request({
        url: `/userOrder/add`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 分页查询
*/
interface TypeUserOrderQueryPagePageSizeResponse{
    currentPage?:number
    pageSize?:number    
}

export function UserOrderQueryPagePageSize(data:TypeUserOrderQueryPagePageSizeResponse): Promise<any>{
    return http.request({
        url: `/userOrder/query/${data.currentPage}/${data.pageSize}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 修改金额
*/
interface TypeUserOrderUpdateTotalFeeIdTotalFeeResponse{
    id?:string
    totalFee?:number    
}

export function UserOrderUpdateTotalFeeIdTotalFee(params:TypeUserOrderUpdateTotalFeeIdTotalFeeResponse): Promise<any>{
    return http.request({
        url: `/userOrder/updateTotalFee/${params.id}/${params.totalFee}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        //params
    })
}