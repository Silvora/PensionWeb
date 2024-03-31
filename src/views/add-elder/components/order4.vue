<template>
    <div>
        <div class="care">
            <TableForm :title="t('护理设置')" :FormData="careInfoForm" ref="care_data"></TableForm>
            <!-- <p class="carePub">
            <span>其他费用</span>
            <Button type="primary">添加费用</Button>
        </p>

        <TableForm title="" :FormData="FormData" ref="data_1"></TableForm>
        <Button type="primary" @click="handleElderAdd">保存</Button> -->
        </div>

        <div class="food">
            <!-- <TableForm title="餐饮信息" :FormData="foodInfoForm" ref="food_data"></TableForm> -->
            <TableForm title="床位信息" :FormData="bedInfo.FormData" ref="bed_data"></TableForm>
            <Row justify="start" style="width: 100%;">
                <Col :span="24" class="col">
                <div class="label">{{ t('房间选择') }}</div>
                <div class="input upload1">
                    <Cascader :data="RoomData" v-model="ROOM" :load-data="loadRoomData" style="width: 100%;"
                        :placeholder="t('楼栋/楼层/房间/床位')" />
                </div>
                </Col>
            </Row>
        </div>

        <div class="contract">
            <TableForm :title="t('合同设置')" :FormData="contractInfo.FormData" ref="contract_data"></TableForm>
            <!-- <Row justify="start" style="width: 100%;">
                <Col :span="24" class="col">
                <div class="label">{{ t('附件') }}</div>
                <div class="input upload1">

                    <Upload :show-upload-list="false" :before-upload="(f: any) => handleUpload('driveUrl1', f)" action="#">
                        <div style="position: relative;">
                            <img :src="fileUrl.driveUrl1" class="up1" alt="" v-if="fileUrl.driveUrl1" />
                            <img src="@/assets/images/ic_荣誉照片@2x.png" class="up1" alt="" v-else />
                            <Icon type="md-close-circle" size="24" style="position: absolute;top:10px;right:10px;color:red"
                                @click="handleDeleteImg('driveUrl1')" v-if="fileUrl.driveUrl1" />
                        </div>

                    </Upload>
                    <Upload :show-upload-list="false" :before-upload="(f: any) => handleUpload('driveUrl2', f)" action="#">
                        <div style="position: relative;">
                            <img :src="fileUrl.driveUrl2" class="up1" alt="" v-if="fileUrl.driveUrl2" />
                            <img src="@/assets/images/ic_荣誉照片@2x.png" class="up1" alt="" v-else />
                            <Icon type="md-close-circle" size="24" style="position: absolute;top:10px;right:10px;color:red"
                                @click="handleDeleteImg('driveUrl2')" v-if="fileUrl.driveUrl2" />
                        </div>

                    </Upload>
                    <Upload :show-upload-list="false" :before-upload="(f: any) => handleUpload('driveUrl3', f)" action="#">
                        <div style="position: relative;">
                            <img :src="fileUrl.driveUrl3" class="up1" alt="" v-if="fileUrl.driveUrl3" />
                            <img src="@/assets/images/ic_荣誉照片@2x.png" class="up1" alt="" v-else />
                            <Icon type="md-close-circle" size="24" style="position: absolute;top:10px;right:10px;color:red"
                                @click="handleDeleteImg('driveUrl3')" v-if="fileUrl.driveUrl3" />
                        </div>
                    </Upload>
                    <Upload :show-upload-list="false" :before-upload="(f: any) => handleUpload('driveUrl4', f)" action="#">
                        <div style="position: relative;">
                            <img :src="fileUrl.driveUrl4" class="up1" alt="" v-if="fileUrl.driveUrl4" />
                            <img src="@/assets/images/ic_荣誉照片@2x.png" class="up1" alt="" v-else />
                            <Icon type="md-close-circle" size="24" style="position: absolute;top:10px;right:10px;color:red"
                                @click="handleDeleteImg('driveUrl4')" v-if="fileUrl.driveUrl4" />
                        </div>
                    </Upload>
                </div>
                </Col>

            </Row> -->
        </div>

        <p class="carePub">
            <!-- <span>其他费用</span> -->
            <!-- <Button type="primary">添加费用</Button> -->
        </p>

        <!-- <TableForm title="" :FormData="FormDataList" ref="other_data"></TableForm> -->


        <div style="display: flex;justify-content: space-between;padding: 15px 0;">
            <Button type="default" @click="" style="width: 25%;">{{ t('重置') }}</Button>

            <Button type="primary" @click="handleSubmit" style="width: 25%;">{{ t('保存') }}</Button>
        </div>
    </div>
