/**
*  @Date 2023/10/27 15:42:25
*  @Auth 
*  @Desc 验证码
*/

import http from '../index'


/**
 * Summary validCode
*/
interface TypeSmsCodeValidResponse{
    smsValidVo?:undefined    
}

export function SmsCodeValid(data:TypeSmsCodeValidResponse): Promise<any>{
    return http.request({
        url: `/sms/code/valid`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
    })
}

/**
 * Summary 发送验证码短信(countryCode传国家代码 中国:86, 美国:1)
*/
interface TypeSmsSendVCodeCountryCodePhoneResponse{
    countryCode?:string
    phone?:string    
}

export function SmsSendVCodeCountryCodePhone(params:TypeSmsSendVCodeCountryCodePhoneResponse): Promise<any>{
    return http.request({
        url: `/sms/sendVCode/${params.countryCode}/${params.phone}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}

/**
 * Summary 发送验证码短信(国内)
*/
interface TypeSmsSendVCodePhoneResponse{
    phone?:string    
}

export function SmsSendVCodePhone(params:TypeSmsSendVCodePhoneResponse): Promise<any>{
    return http.request({
        url: `/sms/sendVCode/${params.phone}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        params
    })
}