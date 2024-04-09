<template>
    <div class="form_box">
        <Modal v-model="modal" :title="t(title)" width="500" :footer-hide="true">

            <template #close>
                <Icon type="md-close-circle" color="#000" size="16" />
            </template>
            <Form :label-width="100" ref="FormRef" :model="formData" :rules="rules" @submit.prevent>
                <FormItem label="设备编号(imei或mac)" prop="mac">
                    <Input type="text" v-model="formData.mac" placeholder="请输入设备编号">
                    </Input>
                </FormItem>
                <FormItem label="设备名称" prop="name">
                    <Input type="text" v-model="formData.name" placeholder="请输入设备名称">
                    </Input>
                </FormItem>

                <!-- {
                        label: '睡眠雷达',
                        value: '0'
                    },
                    {
                        label: '呼吸机',
                        value: '1'
                    },
                    {
                        label: '心电图机',
                        value: '2'
                    }, -->

                <FormItem label="设备类型" prop="type">
                    <Select v-model="formData.type" clearable style="width:100%">
                         <Option value="ed713_type">{{ t('生命感知设备1代') }}</Option>
                         <Option value="x1_type">{{ t('生命感知设备2代') }}</Option>
                         <Option value="ed719_type">{{ t('行为感知设备') }}</Option>
                         <!-- <Option value="1">呼吸机</Option>
                         <Option value="2">心电图机</Option> -->
                </Select>
                </FormItem>


                <FormItem label="楼栋/楼层/房间/床位" prop="dataValue">
                    <Cascader :data="list" v-model="formData.dataValue" :load-data="loadList" :placeholder="formData.roomBedNumber?formData.roomBedNumber:'楼栋/楼层/房间/床位'"
                        @on-change="handleSearch" />
                </FormItem>

                <!-- <FormItem label="场所老人" prop="user">
                    <Input type="text" v-model="formData.user" disabled placeholder="请输入场所老人">
                    </Input>
                </FormItem> -->


                <div v-if="formData.type == 'ed719_type'" style="background: rgba(0, 0, 0,.05);padding: 10px;border-radius: 15px;margin: 10px 0;">
                    <FormItem label="蜂鸣器报警" prop="beeper">
                        <Switch size="large" v-model="formData.fallParams.beeper" :true-value="1" :false-value="0">
                            <template #open>
                                <span>开启</span>
                            </template>
                            <template #close>
                                <span>关闭</span>
                            </template>
                        </Switch>
                    </FormItem>

                    <FormItem label="灵敏度" prop="sensi">
                        <!-- <InputNumber :max="999999" :min="0" v-model="formData.fallParams.sensi" placeholder="请输入灵敏度">
                    </InputNumber> -->

                        <Select v-model="formData.fallParams.sensi">
                            <Option value="0">灵敏档</Option>
                            <Option value="1">标准档</Option>
                            <Option value="2">鲁棒档</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="延时状态" prop="stateDelay">
                        <InputNumber :max="999999" :min="0" v-model="formData.fallParams.stateDelay" style="width: 100%;" />

                    </FormItem>

                    <FormItem label="安装高度" prop="installHeight">
                        <InputNumber :max="3" :min="2" v-model="formData.fallParams.installHeight" style="width: 100%;" />

                    </FormItem>

                    <FormItem label="安装方式" prop="installFlag">
             <Select v-model="formData.fallParams.installFlag">
                <Option value="0">顶装</Option>
                <Option value="1">侧装</Option>
            </Select>

        </FormItem>
                    <!-- <FormItem label="灵敏度" prop="dataValue">
             <Select v-model="formData.select">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem> -->
                    <div class="Dist">
                        <div>
                            <FormItem label="前侧" prop="frontDist">
                                <InputNumber :max="999999" :min="0" v-model="formData.fallParams.frontDist" style="width: 120px;"/>
                            </FormItem>
                        </div>
                        <div>
                            <FormItem label="后侧" prop="backDist">
                                <InputNumber :max="999999" :min="0" v-model="formData.fallParams.backDist" style="width: 120px;"/>
                            </FormItem>
                        </div>

                    </div>
                    <div class="Dist">

                        <div>
                            <FormItem label="左侧" prop="leftDist">
                                <InputNumber :max="999999" :min="0" v-model="formData.fallParams.leftDist" style="width: 120px;"/>
                            </FormItem>
                        </div>
                        <div>
                            <FormItem label="右侧" prop="rightDist">
                                <InputNumber :max="999999" :min="0" v-model="formData.fallParams.rightDist" style="width: 120px;"/>
                            </FormItem>
                        </div>

                    </div>
                </div>


                <div v-if="formData.type =='ed713_type' || formData.type =='x1_type'">
                    <div style="background: rgba(0, 0, 0,.05);padding: 10px;border-radius: 15px;margin: 10px 0;">
                        <FormItem label="离床报警" prop="leaveBedAlarm">
                            <Switch size="large" v-model="formData.sleepParams.leaveBedAlarm" :true-value="1" :false-value="0" 
                            >
                                <template #open>
                                    <span>开启</span>
                                </template>
                                <template #close>
                                    <span>关闭</span>
                                </template>
                            </Switch>
                        </FormItem>

                        <div class="Dist">
                           <div>
                            <FormItem label="开始时间" prop="time">
                            <!-- <TimePicker v-model="formData.sleepParams.leaveBedConfig.time" format="HH:mm" type="timerange"
                                placement="bottom-end" :placeholder="t('时间段')" style="width: 100%" 
                                @on-change="(e:any)=>handleTimeChange(e,'leaveBedConfig')"
                                /> -->

                            <TimePicker v-model="formData.sleepParams.leaveBedConfig.maxTime" format="HH:mm" style="width: 120px;"></TimePicker>
                        </FormItem>
                           </div>
                       <div>
                        <FormItem label="结束时间" prop="time">
                            <!-- <TimePicker v-model="formData.sleepParams.leaveBedConfig.time" format="HH:mm" type="timerange"
                                placement="bottom-end" :placeholder="t('时间段')" style="width: 100%" 
                                @on-change="(e:any)=>handleTimeChange(e,'leaveBedConfig')"
                                /> -->

                            <TimePicker v-model="formData.sleepParams.leaveBedConfig.minTime" format="HH:mm" style="width: 120px;"></TimePicker>
                        </FormItem>
                       </div>
                        </div>

                        <FormItem label="离床时常" prop="time">
                            <!-- <TimePicker v-model="formData.sleepParams.leaveBedConfig.time" format="HH:mm" type="timerange"
                                placement="bottom-end" :placeholder="t('时间段')" style="width: 100%" 
                                @on-change="(e:any)=>handleTimeChange(e,'leaveBedConfig')"
                                /> -->

                            <TimePicker v-model="formData.sleepParams.leaveBedConfig.sleep" format="HH:mm" style="width: 100%;"></TimePicker>
                        </FormItem>

                       

                        <!-- <FormItem label="离床时长" prop="time">
                            <TimePicker v-model="formData.sleepParams.leaveBedConfig.time" format="HH:mm"
                            :placeholder="t('离床时长')" style="width: 100%" />
                        </FormItem> -->

                        <!-- <div class="Dist">
                            <div>
                                <FormItem label="最大监测范围" prop="max">
                            <InputNumber :max="999999" :min="0" v-model="formData.sleepParams.leaveBedConfig.max"
                            style="width: 120px;" />

                        </FormItem>

                            </div>
                            <div>
                                <FormItem label="最小监测范围" prop="min">
                            <InputNumber :max="999999" :min="0" v-model="formData.sleepParams.leaveBedConfig.min"
                            style="width: 120px;"/>

                        </FormItem>
                            </div>
                        </div> -->


                       
                       


                    </div>

                    <div style="background: rgba(0, 0, 0,.05);padding: 10px;border-radius: 15px;margin: 10px 0;">
                        <FormItem label="心率报警" prop="heartRateAlarm">
                            <Switch size="large" v-model="formData.sleepParams.heartRateAlarm" :true-value="1" :false-value="0">
                                <template #open>
                                    <span>开启</span>
                                </template>
                                <template #close>
                                    <span>关闭</span>
                                </template>
                            </Switch>
                        </FormItem>


                        <!-- <div class="Dist">
                           <div>
                            <FormItem label="最大时间范围" prop="time">
                            <TimePicker v-model="formData.sleepParams.heartRateConfig.maxTime" format="HH:mm" style="width: 120px;"></TimePicker>
                        </FormItem>
                           </div>
                       <div>
                        <FormItem label="最小时间范围" prop="time">
                            <TimePicker v-model="formData.sleepParams.heartRateConfig.minTime" format="HH:mm" style="width: 120px;"></TimePicker>
                        </FormItem>
                       </div>
                        </div> -->

                        <!-- <FormItem label="时间" prop="time">
                            <TimePicker v-model="formData.sleepParams.heartRateConfig.time" format="HH:mm" type="timerange"
                                placement="bottom-end" :placeholder="t('时间段')" style="width: 100%"   @on-change="(e:any)=>handleTimeChange(e,'heartRateConfig')"/>
                        </FormItem> -->

                        <!-- <FormItem label="离床时长" prop="beeper">
            <TimePicker v-model="formData.fallParams.time" format="HH:mm" placeholder="Select time" style="width: 100%" />
        </FormItem> -->

        <div class="Dist">
            <div>
                <FormItem label="最大监测范围" prop="max">
                            <InputNumber :max="999999" :min="0" v-model="formData.sleepParams.heartRateConfig.max"
                            style="width: 120px;"/>

                        </FormItem>
            </div>
            <div>
                <FormItem label="最小时间范围" prop="min">
                            <InputNumber :max="999999" :min="0" v-model="formData.sleepParams.heartRateConfig.min"
                            style="width: 120px;"/>

                        </FormItem>

            </div>
        </div>

                       

                       

                    </div>

                    <div style="background: rgba(0, 0, 0,.05);padding: 10px;border-radius: 15px;margin: 10px 0;">
                        <FormItem label="呼吸报警" prop="respiratoryAlarm">
                            <Switch size="large" v-model="formData.sleepParams.respiratoryAlarm" :true-value="1" :false-value="0">
                                <template #open>
                                    <span>开启</span>
                                </template>
                                <template #close>
                                    <span>关闭</span>
                                </template>
                            </Switch>
                        </FormItem>


                        <!-- <div class="Dist">
                           <div>
                            <FormItem label="最大时间范围" prop="time">
                            <TimePicker v-model="formData.sleepParams.respiratoryConfig.maxTime" format="HH:mm" style="width: 120px;"></TimePicker>
                        </FormItem>
                           </div>
                       <div>
                        <FormItem label="最小时间范围" prop="time">
                            <TimePicker v-model="formData.sleepParams.respiratoryConfig.minTime" format="HH:mm" style="width: 120px;"></TimePicker>
                        </FormItem>
                       </div>
                        </div> -->

                        <!-- <FormItem label="时间" prop="time">
                            <TimePicker v-model="formData.sleepParams.respiratoryConfig.time" format="HH:mm"
                                type="timerange" placement="bottom-end" :placeholder="t('时间段')" style="width: 100%" 
                                @on-change="(e:any)=>handleTimeChange(e,'respiratoryConfig')"
                                />
                        </FormItem> -->

                        <!-- <FormItem label="离床时长" prop="beeper">
            <TimePicker v-model="formData.fallParams.time" format="HH:mm" placeholder="Select time" style="width: 100%" />
        </FormItem> -->

        <div class="Dist">
            <div>
                <FormItem label="最大监测范围" prop="max">
                            <InputNumber :max="999999" :min="0" v-model="formData.sleepParams.respiratoryConfig.max"
                            style="width: 120px;" />

                        </FormItem>
            </div>
            <div>
                <FormItem label="最小时间范围" prop="min">
                            <InputNumber :max="999999" :min="0" v-model="formData.sleepParams.respiratoryConfig.min"
                            style="width: 120px;" />

                        </FormItem>
            </div>
        </div>

                       

                       


                    </div>
                </div>

                <!-- <FormItem> -->
                <Button type="primary" :loading="textLoing" @click="handleSubmit"
                    style="width: 100%;">{{ $t('保存') }}</Button>
                <!-- </FormItem> -->
            </Form>
            <!-- <template #footer>
    <Button @click="handleCancel">{{ $t('取消') }}</Button>
    <Button type="primary" :loading="textLoing" @click="handleSumbit">{{ $t('确定') }}</Button>
