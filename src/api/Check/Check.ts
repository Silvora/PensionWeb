/**
*  @Date 2024/02/02 14:20:11
*  @Auth 
*  @Desc 入住管理
*/

import http from '../index'


// 添加入住
export function CheckSave(data:any) {
    return http.request({
        url: '/admin/checkIn/save',
        method: 'post',
        data
    })
}

// 删除入住
export function CheckRemoveId(data:any) {
    return http.request({
        url: `/admin/checkIn/remove/${data.bedId}`,
        method: 'delete',
    })
}


// 取消重点关注老人
export function CheckCancelFocus(data:any) {
    return http.request({
        url: '/admin/checkIn/cancelFocus',
        method: 'post',
        data
    })
}


// 重点关注老人
export function CheckFocus(data:any) {
    return http.request({
        url: '/admin/checkIn/focus',
        method: 'post',
        data
    })
}

// 获取入住列表
export function CheckList(params:any) {
    return http.request({
        url: '/admin/checkIn/list',
        method: 'get',
        params
    })
}

// 获取入住列表
export function CheckAboutToExpireList(params:any) {
    return http.request({
        url: '/admin/checkIn/aboutToExpireList',
        method: 'get',
        params
    })
}