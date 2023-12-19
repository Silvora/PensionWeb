/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 检测标注图信息
*/

import http from '../index'


/**
 * Summary 分页查询
*/
interface TypeDiagnosisMarkImgQueryPagePageSizeResponse{
    currentPage?:number
    pageSize?:number    
}

export function DiagnosisMarkImgQueryPagePageSize(data:TypeDiagnosisMarkImgQueryPagePageSizeResponse): Promise<any>{
    return http.request({
        url: `/diagnosisMarkImg/query/${data.currentPage}/${data.pageSize}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}