</template> -->
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { HostelList, HostelFloorlList, HostelRoomListOfFloor, HostelRoomBedListOfRoom } from "@/api/Hostel/Hostel"
import {DeviceSave,DeviceUpdate} from "@/api/Device/Device"
import { Message } from 'view-ui-plus';
import { nextTick } from 'process';
const FormRef = ref<any>(null)
const { t } = useI18n()
const modal = ref<boolean>(false)

const textLoing = ref<boolean>(false)
const title = ref<string>('添加设备')
const rules = ref({})
const formData = ref<any>({
    // user: "",
    dataValue: [],
    "bedId": 0,
    "fallParams": {
        "backDist": 0,
        "beeper": 0,
        "frontDist": 0,
        "id": 0,
        "installFlag": 0,
        "installHeight": 0,
        "leftDist": 0,
        "rightDist": 0,
        "sensi": 0,
        "stateDelay": 0
    },
    "floorId": 0,
    "hostelId": 0,
    "mac": "",
    "name": "",
    "roomBedNumber": "",
    "roomId": 0,
    "sleepParams": {
        "heartRateAlarm": 0,
        "heartRateConfig": {
            time: "",
            "max": 0,
            "maxTime": "",
            "min": 0,
            "minTime": ""
        },
        "id": 0,
        "leaveBedAlarm": 0,
        "leaveBedConfig": {
            time: "",
            "max": 0,
            "maxTime": "",
            "min": 0,
            "minTime": ""
        },
        "respiratoryAlarm": 0,
        "respiratoryConfig": {
            time: "",
            "max": 0,
            "maxTime": "",
            "min": 0,
            "minTime": ""
        }
    },
    "type": ""
})
const list = ref<any>([])

