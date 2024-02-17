<template>
    <div class="date">
        <div class="box">
            <p class="title">智能养老服务驾驶舱</p>
            <div class="continer">
                <div class="left">
                    <p class="sum">坐席总数：245 在线坐席人数：25 今日呼入：62 今日呼出：84</p>
                    <div class="chart">
                        <p>护理员人数分析</p>
                    </div>
                    <div class="chart">
                        <p>护理员在线学习情况</p>
                    </div>
                    <div class="chart">
                        <p>护理员培训基地</p>
                        <div class="swiperBox">
                            <!-- :centeredSlides="true" navigation -->
                            <SwiperBox></SwiperBox>
                        </div>
                    </div>
                </div>
                <div class="center">
                    <p class="tabs">
                        <span :class="[type == 'home' ? 'activeTab' : '']">居家养老服务</span>
                        <span :class="[type == 'community' ? 'activeTab' : '']">社区养老服务</span>
                        <span :class="[type == 'mechanism' ? 'activeTab' : '']">机构养老服务</span>
                    </p>


                </div>
                <div class="right">
                    <p class="day">12:30:05</p>
                    <div class="chart">
                        <p>护理员人数分析</p>
                    </div>
                    <div class="chart">
                        <p>护理员在线学习情况</p>
                    </div>
                    <div class="chart">
                        <p>护理员培训基地</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang='ts'>
import { useRoute } from "vue-router";
import SwiperBox from "./components/swiperBox.vue"
import { ref } from "vue";

const route = useRoute()

const type = ref(route.query.type)

console.log(route)

</script>

<style scoped lang='less'>
.date {
    width: 100%;
    min-width: 1920px;
    height: 100vh;
    background-image: url('../../assets/date/bg.png') !important;
    background-position: center;
    background-size: 101% 100%;

    .box {
        width: 100%;
        height: 100vh;
        background-image: url('../../assets/date/mark.png') !important;
        background-position: center;
        background-size: 102% 102%;

        .title {
            font-size: 42px;
            text-align: center;
            font-family: PangMenZhengDao, PangMenZhengDao;
            font-weight: normal;
            color: #FFFFFF;
            // line-height: 29px;
            // letter-spacing: 200px;
            // text-shadow: 0px 2px 3px rgba(17, 20, 22, 0.31);
            // -webkit-background-clip: text;
            // -webkit-text-fill-color: transparent;
        }

        .continer {
            display: flex;
            padding: 0 40px;

            .chart {
                width: 100%;

                p {
                    width: 430px;
                    font-size: 20px;
                    height: 45px;
                    line-height: 45px;
                    font-family: SourceHanSansCN-Bold, SourceHanSansCN-Bold;
                    font-weight: normal;
                    color: #FFFFFF;
                    background-image: url("../../assets/date/p_title.png");
                    background-size: cover;
                    background-position: center;
                    text-indent: 55px;

                }
            }

            .left {
                width: 520px;

                .sum {
                    font-size: 16px;
                    font-family: SourceHanSansCN-Medium, SourceHanSansCN-Medium;
                    font-weight: normal;
                    color: #C8E3FC;
                    // text-indent: 15px;
                }

                .swiperBox {
                    width: 430px;
                    height: 200px;
                }
            }

            .center {
                width: calc(100% - 950px);

                .tabs {
                    width: 100%;
                    font-size: 20px;
                    font-family: SourceHanSansCN-Medium, SourceHanSansCN-Medium;
                    font-weight: normal;
                    color: #C8E3FC;
                    margin-top: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    span {
                        margin: 0 8px;
                        padding: 8px 12px;
                    }

                    .activeTab {
                        background-image: url("../../assets/date/tab.png");
                        background-size: 100%;
                        background-position: center;
                    }
                }
            }

            .right {
                width: 430px;
            }
        }
    }
}
</style>