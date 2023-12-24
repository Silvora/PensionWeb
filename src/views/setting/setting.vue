<template>
    <div class="setting">
        <div class="bar">
            <span></span>
            <span class="searchBtn">
                <Space>
                    <Select v-model="model1" style="width:100px">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai" disabled>London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                    <Select v-model="model1" style="width:100px">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai" disabled>London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                    <Select v-model="model1" style="width:100px">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai" disabled>London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                    <Select v-model="model1" style="width:100px">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai" disabled>London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                    <div>
                        <Input search clearable placeholder="搜索" />
                    </div>
                </Space>
            </span>
        </div>
        <div class="box">
            <div class="focus">
                <div class="title">
                    <span>预警信息</span>
                    <span>
                    </span>
                </div>
                <div class="list">
                    <ErrItem v-for="item in Array.from({ length: 1 })" :name="item"></ErrItem>
                </div>
            </div>
            <div class="bed">
                <div class="title">
                    <span class="p">
                        <Checkbox v-model="model1">设备全选</Checkbox>
                    </span>
                    <span class="alert">
                        <!-- <Alert type="error">An error prompt</Alert>
                        <Button type="primary">全部日志</Button> -->
                    </span>
                </div>
                <div class="list">
                    <Row gutter="10">
                        <Col span="6" v-for="item in Array.from({ length: 10 })" :key="item">
                        <DeviceItem></DeviceItem>
                        </Col>
                    </Row>
                </div>
            </div>

            <div class="deviceList">
                <div class="floor">
                    <!-- <Button type="primary" class="btn" @click="handleShowModal">楼栋管理</Button> -->
                    <Card :bordered="false" padding="6" class="btnList" style="border: 1px solid #98D2E1;">
                        <div class="list">
                            <Button type="primary">设备关联</Button>
                            <Button type="primary">参数设置</Button>
                            <Button type="primary">一键布防</Button>
                            <Button type="primary">一键撤防</Button>
                            <Button type="error">批量删除</Button>
                        </div>
                    </Card>
                </div>

                <div class="chart">
                    <p>设备类型统计</p>
                    <CountChart></CountChart>
                </div>
                <div class="chart">
                    <p>设备状态</p>
                    <StateChart></StateChart>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import DeviceItem from "./components/DeviceItem.vue"
import ErrItem from "./components/ErrItem.vue";
import CountChart from "./components/CountChart.vue"
import StateChart from "./components/StateChart.vue"
import { ref } from 'vue';

const model1 = ref()

</script>

<style lang="less" scoped>
.setting {
    width: 100%;
    height: calc(100vh - 60px);
    background: #D4F2FA;

    .bar {
        width: 100%;
        height: 60px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;

        .searchBtn {
            display: flex;

            .input {
                width: 100px;
            }
        }
    }

    .box {
        width: 100%;
        height: calc(100vh - 150px);
        display: flex;
        justify-content: space-around;

        .focus {
            width: 210px;

            padding: 20px 7px 0 20px;

            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 20px;
            }

            .list {
                width: 100%;
                height: calc(100% - 52px);
                overflow: hidden;
                overflow-y: auto;
                padding: 10px;
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.3);

            }
        }

        .bed {
            width: calc(100% - 390px);
            padding: 20px 20px 0 7px;

            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 18px;

                .p {
                    width: 100px;
                }

                .alert {
                    width: 500px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .ivu-alert {
                        width: 400px;
                        margin-bottom: 0;
                    }
                }
            }

            .list {
                height: calc(100% - 52px);
                padding: 10px;
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.3);
                overflow: hidden;
                overflow-y: auto;

            }
        }

        .deviceList {

            width: 180px;
            padding: 20px 20px 0 0;
            overflow: hidden;
            overflow-y: auto;


            .floor {
                width: 160px;
                // margin: 10px 0px;
                // margin-right: 30px;
                margin-bottom: 10px;

                .btnList {
                    width: 160px;


                    .list {
                        display: flex;
                        flex-direction: column;

                        button {
                            margin: 5px 0;
                        }
                    }
                }
            }

            .chart {
                border-radius: 8px;
                // height: 281px;
                background: #FFFFFF;
                border-radius: 8px;
                border: 1px solid #98D2E1;
                margin-bottom: 10px;

                p {
                    width: 100%;
                    background: linear-gradient(270deg, rgba(19, 100, 248, 0) 0%, rgba(19, 100, 248, 0.7) 100%);
                    border-radius: 8px 0px 0px 0px;
                    opacity: 0.3;
                    font-size: 14px;
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    color: #1C1B1B;
                    padding-left: 10px;
                    line-height: 30px;
                }
            }


        }
    }

}
</style>