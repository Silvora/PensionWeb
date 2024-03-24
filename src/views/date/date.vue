<template>
    <div class="date">
        <div class="box">
            <p class="title">机构展示平台</p>
            <div class="continer">
                <div class="left">
                    <!-- <p class="sum">坐席总数：245 在线坐席人数：25 今日呼入：62 今日呼出：84</p> -->
                    <div class="chart">
                        <p>{{ t('护理员人数分析') }}</p>
                        <div class="tabs">
                            <span class="tab">机构</span>
                            <span class="tab">证书</span>
                            <span class="tab">年龄</span>
                            <span class="tab">性别</span>
                            <span class="tab">学历</span>
                        </div>
                        <People></People>
                    </div>
                    <div class="chart">
                        <p>{{ t('护理员在线学习情况') }}</p>
                        <Study></Study>
                    </div>
                    <div class="chart">
                        <p>{{ t('连锁机构展示') }}</p>
                        <div class="swiperBox">
                            <!-- :centeredSlides="true" navigation -->
                            <SwiperBox></SwiperBox>
                        </div>
                    </div>
                </div>
                <div class="center">
                    <p class="tabs">
                        <span :class="[type == 'home' ? 'activeTab' : '']" @click="handleRoute('home')">{{ t('机构介绍') }}</span>
                        <span :class="[type == 'community' ? 'activeTab' : '']"
                            @click="handleRoute('community')">{{ t('机构数据') }}</span>
                        <span :class="[type == 'mechanism' ? 'activeTab' : '']"
                            @click="handleRoute('mechanism')">{{ t('居家养老社区地图展示') }}</span>
                    </p>

                    <div class="info_box">

                        <div v-if="type == 'home'">
                            <div class="notes">
                                爱以德养老护理连锁，先后在上海嘉定、黄浦、静安、杨浦、宝山、奉贤、浦东、虹口、普陀等地
                                区开设共17家养老护理机构，拥有养老床位和护理床位7000余张，提供养老、医疗、康复、护理、
                                临终关怀一站式服务。 【收治收住】自理老人、失能失智老人、老年痴呆、偏瘫、临终关怀等长者。
                                【生活照料】24小时日常生活照料规范化流程，20余项护理流程 【营养膳食】营养师调配营养餐、
                                每周不重样。
                            </div>
                            <div class="chart">
                                <p>{{ t('荣誉展示') }}</p>
                                <div class="center_box">
                                    <Space wrap>
                                        <template v-for="(url, index) in urlList" :key="url">
                                            <Image :src="url" fit="contain" width="120px" height="80px" preview
                                                :preview-list="urlList" :initial-index="index" />
                                        </template>
                                    </Space>
                                </div>
                            </div>
                        </div>

                        <div v-if="type == 'community'">
                            <div class="notes">
                                <Count></Count>
                            </div>
                            <div class="chart">
                                <p>{{ t('荣誉展示') }}</p>
                                <div class="center_box">
                                    <Institution></Institution>
                                </div>
                            </div>
                        </div>


                        <div v-if="type == 'mechanism'">
                            <div class="mechanism"></div>
                        </div>


                    </div>

                    <!-- 
                    <div v-if="type == 'home'">
                        <div class="notes">
                            爱以德养老护理连锁，先后在上海嘉定、黄浦、静安、杨浦、宝山、奉贤、浦东、虹口、普陀等地
                            区开设共17家养老护理机构，拥有养老床位和护理床位7000余张，提供养老、医疗、康复、护理、
                            临终关怀一站式服务。 【收治收住】自理老人、失能失智老人、老年痴呆、偏瘫、临终关怀等长者。
                            【生活照料】24小时日常生活照料规范化流程，20余项护理流程 【营养膳食】营养师调配营养餐、
                            每周不重样。
                        </div>
                        <div class="chart">
                            <p>荣誉展示</p>
                            <div class="center_box">
                                <Space wrap>
                                    <template v-for="(url, index) in urlList" :key="url">
                                        <Image :src="url" fit="contain" width="120px" height="80px" preview
                                            :preview-list="urlList" :initial-index="index" />
                                    </template>
                                </Space>
                            </div>
                        </div>
                    </div>

                    <div v-if="type == 'community'">
                        <div class="notes">
                            <Count></Count>
                        </div>
                        <div class="chart">
                            <p>荣誉展示</p>
                            <div class="center_box">
                                <Institution></Institution>
                            </div>
                        </div>
                    </div>


                    <div v-if="type == 'mechanism'">
                        <div class="mechanism"></div>
                    </div> -->




                    <div class="table">
                        <div class="box_table">
                            <p style="text-align: right;padding-right: 15px;">{{ t('预警信息') }}</p>
                            <Table :row-class-name="rowClassName" height="200" :columns="columns" :data="data">
                            </Table>

                        </div>
                        <div class="box_table">
                            <p>{{ t('机构养老院活动排期信息') }}</p>
                            <Table :row-class-name="rowClassName" height="200" :columns="columns2" :data="data2"></Table>

                        </div>
                    </div>


                </div>
                <div class="right">
                    <p class="day">{{ day }}</p>
                    <div class="chart">
                        <p>{{ t('入住情况分析') }}</p>
                        <Check></Check>
                    </div>
                    <div class="chart">
                        <p>{{ t('行动能力分析') }}</p>
                        <Ability></Ability>
                    </div>
                    <div class="chart">
                        <p>{{ t('护理内容需求量') }}</p>
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
import Count from "./components/Count.vue"
import Institution from "./components/Institution.vue"

