<template>
    <!-- 添加按钮 -->
    <ToolBar :toolBarConfig="toolBarConfig" :searchData="searchData" @handleToolBarAdd="handleToolBarAdd" ref="ToolBarRef"
        @handleToolBarSearch="handleToolBarSearch" v-if="tableConfig.DOMTool">
        <template #tool>
            <slot name="tool"></slot>
        </template>
        <!-- <template #active>
            <Space>
                <Select v-model="props.searchData.oemId" :placeholder="t('请选择') + t('所属机构')" clearable
                    v-if="toolBarConfig.oemIdSearch" style="width: 150px;" @on-change="handleOemIdChange">
                    <Option v-for="child in appStore.roleList" :value="child.value" :key="child.value">
                        {{ child.label }}
                    </Option>
                </Select>
                <Input v-model="props.searchData[select]" style="width: 280px;" v-if="toolBarConfig.selectSearch" clearable
                    @on-enter="handleSelectChange">
                <template #prepend>
                    <Select v-model="select" :style="{ 'width': '100px' }">
                        <Option :value="item.value" v-for="item in toolBarConfig.selectSearch ">{{ t(item.label) }}
                        </Option>
                    </Select>
                </template>
                <template #append>
                    <Button icon="ios-search" @click="handleSelectChange"></Button>
                </template>
                </Input>
                
                <vxe-button status="primary" icon="vxe-icon-add" @click="handleOpenAddModal"
                    v-if="toolBarConfig">{{ t(toolBarConfig.title) }}</vxe-button>
            </Space>
        </template> -->
    </ToolBar>

    <!-- 添加数据 -->
    <!-- <FormModal :title="toolBarConfig.title" :rules="toolBarConfig.rules" :lableWidth="toolBarConfig.lableWidth"
        :FormData="toolBarConfig.FormData" ref="TableAddRef" @handleModalOk="handleAddModalOk" v-if="toolBarConfig">
    </FormModal> -->

    <VxeTable :align="'center'" :data="props.data" :loading="TableLoading" :height="appStore.tableH"
        :row-config="{ isHover: true }" :stripe="tableConfig.stripe" :border="tableConfig.border" class="TableView"
        @cell-click="headerCellClick" @cell-dblclick="headercellDBClickEvent">
        <VxeColumn type="seq" title="序号" width="60" v-if="tableConfig.seq">
        </VxeColumn>
        <VxeColumn v-for=" item  in  columns " :key="item.key" :field="item.key" :title="item.title"
            :min-width="item.minWidth" show-header-overflow :show-overflow="item.showOverflow == false ? false : true"
            show-footer-overflow>
            <template #default="{ row }" v-if="item.slot">
                <slot :name="item.key" :row="row"></slot>
            </template>

            <template #default="{ row }" v-if="item.key == 'oemId'">
                <span>{{ appStore.oemList.find((item: any) => item.id == row.oemId)?.name ?? row.oemId }}</span>
            </template>
        </VxeColumn>
        <VxeColumn title="操作" fixed="right" :width="tableConfig.activeConfig.width" v-if="tableConfig.activeConfig">
            <template #default="{ row }">
                <vxe-button status="primary" size="mini" @click="handleOpenEditModal(row)"
                    v-if="tableConfig.activeConfig?.active"
                    v-has="tableConfig.activeConfig?.editKey">{{ t('编辑') }}</vxe-button>
                <slot name="active" :row="row"></slot>
            </template>
        </VxeColumn>

        <template v-slot:empty>
            <span>
                <!-- <img src="static/other/img2.gif"> -->
                <p>{{ t('没有更多数据了！') }}</p>
            </span>
        </template>
    </VxeTable>
    <br>
    <!-- 分页数据 -->
    <div v-if="tableConfig.DOMPage">
        <Pager :tablePage="props.tablePage" @handlePageChange="handlePageChange" ref="PagerRef"></Pager>
    </div>

    <!-- 编辑数据 -->
    <FormModal :title="editConfig.title" :rules="editConfig.rules" :lableWidth="editConfig.lableWidth"
        :FormData="editConfig.FormData" ref="TableEditRef" @handleModalOk="handleEditModalOk"
        v-if="tableConfig.activeConfig?.active">
    </FormModal>
