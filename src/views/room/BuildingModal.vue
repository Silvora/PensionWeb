<template>
    <div class="building">
        <Modal v-model="modal" title="楼栋管理" :footer-hide="true">
            <template #close>
                <Icon type="md-close-circle" color="#000" size="16" />
            </template>
            <div class="buildingBox">
                <div class="box_1">
                    <p class="title">
                        <span>楼栋</span>
                        <span>
                            <Button type="primary" size="small" class="btn" @click="handleAddHouse(0)">添加楼栋</Button>
                        </span>
                    </p>
                    <div class="info">
                        <Tooltip placement="top" theme="light" v-for="item in props.HostelList" :key="item.id">
                            <!-- <a>
                                <Tag :style="{ background: item.id == selectHostelId ? '#1364f8' : '#fff' }" checkable
                                    @on-change="handleChangeName(0, item.id)">
                                    <span :style="{ color: item.id == selectHostelId ? '#fff' : '#515a6e' }">
                                        {{ item.name }}</span>
                                </Tag>
                            </a> -->
                            <Tag :style="{ background: item.id == selectHostelId ? '#1364f8' : '#fff', cursor: 'pointer' }"
                                checkable @on-change="handleChangeName(0, item.id)" :delay="500" size="large">
                                <span :style="{ color: item.id == selectHostelId ? '#fff' : '#515a6e' }">
                                    {{ item.name }}</span>
                            </Tag>
                            <template #content>
                                <Space>
                                    <Button type="primary" size="small" @click="handleOpenEdit(0, item)">编辑</Button>
                                    <Button type="error" size="small" @click="handleTagClose(0, item)">删除</Button>
                                </Space>

                            </template>
                        </Tooltip>
                    </div>
                </div>


                <div class="box_2" v-if="selectHostelId" :key="props.HostelList.length">
                    <p class="title">
                        <span>{{ props.HostelList.find((it: any) => it.id == selectHostelId)?.name }} 楼栋</span>
                        <span>
                            <Button type="primary" size="small" class="btn" @click="handleAddHouse(1)">添加楼层</Button>
                        </span>
                    </p>
                    <div class="info">
                        <!-- <Tag color="primary" closable>标签</Tag> -->
                        <Tooltip placement="top" theme="light" v-for="item in floorList" :key="item.id" :delay="500">
                            <Tag :style="{ background: item.id == selectFloorId ? '#1364f8' : '#fff', cursor: 'pointer' }"
                                checkable @on-change="handleChangeName(1, item.id)" size="large">
                                <span :style="{ color: item.id == selectFloorId ? '#fff' : '#515a6e' }">
                                    {{ item.floorNumber }}</span>
                            </Tag>
                            <template #content>
                                <Space>
                                    <Button type="primary" size="small" @click="handleOpenEdit(1, item)">编辑</Button>
                                    <Button type="error" size="small" @click="handleTagClose(1, item)">删除</Button>
                                </Space>
                            </template>
                        </Tooltip>
                    </div>
                </div>


                <div class="box_3" v-if="selectHostelId && selectFloorId" :key="props.floorList.length">
                    <p class="title">
                        <span>{{ props.floorList.find((it: any) => it.id == selectFloorId)?.floorNumber }} 楼层</span>
                        <span>
                            <Button type="primary" size="small" class="btn" @click="handleAddHouse(2)">添加房间</Button>
                        </span>
                    </p>
                    <div class="info">
                        <Tooltip placement="top" theme="light" v-for="item in houseList" :key="item.id" :delay="500">
                            <Tag :style="{ background: item.id == selectRoomId ? '#1364f8' : '#fff', cursor: 'pointer' }"
                                checkable @on-change="handleChangeName(2, item.id)" size="large">
                                <span :style="{ color: item.id == selectRoomId ? '#fff' : '#515a6e' }">
                                    {{ item.roomNumber }} -（{{ item.count }}人间）</span>
                            </Tag>
                            <template #content>
                                <Space>
                                    <Button type="primary" size="small" @click="handleOpenEdit(2, item)">编辑</Button>
                                    <Button type="error" size="small" @click="handleTagClose(2, item)">删除</Button>
                                </Space>
                            </template>
                        </Tooltip>
                        <!-- <div style="margin-top: 15px;">
                            <RadioGroup v-model="space">
                                <Radio :label="idx + 1 + ''" v-for="(item, idx) in roomList" :key="item">{{ item + '人间' }}
                                </Radio>
                            </RadioGroup>
                        </div> -->
                    </div>
                    <!-- <Button type="primary" class="sumbit" @click="handleSetRoomBed">保存</Button> -->
                </div>


                <div class="box_3" v-if="selectHostelId && selectRoomId && selectFloorId" :key="props.floorList.length">
                    <p class="title">
                        <span>{{ props.houseList.find((it: any) => it.id == selectRoomId)?.roomNumber }} 房间</span>
                        <span>
                            <!-- <Button type="primary" size="small" class="btn" @click="handleAddHouse(3)">添加床位</Button> -->
                        </span>
                    </p>
                    <div class="info">
                        <Tooltip placement="top" theme="light" v-for="item in roomList" :key="item.id" :delay="500">
                            <Tag :style="{ background: item.id == selectRoomId ? '#1364f8' : '#fff', cursor: 'pointer' }"
                                size="large">
                                <span :style="{ color: item.id == selectRoomId ? '#fff' : '#515a6e' }">
                                    {{ item.bedNumber }} -（{{ item.cost }}¥）</span>
                            </Tag>
                            <template #content>
                                <Space>
                                    <Button type="primary" size="small" @click="handleOpenEdit(3, item)">编辑</Button>
                                    <Button type="error" size="small" @click="handleTagClose(3, item)">删除</Button>
                                </Space>
                            </template>
                        </Tooltip>
                        <!-- <div style="margin-top: 15px;">
                            <RadioGroup v-model="space">
                                <Radio :label="idx + 1 + ''" v-for="(item, idx) in roomList" :key="item">{{ item + '人间' }}
                                </Radio>
                            </RadioGroup>
                        </div> -->
                    </div>
                    <!-- <Button type="primary" class="sumbit" @click="handleSetRoomBed">保存</Button> -->
                </div>

            </div>
        </Modal>

        <Modal v-model="addModal" :title="['楼栋', '楼层', '房间', '床位'][roomType] + (isEdit ? '编辑' : '添加')" :footer-hide="true"
            :styles="{ top: '150px' }">
            <template #close>
                <Icon type="md-close-circle" color="#000" size="16" />
            </template>

            <p style="padding-bottom: 10px;">{{ ['楼栋', '楼层', '房间', '床位'][roomType] }}名称</p>
            <Input v-model="addInput" placeholder="" style="width: 100%" />

            <div v-if="roomType == 3" style="padding: 10px 0; ">
                <p>床位费用¥</p>
                <InputNumber :max="99999999" :min="0" v-model="roomCost" placeholder="床位费用" style="width: 100%;" />
            </div>



            <div style="padding: 10px;" v-if="roomType == 2 && !isEdit">
                <p style="padding-bottom: 10px;">{{ ['楼栋', '楼层', '房间', '床位'][roomType] }}名称</p>
                <RadioGroup v-model="count" @on-change="handleSetBedCount">
                    <Radio :label="idx + 1 + ''" v-for="(item, idx) in roomListType" :key="item">
                        {{ item + '人间' }}
                    </Radio>
                </RadioGroup>
            </div>



            <div style="margin-top: 10px;" v-if="roomType == 2 && !isEdit">
                <Form ref="bedFromDataRef" :model="bedFromData" :label-width="10" inline>

                    <template v-for="(it, idx) in bedFromData.list" :key="it.idx">
                        <FormItem :prop="it.idx">
                            <div style="width: 50px;">床位{{ idx + 1 }}. </div>
                        </FormItem>
                        <FormItem prop="bedNumber">

                            <Input type="text" v-model="it.bedNumber" placeholder="床位号"></Input>
                        </FormItem>
                        <FormItem prop="cost">

                            <InputNumber :max="99999999" :min="0" v-model="it.cost" placeholder="床位费用"
                                style="width: 170px;" />
                        </FormItem>
                    </template>
                </Form>
            </div>

            <Button type="primary" class="addSumbit" @click="handleSumbitAdd">保存</Button>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import {
    HostelFloorlRemoveId,
    HostelSave, HostelFloorSave, HostelRemoveId, HostelRoomSave, HostelRoomBedSave, HostelRoomRemoveId, HostelRoomBedUpdate,
    HostelUpdate, HostelFloorUpdate, HostelRoomUpdate, HostelFloorlList, HostelRoomListOfFloor, HostelRoomBedListOfRoom, HostelRoomBedRemoveId
} from "@/api/Hostel/Hostel"
import { Message, Poptip, Tooltip, Modal, Space } from 'view-ui-plus';
import { reject } from 'lodash';
import axios from 'axios';
const modal = ref(false)
const addModal = ref(false)
const addInput = ref('')
const roomCost = ref(0)
const space = ref('')
const count = ref("1")

