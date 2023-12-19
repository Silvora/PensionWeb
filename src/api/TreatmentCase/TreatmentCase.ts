/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 治疗案例
*/

import http from '../index'


/**
 * Summary 新增
*/
interface TypeTreatmentCaseAddResponse{    
}

export function TreatmentCaseAdd(data:TypeTreatmentCaseAddResponse): Promise<any>{
    return http.request({
        url: `/treatmentCase/add`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 根据ID删除
*/
interface TypeTreatmentCaseDeleteIdResponse{
    id?:string    
}

export function TreatmentCaseDeleteId(params:TypeTreatmentCaseDeleteIdResponse): Promise<any>{
    return http.request({
        url: `/treatmentCase/delete/${params.id}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        //params
    })
}

/**
 * Summary 根据ID获取详细信息
*/
interface TypeTreatmentCaseGetIdResponse{
    id?:string    
}

export function TreatmentCaseGetId(params:TypeTreatmentCaseGetIdResponse): Promise<any>{
    return http.request({
        url: `/treatmentCase/get/${params.id}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}

/**
 * Summary 分页查询
*/
interface TypeTreatmentCaseQueryPagePageSizeResponse{
    currentPage?:number
    pageSize?:number    
}

export function TreatmentCaseQueryPagePageSize(data:TypeTreatmentCaseQueryPagePageSizeResponse): Promise<any>{
    return http.request({
        url: `/treatmentCase/query/${data.currentPage}/${data.pageSize}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 修改
*/
interface TypeTreatmentCaseUpdateIdResponse{
    id?:string    
}

export function TreatmentCaseUpdateId(data:TypeTreatmentCaseUpdateIdResponse): Promise<any>{
    return http.request({
        url: `/treatmentCase/update/${data.id}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}