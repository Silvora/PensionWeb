//import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/layout/layout.vue'

import Login from '@/views/login/login.vue'

import Home from '@/views/home/home.vue'

import Sys from "@/views/sys/sys.vue"

import Room from "@/views/room/room.vue"
//import admin from './admin'


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
      ...err,

    ]
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
