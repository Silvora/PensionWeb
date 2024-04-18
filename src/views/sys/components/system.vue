<template>
    <div>
        <div class="system">
            <Row justify="start" style="width: 700px;">
                <Col :span="24" class="col">
                <div class="label">{{ t('选择语言') }}</div>
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

                    <Upload :show-upload-list="false" :before-upload="(f: any) => handleUpload('bgUrl', f)" action="#">
                        <!-- <img :src="fileUrl.bgUrl" class="up1" alt="" v-if="fileUrl.bgUrl" />
                    <img src="@/assets/images/ic_荣誉照片@2x.png" class="up1" alt="" v-else /> -->
                        <div class="imgItem">
                            <img :src="oss + fileUrl.bgUrl" class="up4" alt="" v-if="fileUrl.bgUrl" />
                            <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else />

                            <Icon class="icon" size="24" type="md-close-circle"
                                style="color: red;cursor: pointer;padding:10px ;" v-if="fileUrl.bgUrl"
                                @click.stop="fileUrl.bgUrl = ''" />
                        </div>
                    </Upload>
                </div>
                </Col>

                <Col :span="24" class="col">
                <div class="label">{{ t('驾驶舱图片') }}</div>
                <div class="input upload1">

                    <Upload :show-upload-list="false" :before-upload="(f: any) => handleUpload('driveUrl1', f)" action="#">
                        <div class="imgItem">
                            <img :src="oss + fileUrl.driveUrl1" class="up4" alt="" v-if="fileUrl.driveUrl1" />
                            <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else />

                            <Icon class="icon" size="24" type="md-close-circle"
                                style="color: red;cursor: pointer;padding:10px ;" v-if="fileUrl.driveUrl1"
                                @click.stop="fileUrl.driveUrl1 = ''" />
                        </div>
                    </Upload>
                    <Upload :show-upload-list="false" :before-upload="(f: any) => handleUpload('driveUrl2', f)" action="#">
                        <div class="imgItem">
                            <img :src="oss + fileUrl.driveUrl2" class="up4" alt="" v-if="fileUrl.driveUrl2" />
                            <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else />

                            <Icon class="icon" size="24" type="md-close-circle"
                                style="color: red;cursor: pointer;padding:10px ;" v-if="fileUrl.driveUrl2"
                                @click.stop="fileUrl.driveUrl2 = ''" />
                        </div>
                        <!-- <img :src="fileUrl.driveUrl2" class="up4" alt="" v-if="fileUrl.driveUrl2" />
                    <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else /> -->
                    </Upload>
                    <Upload :show-upload-list="false" :before-upload="(f: any) => handleUpload('driveUrl3', f)" action="#">
                        <div class="imgItem">
                            <img :src="oss + fileUrl.driveUrl3" class="up4" alt="" v-if="fileUrl.driveUrl3" />
                            <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else />

                            <Icon class="icon" size="24" type="md-close-circle"
                                style="color: red;cursor: pointer;padding:10px ;" v-if="fileUrl.driveUrl3"
                                @click.stop="fileUrl.driveUrl3 = ''" />
                        </div>
                        <!-- <img :src="fileUrl.driveUrl3" class="up4" alt="" v-if="fileUrl.driveUrl3" />
                    <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else /> -->
                    </Upload>
                    <Upload :show-upload-list="false" :before-upload="(f: any) => handleUpload('driveUrl4', f)" action="#">
                        <div class="imgItem">
                            <img :src="oss + fileUrl.driveUrl4" class="up4" alt="" v-if="fileUrl.driveUrl4" />
                            <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else />

                            <Icon class="icon" size="24" type="md-close-circle"
                                style="color: red;cursor: pointer;padding:10px ;" v-if="fileUrl.driveUrl4"
                                @click.stop="fileUrl.driveUrl4 = ''" />
                        </div>
                        <!-- <img :src="fileUrl.driveUrl4" class="up4" alt="" v-if="fileUrl.driveUrl4" />
                    <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else /> -->
                    </Upload>

                    <!-- <div class="up4">1</div>
                <div class="up4">2</div>
                <div class="up4">3</div>
                <div class="up4">4</div> -->
                </div>
                </Col>
            </Row>

        </div>
        <div class="btn">
            <Button type="primary" @click="handleExit" style="width: 25%;">{{ t('退出系统') }}</Button>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { GetBaseSetting, BaseSetting } from "@/api/Base/Base"
