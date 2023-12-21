<template>
    <div class="screen" id="screen">
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
                    <span>重点关注老人</span>
                    <span>
                        <Button type="primary">添加人员</Button>
                    </span>
                </div>
                <div class="list">
                    <UserItem v-for="item in Array.from({ length: 10 })" :name="item"></UserItem>
                </div>
            </div>
            <div class="bed">
                <div class="title">
                    <span class="p">床位管理</span>
                    <span class="alert">
                        <Alert type="error">An error prompt</Alert>
                        <Button type="primary">全部日志</Button>
                    </span>
                </div>
                <div class="list">

                    <Row gutter="10">
                        <Col span="6" v-for="item in Array.from({ length: 20 })" :key="item">
                        <UserItem></UserItem>
                        </Col>
                    </Row>


                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import UserItem from "./components/UserItem"
import { ref } from 'vue';

const model1 = ref()

</script>

<style lang="less" scoped>
.screen {
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
            width: 21%;
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
            width: 79%;
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
    }

}
</style>