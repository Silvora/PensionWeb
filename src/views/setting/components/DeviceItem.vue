<template>
    <Card :bordered="false" padding="0" style="background: rgba(255, 255, 255, 1);margin-bottom: 10px;">
        <div class="deviceInfo">
            <p class="title">
                <span :class="['t1', 'green', 'yellow', 'gary']">在线</span>
                <span class="t2">一楼 A101 06床</span>
                <span class="t3">
                    <img src="@/assets/images/room-setting.png" alt="" srcset="">
                </span>
            </p>
            <div class="deviceBox">
                <img class="img" src="@/assets/images/sleep.png" alt="" srcset="">
                <div class="info">
                    <p class="t1">睡眠雷达

                    </p>
                    <p class="t2">
                        ID:264233215
                    </p>
                    <p class="t2">
                        关联老人:倪杰
                    </p>
                </div>

                <!-- <div class="imgInfo">
                    <img class="img" src="@/assets/images/screen.png" alt="" srcset="">
                    <div class="imgList">
                        <img src="@/assets/images/位图@2x(1).png" alt="">
                        <img src="@/assets/images/位图@2x(1).png" alt="">
                        <img src="@/assets/images/位图@2x(1).png" alt="">
                        <img src="@/assets/images/位图@2x(1).png" alt="">
                    </div>
                </div>
                <div class="info">
                    <p class="t4">张玲
                        <Icon type="ios-checkmark" />
                    </p>
                    <p class="t4">倪杰
                        <Icon type="ios-checkmark" />
                    </p>
                    <p class="t5">
                        <Icon type="ios-checkmark" />
                        12/次分
                    </p>
                    <p class="t5">
                        <Icon type="ios-checkmark" />
                        35/次
                    </p>
                    <p class="t5">
                        <Icon type="ios-checkmark" />
                        36.9/度
                    </p>
                </div> -->

            </div>
            <Button type="error" size="small" class="stateBtn">一键布防</Button>
        </div>
    </Card>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='less'>
.deviceInfo {
    width: 100%;
    padding-bottom: 1px;
    cursor: pointer;

    .stateBtn {
        width: calc(100% - 20px);
        margin-left: 10px;
        margin-bottom: 10px;
    }

    .title {
        width: 100%;
        height: 26px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .t1 {
            height: 100%;
            font-size: 10px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            padding: 0 2px;
            line-height: 26px;
            border-radius: 4px 0 0 0;
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

        .t2 {
            box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
            border-radius: 0px 0px 8px 8px;
            width: 150px;
            text-align: center;
        }

        .t3 {
            display: flex;

            img {
                display: inline-block;
                width: 26px;
            }
        }
    }

    .deviceBox {
        margin: 10px;
        display: flex;

        img {
            width: 60px;
            height: 60px;
        }

        // .imgInfo {
        //     display: flex;
        //     flex-direction: column;
        //     width: 130px;

        //     .img {
        //         width: 130px;
        //     }

        //     .imgList {
        //         width: 100%;
        //         background: gold;
        //         display: flex;
        //         justify-content: flex-start;
        //         align-items: center;
        //         height: 30px;

        //         img {
        //             width: 20px;
        //             margin-right: 10px;
        //         }
        //     }
        // }

        .info {
            width: 100%;
            padding: 0 10px;

            .t1 {
                font-size: 16px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                color: #1C1B1B;
            }

            .t2 {
                font-size: 14px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                color: #8B8A96;
            }
        }
    }

}
</style>