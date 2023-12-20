<template>
    <div class="agency">
        <TableForm title="机构信息" :FormData="agencyData.FormData"></TableForm>
        <TableForm title="法人信息" :FormData="legalData.FormData"></TableForm>
        <TableForm title="建设信息" :FormData="constructData.FormData" :labelHeight="constructData.labelHeight">
        </TableForm>
        <TableForm title="服务信息" :FormData="serveData.FormData" :labelHeight="serveData.labelHeight"></TableForm>
    </div>
</template>

<script setup lang='ts'>
import { agencyData, legalData, constructData, serveData } from "../data"
</script>

<style scoped lang='less'>
.agency {
    width: 70%;
    margin: 0 auto;
}
</style>