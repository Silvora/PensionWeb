<template>
    <Modal v-model="modal" :title="props.title" :footer-hide="true" :mask-closable="false">
        <template #close>
            <Icon type="md-close-circle" color="#000" size="16" />
        </template>
        <slot name="box"></slot>
    </Modal>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
const modal = ref(false)
const props: any = defineExpose({
    title: {
        type: String,
    }
})

const showModal = () => {
    modal.value = true
}

const hideModal = () => {
    modal.value = false
}

defineExpose({
    showModal,
    hideModal
})

</script>

<style scoped lang='less'></style>