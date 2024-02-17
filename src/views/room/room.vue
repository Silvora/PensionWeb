<template>
    <div class="room">
        <div class="toolBar">
            <div></div>
            <div class="bar">
                <RadioGroup v-model="type" type="button" button-style="solid" @on-change="handleRadioType">
                    <Radio v-for="item in  typeList" :key="item.id" :label="item.id">
                        <!-- <Icon :type="item.icon" /> -->
                        {{ item.name }}
                    </Radio>
                </RadioGroup>
            </div>
            <div class="btn">
                <!-- <Button type="primary" v-if="type == 'mechanism'">保存</Button> -->
                <Input prefix="ios-search" clearable enter-button="搜索" placeholder="搜索" />

            </div>
        </div>

        <div class="box">
            <div class="house">
                <p class="houseTitle">{{ t('楼层房间') }}</p>
                <Card :bordered="false" padding="6">
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
                        <span class="tt">Aa01</span>
                        <span>1 入住、2预留、5空闲、共{{ bedList[0]?.cost }}</span>
                    </p>
                    <div class="roomContiner">
                        <Row :gutter="8">
                            <Col span="4" v-for="item in bedList" :key="item">
                            <Card :bordered="false" padding="0">
                                <div class="roomBox">
                                    <p class="t1">
                                        <span :class="['t2', 'green', 'yellow', 'gary']">{{ t('空闲') }}</span>
                                        <span class="t3">a102</span>
                                        <span class="t4">
                                            <img src="@/assets/images/room-setting.png" alt="" srcset="">
                                        </span>
                                    </p>
                                    <div class="t5" @click="handleGetUserInfo">
                                        <span class="t6">dsadsa</span>
                                        <img class="t7" src="@/assets/images/screen.png" alt="" srcset="">
                                    </div>
                                    <p class="t8">李梅梅</p>
                                    <p class="t9">1964-11-10</p>
                                    <p class="t10">
                                        <img src="@/assets/images/位图@2x(1).png" alt="">
                                        <img src="@/assets/images/位图@2x(1).png" alt="">
                                        <img src="@/assets/images/位图@2x(1).png" alt="">
                                        <img src="@/assets/images/位图@2x(1).png" alt="">
                                    </p>
                                </div>
                            </Card>
                            </Col>

                        </Row>
                    </div>
                </div>



            </div>

            <div class="floor">
                <Button type="primary" class="btn" @click="handleShowModal">{{ t('楼栋管理') }}</Button>
                <Card :bordered="false" padding="6">
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


        <BuildingModal ref="BuildingModalRef" @handleUpdate="handleUpdate" :HostelList=typeList :floorList="floorList"
            :houseList="houseList" :bedList="bedList">
        </BuildingModal>
        <DetailsModal ref="DetailsModalRef"></DetailsModal>
    </div>
</template>

<script setup lang='ts' name="room">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HouseOpen from "@/assets/images/house-open.png"
import HouseClose from "@/assets/images/house-close.png"
import BuildingModal from './BuildingModal.vue';
import DetailsModal from "./DetailsModal.vue"
import { useI18n } from "vue-i18n"
import { onMounted } from 'vue';
const { t } = useI18n()
import { HostelList, HostelFloorlList, HostelRoomListOfFloor, HostelRoomBedListOfRoom } from "@/api/Hostel/Hostel"

const BuildingModalRef: any = ref(null)
const DetailsModalRef: any = ref(null)
const router = useRouter()
const type = ref('')
const typeList = ref<any>([])
const handleShowModal = () => {
    BuildingModalRef.value.showModal()
}

const handleGetUserInfo = () => {
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


const handleHouseActive = (id: string) => {
    houseActive.value = id
}
const handleFloorActive = (id: string) => {
    floorActive.value = id
}
const handleRadioType = (id: string) => {
    //console.log(label)
    router.replace('/room?type=' + id)


    getFloorlList()

}

const getHostelList = () => {
    // 获取楼栋列表
    HostelList().then((res: any) => {
        console.log(res)
        typeList.value = res.data
        type.value = res.data[0].id
        getFloorlList()
    })
}

const getFloorlList = () => {
    // 获取楼层列表
    HostelFloorlList({
        hostelId: type.value
    }).then((res: any) => {
        console.log(res)

        floorList.value = res.data
        floorActive.value = res.data[0].id
        // typeList.value = res.data
        // type.value = res.data[0].name

        getRoomList()
    })
}

const getRoomList = () => {
    // 获取房间列表
    HostelRoomListOfFloor({
        floorId: floorActive.value,
        needBed: true,
    }).then((res: any) => {
        houseList.value = res.data
        houseActive.value = res.data[0].id
        getRoomBedList()
    })
}

const getRoomBedList = () => {
    // 获取房间床位列表
    HostelRoomBedListOfRoom({
        roomId: houseActive.value
    }).then((res: any) => {
        console.log(res)
        bedList.value = res.data
    })
}


//获取楼栋数据
onMounted(() => {
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

        .bar {
            margin: 0 auto;
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
                cursor: pointer;

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
                            height: 130px;
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

                        img {
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