/**
*  @Date 2024/02/02 14:20:11
*  @Auth 
*  @Desc 组织管理
*/

import http from '../index'

export function OrgDetail(params: any) {
    return http.request({
        url: '/org/detail',
        method: 'get',
        params
    })
}

export function OrgIncomeStatistics(params: any) {
    return http.request({
        url: '/org/incomeStatistics',
        method: 'get',
        params
    })
}

export function OrgUpdate(data: any) {
    return http.request({
        url: '/org/update',
        method: 'post',
        data
    })
}