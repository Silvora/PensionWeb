<template>
    <div class="role">
        <div class="table">
            <TableView ref="TableViewRef" :data="data" :tableConfig="familyInfo" :tablePage="pagerConfig"
                @handleUpdatePage="handleUpdatePage">

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
        <!-- <Pager class="pager" :tablePage="pagerConfig" @handlePageChange="handlePageChange" ref="PagerRef"></Pager> -->
        <Card :bordered="false" padding="6" class="btnList">
            <div class="list">
                <Button type="primary">新增</Button>
                <!-- <Button type="primary">批量启用</Button>
                <Button type="primary">批量禁用</Button> -->
                <Button type="error">批量删除</Button>
            </div>
        </Card>
    </div>
</template>

<script setup lang='ts'>
import { ref } from "vue"
import { familyInfo } from "../data"
import { Message, Modal } from "view-ui-plus";
const TableViewRef = ref<any>(null)
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

const pagerConfig = ref({
    total: 100,//总数
    currentPage: 1,//当前页
    pageSize: 10 //数量
})

//状态选择
const handleUpdateSwitch = (b: boolean) => {
    console.log(b)
}
//编辑角色
const handleRoleEdit = (row: any) => {
    TableViewRef.value.handleOpenEditModal(row)
}
//删除角色
const handleRoleDelete = (id: any) => {
    Modal.confirm({
        title: '删除角色',
        content: '确定要删除此角色',
        loading: true,
        onOk: () => {
            console.log(id)
            // DeviceInfoResetId(data).then(() => {
            //     Message.success(t('重置成功'))
            //     Modal.remove();
            //     getData({ ...searchData })
            //     // handleDeviceList(data)
            // }).catch(() => {
            //     Modal.loading = false
            // })
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