<template>
    <div class="sched">
        <div class="toolBar">
            <div>
                <DatePicker :model-value="searchData.dateStr" type="date" :clearable="false"
                    @on-change="getChangeDate" :editable="false" />
            </div>
            <div class="bar">
            </div>
            <div class="btn">
                <Space>
                    <Button type="primary" @click="notesModal = true">{{ t('信息板') }}</Button>

                    <Select v-model="searchData.shiftType" style="width:100px" :placeholder="t('班次')" clearable
                        @on-change="() => { getData() }">
                        <Option value="0">{{ t('早班') }}</Option>
                        <Option value="1">{{ t('中班') }}</Option>
                        <Option value="2">{{ t('晚班') }}</Option>
                    </Select>
                    <!-- <Input v-model="searchData.keyword" prefix="ios-search" clearable :enter-button="t('搜索')"
                        :placeholder="t('搜索')" /> -->
                </Space>
            </div>
        </div>


        <div class="box">
            <table border="0" cellspacing="0" cellpadding="0">
                <colgroup>
                    <!-- <col span="1" style="width: 100px !important;">
                    <col span="1" style="background: rgb(12, 221, 51);"> -->
                </colgroup>
                <thead>
                    <tr height="45">
                        <th>
                            <div style="width: 100px;">{{ t('值班人员') }}</div>
                        </th>
                        <th v-for="item in time" :key="item" width="45">
                            <div style="width: 45px;">{{ item }}</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr height="45" style="position: relative;padding: 10px 0;" v-for="item in data" :key="item.id">
                        <td>
                            <div style="width: 100px;display: flex;align-items: center;justify-content: center;">
                                <div>
                                    <Avatar icon="ios-person" size="30" />
                                </div>
                                <div class="txt" style="width: 100%;overflow: hidden; white-space: nowrap;text-overflow: ellipsis;">
                                    <p class="t1">{{ item.name }}</p>
                                    <p class="t2">{{ item.type }}</p>
                                </div>
                            </div>
                        </td>
                        <td v-for="item in time" :key="item" width="40" style="border-left: 1px solid #ccc;"></td>
                        <div style="position: absolute;left: 100px;top: 5px;display: flex;height: 35px;border-radius:8px"
                            v-if="item.isActiveBox.length">

                            <div class="center"
                                :style="{ width: item.isActiveBox[0] * 45 + 'px', height: '100%', borderRadius: '8px' }">
                            </div>
                            <!-- <Poptip > -->
                            <div class="center hover" @click="handleSetTimeModal(item)"
                                :style="{ width: item.isActiveBox[1] * 45 + 'px', height: '100%', background: 'rgb(255, 238, 191)', borderRadius: '8px',overflow: 'hidden',whiteSpace: 'nowrap',textOverflow: 'ellipsis' }">
                                <div class="item" v-if="item.isActiveBox[1] >= item.isActiveBox[3]">
                                    <span>
                                        &nbsp;&nbsp;
                                        {{ item.startTime }}~{{ item.endTime }}</span>
                                    <span class="type">{{ item.shiftName }}</span>
                                </div>
                            </div>
                            <!-- <template #content>
                                    <Space>
                                        <Button size="small" type="primary" @click="handleSetTimeModal(item)">设置</Button>
                                        <Button size="small" type="error" @click="handleDelete(item)">删除</Button>
                                    </Space>
                                </template> -->
                            <!-- </Poptip > -->
                            <div class="center"
                                :style="{ width: item.isActiveBox[2] * 45 + 'px', height: '100%', borderRadius: '8px' }">
                            </div>
                            <!-- <Poptip trigger="hover"> -->
                            <div class="center hover" @click="handleSetTimeModal(item)"
                                :style="{ width: item.isActiveBox[3] * 45 + 'px', height: '100%', background: 'rgb(255, 238, 191)', borderRadius: '8px',overflow: 'hidden',whiteSpace: 'nowrap',textOverflow: 'ellipsis' }">
                                <div class="item" v-if="item.isActiveBox[1] < item.isActiveBox[3]">
                                    <span>&nbsp;&nbsp;
                                        {{ item.startTime }}~{{ item.endTime }}</span>
                                    <span class="type">{{ item.shiftName }}</span>
                                </div>
                            </div>
                            <!-- <template #content>
                                    <Space>
                                        <Button size="small" type="primary" @click="handleSetTimeModal(item)">设置</Button>
                                        <Button size="small" type="error" @click="handleDelete(item)">删除</Button>
                                    </Space>
                                </template> -->
                            <!-- </Poptip> -->

                        </div>
                        <div v-else
                            style="position: absolute;left: 100px;top: 5px;display: flex;height: 35px;border-radius:8px;background: #F1F1F5;width: 100%;justify-content: center;">
                            <Button type="primary" @click="handleOpenModal(item)">{{ t('设置排班') }}</Button>
                        </div>
                    </tr>
                </tbody>
            </table>
        </div>

        <Modal v-model="addModal" :title="t('设置排班')" :footer-hide="true" :width="340" style="z-index: 2000 !important;" :mask-closable="false">
            <template #close>
                <Icon type="md-close-circle" color="#000" size="16" />
            </template>
            <div class="userModal">
                <div class="avatar" style="display: flex;
    align-items: center;justify-content: space-between;">
                    <div style="display: flex;
    align-items: center;">
                        <div>
                            <Avatar icon="ios-person" size="30" />
                        </div>
                        <div class="txt">
                            <p class="t1">{{ addForm.name }}</p>
                            <p class="t2">{{ addForm.type }}</p>
                        </div>
                    </div>

                    <Button size="small" type="error" @click="handleDelete(addForm)"
                        style="float: right;">{{ t('删除') }}</Button>

                </div>
                <p class="label">{{ t('排班名称') }}</p>
                <Select v-model="addForm.shiftType" :placeholder="t('排班名称')">
                    <Option value="0">{{ t('早班') }}</Option>
                    <Option value="1">{{ t('中班') }}</Option>
                    <Option value="2">{{ t('晚班') }}</Option>
                </Select>

                <div class="time">
                    <span>{{ t('开始时间') }}</span>
                    <TimePicker v-model="addForm.startTimeStr" format="HH:mm" :placeholder="t('开始时间')"
                        style="width: 150px" />
                </div>

                <div class="time">
                    <span>{{ t('结束时间') }}</span>
                    <TimePicker v-model="addForm.endTimeStr" format="HH:mm" :placeholder="t('结束时间')" style="width: 150px" />
                    <!-- <TimePicker :model-value="addForm.end" format="HH’mm’ss" type="timerange" placement="bottom-end"
                        placeholder="Select time" /> -->
                </div>

                <Button type="primary" style="width: 100%;margin-top: 10px;"
                    @click="handleEditSchedule">{{ t('保存') }}</Button>

            </div>
        </Modal>


        <Modal v-model="notesModal" :title="t('信息板')" :footer-hide="true" :width="340" :mask-closable="false">
            <template #close>
                <Icon type="md-close-circle" color="#000" size="16" />
            </template>
            <div>
                <div>
                    <p>{{ t('当班信息') }}</p>
                    <Input v-model="notes.value1" :autosize="{ minRows: 4, maxRows: 4 }" type="textarea"
                        placeholder="请输入当班信息" />
                </div>
                <br />
                <div>
                    <p>{{ t('交接班信息') }}</p>
                    <Input v-model="notes.value2" :autosize="{ minRows: 4, maxRows: 4 }" type="textarea"
                        :placeholder="t('请输入交接班信息')" />
                </div>
            </div>
            <Button type="primary" @click="handleSumbit" style="width: 100%;margin-top: 10px;">{{ $t('确定') }}</Button>
            <!-- <template #footer>
                <Button @click="notesModal = false">{{ $t('取消') }}</Button>
                <Button type="primary" @click="handleSumbit">{{ $t('确定') }}</Button>
            </template> -->
        </Modal>

    </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { Poptip, Space, Button, Modal, Message, TimePicker, DatePicker } from 'view-ui-plus';
