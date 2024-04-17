<template>
    <div class="details" ref="pageBox">
        <div class="toolBar">
            <div>
                <span class="Back" @click="() => $router.go(-1)">
                    <Icon type="md-navigate" style="transform: rotateZ(-90deg);" />{{ t('返回上一页') }}
                </span>
            </div>
            <div class="bar">

            </div>
            <div class="btn">
                <Space>
                    <Button type="primary" @click="elderModal = true">{{ t('绑定老人') }}</Button>
                    <Input prefix="ios-search" clearable :enter-button="t('搜索')" :placeholder="t('搜索')" />
                </Space>
            </div>
        </div>
        <div class="box">

            <div class="left">
                <p class="title">{{ t('员工信息') }}</p>
                <Card :bordered="false" :padding="20">
                    <div class="info">
                        <div class="img">
                            <img :src="oss + userInfo.photo" alt="" srcset="" v-if="userInfo.photo">
                            <img src="@/assets/images/screen.png" alt="" srcset="" v-else>
                        </div>
                        <div class="txt">
                            <p>
                                <span class="t1">{{ t('员工姓名') }}</span>
                                <span class="t2">{{ userInfo.name }}</span>
                            </p>
                            <p>
                                <span class="t1">{{ t('性别') }}</span>
                                <span class="t2">{{ userInfo.gender == 1 ? '男' : '女' }}</span>
                            </p>
                            <p>
                                <span class="t1">{{ t('年龄') }}</span>
                                <span class="t2">29</span>
                            </p>
                            <!-- <p>
                                <span class="t1">出生日期</span>
                                <span class="t2">{{ userInfo.birthDate }}</span>
                            </p> -->
                            <!-- <p>
                                <span class="t1">身份证</span>
                                <span class="t2">{{ userInfo.idNumber }}</span>
                            </p> -->
                            <p>
                                <span class="t1">{{ t('学业水平') }}</span>
                                <span class="t2">{{ userInfo.educationLevel }}</span>
                            </p>
                            <p>
                                <span class="t1">{{ t('工作经验') }}</span>
                                <span class="t2">{{ userInfo.educationLevel }}</span>
                            </p>
                            <p>
                                <span class="t1">{{ t('工种') }}</span>
                                <span class="t2">{{ userInfo.roleId }}</span>
                            </p>
                            <p>
                                <span class="t1">{{ t('联系电话') }}</span>
                                <span class="t2">{{ userInfo.phone }}</span>
                            </p>


                            <p>
                                <span class="t1">{{ t('员工编号') }}</span>
                                <span class="t2">{{ userInfo.id }}</span>
                            </p>
                            <p>
                                <span class="t1">{{ t('雇佣模式') }}</span>
                                <span class="t2">{{ userInfo.groupId }}</span>
                            </p>
                            <!-- <p>
                                <span class="t1">职业等级</span>
                                <span class="t2">{{ jobLevelList[userInfo.jobLevel] }}</span>
                            </p>
                            <p>
                                <span class="t1">所属小组</span>
                                <span class="t2">{{ userInfo.groupId }}</span>
                            </p>
                            <p>
                                <span class="t1">直属上级</span>
                                <span class="t2">{{ userInfo.superiorId }}</span>
                            </p> -->
                        </div>
                    </div>
                </Card>
            </div>
            <div class="right">
                <p class="title">{{ t('护理老人') }}</p>

                <TableView ref="TableViewRef" :data="data" :tableConfig="nursingTable" :tablePage="pagerConfig"
                    @handleUpdatePage="handleUpdatePage" :tableH="tableH">

                    <template #nursingGrade="{ row }">
                        <span>{{ jobLevelList[row.nursingGrade] }}</span>
                    </template>

                    <template #active="{ row }">
                        <vxe-button type="text" size="mini" status="primary" @click="handleElderLook(row)">
                            {{ t('查看服务') }}
                        </vxe-button>
                        <vxe-button type="text" size="mini" status="danger" @click="handleElderDelete(row.id)">
                            {{ t('移除老人') }}
                        </vxe-button>
                    </template>

                </TableView>
            </div>
        </div>

        <Modal v-model="elderModal" :title="t('绑定老人')" :footer-hide="true" :width="270">
            <template #close>

                <Icon type="md-close-circle" color="#000" size="16" />
            </template>

            <div class="elderBox">
                <Input prefix="ios-search" clearable :enter-button="t('搜索')" :placeholder="t('搜索')" v-model="keyword" />

                <Card :bordered="false" :padding="5" style="background: rgba(19,100,248,0.05);margin: 5px 0;"
                    v-for="item in elderList" :key="item.id">
                    <div class="userBox" @click="handleConnect(item)">
                        <div>
                            <img :src="oss + item.photo" alt="">
                        </div>
                        <div class="name">
                            <p>{{ item.name }}</p>
                            <p>ID:{{ item.fileNo }}</p>
                        </div>
                    </div>
                </Card>

            </div>
        </Modal>


        <!--  护理列表 -->
        <Modal v-model="nerseModal" :title="t('护理任务')" :footer-hide="true" :width="70">
            <template #close>
                <Icon type="md-close-circle" color="#000" size="16" />
            </template>
            <!-- <div> -->
            <Button style="float: right;margin-bottom: 15px;" type="primary"
                @click="handleAddNursing">{{ t('新增护理任务') }}</Button>
            <!-- </div> -->

            <div class="nuresBox">
                <Table :columns="nuresTable.columns" :data="nuresList">


                    <template #status="{ row }">
                        <Tag :color="statusList[row.status].type">{{ statusList[row.status].text }}</Tag>
                    </template>

                    <template #action="{ row }">
                        <vxe-button type="text" size="mini" status="primary" @click="handleEditNursing(row)">编辑</vxe-button>
                        <vxe-button type="text" size="mini" :status="row.status == 0 ? 'primary' : 'danger'"
                            @click="handleStatusNursing(row)">{{ row.status == 0 ? t('开始任务') : t('结束任务') }}</vxe-button>
                        <vxe-button type="text" size="mini" status="danger"
                            @click="handleDeleteNursing(row)">{{ t('删除') }}</vxe-button>
                    </template>
                </Table>
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



        <FormModal :title="editTitle" :rules="editConfig.rules" :lableWidth="editConfig.lableWidth"
            :FormData="editConfig.FormData" ref="TableEditRef" @handleModalOk="handleEditModalOk">
        </FormModal>





    </div>