</template>

<script setup lang='ts'>
import {
    careInfo, foodInfo,
    bedInfo, contractInfo
} from "../data"
import { Message } from "view-ui-plus";
import { ref, onMounted } from "vue";
import { ElderlyHealthSave, ElderlyAdmissionElderlyId } from "@/api/Elderly/Elderly"
import { HostelList, HostelFloorlList, HostelRoomListOfFloor, HostelRoomBedListOfRoom } from "@/api/Hostel/Hostel"
import { ChargeList } from "@/api/Charge/Charge"
import { useI18n } from "vue-i18n";
import { FileUploadImage } from "@/api/File/File"
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const fileUrl = ref<any>({
    driveUrl1: "",
    driveUrl2: "",
    driveUrl3: "",
    driveUrl4: ""
})
const { t } = useI18n()
const care_data = ref<any>() //护理
const food_data = ref<any>() // 餐饮
const bed_data = ref<any>() // 床位
const contract_data = ref<any>() // 合同
const other_data = ref<any>() // 其他
const careInfoForm = ref<any>([])
const foodInfoForm = ref<any>([])

const RoomData = ref<any>([])
const ROOM = ref<any>([])

const FormDataList = [

    {
        type: 'select',
        label: '付费类型',
        prop: "type",
        span: 1,
        //disabled: false,
        required: false,
        default: "",
        childs: [
            {
                label: '默认',
                value: '0'
            },
            {
                label: '床位费',
                value: '1'
            },
            {
                label: '餐饮费',
                value: '2'
            },
            {
                label: '护理项目费',
                value: '3'
            },
            {
                label: '其他',
                value: '7'
            }
        ]
    },
    {
        type: 'select',
        label: '周期',
        prop: "unit",
        span: 1,
        //disabled: false,
        required: false,
        default: "",
        childs: [
            {
                label: '无单位',
                value: '0'
            },
            {
                label: '日',
                value: '1'
            },
            {
                label: '周',
                value: '2'
            },
            {
                label: '月',
                value: '3'
            },
            {
                label: '年',
                value: '4'
            }
        ]
    },
    {
        type: 'select',
        label: '付款状态',
        prop: "price",
        span: 1,
        //disabled: false,
        required: false,
        default: "",
        childs: [
            {
                label: '未付款',
                value: '0'
            },
            {
                label: '已取消',
                value: '1'
            },
            {
                label: '已付款',
                value: '2'
            }
        ]
    },
    {
        type: 'input',
        label: '费用',
        prop: "price",
        span: 1,
        //disabled: false,
        required: false,
        default: "",
    },
    {
        type: 'input',
        label: '备注',
        prop: "notes",
        span: 2,
        //disabled: false,
        required: false,
        default: "",
    },


]
// const data = ref<any>()

const loadRoomData = (item: any, callback: any) => {
    //  console.log(item)
    item.loading = true

    if (item.type == 'room') {
        HostelRoomBedListOfRoom({ roomId: item.value, needDeviceInfo: false, status: 0 }).then((res: any) => {
            //console.log(res)
            item.children = res.data.map((item: any) => {
                return {
                    value: item.id,
                    label: item.bedNumber,
                    // children: [],
                    // loading: false
                }
            })
            item.loading = false;
            callback();
        })
    }


    if (item.type == 'floor') {
        HostelRoomListOfFloor({ floorId: item.value, needBed: false, status: 0 }).then((res: any) => {
            //console.log(res)
            item.children = res.data.map((item: any) => {
                return {
                    value: item.id,
                    label: item.roomNumber,
                    children: [],
                    loading: false,
                    type: 'room'
                    //children: [],
                    //loading: false
                }
            })
            item.loading = false;
            callback();
        })
    }


    if (item.type == 'hostel') {
        HostelFloorlList({ hostelId: item.value }).then((res: any) => {
            //console.log(res)
            item.children = res.data?.map((item: any) => {
                return {
                    value: item.id,
                    label: item.floorNumber,
                    children: [],
                    loading: false,
                    type: 'floor'
                }
            })
            item.loading = false;
            callback();
        })
    }
}



