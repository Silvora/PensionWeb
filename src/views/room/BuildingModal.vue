<template>
    <div class="building">
        <Modal v-model="modal" title="楼栋管理" footer-hide="true">
            <template #close>
                <Icon type="md-add-circle" color="#000" style="transform: rotateZ(45deg);" size="16" />
            </template>
            <div class="buildingBox">
                <div class="box_1">
                    <p class="title">
                        <span>楼栋</span>
                        <span>
                            <Button type="primary" size="small" class="btn" @click="handleAddHouse(0)">添加</Button>
                        </span>
                    </p>
                    <div class="info">
                        <Tooltip placement="top" theme="light" v-for="item in props.HostelList" :key="item.id"
                            :delay="1000">
                            <Tag :style="{ background: item.id == selectHostelId ? '#1364f8' : '#fff' }" checkable
                                @on-change="handleChangeName(0, item.id)">
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


                <div class="box_2" v-if="selectHostelId">
                    <p class="title">
                        <span>{{ props.HostelList.find((it: any) => it.id == selectHostelId)?.name }} 楼层</span>
                        <span>
                            <Button type="primary" size="small" class="btn" @click="handleAddHouse(1)">添加</Button>
                        </span>
                    </p>
                    <div class="info">
                        <!-- <Tag color="primary" closable>标签</Tag> -->
                        <Tooltip placement="top" theme="light" v-for="item in props.floorList" :key="item.id" :delay="1000">
                            <Tag :style="{ background: item.id == selectFloorId ? '#1364f8' : '#fff' }" checkable
                                @on-change="handleChangeName(1, item.id)">
                                <span :style="{ color: item.id == selectFloorId ? '#fff' : '#515a6e' }">
                                    {{ item.floorNumber }}</span>
                            </Tag>
                            <template #content>
                                <Button type="error" size="small" @click="handleTagClose(1, item)">删除</Button>
                            </template>
                        </Tooltip>
                    </div>
                </div>


                <div class="box_3" v-if="selectHostelId && selectFloorId">
                    <p class="title">
                        <span>{{ props.floorList.find((it: any) => it.id == selectFloorId)?.floorNumber }} 房间</span>
                        <span>
                            <Button type="primary" size="small" class="btn" @click="handleAddHouse(2)">添加</Button>
                        </span>
                    </p>
                    <div class="info">
                        <Tooltip placement="top" theme="light" v-for="item in props.houseList" :key="item.id" :delay="1000">
                            <Tag :style="{ background: item.id == selectRoomId ? '#1364f8' : '#fff' }" checkable
                                @on-change="handleChangeName(2, item.id)">
                                <span :style="{ color: item.id == selectRoomId ? '#fff' : '#515a6e' }">
                                    {{ item.roomNumber }}</span>
                            </Tag>
                            <template #content>
                                <Button type="error" size="small" @click="handleTagClose(1, item)">删除</Button>
                            </template>
                        </Tooltip>
                        <div style="margin-top: 15px;">
                            <RadioGroup v-model="space">
                                <Radio :label="idx + 1 + ''" v-for="(item, idx) in roomList" :key="item">{{ item + '人间' }}
                                </Radio>
                            </RadioGroup>
                        </div>
                    </div>
                    <Button type="primary" class="sumbit" @click="handleSetRoomBed">保存</Button>
                </div>
            </div>
        </Modal>

        <Modal v-model="addModal" :title="['楼栋', '楼层', '房间'][roomType] + (isEdit ? '编辑' : '添加')" footer-hide="true"
            :styles="{ top: '280px' }">
            <template #close>
                <Icon type="md-add-circle" color="#000" style="transform: rotateZ(45deg);" size="16" />
            </template>

            <p style="padding-bottom: 10px;">{{ ['楼栋', '楼层', '房间'][roomType] }}名称</p>
            <Input v-model="addInput" placeholder="" style="width: 100%" />
            <Button type="primary" class="addSumbit" @click="handleSumbitAdd">保存</Button>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
    HostelSave, HostelFloorSave, HostelRemoveId, HostelRoomSave, HostelRoomBedSave, HostelRoomRemoveId,
    HostelUpdate, HostelFloorUpdate, HostelRoomUpdate
} from "@/api/Hostel/Hostel"
import { Message, Poptip, Tooltip, Modal, Space } from 'view-ui-plus';
const modal = ref(false)
const addModal = ref(false)
const addInput = ref('')
const space = ref('')
const roomList = ref(['单', '双', '三', '四', '五', '六', '七', '八'])
const roomType = ref(0)

//是否编辑
const isEdit = ref(false)
const editData = ref({})


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



const emit = defineEmits(['handleUpdate'])

const showModal = () => {
    modal.value = true
}

const hideModal = () => {
    modal.value = false
}

const handleChangeName = (type: number, id: any) => {
    console.log(id)
    if (type == 0) {
        selectHostelId.value = id

    }

    if (type == 1) {
        selectFloorId.value = id

    }

    if (type == 2) {
        selectRoomId.value = id
    }

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
    }

    if (type == 3) {
        addInput.value = item.bedNumber
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

    if (type == 0) {
        //楼栋
        request = HostelRemoveId
    }

    if (type == 1) {
        //楼层
        request = HostelRemoveId
    }

    if (type == 2) {
        //房间
        request = HostelRoomRemoveId
    }

    Modal.confirm({
        title: '删除',
        content: `是否删除 【${item.name}】${type == 0 ? '楼栋' : type == 1 ? '楼层' : '房间'}?`,
        loading: true,
        onOk: () => {
            request({ id: item.id }).then(() => {
                emit('handleUpdate', true)
                Modal.remove();
                Message.success('删除成功')
            })
        }
    });
}
//编辑
const handleEdit = () => {

    if (roomType.value == 0) {
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
        })
    }

    if (roomType.value == 2) {
        //房间
        HostelRoomUpdate({ ...editData.value, roomNumber: addInput.value }).then(() => {
            Message.success('修改成功')
            addModal.value = false
            emit('handleUpdate', true)
        })
    }
}

//添加
const handleSumbitAdd = () => {

    if (isEdit) {
        handleEdit()

        return
    }

    let data = {
        name: addInput.value,
    }
    if (roomType.value == 0) {
        //楼栋
        HostelSave({ ...data, orgId: 1 }).then(() => {
            Message.success('添加成功')
            addModal.value = false
            emit('handleUpdate', true)
        }).catch(() => {
            Message.success('添加失败')
        })
    }

    if (roomType.value == 1) {
        //楼层
        HostelFloorSave({ hostelId: selectHostelId.value, floorNumber: data.name }).then(() => {
            Message.success('添加成功')
            addModal.value = false
            emit('handleUpdate', true)
        })
    }

    if (roomType.value == 2) {
        //房间
        HostelRoomSave({ roomNumber: data.name, floorId: selectFloorId.value }).then(() => {
            Message.success('添加成功')
            addModal.value = false
            emit('handleUpdate', true)
        })
    }
}
//判断添加类型
const handleAddHouse = (type: number) => {
    isEdit.value = false
    roomType.value = type
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