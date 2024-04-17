<template>
    <Card :bordered="false" :padding="0" style="background: rgba(255, 255, 255, 1);margin-bottom: 10px;">
        <div class="errInfo">
            <p class="title">
                <span
                    :class="['t1', props.info?.online == 1 ? 'green' : 'gary']">{{ ['离线', '在线'][props.info?.online] }}</span>

                <span class="t2">{{ props.info?.type == 'ed719_type' ? t('行为感知') : t('睡眠感知') }}</span>
                <span class="t3">
                    <img src="@/assets/images/room-setting.png" alt="" srcset="">
                </span>
            </p>
            <div class="errBox">
                <img class="img" src="@/assets/images/screen.png" alt="" srcset="">
                <div class="info">
                    <p class="t1">{{ props.info?.name }}

                    </p>
                    <p class="t2">
                        <img :src="oss + props.info?.elderlyInfo?.elderlyPhoto" alt=""
                            v-if="props.info?.elderlyInfo?.elderlyPhoto">
                        <img src="@/assets/images/pad-processing@2x.png" alt="" v-else>
                        {{ props.info?.elderlyInfo?.name }}
                    </p>
                </div>
            </div>
            <p class="roomTitle">{{ t('床位') }}:{{ props.info?.roomBedNumber }}</p>
            <div class="imgList">
                <img src="@/assets/images/睡眠监测@2x(4).png" alt="">
                <img src="@/assets/images/位图@2x(2).png" alt="">
                <img src="@/assets/images/温度计@2x.png" alt="">
                <img src="@/assets/images/紧急按钮@2x.png" alt="">
            </div>
            <!-- <Button type="error" size="small" class="stateBtn">心率异常</Button> -->
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
//import {DeviceDetailId} from "@/api/Device/Device"
import { useI18n } from "vue-i18n";
const oss = ref<any>(import.meta.env.VITE_APP_AXIOS_BASER)

const { t } = useI18n()
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
</script>

<style scoped lang='less'>
.errInfo {
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
            width: 90px;
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

    .errBox {
        margin: 10px;
        display: flex;

        img {
            width: 40px;
            height: 40px;
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
                img {
                    width: 12px;
                    height: 12px;
                }

                font-size: 14px;
                font-family: PingFangSC,
                PingFang SC;
                font-weight: 400;
                color: #1C1B1B;
            }
        }
    }

    .roomTitle {
        width: 100%;
        padding: 10px;
        font-size: 14px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #1C1B1B;
    }

    .imgList {
        display: flex;
        margin-bottom: 10px;
        justify-content: space-around;

        img {
            width: 20px;
            height: 20px;
        }
    }

    .stateBtn {
        width: calc(100% - 20px);
        margin-left: 10px;
        margin-bottom: 10px;
    }

}
</style>