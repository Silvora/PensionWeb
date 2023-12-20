<template>
    <div class="role">
        role






        <Pager :tablePage="pageConfig" @handlePageChange="handlePageChange" ref="PagerRef"></Pager>
        <Card :bordered="false" padding="6" class="btnList">
            <div class="list">
                <Button type="primary">新增</Button>
                <Button type="primary">批量启用</Button>
                <Button type="primary">批量禁用</Button>
                <Button style="background:rgba(224, 98, 85, 1);color:#fff">批量删除</Button>
            </div>
        </Card>


    </div>
</template>

<script setup lang='ts'>
import { ref } from "vue"

const pageConfig = ref({
    total: 100,//总数
    currentPage: 1,//当前页
    pageSize: 10 //数量
})

const handlePageChange = ({ currentPage, pageSize }) => {
    console.log(currentPage, pageSize)
    pageConfig.value = {
        ...pageConfig.value,
        currentPage,
        pageSize
    }
}

</script>

<style scoped lang='less'>
.role {
    width: 70%;
    margin: 0 auto;
    position: relative;
    background: red;
    margin-top: 20px;


    .btnList {
        width: 160px;
        position: absolute;
        right: -180px;
        top: 0;

        .list {
            display: flex;
            flex-direction: column;

            button {
                margin: 5px 0;
            }
        }
    }
}
</style>