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
                            <span>{{ t('启用') }}</span>
                        </template>
                        <template #close>
                            <span>{{ t('停用') }}</span>
                        </template>
                    </Switch>
                </template>

                <template #gender="{ row }">
                    <Tag :color="row.gender == 1 ? 'blue' : row.gender == 2 ? 'magenta' : 'warning'">
                        {{ row.gender == 1 ? t('男') : row.gender == 2 ? t('女') : t('未知') }}
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
                        {{ t('编辑') }}
                    </vxe-button>

                    <vxe-button type="text" size="mini" status="primary" @click="handleRolePermissions(row)">
                        {{ t('权限') }}
                    </vxe-button>

                    <vxe-button :disabled="row.phone != userPhone" type="text" size="mini" status="primary" @click="handleUpdatePassword">
                        {{ t('修改密码') }}
                    </vxe-button>

                    <vxe-button type="text" size="mini" status="primary" @click="handleResetPassword(row)">
                        {{ t('重置密码') }}
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
                <Button type="primary" @click="handleAddUser">{{ t('新增') }}</Button>
                <Button type="primary" @click="handleBatchOnline">{{ t('批量启用') }}</Button>
                <Button type="primary" @click="handleBatchOffline">{{ t('批量停用') }}</Button>
                <Button type="error" @click="handleBatchDelete">{{ t('批量删除') }}</Button>
            </div>
        </Card>


        <Modal v-model="isPermissions" :title="t('权限修改')" :width="30" @on-ok="handleSetPermissions"
            @on-cancel="isPermissions = false" :mask-closable="false">

            <Tree :data="treeData" show-checkbox ref="TreeViewRef"></Tree>
        </Modal>


        <FormModal :title="t('修改密码')" :rules="accountUpdate.rules" :lableWidth="100" :FormData="accountUpdate.FormData"
            ref="TablePasswordRef" @handleModalOk="handleEditModalOk">
        </FormModal>


        <FormModal v-if="createData" title="建立账号" :rules="createData.rules" :lableWidth="100"
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
import { getToken } from "@/utils/token";
const { t } = useI18n()

const props = defineProps({
    searchData: {
        type: String,
        default: ''
    }
})
const userPhone = ref<any>(null)

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
        title: t('提示'),
        content: t('确定要重置密码吗？'),
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
    console.log(".........", row)
    TableViewRef.value.handleOpenEditModal(row)
}
const handleRoleEditModal = (data: any) => {
    console.log(data)

    let obj: any = {
        // id: data.id,
        name: data.name,
        // status: data.status,
        account: data.account,
        description: data.description,
        gender: data.gender,
        phone: data.phone,
        roleIds: data.roleInfoVos.map((it: any) => {
            return it.id
        }),
        status: data.status
    }


    AdminUserPutId({id: data.id},obj).then(() => {
        Message.success(t('编辑成功'))
        getData()
        TableViewRef.value.closeEditModal()
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
            Message.success(t('启用成功'))
            getData()
        })
    }else{
        Message.warning(t('请选择要启用的用户'))
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
    }else{
        Message.warning(t('请选择要禁用的用户'))
    }
}
// 批量删除
const handleBatchDelete = () => {
    let list = TableViewRef.value.getSelectRecords().map((item: any) => item.id)
    console.log(list)
    if (list.length > 0) {
        Modal.confirm({
        title: '删除使用者',
        content: '確定要删除此使用者',
        loading: true,
        onOk: () => {
            AdminUserRemoveBatch({ ids: list }).then(() => {
            Message.success(t('删除成功'))
            getData()
        }).catch(() => {
                Modal.loading = false
            })
        }
    })
    }else{
        Message.warning(t('請選擇要删除的使用者!'))
    }
}

//删除角色
const handleRoleDelete = (id: any) => {
    Modal.confirm({
        title: '删除使用者',
        content: '確定要删除此使用者',
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
    getData()
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

    getToken('ing-User').then((res: any) => {
        console.log(res)
        userPhone.value = res
    })

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
                if (item.label === '工种类型') {
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