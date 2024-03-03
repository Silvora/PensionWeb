/**
*  @Date 2024/02/02 14:20:11
*  @Auth 
*  @Desc 设备管理
*/

import http from '../index'


// 添加设备使用记录
export function DeviceAddUsageRecord(data: any) {
    return http.request({
        url: '/admin/device/addUsageRecord',
        method: 'post',
        data
    })
}

// 获取设备详情
export function DeviceDetailId(data: any) {
    return http.request({
        url: `/admin/device/detail/${data.id}`,
        method: 'get',
        data
    })
}

// 获取设备
export function DeviceList(params: any) {
    return http.request({
        url: '/admin/device/list',
        method: 'get',
        params
    })
}

// 删除设备
export function DeviceRemoveId(data: any) {
    return http.request({
        url: `/admin/device/remove/${data.id}`,
        method: 'delete',
        data
    })
}

// 批量删除
export function DeviceRemoveBatch(data: any) {
    return http.request({
        url: '/admin/device/removeBatch',
        method: 'delete',
        data
    })
}

// 修改设备
export function DeviceUpdate(data: any) {
    return http.request({
        url: '/admin/device/update',
        method: 'post',
        data
    })
}

// 新增设备
export function DeviceSave(data: any) {
    return http.request({
        url: '/admin/device/save',
        method: 'post',
        data
    })
}

// 停止使用设备
export function DeviceStopUsage(data: any) {
    return http.request({
        url: '/admin/device/stopUsage',
        method: 'post',
        data
    })
}

// 设备使用记录
export function DeviceUsageRecordList(data: any) {
    return http.request({
        url: '/admin/device/usageRecordList',
        method: 'get',
        data
    })
}