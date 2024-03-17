<template>
    <div class="agency">
        <TableForm title="机构信息" :FormData="agencyData.FormData"></TableForm>
        <div class="system">
            <Row justify="start">

                <Col :span="24" class="col">
                <div class="label" style="width: 123px; height: 96px;"> 机构介绍 </div>
                <div class="input" style="width:100%;height: 96px;">
                    <Input type="textarea" v-model="value" :placeholder="t('请输入机构介绍')" :autosize="{ minRows: 4, maxRows: 4 }"/>
                </div>
                </Col>

                <Col :span="24" class="col">
                <div class="label"> 荣誉展示 </div>
                <div class="input upload1">
                    <!-- <div class="up4">1</div>
                    <div class="up4">2</div>
                    <div class="up4">3</div>
                    <div class="up4">4</div> -->
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
                </div>
                </Col>
            </Row>
        </div>


        <TableForm title="法人信息" :FormData="legalData.FormData"></TableForm>
        <!-- <TableForm title="建设信息" :FormData="constructData.FormData" :labelHeight="constructData.labelHeight">
        </TableForm>
        <TableForm title="服务信息" :FormData="serveData.FormData" :labelHeight="serveData.labelHeight"></TableForm>
       
        -->
        <br>

    </div>
</template>

<script setup lang='ts'>
import { ref } from "vue";
import { agencyData, legalData, constructData, serveData } from "../data"
import { useI18n } from "vue-i18n"
import {FileUploadImage} from "@/api/File/File"
const { t } = useI18n()
const value = ref('')
const fileUrl = ref<any>({
    bgUrl:"",
    driveUrl1:"",
    driveUrl2:"",
    driveUrl3:"",
    driveUrl4:""
})

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
.agency {
    width: 70%;
    margin: 0 auto;

    .system {
        // display: flex;
        // justify-content: center;
        // padding: 20px 0;
        margin: 0 auto;

        .col {
            display: flex;

            .label {
                width: 123px;
                background: #F1F1F5;
                border: 1px solid #98D2E1;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .input {
                width: 100%;
                // width: 210px;
                border: 1px solid #98D2E1;
            }

            .upload1 {
                // width: 217px;
                // height: 200px;
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
}
</style>