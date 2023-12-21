<template>
    <Card :bordered="false" padding="0" style="background: rgba(255, 255, 255, 1);margin-bottom: 10px;">
        <div class="userInfo">
            <p class="title">
                <span :class="['t1', 'green', 'yellow', 'gary']">空闲</span>
                <span class="t2">a102</span>
                <span class="t3">
                    <img src="@/assets/images/room-setting.png" alt="" srcset="">
                </span>
            </p>
            <div class="userBox">
                <div class="imgInfo">
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
                </div>
            </div>
        </div>
    </Card>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='less'>
.userInfo {
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

    .userBox {
        margin: 10px;
        display: flex;


        .imgInfo {
            display: flex;
            flex-direction: column;
            width: 130px;

            .img {
                width: 130px;
            }

            .imgList {
                width: 100%;
                background: gold;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 30px;

                img {
                    width: 20px;
                    margin-right: 10px;
                }
            }
        }

        .info {
            width: 100%;
            padding: 0 10px;

            .t4,
            .t5 {
                display: flex;
                width: 100%;
                margin: 2px 0;
                justify-content: space-around;
                align-items: center;
                height: 30px;
            }

            .t5 {
                background: rgba(1, 96, 255, 0.05);
                border-radius: 4px;
            }
        }
    }

}
</style>