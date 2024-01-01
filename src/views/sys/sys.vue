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

        <div class="formInfo" id="formInfo">
            <Agency v-if="type == 'agency'"></Agency>
            <Role v-if="type == 'role'"></Role>
            <Account v-if="type == 'account'"></Account>

            <System v-if="type == 'system'"></System>
        </div>
    </div>
</template>

<script setup lang='ts' name="sys">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Agency from "./components/agency.vue"
import Role from "./components/role.vue"
import Account from "./components/account.vue"
import System from "./components/system.vue"
const router = useRouter()
const route = useRoute()
const type = ref(route.query.type)
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

const handleRadioType = (label: any) => {
    //console.log(label)
    router.push('/sys?type=' + label)
}
</script>

<style scoped lang='less'>
.sys {
    width: 100%;
    height: calc(100vh - 60px);
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
        height: calc(100vh - 150px);
        background: rgba(212, 242, 250, 1);
        overflow: hidden;
        overflow-y: auto;

    }

}
</style>