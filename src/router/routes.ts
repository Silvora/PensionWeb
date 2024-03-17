//import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/layout/layout.vue'

import Login from '@/views/login/login.vue'

import Home from '@/views/home/home.vue'

import Sys from "@/views/sys/sys.vue"

import Room from "@/views/room/room.vue"
//import admin from './admin'
import Screen from '@/views/screen/screen.vue'

import Setting from '@/views/setting/setting.vue'

import Staff from '@/views/staff/staff.vue'

import StaffDetails from '@/views/staff-details/staff-details.vue'

import Elder from "@/views/elder/elder.vue"

import AddElder from "@/views/add-elder/add-elder.vue"

import DateView from "@/views/date/date.vue"

import Log from "@/views/log/log.vue"

//首页
const home: any = [
  {
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
    component: Home
  }
]

const date:any = [
   {
        path: '/date',
        name: 'date',
        meta: {
          title: '设置',
          icon: 'md-home',
          //id: Date.now(),
          keepAlive: true,
          //是否显示
          isDisplay: true
        },
        component: DateView
      },
    
]

//错误
const err: any = [
  {
    path: '/:pathMatch(.*)',
    name: '404',
    meta: {
      title: 'Error',
      icon: '',
      id: Date.now()+1,
      keepAlive: true,
      //是否显示
      isDisplay: true
    },
    component: () => import('@/views/error/404.vue')
  }
]

//设置
const sys: any = [
   {
        path: '/sys',
        name: 'sys',
        meta: {
          title: '设置',
          icon: 'md-home',
          //id: Date.now(),
          keepAlive: true,
          //是否显示
          isDisplay: true
        },
        component: Sys
      },
    
]

//房态
const room: any = [
   {
        path: '/room',
        name: 'room',
        meta: {
          title: '房态',
          icon: 'md-home',
          //id: Date.now(),
          keepAlive: true,
          //是否显示
          isDisplay: true
        },
        component: 　Room
      },
    
]
//看护大屏
const screen: any = [
  {
       path: '/screen',
       name: 'screen',
       meta: {
         title: '看护大屏',
         icon: 'md-home',
         //id: Date.now(),
         keepAlive: true,
         //是否显示
         isDisplay: true
       },
       component: Screen
     },
   
]

//设备中心
const setting: any = [
  {
       path: '/setting',
       name: 'setting',
       meta: {
         title: '看护大屏',
         icon: 'md-home',
         //id: Date.now(),
         keepAlive: true,
         //是否显示
         isDisplay: true
       },
       component: Setting
     },
   
]

//员工管理
const staff: any = [
  {
       path: '/staff',
       name: 'staff',
       meta: {
         title: '员工管理',
         icon: 'md-home',
         //id: Date.now(),
         keepAlive: true,
         //是否显示
         isDisplay: true
       },
       component: Staff
     },
   
]
//员工详情
const staffDetails: any = [
  {
       path: '/staff-details',
       name: 'staff-details',
       meta: {
         title: '员工详情',
         icon: 'md-home',
         //id: Date.now(),
         keepAlive: true,
         //是否显示
         isDisplay: true
       },
       component: StaffDetails
     },
   
]

//长者信息
const elder: any = [
   {
       path: '/elder',
       name: 'elder',
       meta: {
         title: '长者信息',
         icon: 'md-home',
         //id: Date.now(),
         keepAlive: true,
         //是否显示
         isDisplay: true
       },
       component: Elder
     }
]

//添加长者信息
const addElder: any = [
  {
      path: '/add-elder',
      name: 'add-elder',
      meta: {
        title: '长者新增',
        icon: 'md-home',
        //id: Date.now(),
        keepAlive: true,
        //是否显示
        isDisplay: true
      },
      component: AddElder
    }
]


//添加长者信息
const log: any = [
  {
      path: '/log',
      name: 'log',
      meta: {
        title: '日志记录',
        icon: 'md-home',
        //id: Date.now(),
        keepAlive: true,
        //是否显示
        isDisplay: true
      },
      component: Log
    }
]

const routes: any = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'md-home'
    },
    children: [
      ...home,
      ...sys,
      ...room,
      ...screen,
      ...setting,
      ...staff,
      ...staffDetails,
      ...elder,
      ...addElder,
      ...log,
      ...err,

    ]
  },

  {
        path: '/date',
        name: 'date',
        meta: {
          title: '设置',
          icon: 'md-home',
          //id: Date.now(),
          keepAlive: true,
          //是否显示
          isDisplay: true
        },
        component: DateView
      },
 

  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      icon: 'md-home'
    },
    component: Login
  }
]

export default routes