const roomListType = ref(['单', '双', '三', '四', '五', '六', '七', '八'])
const roomType = ref(0)

// 床位信息
const bedFromDataRef = ref<any>(null)
const bedFromData = ref<any>({
    list: [{
        idx: 1 + '_' + 1,
        bedNumber: '',
        cost: 0,
        roomId: '',
        status: 0
    }]
})
const rules = ref<any>({
    bedNumber: [{ required: true, message: '请输入床位号', trigger: 'blur' }],
    cost: [{ required: true, message: '请输入床位价格', trigger: 'blur' }],
})

//是否编辑
const isEdit = ref(false)
const editData = ref({})
const floorList = ref<any>([])
const houseList = ref<any>([])
const roomList = ref<any>([])

const props = defineProps({
    HostelList: <any>{
        type: Array,
        defined: []
    },
    floorList: <any>{
        type: Array,
        defined: []
    },
    houseList: <any>{
        type: Array,
        defined: []
    },
    bedList: <any>{
        type: Array,
        defined: []
    },
})

const selectHostelId = ref("")
const selectFloorId = ref("")
const selectRoomId = ref("")
const selectBedId = ref("")


const emit = defineEmits(['handleUpdate'])

const handleSetBedCount = (count: any) => {
    let list = new Array(count * 1).fill(0).map((item: any, index: any) => {
        return {
            idx: index + '_' + count,
            bedNumber: '',
            cost: 0,
            roomId: '',
            status: 0
        }
    })

    nextTick(() => {
        bedFromData.value['list'] = list

        console.log(bedFromData.value['list'])
    })


    // console.log(list, count)
}



