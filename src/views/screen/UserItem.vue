<template>
    <Card :bordered="false" :padding="0" style="background: rgba(255, 255, 255, 1);margin-bottom: 10px;">
        <div class="userInfo">
            <p class="title">
                <span
                    :class="['t1', ['gary', 'green', 'yellow'][device?.status || 0]]">{{ ['空闲', '正常', '异常'][device?.status || 0] }}</span>
                <span class="t2">{{ info?.roomBedNumber }}</span>
                <span class="t3" @click="handleNavTo(`/add-elder?id=${info?.elderlyId}`)">
                    <img src="@/assets/images/room-setting.png" alt="" srcset="">
                </span>
            </p>
            <div class="userBox">
                <div class="imgInfo">
                    <img class="img" src="@/assets/images/screen.png" alt="" srcset=""
                        @click="handleNavTo(`/add-elder?id=${info?.elderlyId}`)">
                    <div class="imgList" @click="handleNavTo(`/setting`)">
                        <img src="@/assets/images/睡眠监测@2x(4).png" alt="">
                        <img src="@/assets/images/位图@2x(2).png" alt="">
                        <img src="@/assets/images/温度计@2x.png" alt="">
                        <img src="@/assets/images/紧急按钮@2x.png" alt="">
                    </div>
                </div>
                <div class="info">
                    <div @click="handleNavTo(`/elder`)">
                        <p class="t4">{{ info?.elderlyName }}
                            <!-- <Icon type="ios-checkmark" /> -->
                            <i v-if="info?.elderlyGender == 1" class="iconfont icon-nan" style="color:#0160FF"></i>
                            <i v-if="info?.elderlyGender == 2" class="iconfont icon-nv" style="color:#E06255"></i>
                        </p>
                        <p class="t4">
                            <!-- <Icon type="ios-checkmark" /> -->
                            <img src="@/assets/images/pad-processing@2x.png" alt="" style="width: 15px;">
                            {{ elderlyInfo?.staffName }}
                        </p>
                    </div>
                    <div @click="handleNavTo(`/setting`)">
                        <p class="t5">
                            <!-- <Icon type="ios-checkmark" /> -->
                            <i class="iconfont icon-xindongzhi-manxin-" style="color:#E06255"></i>
                            {{ stateInfo?.heartRate || 0 }}/次分

                        </p>
                        <p class="t5">
                            <!-- <Icon type="ios-checkmark" /> -->
                            <i class="iconfont icon-tidong" style="color:#0160FF"></i>
                            {{ stateInfo?.bodyMovement || 0 }}/次
                        </p>
                        <p class="t5">
                            <!-- <Icon type="ios-checkmark" /> -->
                            <i class="iconfont icon-wenduji" style="color:#ED9000"></i>
                            {{ stateInfo?.bodyMovement || 0 }}/度
                        </p>
                    </div>

                </div>
            </div>
        </div>
    </Card>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { ref, watchEffect } from 'vue';
const router = useRouter()

const info = ref<any>({})
const device = ref<any>({})
const elderlyInfo = ref<any>({})
const stateInfo = ref<any>({})

const props = defineProps({
    info: {
        type: Object,
        default: () => ({})
    }
})

watchEffect(() => {

    console.log(props?.info)
    info.value = props?.info
    device.value = props?.info?.deviceList
    console.log(device.value)
    stateInfo.value = device.value?.stateInfo
    elderlyInfo.value = device.value?.elderlyInfo


})

const handleNavTo = (path: string) => {
    router.push(path)
}


</script>

<style scoped lang='less'>
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

    .userBox {
        margin: 10px;
        display: flex;


        .imgInfo {
            display: flex;
            flex-direction: column;
            width: 130px;

            .img {
                width: 130px;
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
                justify-content: space-around;
                align-items: center;
                height: 30px;


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