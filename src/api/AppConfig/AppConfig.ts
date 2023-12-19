/**
*  @Date 2023/11/09 14:33:19
*  @Auth 
*  @Desc APP配置信息
*/

import http from '../index'


/**
 * Summary 新增
*/
interface TypeAppConfigAddResponse{    
}

export function AppConfigAdd(data:TypeAppConfigAddResponse): Promise<any>{
    return http.request({
        url: `/appConfig/add`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 根据ID删除
*/
interface TypeAppConfigDeleteIdResponse{
    id?:string    
}

export function AppConfigDeleteId(params:TypeAppConfigDeleteIdResponse): Promise<any>{
    return http.request({
        url: `/appConfig/delete/${params.id}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        //params
    })
}

/**
 * Summary 获取详细信息APP配置信息
*/
interface TypeAppConfigGetResponse{    
}

export function AppConfigGet(params:TypeAppConfigGetResponse): Promise<any>{
    return http.request({
        url: `/appConfig/get`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}