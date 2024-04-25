<template>
    <div class="device_box">
        <Modal v-model="modal" :title="t('设备记录')" width="800" :footer-hide="true">
            <template #close>
                <Icon type="md-close-circle" color="#000" size="16" />
            </template>

            <div style="width: 100%;display: flex;justify-content: flex-end;margin-bottom: 10px;">
                <DatePicker type="daterange" format="yyyy-MM-dd"  split-panels :placeholder="t('选择日期')" v-model="dateSearch" style="width: 200px" @on-change="getData"></DatePicker>
            </div>
            <div class="userInfo">
                <div class="photo">
                    <img :src="oss + userInfo?.photo" alt="">
                </div>
                <div class="info">
                    <Grid border :col="6" :padding="'10px'" style="border: 1px solid #ebeef5;">
                        <GridItem style="background: #fafafa;color: #909399;">{{ t('姓名') }}</GridItem>
                        <GridItem>{{ userInfo?.name || '&nbsp;' }}</GridItem>
                        <GridItem style="background: #fafafa;color: #909399;">{{ t('性别') }}</GridItem>
                        <GridItem>
                            <span>{{ userInfo?.gender == 1 ? t('男') : userInfo?.gender == 2 ? t('女') : t('未知') }}</span>
                        </GridItem>
                        <GridItem style="background: #fafafa;color: #909399;">{{ t('居住信息') }}</GridItem>
                        <GridItem>{{ userInfo?.roomBedNumber || '&nbsp;' }}</GridItem>

                        <GridItem style="background: #fafafa;color: #909399;">{{ t('护理等级') }}</GridItem>
                        <GridItem>{{ userInfo?.nursingGrade || '&nbsp;' }}</GridItem>

                        <GridItem style="background: #fafafa;color: #909399;">{{ t('护理员') }}</GridItem>
                        <GridItem>{{ userInfo?.staffName || '&nbsp;' }}</GridItem>

                        <GridItem style="background: #fafafa;color: #909399;">{{ t('入住时间') }}</GridItem>
                        <GridItem>{{ userInfo?.startTime?.split(" ")[0] || '&nbsp;' }}</GridItem>
                    </Grid>
                </div>
            </div>
            <div class="context">
                <Table :columns="columns" :data="data" height="300">
                
                    <template #deviceType="{ row, index }">
                        <span>{{ row.deviceType== 'ed719_type' ? t('行为感知') : t('睡眠感知') }}</span>
               </template>
                

               <template #eventType="{ row, index }">
                        <span>{{ eventTypeMap[row.eventType] }}</span>
               </template>

                </Table>
            </div>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import {DeviceWarningLog, DeviceSleepDeviceDetectionDays, DeviceSleepDeviceDayReport, DeviceSleepDeviceHeartRateByMinute,DeviceUsageRecordList } from "@/api/Device/Device"
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import dayjs from "dayjs"
import { useRouter } from "vue-router"
import { Message } from "view-ui-plus";
import { watch } from "vue";
const router = useRouter()
const { t } = useI18n()
const modal = ref<boolean>(false)
const userInfo = ref<any>({})
const mac = ref<any>('')
const logInfo = ref<any>({})
const date = ref(dayjs().format('YYYY-MM-DD'))
const dateSearch = ref<any>(['',''])
const logDay = ref<any>(null)
const DeviceInfoListInfo = ref<any>({})
// const msg = ref<any>(null)
const oss = ref<any>(import.meta.env.VITE_APP_AXIOS_BASER)

const eventTypeMap:any={
    3001:t('离床'),
    3006:t('呼吸异常'),
    300:t('心率异常'),
    3012:t('在床'),
    3008:t('紧急拉绳通知'),
    3101:t('确认跌倒'),
    3102:t('疑似跌倒'),
    3103:t('跌倒解除')
}