</template>

<script setup lang='ts'>
import { nursingTable, nuresTable, editConfig } from "./data"
import { ref, onMounted } from "vue";
import { StaffDetailId } from "@/api/Staff/Staff"
import { useRoute } from "vue-router"
import { NurseRecordBindList, NurseRecordUnBindId, NurseRecordElderlyList, NurseRecordBind, NurseTaskList, NurseTaskStartOrEndTaskId, NurseTaskRemoveId, NurseTaskUpdate, NurseTaskSave } from "@/api/Nurse/Nurse"
import { Modal, Message, Table } from "view-ui-plus";
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const route = useRoute()
const oss = ref<any>(import.meta.env.VITE_APP_AXIOS_BASER)

const statusList: any = {
    0: {
        text: '未开始',
        type: 'default'
    },
    1: {
        text: '进行中',
        type: 'primary'
    },
    2: {
        text: '已完成',
        type: 'success'
    },
    7: {
        text: '已过期',
        type: 'warning'
    }

}
const jobLevelList = ref(["三级", "二级", "一级", "特一级", "特二级", "特三级", "专需护理"])
// const NuresViewRef = ref<any>(null)
const TableEditRef = ref<any>(null)
const userInfo = ref<any>({})
const elderModal = ref<any>(false)
const keyword = ref<any>('')
const elderList = ref<any>([])
const nerseModal = ref<any>(false)
const data: any = ref([
    {
        elderlyName: '',
        elderlyFileNo: '',
        nurseLevel: '',
        serviceCount: 10
    }
])
const editTitle = ref('编辑护理任务')
const nuresList: any = ref([{
    elderlyName: '',
    elderlyFileNo: '',
    nurseLevel: '',
    serviceCount: 10,
    status: 0,
}])
const tableH = ref("640px")
const pageBox = ref<any>(null)
const pagerConfig = ref({
    total: 10,//总数
    currentPage: 1,//当前页
    pageSize: 10 //数量
})

