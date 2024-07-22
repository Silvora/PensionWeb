<template>
    <div class="details">
        <Modal v-model="detailsModal" :title="t('床位信息')" :footer-hide="true" :width="650" :mask-closable="false">
            <template #close>
                <Icon type="md-close-circle" color="#000" size="16" />
            </template>
            <div class="detailsBox">
                <p class="title" v-if="props.info?.checkIn">

                    <span>
                        <Space>
                            <RadioGroup v-model="type" size="small" type="button" button-style="solid"
                                @on-change="handleRadioType">
                                <Radio label="2" :disabled="props.info?.status == 2 ? false : true">
                                    {{ t('入住') }}
                                </Radio>
                                <Radio label="1" :disabled="props.info?.status == 1 ? false : true">
                                    {{ t('预留') }}
                                </Radio>
                            </RadioGroup>
                            <Button type="primary" size="small" class="btn" @click="handleCheckUpdate({ ...props.info, status: 2 })" v-if="props.info?.status==1">{{ t('入住') }}</Button>

                            <Button type="error" size="small" class="btn" @click="handleOnCheck">{{ t('移除床位') }}</Button>
                        </Space>
                    </span>
                    <!-- <span>
                        <Button type="primary" size="small" class="btn">编辑</Button>
                    </span> -->


                </p>
                <p class="title" v-else>

                    <span>
                        <Space>
                            <span>{{ t('床位信息') }}</span>
                            <!-- <span>一楼 A101 01</span> -->
                            <span>{{ props?.info?.bedNumber }}</span>
                        </Space>
                    </span>
                    <span>
                        <Button type="primary" size="small" class="btn"
                            @click="handleOpenElderModal">{{ t('选择老人') }}</Button>
                    </span>


                </p>
                <div class="info" v-if="props.info?.checkIn">
                    <div class="img">
                        <img v-if="props.info?.checkIn?.elderlyPhoto" :src="oss + props.info?.checkIn?.elderlyPhoto" alt=""
                            srcset="">
                        <img v-else src="@/assets/images/screen.png" alt="" srcset="">
                    </div>
                    <div class="user">
                        <DescriptionList title="" :col="2">
                            <Description v-for="item in descriptionList" :key="item.label">
                                <template #default>
                                    <p class="descript">
                                        <span class="t1">{{ t(item.label) }}</span>
                                        <span class="t2">{{ item.value }}</span>
                                    </p>
                                </template>
                            </Description>
                        </DescriptionList>
                    </div>
                </div>
                <div class="info noBox" v-else>{{ t('暂无老人') }}</div>
                <p style="padding:20px 0 ;">{{ t('智能设备列表') }}</p>
                <div class="device" v-if="props.info?.checkIn?.deviceList.length > 0">
                    <Row :gutter="10">
                        <Col span="12" v-for="item in deviceList" :key="item.label">
                        <Card :bordered="false" :padding="16"
                            style="background: rgba(19,100,248,0.05);margin-bottom: 10px;" 
                            v-if="typeList.includes(item.type)">
                            <div class="deviceBox">
                                <div style="margin-right: 16px;">
                                    <img :src="item.img" alt="">
                                </div>
                                <div>
                                    <p class="descript">
                                        <span class="t1">{{ t('设备名称') }}</span>
                                        <span class="t2"> {{ item.label }}</span>
                                    </p>
                                    <p class="descript">
                                        <span class="t1">{{ t('设备数量') }}</span>
                                        <span class="t2">{{ item.num }}</span>
                                    </p>
                                    <!-- <p class="descript">
                                        <span class="t1">{{ t('告警次数') }}</span>
                                        <span class="t2">{{ item.errorNum }}</span>
                                    </p> -->
                                </div>
                            </div>
                        </Card>
                        </Col>
                    </Row>
                </div>
                <div class="device noBox" v-else>{{ t('暂无设备') }}</div>
            </div>
        </Modal>

        <Modal v-model="elderModal" :title="t('老人选择')" :footer-hide="true" :width="300" :mask-closable="false">
            <template #close>
                <Icon type="md-close-circle" color="#000" size="16" />
            </template>

            <div class="elderBox">
                <Input v-model.trim="searchFocusData.name"  search clearable @on-search="handleSearchFocus" >
                    <template #prepend>
              <Select v-model="searchFocusData.focus" style="width: 80px" @on-change="handleSearchFocus">
                  <Option value="-1">{{ t('全部') }}</Option>
                  <Option value="1">{{ t('未关注') }}</Option>
                  <Option value="0">{{ t('已关注') }}</Option>
              </Select>
            </template>
                </Input>
                <div style="width: 100%; height: 450px; overflow: hidden; overflow-y: auto;">
                    <Card :bordered="false" :padding="5" style="background: rgba(19,100,248,0.05);margin: 5px 0;"
                    v-for="item in detailList" :key="item.id">
                    <div class="userBox">
                        <div>
                            <img :src="oss + item.photo" alt="" v-if="item.photo">
                            <img v-else src="@/assets/images/screen.png" alt="" srcset="">
                        </div>
                        <div class="name">
                            <p>{{ item.name }}</p>
                            <p>ID:{{ item.fileNo }}</p>
                        </div>
                        <div class="">
                            <Button type="text" size="small" style="color:#2d8cf0" class="btn"
                                @click="handleCheckUser({ ...item, status: 2 })">{{ t('入住') }}</Button>
                            <Button type="text" size="small" style="color:rgba(237, 144, 0, 1);" class="btn"
                                @click="handleCheckUser({ ...item, status: 1 })">{{ t('预留') }}</Button>
                            <!-- <p>{{ item.name }}</p>
                                <p>ID:{{ item.fileNo }}</p> -->
                        </div>
                    </div>
                </Card>
                </div>

              

            </div>
        </Modal>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, watchEffect } from 'vue';
