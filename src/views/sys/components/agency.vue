<template>
    <div class="agency">
        <TableForm title="机构信息" :FormData="agencyData.FormData"></TableForm>
        <div class="system">
            <Row justify="start">
                <Col :span="8" class="col">
                <div class="label"> 荣誉展示 </div>
                <div class="input upload1">
                    <div class="up4">1</div>
                    <div class="up4">2</div>
                    <div class="up4">3</div>
                    <div class="up4">4</div>
                </div>
                </Col>
            </Row>
        </div>


        <TableForm title="法人信息" :FormData="legalData.FormData"></TableForm>
        <TableForm title="建设信息" :FormData="constructData.FormData" :labelHeight="constructData.labelHeight">
        </TableForm>
        <TableForm title="服务信息" :FormData="serveData.FormData" :labelHeight="serveData.labelHeight"></TableForm>
        <br>

    </div>
</template>

<script setup lang='ts'>
import { agencyData, legalData, constructData, serveData } from "../data"
</script>

<style scoped lang='less'>
.agency {
    width: 70%;
    margin: 0 auto;

    .system {
        // display: flex;
        // justify-content: center;
        // padding: 20px 0;
        margin: 0 auto;

        .col {
            display: flex;

            .label {
                width: 110px;
                background: #F1F1F5;
                border: 1px solid #98D2E1;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .input {
                width: 210px;
                border: 1px solid #98D2E1;
            }

            .upload1 {
                width: 217px;
                height: 200px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
            }

            .up1 {
                width: 210px;
                height: 200px;
                text-align: center;
                line-height: 200px;
            }

            .up4 {
                width: 104px;
                height: 100px;
                text-align: center;
                line-height: 100px;
            }
        }
    }
}
</style>