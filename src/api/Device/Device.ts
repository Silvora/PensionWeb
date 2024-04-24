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

// 设备状态比例
export function DeviceStateRatio(data: any) {
    return http.request({
        url: `/admin/device/deviceStateRatio`,
        method: 'get',
        data
    })
}
// 设备类型比例
export function DeviceTypeRatio(data: any) {
    return http.request({
        url: `/admin/device/deviceTypeRatio`,
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

// 日志列表
export function DeviceLogList(params: any) {
    return http.request({
        url: '/admin/device/logList',
        method: 'get',
        params
    })
}


// 设备离线
export function DeviceOfflineBatch(data: any) {
    return http.request({
        url: '/admin/device/offlineBatch',
        method: 'put',
        data
    })
}


// 设备在线
export function DeviceOnlineBatch(data: any) {
    return http.request({
        url: '/admin/device/onlineBatch',
        method: 'put',
        data
    })
}


// 睡眠设备日报
export function DeviceSleepDeviceDayReport(params: any) {
    return http.request({
        url: '/admin/device/sleepDevice/dayReport',
        method: 'get',
        params
    })
}


// 睡眠设备连续监测天数
export function DeviceSleepDeviceDetectionDays(params: any) {
    return http.request({
        url: '/admin/device/sleepDevice/detectionDays',
        method: 'get',
        params
    })
}


// 睡眠设备日报 按分钟心率 呼吸数据
export function DeviceSleepDeviceHeartRateByMinute(params: any) {
    return http.request({
        url: '/admin/device/sleepDevice/heartRateByMinute',
        method: 'get',
        params
    })
}

// 睡眠设备日报信息
export function DeviceSleepDeviceReportDate(data: any) {
    return http.request({
        url: '/admin/device/sleepDevice/reportDate',
        method: 'get',
        data
    })
}


// 获取睡眠设备-实时心率、呼吸率
export function DeviceSleepDeviceStatus() {
    return http.request({
        url: '/admin/device/sleepDevice/status',
        method: 'get',
    })
}


// mac获取睡眠设备-实时心率、呼吸率
export function DeviceSleepDeviceCurrentData(params: any) {
    return http.request({
        url: '/admin/device/sleepDevice/currentData',
        method: 'get',
        params
    })
}

// 警告日志
export function DeviceWarningLog(params:any) {
    return http.request({
        url: '/admin/device/warningLog',
        method: 'get',
        params
    })
}
