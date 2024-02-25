<template>
    <TableForm title="" :FormData="baseInfo.FormData" ref="data"></TableForm>
    <Button type="primary" @click="handleElderAdd">保存</Button>
</template>

<script setup lang='ts'>
import { baseInfo } from "../data"
import { ElderlySave } from '@/api/Elderly/Elderly';
import { ref } from "vue";
const data = ref<any>()
const handleElderAdd = () => {
    console.log(data.value.FormData)

    ElderlySave(data.value.FormData).then(res => {
        console.log(res);
    })
}

</script>

<style scoped lang='less'></style>