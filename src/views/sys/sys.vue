<template>
    <div class="sys">
        <div class="toolBar">
            <div>
                <span class="goBack" @click="() => $router.go(-1)">
                    <Icon type="md-navigate" style="transform: rotateZ(-90deg);" />{{ t('返回上一页') }}
                </span>
            </div>
            <div class="bar">
                <RadioGroup v-model="type" type="button" button-style="solid" @on-change="handleRadioType">
                    <Radio v-for="item in  typeList" :key="item.label" :label="item.type">
                        <!-- <Icon :type="item.icon" /> -->
                        <i :class="['iconfont', item.icon]"></i>
                        {{ t(item.label) }}
                    </Radio>
                </RadioGroup>
            </div>
            <div class="btn">
                <Button type="primary" v-if="type == 'agency'||type == 'system'" @click="handleSave">{{ t('保存') }}</Button>
                <Input v-if="type == 'role' || type == 'account'" @on-search="handleSearch" search clearable
                    :placeholder="t('搜索')" />
            </div>
        </div>

        <div class="formInfo" id="formInfo">
            <Agency v-if="type == 'agency'" ref="agencyRef"></Agency>
            <Role v-if="type == 'role'"></Role>
            <Account v-if="type == 'account'" :searchData="name"></Account>
            <System v-if="type == 'system'" ref="systemRef"></System>
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
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const type = ref(route.query.type)

const agencyRef = ref<any>(null)
const systemRef = ref<any>(null)

const name = ref<any>('')

const typeList = ref([
    {
        label: "机构设置",
        icon: "icon-jigou",
        type: "agency",
    },
    {
        label: "角色设置",
        icon: "icon-jiaoseguanli",
        type: "role",
    },
    {
        label: "账号管理",
        icon: "icon-zhanghao",
        type: "account",
    },
    // {
    //     label: "护工教室",
    //     icon: "icon-icon-08",
    //     type: "care",
    // },
    {
        label: "系统设置",
        icon: "icon-xitong",
        type: "system",
    }
])

const handleRadioType = (label: any) => {
    //console.log(label)
    router.replace('/sys?type=' + label)
}

const handleSearch = (value: any) => {
    console.log(value)
    name.value = value
}

const handleSave = () => {
    if(type.value == 'agency'){
        agencyRef?.value?.handleSubmit()
    }

    if(type.value == 'system'){
        systemRef?.value?.handleSubmit()
    }
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