<template>
    <Card :bordered="false" :padding="0" style="background: rgba(255, 255, 255, 1);margin-bottom: 10px;">
        <div class="errInfo">
            <p class="title">
                <span :class="['t1', 'green', 'yellow', 'gary']">空闲</span>
                <span class="t2">a102</span>
                <span class="t3">
                    <img src="@/assets/images/room-setting.png" alt="" srcset="">
                </span>
            </p>
            <div class="errBox">
                <img class="img" src="@/assets/images/screen.png" alt="" srcset="">
                <div class="info">
                    <p class="t1">张玲
                    </p>
                    <p class="t2">
                        <img src="@/assets/images/pad-processing@2x.png" alt="">
                        倪杰
                    </p>
                </div>
            </div>
            <p class="roomTitle">床位：一楼 A101 06床</p>
            <div class="imgList">
                <img src="@/assets/images/睡眠监测@2x(4).png" alt="">
                <img src="@/assets/images/位图@2x(2).png" alt="">
                <img src="@/assets/images/温度计@2x.png" alt="">
                <img src="@/assets/images/紧急按钮@2x.png" alt="">
            </div>
            <Button type="error" size="small" class="stateBtn">心率异常</Button>
        </div>
    </Card>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='less'>
.errInfo {
    width: 100%;
    padding-bottom: 1px;
    cursor: pointer;

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
            width: 90px;
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

    .errBox {
        margin: 10px;
        display: flex;

        img {
            width: 40px;
            height: 40px;
        }

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
                img {
            width: 12px;
            height: 12px;
        }
                font-size: 14px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                color: #1C1B1B;
            }
        }
    }

    .roomTitle {
        width: 100%;
        padding: 10px;
        font-size: 14px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #1C1B1B;
    }

    .imgList {
        display: flex;
        margin-bottom: 10px;
        justify-content: space-around;

        img {
            width: 20px;
            height: 20px;
        }
    }

    .stateBtn {
        width: calc(100% - 20px);
        margin-left: 10px;
        margin-bottom: 10px;
    }

}
</style>