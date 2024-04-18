<template>
    <!-- 添加按钮 -->
    <ToolBar :toolBarConfig="toolBarConfig" :searchData="searchData" @handleToolBarAdd="handleToolBarAdd" ref="ToolBarRef"
        @handleToolBarSearch="handleToolBarSearch" v-if="tableConfig.DOMTool">
        <template #tool>
            <slot name="tool"></slot>
        </template>
    </ToolBar>

    <VxeTable :align="'center'" :data="props.data" :loading="TableLoading"
        :height="props.tableH ? props.tableH : appStore.tableH" :row-config="{ isHover: true }" :stripe="tableConfig.stripe"
        :border="tableConfig.border" class="TableView" @cell-click="headerCellClick" @cell-dblclick="headercellDBClickEvent"
        @checkbox-all="selectAllChangeEvent" @checkbox-change="selectChangeEvent" ref="tableRef">

        <vxe-column type="checkbox" title="" v-if="tableConfig.checkbox"></vxe-column>
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
const tableRef = ref<any>(null)
const PagerRef = ref<any>(null)
const ToolBarRef = ref<any>(null)
const TableEditRef = ref<any>(null)

const emit = defineEmits(['handleUpdatePage', 'handleEdit', 'handleAdd', 'handleSearch', 'headerCellClickEvent', 'headerCellDBClickEvent'])
const props: any = defineProps({
    tableH: {
        type: String,
        default: null
    },
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

console.log("-------", editConfig)
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

//关闭文字旋转 async
const closeTextLoding = () => {
    console.log(ToolBarRef.value)
    ToolBarRef.value?.closeTextLoding()
    TableEditRef.value?.closeTextLoding()
}

//单击列表
const headerCellClick = ({ row }: any) => {

    emit('headerCellClickEvent', row)
}

//双击列表
const headercellDBClickEvent = ({ row }: any) => {

    emit('headerCellDBClickEvent', row)
}

//复选框全部
const selectAllChangeEvent = ({ checked }: any) => {
    const $table = tableRef.value
    if ($table) {
        const records = $table.getCheckboxRecords()
        //console.log(checked ? '所有勾选事件' : '所有取消事件', records)
        records.value = records

    }
}

//复选框
const selectChangeEvent = ({ checked }: any) => {
    const $table = tableRef.value
    if ($table) {
        const records = $table.getCheckboxRecords()
        //console.log(checked ? '勾选事件' : '取消事件', records)
        records.value = records
    }
}


const getSelectRecords = () => {
    const $table = tableRef.value
    if ($table) {
        const records = $table.getCheckboxRecords()
        return records
    }
    return []
}

const exportAllDataEvent = () => {
    const $table = tableRef.value

    console.log(props.data.value)
  if ($table) {
    $table.exportData({
      filename: '员工数据-'+ Date.now(),
      type: 'csv',
      isHeader: true,
      isFooter: true,
      // 自定义导出的数据源
      data: props.data.value,
      columnFilterMethod ({ column }:any) {
        // console.log(column)
        return ['seq', 'name','gender','roleName','entryTime'].includes(column.field)
      }
    })
  }
}


defineExpose({
    getSelectRecords,


    openLoding,
    closeLoding,
    closeTextLoding,
    closeAddModal,
    closeEditModal,

    selectAllChangeEvent,
    selectChangeEvent,


    handleOpenEditModal,//打开编辑model

    exportAllDataEvent,
})
</script>

<style scoped lang='less'>
.TableView {
    width: 100%;
}
</style>