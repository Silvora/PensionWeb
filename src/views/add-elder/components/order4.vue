<template>
    <div class="care">
        <TableForm title="" :FormData="careInfo.FormData"></TableForm>
        <p class="carePub">
            <span>其他费用</span>
            <Button type="primary">添加费用</Button>
        </p>

        <TableForm title="" :FormData="FormData"></TableForm>
    </div>
</template>

<script setup lang='ts'>
import { careInfo } from "../data"

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
.carePub {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
}
</style>