import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { Image, Space } from 'view-ui-plus';
import dayjs from 'dayjs';
import { useI18n } from "vue-i18n"
const {t} = useI18n()
const day = ref('')
const router = useRouter();
const columns = [
    {
        title: '姓名',
        key: 'name'
    },
    {
        title: '内容',
        key: 'age'
    },
    {
        title: '床位',
        key: 'address'
    },
    {
        title: '日期',
        key: 'address'
    }
]
const data = [
    {
        name: 'John Brown',
        age: 18,
        address: 'New York',
        date: '2016-10-03'
    },
    {
        name: 'Jim Green',
        age: 24,
        address: 'Londo',
        date: '2016-10-01'
    },
    {
        name: 'Joe Black',
        age: 30,
        address: 'Sydne',
        date: '2016-10-02'
    },
    {
        name: 'Jon Snow',
        age: 26,
        address: 'Ottaw',
        date: '2016-10-04'
    },
    {
        name: 'John Brown',
        age: 18,
        address: 'New',
        date: '2016-10-03'
    },
    {
        name: 'Jim Green',
        age: 24,
        address: 'Londo',
        date: '2016-10-01'
    },
    {
        name: 'Joe Black',
        age: 30,
        address: 'Sydney',
        date: '2016-10-02'
    },
    {
        name: 'Jon Snow',
        age: 26,
        address: 'Ottawa',
        date: '2016-10-04'
    }
]

const columns2 = [
    {
        title: '姓名',
        key: 'name'
    },
    {
        title: '活动',
        key: 'age'
    },
    {
        title: '负责人',
        key: 'address'
    },
    {
        title: '日期',
        key: 'address'
    }
]
const data2 = [
    {
        name: 'John Brown',
        age: 18,
        address: 'New York No. 1 Lake Park',
        date: '2016-10-03'
    },

]
const route = useRoute()

const type = ref<any>('')
const urlList = ref([
    'https://file.iviewui.com/images/image-demo-1.jpg',
    'https://file.iviewui.com/images/image-demo-2.jpg',
    'https://file.iviewui.com/images/image-demo-3.jpg',
    'https://file.iviewui.com/images/image-demo-4.jpg',
    'https://file.iviewui.com/images/image-demo-5.jpg',
    'https://file.iviewui.com/images/image-demo-6.jpg'
])

const handleRoute = (name: any) => {
    router.replace({
        path: '/date',
        query: {
            type: name
        }
    })

    type.value = name
}

const rowClassName = (row: any, index: any) => {
    if (index % 2 == 0) {
        return 'demo-table-info-row';
    } else {
        return 'demo-table-error-row';
    }
}

onMounted(() => {
    type.value = route.query.type

    console.log(route.query.type)

    day.value = dayjs().format('YYYY-MM-DD HH:mm')


})


</script>




<style scoped lang='less'>
.date::-webkit-scrollbar {
    display: none;
    /* 适用于Chrome、Safari和Opera */
}

.date {
    width: 100%;
    //min-width: 1440px;
    height: 100%;
    // min-height: 780px;
    // max-height: 780px;
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
        height: 100%;
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

            .tabs {
                width: 100%;
                height: 30px;
                // background: red;
                display: flex;
                // justify-content: center;
                justify-content: space-around;
                align-items: center;
                color: #fff;
                padding: 0 30px;
                font-size: 12px;

                .tab {
                    background: #142C4B;
                    padding: 2px 12px;
                    border-radius: 15px;
                    border: 1px solid #E5FFFF;
                }
            }

            .chart {
                width: 100%;

                p {
                    // width: 430px;
                    font-size: 20px;
                    height: 45px;
                    line-height: 45px;
                    font-family: SourceHanSansCN-Bold, SourceHanSansCN-Bold;
                    font-weight: normal;
                    color: #FFFFFF;
                    background-image: url("../../assets/date/p_title.png");
                    // background-size: cover;
                    background-size: 100% 100%;
                    background-position: center;
                    text-indent: 55px;

                }
            }



            .left {
                width: 400px;

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
                width: calc(100% - 800px);
                padding: 0 30px;


                .info_box {
                    // background: red;
                    // height: 100px;
                    height: calc(100vh - 370px);
                    width: 100%;
                    min-height: 450px;
                    // min-height: 500px;
                }

                // height: calc(100vh - 90px);

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
                        background-size: 100% 100%;
                        background-position: center;
                    }
                }

                .notes {
                    color: #fff;
                    padding: 12px 0;
                    // padding-top: 6px;
                    font-size: 14px;
                    // height: 110px;
                    min-height: 120px;
                }

                .chart {
                    .center_box {
                        width: 100%;
                        // height: calc(100% - 100px);
                        // ;

                    }
                }



                .table {
                    height: calc(100vh - 600px);
                    width: 100%;
                    display: flex;
                    min-height: 200px;
                    // background: red;
                    overflow: hidden;

                    .box_table {
                        flex: 1;
                        margin: 0 5px;

                        p {
                            padding: 10px 0;
                            color: #32E7FF;
                            width: 100%;
                        }

                    }

                }
            }

            .right {
                width: 400px;
            }

            .mechanism {
                width: 100%;
                // background: rgb(220, 235, 7);
                height: calc(100vh - 370px);
            }
        }
    }
}
</style>