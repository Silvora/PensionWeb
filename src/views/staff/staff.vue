<template>
    <div class="saff" ref="pageBox">
        <div class="bar">
            <span class="Back" @click="() => $router.go(-1)">
                <Icon type="md-navigate" style="transform: rotateZ(-90deg);" />{{ t('返回上一页') }}
            </span>
            <span class="searchBtn">
                <Space>

                    <Select v-model="searchData.roleId" style="width:100px" :placeholder="t('角色')" clearable
                        @on-change="handleSearchChange">
                        <Option :value="item.id" v-for="item in roleList" :key="item.id">{{ item.name }}</Option>
                    </Select>

                    <!-- <Select v-model="model1" style="width:100px" placeholder="床位">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai" disabled>London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                    <Select v-model="model1" style="width:100px" placeholder="楼层">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai" disabled>London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                    <Select v-model="model1" style="width:100px" placeholder="房间">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai" disabled>London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                    <Select v-model="model1" style="width:100px" placeholder="等级">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai" disabled>London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                    <div>
                        <Input search clearable placeholder="搜索" />
                    </div> -->
                </Space>
            </span>
        </div>


        <div class="infoBox">
            <div class="left">
                <p class="title">{{ t('排班情况') }}</p>
                <VCalendar :attributes="attrs" trim-weeks>
                    <template #footer>
                        <Button type="primary" style="width: 100%;" @click="modal = true">{{ t('当日排班') }}</Button>
                    </template>
                </VCalendar>
                <!-- <div class="chart">
                    <p class="title">排班情况</p>
                    <div style="width:100%"> -->
                <!-- <Calendar :backgroundText="true" class-name="select-mode" :language="'cn'"
                    :weeks="['日', '一', '二', '三', '四', '五', '六']" :select-date="'2023-12-26'" style="transform: scale(1);" />
                -->

                <!-- </div>
                </div> -->
                <div class="chart" style="margin-top: 10px;">
                    <p class="title">{{ t('工种分类') }}</p>
                    <LevelChart></LevelChart>
                </div>
                <div class="chart">
                    <p class="title">{{ t('性别占比') }}</p>
                    <SexChart></SexChart>
                </div>
                <!-- <div class="chart" style="margin-bottom: 0px;">
                    <p class="title">空床比例</p>
                    <EmptyChart></EmptyChart>
                </div> -->
            </div>
            <div class="center">
                <TableView ref="TableViewRef" :data="data" :tableConfig="roleTable" :tablePage="pagerConfig"
                    @handleUpdatePage="handleUpdatePage" :tableH="tableH">

                    <template #gender="{ row }">
                        <Tag :color="row.gender == 1 ? 'blue' : row.gender == 2 ? 'magenta' : 'warning'">
                            {{ row.gender == 1 ? t('男') : row.gender == 2 ? t('女') : t('未知') }}
                        </Tag>
                    </template>

                    <template #active="{ row }">
                        <vxe-button type="text" size="mini" status="primary" @click="handleGetUserInfo(row)">
                            {{ t('查看') }}
                        </vxe-button>
                        <vxe-button type="text" size="mini" status="primary" @click="modal = true">
                            {{ t('排班') }}
                        </vxe-button>
                        <vxe-button type="text" size="mini" status="primary" @click="handleRoleEdit(row)">
                            {{ t('编辑') }}
                        </vxe-button>
                        <vxe-button type="text" size="mini" status="danger" @click="handleRoleDelete(row.id)">
                            {{ t('删除') }}
                        </vxe-button>
                    </template>

                </TableView>
            </div>
            <div class="right">
                <div class="floor">
                    <!-- <Button type="primary" class="btn" @click="handleShowModal">楼栋管理</Button> -->
                    <Card :bordered="false" :padding="6" class="btnList" style="border: 1px solid #98D2E1;">
                        <div class="list">
                            <Button type="primary" @click="handleRoleAdd">{{ t('新增') }}</Button>
                            <!-- <Button type="primary">导入</Button> -->
                            <Button type="primary" @click="handleExport">{{ t('导出') }}</Button>
                            <Button type="error" @click="handleDeleteAll">{{ t('批量删除') }}</Button>
                        </div>
                    </Card>
                </div>
                <div class="chart" style="margin-bottom: 10px;">
                    <p class="title">{{ t('当班信息') }}</p>
                    <div class="info">
                        {{ notes.value1 }}
                    </div>
                </div>

                <div class="chart" style="margin-bottom: 0px;">
                    <p class="title">{{ t('交接班信息') }}</p>
                    <div class="info">
                        {{ notes.value2 }}
                    </div>
                </div>
            </div>
        </div>

        <Modal v-model="modal" :title="t('排班情况')" :footer-hide="true" :width="1220" :mask-closable="false">
            <template #close>
                <Icon type="md-close-circle" color="#000" size="16" />
            </template>
            <Scheduling v-if="modal" @handleUpdate="getMemo"></Scheduling>
        </Modal>


        <Modal v-model="addModal" :title="t(info.id ? '编辑员工' : '添加员工')" :footer-hide="true" :width="802" :mask-closable="false">
            <template #close>
                <Icon type="md-close-circle" color="#000" size="16" />
            </template>
            <div class="up_box">
                <Row justify="start">
                    <Col :span="8" class="col">
                    <div class="label"> {{ t('员工头像') }} </div>
                    <div class="input upload1">
                        <!-- <div class="up4">1</div> -->
                        <Upload :show-upload-list="false" :before-upload="(f: any) => handleUpload('proto', f)" action="#">
                            <div class="imgItem">

                                <img :src="oss + fileUrl.proto" class="up4" alt="" v-if="fileUrl.proto" />
                                <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else />
                                <Icon class="icon" size="24" type="md-close-circle"
                                    style="color: red;cursor: pointer;padding:10px ;" v-if="fileUrl.proto"
                                    @click.stop="fileUrl.proto = ''" />
                            </div>
                        </Upload>
                        <!-- <div class="up4">2</div>
                        <div class="up4">3</div> -->
                        <!-- <div class="up4">4</div> -->
                    </div>
                    </Col>
                </Row>
            </div>
            <TableForm title="" :FormData="roleDataList.FormData" ref="TableFormRef" :data="info"></TableForm>
            <p class="user_info">{{ t('添加培训认证') }}</p>
            <div class="up_box">
                <Row justify="start">
                    <Col :span="24" class="col">
                    <div class="label"> {{ t('证书') }} </div>
                    <div class="input upload1">
                        <!-- <div class="up4">1</div>
                        <div class="up4">2</div>
                        <div class="up4">3</div> -->
                        <!-- <div class="up4">4</div> -->
                        <Upload :show-upload-list="false" :before-upload="(f: any) => handleUpload('certUrl1', f)"
                            action="#">
                            <div class="imgItem">
                                <img :src="oss + fileUrl.certUrl1" class="up4" alt="" v-if="fileUrl.certUrl1" />
                                <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else />
                                <Icon class="icon" size="24" type="md-close-circle"
                                    style="color: red;cursor: pointer;padding:10px ;" v-if="fileUrl.certUrl1"
                                    @click.stop="fileUrl.certUrl1 = ''" />
                            </div>
                        </Upload>
                        <Upload :show-upload-list="false" :before-upload="(f: any) => handleUpload('certUrl2', f)"
                            action="#">
                            <div class="imgItem">
                                <img :src="oss + fileUrl.certUrl2" class="up4" alt="" v-if="fileUrl.certUrl2" />
                                <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else />
                                <Icon class="icon" size="24" type="md-close-circle"
                                    style="color: red;cursor: pointer;padding:10px ;" v-if="fileUrl.certUrl2"
                                    @click.stop="fileUrl.certUrl2 = ''" />
                            </div>
                        </Upload>
                        <Upload :show-upload-list="false" :before-upload="(f: any) => handleUpload('certUrl3', f)"
                            action="#">
                            <div class="imgItem">
                                <img :src="oss + fileUrl.certUrl3" class="up4" alt="" v-if="fileUrl.certUrl3" />
                                <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else />
                                <Icon class="icon" size="24" type="md-close-circle"
                                    style="color: red;cursor: pointer;padding:10px ;" v-if="fileUrl.certUrl3"
                                    @click.stop="fileUrl.certUrl3 = ''" />
                            </div>
                        </Upload>
                        <!-- <Upload :show-upload-list="false" :before-upload="(f:any)=>handleUpload('driveUrl4',f)" action="#">
                    <img :src="fileUrl.driveUrl4" class="up4" alt="" v-if="fileUrl.driveUrl4"/>
                    <img src="@/assets/images/ic_荣誉照片@2x.png" class="up4" alt="" v-else/>
                </Upload> -->
                    </div>
                    </Col>
                </Row>
            </div>

            <Button class="save_btn" type="primary" @click="handleRoleSumbit">{{ t('保存') }}</Button>

        </Modal>

    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"
