/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc OEM信息
*/

import http from '../index'


/**
 * Summary 查询所有OEM信息
*/
interface TypeOemInfoQueryAllResponse{    
}

export function OemInfoQueryAll(data:TypeOemInfoQueryAllResponse): Promise<any>{
    return http.request({
        url: `/oemInfo/queryAll`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}