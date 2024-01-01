<template>
    <div class="contract">
        <TableForm title="" :FormData="contractInfo.FormData"></TableForm>
        <!-- <p class="foodPub">
            <span>其他费用</span>
            <Button type="primary">添加费用</Button>
        </p> -->
        <TableForm title="合同附件" :FormData="FormData"></TableForm>
    </div>
</template>

<script setup lang='ts'>
import {
    contractInfo
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

<style scoped lang='less'></style>