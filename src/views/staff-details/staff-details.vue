<template>
    <div class="details" ref="pageBox">
        <div class="toolBar">
            <div></div>
            <div class="bar">

            </div>
            <div class="btn">
                <Space>
                    <Button type="primary">绑定老人</Button>
                    <Input prefix="ios-search" clearable enter-button="搜索" placeholder="搜索" />
                </Space>
            </div>
        </div>
        <div class="box">

            <div class="left">
                <p class="title">员工信息</p>
                <Card :bordered="false" padding="20">
                    <div class="info">
                        <div class="img">
                            <img src="@/assets/images/screen.png" alt="" srcset="">
                        </div>
                        <div class="txt">
                            <p>
                                <span class="t1">员工姓名</span>
                                <span class="t2">{{ userInfo.name }}</span>
                            </p>
                            <p>
                                <span class="t1">性别</span>
                                <span class="t2">{{ userInfo.gender == 1 ? '男' : '女' }}</span>
                            </p>
                            <p>
                                <span class="t1">年龄</span>
                                <span class="t2">29</span>
                            </p>
                            <p>
                                <span class="t1">出生日期</span>
                                <span class="t2">{{ userInfo.birthday }}</span>
                            </p>
                            <p>
                                <span class="t1">身份证</span>
                                <span class="t2">{{ userInfo.idNumber }}</span>
                            </p>
                            <p>
                                <span class="t1">文化程度</span>
                                <span class="t2">{{ userInfo.educationLevel }}</span>
                            </p>
                            <p>
                                <span class="t1">入职时间</span>
                                <span class="t2">2020-10-10</span>
                            </p>
                            <p>
                                <span class="t1">职位</span>
                                <span class="t2">{{ userInfo.roleId }}</span>
                            </p>
                            <p>
                                <span class="t1">联系方式</span>
                                <span class="t2">{{ userInfo.phone }}</span>
                            </p>
                            <p>
                                <span class="t1">职业等级</span>
                                <span class="t2">{{ userInfo.jobLevel }}</span>
                            </p>
                            <p>
                                <span class="t1">所属小组</span>
                                <span class="t2">{{ userInfo.groupId }}</span>
                            </p>
                            <p>
                                <span class="t1">直属上级</span>
                                <span class="t2">{{ userInfo.superiorId }}</span>
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
            <div class="right">
                <p class="title">护理老人</p>

                <TableView ref="TableViewRef" :data="data" :tableConfig="roleTable" :tablePage="pagerConfig"
                    @handleUpdatePage="handleUpdatePage" :tableH="tableH">

                    <template #active="{ row }">
                        <vxe-button type="text" size="mini" status="primary" @click="handleRoleEdit(row)">
                            查看服务
                        </vxe-button>
                        <vxe-button type="text" size="mini" status="danger" @click="handleRoleDelete(row.id)">
                            移除老人
                        </vxe-button>
                    </template>

                </TableView>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { roleTable } from "./data"
import { ref, onMounted } from "vue";
import { StaffDetailId } from "@/api/staff/Staff"
import { useRoute } from "vue-router"
const route = useRoute()
const userInfo = ref<any>({})
const data: any = ref([
    {
        deviceName: '2121',
        deviceNo: 'dsada',
        freeObsNum: '121',
        deviceStatus: '1',
    },
    {
        deviceName: '2121',
        deviceNo: 'dsada',
        freeObsNum: '121',
        deviceStatus: '0',
    }
])
const tableH = ref("640px")
const pageBox = ref<any>(null)
const pagerConfig = ref({
    total: 100,//总数
    currentPage: 1,//当前页
    pageSize: 10 //数量
})


onMounted(() => {
    const h = pageBox.value?.clientHeight
    console.log(h)
    tableH.value = h - 210 + 'px'

    getData()
})


const handleUpdatePage = ({ currentPage, pageSize }: any) => {
    console.log(currentPage, pageSize)
    pagerConfig.value = {
        ...pagerConfig.value,
        currentPage,
        pageSize
    }
}

const getData = () => {
    StaffDetailId({ id: route.query.id }).then((res: any) => {
        console.log(res)
        userInfo.value = res.data
    })
}

</script>

<style scoped lang='less'>
.details {
    width: 100%;
    height: calc(100vh - 90px);

    .toolBar {
        height: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
        padding: 0 20px;



        .btn {
            // position: absolute;
            // right: 20px;
            display: flex;
        }
    }

    .box {
        width: 100%;
        height: calc(100vh - 150px);
        background: rgba(212, 242, 250, 1);
        display: flex;
        justify-content: space-between;

        .title {
            padding: 20px 0;
            font-size: 16px;
            font-family: AlibabaPuHuiTiR;
            color: #1C1B1B;
        }

        .left {
            width: 370px;
            margin-left: 20px;

            .info {
                display: flex;
                width: 100%;

                .img {
                    width: 130px;
                    height: 130px;

                    img {
                        width: 130px;
                        height: 130px;
                    }
                }

                .txt {
                    padding-left: 20px;

                    p {
                        display: flex;
                        font-size: 14px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 400;

                        .t1 {
                            color: #8B8A96;
                            width: 65px;
                        }

                        .t2 {
                            color: #1C1B1B;
                        }
                    }
                }
            }
        }

        .right {
            width: calc(100% - 520px);
            margin-left: 20px;
            margin-right: 110px;
        }
    }
}
</style>