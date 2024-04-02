<template>
    <div class="device_box">
        <Modal v-model="modal" title="睡眠记录" width="1000" :footer-hide="true">
            <template #close>
                <Icon type="md-close-circle" color="#000" size="16" />
            </template>
            <div class="context" v-if="modal">
                <div class="userInfo">
                    <p class="title">{{ t('老人详情') }}</p>
                    <div v-if="userInfo">
                        <img :src="userInfo.photo" alt="">
                        <p class="item">
                            <span>{{ t('姓名') }}</span>
                            <span>{{ userInfo.name }}</span>
                        </p>
                        <p class="item">
                            <span>{{ t('性别') }}</span>
                            <span>{{ userInfo.gender == 1 ? t('男') : userInfo.gender == 2 ? t('女') : t('未知') }}</span>
                        </p>
                        <p class="item">
                            <span>{{ t('居住信息') }}</span>
                            <span>{{ userInfo.roomBedNumber }}</span>
                        </p>
                        <p class="item">
                            <span>{{ t('护理等级') }}</span>
                            <span>{{ userInfo.nursingGrade }}</span>
                        </p>
                        <p class="item">
                            <span>{{ t('护理员') }}</span>
                            <span>{{ userInfo.staffName }}</span>
                        </p>
                        <p class="item">
                            <span>{{ t('入住时间') }}</span>
                            <span>{{ userInfo.startTime }}</span>
                        </p>
                    </div>
                    <div v-else>
                        {{ t('暂无数据') }}
                    </div>
                </div>

                <div class="log">
                    <p class="title">{{ t('睡眠记录') }}</p>
                    <div v-if="logInfo">
                        <div class="logDay">
                            <p>{{ t('连续测量天数') }}: {{ logDay }}</p>
                            <Button type="primary">{{ t('日志') }}</Button>
                        </div>
                        <div class="date">
                            <VDatePicker v-model.string="date" mode="date" :masks="masks" is-required style="width: 100%;">
                            </VDatePicker>
                        </div>
                        <p class="sub_title">{{ t('睡眠综合分析') }}</p>
                        <p class="time1"><span
                                class="big">{{ toHourMinute(logInfo.sleepLong).split(":")[0] }}</span>{{ t('小时') }} <span
                                class="big">{{ toHourMinute(logInfo.sleepLong).split(":")[1] }}</span> {{ t('分钟') }}</p>
                        <p class="time2">{{ t('入睡时间') }} <span class="bold">{{ logInfo.sleepStartTime }}</span>
                            {{ t('分') }}, {{ t('结束时间') }}<span class="bold">{{ logInfo.sleepEndTime }}</span> {{ t('分') }}
                        </p>
                        <p class="desc">{{ t('睡眠质量不佳,加强欲动可以帮助你改善睡眠') }}</p>
                        <div>
                            {{ t('睡眠数据') }}
                        </div>
                        <div class="info" style="width: 100%;">
                            <!-- {{ date }} -->
                            <Chart1></Chart1>
                        </div>
                    </div>
                    <div v-else>
                        {{ t('暂无数据') }}
                    </div>
                </div>
                <div class="chat">
                    <!-- <p class="title">{{ t('健康数据') }}</p> -->
                    <div style="width: 100%;">
                        <p class="title">{{ t('心率') }}</p>
                        <Chart2 :DeviceInfoListInfo="DeviceInfoListInfo"></Chart2>
                        <p class="title">{{ t('呼吸频率') }}</p>
                        <Chart3 :DeviceInfoListInfo="DeviceInfoListInfo"></Chart3>
                        <p class="title">{{ t('体动') }}</p>
                        <Chart4 :DeviceInfoListInfo="DeviceInfoListInfo"></Chart4>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import Chart1 from "./Chart1.vue";
import Chart2 from "./Chart2.vue";
import Chart3 from "./Chart3.vue";
import Chart4 from "./Chart4.vue";
import { DeviceSleepDeviceDetectionDays, DeviceSleepDeviceDayReport,DeviceSleepDeviceHeartRateByMinute } from "@/api/Device/Device"
import { onMounted, ref, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import dayjs from "dayjs"
const { t } = useI18n()
const modal = ref<boolean>(false)
const userInfo = ref<any>({})
const mac = ref<any>('')
const logInfo = ref<any>({})
const date = ref(dayjs().format('YYYY-MM-DD'))
const oldDate = ref(dayjs().subtract(1, 'day').format('YYYY-MM-DD'))   
const masks = ref({
    modelValue: 'YYYY-MM-DD',
});
const logDay = ref<any>(null)
const DeviceInfoListInfo = ref<any>({})
const Open = (data: any) => {
    userInfo.value = data.elderlyInfo
    mac.value = data.mac
    console.log(data)
    modal.value = true

    getData()

}
const Close = () => {
    modal.value = false
}

const toHourMinute = (minutes: any) => {
    return (Math.floor(minutes / 60) + ":" + (minutes % 60));
    // 也可以转换为json，以方便专外部使用属
    // return {hour:Math.floor(minutes/60),minute:(minutes%60)};
}

onMounted(() => {

})

const getData = () => {

    DeviceSleepDeviceDetectionDays({
        mac: mac.value
    }).then((res: any) => {
        console.log(res)
        logDay.value = res.data
    })

    DeviceSleepDeviceDayReport({
        dayTime: date.value,
        mac: mac.value
    }).then((res: any) => {
        console.log(res)
        logInfo.value = res.data
    })

    DeviceSleepDeviceHeartRateByMinute({
        startTime: oldDate.value,
        endTime: date.value,
        mac: mac.value
    }).then((res: any) => {
        console.log(res)
        let d1:any = []//最高呼吸率
        let d2:any = []//最高心率
        let d3:any = []//最高体动
        let d4:any = []//最低呼吸率
        let d5:any= []//最低心率
        let d6:any = []//最低体动
        let date:any = [] //时间

        res.data.forEach((element:any) => {
            d1.push(element.highBreathRate)
            d2.push(element.highHeartRate)
            d3.push(element.highPhysical)
            d4.push(element.lowBreathRate)
            d5.push(element.lowHeartRate)
            d6.push(element.lowPhysical)
            date.push(element.minute.split(" ")[1].slice(0,5))
        });

        DeviceInfoListInfo.value = {
            d1,
            d2,
            d3,
            d4,
            d5,
            d6,
            date
        }


    })

}

defineExpose({
    Open,
    Close,
})

</script>

<style lang="less" scoped>
.context {
    width: 100%;
    display: flex;




    .userInfo {
        flex: 1;

        // background: red;
        .title {
            font-weight: bold;
        }

        img {
            display: block;
            width: 100px;
            height: 100px;
            margin: 5px 0;
        }

        .item {
            display: flex;

            span:nth-child(1) {
                width: 100px;
            }

            // justify-content: space-between;
        }
    }

    .log {
        flex: 2;
        margin: 0 10px;

        // background: yellow;
        .title {
            font-weight: bold;
        }

        .date {
            margin: 10px 0;
        }

        .logDay {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .sub_title {
            color: rgba(0, 0, 0, .5);
        }

        .time1 {
            .big {
                font-weight: bold;
                font-size: 20px;
            }
        }

        .time2 {
            font-weight: bold;
        }
    }

    .chat {
        flex: 2;
        // background: blue;

        .title {
            font-weight: bold;
        }
    }


}
</style>