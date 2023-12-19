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
                <Button type="primary" v-if="type == 'mechanism'">保存</Button>
                <Input v-else search clearable placeholder="搜索" />
            </div>
        </div>

        <div class="formInfo">

        </div>
        <p class="footer">深圳海吉雅健康科技有限公司 技术支持</p>
    </div>
</template>

<script setup lang='ts' name="sys">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const type = ref('mechanism')
const typeList = ref([
    {
        label: "机构设置",
        icon: "ios-checkmark",
        type: "mechanism",
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
    height: 100%;

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
        background: rgba(212, 242, 250, 1);
    }

    .footer {
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