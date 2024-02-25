<template>
    <div class="sched">
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
            <div class="info">
                <p class="title">值班人员</p>
                <div class="user" v-for="(item, idx) in data" :key="idx">
                    <div class="avatar">
                        <div>
                            <Avatar icon="ios-person" size="30" />
                        </div>
                        <div class="txt">
                            <p class="t1">倪杰</p>
                            <p class="t2">护士</p>
                        </div>
                    </div>
                    <div class="bg">

                        <div class="empty" v-if="!item.isSched">
                            <Button type="primary" size="small" @click="addModal = true">设置排班</Button>
                        </div>



                        <div v-if="item.isSched && !isArray(item.len)" class="center"
                            :style="{ marginLeft: `${item.ml * WW}px`, height: '30px', width: `${item.len * WW}px`, background: 'rgba(255, 238, 191, 1)' }">
                            <span>
                                {{ item.start }}-{{ item.end }}

                                <span class="type">
                                    {{ item.calss }}
                                </span>
                            </span>

                            <span>
                                <Space>
                                    <Button size="small" @click="handleSetTimeModal(item)">设置</Button>
                                    <Button size="small">删除</Button>
                                </Space>
                            </span>
                        </div>


                        <div v-if="item.isSched && isArray(item.len)" class="bothEnds">
                            <div class="start"
                                :style="{ position: 'absolute', top: 0, left: 0, height: '30px', width: `${item.len[1] * WW - 1}px`, background: 'rgba(255, 238, 191, 1)' }">

                                <span v-if="item.len[1] > item.len[0]">
                                    {{ item.start }}-{{ item.end }}
                                    <span class="type">
                                        {{ item.calss }}
                                    </span>
                                </span>

                                <span v-if="item.len[1] > item.len[0]">
                                    <Space>
                                        <Button size="small" @click="handleSetTimeModal(item)">设置</Button>
                                        <Button size="small">删除</Button>
                                    </Space>
                                </span>
                            </div>

                            <div class="end"
                                :style="{ position: 'absolute', top: 0, left: `${item.ml * WW - 1}px`, height: '30px', width: `${item.len[0] * WW}px`, background: 'rgba(255, 238, 191, 1)' }">

                                <span v-if="item.len[1] <= item.len[0]">
                                    {{ item.start }}-{{ item.end }}
                                    <span class="type">
                                        {{ item.calss }}
                                    </span>
                                </span>

                                <span v-if="item.len[1] <= item.len[0]">
                                    <Space>
                                        <Button size="small" @click="handleSetTimeModal(item)">设置</Button>
                                        <Button size="small">删除</Button>
                                    </Space>
                                </span>
                            </div>



                        </div>


                    </div>
                </div>
            </div>

            <div class="table" :style="{ height: `${(data.length + 1) * 50}px` }">
                <div ref="timeW"><span>6am</span></div>
                <div><span>7am</span></div>
                <div><span>8am</span></div>
                <div><span>9am</span></div>
                <div><span>10am</span></div>
                <div><span>11am</span></div>
                <div><span>12am</span></div>
                <div><span>13pm</span></div>
                <div><span>14pm</span></div>
                <div><span>15pm</span></div>
                <div><span>16pm</span></div>
                <div><span>17pm</span></div>
                <div><span>18pm</span></div>
                <div><span>19pm</span></div>
                <div><span>20pm</span></div>
                <div><span>21pm</span></div>
                <div><span>22pm</span></div>
                <div><span>23pm</span></div>
                <div><span>0am</span></div>
                <div><span>1am</span></div>
                <div><span>2am</span></div>
                <div><span>3am</span></div>
                <div><span>4am</span></div>
                <div><span>5am</span></div>
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
                            <div style="width: 100px;">值班人员</div>
                        </th>
                        <th v-for="item in time" :key="item" width="45">
                            <div style="width: 45px;">{{ item }}</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr height="45" style="position: relative;padding: 10px 0;">
                        <td>
                            <div style="width: 100px;display: flex;align-items: center;justify-content: center;">
                                <div>
                                    <Avatar icon="ios-person" size="30" />
                                </div>
                                <div class="txt">
                                    <p class="t1">倪杰</p>
                                    <p class="t2">护士</p>
                                </div>
                            </div>
                        </td>
                        <td v-for="item in time" :key="item" width="40" style="border-left: 1px solid #ccc;"></td>
                        <div style="position: absolute;left: 100px;top: 5px;background: rgb(255, 238, 191);height: 35px;">
                            dasd5432432sa
                        </div>
                    </tr>

                    <tr height="45" style="position: relative;">
                        <td>
                            <div style="width: 100px;display: flex;align-items: center;justify-content: center;">
                                <div>
                                    <Avatar icon="ios-person" size="30" />
                                </div>
                                <div class="txt">
                                    <p class="t1">倪杰</p>
                                    <p class="t2">护士</p>
                                </div>
                            </div>
                        </td>
                        <td v-for="item in time" :key="item" width="45" style="border-left: 1px solid #ccc;"></td>
                        <div style="position: absolute;left: 100px;top: 5px;background: rgb(255, 238, 191);height: 35px;">
                            dasd5432432s
                        </div>
                    </tr>
                </tbody>
            </table>
        </div>

        <Modal v-model="addModal" title="排班设置" :footer-hide="true" :width="340">
            <template #close>
                <Icon type="md-add-circle" color="#000" style="transform: rotateZ(45deg);" size="16" />
            </template>
            <div class="userModal">
                <div class="avatar">
                    <div>
                        <Avatar icon="ios-person" size="30" />
                    </div>
                    <div class="txt">
                        <p class="t1">倪杰</p>
                        <p class="t2">护士</p>
                    </div>
                </div>
                <p class="label">排班名称</p>
                <Input clearable v-model="addForm.class" />

                <div class="time">
                    <span>开始时间</span>
                    <TimePicker v-model="addForm.start" format="HH:mm" placeholder="Select time" style="width: 100px" />
                </div>

                <div class="time">
                    <span>结束时间</span>
                    <TimePicker v-model="addForm.end" format="HH:mm" placeholder="Select time" style="width: 100px" />
                </div>

                <Button type="primary" style="width: 100%;margin-top: 10px;" @click="handleAddForm">保存</Button>

            </div>
        </Modal>

    </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';
