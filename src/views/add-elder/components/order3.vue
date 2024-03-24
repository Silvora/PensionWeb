<template>
    <TableForm title="" :data="data" :FormData="healthyInfo.FormData" ref="TableFormRef"></TableForm>
    <div style="display: flex;justify-content: space-between;padding: 15px 0;">
        <Button type="default" @click="data = {}" style="width: 25%;">重置</Button>

        <Button type="primary" @click="handleElderAdd" style="width: 25%;">保存</Button>
    </div>
</template>

<script setup lang='ts'>
import { healthyInfo } from "../data"
import { ElderlyHealthSave, ElderlyHealthElderlyId, ElderlyHealthUpdate } from '@/api/Elderly/Elderly';
import { Message } from "view-ui-plus";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const data = ref<any>()
const TableFormRef = ref<any>()
const handleElderAdd = () => {
    // console.log(TableFormRef.value.FormData,route.query.id,data.value)

    // console.log(route.query.id && JSON.stringify(data.value)!="{}")
    if (route.query.id && JSON.stringify(data.value)!="{}") {
        ElderlyHealthUpdate
            ({ ...TableFormRef.value.FormData, elderlyId: route.query.id }).then(_ => {
                Message.success("修改成功")
            })

        return
    }



    ElderlyHealthSave({ ...TableFormRef.value.FormData, elderlyId: route.query.id }).then(res => {
        console.log(res);

        Message.success("添加成功")
        router.replace({
            path: "/add-elder",
            query: { type: 3, id: route.query.id }
        })
    })
}

onMounted(() => {
    if (route.query.id) {
        console.log("获取数据")
        ElderlyHealthElderlyId({ elderlyId: route.query.id }).then(res => {
            console.log(res);
            data.value = res.data || {}
        })
    }
})
</script>

<style scoped lang='less'></style>