const NursingInfo = ref<any>({})


onMounted(() => {
    const h = pageBox.value?.clientHeight
    console.log(h)
    tableH.value = h - 210 + 'px'

    getData()
    getNurseList()
})

const handleEditModalOk = (data: any) => {
    // getNurseList()
    console.log(data)

    let request
    let obj = {}

    if (data.id) {
        request = NurseTaskUpdate
        obj = data
    } else {
        request = NurseTaskSave
        obj = {
            ...data,
            elderlyId: NursingInfo.value.elderlyId,
            nursingGrade: NursingInfo.value.nursingGrade,
            nursingId: NursingInfo.value.id,
            staffId: NursingInfo.value.staffId,
            status: 0
        }
    }
    //console.log(NursingInfo.value,obj)
    request(obj).then(() => {
        Message.success("操作成功")

        getNurseTaskList(NursingInfo.value.elderlyId)
        TableEditRef.value.closeModal()
    }).catch(() => {
        Message.error("操作失败")
        TableEditRef.value?.closeTextLoding()
    })
}


// 新增护理任务
const handleAddNursing = () => {
    // console.log(item)
    // nerseModal.value = true
    // getNurseTaskList(item.elderlyId)
    TableEditRef.value.openModal()

}

// 编辑护理任务
const handleEditNursing = (item: any) => {
    console.log(item)
    TableEditRef.value.openModal(item)
}

// 开始/结束护理任务
const handleStatusNursing = (item: any) => {
    // console.log(item)
    // const request = item.status == 1 ? NurseRecordUnBindId : NurseRecordBindList
    NurseTaskStartOrEndTaskId({ id: item.id, isStart: item.status == 0 ? true : false }).then(() => {
        Message.success("修改成功")
        getNurseTaskList(item.elderlyId)
    })

}

// 删除护理任务
const handleDeleteNursing = (item: any) => {
    console.log(item)
    Modal.confirm({
        title: '删除',
        content: '是否删除该护理任务？',
        loading: true,
        onOk: () => {
            NurseTaskRemoveId({ id: item.id }).then(() => {
                Message.success("删除成功")
                getNurseTaskList(item.elderlyId)
                Modal.remove();
            })
        }
    })
}

// 绑定老人
const handleConnect = (item: any) => {

    let data = {
        staffId: userInfo.value.id,
        staffName: userInfo.value.name,
        nursingGrade: userInfo.value.jobLevel,
        elderlyName: item.name,
        elderlyId: item.id,
        elderlyFileNo: item.fileNo,
    }

    NurseRecordBind(data).then(() => {
        Message.success("绑定成功")
        getData()
        getNurseList()

        elderModal.value = false

    })
}

// 查看服务
const handleElderLook = (item: any) => {

    // NurseTaskList({ elderlyId: item.id }).then((res: any) => {
    //    // nuresList.value = res.data
    // })
    getNurseTaskList(item.elderlyId)

    NursingInfo.value = item

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
                getNurseList()
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

const getNurseTaskList = (id: any) => {
    NurseTaskList({ elderlyId: id }).then((res: any) => {
        nuresList.value = res.data
    })
}



const getNurseList = () => {
    NurseRecordBindList({ staffId: route.query.id }).then((res: any) => {
        data.value = res.data
    })

    NurseRecordElderlyList({}).then((res: any) => {
        //data.value = res.data
        elderList.value = res.data.records
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