</template>

<script setup lang='ts'>
import { useAppStore } from '@/stores/modules/app'
import { ref } from 'vue';
import { useI18n } from "vue-i18n"
const { t } = useI18n()
const appStore = useAppStore()
//表格loding状态
const TableLoading = ref(false)
const PagerRef = ref<any>(null)
const ToolBarRef = ref<any>(null)
const TableEditRef = ref<any>(null)
const emit = defineEmits(['handleUpdatePage', 'handleEdit', 'handleAdd', 'handleSearch', 'headerCellClickEvent', 'headerCellDBClickEvent'])
const props: any = defineProps({
    searchData: {
        type: Object,
        default: {
            oemId: ""
        }
    },
    tablePage: {
        type: Object,
        default: {
            total: 10,//总数
            currentPage: 1,//当前页
            pageSize: 10 //数量
        }
    },
    data: {
        type: Array,
        required: true,
        default: []
    },
    tableConfig: {
        type: Object,
        defaultConfig: {
            DOMTool: true,
            DOMPage: true,
            stripe: false, //斑马线条纹
            border: 'inner', //边框
            seq: false, //排序
            activeConfig: {
                active: true,
                width: 230
            },
            // {
            //     active: true
            // },
            //默认编辑操作
        },
        editConfig: null,
        //     title: '编辑用户',
        //     lableWidth: 80,
        //     rules: getRules(['accountName', 'oemId']),
        //      FormData:[]
        columns: []
    },
    toolBarConfig: {
        type: Object,
        default: null,
        //    defaultConfig: {
        //         title: '添加用户',
        //         lableWidth: 80,
        //         rules: getRules(['deviceName', 'deviceNo']),
        //     },
        //     FormData:[]
    },
})

//table默认设置
const tableConfig = props.tableConfig.defaultConfig
const editConfig = props.tableConfig.editConfig
//columns数据
const columns = props.tableConfig.columns

//toolBarConfig设置数据
const toolBarConfig = props.toolBarConfig

//搜索数据
const handleToolBarSearch = (data: any) => {
    emit("handleSearch", data)
}


//关闭添加弹窗
const closeAddModal = () => {
    ToolBarRef.value.closeModal()
}
//添加数据
const handleToolBarAdd = (data: any) => {
    emit('handleAdd', data)
}


//分页数据
const handlePageChange = ({ currentPage, pageSize }: any) => {
    emit('handleUpdatePage', { currentPage, pageSize })
}

//编辑数据
const handleEditModalOk = (data: any) => {
    emit('handleEdit', data)
}
//打开编辑modal
const handleOpenEditModal = (row: any) => {
    //console.log(row)
    TableEditRef.value.openModal(row)
}
//关闭编辑modal
const closeEditModal = () => {
    //console.log(row)
    TableEditRef.value.closeModal()
}


//打开关闭loding
const openLoding = () => {

    TableLoading.value = true
    if (PagerRef.value) {
        PagerRef.value.PageLoding = true
    }
}
const closeLoding = () => {
    TableLoading.value = false

    if (PagerRef.value) {
        PagerRef.value.PageLoding = false
    }

}

//关闭文字旋转
const closeTextLoding = () => {
    console.log(ToolBarRef.value)
    ToolBarRef.value.closeTextLoding()
    TableEditRef.value.closeTextLoding()
}

//单击列表
const headerCellClick = ({ row }: any) => {

    emit('headerCellClickEvent', row)
}

//双击列表
const headercellDBClickEvent = ({ row }: any) => {

    emit('headerCellDBClickEvent', row)
}


defineExpose({
    openLoding,
    closeLoding,
    closeTextLoding,
    closeAddModal,
    closeEditModal,
})
</script>

<style scoped lang='less'>
.TableView {
    width: 100%;
}
</style>