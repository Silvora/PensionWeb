/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc OSS接口
*/

import http from '../index'


/**
 * Summary 获取OSS凭证
*/
interface TypeOssGetCredentialResponse{    
}

export function OssGetCredential(params:TypeOssGetCredentialResponse): Promise<any>{
    return http.request({
        url: `/oss/getCredential`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}