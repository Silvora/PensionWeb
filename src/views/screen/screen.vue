<template>
    <div class="screen" id="screen">
        <div class="bar">
            <span class="Back" @click="() => $router.go(-1)">
                <Icon type="md-navigate" style="transform: rotateZ(-90deg);" />{{ t('返回上一页') }}
            </span>
            <span class="searchBtn">
                <Space>

                    <Cascader v-model="hostelTofloor" :data="hostelList" :load-data="loadData" v-width="200"
                        :placeholder="t('楼栋/楼层')" @on-change="handleSearch" />
                    <Select v-model="searchData.roomId" style="width:100px" clearable :placeholder="t('房间号')"
                        @on-change="getData">

                        <Option :value="item.id" v-for="item in roomList" :key="item.id">{{ item.roomNumber }}</Option>
                    </Select>

                    <Select v-model="searchData.nursingGrade" style="width:100px" clearable :placeholder="t('护理等级')"
                        @on-change="getData">

                        <Option :value="idx" v-for="(item, idx) in jobLevelList" :key="idx">{{ t(item) }}</Option>
                    </Select>

                    <!-- <div>
                        <Input v-model="searchData.elderlyName" search placeholder="搜索" @on-search="getData" />
                    </div> -->
                </Space>
            </span>
        </div>
        <div class="box" id="screenBoxAll" ref="screenBoxAll">
            <div class="focus">
                <Space class="title">
                    <span>{{ t('重点关注老人') }}</span>
                    <span>
                        <Button type="primary" @click="handleAddFocus">{{ t('添加人员') }}</Button>
                    </span>
                </Space>
                <div class="list">
                    <UserItem v-for="item in FocusList" :info="item"></UserItem>
                </div>
            </div>
            <div class="bed">
                <div class="title">
                    <span class="p">{{ t('床位管理') }}</span>
                    <span class="alert">
                        <Alert type="error">
                            <span v-if="LogData.status==0 && LogData.createTime.includes(dayjs().format('YYYY-MM-DD'))">{{ LogData.roomBedNumber }} {{ t('紧急通知') }} </span>
                            <span v-else>{{ t('暂无通知') }}</span>
                        </Alert>
                        <Button type="primary" @click="router.push('/log')"
                            style="margin-left: 5px;">{{ t('全部日志') }}</Button>
                            &nbsp;
                        <span>
                            <Button v-if="!isFullscreen" type="primary" icon="md-expand" @click="handleZoom"></Button>
                            <!-- <Icon v-if="!isFullscreen" type="md-expand" color="#2d8cf0" size="26" @click="handleZoom" /> -->
                            <Button v-else type="primary" icon="md-contract" @click="handleZoom"></Button>
                            <!-- <Icon v-else type="md-contract" color="#2d8cf0" size="26" @click="handleZoom" /> -->
                        </span>
                    </span>
                </div>
                <div class="list">

                    <Row :gutter="10">
                        <Col :span="6" v-for="item in UserList" :key="item">
                        <UserItem :info="item"></UserItem>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>


        <Modal v-model="elderModal" :title="t('老人选择')" :footer-hide="true" width="270">
            <template #close>
                <Icon type="md-close-circle" color="#000" size="16" />
            </template>

            <div class="elderBox">
                <Input prefix="ios-search" clearable :enter-button="t('搜索')" :placeholder="t('搜索')" />

                <Card :bordered="false" :padding="5" style="background: rgba(19,100,248,0.05);margin: 5px 0;"
                    v-for="item in detailList" :key="item.id">
                    <div class="userBox" @click="handleCheck(item)">
                        <div>
                            <img :src="item.photo" alt="">
                        </div>
                        <div class="name">
                            <p>{{ item.elderlyName }}</p>
                            <p>ID:{{ item.elderlyFileNo }}</p>
                        </div>
                    </div>
                </Card>

            </div>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import UserItem from "./UserItem.vue"
import { ref, onMounted,onBeforeUnmount } from 'vue';
import { CheckFocus, CheckList, CheckCancelFocus, CheckSave, CheckRemoveId } from '@/api/Check/Check';
import { HostelList, HostelFloorlList, HostelRoomListOfFloor, HostelRoomBedListOfRoom } from "@/api/Hostel/Hostel"
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { Message, Space } from 'view-ui-plus';
const { t } = useI18n()
const screenBoxAll = ref(null)
import dayjs from "dayjs"
import { useFullscreen } from '@vueuse/core'
import {DeviceLogList} from "@/api/Device/Device"
// let box = document.getElementById("#layoutBox")
const { toggle, isFullscreen } = useFullscreen(screenBoxAll)

const handleZoom = () => {
    toggle()
}

const LogData = ref<any>({})
const elderModal = ref<boolean>(false)
const detailList = ref<any>([])
const hostelTofloor = ref<any>([])
const hostelList = ref<any>([])

const roomList = ref<any>([])

const router = useRouter()

const UserList = ref<any>([])
const FocusList = ref<any>([])

const jobLevelList = ref(["三级", "二级", "一级", "特一级", "特二级", "特三级", "专需护理"])
const searchData = ref<any>({
    current: 1,
    size: 9999,
    floorId: "",
    roomId: "",
    focus: 1,
    nursingGrade: "",
    // elderlyName: ''
})

