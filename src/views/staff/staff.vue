<template>
    <div class="saff" ref="pageBox">
        <div class="infoBox">
            <div class="left">
                <VCalendar :attributes="attrs" trim-weeks>
                    <template #footer>
                        <Button type="primary" style="width: 100%;" @click="modal = true">当日排班</Button>
                    </template>
                </VCalendar>
                <!-- <div class="chart">
                    <p class="title">排班情况</p>
                    <div style="width:100%"> -->
                <!-- <Calendar :backgroundText="true" class-name="select-mode" :language="'cn'"
                    :weeks="['日', '一', '二', '三', '四', '五', '六']" :select-date="'2023-12-26'" style="transform: scale(1);" />
                -->

                <!-- </div>
                </div> -->
                <div class="chart" style="margin-top: 10px;">
                    <p class="title">职业等级分布</p>
                    <LevelChart></LevelChart>
                </div>
                <div class="chart">
                    <p class="title">性别占比</p>
                    <SexChart></SexChart>
                </div>
                <!-- <div class="chart" style="margin-bottom: 0px;">
                    <p class="title">空床比例</p>
                    <EmptyChart></EmptyChart>
                </div> -->
            </div>
            <div class="center">
                <TableView ref="TableViewRef" :data="data" :tableConfig="roleTable" :tablePage="pagerConfig"
                    @handleUpdatePage="handleUpdatePage" :tableH="tableH">

                    <template #active="{ row }">
                        <vxe-button type="text" size="mini" status="primary" @click="handleGetUserInfo(row)">
                            查看
                        </vxe-button>
                        <vxe-button type="text" size="mini" status="primary">
                            排班
                        </vxe-button>
                        <vxe-button type="text" size="mini" status="primary" @click="handleRoleEdit(row)">
                            编辑
                        </vxe-button>
                        <vxe-button type="text" size="mini" status="danger" @click="handleRoleDelete(row.id)">
                            删除
                        </vxe-button>
                    </template>

                </TableView>
            </div>
            <div class="right">
                <div class="floor">
                    <!-- <Button type="primary" class="btn" @click="handleShowModal">楼栋管理</Button> -->
                    <Card :bordered="false" padding="6" class="btnList" style="border: 1px solid #98D2E1;">
                        <div class="list">
                            <Button type="primary">新增</Button>
                            <Button type="primary">导入</Button>
                            <Button type="primary">导出</Button>
                            <Button type="error">批量删除</Button>
                        </div>
                    </Card>
                </div>
                <div class="chart" style="margin-bottom: 10px;">
                    <p class="title">当班信息</p>
                    <div class="info">
                        dsadsadsada
                    </div>
                </div>

                <div class="chart" style="margin-bottom: 0px;">
                    <p class="title">交接班信息</p>
                    <div class="info">
                        dsadsadsada
                    </div>
                </div>
            </div>
        </div>

        <Modal v-model="modal" title="排班情况" footer-hide="true" :width="80">
            <template #close>
                <Icon type="md-add-circle" color="#000" style="transform: rotateZ(45deg);" size="16" />
            </template>
            <Scheduling></Scheduling>
        </Modal>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"
import { roleTable } from "./data"
import { Message, Modal } from "view-ui-plus";
import LevelChart from "./components/LevelChart.vue";
import SexChart from "./components/SexChart.vue";
import Scheduling from "./components/Scheduling.vue"
const modal = ref(false)
const TableViewRef = ref<any>(null)
const pageBox = ref<any>(null)
const router = useRouter()
const attrs = ref([
    {
        key: 'today',
        highlight: true,
        dates: new Date(),
    },
]);

const tableH = ref("765px")
const data: any = ref([
    {
        deviceName: '2121',
        deviceNo: 'dsada',
        freeObsNum: '121',
        deviceStatus: '1',
    },
    {
        deviceName: '2121',
        deviceNo: 'dsada',
        freeObsNum: '121',
        deviceStatus: '0',
    }
])

onMounted(() => {
    console.log("", pageBox.value?.clientHeight)//680
    const h = pageBox.value?.clientHeight

    tableH.value = h - 85 + 'px'

})


const handleGetUserInfo = (row: any) => {
    router.push({
        path: '/staff-details'
    })
}


const pagerConfig = ref({
    total: 100,//总数
    currentPage: 1,//当前页
    pageSize: 10 //数量
})


const handleUpdatePage = ({ currentPage, pageSize }: any) => {
    console.log(currentPage, pageSize)
    pagerConfig.value = {
        ...pagerConfig.value,
        currentPage,
        pageSize
    }
}
</script>

<style scoped lang='less'>
.saff {
    width: 100%;
    height: calc(100vh - 90px);
    padding: 20px 40px;
    padding-bottom: 0;
    background: rgba(212, 242, 250, 1);
    overflow: hidden;
    overflow-y: auto;

    .chart {
        border-radius: 8px;
        // height: 281px;
        background: #FFFFFF;
        border-radius: 8px;
        border: 1px solid #98D2E1;
        margin-bottom: 10px;

        .title {
            width: 100%;
            background: linear-gradient(270deg, rgba(19, 100, 248, 0) 0%, rgba(19, 100, 248, 0.7) 100%);
            border-radius: 8px 0px 0px 0px;
            opacity: 0.3;
            font-size: 14px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            color: rgba(28, 27, 27, 1);
            padding-left: 10px;
            line-height: 30px;
        }

        .info {
            height: 285px;
            padding: 0 5px;
        }


        .write {
            float: right;
            padding: 0 10px;
        }

        .memo {
            display: flex;
            padding: 10px;
            height: 170px;


            .textList {
                width: 230px;
                overflow: hidden;
                overflow-y: auto;
                padding: 10px;
                background: #F1F1F5;
            }

            .list {
                width: calc(100% - 230px);
                // background: rgba(19, 100, 248, .1);
                overflow: hidden;
                overflow-y: auto;
                padding: 10px;

                .item:hover {
                    background: rgba(19, 100, 248, .1);
                }

                .item {
                    // background: rgb(0, 0, 0, .1);
                    cursor: pointer;
                    margin-bottom: 5px;
                    padding: 10px;
                    border-radius: 8px;

                    .t1 {
                        font-size: 14px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 600;
                        color: #1C1B1B;
                    }

                    .t2 {
                        font-size: 12px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 400;
                        color: #8B8A96;
                    }

                    .t3 {
                        font-size: 12px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 400;
                        color: #1C1B1B;
                    }
                }

            }

        }
    }

    .floor {
        width: 170px;
        // margin: 10px 0px;
        // margin-right: 30px;
        margin-bottom: 10px;

        .btnList {
            width: 170px;


            .list {
                display: flex;
                flex-direction: column;

                button {
                    margin: 5px 0;
                }
            }
        }
    }

    .infoBox {
        display: flex;
        width: 100%;

        .left {
            width: 230px;
        }

        .center {
            width: calc(100% - 400px);
            padding: 0 20px;
        }

        .right {
            width: 170px;
        }
    }

    .chartBox {
        display: flex;
        width: 100%;
        margin-top: 10px;


        .left {
            width: 350px;
        }

        .center {
            width: calc(100% - 770px);
            padding: 0 10px;
        }

        .right {
            width: 420px;
        }
    }
}
</style>