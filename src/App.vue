<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { getToken, setToken } from '@/utils/token'
import { useI18n } from "vue-i18n"
import { useAppStore } from "@/stores/modules/app"
//import { useMagicKeys } from '@vueuse/core'
import { useRoute } from 'vue-router'
import setPageDomTitle from './utils/domTitle'
//const keys = useMagicKeys()
//const shiftP = keys['ShiftLeft+S']

//切换语言
const { locale, t } = useI18n()
const appStore = useAppStore()


// const modal = ref<any>(false)
// const anim1 = ref<any>(false)
// const anim2 = ref<any>(false)
// const anim3 = ref<any>(false)
// const transitionName = ref<any>(['ease', 'fade'])
// const breadName = ref<any>("")
// const transitionList = ref<any>([
//   {
//     label: '渐显/隐',
//     value: 'fade',
//   },
//   {
//     label: '缩放',
//     value: 'ease',
//   },
//   {
//     label: '向上',
//     value: 'move-up',
//   },
//   {
//     label: '向下',
//     value: 'move-down',
//   },
//   {
//     label: '向左',
//     value: 'move-left',
//   },
//   {
//     label: '向右',
//     value: 'move-right',
//   },
//   {
//     label: '居中折叠',
//     value: 'transition-drop',
//   },
//   {
//     label: '向上折叠',
//     value: 'slide-up',
//   },
//   {
//     label: '向下折叠',
//     value: 'slide-down',
//   },
//   {
//     label: '向左折叠',
//     value: 'slide-left',
//   },
//   {
//     label: '向右折叠',
//     value: 'slide-right',
//   },

// ])


// const ok = () => {
//   console.log("first", transitionName.value)

//   appStore.setTransitionConfig({
//     modal: transitionName.value,
//     bread: breadName.value
//   })
// }

// watch(shiftP, (v) => {
//   if (v)
//     modal.value = true
// })
//监控路由变化 改变title 跟随语言设置
const route = useRoute()
watch(route, (v: any) => {
  nextTick(() => {
    setPageDomTitle(t(v.meta.title))
  })
})

onMounted(() => {
  // transitionName.value = appStore.TransitionConfig.modal
  // breadName.value = appStore.TransitionConfig.bread

  getToken('language').then((res: any) => {
    // console.log(res)
    if (res) {
      appStore.setLanguage(res)
      locale.value = res
    } else {
      locale.value = navigator.language
      appStore.setLanguage(navigator.language)
      setToken('language', navigator.language)
    }

  })
})
</script>

<style scoped>
.transition-box {
  margin-top: 32px;
  width: 100%;
  border-radius: 4px;
  background-color: #409EFF;
  text-align: center;
  color: #fff;
  padding: 24px 0;
}

.gridDemo {
  height: 180px;
}
</style>