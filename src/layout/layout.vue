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
        <span class="right">
          <img class="right-img" src="@/assets/images/setting.png" alt="" @click="() => router.push('/sys')">
        </span>
      </div>
    </div>
    <div class="layout-box">
      <Layout style="height: calc(100vh - 60px)">
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
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router';
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100vh;

  .layout-bar {
    width: 100%;
    height: 60px;
    background: #fff;

    .title {
      font-size: 20px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #1C1B1B;
    }

    .tool-bar {
      width: 75%;
      height: 60px;
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
      }

      .right {
        width: 40px;
        border-radius: 50%;
        background: rgba(19, 100, 248, 1);
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;

        .right-img {
          display: block;
          width: 20px;
          height: 20px;
        }
      }



    }
  }

  .layout-box {
    width: 75%;
    height: calc(100vh - 60px);
    margin: 0 auto;
    background: transparent !important;
  }
}
</style>