const showModal = () => {
    modal.value = true
}

const hideModal = () => {
    modal.value = false
}

// 获取每一项的数据
const handleChangeName = (type: number, id: any) => {
    console.log(type, "------------>", id)
    if (type == 0) {
        selectHostelId.value = id
        // 获取楼层列表
        HostelFloorlList({
            hostelId: id
        }).then((res: any) => {
            console.log(res)

            floorList.value = res.data
            selectFloorId.value = ''
            // selectRoomId.value = ''

        })
    }

    if (type == 1) {

        console.log("========")
        selectFloorId.value = id

        HostelRoomListOfFloor({
            floorId: id,
            needBed: false
        }).then((res: any) => {
            console.log(res.data)
            houseList.value = res.data
            selectRoomId.value = ''
            // houseActive.value = res.data[0].id
            // getRoomBedList()
        })
    }

    if (type == 2) {
        selectRoomId.value = id

        HostelRoomBedListOfRoom({
            roomId: id, needDeviceInfo: false
        }).then((res: any) => {
            roomList.value = res.data
        })
    }

    // if (type == 3) {
    //     selectRoomId.value = id

    //     HostelRoomBedListOfRoom({
    //         roomId: id, needDeviceInfo: false
    //     }).then((res: any) => {
    //         roomList.value = res.data
    //     })
    // }

}

//打开编辑
const handleOpenEdit = (type: number, item: any) => {
    console.log(type, item)
    editData.value = item
    roomType.value = type
    isEdit.value = true
    addModal.value = true

    if (type == 0) {
        addInput.value = item.name
    }

    if (type == 1) {
        addInput.value = item.floorNumber
    }

    if (type == 2) {
        addInput.value = item.roomNumber
        count.value = item.count + ''
    }

    if (type == 3) {
        addInput.value = item.bedNumber
        roomCost.value = item.cost * 1
    }
}

// 添加宿舍房间人数
const handleSetRoomBed = () => {

    HostelRoomBedSave({
        // bedNumber: props.houseList.find((it: any) => it.id == selectRoomId.value)?.roomNumber,
        bedNumber: space.value,
        cost: space.value,
        roomId: selectRoomId.value,
        status: 1,
    }).then(() => {
        Message.success('保存成功')
        emit('handleUpdate', true)
    })
}

