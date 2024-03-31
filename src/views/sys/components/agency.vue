<template>
    <div class="agency">
        <TableForm title="机构信息" :FormData="agencyData.FormData" ref="agencyDataRef" :data="agency"></TableForm>
        <div class="system">
            <Row justify="start">

                <Col :span="24" class="col">
                <div class="label" style="width: 123px; height: 96px;"> {{ t('机构介绍') }} </div>
                <div class="input" style="width:100%;height: 96px;">
                    <Input type="textarea" v-model="value" :placeholder="t('请输入机构介绍')"
                        :autosize="{ minRows: 4, maxRows: 4 }" />
                </div>
                </Col>

                <Col :span="24" class="col">
                <div class="label"> {{ t('荣誉展示') }} </div>
                <div class="input upload1">
                    <!-- <div class="up4">1</div>
                    <div class="up4">2</div>
                    <div class="up4">3</div>
                    <div class="up4">4</div> -->
                    <Upload :show-upload-list="false" :before-upload="(f: any) => handleUpload('driveUrl1', f)" action="#">
                        <img :src="fileUrl.driveUrl1" class="up4" alt="" v-if="fileUrl.driveUrl1" />
                        <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else />
                    </Upload>
                    <Upload :show-upload-list="false" :before-upload="(f: any) => handleUpload('driveUrl2', f)" action="#">
                        <img :src="fileUrl.driveUrl2" class="up4" alt="" v-if="fileUrl.driveUrl2" />
                        <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else />
                    </Upload>
                    <Upload :show-upload-list="false" :before-upload="(f: any) => handleUpload('driveUrl3', f)" action="#">
                        <img :src="fileUrl.driveUrl3" class="up4" alt="" v-if="fileUrl.driveUrl3" />
                        <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else />
                    </Upload>
                    <Upload :show-upload-list="false" :before-upload="(f: any) => handleUpload('driveUrl4', f)" action="#">
                        <img :src="fileUrl.driveUrl4" class="up4" alt="" v-if="fileUrl.driveUrl4" />
                        <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else />
                    </Upload>
                </div>
                </Col>
            </Row>
        </div>


        <TableForm :title="t('法人信息')" :FormData="legalData.FormData" ref="legalDataRef" :data="legal"></TableForm>
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
import { FileUploadImage } from "@/api/File/File"
import {OrgUpdate,OrgDetail,OrgIncomeStatistics} from "@/api/Org/Org"
import { onMounted } from "vue";
import { Message } from "view-ui-plus";
const { t } = useI18n()
const value = ref('')
const legalDataRef = ref<any>(null)
const legal = ref<any>({
    directorPhone:"",
    // nursingBedsCount: "",
    // occupancyRate:"",
    // totalBedFee:"",
    // totalBedsUsed:"",
    // totalCheckIn:"",
    // totalDeposit:"",
    // totalDietFee:"",
    // totalFee:"",
    // totalOrgBeds:"",
    // totalOtherFee:""
})
const agencyDataRef = ref<any>(null)
const agency = ref<any>({})
const fileUrl = ref<any>({
    driveUrl1: "",
    driveUrl2: "",
    driveUrl3: "",
    driveUrl4: ""
})

const handleUpload = (type: string, file: any) => {
    console.log(type, file, import.meta.env.VITE_APP_AXIOS_BASER)
    // file.value = file;

    const formData = new FormData();
    formData.append("file", file);
    FileUploadImage(formData).then((res: any) => {
        console.log(res)
        fileUrl.value[type] = import.meta.env.VITE_APP_AXIOS_BASER + res.data
        // file.value ='http://8.217.217.243:9000'+ res.data
    })

    return false;
}




const handleSubmit = ()=>{

    let jsonImg = Object.keys(fileUrl.value).map((item, idx) => {
        return {
            i: idx,
            u: fileUrl.value[item]
        }
    })
    console.log(jsonImg)

    let info = { ...legalDataRef.value.FormData, ...agencyDataRef.value.FormData }
    console.log(info)



    let data = {
        createTimeStr: info.createTime,
        address: info.address,
        name: info.name,
        region: info.region,
        operationMode: info.operationMode,
        postalCode: info.postalCode,
        telephone: info.telephone,
        directorPhone: info.directorPhone,
        introduce: value.value,
        pid: info.id,
        honorDisplayJson: JSON.stringify(jsonImg)
    }

    // console.log(agencyData)

    OrgUpdate(data).then((res: any) => {
        console.log(res)
        Message.success(t('保存成功'))
    })
}

const getData=()=>{
    // console.log(agencyData)

    OrgDetail({}).then((res: any) => {
        console.log(res)
        agency.value = res.data
        value.value = res.data.introduce

        JSON.parse(res.data.honorDisplayJson).forEach((item: any,idx:any) => {
            fileUrl.value[`driveUrl${idx+1}`] = item.u
        })
        // agencyDataRef.value.FormData = res.data
    })
    OrgIncomeStatistics({}).then((res: any) => {
        console.log(res)
        res.data.occupancyRate = (res.data.occupancyRate * 100).toFixed(2)+'%'
        legal.value ={...res.data,...legal.value}
        // agencyDataRef.value.FormData = res.data
    })

}


onMounted(() => {
    getData()
})


defineExpose({
    handleSubmit
})


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
                margin-right: 5px;
            }
        }
    }
}
</style>