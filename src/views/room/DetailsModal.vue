<template>
    <div class="details">
        <Modal v-model="detailsModal" title="楼栋管理" footer-hide="true" width="650">
            <template #close>
                <Icon type="md-add-circle" color="#000" style="transform: rotateZ(45deg);" size="16" />
            </template>
            <div class="detailsBox">
                <p class="title" v-if="false">
                    <span>
                        <Space>
                            <RadioGroup v-model="type" size="small" type="button" button-style="solid"
                                @on-change="handleRadioType">
                                <Radio label="0">
                                    入住
                                </Radio>
                                <Radio label="1">
                                    预留
                                </Radio>
                            </RadioGroup>
                            <Button type="error" size="small" class="btn">移除床位</Button>
                        </Space>
                    </span>
                    <span>
                        <Button type="primary" size="small" class="btn">编辑</Button>
                    </span>
                </p>
                <p class="title" v-else>
                    <span>
                        <Space>
                            <span>床位信息</span>
                            <span>一楼 A101 01</span>
                        </Space>
                    </span>
                    <span>
                        <Button type="primary" size="small" class="btn" @click="elderModal = true">选择老人</Button>
                    </span>
                </p>
                <div class="info" v-if="true">
                    <div class="img">
                        <img src="@/assets/images/screen.png" alt="" srcset="">
                    </div>
                    <div class="user">
                        <DescriptionList title="" col="2">
                            <Description v-for="item in descriptionList" :key="item.label">
                                <template #default>
                                    <p class="descript">
                                        <span class="t1">{{ item.label }}</span>
                                        <span class="t2">{{ item.value }}</span>
                                    </p>
                                </template>
                            </Description>
                        </DescriptionList>
                    </div>
                </div>
                <div class="info" v-else style="background: rgba(241, 241, 245, 1);"></div>
                <p style="padding:20px 0 ;">智能设备列表</p>
                <div class="device">
                    <Row :gutter="10">
                        <Col span="12" v-for="item in deviceList" :key="item.label">
                        <Card :bordered="false" padding="16" style="background: rgba(19,100,248,0.05);margin-bottom: 10px;">
                            <div class="deviceBox">
                                <div style="margin-right: 16px;">
                                    <img :src="item.img" alt="">
                                </div>
                                <div>
                                    <p class="descript">
                                        <span class="t1">设备名称</span>
                                        <span class="t2"> {{ item.label }}</span>
                                    </p>
                                    <p class="descript">
                                        <span class="t1">设备数量</span>
                                        <span class="t2">{{ item.num }}</span>
                                    </p>
                                    <p class="descript">
                                        <span class="t1">告警次数</span>
                                        <span class="t2">{{ item.errorNum }}</span>
                                    </p>
                                </div>
                            </div>
                        </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </Modal>

        <Modal v-model="elderModal" title="老人选择" footer-hide="true" width="270">
            <template #close>
                <Icon type="md-add-circle" color="#000" style="transform: rotateZ(45deg);" size="16" />
            </template>

            <div class="elderBox">
                <Input prefix="ios-search" clearable enter-button="搜索" placeholder="搜索" />

                <Card :bordered="false" padding="5" style="background: rgba(19,100,248,0.05);margin: 5px 0;"
                    v-for="item in Array.from({ length: 10 })" :key="item">
                    <div class="userBox">
                        <div>
                            <img :src="sleep" alt="">
                        </div>
                        <div class="name">
                            <p>name{{ item }}</p>
                            <p>phone</p>
                        </div>
                    </div>
                </Card>

            </div>
        </Modal>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import thermometer from "@/assets/images/thermometer.png"
import bitmap from "@/assets/images/bitmap.png"
import sleep from "@/assets/images/sleep.png"
import errBtn from "@/assets/images/errBtn.png"

const detailsModal = ref(false)
const emptyModal = ref(false)
const elderModal = ref(false)

const descriptionList = ref([
    {
        label: '姓名',
        value: '姓名'
    },
    {
        label: '主要疾病',
        value: '主要疾病'
    },
    {
        label: '性别',
        value: '性别'
    },
    {
        label: '用药',
        value: '用药'
    },
    {
        label: '年龄',
        value: '年龄'
    },
    {
        label: '用餐规划',
        value: '用餐规划'
    },
    {
        label: '档案号',
        value: '档案号'
    },
    {
        label: '康复计划',
        value: '康复计划'
    },
    {
        label: '护理等级',
        value: '护理等级'
    },
    {
        label: '入住时间',
        value: '入住时间'
    },
    {
        label: '床位信息',
        value: '床位信息'
    },
    {
        label: '到期时间',
        value: '到期时间'
    },
    {
        label: '看护人',
        value: '看护人'
    },
])

const deviceList = ref([
    {
        img: sleep,
        label: '睡眠监测',
        num: 1,
        errorNum: 3,
    },
    {
        img: bitmap,
        label: '摔倒监测',
        num: 5,
        errorNum: 7,
    },
    {
        img: errBtn,
        label: '紧急按钮',
        num: 9,
        errorNum: 11,
    },
    {
        img: thermometer,
        label: '温度计',
        num: 14,
        errorNum: 12,
    }
])

const type = ref('0')
const handleRadioType = (label: string) => {
    type.value = label
}

const showModal = () => {
    detailsModal.value = true
}

const hideModal = () => {
    detailsModal.value = false
}

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
                width: 130px;
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

        .deviceBox {
            display: flex;
            align-items: center;

            img {
                width: 68px;
            }
        }
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