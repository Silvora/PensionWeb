<template>
    <div class="setting">
        <div class="bar">
            <span class="Back" @click="() => $router.go(-1)">
                <Icon type="md-navigate" style="transform: rotateZ(-90deg);" />{{ t('返回上一页') }}
            </span>
            <span class="searchBtn">
                <Space>
                    <Select v-model="searchData.online" clearable style="width:100px" :placeholder="t('是否在线')"
                        @on-change="handleSearchData">
                        <Option value="0">{{ t('断开') }}</Option>
                        <Option value="1">{{ t('在线') }}</Option>
                    </Select>
                    <Select v-model="searchData.status" clearable style="width:100px" :placeholder="t('设备状态')"
                        @on-change="handleSearchData">
                        <Option value="0">{{ t('空闲') }}</Option>
                        <Option value="1">{{ t('正常') }}</Option>
                        <Option value="10">{{ t('异常') }}</Option>
                    </Select>
                    <Cascader :data="list" v-model="dataValue" :load-data="loadList" v-width="200"
                        :placeholder="t('楼栋/楼层/房间')" @on-change="handleSearch" />
                    <Button type="primary" @click="handleToNavLog">{{ t('全部日志') }}</Button>
                    <!-- <Button type="primary">{{ t('重置') }}</Button> -->
                </Space>
            </span>
        </div>
        <div class="box">
            <div class="focus">
                <div class="title">
                    <span>{{ t('预警信息') }}</span>
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
                        <Checkbox v-model="checkAll">{{ t('设备全选') }}</Checkbox>
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
                            @handleGetUser="handleGetUser" @handleOpenInfo="handleOpenInfo"></DeviceItem>
                        </Col>
                    </Row>
                </div>
            </div>

            <div class="deviceList">
                <div class="floor">
                    <!-- <Button type="primary" class="btn" @click="handleShowModal">楼栋管理</Button> -->
                    <Card :bordered="false" :padding="6" class="btnList" style="border: 1px solid #98D2E1;">
                        <div class="list">
                            <Button type="primary" @click="handleShowModal">{{ t('添加设备') }}</Button>
                            <!-- <Button type="primary">参数设置</Button> -->
                            <Button type="primary" @click="handleDeviceOnline">{{ t('一键布防') }}</Button>
                            <Button type="primary" @click="handleDeviceOffline">{{ t('一键撤防') }}</Button>
                            <Button type="error" @click="handleBatchDelete">{{ t('批量删除') }}</Button>
                        </div>
                    </Card>
                </div>

                <div class="chart">
                    <p>{{ t('设备类型统计') }}</p>
                    <CountChart></CountChart>
                </div>
                <div class="chart">
                    <p>{{ t('设备状态') }}</p>
                    <StateChart></StateChart>
                </div>
            </div>
        </div>

        <FormData ref="FormDataRef" @handleResetData="handleResetData"></FormData>

        <DeviceInfo ref="DeviceInfoRef"></DeviceInfo>
        <DeviceInfoCopy ref="DeviceInfoRefCopy"></DeviceInfoCopy>
    </div>
</template>

<script setup lang="ts">
import DeviceItem from "./components/DeviceItem.vue"
import ErrItem from "./components/ErrItem.vue";
import CountChart from "./components/CountChart.vue"
import StateChart from "./components/StateChart.vue"
import FormData from "./components/Form.vue";
import DeviceInfo from "./components/DeviceInfo.vue"
import DeviceInfoCopy from "./components/DeviceInfo-Copy.vue"
import { onBeforeUnmount, ref } from 'vue';
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { Cascader, Modal, Message } from 'view-ui-plus';
import { HostelList, HostelFloorlList, HostelRoomListOfFloor, HostelRoomBedListOfRoom } from "@/api/Hostel/Hostel"
import { DeviceDetailId, DeviceOnlineBatch, DeviceOfflineBatch, DeviceStateRatio, DeviceTypeRatio, DeviceList, DeviceUpdate, DeviceSave, DeviceRemoveBatch, DeviceStopUsage, DeviceUsageRecordList, DeviceAddUsageRecord } from "@/api/Device/Device";
import router from "@/router";

const { t } = useI18n()
const checkAll = ref<any>(false)
const data = ref<any>([])
const errList = ref<any>([])
const FormDataRef = ref<InstanceType<typeof FormData>>()
const DeviceInfoRef = ref<InstanceType<typeof DeviceInfo>>()
const DeviceInfoRefCopy = ref<InstanceType<typeof DeviceInfoCopy>>()
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
const list = ref<any>([])
const hostelList = ref<any>([])

const checkList = ref<any>([])

const handleResetData = () => {
    getData()
}

// 获取设备详情
const handleGetUser = (data: any) => {


    DeviceDetailId(data).then((res: any) => {
        console.log(res)
        // dataValue.value = res.data
        FormDataRef.value?.Open(res.data)

    })

}

const handleOpenInfo = (data: any) => {

    console.log(data)

    if (data.type == 'ed719_type') {

        DeviceInfoRef.value?.Open(data)

    } else {
        DeviceInfoRefCopy.value?.Open(data)

    }

    return

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
        title: t('提示'),
        content: t('确定要删除吗？'),
        okText: t('确认'),
        cancelText: t('取消'),
        loading: true,
        onOk: () => {

            DeviceRemoveBatch({ ids: checkList.value }).then(() => {
                Message.success(t('删除成功'))
                checkList.value = []
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
        Message.success(t('设备布防成功'))
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
        Message.success(t('设备撤防成功'))
        getData()
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