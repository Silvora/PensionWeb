<template>
    <div class="add-elder">
        <div class="bar">
            <div></div>
            <div class="steps">
                <span v-for="(item, idx) in orderMenu" :key="item.title">
                    <Button type="text" :icon="item.icon" :class="[active == idx ? 'active' : '']"
                        @click="() => active = idx">{{ item.title }}</Button>
                    <span v-if="idx != 6">></span>
                </span>
                <!-- <Button type="text" icon="ios-person">家属信息登记</Button> >
                <Button type="text" icon="ios-person">健康信息登记</Button> >
                <Button type="text" icon="ios-person">健康信息登记</Button> >
                <Button type="text" icon="ios-person">餐饮床位选择</Button> >
                <Button type="text" icon="ios-person">合同管理</Button> >
                <Button type="text" icon="ios-person">入院缴费</Button> -->
            </div>
            <div style="position: absolute;right: 10px;">
                <Space>

                    <Button type="primary" @click="() => active--" v-if="active > 0">上一步</Button>
                    <Button type="primary" @click="() => active++" v-if="active < 6">下一步</Button>
                </Space>
            </div>
        </div>
        <div class="info">
            <div class="form">
                <Order1 v-if="active == 0" @handleSumbit="handleSumbit"></Order1>
                <Order2 v-if="active == 1"></Order2>
                <Order3 v-if="active == 2"></Order3>
                <Order4 v-if="active == 3"></Order4>
                <Order5 v-if="active == 4"></Order5>
                <Order6 v-if="active == 5"></Order6>
                <Order7 v-if="active == 6"></Order7>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Order1 from './components/order1.vue';
import Order2 from './components/order2.vue';
import Order3 from './components/order3.vue';
import Order4 from './components/order4.vue';
import Order5 from './components/order5.vue';
import Order6 from './components/order6.vue';
import Order7 from './components/order7.vue';

const orderMenu = [
    {
        title: "基础信息登记",
        icon: "ios-person",
    },
    {
        title: "家属信息登记",
        icon: "ios-person",
    },
    {
        title: "健康信息登记",
        icon: "ios-person",
    },
    {
        title: "护理任务设置",
        icon: "ios-person",
    },
    {
        title: "餐饮床位选择",
        icon: "ios-person",
    },
    {
        title: "合同管理",
        icon: "ios-person",
    },
    {
        title: "入院缴费",
        icon: "ios-person",
    }
]

const active = ref(0)
const handleSumbit = () => {
    console.log("first")
}


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