<template>
    <div class="room">
        <div class="toolBar">
            <div> <span class="Back" @click="() => $router.go(-1)">
                    <Icon type="md-navigate" style="transform: rotateZ(-90deg);" />{{ t('返回上一页') }}
                </span></div>
            <div class="bar">
                <RadioGroup v-model="type" type="button" button-style="solid" @on-change="handleRadioType">
                    <Radio v-for="item in  typeList" :key="String(item.id)" :label="item.id">
                        <!-- <Icon :type="item.icon" /> -->
                        {{ item.name }}
                    </Radio>
                </RadioGroup>
            </div>
            <div class="btn">
                <!-- <Button type="primary" v-if="type == 'mechanism'">保存</Button> -->
                <!-- <Input prefix="ios-search" clearable enter-button="搜索" placeholder="搜索" /> -->

            </div>
        </div>

        <div class="box">
            <div class="house">
                <p class="houseTitle">{{ t('楼层房间') }}</p>
                <Card :bordered="false" :padding="6">
                    <Row :gutter="8">
                        <Col span="12" v-for="item in houseList" :key="item.id" class="houseCard">
                        <div class="cardBody" @click="handleHouseActive(item.id)">
                            <p :style="{ 'color': houseActive == item.id ? '' : '#1C1B1B' }">{{ item.roomNumber }}</p>
                            <img :src="houseActive == item.id ? HouseOpen : HouseClose" alt="" srcset="">
                        </div>
                        </Col>
                    </Row>
                </Card>
            </div>

            <div class="roomUser">

                <div class="roomItem">
                    <p class="roomTitle">
                        <span class="tt"> {{ houseList.find((item: any) => item.id == houseActive)?.roomNumber }}</span>
                        <span>{{ checkInfo.check }}{{ t('入住') }}、{{ checkInfo.reserve }}{{ t('预留') }}、{{ checkInfo.free
                        }}{{ t('空闲') }}、{{ t('共') }}{{ checkInfo.count}}{{ t('床') }}</span>
                    </p>
                    <div class="roomContiner">
                        <Row :gutter="8">
                            <Col :xs="4" :sm="4" :md="4" :lg="4" v-for="item in bedList" :key="item">
                            <Card :bordered="false" :padding="0">
                                <div class="roomBox">
                                    <p class="t1">
                                        <span
                                            :class="['t2', ['gary', 'yellow', 'green'][item.status]]">{{ [t('空闲'), t('预订'), t('入住')][item.status] }}</span>
                                        <span class="t3">{{ item.bedNumber }}</span>
                                        <span class="t4"
                                            @click="item.checkIn ? router.push(`/add-elder?type=0&id=${item?.checkIn?.elderlyId}`) : ''">
                                            <img src="@/assets/images/room-setting.png" alt="" srcset="">
                                        </span>
                                    </p>
                                    <!-- //item.checkIn -->
                                    <div v-if="item.checkIn" class="user" @click="handleGetUserInfo(item)">
                                        <div class="t5">
                                            <!-- <span class="t6">{{ item.checkIn?.nursingGrade }}</span> -->
                                            <img class="t7" :src="oss + item.checkIn.elderlyPhoto" alt="" srcset=""
                                                v-if="item.checkIn.elderlyPhoto">
                                            <img class="t7" src="@/assets/images/screen.png" alt="" srcset="" v-else>

                                        </div>
                                        <p class="t8">{{ item.checkIn?.elderlyName }}&nbsp;
                                            <img class="t7" src="@/assets/images/ic_客户_男@2x(1).png" alt="" srcset=""
                                                v-if="item.checkIn?.elderlyGender == 1">
                                            <img class="t7" src="@/assets/images/ic_客户_女@2x(1).png" alt="" srcset=""
                                                v-if="item.checkIn?.elderlyGender == 2">
                                        </p>
                                        <p class="t9">{{ item.checkIn?.birthDate.split(":")[0] }}</p>
                                        <p class="t10">
                                            <!-- <img src="@/assets/images/睡眠监测@2x(4).png" alt="">
                                            <img src="@/assets/images/位图@2x(2).png" alt="">
                                            <img src="@/assets/images/温度计@2x.png" alt="">
                                            <img src="@/assets/images/紧急按钮@2x.png" alt=""> -->
                                             <!-- ed719_type -->
                        <img src="@/assets/images/setting_sleep2.png" alt="" v-if="item?.type=='x1_type'">
                        <!-- <img src="@/assets/images/睡眠监测@2x(4).png" alt="" v-else >

                        <img src="@/assets/images/位图@2x(2).png" alt=""> -->
                        <!-- <img src="@/assets/images/温度计@2x.png" alt="" v-if="device?.type=='ed719_type'"> -->
                        <img src="@/assets/images/紧急按钮@2x.png" alt="" v-if="item?.type=='ed719_type'">
                                        </p>
                                    </div>
                                    <div v-else class="user noUser" @click="handleGetUserInfo(item)">
                                        <img src="@/assets/images/room-whiter.png" alt="">
                                        <p>等待入住</p>
                                    </div>
                                </div>
                            </Card>
                            </Col>

                        </Row>
                    </div>
                </div>
            </div>

            <div class="floor">
                <Button type="primary" class="btn" @click="handleShowModal">{{ t('楼栋管理') }}</Button>
                <Card :bordered="false" :padding="6">
                    <Row :gutter="8">
                        <Col span="24" v-for="item in floorList" :key="item.id" class="floorCard">
                        <p :style="{ 'color': floorActive == item.id ? '' : '#1C1B1B', 'background': floorActive == item.id ? '#1364F8' : 'rgba(19, 100, 248, .1)' }"
                            @click="handleFloorActive(item.id)">{{ item.floorNumber }}
                        </p>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>


        <BuildingModal ref="BuildingModalRef" @handleUpdate="handleUpdate" :HostelList="typeList" :floorList="floorList"
            :houseList="houseList" :bedList="bedList">
        </BuildingModal>
        <DetailsModal ref="DetailsModalRef" :info="info" @handleUpdate="handleUpdate"></DetailsModal>
    </div>