import thermometer from "@/assets/images/thermometer.png"
import bitmap from "@/assets/images/bitmap.png"
import sleep from "@/assets/images/sleep.png"
import sleep2 from "@/assets/images/setting_sleep2.png"
import errBtn from "@/assets/images/errBtn.png"
import { ElderlyListNotCheckIn } from '@/api/Elderly/Elderly'
import { CheckSave, CheckRemoveId, CheckUpdate } from "@/api/Check/Check"
import { Message, Modal, Space } from 'view-ui-plus';
import { useI18n } from "vue-i18n";
const { t } = useI18n()
import dayjs from "dayjs"
const emit = defineEmits(['handleUpdate'])

const oss = ref<any>(import.meta.env.VITE_APP_AXIOS_BASER)


const detailsModal = ref(false)
const elderModal = ref(false)
const detailList = ref<any>([])
const keyword = ref('')
const props = defineProps({
    info: {
        type: Object,
        defined: {}
    }
})
const descriptionList = ref<any>([])
const type = ref('0')

const jobLevelList:any = ref(["三级", "二级", "一级", "特一级", "特二级", "特三级", "专需护理"])

const searchFocusData:any = ref({
    list:[],
    // current: 1,
    // size: 9999,
    focus: '',
    name:'',

})

const handleSearchFocus = () =>{
    console.log("first",searchFocusData.value)

    let list:any = []
    if(searchFocusData.value.focus == -1 || searchFocusData.value.focus == ''){
        list = searchFocusData.value.list.filter((item:any)=>
            item.name.toLowerCase().includes(searchFocusData.value.name.toLowerCase())
        )
    }
    if(searchFocusData.value.focus == 0){
        list = searchFocusData.value.list.filter((item:any)=>
            item.name.toLowerCase().includes(searchFocusData.value.name.toLowerCase()) && item.focus == 0
        )
    }
    if(searchFocusData.value.focus == 1){
        list = searchFocusData.value.list.filter((item:any)=>
            item.name.toLowerCase().includes(searchFocusData.value.name.toLowerCase()) && item.focus == 1
        )
    }

    detailList.value = list

}


const typeList = ref<any>([])

watchEffect(() => {
    type.value = props.info?.status + ''
    descriptionList.value = [
        {
            label: '姓名',
            value: props.info?.checkIn?.elderlyName
        },
        // {
        //     label: '主要疾病',
        //     value: '',
        // },
        {
            label: '性别',
            value: props.info?.checkIn?.elderlyGender == 1 ? '男' : '女'
        },
        // {
        //     label: '用药',
        //     value: ''
        // },
        {
            label: '年龄',
            value: dayjs(dayjs().format("YYYY-MM-DD") ).diff(props.info?.checkIn?.birthDate ,'year')
        },
        // {
        //     label: '用餐规划',
        //     value: ''
        // },
        {
            label: '档案号',
            value: props.info?.checkIn?.elderlyFileNo
        },
        // {
        //     label: '康复计划',
        //     value: ''
        // },
        {
            label: '护理等级',
            value: props.info?.checkIn?.nursingGrade!= ''?jobLevelList.value[props.info?.checkIn?.nursingGrade]:''
        },
        {
            label: '入住时间',
            value: props.info?.checkIn?.startTime
        },
        // {
        //     label: '床位信息',
        //     value: ''
        // },
        // {
        //     label: '到期时间',
        //     value: '到期时间'
        // },
        {
            label: '看护人',
            value: props.info?.checkIn?.staffName
        },
    ]
    props.info?.checkIn?.deviceList?.forEach((item: any) => {
        typeList.value.push(item?.type)
    })
})


