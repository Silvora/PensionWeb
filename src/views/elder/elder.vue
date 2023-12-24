<template>
    <div class="elder" ref="pageBox">
        <div class="infoBox">
            <div class="left">
                <div class="chart">
                    <p class="title">年龄分布</p>
                    <AgeChart></AgeChart>
                </div>
                <div class="chart">
                    <p class="title">性别占比</p>
                    <SexChart></SexChart>
                </div>
                <div class="chart" style="margin-bottom: 0px;">
                    <p class="title">空床比例</p>
                    <EmptyChart></EmptyChart>
                </div>
            </div>
            <div class="center">
                <TableView ref="TableViewRef" :data="data" :tableConfig="roleTable" :tablePage="pagerConfig"
                    @handleUpdatePage="handleUpdatePage" :tableH="tableH">

                    <template #active="{ row }">
                        <vxe-button type="text" size="mini" status="primary">
                            查看
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
                            <Button type="primary" @click="()=>router.push('/add-elder')">新增</Button>
                            <Button type="error">批量删除</Button>
                        </div>
                    </Card>
                </div>
                <div class="chart" style="margin-bottom: 0px;">
                    <p class="title">临近续费提醒</p>
                    <div class="renewalList">
                        <div v-for="item in Array.from({ length: 2 })" class="item">
                            <p class="t1">{{ item }}李梅梅</p>
                            <p class="t2">到期时间:2025-10-23</p>
                            <p class="t3">3天</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="chartBox">
            <div class="left">
                <div class="chart">
                    <p class="title">护理等级统计</p>
                    <LevelChart></LevelChart>
                </div>
            </div>
            <div class="center">
                <div class="chart">
                    <p class="title">入住时间统计</p>
                    <DateChart></DateChart>
                </div>
            </div>
            <div class="right">
                <div class="chart">
                    <p class="title">备忘录 <span class="write">
                            <Icon type="md-brush" />
                        </span></p>
                    <div class="memo">
                        <div class="textList">
                            <p>dsadsa</p>
                            <p>dsadsa</p>
                            <p>dsadsa</p>
                        </div>
                        <div class="list">
                            <div class="item" v-for="item in Array.from({ length: 3 })">
                                <p class="t1">病人看护指南{{ item }}</p>
                                <p class="t2">2023/10/9</p>
                                <p class="t3">1:准点提醒吃药</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from "vue";
import {useRouter} from "vue-router"
import { roleTable } from "./data"
import { Message, Modal } from "view-ui-plus";
import AgeChart from "./components/AgeChart.vue";
import SexChart from "./components/SexChart.vue";
import EmptyChart from "./components/EmptyChart.vue";
import LevelChart from "./components/LevelChart.vue"
import DateChart from "./components/DateChart.vue"
const TableViewRef = ref<any>(null)
const pageBox = ref<any>(null)
const router = useRouter()
const tableH = ref("595px")
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

onMounted(()=>{
    console.log("",pageBox.value?.clientHeight)//680
    const h= pageBox.value?.clientHeight
    if(h>=900){
        tableH.value = h-220-85+'px'
    }

})

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
.elder {
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

        .renewalList {
            width: 100%;
            height: 525px;
            overflow: hidden;
            overflow-y: auto;

            .item {
                height: 50px;
                position: relative;
                background: rgba(19, 100, 248, 0.05);
                border-radius: 4px;
                margin: 5px 10px;
                padding: 10px;
                display: flex;
                flex-direction: column;

                .t1 {
                    font-size: 14px;
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    color: #1C1B1B;
                }

                .t2 {
                    font-size: 12px;
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    color: #E06255;
                }

                .t3 {
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    background: #E06255;
                    border-radius: 0px 4px 0px 4px;
                    color: #fff;
                    font-size: 10px;
                }
            }

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
            width: 160px;
        }

        .center {
            width: calc(100% - 330px);
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