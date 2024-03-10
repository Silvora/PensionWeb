<template>
    <TableForm title="" :FormData="baseInfo.FormData" :data="data" ref="TableFormRef"></TableForm>
    <div style="text-align: center;padding: 15px 0;">
        <Button type="primary" @click="handleElderAdd" style="width: 50%;">保存</Button>
    </div>
</template>

<script setup lang='ts'>
import { baseInfo } from "../data"
import { ElderlySave } from '@/api/Elderly/Elderly';
import { Message } from "view-ui-plus";
import { ref,onMounted } from "vue";
import { useRoute } from 'vue-router';
const route = useRoute()
const TableFormRef = ref<any>()
const data = ref<any>({})
const handleElderAdd = () => {
    console.log(TableFormRef.value.FormData)

    ElderlySave(TableFormRef.value.FormData).then(res => {
        console.log(res);

        Message.success("添加成功")
    })
}

onMounted(() => {
    if(route.query.id){
       console.log("获取数据")
    }
})

</script>

<style scoped lang='less'></style>