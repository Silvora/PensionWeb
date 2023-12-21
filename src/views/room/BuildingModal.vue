<template>
    <div class="building">
        <Modal v-model="modal" title="楼栋管理" footer-hide="true">
            <template #close>
                <Icon type="md-add-circle" color="#000" style="transform: rotateZ(45deg);" size="16" />
            </template>
            <div class="buildingBox">
                <p class="title">
                    <span>楼栋</span>
                    <span>
                        <Button type="primary" size="small" class="btn" @click="handleAddHouse('楼栋')">添加</Button>
                    </span>
                </p>
                <div class="info">
                    <Button type="primary" size="small" class="btn">添加</Button>
                </div>
                <p class="title">
                    <span>A栋 楼层</span>
                    <span>
                        <Button type="primary" size="small" class="btn" @click="handleAddHouse('楼层')">添加</Button>
                    </span>
                </p>
                <div class="info">
                    <Tag color="primary" closable>标签</Tag>
                </div>
                <p class="title">
                    <span>一层 房间</span>
                    <span>
                        <Button type="primary" size="small" class="btn" @click="handleAddHouse('房间')">添加</Button>
                    </span>
                </p>
                <div class="info">
                    <Tag color="primary" closable checkable>标签</Tag>
                    <Tag color="primary" closable checkable>标签</Tag>
                    <Tag color="primary" closable checkable>标签</Tag>
                    <div style="margin-top: 15px;">
                        <RadioGroup v-model="space">
                            <Radio :label="idx + 1 + ''" v-for="(item, idx) in roomList" :key="item">{{ item + '人间' }}
                            </Radio>
                        </RadioGroup>
                    </div>
                </div>
                <Button type="primary" class="sumbit">保存</Button>
            </div>
        </Modal>

        <Modal v-model="addModal" :title="roomType + '添加'" footer-hide="true" :styles="{ top: '280px' }">
            <template #close>
                <Icon type="md-add-circle" color="#000" style="transform: rotateZ(45deg);" size="16" />
            </template>
            <p style="padding-bottom: 10px;">{{ roomType }}名称</p>
            <Input v-model="addInput" placeholder="" style="width: 100%" />
            <Button type="primary" class="addSumbit">保存</Button>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const modal = ref(false)
const addModal = ref(false)
const addInput = ref('')
const space = ref('6')
const roomList = ref(['单', '双', '三', '四', '五', '六', '七', '八'])
const roomType = ref('')
const showModal = () => {
    modal.value = true
}

const hideModal = () => {
    modal.value = false
}

const handleAddHouse = (type: string) => {
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

    }
}
</style>