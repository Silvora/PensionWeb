<template>
    <div class="setting">
        <div class="bar">
            <span class="Back" @click="() => $router.go(-1)">
                <Icon type="md-navigate" style="transform: rotateZ(-90deg);" />返回上一页
            </span>
            <span class="searchBtn">
                <Space>
                    <Select v-model="searchData.online" clearable style="width:100px" placeholder="是否在线"
                        @on-change="handleSearchData">
                        <Option value="0">断开</Option>
                        <Option value="1">在线</Option>
                    </Select>
                    <Select v-model="searchData.status" clearable style="width:100px" placeholder="设备状态"
                        @on-change="handleSearchData">
                        <Option value="0">空闲</Option>
                        <Option value="1">正常</Option>
                        <Option value="10">异常</Option>
                    </Select>
                    <Cascader :data="list" v-model="dataValue" :load-data="loadList" v-width="200" placeholder="楼栋/楼层/房间"
                        @on-change="handleSearch" />

                    <!-- <Select v-model="model1" style="width:100px" placeholder="楼栋">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai" disabled>London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select> -->
                    <!-- <Select v-model="floorId" style="width:100px" placeholder="楼层">
                        <Option :value="String(item.id)" v-for="item in floorList" :key="item.id">{{ item.floorNumber }}</Option>
                       
                    </Select>
                    <Select v-model="roomId" style="width:100px" placeholder="房间">
                        <Option :value="String(item.id)" v-for="item in roomList" :key="item.id">{{ item.roomNumber }}</Option>

                    </Select> -->
                    <!-- <Select v-model="model1" style="width:100px" placeholder="房间号">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai" disabled>London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select> -->
                    <!-- <div>
                        <Input search clearable placeholder="搜索" />
                    </div> -->
                    <Button type="primary" @click="handleToNavLog">全部日志</Button>
                    <Button type="primary">重置</Button>
                </Space>
            </span>
        </div>
        <div class="box">
            <div class="focus">
                <div class="title">
                    <span>预警信息</span>
                    <span>
                    </span>
                </div>
                <div class="list">
                    <div v-for="item in errList" :key="item.id">
                        <ErrItem :info="item" :name="item"></ErrItem>
                    </div>
                </div>
            </div>
            <div class="bed">
                <div class="title">
                    <span class="p">
                        <Checkbox v-model="checkAll">设备全选</Checkbox>
                    </span>
                    <span class="alert">
                        <!-- <Alert type="error">An error prompt</Alert>
                        <Button type="primary">全部日志</Button> -->
                    </span>
                </div>
                <div class="list">
                    <Row :gutter="10">
                        <Col span="6" v-for="item in data" :key="item.id">
                        <DeviceItem :checkAll="checkAll" :info="item" @handleCheck="handleCheck"
                            @handleGetUser="handleGetUser"></DeviceItem>
                        </Col>
                    </Row>
                </div>
            </div>

            <div class="deviceList">
                <div class="floor">
                    <!-- <Button type="primary" class="btn" @click="handleShowModal">楼栋管理</Button> -->
                    <Card :bordered="false" :padding="6" class="btnList" style="border: 1px solid #98D2E1;">
                        <div class="list">
                            <Button type="primary" @click="handleShowModal">添加设备</Button>
                            <!-- <Button type="primary">参数设置</Button> -->
                            <Button type="primary" @click="handleDeviceOnline">一键上线</Button>
                            <Button type="primary" @click="handleDeviceOffline">一键下线</Button>
                            <Button type="error" @click="handleBatchDelete">批量删除</Button>
                        </div>
                    </Card>
                </div>

                <div class="chart">
                    <p>设备类型统计</p>
                    <CountChart></CountChart>
                </div>
                <div class="chart">
                    <p>设备状态</p>
                    <StateChart></StateChart>
                </div>
            </div>
        </div>

        <FormData ref="FormDataRef"></FormData>
    </div>
</template>

<script setup lang="ts">
import DeviceItem from "./components/DeviceItem.vue"
import ErrItem from "./components/ErrItem.vue";
import CountChart from "./components/CountChart.vue"
import StateChart from "./components/StateChart.vue"
import FormData from "./components/Form.vue";
import { ref } from 'vue';
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { Cascader, Modal, Message } from 'view-ui-plus';
import { HostelList, HostelFloorlList, HostelRoomListOfFloor, HostelRoomBedListOfRoom } from "@/api/Hostel/Hostel"
import { DeviceOnlineBatch, DeviceOfflineBatch, DeviceStateratio, DeviceTypeRatio, DeviceList, DeviceUpdate, DeviceSave, DeviceRemoveBatch, DeviceStopUsage, DeviceUsageRecordList, DeviceAddUsageRecord } from "@/api/Device/Device";
import router from "@/router";
const { t } = useI18n()
const checkAll = ref<any>(false)
const data = ref<any>([])
const errList = ref<any>([])
const FormDataRef = ref<InstanceType<typeof FormData>>()