// console.log(props.info)


const deviceList = ref([
    {
        img: sleep2,
        label: '睡眠监测',
        num: 1,
        errorNum: 0,
        type:'x1_type'
    },
    {
        img: bitmap,
        label: '摔倒监测',
        num: 1,
        errorNum: 0,
        type:'ed719_type'
    },
    {
        img: errBtn,
        label: '紧急按钮',
        num: 1,
        errorNum: 0,
        type:'dadedd719_type'
    },
    {
        img: thermometer,
        label: '温度计',
        num: 1,
        errorNum: 0,
         type:'edasdd719_type'
    }
])


const handleCheckUpdate = (info:any) =>{

    let data = info.checkIn
    CheckUpdate({
    "bedId": data.bedId,
  "elderlyId": data.elderlyId,
  "id": data.id,
  "status": 2
}).then(()=>{
    Message.success(t('入住成功'))
    emit('handleUpdate', true)
    detailsModal.value = false

})
}


const handleOnCheck = () => {
    console.log(props.info)
    let log = props.info?.status == '1' ? '是否移除預留人' : '是否移除入住人'

    Modal.confirm({
        title: t('提示'),
        content: `${t(log)}【${props.info?.checkIn?.elderlyName}】?`,
        loading: true,
        onOk: () => {
            CheckRemoveId({
                bedId: props?.info?.id
            }).then(() => {
                Modal.remove();
                Message.success(t('移除成功'))
                detailsModal.value = false

                emit('handleUpdate', true)
            })
        }
    });


}

const handleCheckUser = (item: any) => {
    console.log(item, props.info)
    let DAY = dayjs()

    let data = {
        bedId: props.info.id,
        elderlyId: item.id,
        // endTimeStr: DAY.add(1, 'year').format("YYYY-MM-DD HH:mm:ss"),
        floorId: props.info.floorId,
        hostelId: props.info.hostelId,
        notes: "",
        roomBedNumber: `${props.info.floorId}-${props.info.roomId}-${props.info.id}`,
        roomId: props.info.roomId,
        startTimeStr: DAY.format("YYYY-MM-DD HH:mm:ss"),
        status: item.status,
    }

    console.log(data)

    let txt = item.status == 1 ? t('预留成功') : t('入住成功')


    CheckSave(data).then(() => {
        Message.success(txt)
        elderModal.value = false
        detailsModal.value = false
        emit('handleUpdate', true)
    })
}

const handleOpenElderModal = () => {
      searchFocusData.value.name = ''
    searchFocusData.value.focus = '-1'
    elderModal.value = true
    getData()
}


const handleRadioType = (label: string) => {
    type.value = label

    console.log(type.value)
}

const showModal = () => {
    detailsModal.value = true
}

const hideModal = () => {
    detailsModal.value = false
}

const getData = () => {
    ElderlyListNotCheckIn({
        current: 1,
        // keyword: keyword.value,
        size: 9999
    }).then((res: any) => {
        console.log(res)
        detailList.value = res.data.records
        searchFocusData.value.list = res.data.records
    })
}

// onMounted(() => {
//     getData()
// })

defineExpose({
    showModal,
    hideModal
})

</script>

<style scoped lang='less'>
.detailsBox {
    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 0 20px 0;

        .btn {
            width: 80px;
        }
    }

    .descript {
        display: flex;
        align-items: center;

        .t1 {
            width: 70px;
            color: #8B8A96;

        }

        .t2 {
            color: #1C1B1B;
        }
    }



    .info {
        width: 100%;
        // background: rgba(241, 241, 245, 1);
        // padding: 10px 0;
        border-radius: 8px;
        // margin-bottom: 20px;
        display: flex;
        min-height: 130px;

        .img {
            width: 130px;

            img {
                display: inline-block;
                width: 130px;
                height: 130px;
            }
        }

        .user {
            padding: 0 10px 0;
            font-size: 14px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;


        }

    }

    .device {
        width: 100%;
        height: 231px;
        border-radius: 8px;

        .deviceBox {
            display: flex;
            align-items: center;

            img {
                width: 68px;
            }
        }
    }

    .noBox {
        width: 100%;
        background: rgb(241, 241, 245);
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.elderBox {
    width: 100%;
    height: 490px;
    overflow: hidden;
    overflow-y: auto;

    .userBox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        cursor: pointer;

        img {
            width: 30px;
            margin-right: 10px;
        }

        .name {
            font-size: 14px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            color: #1C1B1B;
            line-height: 20px;
        }
    }
}
</style>