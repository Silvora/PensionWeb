<template>
  <!-- <div class="breadList">
    <div class="left">
      <span @click="handleScroll('left')">
        <i class="iconfont icon-chevron-left"></i>
      </span>
    </div>
    <div class="menuList" ref="menu">
      <RadioGroup v-model="appRouter.urlInfo.title" class="radioList">
        <div class="radioBtn" v-for="(menu, idx) in appRouter.menuList" :key="menu.name">
          <Radio :label="$t(menu.meta.title)" size="small" @change="handleToRoute(menu.path)"
            @click="handleToRoute(menu.path)">
          </Radio>
          <Icon type="ios-close" v-show="menu.meta.title != '首页'" @click="appRouter.delMenu(idx)" />
        </div>
      </RadioGroup>
    </div>
    <div class="right">
      <span @click="handleScroll('right')">
        <i class="iconfont icon-chevron-right"></i>
      </span>
      <span>
        <Dropdown placement="bottom-start">
          <i class="iconfont icon-close-circle"></i>
          <template #list>
            <DropdownMenu>
              <DropdownItem name="all" @click="handleCloseMenu(['/home'])"> {{ $t('关闭所有') }} </DropdownItem>
              <DropdownItem name="home" @click="handleCloseMenu(['/home', appRouter.urlInfo.path])">
                {{ $t('关闭其它') }}
              </DropdownItem>
            </DropdownMenu>
          </template>
        </Dropdown>
      </span>
    </div>
  </div> -->

  <div class="breadTabsList">
    <Tabs type="card" :model-value='routeTab' capture-focus closable @on-contextmenu="handleContextMenu"
      @on-click="handleToRoute" @on-tab-remove="handleMenuItemDelete">
      <TabPane v-for="menu in routerStore.menuList" :key="menu.name" :label="$t(menu.meta.title)" :name='menu.name'
        context-menu :class="menu.name == routeTab ? 'active' : 'notive'" :closable="menu.name == 'home' ? false : true">
      </TabPane>
      <!-- <template #extra>
        <Button @click="handleTabsAdd" size="small">增加</Button>
      </template> -->
      <template #contextMenu>
        <DropdownItem @click="handleContextMenuEdit">
          <Icon type="md-link" /> {{ t('外部打开') }}
        </DropdownItem>
        <DropdownItem @click="handleContextMenuDeleteOther(['home', routerStore.route.name])">
          <Icon type="md-hand" /> {{ t('关闭其它') }}
        </DropdownItem>
        <DropdownItem @click="handleContextMenuDeleteOther(['home'])">
          <Icon type="md-home" /> {{ t('关闭全部') }}
        </DropdownItem>
      </template>
    </Tabs>
  </div>

  <Content class="content" id="content">
    <div ref="content" v-if="routerStore.keepAliveList.length > 0">
      <Suspense>
        <RouterView v-slot="{ Component }">

          <Transition name="slide-fade" mode="out-in">
            <!-- <KeepAlive :include="routerStore.keepAliveList"> -->
              <component :is="Component" :key="$route.name"  />
              <!-- v-if="routerStore.keepAliveList.includes($route.name)" -->
            <!-- </KeepAlive> -->
          </Transition>
          <!-- <Transition name="slide-fade" mode="out-in">
            <component :is="Component" :key="$route.name" v-if="!routerStore.keepAliveList.includes($route.name)" />
          </Transition> -->
        </RouterView>
        <!-- <RouterView v-if="!props.isRefresh.isShow"></RouterView> -->
      </Suspense>
    </div>
  </Content>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from 'vue'
import { useRouterStore } from '@/stores/modules/router'
import { useAppStore } from '@/stores/modules/app'
import { useRouter } from 'vue-router'
import { useI18n } from "vue-i18n"
const { t } = useI18n()
const routerStore = useRouterStore()
const appStore = useAppStore()
const content = ref<any>(null)
const router = useRouter()
const routeTab = ref(routerStore.route.name)
watch(() => routerStore.route, () => {
  // menu.value.updateOpened()
  // menu.value.updateActiveName()
  //console.log(val)
  routeTab.value = routerStore.route.name
  //console.log(routerStore.route.name)
}, {
  immediate: true,
})



//鼠标移动上去数据
const bread = ref('home')
const handleContextMenu = (data: any) => {
  bread.value = data.name
}

const handleMenuItemDelete = (name: any) => {
  //console.log(name)
  routerStore.delMenuItem(name)
}

//外部打开
const handleContextMenuEdit = () => {
  const routeItem = routerStore.menuList.find((item: any) => item.name == bread.value)
  //console.log(item)
  window.open(location.origin + routeItem.path)
  //console.log("first")
}
const handleContextMenuDeleteOther = (list: any) => {
  routerStore.closeMenu(list)
}

//const menuList = ref([])

const handleToRoute = (path: any) => {
  //console.log(path)
  routeTab.value = path
  router.push({
    name: path
  })
}


// const handleCloseMenu = (list: any) => {
//   routerStore.closeMenu(list)
// }


onMounted(() => {
  //console.log(content.value.offsetHeight)
  nextTick(() => {
    //appStore.setTableHeight(content.value.offsetHeight - 172)
    let conH = document.getElementById('content') || { clientHeight: 1080 }
    appStore.setTableHeight(conH.clientHeight - 212)
  })
})
window.addEventListener('resize', () => {
  //console.log(content.value.height)
  nextTick(() => {
    // console.log(content.value.clientHeight)
    // appStore.setTableHeight(content.value.offsetHeight - 172)
    let conH = document.getElementById('content') || { clientHeight: 1080 }
    appStore.setTableHeight(conH.clientHeight - 212)
  })
  //appStore.setTableHeight(content.value.offsetHeight - 172)
})

// watchEffect((val) => {

//   //console.log(props.isRefresh)

//   let menu = []
//   appRouter.menuList.forEach((item: any) => {
//     menu.push(item.name)
//   });
//   //  console.error("===>", menu)
//   menuList.value = menu
// })

</script>

<style scoped lang="less">
.breadTabsList {
  padding-top: 2px;
  width: 100%;
  background-color: #f5f7f9;
}

.breadList {
  width: 100%;
  height: 38px;
  background-color: #f5f7f9;
  display: flex;

  span {
    display: inline-block;
    width: 28px;
    background-color: #fff;
    height: 38px;
    line-height: 38px;
    text-align: center;
    //border: 0.5px solid #f0f0f0;
  }

  label {
    font-size: 12px;
  }

  .left {
    border: 0.5px solid #f0f0f0;
  }

  .right {
    display: flex;
    //border: 0.5px solid #f0f0f0;

    span {
      border: 0.5px solid #f0f0f0;
    }
  }

  .menuList {
    flex: auto;
    width: 100%;
    //background-color: #ff0000;
    overflow: hidden;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    .radioList {
      width: 100%;
      display: flex;

      .radioBtn {
        display: flex;
        background-color: #fff;
        padding: 0 6px;
        margin: 4px 2px;
        line-height: 30px;
        border-radius: 4px;

        i {
          margin: auto 0;
          cursor: pointer;

          &:hover {
            color: red;
          }
        }
      }
    }
  }
}

.content {
  margin: 20px;
  height: calc(100vh - 144px);
  overflow: auto;
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
}
</style>
