<template>
    <VxeToolbar>
        <template #tools>
            <Space>
                <Select v-model="props.searchData.oemId" :placeholder="t('请选择') + t('所属机构')" clearable
                    v-if="toolBarConfig.oemIdSearch" style="width: 150px;" @on-change="handleOemIdChange">
                    <Option v-for="child in appStore.oemList" :value="child.value" :key="child.value">
                        {{ child.label }}
                    </Option>
                </Select>


                <Select v-model="props.searchData.language" :placeholder="t('请选择') + t('语言')" clearable
                    v-if="toolBarConfig.languageSearch" style="width: 150px;" @on-change="handleLanguageChange">
                    <Option v-for="child in languages" :value="child.value" :key="child.value">{{
                        child.label + ` - ${child.desc}`
                    }}</Option>
                </Select>

                <slot name="tool"></slot>

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
                <vxe-button status="primary" icon="vxe-icon-add" @click="handleOpenAddModal" v-if="toolBarConfig"
                    v-has="toolBarConfig.addKey">{{ t(toolBarConfig.title) }}</vxe-button>
            </Space>
        </template>

    </VxeToolbar>

    <!-- 添加数据 -->
    <FormModal :title="toolBarConfig.title" :rules="toolBarConfig.rules" :lableWidth="toolBarConfig.lableWidth"
        :FormData="toolBarConfig.FormData" ref="TableAddRef" @handleModalOk="handleAddModalOk" v-if="toolBarConfig">
    </FormModal>
</template>

<script setup lang='ts'>
import languages from '@/config/languages';
import { useAppStore } from '@/stores/modules/app'
import { ref } from 'vue';
import { useI18n } from "vue-i18n"
const { t } = useI18n()
const appStore = useAppStore()
const emit = defineEmits(['handleToolBarAdd', 'handleToolBarSearch'])
const props: any = defineProps({
    searchData: {
        type: Object,
        default: {
            oemId: "",
            language: ""
        }
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
const TableAddRef = ref<any>(null)

const select = ref<any>("")

//搜索数据
const handleOemIdChange = (value: any) => {
    emit("handleToolBarSearch", { oemId: value })
}
const handleLanguageChange = (value: any) => {
    emit("handleToolBarSearch", { language: value })
}

const handleSelectChange = () => {
    emit("handleToolBarSearch", {})
}
//打开窗口
const handleOpenAddModal = () => {
    //console.log(row)
    TableAddRef.value.openModal()
}
//关闭窗口
const closeModal = () => {
    //console.log(row)
    TableAddRef.value.closeModal()
}
//添加数据
const handleAddModalOk = (data: any) => {
    //console.log(data)
    emit('handleToolBarAdd', data)
}
//关闭文字loding
const closeTextLoding = () => {
    TableAddRef.value.closeTextLoding()
}

defineExpose({
    closeTextLoding,
    closeModal
})

</script>

<style scoped lang='less'></style>