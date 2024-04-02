<template>
    <div class="role">
        <div class="table">

            <!-- <ToolBar ref="ToolBarRef" :toolBarConfig="toolBarConfig" @handleToolBarAdd="handleAddFamily"></ToolBar> -->

            <TableView ref="TableViewRef" :data="data" :tableConfig="familyInfo" :tablePage="pagerConfig"
                @handleUpdatePage="handleUpdatePage" @handleEdit="handleEdit">

                <template #gender="{ row }">
                    <Tag type="border" :color="['', 'primary', 'error'][row.gender]">
                        {{ [t('未知'), t('男'), t('女')][row.gender] }}
                    </Tag>

                </template>
                <template #guardian="{ row }">
                    <Tag type="border" :color="row.guardian == 1 ? 'primary' : 'error'">
                        {{ row.guardian == 1 ? t('是') : t('否') }}
                    </Tag>
                </template>

                <template #deviceStatus="{ row }">
                    <Switch :model-value="row.deviceStatus" true-color="RGBA(18, 185, 135, 1)"
                        false-color="RGBA(237, 144, 0, 1)" true-value="1" false-value="0" @on-change="handleUpdateSwitch" />
                </template>


                <template #active="{ row }">
                    <!-- <vxe-button type="text" size="mini" status="primary">
                        角色用户
                    </vxe-button>
                    <vxe-button type="text" size="mini" status="primary">
                        权限
                    </vxe-button> -->
                    <!-- <vxe-button type="text" size="mini" status="primary">
                        查看
                    </vxe-button> -->
                    <vxe-button type="text" size="mini" status="primary" @click="handleRoleEdit(row)">
                        {{ t('编辑') }}
                    </vxe-button>
                    <vxe-button type="text" size="mini" status="danger" @click="handleRoleDelete(row.id)">
                        {{ t('删除') }}
                    </vxe-button>
                </template>

            </TableView>
        </div>
        <!-- <Pager class="pager" :tablePage="pagerConfig" @handlePageChange="handlePageChange" ref="PagerRef"></Pager> -->
        <Card :bordered="false" :padding="6" class="btnList">
            <div class="list">
                <Button type="primary" @click="handleAddFamily">{{ t('新增') }}</Button>
                <!-- <Button type="primary">批量启用</Button>
                <Button type="primary">批量禁用</Button> -->
                <!-- <Button type="error" @click="handleBatchDelete">批量删除</Button> -->
            </div>
        </Card>

        <FormModal :title="t('添加家属')" :rules="toolBarConfig.rules" :lableWidth="toolBarConfig.lableWidth"
            :FormData="toolBarConfig.FormData" ref="TableAddRef" @handleModalOk="handleAddModalOk">
        </FormModal>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from "vue"
import { familyInfo, toolBarConfig } from "../data"
import { Message, Modal, Tag } from "view-ui-plus";
import { useI18n } from "vue-i18n"
import { FamilyList, FamilyRemoveId, FamilySave, FamilyUpdate } from "@/api/Family/Family"
import { useRoute } from 'vue-router';
const route = useRoute()
const TableViewRef = ref<any>(null)
const TableAddRef = ref<any>(null)
const { t } = useI18n()
const data: any = ref([
    // {
    //     deviceName: '2121',
    //     deviceNo: 'dsada',
    //     freeObsNum: '121',
    //     deviceStatus: '1',
    // },
    // {
    //     deviceName: '2121',
    //     deviceNo: 'dsada',
    //     freeObsNum: '121',
    //     deviceStatus: '0',
    // }
])

const pagerConfig = ref({
    total: 10,//总数
    currentPage: 1,//当前页
    pageSize: 10 //数量
})

// 添加
const handleAddFamily = () => {
    TableAddRef.value.openModal()
}
const handleAddModalOk = (data: any) => {
    console.log(data)
    FamilySave({ ...data, elderlyId: route.query.id }).then(() => {
        Message.success(t('添加成功'))
        TableAddRef.value.closeModal()
        getData()
    }).catch(() => {
        TableAddRef.value.closeTextLoding()
    })
}

//状态选择
const handleUpdateSwitch = (b: boolean) => {
    console.log(b)
}

//编辑角色
const handleRoleEdit = (row: any) => {
    TableViewRef.value.handleOpenEditModal(row)
}
const handleEdit = (data: any) => {
    console.log(data)



    let obj = JSON.parse(JSON.stringify(data))
    delete obj._X_ROW_KEY

    FamilyUpdate(obj).then(() => {
        Message.success(t('修改成功'))
        TableViewRef.value.closeEditModal()
        getData()
    }).catch(() => {
        TableViewRef.value.closeTextLoding()
    })
}


//删除角色
const handleRoleDelete = (id: any) => {
    Modal.confirm({
        title: t('删除家属'),
        content: t('确定要删除此家属'),
        loading: true,
        onOk: () => {
            console.log(id)
            FamilyRemoveId({ id }).then(() => {
                Message.success(t('删除成功'))
                Modal.remove();
                getData()
                // handleDeviceList(data)
            }).catch(() => {
                Modal.loading = false
            })
        }
    })
}

// const handleBatchDelete = () => {
//     Modal.confirm({
//         title: '批量删除家属',
//         content: '确定要批量删除家属',
//         loading: true,
//         onOk: () => {
//             console.log(id)
//             FamilyRemoveId({ ids }).then(() => {
//                 Message.success(t('删除成功'))
//                 Modal.remove();
//                 getData()
//                 // handleDeviceList(data)
//             }).catch(() => {
//                 Modal.loading = false
//             })
//         }
//     })
// }


const handleUpdatePage = ({ currentPage, pageSize }: any) => {
    console.log(currentPage, pageSize)
    pagerConfig.value = {
        ...pagerConfig.value,
        currentPage,
        pageSize
    }
}

onMounted(() => {
    getData()
})

const getData = () => {
    FamilyList({ elderlyId: route.query.id }).then((res: any) => {
        console.log(res)
        data.value = res.data
        pagerConfig.value.total = res.data.total
    })
}

</script>

<style scoped lang='less'>
.role {
    // width: 70%;
    margin: 0 auto;
    position: relative;
    // margin-top: 20px;
    // height: calc(100vh - 248px);

    .table {
        width: 100%;
        // height: calc(100vh - 218px);
        // background: goldenrod;
        overflow: hidden;
        overflow-y: auto;

    }


    .btnList {
        width: 160px;
        position: absolute;
        right: -180px;
        top: 0;

        .list {
            display: flex;
            flex-direction: column;

            button {
                margin: 5px 0;
            }
        }
    }

    .pager {
        width: 100%;
        background: #d4f2fa;
    }
}
</style>