const searchData = ref<any>({
    hostelId: '',
    floorId: '',
    roomId: '',
    status: '',
    online: ''
})
// const online = ref<any>()
const dataValue = ref<any>([])
const floorId = ref<any>()
const roomId = ref<any>()
const list = ref<any>([])
const hostelList = ref<any>([])
const floorList = ref<any>([])
const roomList = ref<any>([])

const checkList = ref<any>([])


// 获取设备详情
const handleGetUser = (data: any) => {
    FormDataRef.value?.Open(data)
}

const handleShowModal = () => {
    // console.log("handleShowModal")
    FormDataRef.value?.Open(null)
}

// 选中
const handleCheck = (item: any) => {
    console.log(item)
    if (checkList.value.includes(item)) {
        checkList.value.splice(checkList.value.indexOf(item.id), 1);
    } else {
        checkList.value.push(item.id)
    }
}

// 搜索
const handleSearchData = () => {
    getData()
}

// 搜索房间
const handleSearch = (value: any) => {

    searchData.value.floorId = value[1]
    searchData.value.roomId = value[2]

    getData()
}

// 批量删除
const handleBatchDelete = () => {
    console.log(checkList.value)
    Modal.confirm({
        title: '提示',
        content: '确定要删除吗？',
        okText: '确认',
        cancelText: '取消',
        loading: true,
        onOk: () => {

            DeviceRemoveBatch({ ids: checkList.value }).then(() => {
                Message.success("删除成功")
                Modal.remove();
                getData()
            })

        },
        onCancel: () => {
            console.log('Cancel');
        }
    });
}

// 获取数据
const getData = () => {
    DeviceList(searchData.value).then((res: any) => {
        console.log(res)
        data.value = res.data
    })
}


// 获取错误数据
const getErrData = () => {
    DeviceList({ status: 10 }).then((res: any) => {
        console.log(res)
        errList.value = res.data
    })
}

// 获取房间数据
const loadList = (item: any, callback: any) => {
    // console.log(item.type)
    item.loading = true

    if (item.type == 'floor') {
        HostelRoomListOfFloor({ floorId: item.value, needBed: false }).then((res: any) => {
            //console.log(res)
            item.children = res.data.map((item: any) => {
                return {
                    value: item.id,
                    label: item.roomNumber,
                    //children: [],
                    //loading: false
                }
            })
            item.loading = false;
            callback();
        })
    }


    if (item.type == 'hostel') {
        HostelFloorlList({ hostelId: item.value }).then((res: any) => {
            //console.log(res)
            item.children = res.data?.map((item: any) => {
                return {
                    value: item.id,
                    label: item.floorNumber,
                    children: [],
                    loading: false,
                    type: 'floor'
                }
            })
            item.loading = false;
            callback();
        })
    }
}

// 获取楼栋
const getHome = () => {
    HostelList().then((res: any) => {
        hostelList.value = res.data
        floorId.value = res.data[0]?.id + ''

        list.value = res.data.map((item: any) => {
            return {
                value: item.id,
                label: item.name,
                children: [],
                loading: false,
                type: 'hostel'
            }
        })
    })

}

// 设备布防
const handleDeviceOnline = () => {

    let data = checkList.value.map((it: any) => {
        return {
            id: it
        }
    })

    DeviceOnlineBatch(data).then((res: any) => {
        console.log(res)
        Message.success("设备布防成功")
        getData()
    })
}
// 设备撤防
const handleDeviceOffline = () => {
    let data = checkList.value.map((it: any) => {
        return {
            id: it
        }
    })
    DeviceOfflineBatch(data).then((res: any) => {
        console.log(res)
        Message.success("设备撤防成功")
        getData()
    })
}


const getRatio = () => {
    DeviceStateratio({}).then((res: any) => {
        console.log(res)
    })
    DeviceTypeRatio({}).then((res: any) => {
        console.log(res)
    })
}

onMounted(() => {
    getData()
    getErrData()
    //  getRatio()
    getHome()
})

const handleToNavLog = () => {
    router.push('/log')
}

</script>

<style lang="less" scoped>
.setting {
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
        //padding: 0 20px;
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
            width: 210px;

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
            width: calc(100% - 390px);
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

        .deviceList {

            width: 180px;
            padding: 20px 20px 0 0;
            overflow: hidden;
            overflow-y: auto;


            .floor {
                width: 160px;
                // margin: 10px 0px;
                // margin-right: 30px;
                margin-bottom: 10px;

                .btnList {
                    width: 160px;


                    .list {
                        display: flex;
                        flex-direction: column;

                        button {
                            margin: 5px 0;
                        }
                    }
                }
            }

            .chart {
                border-radius: 8px;
                // height: 281px;
                background: #FFFFFF;
                border-radius: 8px;
                border: 1px solid #98D2E1;
                margin-bottom: 10px;


                p {
                    width: 100%;
                    background: linear-gradient(270deg, RGBA(255, 255, 255, 1) 0%, RGBA(206, 223, 254, 1) 100%);
                    border-radius: 8px 8px 0px 0px;
                    // opacity: 0.3;
                    font-size: 14px;
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    color: #1C1B1B;
                    padding-left: 10px;
                    line-height: 30px;
                }
            }


        }
    }

}
</style>