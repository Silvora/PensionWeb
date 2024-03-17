<template>
    <div class="form_box">
        <Modal v-model="modal" :title="t(title)" width="50" :footer-hide="true">

<template #close>
    <Icon type="md-close-circle" color="#000" size="16" />
</template>
<Form :label-width="90" ref="FormRef" :model="formData" :rules="rules" @submit.prevent >
        <FormItem label="设备编号(imei或mac)" prop="mac">
            <Input type="text" v-model="formData.mac" placeholder="请输入设备编号" >
            </Input>
        </FormItem>
        <FormItem label="设备名称" prop="name">
            <Input type="text" v-model="formData.name" placeholder="请输入设备名称"
               >
            </Input>
        </FormItem>

        <FormItem label="楼栋/楼层/房间/床位" prop="dataValue">
            <Cascader :data="list" v-model="formData.dataValue" :load-data="loadList" placeholder="楼栋/楼层/房间/床位"
                        @on-change="handleSearch" />
        </FormItem>

        <FormItem label="场所老人" prop="user">
            <Input type="text" v-model="formData.user" disabled  placeholder="请输入场所老人"
               >
            </Input>
            <!-- <Select v-model="formData.select">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select> -->
        </FormItem>


        <div v-if="formData.user">
            <FormItem label="蜂鸣器报警" prop="beeper">
            <Switch v-model="formData.fallParams.beeper" true-value="1" false-value="0">
                <template #open>
                  <span>开启</span>
                </template>
                <template #close>
                  <span>关闭</span>
                </template>
            </Switch>
        </FormItem>

            <FormItem label="灵敏度" prop="sensi">
             <Select v-model="formData.fallParams.sensi">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="延时状态" prop="stateDelay">
            <InputNumber :max="999999" :min="0" v-model="formData.fallParams.stateDelay" style="width: 100%;"/>
    
        </FormItem>
        <!-- <FormItem label="安装方式" prop="dataValue">
             <Select v-model="formData.select">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem> -->
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
            <InputNumber :max="999999" :min="0" v-model="formData.fallParams.frontDist" />
        </FormItem>
            </div>
            <div>
                <FormItem label="后侧" prop="backDist">
            <InputNumber :max="999999" :min="0" v-model="formData.fallParams.backDist"/>
        </FormItem>
            </div>

            </div>
            <div class="Dist">

            <div >
                <FormItem label="左侧" prop="leftDist">
            <InputNumber :max="999999" :min="0" v-model="formData.fallParams.leftDist" />
        </FormItem>
            </div>
            <div>
                <FormItem label="右侧" prop="rightDist">
            <InputNumber :max="999999" :min="0" v-model="formData.fallParams.rightDist" />
        </FormItem>
            </div>
            
       



       
        </div>
        </div>

       

       
       



    <div v-if="formData.user">
        <div>
            <FormItem label="离床报警" prop="leaveBedAlarm">
            <Switch v-model="formData.sleepParams.leaveBedAlarm" true-value="1" false-value="0">
                <template #open>
                  <span>开启</span>
                </template>
                <template #close>
                  <span>关闭</span>
                </template>
            </Switch>
        </FormItem>

        <FormItem label="时间" prop="beeper">
            <TimePicker v-model="formData.sleepParams.leaveBedConfig.time" format="HH:mm" type="timerange" placement="bottom-end" placeholder="Select time" style="width: 100%" />  
        </FormItem>

        <FormItem label="离床时长" prop="beeper">
            <TimePicker v-model="formData.sleepParams.leaveBedConfig.time" format="HH:mm" placeholder="Select time" style="width: 100%" />
        </FormItem>


        </div>

        <div>
            <FormItem label="心率报警" prop="beeper">
            <Switch v-model="formData.sleepParams.heartRateAlarm" true-value="1" false-value="0">
                <template #open>
                  <span>开启</span>
                </template>
                <template #close>
                  <span>关闭</span>
                </template>
            </Switch>
        </FormItem>

        <FormItem label="时间" prop="beeper">
            <TimePicker v-model="formData.sleepParams.heartRateConfig.time" format="HH:mm" type="timerange" placement="bottom-end" placeholder="Select time" style="width: 100%" />  
        </FormItem>

        <!-- <FormItem label="离床时长" prop="beeper">
            <TimePicker v-model="formData.fallParams.time" format="HH:mm" placeholder="Select time" style="width: 100%" />
        </FormItem> -->

        <FormItem label="高于" prop="max">
            <InputNumber :max="999999" :min="0" v-model="formData.sleepParams.heartRateConfig.max" style="width: 100%;"/>

        </FormItem>

        <FormItem label="低于" prop="min">
            <InputNumber :max="999999" :min="0" v-model="formData.sleepParams.heartRateConfig.min" style="width: 100%;"/>

        </FormItem>


        </div>

        <div>
            <FormItem label="呼吸报警" prop="beeper">
            <Switch v-model="formData.sleepParams.respiratoryAlarm" true-value="1" false-value="0">
                <template #open>
                  <span>开启</span>
                </template>
                <template #close>
                  <span>关闭</span>
                </template>
            </Switch>
        </FormItem>

        <FormItem label="时间" prop="beeper">
            <TimePicker v-model="formData.sleepParams.respiratoryConfig.time" format="HH:mm" type="timerange" placement="bottom-end" placeholder="Select time" style="width: 100%" />  
        </FormItem>

        <!-- <FormItem label="离床时长" prop="beeper">
            <TimePicker v-model="formData.fallParams.time" format="HH:mm" placeholder="Select time" style="width: 100%" />
        </FormItem> -->

        <FormItem label="高于" prop="beeper">
            <InputNumber :max="999999" :min="0" v-model="formData.sleepParams.respiratoryConfig.max" style="width: 100%;"/>

        </FormItem>

        <FormItem label="低于" prop="beeper">
            <InputNumber :max="999999" :min="0" v-model="formData.sleepParams.respiratoryConfig.min" style="width: 100%;"/>

        </FormItem>


        </div>
    </div>


      
        <!-- <FormItem> -->
            <Button type="primary" :loading="textLoing"  @click="handleSubmit" style="width: 100%;">{{ $t('保存') }}</Button>
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


