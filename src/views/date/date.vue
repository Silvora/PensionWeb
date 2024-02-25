<template>
    <div class="date">
        <div class="box">
            <p class="title">智能养老服务驾驶舱</p>
            <div class="continer">
                <div class="left">
                    <p class="sum">坐席总数：245 在线坐席人数：25 今日呼入：62 今日呼出：84</p>
                    <div class="chart">
                        <p>护理员人数分析</p>
                        <People></People>
                    </div>
                    <div class="chart">
                        <p>护理员在线学习情况</p>
                        <Study></Study>
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
                        <span :class="[type == 'home' ? 'activeTab' : '']" @click="type = 'home'">居家养老服务</span>
                        <span :class="[type == 'community' ? 'activeTab' : '']" @click="type = 'community'">社区养老服务</span>
                        <span :class="[type == 'mechanism' ? 'activeTab' : '']" @click="type = 'mechanism'">机构养老服务</span>
                    </p>

                    <div class="notes">
                        爱以德养老护理连锁，先后在上海嘉定、黄浦、静安、杨浦、宝山、奉贤、浦东、虹口、普陀等地
                        区开设共17家养老护理机构，拥有养老床位和护理床位7000余张，提供养老、医疗、康复、护理、
                        临终关怀一站式服务。 【收治收住】自理老人、失能失智老人、老年痴呆、偏瘫、临终关怀等长者。
                        【生活照料】24小时日常生活照料规范化流程，20余项护理流程 【营养膳食】营养师调配营养餐、
                        每周不重样。
                    </div>

                    <div class="chart">
                        <p>荣誉展示</p>
                        <div>
                            <Space wrap>
                                <template v-for="(url, index) in urlList" :key="url">
                                    <Image :src="url" fit="contain" width="120px" height="80px" preview
                                        :preview-list="urlList" :initial-index="index" />
                                </template>
                            </Space>
                        </div>
                    </div>


                    <div class="table">

                    </div>


                </div>
                <div class="right">
                    <p class="day">12:30:05</p>
                    <div class="chart">
                        <p>入住情况分析</p>
                        <Check></Check>
                    </div>
                    <div class="chart">
                        <p>能力分析</p>
                        <Ability></Ability>
                    </div>
                    <div class="chart">
                        <p>护理内容需求量</p>
                        <Need></Need>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang='ts'>
import People from "./components/People.vue"
import Study from "./components/Study.vue"
import Check from "./components/Check.vue"
import Ability from "./components/Ability.vue"
import Need from "./components/Need.vue"
import SwiperBox from "./components/swiperBox.vue"

import { useRoute } from "vue-router";
import { ref } from "vue";
import { Image, Space } from 'view-ui-plus';

const route = useRoute()

const type = ref(route.query.type)
const urlList = ref([
    'https://file.iviewui.com/images/image-demo-1.jpg',
    'https://file.iviewui.com/images/image-demo-2.jpg',
    'https://file.iviewui.com/images/image-demo-3.jpg',
    'https://file.iviewui.com/images/image-demo-4.jpg',
    'https://file.iviewui.com/images/image-demo-5.jpg',
    'https://file.iviewui.com/images/image-demo-6.jpg'
])



console.log(route)

</script>

<style scoped lang='less'>
.date::-webkit-scrollbar {
    display: none;
    /* 适用于Chrome、Safari和Opera */
}

.date {
    width: 100%;
    min-width: 1920px;
    height: 100vh;
    background-image: url('../../assets/date/bg.png') !important;
    background-position: center;
    background-size: 101% 100%;
    -ms-overflow-style: none;
    /* 适用于Internet Explorer和Edge */
    scrollbar-width: none;
    /* 适用于Firefox */
    overflow-y: scroll;

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
                width: 450px;

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
                width: calc(100% - 900px);
                padding: 0 30px;

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
                        cursor: pointer;
                    }

                    .activeTab {
                        background-image: url("../../assets/date/tab.png");
                        background-size: 100%;
                        background-position: center;
                    }
                }

                .notes {
                    color: #fff;
                    padding: 12px 0;
                    font-size: 18px;
                }
            }

            .right {
                width: 450px;
            }
        }
    }
}
</style>