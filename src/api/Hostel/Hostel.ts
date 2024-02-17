/**
*  @Date 2024/02/02 14:20:11
*  @Auth 
*  @Desc 宿舍管理
*/

import http from '../index'

// 获取宿舍列表
export function HostelFloorlList(params: {hostelId:string}) {
    return http.request({
        url: '/admin/hostel/floor/list',
        method: 'get',
        params: params,
    })
}


// 删除宿舍楼层
export function HostelFloorlRemoveId(params: {id:string},data:any) {
    return http.request({
        url: '/admin/hostel/floor/remove',
        method: 'delete',
        params:params,
        data
    })
}


// 添加宿舍楼层
export function HostelFloorSave(data:any) {
    return http.request({
        url: '/admin/hostel/floor/save',
        method: 'post',
        data
    })
}

// 修改宿舍楼层
export function HostelFloorUpdate(data:any) {
    return http.request({
        url: '/admin/hostel/floor/update',
        method: 'post',
        data
    })
}

// 宿舍楼栋列表
export function HostelList() {
    return http.request({
        url: '/admin/hostel/list',
        method: 'get',
    })
}


// 删除宿舍楼栋
export function HostelRemoveId(data: {id:string}) {
    return http.request({
        url: `/admin/hostel/remove/${data.id}`,
        method: 'delete',
        data
    })
}

// 宿舍楼层中房间列表
export function HostelRoomListOfFloor(params: {floorId:string, needBed:boolean}) {
    return http.request({
        url: '/admin/hostel/room/listOfFloor',
        method: 'get',
        params:params
    })
}

// 删除宿舍房间
export function HostelRoomRemoveId(data:any) {
    return http.request({
        url: '/admin/hostel/room/remove',
        method: 'get',
        data
    })
}

// 添加宿舍房间
export function HostelRoomSave(data:any) {
    return http.request({
        url: '/admin/hostel/room/save',
        method: 'post',
        data
    })
}


// 修改宿舍房间
export function HostelRoomUpdate(data:any) {
    return http.request({
        url: '/admin/hostel/room/update',
        method: 'post',
        data
    })
}


// 宿舍房间中床位列表
export function HostelRoomBedListOfRoom(params: {roomId:string}) {
    return http.request({
        url: '/admin/hostel/roomBed/listOfRoom',
        method: 'get',
        params:params
    })
}


// 删除宿舍房间床位
export function HostelRoomBedRemoveId(params:{id:string},data:any) {
    return http.request({
        url: '/admin/hostel/roomBed/remove',
        method: 'get',
        params:params,
        data
    })
}


// 添加宿舍房间床位
export function HostelRoomBedSave(data:any) {
    return http.request({
        url: '/admin/hostel/roomBed/save',
        method: 'post',
        data
    })
}


// 修改宿舍房间床位
export function HostelRoomBedUpdate(data:any) {
    return http.request({
        url: '/admin/hostel/roomBed/update',
        method: 'post',
        data
    })
}


// 添加宿舍楼栋
export function HostelSave(data:any) {
    return http.request({
        url: '/admin/hostel/save',
        method: 'post',
        data
    })
}

// 修改宿舍楼栋
export function HostelUpdate(data:any) {
    return http.request({
        url: '/admin/hostel/update',
        method: 'post',
        data
    })
}