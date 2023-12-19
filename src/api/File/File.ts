/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 文件操作接口
*/

import http from '../index'


/**
 * Summary 访问文件
*/
interface TypeFileGetResponse{    
}

export function FileGet(data:TypeFileGetResponse): Promise<any>{
    return http.request({
        url: `/file/get`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 上传文件(不能以/开头)
*/
interface TypeFilePutResponse{
    path?:string
    file?:file    
}

export function FilePut(data:TypeFilePutResponse): Promise<any>{
    return http.request({
        url: `/file/put`,
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'},
        data
    })
}

/**
 * Summary 访问文件(地址方式)
*/
interface TypeFilePathResponse{
    path?:string    
}

export function FilePath(params:TypeFilePathResponse): Promise<any>{
    return http.request({
        url: `/file/${params.path}/**`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}