import { StaffScheduleListOfDay, StaffScheduleRemoveId, StaffScheduleSave, StaffScheduleUpdate } from '@/api/Staff/Staff';
import { MemoList, MemoSave } from "@/api/Memo/Memo";
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
import { join } from 'path';
const { t } = useI18n()
const searchData = ref({
    shiftType: '',
    keyword: '',
    dateStr: dayjs().format("YYYY-MM-DD"),
})
const emit = defineEmits(['handleUpdate'])
const addModal = ref(false)
const notesModal = ref(false)
const addForm = ref<any>({
    dateStr: dayjs().format("YYYY-MM-DD"),
    endTimeStr: "",
    startTimeStr: "",
    shiftType: "",
    staffId: "",
    id: '',
})
const notes = ref({
    value1: '',
    value2: ''
})
const data = ref<any>([
    // {
    //     date: "2024-3-3",
    //     startTime: "6:00",
    //     endTime: "9:00",
    //     id: "1",
    //     notes: "dsadsa",
    //     shiftName:"早班",
    //     shiftType: "0",
    //     isActiveBox: [2,4, 14, 4],
    //     name: '倪杰',
    //     type: '护士',

    // }   
])

let time = ['6am', "7am", "8am", "9am", "10am", "11am", "12am", "13pm", "14pm", "15pm", "16pm", "17pm", "18pm", "19pm", "20pm", "21pm", "22pm", "23pm", "0am", "1am", "2am", "3am", "4am", "5am"]

