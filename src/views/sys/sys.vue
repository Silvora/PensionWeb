<template>
    <div class="sys">
        <div class="toolBar">
            <div></div>
            <div class="bar">
                <RadioGroup v-model="type" type="button" button-style="solid" @on-change="handleRadioType">
                    <Radio v-for="item in  typeList" :key="item.label" :label="item.type">
                        <Icon :type="item.icon" />
                        {{ item.label }}
                    </Radio>
                </RadioGroup>
            </div>
            <div class="btn">
                <Button type="primary" v-if="type == 'agency'">保存</Button>
                <Input v-else search clearable placeholder="搜索" />
            </div>
        </div>

        <div class="formInfo">
            <Agency v-if="type == 'agency'"></Agency>
            <Role v-if="type == 'role'"></Role>
            <Account v-if="type == 'account'"></Account>
        </div>
        <p class="footer">深圳海吉雅健康科技有限公司 技术支持</p>
    </div>
</template>

<script setup lang='ts' name="sys">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Agency from "./components/agency.vue"
import Role from "./components/role.vue"
import Account from "./components/account.vue"
const router = useRouter()
const route = useRoute()
const type = ref('agency')
const typeList = ref([
    {
        label: "机构设置",
        icon: "ios-checkmark",
        type: "agency",
    },
    {
        label: "角色设置",
        icon: "ios-checkmark",
        type: "role",
    },
    {
        label: "账号管理",
        icon: "ios-checkmark",
        type: "account",
    },
    {
        label: "护工教室",
        icon: "ios-checkmark",
        type: "care",
    },
    {
        label: "系统设置",
        icon: "ios-checkmark",
        type: "system",
    }
])
console.log(route)

const handleRadioType = (label: any) => {
    //console.log(label)
    router.push('/sys?type=' + label)
}
</script>

<style scoped lang='less'>
.sys {
    width: 100%;
    height: calc(100vh - 60px);
    background: red;
    overflow: hidden;
    position: relative;

    .toolBar {

        height: 60px;
        width: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        background: #fff;

        position: relative;

        .bar {
            margin: 0 auto;
        }

        .btn {
            position: absolute;
            right: 20px;
        }
    }

    .formInfo {
        width: 100%;
        height: calc(100% - 90px);
        margin-bottom: 30px;


        background: rgba(212, 242, 250, 1);
        overflow: hidden;
        overflow-y: auto;

        // .formBox {
        //     width: 70%;
        //     height: 100%;
        //     margin: 0 auto;
        // }
    }

    .footer {

        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;

        text-align: center;
        font-size: 12px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #1C1B1B;
        height: 30px;
        line-height: 30px;
        background: #BCE2ED;
    }

}
</style>