</template>

<script setup lang='ts' name="room">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HouseOpen from "@/assets/images/house-open.png"
import HouseClose from "@/assets/images/house-close.png"
import BuildingModal from './BuildingModal.vue';
import DetailsModal from "./DetailsModal.vue"
import { useI18n } from "vue-i18n"
import { onMounted } from 'vue';
const { t } = useI18n()
import { HostelList, HostelFloorlList, HostelRoomListOfFloor, HostelRoomBedListOfRoom } from "@/api/Hostel/Hostel"
import { nextTick } from 'process';
import { flatMap } from 'lodash';

const oss = ref<any>(import.meta.env.VITE_APP_AXIOS_BASER)

const BuildingModalRef: any = ref(null)
const DetailsModalRef: any = ref(null)
const router = useRouter()
const route = useRoute()
const type = ref<any>('')
const typeList = ref<any>([])

const checkInfo = ref({
    count: 0,//全部人数
    check: 0,//入住人数
    free: 0,//空闲  
    reserve: 0,//预留
})
const info = ref<any>({})

const keyDom = ref<any>(Date.now())

const handleShowModal = () => {
    BuildingModalRef.value.showModal()
}

const handleGetUserInfo = (item: any) => {
    info.value = {
        ...item, hostelId: type.value,
        // houseActive,
        floorId: floorActive.value
    }
    console.log(info.value)

    DetailsModalRef.value.showModal()
}

//是否更新数据
const handleUpdate = (isUpdata: boolean) => {
    if (isUpdata) {
        getHostelList()
    }
}


const houseList = ref<any>([])
const houseActive = ref<any>('')
const floorList = ref<any>([])
const floorActive = ref<any>('')
const bedList = ref<any>([])
const isUp = ref<any>(false)