import { getToken, setToken } from "@/utils/token";
import { ref } from "vue";
import { useI18n } from "vue-i18n"
const { t, locale } = useI18n()
import { FileUploadImage } from "@/api/File/File"
import { onMounted } from "vue";
import { Message } from "view-ui-plus";
import { useRouter } from "vue-router"
const router = useRouter()
const local = ref("")
const oss = ref<any>(import.meta.env.VITE_APP_AXIOS_BASER)
const lan: any = {
    "zh": "zh-CN",
    "zh-CN": "zh-CN",
    "zh-HK": "zh-HK",
}

const handleExit = () => {
    setToken('ing-Token', '').then(() => {
        Message.success(t('退出成功'))
        router.push('/login')
    })

}

///statics/images/1709396330577.svg
//const file = ref<any>('http://8.217.217.243:9000/statics/images/1709396330577.svg');
const fileUrl = ref<any>({
    bgUrl: "",
    driveUrl1: "",
    driveUrl2: "",
    driveUrl3: "",
    driveUrl4: ""
})
getToken('language').then((res: any) => {
    console.log(res)
    res ? local.value = lan[res] : ''
    res ? locale.value = lan[res] : ''

    setToken('language', local.value)

    // appStore.setLanguage(lan[res])
})

const handleSetLocal = (lan: string) => {
    //console.log(lan)
    lan ? local.value = lan : ''
    lan ? locale.value = lan : ''
    setToken('language', local.value)

}

const handleUpload = (type: string, file: any) => {
    console.log(type, file, import.meta.env.VITE_APP_AXIOS_BASER)
    // file.value = file;

    const formData = new FormData();
    formData.append("file", file);
    FileUploadImage(formData).then((res: any) => {
        console.log(res)
        fileUrl.value[type] = res.data
        Message.success(t("上传成功"));

        // file.value ='http://8.217.217.243:9000'+ res.data

        // if (type == 'bgUrl') {

        //     // console.log(app.style.backgroundImage)
        // }
    })
    return false;
}

const handleSubmit = () => {
    console.log(fileUrl.value)
    let cockpitImageJson = Object.keys(fileUrl.value).map((key: any, idx: any) => {
        return {
            i: idx,
            u: fileUrl.value[key]
        }
    })
    cockpitImageJson.splice(0, 1)
    console.log(cockpitImageJson)

    BaseSetting({
        background: fileUrl.value.bgUrl,
        cockpitImageJson: JSON.stringify(cockpitImageJson),
        language: local.value,
    }).then((res: any) => {
        console.log(res)
        Message.success(t('保存成功'))

        getBg()
    })
}


const getBg = () => {
    GetBaseSetting().then((res: any) => {
        console.log(res)
        fileUrl.value.bgUrl = res.data?.background
        if (res.data?.background) {
            document.body.style.backgroundImage = `url(${oss.value + res.data.background})`;
        } else {
            document.body.style.backgroundImage = ``;
        }

        setToken('ing-Bg', fileUrl.value.bgUrl)

        if (res.data?.cockpitImageJson) {
            JSON.parse(res.data.cockpitImageJson).forEach((item: any, idx: any) => {
                fileUrl.value['driveUrl' + (idx + 1)] = item.u

            })
        }
    })
}


onMounted(() => {
    getBg()
})

defineExpose({
    handleSubmit
})

</script>

<style scoped lang='less'>
.btn {
    position: absolute;
    bottom: 50px;
    left: 0;
    // left: 50%;
    width: 100%;
    display: flex;
    justify-content: center;
}

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
            // width: 210px;
            width: 100%;
            border: 1px solid #98D2E1;

        }

        .upload1 {
            // width: 210px;
            height: 150px;
            display: flex;
            // position: relative;

            .imgItem {
                position: relative;
                top: 0;
                left: 0;
            }

            // flex-direction: row;
            // flex-wrap: wrap;
            // justify-content: center;
            .ivu-icon {
                position: absolute;
                top: 0px;
                right: 0px;
            }

            .up1 {

                width: 150px;
                height: 148px;
                text-align: center;
                line-height: 150px;

            }

            .up4 {
                width: 150px;
                height: 148px;
                text-align: center;
                line-height: 100px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }


    }
}
</style>