<template>
    <TableForm title="" :FormData="FormData" ref="leaveInfo" :data="data"></TableForm>
    <div style="display: flex;justify-content: space-between;padding: 15px 0;">
        <Button type="default" @click="data={}" style="width: 25%;">{{ t('重置') }}</Button>

        <Button type="primary" @click="handleSubmit" style="width: 25%;"> {{ t('保存') }}</Button>
    </div>
</template>

<script setup lang='ts'>
import { ElderlyAdmissionLeave } from "@/api/Elderly/Elderly"
import { FamilyList } from "@/api/Family/Family";
import { Message } from "view-ui-plus";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router"
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const FormData = ref<any>([
    {
        type: 'sort',
        label: '出院身高(cm)',
        prop: "height",
        span: 1,
        //disabled: false,
        required: false,
        default: 0,
    },
    {
        type: 'sort',
        label: '出院体重(kg)',
        prop: "weight",
        span: 1,
        //disabled: false,
        required: false,
        default: 0,
    },
    {
        type: 'dateTime',
        label: '出院时间',
        prop: "leaveTimeStr",
        span: 1,
        //disabled: false,
        required: false,
        default: "",
    },

    {
        type: 'select',
        label: '接走人姓名',
        prop: "familyId",
        span: 3,
        //disabled: false,
        required: false,
        default: 0,
        childs: [],
    },
    // {
    //     type: 'input',
    //     label: '与老人关系',
    //     prop: "relationship",
    //     span: 1,
    //     disabled: true,
    //     required: false,
    //     default: 0,
    // },
    // {
    //     type: 'input',
    //     label: '身份证',
    //     prop: "idNumber",
    //     span: 1,
    //     disabled: true,
    //     required: false,
    //     default: 0,
    // },
    // {
    //     type: 'input',
    //     label: '联系电话',
    //     prop: "phone",
    //     span: 1,
    //     disabled: true,
    //     required: false,
    //     default: 0,
    // },
])

let data = ref({})
const route = useRoute()

const leaveInfo = ref<any>({})

const handleSubmit = () => {

    let data = {
        elderlyId: route.query.id,
        ...leaveInfo.value.FormData
    }
    console.log(data)
    let rules:any = []
    Object.keys(data).forEach(key => {
        if (data[key] == '' || data[key] == null || data[key] == undefined) {
            data[key] === 0?'':rules.push(key)
        }
    })
    if (rules.length > 0) {
        Message.warning('必填項不能為空')
        return
    }

    ElderlyAdmissionLeave(data).then(() => {
        Message.success(t('保存成功'))
    })
}


onMounted(() => {
    getData()
})

const getData = () => {
    FamilyList({ elderlyId: route.query.id }).then((res: any) => {
        console.log(res)
        // data.value = res.data
        FormData.value[3].childs = res.data.map((item: any) => {
            return {
                label: item.name,
                value: item.id,
                ...item
            }
        })
    })
}


</script>

<style scoped lang='less'></style>