<template>
    <div class="add-elder">
        <div class="bar">
            <div>
                <span class="Back" @click="() => $router.go(-1)">
                    <Icon type="md-navigate" style="transform: rotateZ(-90deg);" />{{ t('返回上一页') }}
                </span>
            </div>
            <div class="steps">
                <span v-for="(item, idx) in orderMenu" :key="item.title">
                    <Button type="text" :icon="item.icon" :class="[active == idx ? 'active' : '']"
                        @click="handleSetActive(idx)">

                        <i :class="['iconfont', item.icon]"></i>
                        {{ t(item.title) }}</Button>
                    <span v-if="idx != 4">></span>
                </span>
            </div>
            <div style="position: absolute;right: 10px;">
                <Space>

                    <Button type="primary" @click="() => active--" v-if="active > 0">{{ t('上一步') }}</Button>
                    <Button type="primary" @click="() => active++" v-if="active < 4">{{ t('下一步') }}</Button>
                    <!-- <Button type="primary" @click="() => active++" v-if="active == 4">打印</Button> -->
                </Space>
            </div>
        </div>
        <div class="info">
            <div class="form">
                <Order1 v-if="active == 0"></Order1>
                <Order2 v-if="active == 1"></Order2>
                <Order3 v-if="active == 2"></Order3>
                <Order4 v-if="active == 3"></Order4>
                <!-- <Order5 v-if="active == 4"></Order5>
                <Order6 v-if="active == 5"></Order6> -->
                <Order7 v-if="active == 4"></Order7>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import Order1 from './components/order1.vue';
import Order2 from './components/order2.vue';
import Order3 from './components/order3.vue';
import Order4 from './components/order4.vue';
// import Order5 from './components/order5.vue';
// import Order6 from './components/order6.vue';
import Order7 from './components/order7.vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const orderMenu = [
    {
        title: "基础信息登记",
        icon: "icon-1_round_solid",
    },
    {
        title: "家属信息登记",
        icon: "icon-2_round_solid",
    },
    {
        title: "健康信息登记",
        icon: "icon-3_round_solid",
    },
    {
        // title: "护理任务设置",
        title: "其它设置",
        icon: "icon-4_round_solid",
    },
    // {
    //     title: "餐饮床位选择",
    //     icon: "ios-person",
    // },
    // {
    //     title: "合同管理",
    //     icon: "ios-person",
    // },
    {
        title: "出院办理",
        icon: "icon-5_round_solid",
    }
]

const active = ref<any>(0)

watchEffect(() => {
    active.value = route.query.type
})


const handleSetActive = (idx: number) => {
    active.value = idx
    router.replace({ query: { type: idx, id: route.query.id } })
}

onMounted(() => {
    if (route.query.type) {
        active.value = Number(route.query.type)
    }

})
// const handleSumbit = () => {
//     console.log("first")
// }


</script>

<style lang="less" scoped>
.add-elder {
    width: 100%;
    height: calc(100vh - 90px);
    padding-bottom: 0;
    background: rgba(212, 242, 250, 1);
    overflow: hidden;
    overflow-y: auto;



    .bar {
        width: 100%;
        height: 60px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        position: relative;

        .Back {
            position: absolute;
            left: 0;
            top: 0;
            width: 260px;
            cursor: pointer;
            display: inline-block;
            line-height: 60px;
            height: 60px;
            background-color: red;
            padding: 0 20px;
            color: #1364F8;
            background: linear-gradient(90deg, rgba(19, 100, 248, 0.1) 0%, rgba(19, 100, 248, 0) 100%);
        }


        .steps {
            // width: calc(100% - 300px);
            //    background:red;
            text-align: center;
            font-size: 14px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            color: #1C1B1B;

            button {
                outline: none;
            }

            // .active span {
            //     color: red;
            // }
        }
    }

    .info {
        width: 100%;
        height: calc(100vh - 150px);
        overflow: hidden;
        overflow-y: auto;

        .form {
            width: 70%;
            margin: 0 auto;
            padding: 20px 0;
        }
    }
}
</style>