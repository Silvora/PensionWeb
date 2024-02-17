<template>
  <div class="layout">
    <div class="layout-bar">
      <div class="tool-bar">
        <span>
          <img class="left-img" src="@/assets/images/logo.png" alt="" @click="() => router.push('/home')">
        </span>
        <span class="title">
          {{ route.meta.title }}
        </span>
        <div class="right-box" v-if="route.name != 'sys'">
          <!-- <span class="right" :style="{ 'background': route.name == 'home' ? 'rgba(19, 100, 248, 1)' : '#fff' }"> -->
          <span class="right" :style="{ 'background': 'rgba(19, 100, 248, 1)' }">
            <img v-if="route.name == 'home'" class="right-img" src="@/assets/images/setting.png" alt=""
              @click="() => router.push('/sys?type=agency')">
            <!-- <img v-if="route.name == 'screen'" class="right-img" src="@/assets/images/setting.png" alt=""
                @click="() => router.push('/sys')"> -->
            <Icon v-if="route.name == 'screen' && !isFullscreen" type="md-code" color="#fff" size="28" @click="handleZoom"
              style="transform: rotateZ(-45deg);" />
            <Icon v-if="route.name == 'screen' && isFullscreen" type="ios-contract" color="#fff" size="28"
              @click="handleZoom" style="transform: rotateZ(-90deg);" />
          </span>
        </div>
      </div>
    </div>
    <div class="layout-box" id="layoutBox">
      <Layout class="layout-content">
        <Content>
          <Suspense>
            <RouterView v-slot="{ Component }">
              <Transition name="slide-fade" mode="out-in">
                <KeepAlive>
                  <component :is="Component" :key="$route.name" />
                </KeepAlive>
              </Transition>
            </RouterView>
          </Suspense>
        </Content>
      </Layout>
      <p class="footer" v-if="route.name != 'home'">深圳海吉雅健康科技有限公司 技术支持</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router';
import { useRoute } from 'vue-router';
import { onMounted, nextTick } from "vue"
import { useAppStore } from '@/stores/modules/app'
import { useFullscreen } from '@vueuse/core'
const route = useRoute()
const appStore = useAppStore()
console.log(route)


let app = document.getElementById('#screen')
console.log(app)
const { toggle, isFullscreen } = useFullscreen(app)

const handleZoom = () => {
  toggle()
}


onMounted(() => {
  //console.log(content.value.offsetHeight)
  nextTick(() => {
    //appStore.setTableHeight(content.value.offsetHeight - 172)
    let conH: any = document.getElementById('layoutBox')
    console.log("------", conH.clientHeight)
    appStore.setTableHeight(conH.offsetHeight - 190)
  })
})
window.addEventListener('resize', () => {
  //console.log(content.value.height)
  nextTick(() => {
    // console.log(content.value.clientHeight)
    // appStore.setTableHeight(content.value.offsetHeight - 172)
    let conH: any = document.getElementById('layoutBox')
    console.log("------", conH.clientHeight)
    appStore.setTableHeight(conH.offsetHeight - 190)
  })
  //appStore.setTableHeight(content.value.offsetHeight - 172)
})
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .layout-bar {
    width: 100%;
    height: 60px;
    background: #fff;

    .title {
      font-size: 20px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #1C1B1B;
      width: calc(100% - 120px);
      text-align: center;
    }

    .tool-bar {
      width: 75%;
      height: 60px;
      min-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
      justify-content: space-between;
      box-shadow: inset 0px -1px 0px 0px rgba(19, 100, 248, 0.2);

      span {
        display: block;
      }

      .left-img {
        width: 80px;
        cursor: pointer;
      }

      .right-box {
        width: 80px;
        float: right;
        display: flex;
        justify-content: flex-end;
      }

      .right {
        width: 40px;
        border-radius: 50%;
        //background: rgba(19, 100, 248, 1);
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .right-img {
          display: block;
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      }



    }
  }

  .layout-box {
    width: 75%;
    min-width: 1400px;
    height: calc(100vh - 60px);
    margin: 0 auto;
    background: transparent !important;
    // overflow: hidden;

    .layout-content {
      width: 100%;
      height: calc(100vh - 90px);
    }

    .footer {
      width: 100%;

      text-align: center;
      font-size: 12px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #1C1B1B;
      height: 30px;
      line-height: 30px;
      background: #BCE2ED;

    }

  }
}
</style>
