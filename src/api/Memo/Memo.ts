/**
*  @Date 2024/02/02 14:20:11
*  @Auth 
*  @Desc 备忘录管理
*/

import http from '../index'

export const MemoList = (params: any) => {
    return http.request({
        url: '/admin/memo/list',
        method: 'get',
        params
    })
}


export const MemoSave = (data: any) => {
    return http.request({
        url: '/admin/memo/save',
        method: 'post',
        data
    })
}

export const MemoUpdate = (data: any) => {
    return http.request({
        url: '/admin/memo/update',
        method: 'post',
        data
    })
}

export const MemoRemoveId = (data: any) => {
    return http.request({
        url: `/admin/memo/remove/${data.id}`,
        method: 'delete',
        data
    })
}
