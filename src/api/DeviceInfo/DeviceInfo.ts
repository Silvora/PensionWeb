/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 设备信息
*/

import http from '../index'


/**
 * Summary 添加设备
*/
interface TypeDeviceInfoAddResponse{    
}

export function DeviceInfoAdd(data:TypeDeviceInfoAddResponse): Promise<any>{
    return http.request({
        url: `/deviceInfo/add`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 分页查询
*/
interface TypeDeviceInfoQueryPagePageSizeResponse{
    currentPage?:number
    pageSize?:number    
}

export function DeviceInfoQueryPagePageSize(data:TypeDeviceInfoQueryPagePageSizeResponse): Promise<any>{
    return http.request({
        url: `/deviceInfo/query/${data.currentPage}/${data.pageSize}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 重新激活
*/
interface TypeDeviceInfoResetIdResponse{
    id?:number    
}

export function DeviceInfoResetId(data:TypeDeviceInfoResetIdResponse): Promise<any>{
    return http.request({
        url: `/deviceInfo/reset/${data.id}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 更新设备信息
*/
interface TypeDeviceInfoUpdateIdResponse{
    id?:number    
}

export function DeviceInfoUpdateId(data:TypeDeviceInfoUpdateIdResponse): Promise<any>{
    return http.request({
        url: `/deviceInfo/update/${data.id}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 修改设备号
*/
interface TypeDeviceInfoUpdateDeviceNoIdResponse{
    id?: number,
    deviceNo?: string
}

export function DeviceInfoUpdateDeviceNoId(data:TypeDeviceInfoUpdateDeviceNoIdResponse): Promise<any>{
    return http.request({
        url: `/deviceInfo/updateDeviceNo/${data.id}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}