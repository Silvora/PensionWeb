/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 门店设备管理
*/

import http from '../index'


/**
 * Summary 新增
*/
interface TypeShopDeviceAddResponse{    
}

export function ShopDeviceAdd(data:TypeShopDeviceAddResponse): Promise<any>{
    return http.request({
        url: `/shopDevice/add`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 根据ID删除
*/
interface TypeShopDeviceDeleteDeviceNoResponse{
    deviceNo?:string    
}

export function ShopDeviceDeleteDeviceNo(params:TypeShopDeviceDeleteDeviceNoResponse): Promise<any>{
    return http.request({
        url: `/shopDevice/delete/${params.deviceNo}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
       // params
    })
}

/**
 * Summary 查询门店下所有设备
*/
interface TypeShopDeviceQueryResponse{    
}

export function ShopDeviceQuery(data:TypeShopDeviceQueryResponse): Promise<any>{
    return http.request({
        url: `/shopDevice/query`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}