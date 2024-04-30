<template>
    <div class="count-4">
        <div v-for="(item, idx) in  data " :key="idx" class="box">
            <img :src="img" alt="">
            <p class="t" style=" color: rgba(68, 193, 239, 1)">{{ t(item.title) }}</p>
            <p class="b">{{ item.count }}</p>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useI18n } from "vue-i18n";
import img from "@/assets/date/a@2x.png"
const { t } = useI18n()
const data = [{
    title: "养老机构数",
    count: 12,
},
{
    title: "入住老人数",
    count: 12,
},
{
    title: "床位总数",
    count: 12,
},
{
    title: "护理床位比",
    count: 12,
}
]
</script>

<style scoped lang='less'>
.count-4 {
    width: 100%;
    height: 100px;
    display: flex;

    .box {
        width: 50%;
        padding: 10px;
        position: relative;

        img {
            display: block;
            // width: 140px;
            height: 95px;
            margin: 0 auto;

        }

        .t {

            position: absolute;
            top: 10px;
            left: 0;
            width: 100%;
            text-align: center;
            font-size: 16px;
            // top: 20px;
            // left: 50px;
            // width: 80%;
            // padding: 0 15px;
        }

        .b {

            position: absolute;
            top: 35px;
            left: 0;
            width: 100%;
            text-align: center;
            // top: 20px;
            // left: 50px;
            // width: 80%;
            // padding: 0 15px;
            font-size: 28px;
        }


    }
}
</style>