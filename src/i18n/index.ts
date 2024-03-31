import { createI18n } from 'vue-i18n'

import view_zh from 'view-ui-plus/dist/locale/zh-CN'
import view_en from 'view-ui-plus/dist/locale/en-US'
import view_hk from 'view-ui-plus/dist/locale/zh-TW'


import vxe_zh from 'vxe-table/packages/locale/lang/zh-CN'
import vxe_en from 'vxe-table/packages/locale/lang/en-US'
import vxe_hk from 'vxe-table/packages/locale/lang/zh-HK'


//import 'default-passive-events'
import zh_info from './lang/zh.json'
import en_info from './lang/en.json'
import hk_info from './lang/hk.json'
import { getToken, setToken } from '@/utils/token'
//import { getToken, setToken } from '@/utils/token'
// zh_CN: {
//     ...zhCN
//   },
//   en_US: {
//     ...enUS
//   }
const messages = {
  zh: Object.assign(view_zh, zh_info, vxe_zh),
  "zh-CN": Object.assign(view_zh, zh_info, vxe_zh),
  en: Object.assign(view_en, en_info, vxe_en),
  "en-US": Object.assign(view_en, en_info, vxe_en),
  "zh-HK": Object.assign(view_hk, vxe_hk, hk_info)
}

// let locale = 'zh-CN'


// let lan = localStorage.getItem('language')

// console.log(lan)
// if (lan) {
//   locale = lan
// } else {
//   localStorage.setItem('language', locale)
// }


// getToken('language').then((res: any) => {
//   if (res) {
//     // console.log(res)
//     // locale = res
//   } else {
//      setToken('language', 'zh-HK')
//   }
//   // console.log(res)
//   // console.log(locale)
// })






const i18n:any = createI18n({
  defaultScope: 'global',
  allowComposition: true,
  globalInjection: true,
  silentTranslationWarn:true,//屏蔽翻译警报
  legacy: false,
  // locale: 'zh-CN',
  fallbackLocale: 'zh-HK',
  //locale: navigator.language,
  locale: 'zh-HK',
  messages
})

export default i18n
