/**
*  @Date 2024/02/02 14:20:11
*  @Auth 
*  @Desc 员工管理
*/

import http from '../index'

// 获取取员工详情
export function StaffDetailId(data: any) {
    return http.request({
        url: `/admin/staff/detail/${data.id}`,
        method: 'GET',
    })
}

// 获取员工性别占比
export function StaffGenderRatio() { 
    return http.request({
        url: `/admin/staff/genderRatio`,
        method: 'GET',
    })
}

// 获取员工职业等级占比
export function StaffJobLevelRatio() {
    return http.request({
        url: `/admin/staff/jobLevelRatio`,
        method: 'GET'
    })
}

// 员工列表
export function StaffList( params:any ) {
    return http.request({
        url: `/admin/staff/list`,
        method: 'GET',
        params:params
    })
}



// 删除员工
export function StaffRemoveId(data: any) {
    return http.request({
        url: `/admin/staff/remove/${data.id}`,
        method: 'delete',
        data
    })
}


// 批量删除员工
export function StaffRemoveBatch(data: any) {
    return http.request({
        url: `/admin/staff/removeBatch`,
        method: 'delete',
        data
    })
}

// 添加员工
export function StaffSave(data: any) {
    return http.request({
        url: `/admin/staff/save`,
        method: 'post',
        data
    })
}

// 更新员工
export function StaffUpdate(data: any) {
    return http.request({
        url: `/admin/staff/update`,
        method: 'post',
        data
    })
}


// 当日所有员工排班列表
export function StaffScheduleListOfDay(params:any) { 
    return http.request({
        url: `/admin/staff/scheduleListOfDay`,
        params:params,
        method: 'get',
    })
}


// 员工当月排班列表
export function StaffScheduleListOfMonth(params:any) {
    return http.request({
        url: `/admin/staff/scheduleListOfMonth`,
        params:params,
        method: 'get',
    })
}

// 添加员工排班
export function StaffScheduleSave(data: any) { 
    return http.request({
        url: `/admin/staff/schedule/save`,
        method: 'post',
        data
    })
}

// 添加员工排班
export function StaffScheduleUpdate(data: any) { 
    return http.request({
        url: `/admin/staff/schedule/update`,
        method: 'post',
        data
    })
}

// 删除员工排班
export function StaffScheduleRemoveId(data: any) { 
    return http.request({
        url: `/admin/staff/schedule/remove/${data.id}`,
        method: 'delete',
        data
    })
}