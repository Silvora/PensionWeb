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
import MQTT from './utils/mqtt'
// // //const keys = useMagicKeys()
// // //const shiftP = keys['ShiftLeft+S']
import { useMqttStore } from "@/stores/modules/mqtt"
import { onBeforeUnmount } from 'vue'
import { DeviceSleepDeviceStatus } from "@/api/Device/Device"
import { DeviceLogList } from '@/api/Device/Device'
import { watchEffect } from 'vue'
const mqttStore = useMqttStore()
//切换语言
const { locale, t } = useI18n()
const appStore = useAppStore()

const oss = ref<any>(import.meta.env.VITE_APP_AXIOS_BASER)

// const mqtt = ref(new MQTT([
//   'retirement/device/offline/1',
//   'retirement/device/eventData/1',
//   'retirement/device/currentDataReply/1']))

const mqtt = ref<any>(null)

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

const timer = ref<any>(null)


//监控路由变化 改变title 跟随语言设置
const route = useRoute()
watch(route, (v: any) => {
  nextTick(() => {
    setPageDomTitle(t(v.meta.title))
  })

  // console.log("===============")

  if (v.name == 'login') {
    // mqtt && mqtt.value?.unsubscribes()

    clearInterval(timer.value)
    timer.value = null
    // console.log("===============")
  }else{
     getStatus()
  }

  // if (!timer.value && v.name != 'login') {
  //   getStatus()
  // }

}, { deep: true })

// watchEffect(() => {
//   if (route.name == 'login') {
//     // mqtt && mqtt.value?.unsubscribes()

//     clearInterval(timer.value)
//     timer.value = null
//     // console.log("===============")
//   }
//   // else{
//   //   getStatus()
//   // }
// })


const getStatus = () => {



  getToken('ing-Token').then((token) => {



    if (token && timer.value == null) {

      timer.value = '1'
      timer.value = setInterval(() => {


        DeviceLogList({
        current: 1,
        size: 1,
        status:0,
    }).then((res: any) => {
        console.log(res)

        if(res.data?.records.length>0){

            res.data?.records.forEach((item: any) => {
                mqttStore.showMessages(item)
            })


        }else{
          mqttStore.showMessages(null)
        }

      
    })


        DeviceSleepDeviceStatus().then((res => {
          console.log("=========", res)
          res.data.forEach((item: any, idx: any) => {
            item.eventType ? setTimeout(() => {
              mqttStore.setData('device', item)
            }, 100 * idx) : ''
          })
        }))
      }, 6000)
    }

  })

}


onMounted(() => {
  // transitionName.value = appStore.TransitionConfig.modal
  // breadName.value = appStore.TransitionConfig.bread

  getToken('language').then((res: any) => {
    // console.log(res)
    if (res) {
      appStore.setLanguage(res)
      locale.value = res
    } else {
      locale.value = 'zh-HK'
      appStore.setLanguage('zh-HK')
      setToken('language', 'zh-HK')
    }
  })

  getToken('ing-Token').then((token) => {
    token && getToken('ing-Bg').then((res: any) => {
      if (res) {
        console.log("//////", res, `url(${oss.value + res})`)
        document.body.style.backgroundImage = `url(${oss.value + res})`;

      }



    })
    mqtt.value = new MQTT()


    if (route.name == 'login') {
      clearInterval(timer.value)
      timer.value = null
      return

    }


    if (token) {
      // !timer.value? getStatus():''
      mqtt.value.init()
      mqtt.value.link()
      mqtt.value.get((topic: any, message: any) => {
        console.log('收到来自', topic, '的消息', JSON.parse(message.toString()))
        let data = JSON.parse(message.toString())
        //设备下线
        if (topic === 'retirement/device/offline/1') {
          mqttStore.setData('offline', data)
        }
        //异常警告
        if (topic === 'retirement/device/eventData/1') {
          mqttStore.setData('error', data)
        }
        //设备实时数据
        if (topic === 'retirement/device/currentDataReply/1') {
          mqttStore.setData('device', data)
        }
      })
    } else {
      clearInterval(timer.value)
      mqtt && mqtt.value?.unsubscribes()
    }
    // let mqtt = new MQTT([
    //       'retirement/device/offline/1',
    //       'retirement/device/eventData/1',
    //       'retirement/device/currentDataReply/1']);
    // mqtt.value.init()
    // mqtt.value.link()

    // mqtt.value.get((topic: any, message: any) => {
    //     console.log('收到来自', topic, '的消息', JSON.parse(message.toString()))

    //     let data = JSON.parse(message.toString())
    //     //设备下线
    //     if(topic === 'retirement/device/offline/1'){
    //       mqttStore.setData('offline',data)
    //     }
    //     //异常警告
    //     if(topic === 'retirement/device/eventData/1'){
    //       mqttStore.setData('error',data)
    //     }
    //     //设备实时数据
    //     if(topic === 'retirement/device/currentDataReply/1'){
    //       mqttStore.setData('device',data)
    //     }
    // })

    // setTimeout(() => {
    //     mqtt.value.unsubscribes()
    // },5000)
    // }






  })
})


onBeforeUnmount(() => {
  console.log("first")
  // mqtt.value.over()
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