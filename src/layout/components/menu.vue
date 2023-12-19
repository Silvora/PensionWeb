<template>
  <!-- theme="dark" -->
  <!-- appRouter.urlInfo.personName -->
  <!-- <Menu :active-name="appRouter.urlInfo.name" width="auto" :open-names="[`'${appRouter.urlInfo.personName}'`]"
    :class="menuitemClasses" accordion> -->
  <Menu :active-name="activeName" width="auto" :open-names="openNames" :class="menuitemClasses" accordion ref="menu">
    <div style="text-align: center;">
      <i class="iconfont icon-big_logo" v-show="!app.collapsed" key="max-logo" style="font-size: 40px;"></i>
      <i class="iconfont icon-logo" v-show="app.collapsed" key="min-logo" style="font-size: 40px;"></i>
      <!-- <p>{{ appRouter.urlInfo.name }}</p>
      <p>{{ appRouter.urlInfo.personName }}</p> -->
      <!-- <img v-show="!app.collapsed" :src="maxLogo" key="max-logo" />
      <img v-show="app.collapsed" :src="minLogo" key="min-logo" /> -->
    </div>
    <template v-for="(item, componentIndex) in admin">
      <!-- 展开并且有子菜单 -->
      <Submenu v-if="!app.collapsed && item.children && item.meta.isDisplay && item.meta.url == ''" :key="componentIndex"
        :name="item.name">
        <template #title>
          <div style="display: flex;align-items: center;">
            <i :class="['iconfont', item.meta.icon]" style="padding-right: 4px;"></i>
            <span>{{ $t(item.meta.title) }}</span>
          </div>
        </template>
        <div v-for="(children, index) in item.children" :key="index">
          <MenuItem v-if="children.meta.isDisplay" :name="children.name" :to="children.path">
          <div style="display: flex;align-items: center;">
            <i :class="['iconfont', children.meta.icon]" style="padding-right: 4px;"></i>
            {{ $t(children.meta.title) }}
          </div>
          </MenuItem>
        </div>

      </Submenu>

      <!-- 展开但没有子菜单 -->
      <MenuItem v-else-if="!app.collapsed && item.meta.isDisplay && item.meta.url != ''" :name="item.name"
        :key="item.icon" :to="item.path">
      <i :class="['iconfont', item.meta.icon]"></i>
      <span>{{ $t(item.meta.title) }}</span>
      </MenuItem>

      <!-- 不展开有子菜单 -->
      <Dropdown v-else-if="app.collapsed && item.children && item.meta.isDisplay && item.meta.url == ''"
        placement="right-start" class="menu_dropdown" :key="item.name" style="left: 8px;display: block;">
        <MenuItem :name="item.name">
        <div style="text-align: center;">
          <i :class="['iconfont', item.meta.icon]"></i>
          <span>{{ $t(item.meta.title) }}</span>
        </div>
        </MenuItem>
        <template #list style="margin-left: 8px">
          <DropdownMenu>
            <DropdownItem v-for="(children, index) in item.children" :key="index">
              <div v-if="children.meta.isDisplay">
                <MenuItem :name="item.name" :to="children.path" style="display: block">
                <i :class="['iconfont', children.meta.icon]"></i>
                {{ $t(children.meta.title) }}
                </MenuItem>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </template>
      </Dropdown>

      <!-- 不展开无子菜单 -->
      <Tooltip v-else-if="app.collapsed && item.meta.isDisplay && item.meta.url != ''" :content="item.meta.title"
        placement="right" :key="item.path" style="display: block">
        <MenuItem :name="item.name" :to="item.path" style="margin-left: 8px">
        <!-- <Icon :type="item.meta.icon" /> -->
        <i :class="['iconfont', item.meta.icon]"></i>
        <span>{{ $t(item.meta.title) }}</span>
        </MenuItem>
      </Tooltip>
    </template>
  </Menu>
</template>

<script setup lang="ts">
//import 'default-passive-events'

// import minLogo from '@/assets/images/logo-min.jpg'
// import maxLogo from '@/assets/images/logo.jpg'
import { MenuItem, Submenu, Menu } from 'view-ui-plus'
import { useAppStore } from '@/stores/modules/app'
import { useRouterStore } from '@/stores/modules/router'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
//import admin from '@/router/admin'
import routes from '@/router/routes'
// import { useRouter, useRoute } from 'vue-router'
// const route = useRoute()
const app = useAppStore()

const routerStore = useRouterStore()

//收缩样式
const menuitemClasses = computed(() => {
  return ['menu-item', app.collapsed ? 'collapsed-menu' : '']
})

const admin = ref<any>([])

const menu = ref<any>(null)

const activeName = ref<any>('')
const openNames = ref<any>([])
watch(() => routerStore.route, () => {

  activeName.value = routerStore.route.name
  openNames.value = [routerStore.route?.perRoute?.name]
  nextTick(() => {
    menu.value.updateOpened()
    menu.value.updateActiveName()
  })
}, {
  immediate: true,
  deep: true
})

// watch(() => routes, () => {
//   routes[0].children.forEach((route: any) => {
//     if (route.meta.title != 'Error' && route.meta.title != '首页') {
//       admin.value.push(route)
//     }
//   })
// }, {
//   immediate: true,
//   deep: true
// })


//过滤路由
onMounted(() => {
  routes[0].children.forEach((route: any) => {
    if (route.meta.title != 'Error' && route.meta.title != '首页') {
      admin.value.push(route)
    }
  })
  nextTick(() => {

    menu.value.updateOpened()
    menu.value.updateActiveName()
  })
})


</script>

<style scoped lang="less">
:global(.ivu-menu-vertical.ivu-menu-light:after) {
  background: none;
}

.logo-con {
  text-align: center;

  i {
    // display: block;
    // width: 70%;
    //padding: 4px auto;
    //height: 58px;
    font-size: 40px !important;
    //margin: 4px auto;
    //background-color: red;
  }

  // .icon-logo {
  //   display: block;
  //   width: 80%;
  //   padding: 4px auto;
  //   height: 58px;
  //   font-size: 40px !important;
  //   margin: 4px auto;
  // }
}

.menu-icon {
  transition: all 0.3s;
}

.rotate-icon {
  transform: rotate(-90deg);
}

.menu-item {
  background: none;
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  //width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0px;
  transition: width 0.3s ease;
}

.collapsed-menu i {
  //transform: translateX(5px);
  //transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  //vertical-align: middle;
  //font-size: 24px;
}

// .menu_dropdown {
//   background-color: #ccc;
//   left: 80px;

//   :global(.ivu-select-dropdown) {
//     //background-color: red !important;
//     margin-left: 8px !important;
//     //left: 95px !important;
//   }
// }
</style>
