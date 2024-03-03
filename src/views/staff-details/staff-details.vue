<template>
    <div class="details" ref="pageBox">
        <div class="toolBar">
            <div></div>
            <div class="bar">

            </div>
            <div class="btn">
                <Space>
                    <Button type="primary" @click="elderModal = true">绑定老人</Button>
                    <Input prefix="ios-search" clearable enter-button="搜索" placeholder="搜索" />
                </Space>
            </div>
        </div>
        <div class="box">

            <div class="left">
                <p class="title">员工信息</p>
                <Card :bordered="false" :padding="20">
                    <div class="info">
                        <div class="img">
                            <img src="@/assets/images/screen.png" alt="" srcset="">
                        </div>
                        <div class="txt">
                            <p>
                                <span class="t1">员工姓名</span>
                                <span class="t2">{{ userInfo.name }}</span>
                            </p>
                            <p>
                                <span class="t1">性别</span>
                                <span class="t2">{{ userInfo.gender == 1 ? '男' : '女' }}</span>
                            </p>
                            <p>
                                <span class="t1">年龄</span>
                                <span class="t2">29</span>
                            </p>
                            <p>
                                <span class="t1">出生日期</span>
                                <span class="t2">{{ userInfo.birthday }}</span>
                            </p>
                            <p>
                                <span class="t1">身份证</span>
                                <span class="t2">{{ userInfo.idNumber }}</span>
                            </p>
                            <p>
                                <span class="t1">文化程度</span>
                                <span class="t2">{{ userInfo.educationLevel }}</span>
                            </p>
                            <p>
                                <span class="t1">入职时间</span>
                                <span class="t2">2020-10-10</span>
                            </p>
                            <p>
                                <span class="t1">职位</span>
                                <span class="t2">{{ userInfo.roleId }}</span>
                            </p>
                            <p>
                                <span class="t1">联系方式</span>
                                <span class="t2">{{ userInfo.phone }}</span>
                            </p>
                            <p>
                                <span class="t1">职业等级</span>
                                <span class="t2">{{ userInfo.jobLevel }}</span>
                            </p>
                            <p>
                                <span class="t1">所属小组</span>
                                <span class="t2">{{ userInfo.groupId }}</span>
                            </p>
                            <p>
                                <span class="t1">直属上级</span>
                                <span class="t2">{{ userInfo.superiorId }}</span>
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
            <div class="right">
                <p class="title">护理老人</p>

                <TableView ref="TableViewRef" :data="data" :tableConfig="roleTable" :tablePage="pagerConfig"
                    @handleUpdatePage="handleUpdatePage" :tableH="tableH">
                    <template #active="{ row }">
                        <vxe-button type="text" size="mini" status="primary" @click="handleElderLook(row)">
                            查看服务
                        </vxe-button>
                        <vxe-button type="text" size="mini" status="danger" @click="handleElderDelete(row.id)">
                            移除老人
                        </vxe-button>
                    </template>

                </TableView>
            </div>
        </div>

        <Modal v-model="elderModal" title="绑定老人" :footer-hide="true" :width="270">
            <template #close>

                <Icon type="md-close-circle" color="#000" size="16" />
            </template>

            <div class="elderBox">
                <Input prefix="ios-search" clearable enter-button="搜索" placeholder="搜索" v-model="keyword" />

                <Card :bordered="false" :padding="5" style="background: rgba(19,100,248,0.05);margin: 5px 0;"
                    v-for="item in elderList" :key="item.id">
                    <div class="userBox">
                        <div>
                            <!-- <img :src="" alt=""> -->
                        </div>
                        <div class="name">
                            <p>{{ item.name }}</p>
                            <p>{{ item.phone }}</p>
                        </div>
                    </div>
                </Card>

            </div>
        </Modal>


        <!--  护理列表 -->
        <Modal v-model="nerseModal" title="护理计划" :footer-hide="true" :width="70">
            <template #close>
                <Icon type="md-close-circle" color="#000" size="16" />
            </template>

            <div class="nuresBox">
                <Table :columns="nuresTable.columns" :data="nuresList"></Table>
                <!-- <TableView ref="TableViewRef" :data="data" :tableConfig="roleTable" :tablePage="pagerConfig"
                    @handleUpdatePage="handleUpdatePage" :tableH="tableH">
                    <template #active="{ row }">
                        <vxe-button type="text" size="mini" status="primary" @click="handleElderLook(row)">
                            查看服务
                        </vxe-button>
                        <vxe-button type="text" size="mini" status="danger" @click="handleElderDelete(row.id)">
                            移除老人
                        </vxe-button>
                    </template>

                </TableView> -->
                <!-- <TableView ref="NuresViewRef" :data="nuresList" :tableConfig="nuresTable">
                    <template #active="{ row }">
                        <vxe-button type="text" size="mini" status="primary" @click="">
                            开始/结束
                        </vxe-button>
                        <vxe-button type="text" size="mini" status="primary" @click="">
                            编辑
                        </vxe-button>
                        <vxe-button type="text" size="mini" status="danger" @click="">
                            删除
                        </vxe-button>
                    </template>

                </TableView> -->
            </div>
        </Modal>

    </div>
