<template>
    <Modal v-model="modal" :title="t(props.title)" width="30" :transition-names="appStore.TransitionConfig.modal">

        <template #close>
            <Icon type="md-add-circle" color="#000" style="transform: rotateZ(45deg);" size="16" />
        </template>
        <FormData :rules="props.rules" :lableWidth="props.lableWidth" :FormData="props.FormData" :data="defaultData"
            ref="FormRef">
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
const openModal = (data: any, id: any) => {
    if (data) {
        defaultData.value = data
    }
    if (id) {
        FormId.value = id
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
    //console.log(FormRef.value.validate())
    FormRef.value.validate().then((valid: any) => {
        if (valid) {
            textLoing.value = true
            // console.log(FormRef.value.FormData)
            emit('handleModalOk', { ...FormRef.value.FormData, ...FormId.value })
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