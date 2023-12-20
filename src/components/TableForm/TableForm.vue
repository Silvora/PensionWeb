<template>
    <div class="TableForm" v-if="FormData">
        <p class="formTitle">{{ props.title }}</p>
        <Form :model="FormData" :rules="rules" :label-width="110" ref="FormDataRef" :key="Date.now()">
            <Row justify="start">
                <Col v-for="item in props.FormData" :span="item.span * 8" class="col">
                <!-- <div style="width: 100%;height:100%"> -->
                <FormItem :prop="item.prop" :label="item.label"
                    :style="{ 'width': '100%', 'height': props.labelHeight ? props.labelHeight + 'px' : '32px' }">
                    <!-- <Input v-model="FormData[item.prop]" placeholder="请输入" />
                    </FormItem>
                </div> -->

                    <div style="width: 100%;height:100%" v-if="item.type == 'sort'">
                        <InputNumber :min="0" :max="item.max ? item.max : 10000000" v-model="FormData[item.prop]"
                            style="width: 100%;touch-action:none" />
                    </div>

                    <div style="width: 100%;height:100%" v-if="item.type == 'price'">
                        <InputNumber v-model="FormData[item.prop]" :min="0"
                            :formatter="(value: any) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                            :parser="(value: any) => value.replace(/\$\s?|(,*)/g, '')" style="width: 100%;" />
                    </div>


                    <div style="width: 100%;height:100%" v-if="item.type == 'input'">
                        <Input v-if="item.password" v-model="FormData[item.prop]" :placeholder="t('请输入') + t(item.label)"
                            type="password" password />
                        <Input v-else v-model="FormData[item.prop]" :placeholder="t('请输入') + t(item.label)"
                            :disabled="item.disabled" />
                    </div>


                    <div style="width: 100%;height:100%" v-if="item.type == 'textarea'">

                        <Input v-model="FormData[item.prop]" type="textarea" :autosize="{ minRows: 4, maxRows: 4 }"
                            :placeholder="t('请输入') + t(item.label)" :disabled="item.disabled" />
                    </div>

                    <div style="width: 100%;height:100%" v-if="item.type == 'select'">
                        <Select v-model="FormData[item.prop]" :placeholder="t('请选择') + t(item.label)" clearable
                            :disabled="item.disabled" :multiple="item.multiple" v-if="item.prop == 'oemId'">
                            <Option v-for="      child       in       appStore.oemList      " :value="child.value"
                                :key="child.value">{{
                                    child.label
                                }}</Option>
                        </Select>


                        <Select v-model="FormData[item.prop]" :placeholder="t('请选择') + t(item.label)" clearable
                            :disabled="item.disabled" :multiple="item.multiple" v-else-if="item.prop == 'roleId'">
                            <Option v-for="      child       in       appStore.roleList      " :value="child.value"
                                :key="child.value">
                                {{
                                    child.label
                                }}
                            </Option>
                        </Select>

                        <Select v-model="FormData[item.prop]" :placeholder="t('请选择') + t(item.label)" clearable
                            :disabled="item.disabled" :multiple="item.multiple" v-else-if="item.prop == 'language'">
                            <Option v-for="      child       in       languages      " :value="child.value"
                                :key="child.value">
                                {{
                                    child.label + ` - ${child.desc} `
                                }}
                            </Option>
                        </Select>

                        <Select v-model="FormData[item.prop]" :placeholder="t('请选择') + t(item.label)" clearable
                            :disabled="item.disabled" :multiple="item.multiple" v-else>
                            <Option v-for="      child       in       item.childs      " :value="child.value"
                                :key="child.value">{{
                                    t(child.label)
                                }}</Option>
                        </Select>
                    </div>

                    <div style="width: 100%;height:100%" v-if="item.type == 'switch'">
                        <Switch size="large" v-model="FormData[item.prop]" :true-value="1" :false-value="0">
                            <template #open>
                                <span>{{ item.open.length == 1 ? '&nbsp;&nbsp;' + t(item.open) : t(item.open) }}</span>
                            </template>
                            <template #close>
                                <span>{{ item.open.length == 1 ? '&nbsp;' + t(item.close) : t(item.close) }}</span>
                            </template>
                        </Switch>
                    </div>

                    <div style="width: 100%;height:100%" v-if="item.type == 'radio'">
                        <RadioGroup v-model="FormData[item.prop]">
                            <Radio :label="t(r.value)" :border="r.border" :disabled="r.disabled"
                                v-for="      r       in     item.childs    ">
                                {{ t(r.label) }}
                            </Radio>

                        </RadioGroup>
                    </div>

                    <div style="width: 100%;height:100%" v-if="item.type == 'tag'">
                        <Tag type="border" :color="FormData[item.prop] == 1 ? 'primary' : 'error'">
                            {{ FormData[item.prop] == 1 ? t('是') : t('否') }}
                        </Tag>
                    </div>
                </FormItem>

                </Col>

                <!-- <Col span="8" class="col">
                <FormItem prop="user" label="passwordpasswordpassword" style="width: 100%;">
                    <Input type="password" v-model="formInline.password" placeholder="Password" />
                </FormItem>
                </Col>
                <Col span="8" class="col">
                <FormItem prop="user" label="Input" style="width: 100%;">
                    <Input v-model="formInline.user" placeholder="Enter something..." />
                </FormItem>
                </Col>
                <Col span="8" class="col">
                <FormItem prop="password" label="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password" />
                </FormItem>
                </Col> -->
            </Row>
        </Form>
    </div>
