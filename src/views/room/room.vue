<template>
    <div class="room">
        <div class="toolBar">
            <div></div>
            <div class="bar">
                <RadioGroup v-model="type" type="button" button-style="solid" @on-change="handleRadioType">
                    <Radio v-for="item in  typeList" :key="item.label" :label="item.type">
                        <Icon :type="item.icon" />
                        {{ item.label }}
                    </Radio>
                </RadioGroup>
            </div>
            <div class="btn">
                <!-- <Button type="primary" v-if="type == 'mechanism'">保存</Button> -->
                <Input prefix="ios-search" clearable  enter-button="搜索" placeholder="搜索" />
                   
            </div>
        </div>

        <div class="box">
            <div class="house">
                <p class="houseTitle">楼层房间</p>
                <Card :bordered="false" padding="6">
                    <Row :gutter="8">
                        <Col span="12" v-for="item in houseList" :key="item" class="houseCard">
                        <!-- <Card :bordered="false" :style="{ 'background': item.color, 'border': '2px solid #fff' }"
                        @click="handleNav(item.route)"> -->
                        <div class="cardBody" @click="handleHouseActive(item)">
                            <p :style="{ 'color': houseActive == item ? '' : '#1C1B1B' }">{{ item }}</p>
                            <img :src="houseActive == item ? HouseOpen : HouseClose" alt="" srcset="">
                        </div>
                        <!-- </Card> -->
                        </Col>
                    </Row>
                </Card>
            </div>
            <div class="roomUser">

                <div class="roomItem">
                    <p class="roomTitle">
                        <span class="tt">Aa01</span>
                        <span>1 入住、2预留、5空闲</span>
                    </p>
                    <Row :gutter="8">
                        <Col span="4" v-for="item in Array.from({ length: 10 })" :key="item">
                        <Card :bordered="false" padding="0">
                            <div class="roomBox">
                                <p class="t1">
                                    <span :class="['t2', 'green', 'yellow', 'gary']">空闲</span>
                                    <span class="t3">a102</span>
                                    <span class="t4">
                                        <img src="@/assets/images/room-setting.png" alt="" srcset="">
                                    </span>
                                </p>
                                <div class="t5">
                                    <span class="t6">dsadsa</span>
                                    <img class="t7" src="@/assets/images/screen.png" alt="" srcset="">
                                </div>
                                <p class="t8">李梅梅</p>
                                <p class="t9">1964-11-10</p>
                                <p class="t10">
                                    <img src="@/assets/images/位图@2x(1).png" alt="">
                                    <img src="@/assets/images/位图@2x(1).png" alt="">
                                    <img src="@/assets/images/位图@2x(1).png" alt="">
                                    <img src="@/assets/images/位图@2x(1).png" alt="">
                                </p>
                            </div>
                        </Card>
                        </Col>

                    </Row>
                </div>



            </div>
            <div class="floor">
                <Button type="primary" class="btn" @click="handleShowModal">楼栋管理</Button>
                <Card :bordered="false" padding="6">
                    <Row :gutter="8">
                        <Col span="24" v-for="item in houseList" :key="item" class="floorCard">
                        <p :style="{ 'color': floorActive == item ? '' : '#1C1B1B', 'background': floorActive == item ? '#1364F8' : 'rgba(19, 100, 248, .1)' }"
                            @click="handleFloorActive(item)">item
                        </p>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
        <p class="footer">深圳海吉雅健康科技有限公司 技术支持</p>


        <FormData ref="FormDataRef"></FormData>
    </div>

</template>

<script setup lang='ts' name="room">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HouseOpen from "@/assets/images/house-open.png"
import HouseClose from "@/assets/images/house-close.png"
import FormData from './formData.vue';
const FormDataRef:any = ref(null)
const router = useRouter()
const type = ref('a')
const typeList = ref([
    {
        label: "A栋",
        icon: "ios-checkmark",
        type: "a",
    },
    {
        label: "B栋",
        icon: "ios-checkmark",
        type: "b",
    },
    {
        label: "C栋",
        icon: "ios-checkmark",
        type: "c",
    }
])
const handleShowModal = () => {
    FormDataRef.value.showModal()
}