const columns = [
{
                        title: t('事件时间'),
                        key: 'createTime',
                        align: 'center',

                    },
                    {
                        title: t('事件类型'),
                        key: 'eventType',
                        align: 'center',
                        slot: 'eventType'

                    },
                    {
                        title: t('事件设备'),
                        key: 'deviceType',
                        align: 'center',
                        slot: 'deviceType'
                    },
                    {
                        title: t('事件内容'),
                        key: 'notes',
                        align: 'center',
                        // slot: 'eventType'
                    }
]
const data = ref<any>([])
// watch(mac, () => {
//     getData()
// })

const Open = (data: any) => {
    userInfo.value = data.elderlyInfo
    mac.value = data.mac
    console.log(data)

    // msg.value = Message.loading({
    //     content: 'Loading...',
    //     duration: 0
    // });
    // setTimeout(msg, 3000);

    getData()

    modal.value = true

}
const Close = () => {
    modal.value = false
}

const toHourMinute = (minutes: any) => {
    if (!minutes) return '-'
    return (Math.floor(minutes / 60) + ":" + (minutes % 60));
    // 也可以转换为json，以方便专外部使用属
    // return {hour:Math.floor(minutes/60),minute:(minutes%60)};
}
const toHourSecond = (second: any) => {
    if (!second) return '-'
    return (Math.floor(second / 60 / 60) + ":" + (second % 60));
    // 也可以转换为json，以方便专外部使用属
    // return {hour:Math.floor(minutes/60),minute:(minutes%60)};
}

const handleLog = () => {
    modal.value = false
    router.push({ path: '/log' })
}

onMounted(() => {
   
})

const getData = () =>{

    console.log(dateSearch.value)
    DeviceWarningLog({
        startTime:dateSearch.value[0]?dayjs(dateSearch.value[0]).format('YYYY-MM-DD'):'',
        endTime:dateSearch.value[1]?dayjs(dateSearch.value[1]).format('YYYY-MM-DD'):'',
        mac:mac.value
    }).then((res: any) => {
        console.log(res)
        data.value = res.data
    })
}

const getDatadddd = () => {

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
        let time = [
            [],
            [],
            [],
            []
        ]
        let t = new Set()
        // 	integer($int32状态 0:无人 1:清醒 2:浅睡 3:深睡
        res.data?.sleepRangeList?.forEach((element: any) => {
            // time.push(element.time)
            t.add(new Date(element.startTime))
            t.add(new Date(element.endTime))
            time[element.type].push()
        });


    })

    DeviceSleepDeviceHeartRateByMinute({
        startTime: dayjs(date.value).subtract(1, 'day').format('YYYY-MM-DD'),
        endTime: date.value,
        mac: mac.value
    }).then((res: any) => {
        console.log(res)
        let d1: any = []//最高呼吸率
        let d2: any = []//最高心率
        let d3: any = []//最高体动
        let d4: any = []//最低呼吸率
        let d5: any = []//最低心率
        let d6: any = []//最低体动
        let date: any = [] //时间

        if (!res.data) {
            console.log("=================")
            DeviceInfoListInfo.value = null

            // msg.value = null
            // modal.value = true

            return
        }

        res.data?.forEach((element: any) => {
            d1.push(element?.highBreathRate || 0)
            d2.push(element?.highHeartRate || 0)
            d3.push(element?.highPhysical || 0)
            d4.push(element?.lowBreathRate || 0)
            d5.push(element?.lowHeartRate || 0)
            d6.push(element?.lowPhysical || 0)
            date.push(element?.minute?.split(" ")[1]?.slice(0, 5) || '')
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

        // msg.value = null
        // modal.value = true



    })

}

defineExpose({
    modal,
    Open,
    Close,
})

</script>

<style lang="less" scoped>
.userInfo {
    display: flex;

    .photo {
        width: 84px;
        height: 84px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .info {
        width: 100%;
    }
}

.context {
    width: 100%;
    // display: flex;
    margin-top: 10px;



    // .userInfo {
    //     flex: 1;

    //     .title {
    //         font-weight: bold;
    //     }

    //     img {
    //         display: block;
    //         width: 100px;
    //         height: 100px;
    //         margin: 5px 0;
    //     }

    //     .item {
    //         display: flex;

    //         span:nth-child(1) {
    //             width: 100px;
    //         }

    //     }
    // }



}</style>