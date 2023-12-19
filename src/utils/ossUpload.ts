import OSS from 'ali-oss'
import md5 from 'js-md5'

//oss上传文件
/**
 * @param ossInfo oss信息
 * @param name 文件名称
 * @param prefix 文件前缀
 * @param file 文件
 * @param callback 回调
 * @returns 文件名称
 */
function UploadFile(ossInfo: any = {}, prefix: string, name: any, file: any, callback: any) {
  let client = new OSS(ossInfo)
  let fileName = name.split('.')[0] // uid/oemId/file

  //fileName.split('/')

  let fileType = name.split('.')[1]

  return client.multipartUpload(
    prefix + md5(fileName + Date.now()) + '.' + fileType,
    file,
    callback
  )
}

export default UploadFile
