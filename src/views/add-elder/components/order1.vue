<template>
    <TableForm title="" :FormData="baseInfo.FormData" :data="data" ref="TableFormRef"></TableForm>
    <div style="display: flex;justify-content: space-between;padding: 15px 0;">
        <Button type="default" @click="data = {}" style="width: 25%;">重置</Button>

        <Button type="primary" @click="handleElderAdd" style="width: 25%;">保存</Button>
    </div>
</template>

<script setup lang='ts'>
import { baseInfo } from "../data"
import { ElderlySave, ElderlyDetail } from '@/api/Elderly/Elderly';
import { Message } from "view-ui-plus";
import { ref, onMounted } from "vue";
import { useRoute,useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const TableFormRef = ref<any>()
const data = ref<any>({})
const handleElderAdd = () => {
    console.log(TableFormRef.value.FormData)

    ElderlySave(TableFormRef.value.FormData).then(res => {
        console.log(res);

        Message.success("添加成功")

        router.replace({
            path: "/add-elder",
            query: { type: 1, id: res.data.id }
        })

    })
}

onMounted(() => {
    if (route.query.id) {
        console.log("获取数据")

        ElderlyDetail({ elderlyId: route.query.id }).then((res: any) => {
            console.log(res)
            data.value = res.data
        })
    }
})

</script>

<style scoped lang='less'></style>