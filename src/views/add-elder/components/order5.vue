<template>
    <div class="food">
        <TableForm title="餐饮信息" :FormData="foodInfo.FormData"></TableForm>
        <TableForm title="床位信息" :FormData="bedInfo.FormData"></TableForm>
        <p class="foodPub">
            <span>其他费用</span>
            <Button type="primary">添加费用</Button>
        </p>
        <TableForm title="" :FormData="FormData"></TableForm>
    </div>
</template>

<script setup lang='ts'>
import {
    foodInfo,
    bedInfo
} from "../data"

const FormData = [
    {
        type: 'input',
        label: '小费',
        prop: "oemvfdId",
        span: 1,
        //disabled: false,
        required: false,
        default: "",
    },
]
</script>

<style scoped lang='less'>
.foodPub {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
}
</style>