onMounted(() => {
    let careInfoData = careInfo.FormData
    let foodInfoData = foodInfo.FormData
    ChargeList({}).then(res => {
        console.log(res);
        let list = res.data.map((item: any) => {
            return {
                value: item.id,
                label: item.name + " ( ¥" + item.price + ")",
                ...item
            }
        })

        // 护理
        // careInfoData[0].childs = list.filter((item: any) => item.type == 3)
        //餐饮
        // foodInfoData[0].childs = list.filter((item: any) => item.type == 2)

        careInfoForm.value = careInfoData
        foodInfoForm.value = foodInfoData

    })

    HostelList().then((res: any) => {
        // hostelList.value = res.data
        // floorId.value = res.data[0]?.id+''

        RoomData.value = res.data.map((item: any) => {
            return {
                value: item.id,
                label: item.name,
                children: [],
                loading: false,
                type: 'hostel'
            }
        })
    })

    if (route.query.id) {
        console.log("获取数据")
        ElderlyAdmissionElderlyId({ elderlyId: route.query.id }).then((res: any) => {
            console.log(res);
        })
    }

})

const handleSubmit = () => {

    // let json = Object.keys(fileUrl.value).map((item, idx) => {
    //     return {
    //         i: idx,
    //         u: fileUrl.value[item]
    //     }
    // })


    // console.log(other_data.value.FormData)


    // return
    //console.log(data.value.FormData)


    let nursing = {
        // nursingCustomizedCosts: care_data.value.FormData.nursingCustomizedCosts,
        nursingNotes: care_data.value.FormData.nursingNotes,
        nursingDeviceType: care_data.value.FormData.nursingDeviceType,
        roomCosts: care_data.value.FormData.roomCosts,
        serviceFee: care_data.value.FormData.serviceFee,
    }

    // let a2 = {
    //     dietId: food_data.value.FormData.dietId,
    //     dietNotes: food_data.value.FormData.dietNotes,
    // }

    let checkIn = {
        elderlyId: route.query.id,
        startTimeStr: bed_data.value.FormData.startTimeStr,
        // endTimeStr: bed_data.value.FormData.endTimeStr,
        // notes: bed_data.value.FormData.notes,
        hostelId: ROOM.value[0],
        floorId: ROOM.value[1],
        roomId: ROOM.value[2],
        bedId: ROOM.value[3],
        roomBedNumber: `${ROOM.value[1]}-${ROOM.value[2]}-${ROOM.value[3]}`,
    }


    let contract = {
        // address: contract_data.value.FormData.address,
        // admissionDeposit: contract_data.value.FormData.admissionDeposit,
        // // contractJson: JSON.stringify(json),
        // medicalBond: contract_data.value.FormData.medicalBond,
        contractDateStr: contract_data.value.FormData.contractDateStr,
    }

    // let costList = [{
    //     ...other_data.value.FormData,
    //     elderlyId: route.query.id
    // }]


    // console.log(data, ROOM.value, a1, a2, checkIn, a3)



    let data = {
        ...nursing,
        checkIn,
        ...contract,
    }

    // console.log(care_data.value.FormData)
    // console.log(food_data.value.FormData)
    // console.log(bed_data.value.FormData)
    // console.log(contract_data.value.FormData)



    ElderlyHealthSave(data).then(res => {
        //console.log(res);

        Message.success(t('添加成功'))

        router.replace({
            path: "/add-elder",
            query: { type: 4, id: route.query.id }
        })
    })
}

const handleDeleteImg = (type: string) => {
    fileUrl.value[type] = ''
}

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

</script>

<style scoped lang='less'>
.carePub {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
}

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
        color: #000
    }

    .input {
        // width: 210px;
        width: 100%;
        min-height: 32px;
        border: 1px solid #98D2E1;

    }

    .upload1 {
        width: 100%;
        // height: 200px;
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
        line-height: 200px;
    }

    .up4 {
        width: 104px;
        height: 100px;
        text-align: center;
        line-height: 100px;

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>