const handleCheck = (item: any) => {
    // detailList.value = []
    // detailList.value.push(item)
    // elderModal.value = false
    console.log(item)

    CheckFocus({
        elderlyId: item.elderlyId,
        checkInId: item.id
    }).then(() => {
        Message.success(t('添加成功'))
        // getData()
        elderModal.value = false
        getData()
    })
}


const handleSearch = (value: any) => {
    if (value.length == 2) {

        searchData.value.floorId = value[1]


        HostelRoomListOfFloor({ floorId: value[1], needBed: false }).then((res: any) => {
            roomList.value = res.data
        })
    } else {
        searchData.value.floorId = ''
    }


    getData()




}

const loadData = (item: any, callback: any) => {
    HostelFloorlList({
        hostelId: item.value
    }).then(res => {
        item.children = res.data.map((item: any) => {
            return {
                value: item.id,
                label: item.floorNumber,
                //children: [],
                //loading: false,
                type: 'floor'
            }
        })
        callback()
    })
}



const getData = () => {

    // let floorId = searchData.value.hostelTofloor[0]
    // let roomId = searchData.value.hostelTofloor[1]


    // searchData.value.floorId = floorId
    // searchData.value.roomId = roomId

    CheckList(searchData.value).then((res: any) => {
        // console.log(res.records)

        UserList.value = res.data.records

        console.log(UserList.value)


        // hostelList.value = res.data.map((item: any) => {
        //     return {
        //         value: item.id,
        //         label: item.name,
        //         children: [],
        //         loading: false,
        //         type: 'hostel'
        //     }
        // })
    })

    CheckList({
        current: 1,
        size: 9999,
        focus: 0,
    }).then((res: any) => {
        FocusList.value = res.data.records
    })





}

const getLog=()=>{
    DeviceLogList({
        current: 1,
        size: 1
    }).then((res:any)=>{
        console.log(res)
        LogData.value =res.data?.records? res.data.records[0]:{}
    })
}

//const time = ref<any>(null)



// const handleTime = ()=>{


//     time.value = setInterval(() => {
//         getData()

//         getLog()

//     }, 6000)
// } 


onMounted(() => {
    getData()

    getLog()
    // handleTime()


    HostelList().then(res => {
        hostelList.value = res.data.map((item: any) => {
            return {
                value: item.id,
                label: item.name,
                children: [],
                loading: false,
                type: 'hostel'
            }
        })
    })



    // CheckList({
    //     current: 1,
    //     size: 9999,
    //     focus: 0,
    // }).then((res: any) => {
    //     FocusList.value = res.data.records
    // })


    // hostel.value.forEach((item: any) => {
    //     HostelFloorlList(item.value).then(res => {
    //         floorList.value = res.data.map((item: any) => {
    //             return {
    //                 value: item.id,
    //                 label: item.name
    //             }
    //         })
    //     })
    //})
})


onBeforeUnmount(() => {

console.log("sdasdasdasd")
// clearInterval(time.value)
// time.value = null
})

const handleAddFocus = () => {
    elderModal.value = true

    CheckList({
        current: 1,
        size: 9999,
        focus: 1,
    }).then((res: any) => {
        // console.log(res.records)

        detailList.value = res.data.records

        //console.log(UserList.value)


        // hostelList.value = res.data.map((item: any) => {
        //     return {
        //         value: item.id,
        //         label: item.name,
        //         children: [],
        //         loading: false,
        //         type: 'hostel'
        //     }
        // })
    })
}




</script>

<style lang="less" scoped>
.screen {
    width: 100%;
    height: calc(100vh - 60px);
    background: #D4F2FA;

    .bar {
        width: 100%;
        height: 60px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        //padding: 0 0 20px 0;
        padding-right: 20px;

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

        .searchBtn {
            display: flex;

            .input {
                width: 100px;
            }
        }
    }

    .box {
        width: 100%;
        height: calc(100vh - 150px);
        display: flex;
        justify-content: space-around;
        background: #D4F2FA;

        .focus {
            width: 21%;
            padding: 20px 7px 0 20px;

            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 20px;
            }

            .list {
                width: 100%;
                height: calc(100% - 52px);
                overflow: hidden;
                overflow-y: auto;
                padding: 10px;
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.3);

            }
        }

        .bed {
            width: 79%;
            padding: 20px 20px 0 7px;

            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 18px;

                .p {
                    width: 100px;
                }

                .alert {
                    width: 500px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .ivu-alert {
                        width: 400px;
                        margin-bottom: 0;
                    }
                }
            }

            .list {
                height: calc(100% - 52px);
                padding: 10px;
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.3);
                overflow: hidden;
                overflow-y: auto;

            }
        }
    }

}

.elderBox {
    width: 100%;
    height: 490px;
    overflow: hidden;
    overflow-y: auto;

    .userBox {
        display: flex;
        align-items: center;
        height: 40px;
        cursor: pointer;

        img {
            width: 30px;
            margin-right: 10px;
        }

        .name {
            font-size: 14px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            color: #1C1B1B;
            line-height: 20px;
        }
    }
}
</style>