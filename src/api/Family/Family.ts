/**
*  @Date 2024/02/02 14:20:11
*  @Auth 
*  @Desc 家属管理
*/

import http from '../index'

// 家属列表
export function FamilyList() {
    return http.request({
        url: '/admin/family/list',
        method: 'GET',
        params: {
        }
    })
}


// 删除家属
export function FamilyRemoveId(data:any) {
    return http.request({
        url: `/admin/remove/${data.id}`,
        method: 'delete',
        data
    })
}


// 添加家属
export function FamilySave(data:any) {
    return http.request({
        url: '/admin/family/save',
        method: 'post',
        data
    })
}


// 修改家属
export function FamilyUpdate(data:any) {
    return http.request({
        url: '/admin/family/update',
        method: 'post',
        data
    })
}