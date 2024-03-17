<template>
    <div class="screen" id="screen">
        <div class="bar">
            <span class="Back" @click="() => $router.go(-1)">
                <Icon type="md-navigate" style="transform: rotateZ(-90deg);" />返回上一页
            </span>
            <span class="searchBtn">
                <Space>

                    <Cascader v-model="hostelTofloor" :data="hostelList" :load-data="loadData" v-width="200"
                        placeholder="楼栋/楼层" @on-change="handleSearch" />

                    <!-- <Select v-model="hostel" style="width:100px" placeholder="楼栋">

                        <Option :value="item.id" v-for="item in hostelList" :item="item.key">{{ item.label }}</Option>

                        <Option value="beijing">New York</Option>
                        <Option value="shanghai" disabled>London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select> -->
                    <!-- <Select v-model="floor" style="width:100px" placeholder="楼层">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai" disabled>London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select> -->
                    <Select v-model="searchData.roomId" style="width:100px" clearable placeholder="房间号"
                        @on-change="handleSearch">
                        <!-- <Option value="beijing">New York</Option>
                        <Option value="shanghai" disabled>London</Option>
                        <Option value="shenzhen">Sydney</Option> -->

                        <Option :value="item.id" v-for="item in roomList" :key="item.id">{{ item.roomNumber }}</Option>
                    </Select>
                    <!-- <Select v-model="model1" style="width:100px" placeholder="等级">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai" disabled>London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select> -->


                    <Select v-model="searchData.nursingGrade" style="width:100px" clearable placeholder="护理等级"
                        @on-change="handleSearch">
                        <!-- <Option value="beijing">New York</Option>
                        <Option value="shanghai" disabled>London</Option>
                        <Option value="shenzhen">Sydney</Option> -->

                        <Option :value="idx" v-for="(item, idx) in jobLevelList" :key="idx">{{ item }}</Option>
                    </Select>

                    <div>
                        <Input search clearable placeholder="搜索" />
                    </div>
                </Space>
            </span>
        </div>
        <div class="box">
            <div class="focus">
                <div class="title">
                    <span>重点关注老人</span>
                    <span>
                        <Button type="primary" @click="handleAddFocus">添加人员</Button>
                    </span>
                </div>
                <div class="list">
                    <UserItem v-for="item in FocusList" :info="item"></UserItem>
                </div>
            </div>
            <div class="bed">
                <div class="title">
                    <span class="p">床位管理</span>
                    <span class="alert">
                        <Alert type="error">An error prompt</Alert>
                        <Button type="primary">全部日志</Button>
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


        <Modal v-model="elderModal" title="老人选择" :footer-hide="true" width="270">
            <template #close>
                <Icon type="md-close-circle" color="#000" size="16" />
            </template>

            <div class="elderBox">
                <Input prefix="ios-search" clearable enter-button="搜索" placeholder="搜索" />

                <Card :bordered="false" :padding="5" style="background: rgba(19,100,248,0.05);margin: 5px 0;"
                    v-for="item in detailList" :key="item.id">
                    <div class="userBox">
                        <div>
                            <img :src="item.photo" alt="">
                        </div>
                        <div class="name">
                            <p>{{ item.name }}</p>
                            <p>ID:{{ item.fileNo }}</p>
                        </div>
                    </div>
                </Card>

            </div>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import UserItem from "./UserItem.vue"
import { ref, onMounted } from 'vue';
import { CheckFocus, CheckList, CheckCancelFocus, CheckSave, CheckRemoveId } from '@/api/Check/Check';
import { HostelList, HostelFloorlList, HostelRoomListOfFloor, HostelRoomBedListOfRoom } from "@/api/Hostel/Hostel"
const elderModal = ref<boolean>(false)
const detailList = ref<any>([])
const hostelTofloor = ref<any>([])
const hostelList = ref<any>([])
const roomlList = ref<any>([])
const hostel = ref<any>('')
const floorList = ref<any>([])
const floor = ref<any>('')
const roomList = ref<any>([])
const room = ref<any>('')
const bed = ref<any>([])

const UserList = ref<any>([])
const FocusList = ref<any>([])

const jobLevelList = ref(["三级", "二级", "一级", "特一级", "特二级", "特三级", "专需护理"])
const searchData = ref<any>({
    current: 1,
    size: 9999,
    floorId: "",
    roomId: "",
    focus: "",
    nursingGrade: "",
})

const handleSearch = (value: any) => {

    getData()



    if (value.length == 2) {

        searchData.value.floorId = value[1]


        HostelRoomListOfFloor({ floorId: value[1], needBed: false }).then((res: any) => {
            roomList.value = res.data
        })
    }

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




}


onMounted(() => {

    // let box = document.getElementById("#layoutBox")
    

    getData()
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

    CheckList({
        current: 1,
        size: 9999,
        focus: 0,
    }).then((res: any) => {
        FocusList.value = res.data.records
    })


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