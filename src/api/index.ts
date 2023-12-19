import axios from 'axios'
import router from '@/router'
import { Message } from 'view-ui-plus'
import { clearItemToken, getToken } from '@/utils/token'
import GlobalError from "@/config/globalError"

//const router = useRouter()

let http = axios.create({
  baseURL: "/meicepro-admin",
  timeout: 5000
})

// let pending: any = [] //声明一个数组用于存储每个请求的取消函数和axios标识
// let cancelToken = axios.CancelToken
// let removePending = (config: any) => {
//   // 防抖
//   for (let p in pending) {
//     if (pending[p].u === config.url.split('?')[0] + '&' + config.method) {
//       //当当前请求在数组中存在时执行函数体
//       pending[p].f() //执行取消操作
//       pending.splice(p, 1) //数组移除当前请求
//     }
//   }
// }

/* 请求拦截器 */
http.interceptors.request.use(
  async (config: any) => {
    /**  */
    //console.log(config)
    //let token= await getToken("meicePro-Token")
    return getToken("meicePro-Token").then((res: any) => {


      if (res) {
        config.headers.Authorization = 'Bearer ' + res 
      }
      
      return config
    })
    
    // 请求拦截进来调用显示loading效果
    //console.log(pending, config.debounce)
    // removePending(config)
    // config.cancelToken = new cancelToken((c) => {
    //   // pending存放每一次请求的标识，一般是url + 参数名 + 请求方法，当然你可以自己定义
    //   pending.push({ u: config.url.split('?')[0] + '&' + config.method, f: c }) //config.data为请求参数
    // })
  },
  (error: any) => Promise.reject(error)
)

/* 响应拦截器 */
http.interceptors.response.use(
  (response: any) => {

   

    //console.log(locale)


    // getToken('language').then((res:any) => {
    //   if(res=='zh'){
    //     ERROR = GlobalError.zh
    //   }
    //   if(res=='en'){
    //     ERROR = GlobalError.en
    //   }

    //       // 请求成功
 
      
    // })

    if (response.data.code == 200) {
      return Promise.resolve(response.data)
    } else {
      // 请求成功，状态不为成功时 抛出错误
      if (GlobalError.zh[response.data.code]) {
      
      getToken('language').then((res:any) => {
        Message.error(GlobalError[res][response.data.code])
        
      })

        return Promise.reject(new Error(response.data.message))
    } else {
        //请求成功 并没有报错信息时 直接抛出错误
      Message.error(response.data.message)
      return Promise.reject(new Error(response.data.message))
    }

    }
    


    
    //请求成功 并没有报错信息时 直接抛出错误
    //return Promise.reject(new Error(response.data.message))
  },
  (error: any) => {
    //console.log('fffff......', error.response.data.code)
    //   message.error(error.message);
    //console.log(navigator.language)

        getToken('language').then((res:any) => {
         Message.warning(error.response.data.code?GlobalError[res][error.response.data.code]:GlobalError[res][error.response.status])

        
      })



    // 如果不是401错误 无效token
    if (error.response?.status === 401) {
      // console.log(router.replace({ name: 'login' }))
      clearItemToken('meicePro-Token')
      router.replace({
        path: '/login'
      })
    }
    return Promise.reject(error)
  }
)

export default http
