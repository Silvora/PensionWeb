/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 皮肤拍摄检测结果
*/

import http from '../index'


/**
 * Summary 根据ID获取详细信息
*/
interface TypeDiagnosisSkinGetIdResponse{
    id?:string    
}

export function DiagnosisSkinGetId(params:TypeDiagnosisSkinGetIdResponse): Promise<any>{
    return http.request({
        url: `/diagnosisSkin/get/${params.id}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}

/**
 * Summary 分页查询皮肤检测
*/
interface TypeDiagnosisSkinQueryPagePageSizeResponse{
    page?:number
    pageSize?:number    
}

export function DiagnosisSkinQueryPagePageSize(data:TypeDiagnosisSkinQueryPagePageSizeResponse): Promise<any>{
    return http.request({
        url: `/diagnosisSkin/query/${data.page}/${data.pageSize}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 查询当前ID之前的检测记录
*/
interface TypeDiagnosisSkinQueryHisIdPagePageSizeResponse{
    id?:string
    page?:number
    pageSize?:number    
}

export function DiagnosisSkinQueryHisIdPagePageSize(params:TypeDiagnosisSkinQueryHisIdPagePageSizeResponse): Promise<any>{
    return http.request({
        url: `/diagnosisSkin/queryHis/${params.id}/${params.page}/${params.pageSize}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}