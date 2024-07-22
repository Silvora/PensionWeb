<template>
    <div class="device_box">
        <Modal v-model="modal" :title="t('设备记录')" width="800" :footer-hide="true" :mask-closable="false">
            <template #close>
                <Icon type="md-close-circle" color="#000" size="16" />
            </template>
            <div class="userInfo">
                <div class="photo">
                    <img :src="oss + userInfo?.photo" alt="" v-if="userInfo?.photo">
                    <img src="@/assets/images/screen.png" alt="" srcset="" v-else>
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
                        <GridItem>{{ userInfo?.roomBedNumber?.slice(4) || '&nbsp;' }}</GridItem>
                        <GridItem style="background: #fafafa;color: #909399;">{{ t('护理等级') }}</GridItem>
                        <GridItem>{{ jobLevelList[userInfo?.nursingGrade]|| '&nbsp;' }}</GridItem>
                        <GridItem style="background: #fafafa;color: #909399;">{{ t('护理员') }}</GridItem>
                        <GridItem>{{ userInfo?.staffName || '&nbsp;' }}</GridItem>
                        <GridItem style="background: #fafafa;color: #909399;">{{ t('入住时间') }}</GridItem>
                        <GridItem>{{ userInfo?.startTime?.split(" ")[0] || '&nbsp;' }}</GridItem>
                    </Grid>
                </div>
                <!-- <p class="title">{{ t('老人详情') }}</p> -->


                <!-- <div v-if="userInfo">
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
                    </div> -->
            </div>
            <div class="context" v-if="modal">

                <!-- <div class="userInfo">
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
                </div> -->
                <div class="log">
                    <p class="title">{{ t('睡眠记录') }}</p>
                    <div>
                        <div class="logDay">
                            <p>{{ t('连续测量天数') }}: {{ logDay || '-' }}</p>
                            <Button type="primary" @click="handleLog">{{ t('日志') }}</Button>
                        </div>
                        <div class="date">
                            <VDatePicker v-model.string="date" mode="date" :masks="masks" is-required
                                style="width: 100%;height: auto;" :attributes="attributes">
                            </VDatePicker>
                        </div>
                        <div v-if="logInfo">
                            <p class="sub_title">
                                <i class="iconfont icon-huobifenxi" style="color:#0160FF"></i>
                                {{ t('睡眠综合分析') }}
                            </p>
                            <p class="time1"><span
                                    class="big">{{ toHourSecond(logInfo?.sleepLong).split(":")[0] || '-' }}</span>{{ t('小时') }}
                                <span class="big">{{ toHourSecond(logInfo?.sleepLong).split(":")[1] || '-' }}</span>
                                {{ t('分钟') }}</p>
                            <p class="time2">{{ t('入睡时间') }} <span
                                    class="bold">{{ logInfo?.sleepStartTime?.slice(11,-3) }}</span>
                                <!-- {{ t('分') }},  -->
                                {{ t('结束时间') }}<span
                                    class="bold">{{ logInfo?.sleepEndTime?.slice(11,-3) }}</span> 
                                    <!-- {{ t('分') }} -->
                            </p>
                            <p class="desc">{{ toSleepInfoScore(logInfo.evaluation) }}</p>
                            <div>
                                <!-- <Chart1 :logInfoTime="{}"></Chart1> -->
                            </div>
                            <div class="info" style="width: 100%;">

                                <!-- {{ t('暂无数据') }} -->
                                <Row>
                                    <Col :span="12">
                                    <p class="title">夜间睡眠{{ toHourSecond(logInfo?.sleepLong).split(":")[0] }}时{{ toHourSecond(logInfo?.sleepLong).split(":")[1] }}分</p>
                                    <p class="d">{{ t('参考值:') }}6～10{{ t('小时') }}</p>
                                    </Col>
                                    <Col :span="12">
                                    <p class="title">清醒比例{{ logInfo?.sleepLong ? (logInfo?.awakeLong*100 /
                                        logInfo?.totalTime).toFixed(1) : '-' }}%</p>
                                    <p class="d">{{ t('参考值:') }}0～10%</p>
                                    </Col>
                                    <Col :span="12">
                                    <p class="title">浅睡比例{{ logInfo?.sleepLong ? (logInfo?.sleepLight*100 /
                                        logInfo?.totalTime).toFixed(1) : '-' }}%</p>
                                    <p class="d">{{ t('参考值:') }}20～60%</p>
                                    </Col>
                                    <Col :span="12">
                                    <p class="title">深睡比例{{ logInfo?.sleepLong ? (logInfo?.sleepDeep*100 /
                                        logInfo?.totalTime).toFixed(1) : '-' }}%</p>
                                    <p class="d">{{ t('参考值:') }}20～80%</p>
                                    </Col>
                                    <Col :span="12">
                                    <p class="title">睡眠次数{{ logInfo?.sleepNumber || '0' }}次</p>
                                    <p class="d">{{ t('参考值:') }}1{{ t('次') }}</p>
                                    </Col>
                                    <Col :span="12">
                                    <p class="title">翻身次数{{ logInfo?.turnOverNumber || '0' }}次</p>
                                    <p class="d">{{ t('参考值:') }}20～45{{ t('次') }}</p>
                                    </Col>
                                    <Col :span="12">
                                    <p class="title">离床次数{{ logInfo?.leaveBedNumber || '0' }}次</p>
                                    <p class="d">{{ t('参考值:') }}0～2{{ t('次') }}</p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div v-else style="text-align: center;">
                            {{ t('暂无数据') }}
                        </div>
                    </div>

                </div>
                <div class="chat">
                    <!-- <p class="title">{{ t('健康数据') }}</p> -->
                    <div style="width: 100%;">
                        <p class="title"> <i class="iconfont icon-xindongzhi-manxin-"
                                style="color:#E06255"></i>{{ t('心率') }}</p>
                        <Chart5 :DeviceInfoListInfo="DeviceInfoListInfo"></Chart5>
                        <br>
                        <p class="title">
                            <!-- <i class="iconfont icon-huxizhuanke" style="color:#0160FF"></i> -->
                            <img src="@/assets/images/ic_呼吸@3x.png" alt="" style="display: inline-block;width: 16px;height: 16px;margin-right: 3px;">

                            {{ t('呼吸频率') }}</p>
                        <Chart6 :DeviceInfoListInfo="DeviceInfoListInfo"></Chart6>
                        <br>
                        <p class="title">
                            <!-- <i class="iconfont icon-tidong" style="color:#ED9000"></i> -->
                            <img src="@/assets/images/ic_体动@3x.png" alt="" style="display: inline-block;width: 16px;height: 16px;margin-right: 3px;">

                            {{ t('体动') }}</p>
                        <Chart7 :DeviceInfoListInfo="DeviceInfoListInfo"></Chart7>
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
import Chart5 from "./Chart5.vue";
import Chart6 from "./Chart6.vue";
import Chart7 from "./Chart7.vue";
import {DeviceSleepDeviceReportDate, DeviceSleepDeviceCurrentData,DeviceSleepDeviceDetectionDays, DeviceSleepDeviceDayReport, DeviceSleepDeviceHeartRateByMinute } from "@/api/Device/Device"
import { onMounted, ref, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import dayjs from "dayjs"
import { useRouter } from "vue-router"
import { Message } from "view-ui-plus";
import { watch } from "vue";
import { dataTool } from "echarts";
import { onBeforeUnmount } from "vue";
const router = useRouter()
const { t } = useI18n()
const modal = ref<boolean>(false)
const userInfo = ref<any>({})
const mac = ref<any>('')
const logInfo = ref<any>({})
const date = ref(dayjs().format('YYYY-MM-DD'))

const jobLevelList = ref(["三级", "二级", "一级", "特一级", "特二级", "特三级", "专需护理"])

const toSleepInfoScore = (score:any) =>{
    if(score>80){
        return '睡眠優質，請您繼續保持好習慣。'
    }
    else if(score>60){
         return '睡眠質量不佳，加強運動可以幫您改善睡眠。'
    }
    else if(score>40){
         return '睡眠質量不佳，改善作息可以幫您改善睡眠。'
    }
    else{
         return '睡眠急需改善，调整調整心態與作息可以幫您改善睡眠。'
    }
}

const oldDate = ref(dayjs().subtract(1, 'day').format('YYYY-MM-DD'))
const masks = ref({
    modelValue: 'YYYY-MM-DD',
});
const logDay = ref<any>(null)
const DeviceInfoListInfo = ref<any>({})
// const msg = ref<any>(null)
const oss = ref<any>(import.meta.env.VITE_APP_AXIOS_BASER)

const timer = ref<any>(null)

const attributes = ref<any>([
    // {
    //     highlight: {
    //       color: '#dbeafe',
    //       fillMode: 'light',
    //     },
    //     dates: new Date(2024, 5, 13),
    //   }




])

watch(modal, (v) => {
    if(!v){
        clearInterval(timer.value)
        timer.value = null
    }
})

watch(date, () => {
    // console.log("><<<<<<<?????????????????????",v)

    // setDeviceInfoListInfo()
    getData()
})


const getStatus = () => {
    DeviceSleepDeviceCurrentData({mac:mac.value}).then((res: any) => {
        console.log(res)
        setDeviceInfoListInfo(res.data)
    })

    timer.value = setInterval(() => {
        DeviceSleepDeviceCurrentData({mac:mac.value}).then((res: any) => {
            setDeviceInfoListInfo(res.data)
        })
    },6000)
}


const setDeviceInfoListInfo = (data: any) => { 
    // res.data?.forEach((element: any) => {
    //         d1.push(element?.highBreathRate || 0)
    //         d2.push(element?.highHeartRate || 0)
    //         d3.push(element?.highPhysical || 0)
    //         d4.push(element?.lowBreathRate || 0)
    //         d5.push(element?.lowHeartRate || 0)
    //         d6.push(element?.lowPhysical || 0)
    //         date.push(element?.minute?.split(" ")[1]?.slice(0, 5) || '')
    //     });
    // let d1: any = []//最高呼吸率
    //     let d2: any = []//最高心率
    //     let d3: any = []//最高体动
    //     let d4: any = []//最低呼吸率
    //     let d5: any = []//最低心率
    //     let d6: any = []//最低体动
    //     let date: any = [] //时间

    let len = data?.respiratoryRateList.length

    let info = {
        d1: data?.respiratoryRateList,//呼吸率值
        d2: data?.heartRateList,//心率值
        d3: data?.bodyMovementList,//体动值
        d4: data?.respiratoryRateList,
        d5: data?.heartRateList,
        d6: data?.bodyMovementList,
        'date': [data?.time, ...Array(len-1).fill('')],

    }
    DeviceInfoListInfo.value = info
 }


 const getDataHot = () => {
    const day = dayjs().format('YYYY-MM-DD')

const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

    DeviceSleepDeviceReportDate({
        mac: mac.value,
        dayTime: day
    }).then((res: any) => {
        // console.log("----------------",res)

        let attrs:any = []
        res.data.forEach((item:any)=>{

            let i = item.split("-")

            console.log(i,year,month)

            let it = {
                highlight:{
                color: '#dbeafe',
                fillMode: 'light',
                },
                dates: new Date(year, month, i[2]*1),
            }

            attrs.push(it)
           
        })

        attributes.value = attrs



    })

 }



const Open = (data: any) => {
    userInfo.value = data.elderlyInfo
    mac.value = data.mac
    console.log(data)

    date.value =  dayjs().format('YYYY-MM-DD')

    getStatus()
    getData()

    getDataHot()

    // msg.value = Message.loading({
    //     content: 'Loading...',
    //     duration: 0
    // });
    // setTimeout(msg, 3000);

   

    // getData()

    modal.value = true

}
const Close = () => {
    clearInterval(timer.value)
    timer.value = null
    modal.value = false
   
}

onBeforeUnmount(() => {
    clearInterval(timer.value)
    timer.value = null
})

const toHourMinute = (minutes: any) => {
    if (!minutes) return '-'
    return (Math.floor(minutes / 60) + ":" + (minutes % 60));
    // 也可以转换为json，以方便专外部使用属
    // return {hour:Math.floor(minutes/60),minute:(minutes%60)};
}
const toHourSecond = (second: any) => {
    if (!second) return '-'
    return (Math.floor(second / 3600)) + ":" + (Math.floor(((second % 3600) / 60)));
    // 也可以转换为json，以方便专外部使用属
    // return {hour:Math.floor(minutes/60),minute:(minutes%60)};
}

const handleLog = () => {
    modal.value = false
    router.push({ path: '/log' })
}

onMounted(() => {
    // getData()
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
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",res)
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

    // DeviceSleepDeviceHeartRateByMinute({
    //     startTime: dayjs(date.value).subtract(1, 'day').format('YYYY-MM-DD'),
    //     endTime: date.value,
    //     mac: mac.value
    // }).then((res: any) => {
    //     console.log(res)
    //     let d1: any = []//最高呼吸率
    //     let d2: any = []//最高心率
    //     let d3: any = []//最高体动
    //     let d4: any = []//最低呼吸率
    //     let d5: any = []//最低心率
    //     let d6: any = []//最低体动
    //     let date: any = [] //时间

    //     if (!res.data) {
    //         console.log("=================")
    //         DeviceInfoListInfo.value = null

    //         // msg.value = null
    //         // modal.value = true

    //         return
    //     }

    //     res.data?.forEach((element: any) => {
    //         d1.push(element?.highBreathRate || 0)
    //         d2.push(element?.highHeartRate || 0)
    //         d3.push(element?.highPhysical || 0)
    //         d4.push(element?.lowBreathRate || 0)
    //         d5.push(element?.lowHeartRate || 0)
    //         d6.push(element?.lowPhysical || 0)
    //         date.push(element?.minute?.split(" ")[1]?.slice(0, 5) || '')
    //     });

    //     DeviceInfoListInfo.value = {
    //         d1,
    //         d2,
    //         d3,
    //         d4,
    //         d5,
    //         d6,
    //         date
    //     }

    //     // msg.value = null
    //     // modal.value = true



    // })

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
    display: flex;
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

    .log {
        flex: 3;
        // margin: 0 10px;
        margin-right: 10px;

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

        .info {
            margin-top: 10px;

            .title {
                font-weight: bold;
                display: flex;
                align-items: center;
                // justify-content: center;
            }

            .title::before {
                content: " ";
                display: inline-block;
                width: 3px;
                height: 14px;
                background: #1890ff;
                margin-right: 5px
            }

            .d {
                font-size: 12px;
                color: #8B8A96;
                padding: 4px 0;
            }
        }
    }

    .chat {
        flex: 5;
        margin-left: 10px;
        // background: blue;

        .title {
            font-weight: bold;
            display: flex;
            align-items: center;
            // justify-content: center;
        }
    }


}</style>