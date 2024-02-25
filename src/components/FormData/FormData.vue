<template>
    <Form ref="FormDataRef" label-position="top" :model="FormData" :rules="rules" v-if="FormData" :key="Date.now()">

        <FormItem v-for="item in     props.FormData    " :label="t(item.label)" :prop="item.prop">


            <div v-if="item.type == 'upLoad'">
                <UpLoad :defineImg="FormData[item.prop]" :config="props.FormData[0].config" @uploadImgName="uploadImgName">
                </UpLoad>
            </div>


            <div v-if="item.type == 'sort'">
                <InputNumber :min="0" v-model="FormData[item.prop]" style="width: 100%;touch-action:none" />
            </div>

            <div v-if="item.type == 'price'">
                <InputNumber v-model="FormData[item.prop]" :min="0"
                    :formatter="(value: any) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="(value: any) => value.replace(/\$\s?|(,*)/g, '')" style="width: 100%;" />
            </div>

            <div v-if="item.type == 'input'">
                <Input v-if="item.password" v-model="FormData[item.prop]" :placeholder="t('请输入') + t(item.label)"
                    type="password" password />
                <Input v-else v-model="FormData[item.prop]" :placeholder="t('请输入') + t(item.label)"
                    :disabled="item.disabled" />
            </div>

            <div v-if="item.type == 'textarea'">

                <Input v-model="FormData[item.prop]" type="textarea" :autosize="{ minRows: 4, maxRows: 4 }"
                    :placeholder="t('请输入') + t(item.label)" :disabled="item.disabled" />
            </div>

            <div v-if="item.type == 'select'">
                <!-- <Select v-model="FormData[item.prop]" :placeholder="t('请选择') + t(item.label)" clearable
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
                </Select> -->

                <!-- <Select v-model="FormData[item.prop]" :placeholder="t('请选择') + t(item.label)" clearable
                    :disabled="item.disabled" :multiple="item.multiple" v-else-if="item.prop == 'language'">
                    <Option v-for="      child       in       languages      " :value="child.value" :key="child.value">
                        {{
                            child.label + ` - ${child.desc} `
                        }}
                    </Option>
                </Select> -->

                <Select v-model="FormData[item.prop]" :placeholder="t('请选择') + t(item.label)" clearable
                    :disabled="item.disabled" :multiple="item.multiple">
                    <Option v-for="      child       in       item.childs      " :value="child.value" :key="child.value">{{
                        t(child.label)
                    }}</Option>
                </Select>
            </div>

            <div v-if="item.type == 'switch'">
                <Switch size="large" v-model="FormData[item.prop]" :true-value="30" :false-value="40"
                    true-color="RGBA(18, 185, 135, 1)" false-color="RGBA(237, 144, 0, 1)">
                    <template #open>
                        <span>{{ item.open.length == 1 ? '&nbsp;&nbsp;' + t(item.open) : t(item.open) }}</span>
                    </template>
                    <template #close>
                        <span>{{ item.close.length == 1 ? '&nbsp;' + t(item.close) : t(item.close) }}</span>
                    </template>
                </Switch>
            </div>

            <div v-if="item.type == 'radio'">
                <RadioGroup v-model="FormData[item.prop]">
                    <Radio :label="t(r.value)" :border="r.border" :disabled="r.disabled"
                        v-for="      r       in     item.childs    ">
                        {{ t(r.label) }}
                    </Radio>

                </RadioGroup>
            </div>

            <!-- <div v-if="item.type == 'edit'">
                <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                    :mode="mode" />
                <Editor style="height: 250px; overflow-y: hidden" v-model="FormData[item.prop]"
                    :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
            </div> -->

            <div v-if="item.type == 'tag'">
                <Tag type="border" :color="FormData[item.prop] == 1 ? 'primary' : 'error'">
                    {{ FormData[item.prop] == 1 ? t('是') : t('否') }}
                </Tag>
            </div>

            <!-- <div v-if="item.type == 'city'">
                <RegionGroup language="zh" @change="resultText">
                    <template #default="{ region, visible }">
                        <Button type="primary" size="small" ghost>
                            {{ FormData[item.prop] }}
                        </Button>
                    </template>
                </RegionGroup>
            </div> -->

            <div v-if="item.type == 'color'">
                <ColorPicker v-model="FormData[item.prop]" alpha />
            </div>



            <div v-if="item.type == 'date'">
                <DatePicker v-model="FormData[item.prop]" type="date" :placeholder="t('请选择') + t(item.label)"
                    style="width: 100%" />
            </div>


            <!-- <div v-if="item.type == 'editor'">
                <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                    :mode="mode" />
                <Editor style="height: 165px; overflow-y: hidden;border-bottom: 1px solid #ccc"
                    v-model="FormData[item.prop]" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
            </div> -->
        </FormItem>
    </Form>
