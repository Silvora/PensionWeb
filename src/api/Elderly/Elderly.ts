/**
*  @Date 2024/02/02 14:20:11
*  @Auth 
*  @Desc 老人管理
*/

import http from '../index'


// 长者列表
export function ElderlyList(params: any) { 
    return http.request({
        url: '/admin/elderly/list',
        method: 'get',
        params
    })
}

// 未入住长者列表
export function ElderlyListNotCheckIn(params: any) { 
    return http.request({
        url: '/admin/elderly/list/notCheckIn',
        method: 'get',
        params
    })
}

// 删除长者
export function ElderlyRemoveId(data:any) { 
    return http.request({
        url: `/admin/elderly/remove/${data.id}`,
        method: 'delete',
        data,
    })
}

// 新增长者
export function ElderlySave(data: any) { 
    return http.request({
        url: '/admin/elderly/save',
        method: 'post',
        data
    })
}

// 修改长者
export function ElderlyUpdate(data: any) { 
    return http.request({
        url: '/admin/elderly/update',
        method: 'post',
        data
    })
}


// 获取长者入院信息
export function ElderlyAdmissionElderlyId(data: any) { 
    return http.request({
        url: `/admin/elderly/admission/${data.elderlyId}`,
        method: 'post',
        data
    })
}

// 添加长者入院信息
export function ElderlyAdmissionSave(data: any) { 
    return http.request({
        url: '/admin/elderly/admission/save',
        method: 'post',
        data
    })
}

// 添加长者健康信息
export function ElderlyHealthSave(data: any) { 
    return http.request({
        url: '/admin/elderly/health/save',
        method: 'post',
        data
    })
}

// 修改长者健康信息
export function ElderlyHealthUpdate(data: any) { 
    return http.request({
        url: '/admin/elderly/health/update',
        method: 'post',
        data
    })
}

// 获取长者健康信息
export function ElderlyHealthElderlyId(data: any) { 
    return http.request({
        url: `/admin/elderly/health/${data.elderlyId}`,
        method: 'post',
        data
    })
}




