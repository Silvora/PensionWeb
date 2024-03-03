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

                <Upload :show-upload-list="false" :before-upload="(f:any)=>handleUpload('bgUrl',f)" action="#">
                    <img :src="fileUrl.bgUrl" class="up1" alt="" v-if="fileUrl.bgUrl"/>
                    <img src="@/assets/images/ic_荣誉照片@2x.png" class="up1" alt="" v-else/>
                </Upload>
            </div>
            </Col>

            <Col :span="24" class="col">
            <div class="label">{{ t('驾驶舱图片') }}</div>
            <div class="input upload1">

                <Upload :show-upload-list="false" :before-upload="(f:any)=>handleUpload('driveUrl1',f)" action="#">
                    <img :src="fileUrl.driveUrl1" class="up4" alt="" v-if="fileUrl.driveUrl1"/>
                    <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else/>
                </Upload>
                <Upload :show-upload-list="false" :before-upload="(f:any)=>handleUpload('driveUrl2',f)" action="#">
                    <img :src="fileUrl.driveUrl2" class="up4" alt="" v-if="fileUrl.driveUrl2"/>
                    <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else/>
                </Upload>
                <Upload :show-upload-list="false" :before-upload="(f:any)=>handleUpload('driveUrl3',f)" action="#">
                    <img :src="fileUrl.driveUrl3" class="up4" alt="" v-if="fileUrl.driveUrl3"/>
                    <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else/>
                </Upload>
                <Upload :show-upload-list="false" :before-upload="(f:any)=>handleUpload('driveUrl4',f)" action="#">
                    <img :src="fileUrl.driveUrl4" class="up4" alt="" v-if="fileUrl.driveUrl4"/>
                    <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else/>
                </Upload>

                <!-- <div class="up4">1</div>
                <div class="up4">2</div>
                <div class="up4">3</div>
                <div class="up4">4</div> -->
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
import {FileUploadImage} from "@/api/File/File"
const local = ref("zh-CN")

const lan: any = {
    "zh": "zh-CN",
    "zh-CN":"zh-CN"
}

///statics/images/1709396330577.svg
//const file = ref<any>('http://8.217.217.243:9000/statics/images/1709396330577.svg');
const fileUrl = ref<any>({
    bgUrl:"",
    driveUrl1:"",
    driveUrl2:"",
    driveUrl3:"",
    driveUrl4:""
})
getToken('language').then((res: any) => {
   // console.log(res)
    res?local.value = lan[res]:''
    res?locale.value = lan[res]:''
})

const handleSetLocal = (lan: string) => {
    //console.log(lan)
    lan?locale.value = lan:''

}

const handleUpload = (type: string,file:any) => {
    console.log(type,file,import.meta.env.VITE_APP_AXIOS_BASER)
   // file.value = file;

    const formData = new FormData();
    formData.append("file", file.value);
    FileUploadImage(formData).then((res: any) => {
        console.log(res)
        fileUrl.value[type] = "import.meta.env.VITE_APP_AXIOS_BASER"+res.data
       // file.value ='http://8.217.217.243:9000'+ res.data
    })

    return false;
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
            justify-content: center;
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
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>