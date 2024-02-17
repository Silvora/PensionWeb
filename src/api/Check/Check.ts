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
        url: `/admin/checkIn/${data.id}`,
        method: 'delete',
    })
}