import { roleTable, roleData } from "./data"
import { Message, Modal } from "view-ui-plus";
import LevelChart from "./components/LevelChart.vue";
import SexChart from "./components/SexChart.vue";
import Scheduling from "./components/Scheduling.vue"
import { FileUploadImage } from "@/api/File/File"
import { StaffList, StaffRemoveId, StaffRemoveBatch, StaffSave, StaffDetailId, StaffUpdate } from "@/api/Staff/Staff"
import { MemoList, MemoSave } from "@/api/Memo/Memo";
import { RoleList } from "@/api/RoleInfo/RoleInfo"
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
const { t } = useI18n();
const searchData = ref<any>({
    roleId: ""
})
const oss = ref<any>(import.meta.env.VITE_APP_AXIOS_BASER)

const roleDataList = ref<any>({})
const roleList = ref<any>([])
const modal = ref(false)
const addModal = ref(false)
const info = ref<any>({})
const TableViewRef = ref<any>(null)
const TableFormRef = ref<any>(null)
const pageBox = ref<any>(null)
const router = useRouter()

const attrs = ref([
    {
        key: 'today',
        highlight: true,
        dates: new Date(),
    },
]);
const fileUrl = ref<any>({
    proto: "",
    certUrl1: "",
    certUrl2: "",
    certUrl3: "",
    certUrl4: ""
})
const tableH = ref("765px")
const data: any = ref()

