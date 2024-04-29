<template>
    <Card :bordered="false" :padding="0" style="background: rgba(255, 255, 255, 1);margin-bottom: 10px;">
        <div :class="['userInfo', info.focus == 0 ? 'focus' : '', info?.deviceList[0]?.status == 10 ? 'error' : '',stateInfo?.eventType=='3008'?'flashing':'']">
            <p class="title">
                <span
                    :class="['t1', ['gary', 'green', 'yellow'][device?.status || 0]]">{{ [t('空闲'), t('正常'), t('异常')][device?.status || 0] }}</span>
                <span class="t2">{{ info?.roomBedNumber }}</span>
                <span class="t3">
                    <img src="@/assets/images/room-setting.png" alt="" srcset=""
                        @click="handleNavTo(`/add-elder?type=0&id=${info?.elderlyId}`)">
                    <!--  @click="handleNavTo(`/add-elder?type=0&id=${info?.elderlyId}`)" -->
                </span>
            </p>
            <div class="userBox">
                <div class="imgInfo">
                    <img @click="handleSetting" class="img" v-if="info.elderlyPhoto" :src="oss + info.elderlyPhoto" alt=""
                        srcset="">

                    <!-- handleOpenDeviceInfo -->
                    <!-- @click="handleNavTo(`/add-elder?type=0&id=${info?.elderlyId}`)" -->
                    <img @click="handleSetting" v-else class="img" src="@/assets/images/screen.png" alt="" srcset="">
                    <div class="imgList" @click="handleSetting">
                        <img src="@/assets/images/睡眠监测@2x(4).png" alt="">
                        <img src="@/assets/images/位图@2x(2).png" alt="">
                        <img src="@/assets/images/温度计@2x.png" alt="">
                        <img src="@/assets/images/紧急按钮@2x.png" alt="">
                    </div>
                </div>
                <div class="info">
                    <!-- @click="handleNavTo(`/elder`)" -->
                    <div>
                        <p class="t4">{{ info?.elderlyName }}
                            <!-- <Icon type="ios-checkmark" /> -->
                            <i v-if="info?.elderlyGender == 1" class="iconfont icon-nan" style="color:#0160FF"></i>
                            <i v-if="info?.elderlyGender == 2" class="iconfont icon-nv" style="color:#E06255"></i>
                        </p>
                        <p class="t4">
                            <!-- <Icon type="ios-checkmark" /> -->
                            <img src="@/assets/images/pad-processing@2x.png" alt="" style="width: 15px;margin-right: 10px">
                            {{ elderlyInfo?.staffName }}
                        </p>
                    </div>
                    <!-- @click="handleNavTo(`/setting`)" -->
                    <div @click="handleOpenDeviceInfo">
                        <p class="t5">
                            <!-- <Icon type="ios-checkmark" /> -->
                            <i class="iconfont icon-xindongzhi-manxin-" style="color:#E06255"></i>
                            {{ stateInfo?.heartRate || 0 }}/{{ t('次分') }}

                        </p>
                        <p class="t5">
                            <!-- <Icon type="ios-checkmark" /> -->
                            <img src="@/assets/images/ic_呼吸@3x.png" alt="" style="display: block;width: 16px;height: 16px;margin: 0 10px;">
                            <!-- <i class="iconfont icon-tidong" style="color:#0160FF"></i> -->
                            {{ stateInfo?.respiratoryRate || 0 }}/{{ t('次') }}
                        </p>
                        <p class="t5">
                            <!-- <Icon type="ios-checkmark" /> -->
                            <!-- <i class="iconfont icon-wenduji" style="color:#ED9000"></i> -->
                            <img src="@/assets/images/ic_体动@3x.png" alt="" style="display: block;width: 16px;height: 16px;margin: 0 10px;">

                            {{ stateInfo?.bodyMovement || 0 }}/{{ t('次') }}
                        </p>
                    </div>

                </div>
            </div>
        </div>

        <DeviceInfo ref="DeviceInfoRef"></DeviceInfo>
        <DeviceInfoCopy ref="DeviceInfoCopyRef"></DeviceInfoCopy>
        <DetailsModal ref="DetailsModalRef" :info="props.info" @handleUpdate="handleUpdate"></DetailsModal>
    </Card>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { ref, watchEffect } from 'vue';
import { useI18n } from "vue-i18n";
import DeviceInfo from '../setting/components/DeviceInfo.vue';
import DeviceInfoCopy from '../setting/components/DeviceInfo-Copy.vue';
import DetailsModal from "./DetailsModal.vue"
import { Message } from 'view-ui-plus';
import { watch } from 'vue';
const { t } = useI18n()
const router = useRouter()
const oss = ref<any>(import.meta.env.VITE_APP_AXIOS_BASER)