// 选择房间
const handleHouseActive = (id: string) => {
    console.log("first", id,router,route)
    houseActive.value = id
    router.replace(
        {
            path: '/room',
            query: {
                ...route.query,
                house: id
            }
        }
    )
    getRoomBedList()
}
// 选择楼层
const handleFloorActive = (id: string) => {
    console.log("------first")
    floorActive.value = id
    router.replace(
        {
            path: '/room',
            query: {
                ...route.query,
                floor: id
            }
        }
    )

    getRoomList()
}
// 选择楼栋
const handleRadioType = (id: string) => {
    console.log(id)
    type.value = id
    isUp.value = true
    router.replace(
        {
            path: '/room',
            query: {
                ...route.query,
                type: id
            }
        }
    )

    getFloorlList()

}

// 获取楼栋列表
const getHostelList = () => {
    // 获取楼栋列表
    HostelList().then((res: any) => {
        console.log(res)
        typeList.value = res.data
        type.value = type.value ? type.value : (res.data[0]?.id || '')

        // console.log('---------------', type.value, res.data[0]?.id || '')
        if(res.data.length == 0){
            floorList.value = []
            houseList.value = []
            return
        }
        
        getFloorlList()
    })
}


// 获取楼层列表
const getFloorlList = () => {
    // 获取楼层列表
    HostelFloorlList({
        hostelId: type.value
    }).then((res: any) => {
        console.log(res)

        floorList.value = res.data
        let id = ''

        if(isUp.value){
            id = (res.data[0]?.id || '')
        }else{
            id = route.query.floor ? Number(route.query.floor) : (res.data[0]?.id || '')
        }
        floorActive.value = id


        if(res.data.length == 0){
            houseList.value = []
            return
        }

        // typeList.value = res.data
        // type.value = res.data[0].name

        getRoomList()
    })
}

// 获取房间列表
const getRoomList = () => {

    // 获取房间列表
    HostelRoomListOfFloor({
        floorId: floorActive.value,
        needBed: true,
        needDeviceInfo: false,
    }).then((res: any) => {
        houseList.value = res.data

        let id = ''

if(isUp.value){
    id = (res.data[0]?.id || '')
}else{
    id = route.query.house ? Number(route.query.house) : (res.data[0]?.id || '')
}

        houseActive.value = id

        if(res.data.length == 0){
            bedList.value = []
            return
        }

        getRoomBedList()
    })
}

// 获取房间床位列表
const getRoomBedList = () => {


    isUp.value = false

    // 获取房间床位列表
    HostelRoomBedListOfRoom({
        roomId: houseActive.value,
        needDeviceInfo: true
    }).then((res: any) => {
        console.log(res)

       res.data.forEach((item: any) => {
            let list:any = []
            item.checkIn?.deviceList?.forEach((it:any)=>list.push(it?.type))
            item.type = list
        })


        bedList.value = res.data

        // let count = 0;//全部人数
        // let check = 0;//入住人数
        // let free = 0;//空闲  
        // let reserve = 0;//预留


        // res.data.forEach((item: any) => {
        //     count += (parseInt(item.cost) * 1)
        // })

        checkInfo.value = {
            check: res.data.filter((item: any) => item.status == 2).length || 0,
            free: res.data.filter((item: any) => item.status == 0).length || 0,
            reserve: res.data.filter((item: any) => item.status == 1).length || 0,
            count: res.data.length || 0,
        }
    }).finally(() => {
        nextTick(() => {
    if( type.value && floorActive.value && houseActive.value){
        router.replace(
        {
            path: '/room',
            query: {
                type: type.value,
                floor: floorActive.value,
                house: houseActive.value
            }
        }
    )
    }
   })
    })


   
}


//获取楼栋数据
onMounted(() => {
    // type.value = route.query.type ? Number(route.query.type) : ''
    getHostelList()
})


</script>

