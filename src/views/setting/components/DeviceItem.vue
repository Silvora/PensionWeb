<template>
    <Card :bordered="false" :padding="0" style="background: rgba(255, 255, 255, 1);margin-bottom: 10px;">
        <div class="deviceInfo">
            <p class="title">
                <span
                    :class="['t1', props.info?.online == 1 ? 'green' : 'gary']">{{ [t('离线'), t('在线')][props?.info.online] }}</span>

                <!-- <span :class="['t1', 'green', 'yellow', 'gary'][props.info.online]">{{['离线','在线'][props.info.online]}}</span> -->
                <span class="t2">{{ props?.info.roomBedNumber }}</span>
                <span class="t3" @click="handleGet">
                    <img src="@/assets/images/room-setting.png" alt="" srcset="">
                </span>
            </p>
            <div class="deviceBox">
                <img class="img" v-if="props.info?.type == 'ed719_type'" src="@/assets/images/setting_active.png" alt=""
                    srcset="" @click="handleSetCheck">
                <img class="img" v-else src="@/assets/images/setting_sleep2.png" alt="" srcset="" @click="handleSetCheck">

                <div class="info">
                    <div @click="handleGetDeviceInfo">
                        <p class="t1">
                            <!-- {{ props?.info.name }} -->
                            {{ props.info?.type == 'ed719_type' ? t('跌倒感知') : t('睡眠感知') }}
                        </p>
                        <p class="t2">
                            ID:{{ props?.info.mac }}
                        </p>
                        <p class="t2">
                            关联老人:{{ props?.info.elderlyInfo?.name }}
                        </p>
                    </div>

                    <span class="check">
                        <Checkbox v-model="check" @click="handleSetCheck">{{ }}</Checkbox>
                    </span>
                </div>

                <!-- <div class="imgInfo">
                    <img class="img" src="@/assets/images/screen.png" alt="" srcset="">
                    <div class="imgList">
                        <img src="@/assets/images/位图@2x(1).png" alt="">
                        <img src="@/assets/images/位图@2x(1).png" alt="">
                        <img src="@/assets/images/位图@2x(1).png" alt="">
                        <img src="@/assets/images/位图@2x(1).png" alt="">
                    </div>
                </div>
                <div class="info">
                    <p class="t4">张玲
                        <Icon type="ios-checkmark" />
                    </p>
                    <p class="t4">倪杰
                        <Icon type="ios-checkmark" />
                    </p>
                    <p class="t5">
                        <Icon type="ios-checkmark" />
                        12/次分
                    </p>
                    <p class="t5">
                        <Icon type="ios-checkmark" />
                        35/次
                    </p>
                    <p class="t5">
                        <Icon type="ios-checkmark" />
                        36.9/度
                    </p>
                </div> -->

            </div>
            <Button size="small" class="stateBtn"
                :style="{ background: 'rgba(224, 98, 85, 1)', color: '#fff', border: 'none' }"
                v-if="props.info?.stateInfo?.eventType">{{ errInfo[props.info?.stateInfo?.eventType] }}</Button>
            <Button size="small" class="stateBtn"
                :style="{ background: 'rgba(224, 98, 85, 1)', color: '#fff', border: 'none' }"
                v-else-if="props.info?.stateInfo?.onBedStatus">{{ ['不在床', '在床'][props.info?.stateInfo?.onBedStatus] }}</Button>
            <Button size="small" class="stateBtn"
                :style="{ background: 'rgba(18, 185, 135, 0.05)', color: 'rgba(18, 185, 135, 1)', border: 'none' }"
                v-else>{{ t('暂无连接设备') }}</Button>
        </div>
    </Card>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { Checkbox } from "view-ui-plus"
import { watchEffect } from 'vue';
//import {DeviceDetailId} from "@/api/Device/Device"
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const check = ref(false)
const props = defineProps({
    info: {
        type: Object,
        defined: {}
    },
    checkAll: {
        type: Boolean,
        default: false
    }
})

const errInfo = ref({
    3001: "离床",
    3006: "呼吸异常",
    3007: "心率异常",
    3012: "在床",
    3008: "紧急拉绳通知",
})

watchEffect(() => {
    // console.log("===========",props.checkAll)
    check.value = props.checkAll
    // console.log(check.value)

    // if(props.checkAll){
    //     check.value = true
    // }

})

const emit = defineEmits(['handleCheck', 'handleGetUser', 'handleOpenInfo'])
const handleSetCheck = () => {
    check.value = !check.value
    emit('handleCheck', { id: props.info.id, check: check.value })
}

const handleGet = () => {
    // DeviceDetailId({id:props.info.id}).then((res:any)=>{
    //     console.log(res)
    // })
    emit('handleGetUser', props.info)
}


const handleGetDeviceInfo = () => {
    emit('handleOpenInfo', props.info)
}


</script>

<style scoped lang='less'>
.deviceInfo {
    width: 100%;
    padding-bottom: 1px;
    cursor: pointer;

    .stateBtn {
        width: calc(100% - 20px);
        margin-left: 10px;
        margin-bottom: 10px;
    }

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
            border-radius: 4px 0 0 0;
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

    .deviceBox {
        margin: 10px;
        display: flex;
        position: relative;

        img {
            // display: inline-block;
            min-width: 60px;
            height: 60px;

            .img {
                width: 100%;
                height: 100%;
            }
        }

        // .imgInfo {
        //     display: flex;
        //     flex-direction: column;
        //     width: 130px;

        //     .img {
        //         width: 130px;
        //     }

        //     .imgList {
        //         width: 100%;
        //         background: gold;
        //         display: flex;
        //         justify-content: flex-start;
        //         align-items: center;
        //         height: 30px;

        //         img {
        //             width: 20px;
        //             margin-right: 10px;
        //         }
        //     }
        // }
        .check {
            position: absolute;
            top: 45px;
            left: 45px;
            display: inline-block;
        }

        .info {
            width: 100%;
            padding: 0 10px;

            .t1 {
                font-size: 16px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                color: #1C1B1B;
            }

            .t2 {
                font-size: 14px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                color: #8B8A96;
            }
        }
    }

}
</style>