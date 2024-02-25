<template>
    <div class="system">
        <Row justify="start" style="width: 330px;">
            <Col :span="24" class="col">
            <div class="label">{{ t('语言') }}</div>
            <div class="input">
                <Select v-model="local" @on-change="handleSetLocal">
                    <Option value="zh-CN">{{ t('中文') }}</Option>
                    <Option value="zh-HK">{{ t('繁体') }}</Option>
                </Select>
            </div>
            </Col>

            <Col :span="24" class="col">
            <div class="label">{{ t('背景') }}</div>
            <div class="input upload1">

                <div class="up1">1</div>

            </div>
            </Col>

            <Col :span="24" class="col">
            <div class="label">{{ t('驾驶舱图片') }}</div>
            <div class="input upload1">
                <div class="up4">1</div>
                <div class="up4">2</div>
                <div class="up4">3</div>
                <div class="up4">4</div>
            </div>
            </Col>
        </Row>
    </div>
</template>

<script setup lang='ts'>
import { getToken } from "@/utils/token";
import { ref } from "vue";
import { useI18n } from "vue-i18n"
const { t, locale } = useI18n()

const local = ref("zh-CN")

const lan: any = {
    "zh": "zh-CN",
}

getToken('language').then((res: any) => {
    console.log(res)
    res?local.value = lan[res]:''
    res?locale.value = lan[res]:''
})

const handleSetLocal = (lan: string) => {
    console.log(lan)
    lan?locale.value = lan:''

}

</script>

<style scoped lang='less'>
.system {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    margin: 0 auto;

    .col {
        display: flex;

        .label {
            width: 110px;
            background: #F1F1F5;
            border: 1px solid #98D2E1;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .input {
            width: 210px;
            border: 1px solid #98D2E1;

        }

        .upload1 {
            width: 210px;
            height: 200px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }

        .up1 {
            width: 210px;
            height: 200px;
            text-align: center;
            line-height: 200px;
        }

        .up4 {
            width: 104px;
            height: 100px;
            text-align: center;
            line-height: 100px;
        }
    }
}
</style>