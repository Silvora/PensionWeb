<template>
    <div class="role">
        <div class="table">
            <TableView ref="TableViewRef" :data="data" :tableConfig="roleTable" :tablePage="pagerConfig"
                @handleUpdatePage="handleUpdatePage" @handleEdit="handleRoleEditModal">

                <!-- @on-change="(b:any)=>handleUpdateSwitch(b,row)"  -->
                <template #status="{ row }">
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


                <template #active="{ row }">
                    <!-- <vxe-button type="text" size="mini" status="primary">
                        角色用户
                    </vxe-button>
                    <vxe-button type="text" size="mini" status="primary">
                        权限
                    </vxe-button>
                    <vxe-button type="text" size="mini" status="primary">
                        查看
                    </vxe-button> -->
                    <vxe-button type="text" size="mini" status="primary" @click="handleRoleEdit(row)">
                        编辑
                    </vxe-button>
                    <vxe-button type="text" size="mini" status="danger" @click="handleRoleDelete(row.id)">
                        删除
                    </vxe-button>
                </template>

            </TableView>
        </div>
        <!-- <Pager class="pager" :tablePage="pagerConfig" @handlePageChange="handlePageChange" ref="PagerRef"></Pager> -->
        <Card :bordered="false" :padding="6" class="btnList">
            <div class="list">
                <Button type="primary" @click="handleAddRole">新增</Button>
                <Button type="primary" @click="handleBatchOnline">批量启用</Button>
                <Button type="primary" @click="handleBatchOffline">批量禁用</Button>
                <Button type="error" @click="handleBatchDelete">批量删除</Button>
            </div>
        </Card>

        <FormModal title="创建用户" :rules="createRole.rules" :lableWidth="100" :FormData="createRole.FormData"
            ref="TableCreateRef" @handleModalOk="handleCreateRole">
        </FormModal>
    </div>
</template>

<script setup lang='ts'>
import { ref } from "vue"
import { roleTable, createRole } from "../data"
import { Modal, Message } from "view-ui-plus";
import { onMounted } from "vue";
import { RoleRemoveId, Role, RoleList, RoleOnline, RoleUpdateId, RoleOnlineBatch, RoleOffline, RoleOfflineBatch, RoleRemoveBatch } from "@/api/RoleInfo/RoleInfo"
import { useI18n } from "vue-i18n";
const TableViewRef = ref<any>(null)
const TableCreateRef = ref<any>(null)
const { t } = useI18n()
const data: any = ref([])

const pagerConfig = ref({
    total: 10,//总数
    currentPage: 1,//当前页
    pageSize: 10 //数量
})
// 创建角色
const handleAddRole = () => {
    TableCreateRef.value.openModal({ status: 30 })
}

// 创建角色
const handleCreateRole = (data: any) => {
    console.log(data)
    Role(data).then(() => {
        Message.success(t('创建成功'))
        TableCreateRef.value.closeModal()
        getData()
    })
}

//状态选择
const handleUpdateSwitch = (row: any) => {
    console.log(row)
    return new Promise((resolve, reject) => {
        // 启用角色
        if (row.status == 40) {
            RoleOnline({ id: row.id }).then(() => {
                Message.success(t('启用成功'))
                resolve(true)
                getData()
            }).catch(() => {
                //Message.error(t('启用失败'))
                reject()
            })
        }

        // 禁用角色
        if (row.status == 30) {
            RoleOffline({ id: row.id }).then(() => {
                Message.success(t('禁用成功'))
                resolve(true)
                getData()
            }).catch(() => {
                //Message.error(t('禁用失败'))
                reject()
            })
        }
    });



}
//编辑角色
const handleRoleEdit = (row: any) => {
    TableViewRef.value.handleOpenEditModal(row)
}
const handleRoleEditModal = (data: any) => {
    // console.log(data)
    RoleUpdateId(data).then(() => {
        Message.success(t('编辑成功'))
        getData()
        TableViewRef.value.closeLoding()
    }).catch(() => {
        console.log("first", TableViewRef.value)
        TableViewRef.value.closeTextLoding()
    })
}

// 批量启用
const handleBatchOnline = () => {
    let list = TableViewRef.value.getSelectRecords().map((item: any) => {
        return {
            id: item.id
        }
    })
    console.log(list)
    RoleOnlineBatch(list).then(() => {
        Message.success(t('启用成功'))
        getData()
    })
}
// 批量禁用
const handleBatchOffline = () => {
    let list = TableViewRef.value.getSelectRecords().map((item: any) => {
        return {
            id: item.id
        }
    })
    console.log(list)
    RoleOfflineBatch(list).then(() => {
        Message.success(t('禁用成功'))
        getData()
    })
}

//删除角色
const handleRoleDelete = (id: any) => {
    Modal.confirm({
        title: '删除角色',
        content: '确定要删除此角色',
        loading: true,
        onOk: () => {
            console.log(id)
            RoleRemoveId(id).then(() => {
                Message.success(t('重置成功'))
                Modal.remove();
                getData()
                // handleDeviceList(data)
            }).catch(() => {
                Modal.loading = false
            })
        }
    })
}
//批量删除
const handleBatchDelete = () => {
    let list = TableViewRef.value.getSelectRecords().map((item: any) => item.id)
    console.log(list)
    RoleRemoveBatch({ ids: list }).then(() => {
        Message.success(t('删除成功'))
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
const getData = () => {
    RoleList({
        current: pagerConfig.value.currentPage,
        size: pagerConfig.value.pageSize
    }).then((res: any) => {
        console.log(res, res.data.total)
        data.value = res.data.records
        pagerConfig.value.total = res.data.total
    })
}

onMounted(() => {
    getData()
})

</script>

<style scoped lang='less'>
.role {
    width: 70%;
    margin: 0 auto;
    position: relative;
    margin-top: 20px;
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