const pagerConfig = ref({
    total: 100,//总数
    currentPage: 1,//当前页
    pageSize: 10 //数量
})

const handleExport = () => {
    TableViewRef.value.exportAllDataEvent()
}

const handleSearchChange = () => {
    pagerConfig.value.currentPage = 1
    getData()
}

const handleUpload = (type: string, file: any) => {
    console.log(type, file, import.meta.env.VITE_APP_AXIOS_BASER)
    // file.value = file;

    const formData = new FormData();
    formData.append("file", file);
    FileUploadImage(formData).then((res: any) => {
        //  console.log(res)
        fileUrl.value[type] = res.data
        Message.success(t("上传成功"));

        // file.value ='http://8.217.217.243:9000'+ res.data
    })

    return false;
}





const handleGetUserInfo = (row: any) => {
    router.push({
        path: '/staff-details',
        query: {
            id: row.id
        }
    })
}





//添加
const handleRoleAdd = () => {
    info.value = {}
    //TableAddRef.value.openModal()
    fileUrl.value = {
        proto: "",
        certUrl1: "",
        certUrl2: "",
        certUrl3: "",
        certUrl4: ""
    }




    addModal.value = true
}

const handleRoleSumbit = () => {




    let data = {

        ...TableFormRef.value.FormData,
        sentryTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        photo: fileUrl.value.proto,
        certificateJson: JSON.stringify([
            { i: 0, u: fileUrl.value.certUrl1 },
            { i: 0, u: fileUrl.value.certUrl2 },
            { i: 0, u: fileUrl.value.certUrl3 }
        ]),
        superiorId: 1,
        groupId: 1,

    }

    console.log(data)
    let rules:any = []
    Object.keys(data).forEach(key => {
        if(key != 'certificateJson' && key != 'photo' && key != 'groupName' && key != 'superiorName') {
            if (data[key] == '' || data[key] == null || data[key] == undefined) {
                data[key] === 0?'':rules.push(key)
        }
        }
    })
    console.log(rules)
    if (rules.length > 0) {
        Message.warning('必填項不能為空')
        return
    }




    if (data.id) {
        handleRoleEditSubmit(data)
        return
    }


    StaffSave(data).then(() => {
        Message.success(t('添加成功'))
        getData()
        addModal.value = false
    })

    console.log(TableFormRef.value.FormData)
}

