<template>
  <div class="bar">

    <div class="better">
      <Transition :name="appStore.TransitionConfig.bread" :duration="300">
        <Breadcrumb v-if="breadTransition">
          <BreadcrumbItem>
            <i :class="`iconfont ${routerStore.route.meta ? routerStore.route.perRoute?.meta?.icon : ''}`"></i>
            <span>{{ routerStore.route.meta ? t(routerStore.route.perRoute?.meta?.title) : '' }}</span>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <i :class="`iconfont ${routerStore.route.meta ? routerStore?.route?.meta?.icon : ''}`"></i>
            <span>&nbsp;{{ routerStore.route.meta ? t(routerStore?.route?.meta?.title) : '' }}</span>
          </BreadcrumbItem>
        </Breadcrumb>
      </Transition>
    </div>
    <Space class="user">
      <span class="icon">
        <i class="iconfont icon-tuichuquanping" @click="toggle()" v-if="isFullscreen"></i>
        <i class="iconfont icon-quanping" @click="toggle()" v-else></i>
        <!-- <Icon :size="24" type="md-expand" @click="isFull"></Icon> -->
      </span>
      <span class="icon">
        <!-- <Icon :size="24" type="md-funnel" /> -->

        <Dropdown trigger="click" @on-click="handelLanguage">
          <i class="iconfont icon-language"></i>
          <template #list>
            <DropdownMenu>
              <DropdownItem name="zh">中文</DropdownItem>
              <DropdownItem name="en">English</DropdownItem>
            </DropdownMenu>
          </template>
        </Dropdown>

      </span>
      <span>
        <Dropdown>
          <Badge style="margin-top: -13px; cursor: pointer;">
            <!-- <Avatar
              src="https://i.loli.net/2017/08/21/599a521472424.jpg"
              :size="32"
              style="margin-top: -6px"
            /> -->
            <Avatar icon="ios-person" size="24" style="margin-top: -4px" />
            <span style="padding: 0 4px">{{ appStore.userInfo?.username }}</span>
          </Badge>

          <template #list>
            <DropdownMenu>
              <!-- <DropdownItem name="message">
                消息中心<Badge style="margin-left: 10px" :count="12"></Badge>
              </DropdownItem> -->
              <DropdownItem name="logout" @click="handleLogout">
                <i class="iconfont icon-zhuxiao"></i>
                {{ $t('退出登录') }}
              </DropdownItem>
            </DropdownMenu>
          </template>
        </Dropdown>
      </span>
    </Space>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { useAppStore } from "@/stores/modules/app"
import { useRouterStore } from '@/stores/modules/router'
import { useRoute, useRouter } from 'vue-router'
import { Modal } from 'view-ui-plus'
import { clearItemToken, setToken } from '@/utils/token'
import { useI18n } from "vue-i18n"
import { nextTick, ref, watch } from 'vue'
import setPageDomTitle from '@/utils/domTitle'

const appStore = useAppStore()
const routerStore = useRouterStore()
let app = document.getElementById('#app')
const { toggle, isFullscreen } = useFullscreen(app)
const router = useRouter()
const route: any = useRoute()
// const route = useRoute()
//console.log(route)

// console.log(routerStore.route)

//切换语言
const { locale, t } = useI18n()

const handelLanguage = (name: any) => {
  locale.value = name
  //改变title 跟随语言设置
  nextTick(() => {
    setToken('language', name)
    setPageDomTitle(t(route.meta.title))
  })
}

//退出系统
const handleLogout = () => {
  Modal.confirm({

    title: t('退出登录'),
    content: t('是否要退出系统') + '?',
    onOk: () => {
      //Message.info('Clicked ok')
      //localStorage.removeItem('token')
      //clearToken()
      clearItemToken('meicePro-Token')
      appStore.clearAppStore()
      router.replace({
        path: '/login'
      })
    },
    onCancel: () => {
      //Message.info('Clicked cancel')
      return
    }
  })

  //appRouter.resetRouter()
}

const breadTransition = ref<any>(true)


watch(() => routerStore.route, () => {
  breadTransition.value = false

  nextTick(() => {
    breadTransition.value = true
  })

}, {
  deep: true,
  immediate: true
})

</script>

<style scoped lang="less">
.bar {
  width: 100%;
  padding-left: 8px;
  display: flex;
  justify-content: space-between;

  .user {
    display: flex;

    span {
      display: inline-block;

      //padding: 0 8px;
      //margin: 0 4px;
      // &:last-child {
      //     //margin: 0 2px;
      // }
    }

    .icon {
      padding: 0 8px;

      &:hover {
        background-color: #ccc;
      }
    }
  }
}
</style>
