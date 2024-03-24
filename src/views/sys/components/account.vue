<template>
    <div class="role">
        <div class="table">
            <TableView ref="TableViewRef" :data="data" :tableConfig="accountTable" :tablePage="pagerConfig"
                @handleUpdatePage="handleUpdatePage" @handleEdit="handleRoleEditModal">

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

                <template #gender="{ row }">
                    <Tag :color="row.gender == 1 ? 'blue' : row.gender == 2 ? 'magenta' : 'warning'">
                        {{ row.gender == 1 ? '男' : row.gender == 2 ? '女' : '未知' }}
                    </Tag>
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
                </template>

            </TableView>
        </div>
        <!-- <Pager class="pager" :tablePage="pagerConfig" @handlePageChange="handlePageChange" ref="PagerRef"></Pager> -->
        <Card :bordered="false" :padding="6" class="btnList">
            <div class="list">
                <Button type="primary" @click="handleAddUser">新增</Button>
                <Button type="primary" @click="handleBatchOnline">批量启用</Button>
                <Button type="primary" @click="handleBatchOffline">批量禁用</Button>
                <Button type="error" @click="handleBatchDelete">批量删除</Button>
            </div>
        </Card>


        <Modal v-model="isPermissions" title="权限修改" :width="30" @on-ok="handleSetPermissions"
            @on-cancel="isPermissions = false">

            <Tree :data="treeData" show-checkbox ref="TreeViewRef"></Tree>
        </Modal>


        <FormModal title="修改密码" :rules="accountUpdate.rules" :lableWidth="100" :FormData="accountUpdate.FormData"
            ref="TablePasswordRef" @handleModalOk="handleEditModalOk">
        </FormModal>


        <FormModal v-if="createData" title="创建用户" :rules="createData.rules" :lableWidth="100"
            :FormData="createData.FormData" ref="TableCreateRef" @handleModalOk="handleCreateAdmin">
        </FormModal>


    </div>
</template>

<script setup lang='ts'>
import { ref, watch } from "vue"
import { accountTable, accountUpdate, accountCreateAdmin } from "../data"
import { Modal, Message, Tag, Tree } from "view-ui-plus";
import { onMounted } from "vue";
import { RolePermission } from "@/api/RolePermission/RolePermission"
import { AdminUser, AdminUserResetPassword, AdminUserUpdatePassword, AdminUserRemove, AdminUserUpdateStatus, AdminUserPutId, AdminUserOnline, AdminUserOffline, AdminUserList, AdminUserOfflineBatch, AdminUserOnlineBatch, AdminUserRemoveBatch } from "@/api/AdminUserInfo/AdminUserInfo"
import { RoleList } from "@/api/RoleInfo/RoleInfo"
import md5 from 'js-md5';
import { useI18n } from "vue-i18n";
const { t } = useI18n()

const props = defineProps({
    searchData: {
        type: String,
        default: ''
    }
})

watch(() => props.searchData, () => {
    getData({ name: props.searchData })
})

const TableViewRef = ref<any>(null)
const TablePasswordRef = ref<any>(null)
const TableCreateRef = ref<any>(null)
const data: any = ref([])

const isPermissions = ref(false)
const treeData: any = ref()

const pagerConfig = ref({
    total: 10,//总数
    currentPage: 1,//当前页
    pageSize: 10 //数量
})

const createData = ref<any>(null)
const roleList = ref<any>([])

const TreeViewRef = ref<any>(null)

// 权限设置
const handleRolePermissions = (row: any) => {
    console.log(row)
    isPermissions.value = true

    let check: any = []
    row.roleInfoVos.forEach((it: any) => {
        check.push(it.id)
    })

    let list = roleList.value.map((item: any) => {
        return {
            title: item.name,
            checked: check.includes(item.id),
            userId: row.id,
            id: item.id
        }
    })

    treeData.value = list
}
const handleSetPermissions = () => {
    console.log("first", TreeViewRef.value.getCheckedNodes())
    const list = TreeViewRef.value.getCheckedNodes()
    let data = list.map((it: any) => {
        return it.id
    })
    console.log(data)
    RolePermission({ id: list[0].userId, permissionIds: data }).then(() => {
        Message.success(t('设置成功'))

        getData()
        isPermissions.value = false
    })
}

