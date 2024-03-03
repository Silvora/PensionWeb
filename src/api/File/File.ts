/**
*  @Date 2024/02/02 14:20:11
*  @Auth 
*  @Desc 文件上传
*/

import http from '../index'

export function FileUploadImage(data: any) {
    return http.request({
        url: '/file/uploadImage',
        method: 'post',
        data
    })
}
