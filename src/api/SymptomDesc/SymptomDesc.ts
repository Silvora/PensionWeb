/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 症状话术
*/

import http from '../index'


/**
 * Summary 查询单个症状话术
*/
interface TypeSymptomDescGetResponse{    
}

export function SymptomDescGet(data:TypeSymptomDescGetResponse): Promise<any>{
    return http.request({
        url: `/symptomDesc/get`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 查询所有
*/
interface TypeSymptomDescQueryAllResponse{    
}

export function SymptomDescQueryAll(data:TypeSymptomDescQueryAllResponse): Promise<any>{
    return http.request({
        url: `/symptomDesc/queryAll`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 修改
*/
interface TypeSymptomDescUpdateIdResponse{
    id?:string    
}

export function SymptomDescUpdateId(data:TypeSymptomDescUpdateIdResponse): Promise<any>{
    return http.request({
        url: `/symptomDesc/update/${data.id}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}