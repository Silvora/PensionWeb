/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 用户管理
*/

import http from '../index'


/**
 * Summary 分页查询
*/
interface TypeUserQueryPagePageSizeResponse{
    currentPage?:number
    pageSize?:number    
}

export function UserQueryPagePageSize(data:TypeUserQueryPagePageSizeResponse): Promise<any>{
    return http.request({
        url: `/user/query/${data.currentPage}/${data.pageSize}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 修改
*/
interface TypeUserUpdateIdResponse{
    id?:string    
}

export function UserUpdateId(data:TypeUserUpdateIdResponse): Promise<any>{
    return http.request({
        url: `/user/update/${data.id}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 重置密码
*/
interface TypeUserUpdatePwdByAdminUserIdResponse{
    userId?:string    
}

export function UserUpdatePwdByAdminUserId(data:TypeUserUpdatePwdByAdminUserIdResponse): Promise<any>{
    return http.request({
        url: `/user/updatePwdByAdmin/${data.userId}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}