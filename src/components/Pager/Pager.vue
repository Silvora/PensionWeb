<template>
    <VxePager :align="'center'" :loading="PageLoding"
        :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"
        :current-page="props.tablePage.currentPage" :page-size="props.tablePage.pageSize" :total="props.tablePage.total"
        @page-change="handlePageChange">
    </VxePager>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

const PageLoding = ref(false)
const emit = defineEmits(['handlePageChange'])
const props: any = defineProps({
    tablePage: {
        type: Object,
        default: {
            total: 10,//总数
            currentPage: 1,//当前页
            pageSize: 10 //数量
        }
    },
})

//分页数据
const handlePageChange = ({ currentPage, pageSize }: any) => {
    emit('handlePageChange', { currentPage, pageSize })
}

defineExpose({
    PageLoding
})
</script>

<style scoped lang='less'></style>