//编辑
const handleRoleEdit = (item: any) => {
    //TableViewRef.value.handleOpenEditModal()
    StaffDetailId({ id: item.id }).then((res: any) => {
        console.log(item)
        fileUrl.value.proto = res.data.photo

        let imgList = JSON.parse(res.data.certificateJson)

        fileUrl.value.certUrl1 = imgList[0].u
        fileUrl.value.certUrl2 = imgList[1].u
        fileUrl.value.certUrl3 = imgList[2].u

        info.value = { ...res.data, birthday: res.data.birthDate }
        addModal.value = true
    })



}

const handleRoleEditSubmit = (data: any) => {
    console.log(data)

    delete data.orgId
    delete data.superiorName
    delete data.groupName
    delete data.birthDate
    delete data.entryTime
    StaffUpdate(data).then(() => {
        Message.success(t('修改成功'))
        getData()
        addModal.value = false
    })
}

// 删除单个
const handleRoleDelete = (id: string) => {
    Modal.confirm({
        title: t('提示'),
        content: t('确定要删除吗？'),
        okText: t('确认'),
        cancelText: t('取消'),
        loading: true,
        onOk: () => {
            StaffRemoveId({ id: id }).then(() => {
                Message.success(t('删除成功'))
                Modal.remove();
                getData()
            })
        },
        onCancel: () => {
            console.log('Cancel');
        }
    });
}

// 删除多个
const handleDeleteAll = () => {
    console.log(TableViewRef.value.getSelectRecords())
    let ids: any = []
    TableViewRef.value.getSelectRecords().forEach((item: any) => {
        ids.push(item.id)
    })
    if (ids.length == 0) return

    Modal.confirm({
        title: t('提示'),
        content: t('确定要删除吗？'),
        okText: t('确认'),
        cancelText: t('取消'),
        loading: true,
        onOk: () => {

            StaffRemoveBatch({ ids: ids }).then(() => {
                Message.success(t('删除成功'))
                Modal.remove();
                getData()
            })

        },
        onCancel: () => {
            console.log('Cancel');
        }
    });

    // console.log(ids)
    // StaffRemoveBatch({ ids: [] }).then(() => {

    // })
}




const handleUpdatePage = ({ currentPage, pageSize }: any) => {
    console.log(currentPage, pageSize)
    pagerConfig.value = {
        ...pagerConfig.value,
        currentPage,
        pageSize
    }
    getData()
}

// 数据列表
const getData = () => {
    let parmse = {
        current: pagerConfig.value.currentPage,
        size: pagerConfig.value.pageSize,
        ...searchData.value
    }
    StaffList(parmse).then((res: any) => {
        console.log(res)
        pagerConfig.value.total = res.data.total
        data.value = res.data.records


        roleDataList.value.FormData.forEach((item: any) => {
            if (item.prop == 'groupId' || item.prop == 'superiorId') {

                // console.log("======", item.prop)

                item.childs =
                    res.data.records.map((it: any) => {
                        return {
                            label: it.name,
                            value: it.id
                        }
                    })
            }
        })

        // console.log("======", roleDataList.value)

    })

}



const notes = ref({
    value1: '',
    value2: ''
})
const getMemo = () => {
    MemoList({ type: 1 }).then((res) => {
        console.log(res)
        let len = res.data.length
        notes.value.value1 = res.data[len - 1].content
    })
    MemoList({ type: 2 }).then((res) => {
        let len = res.data.length
        notes.value.value2 = res.data[len - 1].content
    })
}

const getRoleList = () => {
    RoleList({
        current: 1,
        size: 9999
    }).then((res: any) => {
        console.log(res)
        roleList.value = res.data.records
        roleDataList.value.FormData.forEach((item: any) => {
            if (item.prop == 'roleId') {
                item.childs =
                    res.data.records.map((it: any) => {
                        return {
                            label: it.name,
                            value: it.id
                        }
                    })
            }
        })

        // console.log("======", roleDataList.value)
    })
}



onMounted(() => {

    roleDataList.value = roleData
    // console.log("", pageBox.value?.clientHeight)//680
    const h = pageBox.value?.clientHeight

    tableH.value = h - 165 + 'px'
    getData()
    getRoleList()

    getMemo()

    // modal.value = true

})


</script>

<style scoped lang='less'>
.user_info {
    font-size: 16px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #1C1B1B;
    padding: 20px 0;
}

.save_btn {
    width: 80%;
    margin-top: 30px;
    margin-bottom: 10px;
    margin-left: 10%;
}

