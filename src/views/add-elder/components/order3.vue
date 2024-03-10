<template>
    <TableForm title="" :data="data" :FormData="healthyInfo.FormData" ref="TableFormRef"></TableForm>
    <div style="text-align: center;padding: 15px 0;">
        <Button type="primary" @click="handleElderAdd" style="width: 50%;">保存</Button>
    </div>
</template>

<script setup lang='ts'>
import { healthyInfo } from "../data"
import { ElderlyHealthSave,ElderlyHealthElderlyId } from '@/api/Elderly/Elderly';
import { Message } from "view-ui-plus";
import { ref,onMounted } from "vue";
import { useRoute } from 'vue-router';
const route = useRoute()
const data = ref<any>()
const TableFormRef = ref<any>()
const handleElderAdd = () => {
    console.log(TableFormRef.value.FormData)

    ElderlyHealthSave({...TableFormRef.value.FormData,elderlyId:route.query.id}).then(res => {
        console.log(res);

        Message.success("添加成功")
    })
}

onMounted(() => {
    if(route.query.id){
       console.log("获取数据")
       ElderlyHealthElderlyId({elderlyId:route.query.id}).then(res => {
           console.log(res);
           data.value = res.data
       })
    }
})
</script>

<style scoped lang='less'></style>