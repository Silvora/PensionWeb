import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import ViewUIPlus from 'view-ui-plus'
import { getToken,clearItemToken } from '@/utils/token'
// import { SysMenuQueryByUser } from '@/api/SysMenu/SysMenu'
// import setPageDomTitle from '@/utils/domTitle'
const modulesR = import.meta.glob('../views/**/**.vue', {
  import: 'default',
  //import: 'setup',
  eager: true
})


// console.log(modulesR)

const router = createRouter({
  //history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
  history: createWebHistory(),
  routes
})


//是否第一次加载 或者刷新
let isRoutes = false

//添加路由
function handleAddRoute(routesList: any) {
  const add = (routesList: any) => {
    routesList.forEach((route: any) => {
      //路由信息
      let item: any = {
        path: route.route,
        name: route.route.split('/').join(''),
        meta: {
          id: route.id,
          title: route.name,
          icon: route.icon,
          keepAlive: true,
          //是否显示
          isDisplay: route.isDisplay == 1 ? true : false,
          url:route.url,
        },
        children: []
      }

      if (route.levels == 1) {
        //父路由
        if (route.url == '') {
          //item.component = Layout
          routes[0].children.push(item)
          router.addRoute('index', item)
          if (route.childs) {
            add(route.childs)
          }
        } else {
          item.component = modulesR[`../views${route.route}/index.vue`]
          delete item.children
          routes[0].children.push(item)
          //add(route.childs)
          //console.log(routes[0])
          router.addRoute('index',item)
        }
      } else {
        //子路由
        //添加动态路由
        //console.log(item.path.split('/')[1])
        item.component = modulesR[`../views${route.route}/index.vue`]
        routes[0].children.forEach((itemRoute: any) => {
          if (route.route.includes(itemRoute.path)) {
            //console.log(itemRoute)
            itemRoute.children.push(item)
          }
        })
        item.path.includes('/')?router.addRoute(item.path.split('/')[1],item):''
      }
  

      // nextTick(() => {
      //   router.addRoute(item)
      // })
    })

  }



  add(routesList)

  //console.log(router.getRoutes())

}

router.beforeEach((to, _from, next) => {

  //console.log(routes)

  ViewUIPlus.LoadingBar.start()
  //setPageDomTitle(to.meta.title)
  //判断是否登录
  if (to.path === '/login') {
     next()
  }else {
    getToken('ing-Token').then((token: any) => {
   
      // console.log("-------",token)
    //判断是否有token
    if (token) {
      // if (!isRoutes) {
      //   //console.log("!isRoutes && token != null")
      //   SysMenuQueryByUser({}).then(res => {
      //     handleAddRoute(res.datas)
      //     isRoutes = true
      //     next(to.path)
      //   })
      // } else {
      //   next()
      // }
      next()
    } else {
      //console.log("first")
      clearItemToken("ing-Token")
      next('/login') // 跳转到登录页
    }
  })
  }

  

})

router.afterEach((_to: any) => {
  //setTitle(to, router.app)
  //app.setMenu(to)
  ViewUIPlus.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