.up_box {
    // display: flex;
    // justify-content: center;
    // padding: 20px 0;
    margin: 0 auto;

    .col {
        display: flex;

        .label {
            width: 110px;
            background: #F1F1F5;
            border: 1px solid #98D2E1;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .input {
            // width: 810px;
            width: calc(100% - 110px);
            border: 1px solid #98D2E1;
            // background: red;
        }

        .upload1 {
            // width: 210px;

            height: 140px;
            display: flex;

            // background: red;
            // flex-direction: row;
            // flex-wrap: wrap;
            .imgItem {
                position: relative;
                top: 0;
                left: 0;
            }

            // flex-direction: row;
            // flex-wrap: wrap;
            // justify-content: center;
            .ivu-icon {
                position: absolute;
                top: 0px;
                right: 0px;
            }
        }



        .up4 {
            flex: 1;
            // margin: 0 10px;
            // width: 104px;
            width: 145px;
            height: 140px;
            text-align: center;
            // line-height: 100px;
        }
    }

}

.saff {
    width: 100%;
    height: calc(100vh - 90px);
    padding: 0 40px 20px 40px;
    padding-bottom: 0;
    background: rgba(212, 242, 250, 1);
    overflow: hidden;
    overflow-y: auto;

    .bar {
        width: 100%;
        height: 60px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        //padding: 0 0 20px 0;
        padding-right: 20px;

        .Back {
            width: 260px;
            cursor: pointer;
            display: inline-block;
            line-height: 60px;
            height: 60px;
            background-color: red;
            padding: 0 20px;
            color: #1364F8;
            background: linear-gradient(90deg, rgba(19, 100, 248, 0.1) 0%, rgba(19, 100, 248, 0) 100%);
        }

        .searchBtn {
            display: flex;

            .input {
                width: 100px;
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

        .title {
            width: 100%;
            background: linear-gradient(270deg, RGBA(255, 255, 255, 1) 0%, RGBA(206, 223, 254, 1) 100%);

            //  background: linear-gradient(270deg, rgba(19, 100, 248, 0) 0%, rgba(19, 100, 248, 0.7) 100%);
            border-radius: 8px 8px 0px 0px;
            //opacity: 0.3;
            font-size: 14px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            color: rgba(28, 27, 27, 1);
            padding-left: 10px;
            line-height: 30px;
        }

        .info {
            height: 285px;
            padding: 0 5px;
        }


        .write {
            float: right;
            padding: 0 10px;
        }

        .memo {
            display: flex;
            padding: 10px;
            height: 170px;


            .textList {
                width: 230px;
                overflow: hidden;
                overflow-y: auto;
                padding: 10px;
                background: #F1F1F5;
            }

            .list {
                width: calc(100% - 230px);
                // background: rgba(19, 100, 248, .1);
                overflow: hidden;
                overflow-y: auto;
                padding: 10px;

                .item:hover {
                    background: rgba(19, 100, 248, .1);
                }

                .item {
                    // background: rgb(0, 0, 0, .1);
                    cursor: pointer;
                    margin-bottom: 5px;
                    padding: 10px;
                    border-radius: 8px;

                    .t1 {
                        font-size: 14px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 600;
                        color: #1C1B1B;
                    }

                    .t2 {
                        font-size: 12px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 400;
                        color: #8B8A96;
                    }

                    .t3 {
                        font-size: 12px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 400;
                        color: #1C1B1B;
                    }
                }

            }

        }
    }

    .floor {
        width: 170px;
        // margin: 10px 0px;
        // margin-right: 30px;
        margin-bottom: 10px;

        .btnList {
            width: 170px;


            .list {
                display: flex;
                flex-direction: column;

                button {
                    margin: 5px 0;
                }
            }
        }
    }

    .infoBox {
        display: flex;
        width: 100%;
        padding-top: 20px;
        height: calc(100vh - 160px);
        overflow: hidden;
        overflow-y: auto;

        .left {
            width: 230px;
        }

        .center {
            width: calc(100% - 400px);
            padding: 0 20px;
        }

        .right {
            width: 170px;
        }
    }

    .chartBox {
        display: flex;
        width: 100%;
        margin-top: 10px;


        .left {
            width: 350px;
        }

        .center {
            width: calc(100% - 770px);
            padding: 0 10px;
        }

        .right {
            width: 420px;
        }
    }
}
</style>