const info = ref<any>({})
const device = ref<any>({})
const elderlyInfo = ref<any>({})
const stateInfo = ref<any>({})
const DeviceInfoRef = ref<any>(null)
const DeviceInfoCopyRef =ref<any>(null)
const DetailsModalRef = ref<any>(null)

const props = defineProps({
    info: {
        type: Object,
        default: () => ({})
    }
})
const emit = defineEmits(['handleStatus'])

const handleSetting = () => {
    emit('handleStatus', true)
    DetailsModalRef.value.showModal()
}

const handleUpdate = () => {

}




const handleOpenDeviceInfo = () => {


    console.log(info.value)
    if (!info.value?.deviceList[0]?.stateInfo?.mac) {
        Message.warning(t('该老人没有绑定设备'))
    } else {
        // console.log(item)

        emit('handleStatus', true)


        // console.log("llllllllllllllllllllllll",{...info.value,mac:device.value.mac,elderlyInfo:info.value})

        if( device.value.type=="ed719_type"){
            DeviceInfoRef.value.Open({...info.value,mac:device.value.mac,elderlyInfo:{...info.value,name:info.value.elderlyName}})

        }else{
            DeviceInfoCopyRef.value.Open({...info.value,mac:device.value.mac,elderlyInfo:{...info.value,name:info.value.elderlyName}})
        }

    }

}

// const setData = ()=>{


//     // console.log("]]]]]]]]]]]]]]]]]]]]]]]]]]]")
//     console.log(props?.info)
//     info.value = props?.info
//     device.value = props?.info?.deviceList[0]
//     console.log(device.value)
//     stateInfo.value = device.value?.stateInfo
//     elderlyInfo.value = device.value?.elderlyInfo
// }

watch(()=>DeviceInfoRef.value?.modal, (b) => {
    // console.log("first",b)

    if(!b){
        emit('handleStatus', false)
    }
})

watch(()=>DeviceInfoCopyRef.value?.modal, (b) => {
    // console.log("first",b)
    if(!b){
        emit('handleStatus', false)
    }
})


watch(()=>DetailsModalRef.value?.detailsModal, (b) => {
    // console.log("first",b)
    if(!b){
        emit('handleStatus', false)
    }
})

// watch(()=>props?.info, (n) => {
//         setData()
// },{deep:true,immediate:true})

watchEffect(() => {
    info.value = props?.info
    device.value = props?.info?.deviceList[0]
    console.log(device.value)
    stateInfo.value = device.value?.stateInfo
    elderlyInfo.value = device.value?.elderlyInfo

})

const handleNavTo = (path: string) => {
    router.push(path)
}


</script>

<style scoped lang='less'>


@keyframes blink {
  0% { background-color: red; }
  50% { background-color: transparent; }
  100% { background-color: red; }
}

.flashing {
  animation: blink 1s infinite;
}

.focus {
    border: 1px solid red;
    border-radius: 4px;
}

.error {
    background: #ed4014;
    color: #fff;
}

.userInfo {
    width: 100%;
    padding-bottom: 1px;
    cursor: pointer;

    .title {
        width: 100%;
        height: 26px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .t1 {
            height: 100%;
            font-size: 10px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            padding: 0 2px;
            line-height: 26px;
            border-radius: 4px 0 4px 0;
        }

        .green {
            background: rgba(18, 185, 135, 1);
        }

        .yellow {
            background: rgba(237, 144, 0, 1);
        }

        .gary {
            background: rgba(139, 138, 150, 1);
        }

        .t2 {
            box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
            border-radius: 0px 0px 8px 8px;
            width: 150px;
            text-align: center;
        }

        .t3 {
            display: flex;

            img {
                display: inline-block;
                width: 26px;
            }
        }
    }

    .userBox {
        margin: 10px;
        display: flex;


        .imgInfo {
            display: flex;
            flex-direction: column;
            width: 130px;

            .img {
                display: inline-block;
                width: 130px;
                height: 130px;
            }

            .imgList {
                width: 100%;
                // background: gold;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 30px;

                img {
                    width: 20px;
                    margin-right: 10px;
                }
            }
        }

        .info {
            width: 100%;
            padding: 0 10px;

            .t4,
            .t5 {
                display: flex;
                width: 100%;
                margin: 2px 0;
                // justify-content: space-around;
                justify-content: start;
                align-items: center;
                height: 30px;

                i {
                    margin: 0 10px;
                }


            }

            .t4 {
                justify-content: start;
            }

            .t5 {
                background: rgba(1, 96, 255, 0.05);
                border-radius: 4px;
            }
        }
    }

}
</style>