</template>

<script setup lang='ts'>
import { roleTable, nuresTable } from "./data"
import { ref, onMounted } from "vue";
import { StaffDetailId } from "@/api/Staff/Staff"
import { useRoute } from "vue-router"
import { NurseRecordBindList, NurseRecordUnBindId } from "@/api/Nurse/Nurse"
import { Modal, Message } from "view-ui-plus";

import { useI18n } from "vue-i18n";
const { t } = useI18n()
const route = useRoute()

const NuresViewRef = ref<any>(null)

const userInfo = ref<any>({})
const elderModal = ref<any>(false)
const keyword = ref<any>('')
const elderList = ref<any>(false)
const nerseModal = ref<any>(false)
const data: any = ref([
    {
        elderlyName: '111',
        elderlyFileNo: '111',
        nurseLevel: '111',
        serviceCount: 10
    }
])
const nuresList: any = ref([{
    elderlyName: '111',
    elderlyFileNo: '111',
    nurseLevel: '111',
    serviceCount: 10,
    status: 10,
}])
const tableH = ref("640px")
const pageBox = ref<any>(null)
const pagerConfig = ref({
    total: 10,//总数
    currentPage: 1,//当前页
    pageSize: 10 //数量
})


onMounted(() => {
    const h = pageBox.value?.clientHeight
    console.log(h)
    tableH.value = h - 210 + 'px'

    getData()
    getNurseList()
})

// 查看服务
const handleElderLook = (item: any) => {
    nerseModal.value = true
}

// 移除老人
const handleElderDelete = (id: any) => {
    Modal.confirm({
        title: '移除',
        content: '确定要移除老人吗？',
        loading: true,
        onOk: () => {
            NurseRecordUnBindId({ id }).then(() => {
                Message.success(t('移除成功'))
                Modal.remove();
            }).catch(() => {
                Modal.loading = false
            })
        }
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

const getNurseList = () => {
    NurseRecordBindList({ staffId: route.query.id }).then((res: any) => {
        //data.value = res.data
    })
}

const getData = () => {
    StaffDetailId({ id: route.query.id }).then((res: any) => {
        userInfo.value = res.data
    })
}

</script>

<style scoped lang='less'>
.details {
    width: 100%;
    height: calc(100vh - 90px);

    .toolBar {
        height: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
        padding: 0 20px;



        .btn {
            // position: absolute;
            // right: 20px;
            display: flex;
        }
    }

    .box {
        width: 100%;
        height: calc(100vh - 150px);
        background: rgba(212, 242, 250, 1);
        display: flex;
        justify-content: space-between;

        .title {
            padding: 20px 0;
            font-size: 16px;
            font-family: AlibabaPuHuiTiR;
            color: #1C1B1B;
        }

        .left {
            width: 370px;
            margin-left: 20px;

            .info {
                display: flex;
                width: 100%;

                .img {
                    width: 130px;
                    height: 130px;

                    img {
                        width: 130px;
                        height: 130px;
                    }
                }

                .txt {
                    padding-left: 20px;

                    p {
                        display: flex;
                        font-size: 14px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 400;

                        .t1 {
                            color: #8B8A96;
                            width: 65px;
                        }

                        .t2 {
                            color: #1C1B1B;
                        }
                    }
                }
            }
        }

        .right {
            width: calc(100% - 520px);
            margin-left: 20px;
            margin-right: 110px;
        }
    }
}

.nuresBox {
    width: 100%;
    // height: 490px;
    overflow: hidden;
    overflow-y: auto;
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