const emit = defineEmits(['handleResetData'])


// const handleTimeChange = (time: any,type:string) => {
//     console.log(time,type)

//     formData.value['sleepParams'][type].minTime = time[0]
//     formData.value['sleepParams'][type].maxTime = time[1]
// }

const handleSearch = (value: any,selectedData:any) => {
    // console.log(value)
    formData.value['hostelId'] = value[0]
    formData.value['floorId'] = value[1]
    formData.value['roomId'] = value[2]
    formData.value['bedId'] = value[3]
    console.log(selectedData)
    formData.value.roomBedNumber =  selectedData[1].label+'-'+selectedData[2].label+'-'+selectedData[3].label

}

// 获取房间数据
const loadList = (item: any, callback: any) => {
    // console.log(item)
    item.loading = true

    if (item.type == 'floor') {
        HostelRoomListOfFloor({ floorId: item.value, needBed: false }).then((res: any) => {
            //console.log(res)
            item.children = res.data.map((item: any) => {
                return {
                    value: item.id,
                    label: item.roomNumber,
                    children: [],
                    loading: false,
                    type: 'room'
                }
            })
            item.loading = false;
            callback();
        })
    }

    if (item.type == 'room') {
        HostelRoomBedListOfRoom({ roomId: item.value, needDeviceInfo: false, status: 0 }).then((res: any) => {
            //console.log(res)
            item.children = res.data.map((item: any) => {
                return {
                    value: item.id,
                    label: item.bedNumber,
                    // children: [],
                    // loading: false,
                    // type: 'room'
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

// 获取楼栋
const getHome = () => {
    HostelList().then((res: any) => {
        // hostelList.value = res.data
        // floorId.value = res.data[0]?.id + ''

        list.value = res.data.map((item: any) => {
            return {
                value: item.id,
                label: item.name,
                children: [],
                loading: false,
                type: 'hostel'
            }
        })
    })

}


const handleSubmit = () => {
    // textLoing.value = true

    console.log(formData.value)

    let data = JSON.parse(JSON.stringify(formData.value))

    delete data.dataValue
        delete data.sleepParams.heartRateConfig.time
        delete data.sleepParams.leaveBedConfig.time
        delete data.sleepParams.respiratoryConfig.time
    //编辑
    if(data.id){

       

        DeviceUpdate(data).then(() => {
            Message.success(t('编辑成功'))
            modal.value = false
            emit('handleResetData')
        })
    }else{
    //添加
    DeviceSave(data).then((res: any) => {
        if (res.code == 0) {
            Message.success(t('添加成功'))
            modal.value = false
            emit('handleResetData')
        }
    })

    }
}

const Open = (data: any) => {
    if (data) {
        // formData.value.dataValue= []
        Object.keys(data).forEach((key: any) => {
            formData.value[key] = data[key]?data[key]:formData.value[key]
        })

        formData.value.dataValue = [
             
// {value: data.hostelId, label: data.hostelId, loading: false, type: 'hostel'},
// {value: data.floorId, label: data.floorId, loading: false, type: 'floor'},
// {value: data.roomId, label: data.roomId, loading: false, type: 'room'} ,
// {value: data.bedId, label: data.bedId},
            // data.hostelId,
            // data.floorId,
            // data.roomId,
           // data.bedId
        ]

        console.log(formData.value.dataValue)
        // formData.value = data
        title.value = '编辑设备'
    }else{

        console.log(data)
        formData.value = {
    // user: "",
    dataValue: [],
    "bedId": 0,
    "fallParams": {
        "backDist": 0,
        "beeper": 0,
        "frontDist": 0,
        "id": 0,
        "installFlag": 0,
        "installHeight": 0,
        "leftDist": 0,
        "rightDist": 0,
        "sensi": 0,
        "stateDelay": 0
    },
    "floorId": 0,
    "hostelId": 0,
    "mac": "",
    "name": "",
    "roomBedNumber": "",
    "roomId": 0,
    "sleepParams": {
        "heartRateAlarm": 0,
        "heartRateConfig": {
            time: "",
            "max": 0,
            "maxTime": "",
            "min": 0,
            "minTime": ""
        },
        "id": 0,
        "leaveBedAlarm": 0,
        "leaveBedConfig": {
            time: "",
            "max": 0,
            "maxTime": "",
            "min": 0,
            "minTime": ""
        },
        "respiratoryAlarm": 0,
        "respiratoryConfig": {
            time: "",
            "max": 0,
            "maxTime": "",
            "min": 0,
            "minTime": ""
        }
    },
    "type": ""
}
        title.value = '添加设备'
    }

    nextTick(() => {
        modal.value = true
    })
}
const Close = () => {
    modal.value = false
}



onMounted(() => {
    getHome()
})

defineExpose({
    Open,
    Close
})

</script>

<style lang="less" scoped>
.Dist {
    width: 50%;
    display: flex;

    div {
        // width: 50%;
    }
}

.form_box {}
</style>