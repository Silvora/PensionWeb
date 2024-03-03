/**
*  @Date 2024/02/02 14:20:11
*  @Auth 
*  @Desc 护理接口
*/

import http from '../index'

// 绑定老人
export const NurseRecordBind = (data:any) => {
    return http.request({
        url: '/admin/nursing/record/bind',
        method: 'post',
        data
    })
}

// 绑定老人列表
export const NurseRecordBindList = (params:any) => {
    return http.request({
        url: '/admin/nursing/record/bindList',
        method: 'get',
        params
    })
}

// 解除绑定老人
export const NurseRecordUnBindId = (data:any) => {
    return http.request({
        url: `/admin/nursing/record/unbind/${data.id}`,
        method: 'delete',
        data
    })
}

// 护理任务列表
export const NurseTaskList = (params:any) => {
    return http.request({
        url: '/admin/nursing/task/list',
        method: 'get',
        params
    })
}
// 删除护理任务列表
export const NurseTaskRemoveId = (data:any) => {
      return http.request({
        url: `/admin/nursing/task/remove/${data.id}`,
        method: 'delete',
        data
    })
}

// 添加护理任务
export const NurseTaskSave = (data:any) => {
    return http.request({
        url: '/admin/nursing/task/save',
        method: 'post',
        data
    })
}

// 开始或结束护理任务
export const NurseTaskStartOrEndTaskId = (data:any) => {
     return http.request({
        url: `/admin/nursing/task/startOrEndTask/${data.id}`,
        method: 'delete',
        data
    })
}

// 修改护理任务
export const NurseTaskUpdate = (data:any) => {
    return http.request({
        url: '/admin/nursing/task/updata',
        method: 'post',
        data
    })
}