// onMounted(() => {
//     WW.value = timeW.value.clientWidth + 2
// })
// 

const handleOpenModal = (row: any) => {
    // addForm.value = {
    //     ...row,
    //     dateStr: addForm.value.dateStr
    // }

    addForm.value = {
        dateStr: addForm.value.dateStr,
        staffId: row.staffId,
        id: row.id,
        name: row.name,
        type: row.type,
        // date: row.date,
        startTimeStr: row.startTime,
        endTimeStr: row.endTime,
        shiftType: row.shiftType + '',
        // isActiveBox: row.isActiveBox,
        // notes: row.notes,
        // id: row.id,
    }
    addModal.value = true

    console.log(row, addForm.value)
}
// 添加备忘录
const handleSumbit = () => {
    MemoSave({ type: 1, name: "当班信息", content: notes.value.value1 }).then(() => {
        //console.log(res)
    }).then(() => {
        MemoSave({ type: 2, name: "交接班信息", content: notes.value.value2 }).then(() => {
            //console.log(res)
            Message.success(t('添加成功'))
            emit('handleUpdate')
            notesModal.value = false
        })
    })

}

//设置排班日期
const handleSetTimeModal = (row: any) => {
    console.log(row)
    //
    // addForm.value = {
    //     ...row,
    //     dateStr: addForm.value.dateStr
    // }


    // let data = {...addForm.value,staffId:row.id}

    addForm.value = {
        dateStr: addForm.value.dateStr,
        staffId: row.staffId,
        id: row.id,
        name: row.name,
        type: row.type,
        // date: row.date,
        startTimeStr: row.startTime,
        endTimeStr: row.endTime,
        shiftType: row.shiftType + '',
        // isActiveBox: row.isActiveBox,
        // notes: row.notes,
        // id: row.id,
    }

    addModal.value = true

    //  console.log(data)
}
// 编辑排班
const handleEditSchedule = () => {
    console.log(addForm.value)

    let request = addForm.value.id == undefined ? StaffScheduleSave : StaffScheduleUpdate
    let msg = addForm.value.id == undefined ? t('添加成功') : t('编辑成功')
    // if (addForm.value.staffId === '') {
    //     StaffScheduleSave
    // } else {
    //     StaffScheduleUpdate
    // }

    let data = JSON.parse(JSON.stringify(addForm.value))
    delete data.name
    delete data.type
    console.log(data)
    let end = data.endTimeStr.split(":")[0]*1
    let start = data.startTimeStr.split(":")[0]*1


    if((end-start) <= 0){

        Message.error(t('设置的时间有误'))
        return

    }



    request(data).then(() => {
        Message.success(t(msg))
        getData()
    })

    addModal.value = false
}

