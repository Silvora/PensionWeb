<template>
    <div class="elder" ref="pageBox">

        <div class="bar">
            <span class="Back" @click="() => $router.go(-1)">
                <Icon type="md-navigate" style="transform: rotateZ(-90deg);" />返回上一页
            </span>
            <span class="searchBtn">
                <Space>
                    <Select v-model="model1" style="width:100px" placeholder="床位">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai" disabled>London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                    <Select v-model="model1" style="width:100px" placeholder="楼层">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai" disabled>London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                    <Select v-model="model1" style="width:100px" placeholder="房间">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai" disabled>London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                    <Select v-model="model1" style="width:100px" placeholder="等级">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai" disabled>London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                    <div>
                        <Input search clearable placeholder="搜索" />
                    </div>
                </Space>
            </span>
        </div>

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
                <TableView ref="TableViewRef" :data="data" :tableConfig="elderTable" :tablePage="pagerConfig"
                    @handleUpdatePage="handleUpdatePage" :tableH="tableH" @handleEdit="handleElderEditModal">

                    <template #gender="{ row }">
                        <span>{{ row.gender == 1 ? '男' : row.gender == 2 ? '女' : '' }}</span>
                    </template>

                    <template #active="{ row }">
                        <vxe-button type="text" size="mini" status="primary" @click="()=>router.push(`/add-elder?type=0&id=${row.id}`)">
                            查看
                        </vxe-button>
                        <vxe-button type="text" size="mini" status="primary" @click="handleElderEdit(row)">
                            编辑
                        </vxe-button>
                        <vxe-button type="text" size="mini" status="danger" @click="handleElderlyDelete(row.id)">
                            删除
                        </vxe-button>
                    </template>

                </TableView>
            </div>
            <div class="right">
                <div class="floor">
                    <!-- <Button type="primary" class="btn" @click="handleShowModal">楼栋管理</Button> -->
                    <Card :bordered="false" :padding="6" class="btnList" style="border: 1px solid #98D2E1;">
                        <div class="list">
                            <Button type="primary" @click="() => router.push('/add-elder?type=0&id=')">新增</Button>
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
                    <p class="title">备忘录 <span class="write" @click="handleOpenMemo">
                            <Icon type="md-brush" />
                        </span></p>
                    <div class="memo">
                        <div class="textList">
                            <!-- <p>dsadsa</p>
                            <p>dsadsa</p>
                            <p>dsadsa</p> -->
                            {{ memoList[memoActive]?.content }}
                        </div>
                        <div class="list">
                            <div :class="['item', memoActive == idx ? 'active' : '']" v-for="(item, idx) in memoList"
                                :key="item.id" @click="memoActive = idx">
                                <Icon v-if="memoActive == idx" class="icon" type="md-close-circle" size="24" color="#E06255"
                                    @click="handleDeleteMemo(item.id)">
                                </Icon>

                                <p class="t1">{{ item.name }}</p>
                                <p class="t2">{{ item.createTime }}</p>
                                <p class="t3">{{ item.content }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <FormModal title="备忘录" :rules="memoData.rules" :lableWidth="100" :FormData="memoData.FormData" ref="MemoCreateRef"
            @handleModalOk="handleCreateMemo">
        </FormModal>

    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"
import { elderTable, memoData } from "./data"
import { Message, Modal } from "view-ui-plus";
import AgeChart from "./components/AgeChart.vue";
import SexChart from "./components/SexChart.vue";
import EmptyChart from "./components/EmptyChart.vue";
import LevelChart from "./components/LevelChart.vue"
import DateChart from "./components/DateChart.vue"
import { useI18n } from "vue-i18n";
import { ElderlyList, ElderlyRemoveId, ElderlyHealthUpdate } from "@/api/Elderly/Elderly"
import { MemoList, MemoSave, MemoUpdate, MemoRemoveId } from "@/api/Memo/Memo"
const TableViewRef = ref<any>(null)
const pageBox = ref<any>(null)
const router = useRouter()
const { t } = useI18n()
const tableH = ref("630px")
const MemoCreateRef = ref<any>(null)
const memoActive = ref(0)
const memoList = ref<any>([])
const data: any = ref([])

const model1 = ref<any>(null)

onMounted(() => {
    console.log("", pageBox.value?.clientHeight)//680
    const h = pageBox.value?.clientHeight
    if (h >= 990) {
        tableH.value = 630 + 'px'
    }

    getData()
    getMemoList()
})

const pagerConfig = ref({
    total: 100,//总数
    currentPage: 1,//当前页
    pageSize: 10 //数量
})

// 删除备忘录
const handleDeleteMemo = (id: any) => {


    Modal.confirm({
        title: '删除备忘录',
        content: '确定要删除此条备忘录',
        loading: true,
        onOk: () => {
            MemoRemoveId({ id }).then(() => {
                Message.success(t('删除成功'))
                getMemoList()
                Modal.remove();
            }).catch(() => {
                Modal.loading = false
            })
        }
    })

}

// 打开备忘录
const handleOpenMemo = () => {
    MemoCreateRef.value.openModal()
}
// 创建备忘录
const handleCreateMemo = (data: any) => {
    console.log(data)


    MemoSave({ ...data, type: 0 }).then(() => {
        Message.success(t('添加成功'))
        getMemoList()
        MemoCreateRef.value.closeModal()
    }).catch(() => {
        MemoCreateRef.value.closeTextLoding()
    })
}


//编辑
const handleElderEdit = (row: any) => {
    console.log(row.localDomicile)
    TableViewRef.value.handleOpenEditModal(row)
}
const handleElderEditModal = (data: any) => {
    // console.log(data)
    ElderlyHealthUpdate(data).then(() => {
        Message.success(t('编辑成功'))
        getData()
        TableViewRef.value.closeLoding()
    }).catch(() => {
        console.log("first", TableViewRef.value)
        TableViewRef.value.closeTextLoding()
    })
}

// 单项删除
const handleElderlyDelete = (id: any) => {
    Modal.confirm({
        title: '提示',
        content: '确定要删除吗？',
        okText: '确认',
        cancelText: '取消',
        loading: true,
        onOk: () => {
            ElderlyRemoveId({ id: id }).then(() => {
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



const handleUpdatePage = ({ currentPage, pageSize }: any) => {
    console.log(currentPage, pageSize)
    pagerConfig.value = {
        ...pagerConfig.value,
        currentPage,
        pageSize
    }
}

const getMemoList = () => {
    MemoList({ type: 0 }).then((res: any) => {
        //  console.log(res)
        memoList.value = res.data
    })
}

const getData = () => {
    ElderlyList({
        current: pagerConfig.value.currentPage,
        size: pagerConfig.value.pageSize
    }).then((res: any) => {
        data.value = res.data.records
        pagerConfig.value.total = res.data.total
        console.log(res)
    })
}

</script>

<style scoped lang='less'>
.elder {
    width: 100%;
    height: calc(100vh - 90px);
    //padding: 0px 40px;
    padding-bottom: 0;
    background: rgba(212, 242, 250, 1);
    overflow: hidden;
    overflow-y: auto;

    .bar {
        width: 100%;
        height: 60px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        //padding: 0 0 20px 0;
        padding-right: 20px;
        margin-bottom: 20px;

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

    .chart {
        border-radius: 8px;
        // height: 281px;
        background: #FFFFFF;
        border-radius: 8px;
        border: 1px solid #98D2E1;
        margin-bottom: 10px;

        .title {
            width: 100%;
            // background: linear-gradient(270deg, RGBA(255, 255, 255, 1) 0%, RGBA(206, 223, 254, 1) 100%);

            background: linear-gradient(270deg, RGBA(255, 255, 255, 1) 0%, RGBA(206, 223, 254, 1) 100%);
            border-radius: 8px 8px 0px 0px;
            //opacity: 0.3;
            font-size: 14px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            color: rgba(28, 27, 27, 1);
            padding-left: 10px;
            line-height: 30px;
        }

        .renewalList {
            width: 100%;
            height: 560px;
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
                white-space: pre-wrap;
                /* 或 pre-line */
            }

            .list {
                width: calc(100% - 230px);
                // background: rgba(19, 100, 248, .1);
                overflow: hidden;
                overflow-y: auto;
                padding: 0 10px;

                .item:hover {
                    background: rgba(19, 100, 248, .1);
                }

                .active {
                    background: rgba(19, 100, 248, .1);
                }

                .item {
                    // background: rgb(0, 0, 0, .1);
                    cursor: pointer;
                    margin-bottom: 5px;
                    padding: 10px;
                    border-radius: 8px;
                    position: relative;

                    .icon {
                        position: absolute;
                        top: 0;
                        right: 0px;
                    }

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
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
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
        padding: 0 40px;

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
        padding: 0 40px;


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