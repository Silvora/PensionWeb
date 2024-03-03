import { createApp } from 'vue'

import App from './App.vue'
import store from './stores/index'
import router from './router'

import 'default-passive-events'

import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import './styles/main.css'
import './styles/base.css'

import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import VCalendar from 'v-calendar';
import 'v-calendar/style.css';




import createDirective from './utils/directive'
import i18n from './i18n'

import AppInstallView from "@/components/index"


function bootstrap() {


  const app = createApp(App)

  //重写i18n的方法
  //app.config.globalProperties.lodash = _
  //app.provide('$v', langI18n)

  createDirective(app)

  app.use(store)
  app.use(router)
  //app.use(VueAreaLinkage)
  //app.use(Region)
  app.use(i18n)
  app.use(ViewUIPlus, {
    i18n,
    transfer: true
  })
  app.use(VXETable, {
    i18n: (key, args) => i18n.global.t(key, args),
    translate: (key, args) => i18n.global.t(key, args)
  })
  app.use(VCalendar, {})

  AppInstallView(app)

  app.mount('#app')
}
bootstrap()
