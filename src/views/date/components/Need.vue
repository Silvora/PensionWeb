<template>
    <div class="need">
        <div v-for="(item, idx) in  data " :key="idx" class="box">
            <img :src="item.img" alt="">
            <p class="t" :style="{ background: item.color, color: '#fff' }">{{ t(item.title) }}</p>
            <p class="b">{{ item.count }} <span>个</span></p>
        </div>

    </div>
</template>

<script setup lang='ts'>
import { useI18n } from "vue-i18n"
const { t } = useI18n()

import i1 from "@/assets/date/组 1584@2x.png"
import i2 from "@/assets/date/组 1587@2x.png"
import i3 from "@/assets/date/组 1585@2x.png"
import i4 from "@/assets/date/组 1586@2x.png"
const data = [{
    title: "按摩",
    color: "rgba(27, 255, 246, .67)",
    count: 12,
    img: i1,
},
{
    title: "康复",
    color: "rgba(24, 142, 255, .67)",
    count: 12,
    img: i2,
},
{
    title: "助浴",
    color: "rgba(255, 202, 24, .67)",
    count: 12,
    img: i3,
},
{
    title: "活动",
    color: "rgba(255, 113, 24, .67)",
    count: 12,
    img: i4,
}
]
</script>

<style scoped lang='less'>
.need {
    width: 100%;
    height: 100px;
    display: flex;
    flex-wrap: wrap;

    .box {
        width: 50%;
        padding: 10px;
        position: relative;

        img {
            width: 50px;
        }

        .t {

            position: absolute;
            top: 20px;
            left: 50px;
            width: 80%;
            padding: 0 15px;
        }

        .b {
            position: absolute;
            top: 40px;
            left: 65px;
            width: 80%;
            font-size: 24px;
            color: #fff;

            span {
                color: rgba(156, 194, 227, 1);
                font-size: 13px;
                // padding-left: 25px;
            }
        }
    }
}
</style>