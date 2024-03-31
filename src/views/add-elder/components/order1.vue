<template>
    <div class="contract">
        <Row justify="start" style="width: 100%;">
            <Col :span="24" class="col">
            <div class="label">{{ t('老人图片') }}</div>
            <div class="input upload1">

                <Upload :show-upload-list="false" :before-upload="(f: any) => handleUpload('photo', f)" action="#">
                    <div style="position: relative;">
                        <img :src="photo" class="up1" alt="" v-if="photo" />
                        <img src="@/assets/images/ic_荣誉照片@2x.png" class="up1" alt="" v-else />
                        <Icon type="md-close-circle" size="24" style="position: absolute;top:10px;right:10px;color:red"
                            @click="handleDeleteImg()" v-if="photo" />
                    </div>

                </Upload>

            </div>
            </Col>

        </Row>
    </div>
    <TableForm title="" :FormData="baseInfo.FormData" :data="data" ref="TableFormRef"></TableForm>


    <!-- <TableForm title="紧联系人" :FormData="urgentInforms.FormData" :data="data" ref="TableFormRef"></TableForm> -->

    <div style="display: flex;justify-content: space-between;padding: 15px 0;">
        <Button type="default" @click="data = {}" style="width: 25%;">{{ t('重置') }}</Button>

        <Button type="primary" @click="handleElderAdd" style="width: 25%;">{{ t('保存') }}</Button>
    </div>
</template>

<script setup lang='ts'>
import { baseInfo, urgentInforms } from "../data"
import { ElderlySave, ElderlyDetail, ElderlyUpdate } from '@/api/Elderly/Elderly';
import { Message } from "view-ui-plus";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from "vue-i18n"
import { FileUploadImage } from "@/api/File/File"
const route = useRoute()
const router = useRouter()
const TableFormRef = ref<any>()
const data = ref<any>({})
const photo = ref<any>('')

const { t } = useI18n()
const handleElderAdd = () => {
    console.log(TableFormRef.value.FormData)
    let data = JSON.parse(JSON.stringify({ ...TableFormRef.value.FormData, photo: photo.value, }))


    if (route.query.id) {

        data['birthday'] = data['birthDate']

        delete data['birthDate']

        delete data.orgId
        delete data.fileNo
        // delete data.birthDate
        delete data.contractDate
        delete data.status
        ElderlyUpdate(data).then(_ => {
            Message.success(t('修改成功'))
        })

        return
    }

    // data['birthday'] = data['birthDate']

    // delete data['birthDate']

    // let data = {
    //     ...TableFormRef.value.FormData,
    //     contractDateStr: TableFormRef.value.FormData.contractDate,
    //     birthday: TableFormRef.value.FormData.birthDate,
    // }

    // let data = JSON.parse(JSON.stringify({ ...TableFormRef.value.FormData, photo: photo.value }))
    // delete data.orgId

    ElderlySave(data).then(res => {
        console.log(res);

        Message.success(t('添加成功'))

        router.replace({
            path: "/add-elder",
            query: { type: 1, id: res.data.id }
        })

    })
}

onMounted(() => {
    if (route.query.id) {
        console.log("获取数据")

        ElderlyDetail({ elderlyId: route.query.id }).then((res: any) => {
            console.log(res)
            data.value = { ...res.data, birthday: res.data.birthDate }
        })
    }
})

const handleDeleteImg = () => {
    photo.value = ''
}

const handleUpload = (type: string, file: any) => {
    console.log(type, file, import.meta.env.VITE_APP_AXIOS_BASER)
    // file.value = file;

    const formData = new FormData();
    formData.append("file", file);
    FileUploadImage(formData).then((res: any) => {
        console.log(res)
        photo.value = import.meta.env.VITE_APP_AXIOS_BASER + res.data
        // file.value ='http://8.217.217.243:9000'+ res.data
    })

    return false;
}

</script>

<style scoped lang='less'>
.col {
    display: flex;

    .label {
        width: 124px;
        background: #F1F1F5;
        border: 1px solid #98D2E1;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .input {
        // width: 210px;
        width: 100%;
        min-height: 32px;
        border: 1px solid #98D2E1;

    }

    .upload1 {
        width: 100%;
        height: 200px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        // justify-content: space-between;
        // justify-content: center;
    }

    .up1 {
        width: 214px;
        height: 200px;
        text-align: center;
        line-height: 204px;
    }

    .up4 {
        width: 104px;
        height: 100px;
        text-align: center;
        line-height: 100px;


    }
}
</style>