<template>
    <Modal v-model="modal" :title="t(props.title)" width="30" :transition-names="appStore.TransitionConfig.modal" :mask-closable="false">

        <template #close>
            <Icon type="md-close-circle" color="#000" size="16" />
        </template>
        <FormData :rules="props.rules" :lableWidth="props.lableWidth" :FormData="props.FormData" :data="defaultData"
            ref="FormRef" :key="Date.now()">
        </FormData>
        <template #footer>
            <Button @click="handleCancel">{{ $t('取消') }}</Button>
            <Button type="primary" :loading="textLoing" @click="handleSumbit">{{ $t('确定') }}</Button>
        </template>
    </Modal>
</template>

<script setup lang='ts'>
import { nextTick, ref } from 'vue';
import { useI18n } from "vue-i18n"
import { useAppStore } from "@/stores/modules/app"
import FormData from "../FormData/FormData.vue"
const appStore = useAppStore()
const { t } = useI18n()
const emit = defineEmits(['handleModalOk'])
const props: any = defineProps({
    title: {
        type: String,
        default: ""
    },
    rules: {
        type: Object,
        default: {}
    },
    lableWidth: {
        type: Number,
        default: 90
    },
    FormData: {
        type: Array,
        required: true,
        default: []
    },
})


const FormRef = ref<any>(null)
const defaultData = ref<any>({})
const FormId = ref<any>({})
const modal = ref<any>(false)
const textLoing = ref<any>(false)
const openModal = (data: any, id = null) => {

    console.log("=========", data)
    if (data) {
        defaultData.value = data
    }
    if (id) {
        FormId.value = id
    } else {
        FormId.value = null
    }

    modal.value = true
}
const closeModal = () => {
    modal.value = false
    textLoing.value = false
    nextTick(() => {
        FormRef.value.reset()
    })
}

const closeTextLoding = () => {
    textLoing.value = false
}
const handleCancel = () => {
    modal.value = false
    textLoing.value = false
    // nextTick(() => {
    //     FormRef.value.reset()
    // })

}

const handleSumbit = () => {
    console.log(FormRef.value.validate(), { ...FormId.value, ...FormRef.value.FormData })
    FormRef.value.validate().then((valid: any) => {
        console.log(valid)
        if (valid) {

            textLoing.value = true
            // console.log(FormRef.value.FormData)
            emit('handleModalOk', { ...FormId.value, ...FormRef.value.FormData })
        }
    })
}


defineExpose({
    modal,
    textLoing,
    openModal,
    closeModal,
    closeTextLoding
})
</script>

<style scoped lang='less'></style>