// 创建用户
const handleAddUser = () => {
    TableCreateRef.value.openModal({ status: 30 })
}

// 创建用户
const handleCreateAdmin = (data: any) => {

    // console.log("--------", data)
    data.password = md5(data.password)
    AdminUser({ ...data, roleIds: [data.roleIds] }).then(() => {
        Message.success(t('创建成功'))
        TableCreateRef.value.closeModal()
        getData()
    }).catch(() => {
        TableCreateRef.value.closeTextLoding()
    })
}

// 修改密码
const handleEditModalOk = (data: any) => {
    // console.log(data)
    data.newPassword = md5(data.newPassword)
    data.oldPassword = md5(data.oldPassword)

    AdminUserUpdatePassword(data).then(() => {
        Message.success(t('密码修改成功'))
        TablePasswordRef.value.closeModal()
    }).catch(() => {
        TablePasswordRef.value.closeTextLoding()
    })
}

// 修改密码
const handleUpdatePassword = () => {
    TablePasswordRef.value.openModal()
    // Modal.confirm({
    //     title: '提示',
    //     content: '确定要重置密码吗？',
    //     onOk: () => {
    //         AdminUserUpdatePassword({ id: row.id }).then(() => {
    //             Message.success(t('重置成功'))
    //         })
    //     }
    // })
}


// 重置密码
const handleResetPassword = (row: any) => {

    console.log(row)
    Modal.confirm({
        title: '提示',
        content: '确定要重置密码吗？',
        loading: true,
        onOk: () => {
            AdminUserResetPassword({ id: row.id }).then(() => {
                Message.success(t('重置成功'))
                Modal.remove();
            }).catch(() => {
                Modal.loading = false
            })
        }
    })
}

//状态选择
const handleUpdateSwitch = (row: any) => {
    console.log(row)
    return new Promise((resolve, reject) => {
        // 启用角色
        if (row.status == 40) {
            AdminUserUpdateStatus({ id: row.id, status: 30 }).then(() => {
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
            AdminUserUpdateStatus({ id: row.id, status: 40 }).then(() => {
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
    AdminUserPutId(data).then(() => {
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
    if (list.length > 0) {
        AdminUserOnlineBatch(list).then(() => {
            Message.success(t('禁用成功'))
            getData()
        })
    }

}
// 批量禁用
const handleBatchOffline = () => {
    let list = TableViewRef.value.getSelectRecords().map((item: any) => {
        return {
            id: item.id
        }
    })
    console.log(list)

    if (list.length > 0) {
        AdminUserOfflineBatch(list).then(() => {
            Message.success(t('禁用成功'))
            getData()
        })
    }
}
// 批量删除
const handleBatchDelete = () => {
    let list = TableViewRef.value.getSelectRecords().map((item: any) => item.id)
    console.log(list)
    if (list.length > 0) {
        AdminUserRemoveBatch({ ids: list }).then(() => {
            Message.success(t('删除成功'))
            getData()
        })
    }
}

//删除角色
const handleRoleDelete = (id: any) => {
    Modal.confirm({
        title: '删除角色',
        content: '确定要删除此角色',
        loading: true,
        onOk: () => {
            console.log(id)
            AdminUserRemove({ userId: id }).then(() => {
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

const handleUpdatePage = ({ currentPage, pageSize }: any) => {
    console.log(currentPage, pageSize)
    pagerConfig.value = {
        ...pagerConfig.value,
        currentPage,
        pageSize
    }
}


const getData = (search = {}) => {
    console.log("getData")
    AdminUserList(
        {
            current: pagerConfig.value.currentPage,
            size: pagerConfig.value.pageSize,
            ...search
        }
    ).then((res: any) => {
        console.log(res, res.data.total)
        data.value = res.data.records
        pagerConfig.value.total = res.data.total
    })

}


onMounted(() => {
    getData()
    RoleList({
        current: 1,
        size: 9999
    }).then((res: any) => {
        const list = res.data.records.map((item: any) => {
            return {
                label: item.name,
                value: item.id + ''
            }
        })
        roleList.value = res.data.records
        accountCreateAdmin.FormData.forEach(
            (item) => {
                if (item.label === '角色') {
                    item.childs = list
                }
            })
        createData.value = accountCreateAdmin
        //console.log(res.data.records)
    })
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