<style scoped lang='less'>
.room {
    width: 100%;
    height: calc(100vh - 90px);

    .toolBar {
        height: 60px;
        width: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        background: #fff;

        position: relative;

        .Back {
            width: 260px;
            cursor: pointer;
            display: inline-block;
            line-height: 60px;
            height: 60px;
            background-color: red;
            padding: 0 20px;
            color: #1364F8;
            background: linear-gradient(90deg, rgba(19, 100, 248, 0.1) 0%, rgba(19, 100, 248, 0) 100%);
        }


        .bar {
            // margin: 0 auto;
            position: absolute;
            left: 130px;
            display: flex;
            // width: calc(100% - 260px);
            margin: 0 auto;
            width: calc(100% - 260px);

            align-items: center;
            justify-content: center;
        }

        .btn {
            position: absolute;
            right: 20px;
        }
    }

    .box {
        width: 100%;
        height: calc(100% - 60px);
        background: rgba(212, 242, 250, 1);
        display: flex;
        justify-content: space-between;

        .house {
            width: 160px;
            margin: 15px 0px;
            margin-left: 30px;

            .houseTitle {
                padding: 10px 0;
            }

            .houseCard {
                .cardBody {
                    position: relative;

                    p {
                        width: 100%;
                        position: absolute;
                        text-align: center;
                        font-size: 14px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 400;
                        color: #FFFFFF;
                        cursor: pointer;
                    }

                    img {
                        width: 100%;
                        cursor: pointer;
                    }
                }
            }
        }

        .roomUser {
            width: calc(100% - 420px);
            padding-top: 15px;
            height: 100%;


            .roomItem {
                width: 100%;
                // cursor: pointer;

                .roomTitle {
                    display: flex;
                    justify-content: space-between;
                    font-size: 16px;
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    color: #1C1B1B;
                    padding: 10px 0;

                    .tt {
                        display: flex;
                        align-items: center;
                    }

                    .tt::before {
                        content: '';
                        display: block;
                        width: 16px;
                        height: 16px;
                        background-image: url("@/assets/images/house-id.png");
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                    }
                }

                .roomContiner {
                    width: 100%;
                    height: calc(100vh - 210px);
                    overflow: hidden;
                    overflow-y: auto;
                }

                .roomBox {
                    // width: 150px;
                    text-align: center;
                    margin-bottom: 10px;
                    min-width: 150px;
                    cursor: pointer;

                    .user {
                        width: 100%;
                        min-height: 210px;
                    }

                    .noUser {
                        img {
                            width: 100%;
                            padding: 10px;  
                        }
                        p{
                            padding: 27px 0;
                        }

                    }

                    .t1 {
                        display: flex;
                        justify-content: space-between;
                        // align-items: center;
                        font-size: 14px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 400;
                        color: #1C1B1B;
                        height: 25px;
                        line-height: 25px;

                    }

                    .t2 {
                        border-radius: 4px 0 0 0;
                        font-size: 10px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 400;
                        color: #FFFFFF;
                        padding: 0 2px;
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

                    .t3 {
                        border-radius: 0 0 5px 5px;
                        box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
                        padding: 0 10px;
                        width: 95px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .t4 {
                        display: flex;

                        img {
                            display: inline-block;
                            width: 25px;
                        }
                    }

                    .t5 {
                        position: relative;
                        font-size: 14px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 400;
                        color: #FFFFFF;

                        img {
                            width: 100%;
                            padding: 10px 8px 0 8px;
                            // height: 130px;
                            aspect-ratio: 1/1;
                        }

                        .t6 {
                            position: absolute;
                            bottom: 15px;
                            right: 12px;
                        }
                    }

                    .t8 {
                        font-size: 16px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 400;
                        color: #1C1B1B;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        img {
                            width: 15px;
                            height: 15px;
                        }
                    }

                    .t9 {
                        font-size: 14px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 400;
                        color: #8B8A96;
                    }

                    .t10 {
                        display: flex;
                        width: 100%;
                        justify-content: center;
                        padding-bottom: 10px;
                        height: 30px;

                        img {
                            display: block;
                            width: 20px;
                            height: 20px;
                            margin: 0 2px;
                        }
                    }
                }

            }
        }

        .floor {
            width: 160px;
            margin: 15px 0px;
            margin-right: 30px;

            .btn {
                margin: 5px 0;
            }

            .floorCard {
                width: 100%;
                text-align: center;
                font-size: 14px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 30px;

                p {
                    width: 90%;
                    margin: 5px auto;

                    border-radius: 4px;
                    cursor: pointer;
                }
            }
        }
    }

}
</style>