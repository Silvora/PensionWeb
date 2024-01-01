<template>
    <TableForm title="合同附件" :FormData="FormData"></TableForm>
</template>

<script setup lang='ts'>
const FormData = [
    {
        type: 'price',
        label: '减免费用',
        prop: "oemvfdId",
        span: 1,
        //disabled: false,
        required: false,
        default: 0,
    },
    {
        type: 'price',
        label: '合计',
        prop: "oemvfdId",
        span: 1,
        //disabled: false,
        required: false,
        default: 0,
    },
]
</script>

<style scoped lang='less'></style>