/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// declare module 'lodash'

declare module '*.json'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'

declare module '*.js'
declare module 'view-ui-plus/dist/locale/zh-CN'
declare module 'view-ui-plus/dist/locale/en-US'
declare module 'view-ui-plus/dist/locale/zh-TW'
declare module "pinia-persistedstate-plugin"

declare module "js-md5"

declare module "@wangeditor/editor-for-vue"