// 删除排班
const handleDelete = (row: any) => {
    console.log(row)
    Modal.confirm({
        title: t('删除排班'),
        content: t('确定要删除此员工排班'),
        loading: true,
        onOk: () => {
            console.log(row)
            StaffScheduleRemoveId({ id: row.id }).then(() => {
                Message.success(t('删除成功'))
                Modal.remove();
                getData()
                // handleDeviceList(data)
            }).catch(() => {
                Modal.loading = false
            })
        }
    })

}

const getChangeDate = (date: any) => {
    console.log(date)

    searchData.value.dateStr = date

    getData()
}

const getData = () => {

    StaffScheduleListOfDay({
        current: 1,
        size: 9999,
        dayTime: searchData.value.dateStr,
        shiftType: searchData.value.shiftType
    }).then(res => {
        // console.log(res)

        let time = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5]

        const list = res.data.records.map((item: any) => {

            let info = item.scheduleList?.[0]

            let ssss: any = []

            // 7-9 7-5 
            if (info?.startTime && info?.endTime) {
                let ti = time.indexOf(info?.startTime?.split(":")[0] * 1)
                let ei = time.indexOf(info?.endTime?.split(":")[0] * 1)

                let s = info?.startTime?.split(":")[0] * 1
                let e = info?.endTime?.split(":")[0] * 1

                console.log(ti, ei, s, e)
                //   if()



                //23 13  ------5 19   5-19

                // 18 3 0 9  [15, 9, 9, 6]
                if (ti > ei) {
                    ssss = [0, ei, 24 - ei - (24 - ti), 24 - ti]
                    // 0,13,x,1
                }

                if (ei >= ti) {
                    // if(s>=6){
                    //     ssss[0]=s-6
                    // }
                    // ssss[1]=ei-ti
                    // ssss[2]=e-6

                    //[5, 8, 11, 0] 5 13 11 19
                    ssss = [s - 6, ei - ti, 24 - s + 6 - ei + ti, 0]
                }
            } else {
                ssss = []

            }

            console.log("======", ssss)




            let shift = ['早班', '中班', '晚班']
            let obj = {
                id: info?.id,
                staffId: item.id,
                date: info?.date,
                startTime: info?.startTime,
                endTime: info?.endTime,
                notes: info?.notes,
                shiftType: info?.shiftType,
                shiftName: shift[info?.shiftType],
                isActiveBox: ssss,
                name: item.name,
                type: item.roleName,
            }


            return obj
        })


        console.log(list)
        data.value = list

    })
}