import { isArray } from 'lodash';
import { ref } from 'vue';
import { StaffScheduleListOfDay, StaffScheduleListOfMonth } from '@/api/Staff/Staff';
const timeW = ref<any>(null)

const WW = ref(45)
const addModal = ref(false)

const addForm = ref({
    start: "",
    end: "",
    class: "",
})
const data = ref([
    {
        start: "6:00",
        end: "9:00",
        ml: 0,
        len: 3,
        isSched: true,
        name: '倪杰',
        type: '护士',
        calss: '早班'
    },
    {
        start: "6:00",
        end: "15:00",
        ml: 0,
        len: 9,
        isSched: false,
        name: '倪杰',
        type: '护士',
        calss: '夜班'
    },
    {
        start: "16:00",
        end: "4:00",
        ml: 10,
        len: 12,
        isSched: true,
        name: '倪杰',
        type: '护士',
        calss: '中班'
    },
    {
        start: "1:00",
        end: "15:00",
        ml: 19,
        len: [5, 9],
        isSched: true,
        name: '倪杰',
        type: '护士',
        calss: '夜班'
    }
])

let time = ['6am', "7am", "8am", "9am", "10am", "11am", "12am", "13pm", "14pm", "15pm", "16pm", "17pm", "18pm", "19pm", "20pm", "21pm", "22pm", "23pm", "0am", "1am", "2am", "3am", "4am", "5am"]

// onMounted(() => {
//     WW.value = timeW.value.clientWidth + 2
// })

const handleSetTimeModal = (row: any) => {
    console.log(row)
    addModal.value = true
}