const houseList = ref(['a102', '1203', 'a123', 'a302', 'c203', 'a103'])
const houseActive = ref('a102')
const floorActive = ref('a102')
const handleHouseActive = (label: string) => {
    houseActive.value = label
}
const handleFloorActive = (label: string) => {
    floorActive.value = label
}
const handleRadioType = (label: any) => {
    //console.log(label)
    router.push('/room?type=' + label)
}

</script>

<style scoped lang='less'>
.room {
    width: 100%;
    height: 100%;

    .toolBar {
        height: 60px;
        width: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        background: #fff;

        position: relative;

        .bar {
            margin: 0 auto;
        }

        .btn {
            position: absolute;
            right: 20px;
        }
    }

    .box {
        width: 100%;
        height: calc(100% - 90px);
        background: rgba(212, 242, 250, 1);
        display: flex;
        justify-content: space-between;

        .house {
            width: 160px;
            margin: 15px 0px;
            margin-left: 30px;

            .houseTitle {
                padding: 10px 0;
            }

            .houseCard {
                .cardBody {
                    position: relative;

                    p {
                        width: 100%;
                        position: absolute;
                        text-align: center;
                        font-size: 14px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 400;
                        color: #FFFFFF;
                        cursor: pointer;
                    }

                    img {
                        width: 100%;
                        cursor: pointer;
                    }
                }
            }
        }

        .roomUser {
            width: calc(100% - 420px);
            margin: 15px auto;

            .roomItem {
                width: 100%;
                cursor: pointer;

                .roomTitle {
                    display: flex;
                    justify-content: space-between;
                    font-size: 16px;
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    color: #1C1B1B;
                    padding: 10px 0;

                    .tt {
                        display: flex;
                        align-items: center;
                    }

                    .tt::before {
                        content: '';
                        display: block;
                        width: 16px;
                        height: 16px;
                        background-image: url("@/assets/images/house-id.png");
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                    }
                }

                .roomBox {
                   // width: 150px;
                    text-align: center;
                    margin-bottom: 10px;

                    .t1 {
                        display: flex;
                        justify-content: space-between;
                        // align-items: center;
                        font-size: 14px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 400;
                        color: #1C1B1B;
                        height: 25px;
                        line-height: 25px;

                    }

                    .t2 {
                        font-size: 10px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 400;
                        color: #FFFFFF;
                        padding: 0 2px;
                    }

                    .green {
                        background: rgba(18, 185, 135, 1);
                    }

                    .yellow {
                        background: rgba(237, 144, 0, 1);
                    }

                    .gary {
                        background: rgba(139, 138, 150, 1);
                    }

                    .t3 {
                        border-radius: 0 0 5px 5px;
                        box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
                        padding: 0 10px;
                    }

                    .t4 {
                        display: flex;

                        img {
                            display: inline-block;
                            width: 25px;
                        }
                    }

                    .t5 {
                        position: relative;
                        font-size: 14px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 400;
                        color: #FFFFFF;

                        img {
                            width: 100%;
                            padding: 10px 8px 0 8px;
                            height: 130px;
                        }

                        .t6 {
                            position: absolute;
                            bottom: 15px;
                            right: 12px;
                        }
                    }

                    .t8 {
                        font-size: 16px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 400;
                        color: #1C1B1B;
                    }

                    .t9 {
                        font-size: 14px;
                        font-family: PingFangSC, PingFang SC;
                        font-weight: 400;
                        color: #8B8A96;
                    }

                    .t10 {
                        display: flex;
                        width: 100%;
                        justify-content: center;
                        padding-bottom: 10px;

                        img {
                            width: 20px;
                            height: 20px;
                            margin: 0 2px;
                        }
                    }
                }

            }
        }

        .floor {
            width: 160px;
            margin: 15px 0px;
            margin-right: 30px;

            .btn {
                margin: 5px 0;
            }

            .floorCard {
                width: 100%;
                text-align: center;
                font-size: 14px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 30px;

                p {
                    width: 90%;
                    margin: 5px auto;

                    border-radius: 4px;
                    cursor: pointer;
                }
            }
        }
    }

    .footer {
        text-align: center;
        font-size: 12px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #1C1B1B;
        height: 30px;
        line-height: 30px;
        background: #BCE2ED;
    }

}
</style>