</template>

<script setup lang='ts'>
import { useAppStore } from '@/stores/modules/app';
import { nextTick, ref, shallowRef, watchEffect } from 'vue';
import languages from '@/config/languages';
// import UploadImg from '@/components/UploadImg.vue'
// import { RegionSelects, RegionGroupCore, RegionGroup } from 'v-region'
//import '@wangeditor/editor/dist/css/style.css'
//import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { useI18n } from "vue-i18n"
const { t } = useI18n()
const appStore = useAppStore()

// 编辑器实例，必须用 shallowRef
// const mode = 'default'
// const editorRef = shallowRef()
// const toolbarConfig = {}
// const editorConfig = {
//     placeholder: t('请输入内容...')
//     //   scroll: false
// }


const FormDataRef = ref<any>(null)
const props: any = defineProps({
    rules: {
        type: Object,
        default: {}
    },
    lableWidth: {
        type: Number,
        default: 90
    },
    FormData: {
        type: Array,
        default: []
    },
    data: {
        type: Object,
        default: null
    }
})
console.log("--------", props.FormData)
const FormData = ref<any>({})
const rules = ref<any>({})


// const handleCreated = (editor: any) => {
//     //console.log(editor)
//     editorRef.value = editor // 记录 editor 实例，重要！
// }

//上传文件
const uploadImgName = (data: any) => {
    console.log(data)


    let key = props.FormData[0].prop

    console.log(key)
    nextTick(() => {
        FormData.value[key] = data
    })
}

//console.log(props.FormData)
// onBeforeUnmount(() => {
//     console.log("first")
//     FormDataRef.resetFields();
// })

// watchEffect(() => {
//     console.log(props.FormData)
// })



watchEffect(() => {
    const validatePassCheck = (_rule: any, value: any, callback: any) => {
        console.log(value, FormData.value.password, FormDataRef.value)
        if (value !== FormData.value.password) {
            callback(new Error(t('两次输入的密码不匹配！')));
        } else {
            callback();
        }
    };

    const passWordCheck = (_rule: any, value: any, callback: any) => {
        var passwordreg = /(?=.*\d)(?=.*[a-zA-Z]).{6,20}/
        if (!passwordreg.test(value)) {
            callback(new Error(t('密码必须由数字、字母组合,请输入6-20位')))
        } else {
            callback()
        }
    }


    //console.log(props.data)
    let rulesData: any = {}
    // if (props.data) {
    //     FormData.value = props.data
    // } else {
    //     FormData.value = {}
    // }


    props.FormData.forEach((item: any) => {

        FormData.value[item.prop] = props.data[item.prop] != undefined ? props.data[item.prop] : item.default


        if (item.type == 'radio') {
            // console.log(FormData.value[item.prop])
            FormData.value[item.prop] = String(FormData.value[item.prop])
        }


        if (item.required) {
            let placeholder = item.type == 'input' ? '请输入' : '请选择'
            let trigger = item.type == 'input' ? 'blur' : 'change'

            if (item.prop == 'password') {
                rulesData['password'] = [
                    {
                        required: true, message: t('请输入') + t('密码'), trigger: 'change'
                    },
                    {
                        validator: passWordCheck, trigger: 'change'
                    }
                ]
            } else if (item.prop == 'checkPassword') {
                //验证密码一致性
                rulesData['checkPassword'] = [
                    {
                        required: true, message: t('确认密码不能为空！'), trigger: 'change'
                    },
                    {
                        validator: validatePassCheck, trigger: 'change'
                    }
                ]
            } else {
                rulesData[item.prop] = {
                    required: true, message: t(placeholder) + t(item.label), trigger: trigger
                }
            }
        }
    })
    FormData.value = { ...props.data, ...FormData.value }

    rules.value = { ...rulesData, ...props.rules }

})
// onMounted(() => {
//     console.log(props.config)

//     props.FormData.forEach((item: any) => {
//         FormData.value[item.prop] = item.default
//     })
// })

// onBeforeUnmount(() => {
//     console.log("first")
// })


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

// console.log(props.FormData, props.config)

defineExpose({
    FormData,
    reset,
    validate
    // FormDataRef,
    // reset: () => {
    //     FormDataRef.value.resetFields();
    // }
    // formData,
    // validate: () => {
    //     let isValid = false
    //     form.value.validate((valid: any) => {
    //         // console.log(valid)
    //         // return valid
    //         isValid = valid
    //     })

    //     return isValid
    // }
})








</script>

<style scoped lang='less'></style>