const handleAddForm = () => {
    //console.log(addForm.value)

    let time = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5]

    let obj = {
        start: addForm.value.start,
        end: addForm.value.end,
        ml: 0,
        len: 0,
        isSched: true,
        name: '倪杰',
        type: '护士',
        calss: addForm.value.class,
    }


    if (addForm.value.start == "06:00") {
        obj.ml = 0
    } else {
        //time = time.concat(time)
        let s = parseInt(addForm.value.start)
        let e = parseInt(addForm.value.end)


        let l = time.indexOf(s)
        let r = time.indexOf(e)

        let b1 = addForm.value.start.split(":")[1] * 1 > 0
        let b2 = addForm.value.end.split(":")[1] * 1 > 0


        console.log(b1)
        console.log(b2)
        obj.ml = l

        if (l > r) {
            let t0 = 24 - l
            let t1 = r


            if (b1) {
                obj.ml = l + 0.5
            }
            if (b2) {
                t1 = t1 + 0.5
            }

            obj.len = [t0, t1]
        }

        if (r > l) {
            obj.len = r - l

            if (b1) {
                obj.ml = l + 0.5
            }
            if (b2) {
                obj.len = obj.len + 0.5
            }
        }

    }

    console.log(obj)

    data.value.push(obj)


}


onMounted(() => {
    StaffScheduleListOfDay({
        current: 1,
        size: 9999,
    }).then(res => {
        console.log(res)
    })

    StaffScheduleListOfMonth({

    }).then(res => {
        console.log(res)
    })
})





</script>

<style scoped lang='less'>
.userModal {
    .avatar {
        width: 140px;
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

        span {
            width: 80px;
        }
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



    // .table {
    //     width: calc(100% - 80px);
    //     margin-left: 80px;
    // }

    // .th {
    //     font-size: 14px;
    //     font-family: PingFangSC, PingFang SC;
    //     font-weight: 400;
    //     color: #8B8A96;

    //     background: red;
    //     overflow: hidden;

    //     span {
    //         display: block;
    //         width: 45px;
    //     }

    // }

    // .td {
    //     border-right: 1px solid #ccc;
    //     // background: red;
    //     height: 30px;
    //     box-sizing: border-box;
    //     overflow: hidden;
    // }

    // .tr {
    //     .td:nth-child(1) {
    //         border-left: 1px solid #ccc;
    //     }
    // }



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

        .table {
            display: flex;
            height: 300px;
            padding-top: 40px;
            width: calc(100% - 125px);
            margin-left: 125px;

            div {
                // width: 45px;
                width: calc(100% / 24);
                border-right: 1px solid #ccc;
                text-align: center;

                // margin-top: -20px;
                &:nth-child(1) {
                    border-left: 1px solid #ccc;
                }

                span {
                    display: block;
                    background: #fff;
                    margin-top: -25px;
                }

            }

        }


        .info {
            position: absolute;
            top: 15px;
            left: 0;
            width: 100%;

            .title {
                font-size: 14px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 500;
                color: #1C1B1B;
                text-indent: 1rem;
            }

            .user {
                height: 30px;
                // line-height: 40px;
                margin: 10px 0;
                display: flex;

                .avatar {
                    width: 140px;
                    display: flex;
                    align-items: center;
                    text-indent: 1rem;

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

                .bg {
                    width: 100%;
                    height: 30px;
                    // height: 40px;
                    // // background: red;
                    // display: flex;
                    // align-items: center;

                    .empty {

                        height: 30px;
                        background: rgba(241, 241, 245, 1);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 4px;
                        text-overflow: ellipsis;
                        word-wrap: normal;
                    }

                    .center {
                        height: 30px;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 10px;
                        border-radius: 4px;
                        text-overflow: ellipsis;
                        word-wrap: normal;
                        text-wrap: nowrap;

                        .type {
                            background: rgba(255, 255, 255, 0.5);
                            border-radius: 10px;
                            padding: 0 15px;
                            margin-left: 10px;
                        }
                    }

                    .bothEnds {
                        height: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 4px;
                        text-overflow: ellipsis;
                        word-wrap: normal;
                        position: relative;
                        word-wrap: normal;
                        text-wrap: nowrap;

                        .type {
                            background: rgba(255, 255, 255, 0.5);
                            border-radius: 10px;
                            padding: 0 15px;
                            margin-left: 10px;
                        }

                        .start {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            padding: 0 10px;
                            border-radius: 4px;
                            text-overflow: ellipsis;
                            word-wrap: normal;
                            text-wrap: nowrap;
                        }

                        .end {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            padding: 0 10px;
                            border-radius: 4px;
                            text-overflow: ellipsis;
                            word-wrap: normal;
                            text-wrap: nowrap;
                        }
                    }
                }
            }
        }
    }
}
</style>