import { defineStore } from 'pinia'
import { nextTick, ref } from 'vue'
import {  useRouter } from 'vue-router'

export const useRouterStore = defineStore('appRouter', () => {
  const router = useRouter()



  //当前路由
  const route = ref<any>({})

  //窗口
  const menuList = ref<any>([])

  //缓存路由
  const keepAliveList = ref<any>([])


  const refresh = ref({
    exc: "",
    show: true
  })




  //设置当前路由
  const setRoute = (data: any) => {
    //console.log(data)
    //当前路由路径
    const path = data.path
    //全部路由信息
    const routerList = data.matched[0]
    
    //获取缓存的name
     if (keepAliveList.value.length==0) {
            keepAliveList.value.push('home')
      }
    if (!keepAliveList.value.includes(data.name)) {
      if(data.meta.keepAlive) keepAliveList.value.push(data.name)
    }

    const RouterItem = (routes:any) => {
      routes.children.forEach((item: any) => {
        //获取当前路由信息
        if (item.path == path) {

          const perRoute = {
              path: routes.path,
              name: routes.name,
              meta: routes.meta,
          }
          const itemRoute = {
            path: item.path,
            name: item.name,
            meta: item.meta,
          }
          
          route.value = {
            perRoute,
            ...itemRoute
          }


          //设置barcheader

           if (menuList.value.length==0) {
            menuList.value.push({
                path: '/home',
                name: 'home',
                meta: {
                  title: '首页',
                  icon: 'md-home',
                  id: Date.now(),
                  keepAlive: true,
                  //是否显示
                  isDisplay: true
                },
            })
          }

          const idx = menuList.value.findIndex((it: any) => it.name == item.name)
         // console.log(idx)
          if(idx == -1 ){
            menuList.value.push(itemRoute)
          }

        }

        //递归循环
        if(item.children){
          RouterItem(item)
        }

        
      })
    }

    RouterItem(routerList)

   }

  //删除其中一个
  const delMenuItem = (name: any) => {
    console.log(name)
    console.log(route.value)
    console.log(menuList.value);

    //删除窗口
    const idx = menuList.value.findIndex((item: any) => item.name == name)
    menuList.value.splice(idx, 1)

    const i = keepAliveList.value.findIndex((item: any) => item == name)

    console.log(i)
    keepAliveList.value.splice(i, 1)

     //删除当前路由
    if(route.value.name == name){
      router.push(menuList.value[idx - 1].path)
      return
    }



  }


  //刷新
  const refreshMenu = (name: any) => {


    console.log(router)
    // let i = router.currentRoute.value.meta.id
    // router.currentRoute.value.meta.id = i+1


    console.log(name, keepAliveList.value)


    // refresh.value = {
    //   exc: name,
    //   show: false
    // }

    console.log(keepAliveList.value.includes(name))

    console.log(keepAliveList.value.indexOf(name))


    //console.log(keepAliveList.value[idx])
    keepAliveList.value.splice(keepAliveList.value.indexOf(name), 1)

    // console.log(keepAliveList.value.includes(name))

    nextTick(() => {
      keepAliveList.value.push(name)
        // router.push({
        //   path: '/sys/menu'
        // })
  
      //router.replace({ path: '/sys/menu' });
      //keepAliveList.value.splice(idx-1, 0,name)
      //console.log(keepAliveList.value)
    })



  }

  //关闭
  const closeMenu = (list: any) => {
    menuList.value = menuList.value.filter((item:any)=>list.includes(item.name))
    keepAliveList.value=list  
    if (list.length == 1 && route.name != list[0]) {
      router.push({
        path:'/home'
      })
    }


  }

  return {
    route,
    menuList,
    keepAliveList,
    refresh,
    refreshMenu,
    //setMenu,
    delMenuItem,
  
    closeMenu,
    setRoute
  }
})