//删除
const handleTagClose = (type: any, item: any) => {
    console.log(type, item)
    let request: any;
    let name = ''
    let idx = ''
    let changeType = -1
    let title = ''

    if (type == 0) {
        //楼栋
        request = HostelRemoveId
        name = item.name
        title = "楼栋"
        // changeType = 0
        // idx = item.id
    }

    if (type == 1) {
        //楼层
        request = HostelFloorlRemoveId
        name = item.floorNumber
        idx = item.hostelId
        changeType = 0
        title = "楼层"
    }

    if (type == 2) {
        //房间
        request = HostelRoomRemoveId
        name = item.roomNumber
        idx = item.floorId
        changeType = 1
        title = "房间"
    }

    //床位
    if (type == 3) {
        request = HostelRoomBedRemoveId
        name = item.bedNumber
        idx = item.roomId
        changeType = 2
        title = "床位"
    }

    Modal.confirm({
        title: '删除',
        content: `是否删除 【${name}】${title}?`,
        loading: true,
        onOk: () => {
            request({ id: item.id }).then(() => {
                emit('handleUpdate', true)
                Modal.remove();
                Message.success('删除成功')
                handleChangeName(changeType, idx)
            })
        }
    });
}
//编辑
const handleEdit = () => {

    console.log(editData.value)

    if (roomType.value == 0) {

        delete editData.value.orgId
        //楼栋
        HostelUpdate({ ...editData.value, name: addInput.value, }).then(() => {
            Message.success('修改成功')
            addModal.value = false
            emit('handleUpdate', true)
        })


    }

    if (roomType.value == 1) {
        //楼层
        HostelFloorUpdate({ ...editData.value, floorNumber: addInput.value }).then(() => {
            Message.success('修改成功')
            addModal.value = false
            emit('handleUpdate', true)
            handleChangeName(roomType.value - 1, editData.value.floorId)

        })


    }

    if (roomType.value == 2) {

        delete editData.value.bedList

        //房间
        HostelRoomUpdate({ ...editData.value, roomNumber: addInput.value }).then(() => {
            Message.success('修改成功')
            addModal.value = false
            emit('handleUpdate', true)
            handleChangeName(roomType.value - 1, editData.value.id)

        })


    }

    if (roomType.value == 3) {
        // 床位

        delete editData.value.checkIn
        HostelRoomBedUpdate(
            {
                ...editData.value,
                bedNumber: addInput.value,
                cost: roomCost.value,

            }
        ).then(() => {
            Message.success('修改成功')
            addModal.value = false
            emit('handleUpdate', true)
            handleChangeName(roomType.value - 1, editData.value.id)

        })
    }
}

//添加
const handleSumbitAdd = () => {

    if (isEdit.value) {
        handleEdit()

        return
    }

    let data = {
        name: addInput.value,
    }
    if (roomType.value == 0) {
        //楼栋
        HostelSave({ ...data }).then(() => {
            Message.success('添加成功')
            addModal.value = false
            emit('handleUpdate', true)
        }).catch(() => {
            Message.success('添加失败')
        })
    }

    if (roomType.value == 1) {
        selectHostelId.value = ''

        //楼层
        HostelFloorSave({ hostelId: selectHostelId.value, floorNumber: data.name }).then(() => {
            Message.success('添加成功')
            addModal.value = false
            emit('handleUpdate', true)
        })
        handleChangeName(roomType.value - 1, selectHostelId.value)

    }

    if (roomType.value == 2) {
        selectFloorId.value = ''

        bedFromDataRef.value.validate((valid: any) => {

            console.log(valid, bedFromData.value)
            if (!valid) {
                return
            } else {



                let roomId =
                    //房间
                    HostelRoomSave({ roomNumber: data.name, count: count.value, floorId: selectFloorId.value }).then((res: any) => {
                        Message.success('添加成功')
                        roomId = res.data
                        // addModal.value = false
                        // emit('handleUpdate', true)
                    }).then(() => {
                        console.log(roomId)


                        //添加床位

                        console.log()
                        let request: any = []
                        JSON.parse(JSON.stringify(bedFromData.value.list)).forEach((item: any) => {
                            delete item.idx
                            request.push(HostelRoomBedSave({ ...item, roomId }))
                        })

                        axios.all(request).then(axios.spread((...responses) => {
                            console.log(responses)
                            Message.success('添加成功')
                            addModal.value = false
                            emit('handleUpdate', true)
                        }))

                        handleChangeName(roomType.value - 1, selectFloorId.value)

                    })






                // HostelRoomBedSave({
                //     // bedNumber: props.houseList.find((it: any) => it.id == selectRoomId.value)?.roomNumber,
                //     bedNumber: space.value,
                //     cost: space.value,
                //     roomId: selectRoomId.value,
                //     status: 1,
                // }).then(() => {
                //     Message.success('保存成功')
                //     emit('handleUpdate', true)
                // })






            }
        })
    }


}
//判断添加类型
const handleAddHouse = (type: number) => {
    isEdit.value = false
    roomType.value = type
    addInput.value = ''
    roomCost.value = 0
    count.value = '1'
    addModal.value = true
}

defineExpose({
    showModal,
    hideModal
})

</script>

<style lang="less" scoped>
.addSumbit {
    width: 100%;
    margin: 20px 0;
}

.buildingBox {
    width: 100%;
    // height: 600px;
    max-height: 600px;
    overflow: hidden;
    overflow-y: auto;

    .sumbit {
        width: 70%;
        margin: 10px 15% 20px 15%;
    }

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 0 10px 0;

        .btn {
            width: 80px;
        }
    }

    .info {
        width: 100%;
        background: rgba(241, 241, 245, 1);
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;


        .ivu-tag .ivu-icon-ios-close {
            color: red;
        }

    }
}
</style>