const getMemo = () => {
    // 备忘录
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


onMounted(() => {
    getData()
    getMemo()
    // StaffScheduleListOfDay({
    //     current: 1,
    //     size: 9999,
    // }).then(res => {
    //     console.log(res)
    // })

    // StaffScheduleListOfMonth({

    // }).then(res => {
    //     console.log(res)
    // })
})





</script>

<style lang='less'>
.userModal {
    .avatar {
        width: 100%;
        display: flex;
        align-items: center;

        .txt {
            font-size: 12px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            text-indent: 5px;

            .t1 {
                color: #1C1B1B;
            }

            .t2 {
                color: #8B8A96;
            }
        }
    }

    .label {
        padding: 10px 0;
    }

    .time {
        display: flex;
        align-items: center;
        justify-content: space-between;
        // padding: 10px 0;
        margin-top: 10px;

        // span {
        //     width: 80px;
        // }
    }
}

.txt {
    font-size: 12px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    text-indent: 5px;

    .t1 {
        color: #1C1B1B;
    }

    .t2 {
        color: #8B8A96;
    }
}

.sched {
    width: 100%;


    .toolBar {
        width: 100%;
        display: flex;
        height: 30px;
        align-items: center;
        justify-content: space-between;
        background: #fff;
        // padding: 0 20px;
    }

    .box {
        width: 100%;
        position: relative;
        max-height: 700px;
        overflow: hidden;
        overflow-y: auto;
        // background: red;
        margin-top: 10px;

        .center {
            width: 100%;
            display: flex;
            align-items: center;
            cursor: pointer;


            .item {
                overflow: hidden;

                .type {
                    margin-left: 10px;
                    padding: 0 10px;
                    background: #fff;
                    border-radius: 4px;
                }
            }



            // justify-content: center;

        }

        .hover:hover {
            border: 1px solid #1890FF;
        }

        // .hover::hover {
        //     border: 1px solid #1890FF;
        // }

        // .table {
        //     display: flex;
        //     height: 300px;
        //     padding-top: 40px;
        //     width: calc(100% - 125px);
        //     margin-left: 125px;

        //     div {
        //         // width: 45px;
        //         width: calc(100% / 24);
        //         border-right: 1px solid #ccc;
        //         text-align: center;

        //         // margin-top: -20px;
        //         &:nth-child(1) {
        //             border-left: 1px solid #ccc;
        //         }

        //         span {
        //             display: block;
        //             background: #fff;
        //             margin-top: -25px;
        //         }

        //     }

        // }


        // .info {
        //     position: absolute;
        //     top: 15px;
        //     left: 0;
        //     width: 100%;

        //     .title {
        //         font-size: 14px;
        //         font-family: PingFangSC, PingFang SC;
        //         font-weight: 500;
        //         color: #1C1B1B;
        //         text-indent: 1rem;
        //     }

        //     .user {
        //         height: 30px;
        //         // line-height: 40px;
        //         margin: 10px 0;
        //         display: flex;

        //         .avatar {
        //             width: 140px;
        //             display: flex;
        //             align-items: center;
        //             text-indent: 1rem;

        //             .txt {
        //                 font-size: 12px;
        //                 font-family: PingFangSC, PingFang SC;
        //                 font-weight: 500;
        //                 text-indent: 5px;

        //                 .t1 {
        //                     color: #1C1B1B;
        //                 }

        //                 .t2 {
        //                     color: #8B8A96;
        //                 }
        //             }
        //         }

        //         .bg {
        //             width: 100%;
        //             height: 30px;
        //             // height: 40px;
        //             // // background: red;
        //             // display: flex;
        //             // align-items: center;

        //             .empty {

        //                 height: 30px;
        //                 background: rgba(241, 241, 245, 1);
        //                 display: flex;
        //                 align-items: center;
        //                 justify-content: center;
        //                 border-radius: 4px;
        //                 text-overflow: ellipsis;
        //                 word-wrap: normal;
        //             }

        //             .center {
        //                 height: 30px;
        //                 width: 100%;
        //                 display: flex;
        //                 align-items: center;
        //                 justify-content: space-between;
        //                 padding: 0 10px;
        //                 border-radius: 4px;
        //                 text-overflow: ellipsis;
        //                 word-wrap: normal;
        //                 text-wrap: nowrap;

        //                 .type {
        //                     background: rgba(255, 255, 255, 0.5);
        //                     border-radius: 10px;
        //                     padding: 0 15px;
        //                     margin-left: 10px;
        //                 }
        //             }

        //             .bothEnds {
        //                 height: 30px;
        //                 display: flex;
        //                 align-items: center;
        //                 justify-content: center;
        //                 border-radius: 4px;
        //                 text-overflow: ellipsis;
        //                 word-wrap: normal;
        //                 position: relative;
        //                 word-wrap: normal;
        //                 text-wrap: nowrap;

        //                 .type {
        //                     background: rgba(255, 255, 255, 0.5);
        //                     border-radius: 10px;
        //                     padding: 0 15px;
        //                     margin-left: 10px;
        //                 }

        //                 .start {
        //                     display: flex;
        //                     align-items: center;
        //                     justify-content: space-between;
        //                     padding: 0 10px;
        //                     border-radius: 4px;
        //                     text-overflow: ellipsis;
        //                     word-wrap: normal;
        //                     text-wrap: nowrap;
        //                 }

        //                 .end {
        //                     display: flex;
        //                     align-items: center;
        //                     justify-content: space-between;
        //                     padding: 0 10px;
        //                     border-radius: 4px;
        //                     text-overflow: ellipsis;
        //                     word-wrap: normal;
        //                     text-wrap: nowrap;
        //                 }
        //             }
        //         }
        //     }
        // }
    }
}
</style>