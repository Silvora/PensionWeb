/**
*  @Date 2024/02/02 14:20:11
*  @Auth 
*  @Desc 收费项目管理
*/

import http from '../index'


// 添加收费项目
export function ChargeSave(data:any) {
    return http.request({
        url: '/admin/charge/save',
        method: 'post',
        data
    })
}

// 获取收费项目
export function ChargeList(params:any) {
    return http.request({
        url: `/admin/charge/list`,
        method: 'get',
        params
    })
}

// 修改收费项目
export function ChargeUpdate(data:any) {
    return http.request({
        url: '/admin/charge/update',
        method: 'post',
        data
    })
}

// 删除收费项目
export function ChargeRemoveId(data:any) {
    return http.request({
        url: `/admin/charge/${data.id}`,
        method: 'delete',
    })
}