const FormRef = ref<any>(null)
const { t } = useI18n()
const modal = ref<boolean>(false)

const textLoing = ref<boolean>(false)
const title = ref<string>('添加设备')
const rules = ref({})
const formData = ref({
    user:"",
    dataValue:"",
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
  "mac": "string",
  "name": "string",
  "roomBedNumber": "string",
  "roomId": 0,
  "sleepParams": {
    "heartRateAlarm": 0,
    "heartRateConfig": {
        time:"",
      "max": 0,
      "maxTime": "string",
      "min": 0,
      "minTime": "string"
    },
    "id": 0,
    "leaveBedAlarm": 0,
    "leaveBedConfig": {
        time:"",
      "max": 0,
      "maxTime": "string",
      "min": 0,
      "minTime": "string"
    },
    "respiratoryAlarm": 0,
    "respiratoryConfig": {
        time:"",
      "max": 0,
      "maxTime": "string",
      "min": 0,
      "minTime": "string"
    }
  },
  "type": "string"
})
const list = ref<any>([])

const handleSearch = (value: any) => {
    console.log(value)
}

// 获取房间数据
const loadList = (item: any, callback: any) => {
    console.log(item)
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
        HostelRoomBedListOfRoom({ roomId: item.value, needDeviceInfo: false,status:0 }).then((res: any) => {
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


const handleCancel = () => {
    modal.value = false
}

const handleSubmit = () => {
    textLoing.value = true
}

const Open=(data:any)=>{
    modal.value = true
}
const Close=(data:any)=>{
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

.Dist{
       width: 50%;
       display: flex;
       div{
        // width: 50%;
       }
    }
.form_box{
  
}

</style>