</template>

<script setup lang='ts'>
import { ref, watchEffect } from 'vue';

import { useI18n } from "vue-i18n"
const { t } = useI18n()
const FormDataRef = ref<any>(null)
const props: any = defineProps({
    labelHeight: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    rules: {
        type: Object,
        default: {}
    },
    FormData: {
        type: Array,
        default: []
    },
    data: {
        type: Object,
        default: {}
    }
})

const FormData = ref<any>({})
const rules = ref<any>({})


watchEffect(() => {
    // const validatePassCheck = (_rule: any, value: any, callback: any) => {
    //     console.log(value, FormData.value.password, FormDataRef.value)
    //     if (value !== FormData.value.password) {
    //         callback(new Error(t('两次输入的密码不匹配！')));
    //     } else {
    //         callback();
    //     }
    // };

    // const passWordCheck = (_rule: any, value: any, callback: any) => {
    //     var passwordreg = /(?=.*\d)(?=.*[a-zA-Z]).{6,20}/
    //     if (!passwordreg.test(value)) {
    //         callback(new Error(t('密码必须由数字、字母组合,请输入6-20位')))
    //     } else {
    //         callback()
    //     }
    // }


    //console.log(props.data)
    let rulesData: any = {}
    // if (props.data) {
    //     FormData.value = props.data
    // } else {
    //     FormData.value = {}
    // }



    props.FormData.forEach((item: any) => {
        FormData.value[item.prop] = props.data[item.prop] ? props.data[item.prop] : item.default


        if (item.type == 'radio') {
            // console.log(FormData.value[item.prop])
            FormData.value[item.prop] = String(FormData.value[item.prop])
        }




        if (item.required) {
            let placeholder = item.type == 'input' ? '请输入' : '请选择'
            let trigger = item.type == 'input' ? 'blur' : 'change'

            // if (item.prop == 'password') {
            //     rulesData['password'] = [
            //         {
            //             required: true, message: t('请输入') + t('密码'), trigger: 'change'
            //         },
            //         {
            //             validator: passWordCheck, trigger: 'change'
            //         }
            //     ]
            // } else if (item.prop == 'checkPassword') {
            //     //验证密码一致性
            //     rulesData['checkPassword'] = [
            //         {
            //             required: true, message: t('确认密码不能为空！'), trigger: 'change'
            //         },
            //         {
            //             validator: validatePassCheck, trigger: 'change'
            //         }
            //     ]
            // } else {
            //     rulesData[item.prop] = {
            //         required: true, message: t(placeholder) + t(item.label), trigger: trigger
            //     }
            // }

            rulesData[item.prop] = {
                required: true, message: t(placeholder) + t(item.label), trigger: trigger
            }


        }
    })
    FormData.value = { ...props.data, ...FormData.value }

    rules.value = { ...rulesData, ...props.rules }


    console.log(FormData.value, props.data)

})


const reset = () => {


    props.FormData.forEach((item: any) => {
        FormData.value[item.prop] = props.data[item.prop] ? props.data[item.prop] : item.default

        if (item.type == 'upLoad') {
            FormData.value[item.prop] = ''
        }
    })
    FormDataRef.value.resetFields();

}

const validate = () => {
    return FormDataRef.value.validate((valid: any) => {
        return valid
    })
}
defineExpose({
    FormData,
    reset,
    validate
})

</script>

<style scoped lang='less'>
.TableForm {
    width: 100%;

    .formTitle {
        font-size: 16px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #1C1B1B;
        padding: 20px 0;
    }

    .col {
        width: 100%;
        height: 100%;
        display: flex;
    }
}
</style>