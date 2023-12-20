<template>
     <Modal
        v-model="modal"
        title="Common Modal dialog box title"
        footer-hide="true"
        >
        <template #close>
            <Icon type="md-add-circle" color="#000" style="transform: rotateZ(45deg);" size="16"/>
        </template>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const modal = ref(false)

const showModal = ()=>{
    modal.value = true
}

const hideModal = ()=>{
    modal.value = false
}

defineExpose({
    showModal,
    hideModal
})
</script>

<style lang="" scoped>

</style>