<template>
    <div class="log">
        <div class="bar">
            <span class="Back" @click="() => $router.go(-1)">
                <Icon type="md-navigate" style="transform: rotateZ(-90deg);" />{{ t('返回上一页') }}
            </span>
            <span class="searchBtn">
                <Space>
                    <!-- <Select v-model="searchData.online" clearable style="width:100px" placeholder="是否在线"
                        @on-change="handleSearchData">
                        <Option value="0">断开</Option>
                        <Option value="1">在线</Option>
                    </Select>
                    <Select v-model="searchData.status" clearable style="width:100px" placeholder="设备状态"
                        @on-change="handleSearchData">
                        <Option value="0">空闲</Option>
                        <Option value="1">正常</Option>
                        <Option value="10">异常</Option>
                    </Select> -->
                    <Select v-model="searchData.status" clearable style="width:100px" :placeholder="t('处理状态')" @on-change="handleSearch">
                        <Option value="0">未处理</Option>
                        <Option value="1">处理中</Option>
                        <Option value="2">已处理</Option>
                    </Select>
                    <Cascader :data="list" v-model="dataValue" :load-data="loadList" v-width="200"
                        :placeholder="t('楼栋/楼层/房间')" @on-change="handleSearch" />


                    <DatePicker type="daterange" split-panels :placeholder="t('选择日期')" style="width: 200px"
                        @on-change="handleSearchDate"></DatePicker>

                  
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
                    </div>
                    <Button type="primary" >全部日志</Button>
                    <Button type="primary" >重置</Button> -->
                </Space>
            </span>
        </div>
        <div class="box">
            <TableView ref="TableViewRef" :data="data" :tableConfig="LogTable" :tablePage="pagerConfig"
                @handleUpdatePage="handleUpdatePage">

                <!-- <template #status="{ row }">
                    <Switch size="large" :model-value="String(row.status)" true-color="RGBA(18, 185, 135, 1)"
                        false-color="RGBA(237, 144, 0, 1)" true-value="30" false-value="40"
                        :before-change="() => handleUpdateSwitch(row)">
                        <template #open>
                            <span>开启</span>
                        </template>
                        <template #close>
                            <span>禁用</span>
                        </template>
                    </Switch>
                </template>

                <template #gender="{ row }">
                    <Tag :color="row.gender == 1 ? 'blue' : row.gender == 2 ? 'magenta' : 'warning'">
                        {{ row.gender == 1 ? '男' : row.gender == 2 ? '女' : '未知' }}
                    </Tag>
                </template>


                <template #active="{ row }">
                    <vxe-button type="text" size="mini" status="primary">
                        角色用户
                    </vxe-button>
                    <vxe-button type="text" size="mini" status="primary">
                        权限
                    </vxe-button>
                    <vxe-button type="text" size="mini" status="primary">
                        查看
                    </vxe-button>
                    <vxe-button type="text" size="mini" status="primary" @click="handleRoleEdit(row)">
                        编辑
                    </vxe-button>

                    <vxe-button type="text" size="mini" status="primary" @click="handleRolePermissions(row)">
                        权限
                    </vxe-button>

                    <vxe-button type="text" size="mini" status="primary" @click="handleUpdatePassword">
                        修改密码
                    </vxe-button>

                    <vxe-button type="text" size="mini" status="primary" @click="handleResetPassword(row)">
                        重置密码
                    </vxe-button>

                    <vxe-button type="text" size="mini" status="danger" @click="handleRoleDelete(row.id)">
                        删除
                    </vxe-button>
                </template> -->

            </TableView>
        </div>
    </div>
</template>

<script setup lang="ts" name="log">
import { LogTable } from "./data"
import { ref } from 'vue';
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { Cascader, Modal, Message, DatePicker } from 'view-ui-plus';
import { HostelList, HostelFloorlList, HostelRoomListOfFloor, HostelRoomBedListOfRoom } from "@/api/Hostel/Hostel"
import { DeviceLogList, DeviceStateratio, DeviceTypeRatio, DeviceList, DeviceUpdate, DeviceSave, DeviceRemoveBatch, DeviceStopUsage, DeviceUsageRecordList, DeviceAddUsageRecord } from "@/api/Device/Device";
const { t } = useI18n()
const checkAll = ref<any>(false)
const data = ref<any>([])
const errList = ref<any>([])
const online = ref<any>()
const status = ref<any>()

const searchData = ref<any>({
    hostelId: '',
    floorId: '',
    roomId: '',
    startTime: '',
    endTime: '',
    status: '',
})

const pagerConfig = ref({
    total: 10,//总数
    currentPage: 1,//当前页
    pageSize: 10 //数量
})
// const online = ref<any>()
const dataValue = ref<any>([])
const floorId = ref<any>()
const list = ref<any>([])
const hostelList = ref<any>([])


const handleSearch = (value: any) => {

    searchData.value.floorId = value[1]
    searchData.value.roomId = value[2]


    getData()
}


const getData = () => {
    DeviceLogList(searchData.value).then((res: any) => {
        console.log(res)
        data.value = res.data.records
    })
}

const loadList = (item: any, callback: any) => {
    console.log(item)
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


const handleUpdatePage = ({ currentPage, pageSize }: any) => {
    console.log(currentPage, pageSize)
    pagerConfig.value = {
        ...pagerConfig.value,
        currentPage,
        pageSize
    }
}


// 搜索日期
const handleSearchDate = (item: any) => {
    // getData()
    // console.log(item)
    searchData.value.startTime = item[0]
    searchData.value.endTime = item[1]
    getData()
}

onMounted(() => {
    getData()
    getHome()
})

</script>

<style lang="less" scoped>
.log {
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
        width: 80%;
        height: calc(100vh - 150px);
        margin: 10px auto;

    }

}
</style>