import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  //左侧menu
  const collapsed = ref(false)
  //light、dark、主题
  const theme = ref('dark')
  //语言
  const language = ref()
  //获取表格高度
  const tableH = ref(0)
  //按钮权限
  const permissions = ref<any>([])

  //用户基本数据
  const userInfo = ref<any>()

  //oemId信息
  const oemList = ref<any>([])
  //role信息
  const roleList = ref<any>([])

  //动画配置信息
  const TransitionConfig = reactive<any>(
    {
      modal: ['ease', 'fade'],
      bread: "move-right",
    }
  )

  //更改collapsed
  const setCollapsed = () => {
    collapsed.value = !collapsed.value
  }

  //更改表格高度
  const setTableHeight = (h: any) => {
    tableH.value = h
  }

  //设置权限
  const setPermissions = (authData: any) => {
    //console.log(authData)

    let authList: any[] = []
    //this.permissions = permissions
    const auth = (data: any) => {
      data.forEach((item: any) => {
        if (item.route != '' && item.selected == 1 && item.isDisplay == 1) {
          authList.push(item.route)
        }

        if (item.childs.length > 0) {
          auth(item.childs)
        }
      })
    }
    auth(authData)
    //authMenu(authData)
    permissions.value = authList

    //console.log(authList)
  }

  //设置语言
  const setLanguage = (lang: any) => {
    language.value = lang
  }

    //设置语言
  const setUserInfo = (info:any) => {
    userInfo.value = {
      ...userInfo.value,
      ...info
    }
  }

  //设置oem
  const setOemList = (list:any) => {
    oemList.value = list
  }
//设置role
   const setRoleList = (list:any) => {
    roleList.value = list
   }
  
  const clearAppStore = () => {
    oemList.value = []
    roleList.value = []
    permissions.value = []
  }


  //设置动画
  const setTransitionConfig = (config: any) => {
   console.log(config)
    TransitionConfig.value = {
        ...TransitionConfig.value,
        ...config
      }
  
  }
  return {
    language,
    permissions,
    collapsed,
    theme,
    tableH,
    userInfo,
    oemList,
    roleList,
    TransitionConfig,
    setCollapsed,
    setTableHeight,
    setPermissions,
    setLanguage,
    setUserInfo,
    setOemList,
    setRoleList,
    clearAppStore,
    setTransitionConfig
  }
})
