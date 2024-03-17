<template>
    <div class="institution">
        <div class="info">

            <div class="box">
                <div class="top">
                    <!-- <img src="@/assets/date/组 17667@2x.png" alt=""> -->
                    <p>健康看护</p>
                </div>
                <div class="buttom">
                    <div class="result">
                        <img src="@/assets/date/组 17668@2x.png" alt="">
                        <p>
                            <span>43</span>
                            <span>设备数</span>
                        </p>
                    </div>
                    <div class="result">
                        <img src="@/assets/date/组 17669@2x.png" alt="">
                        <p>
                            <span>43</span>
                            <span>报警数</span>
                        </p>
                    </div>
                </div>
            </div>

            <div class="box">
                <div class="top">
                    <!-- <img src="@/assets/date/组 17667@2x.png" alt=""> -->
                    <p>紧急求救</p>
                </div>
                <div class="buttom">
                    <div class="result">
                        <img src="@/assets/date/组 17668@2x.png" alt="">
                        <p>
                            <span>43</span>
                            <span>设备数</span>
                        </p>
                    </div>
                    <div class="result">
                        <img src="@/assets/date/组 17669@2x.png" alt="">
                        <p>
                            <span>43</span>
                            <span>报警数</span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
        <div class="center">
            <img src="@/assets/date/图像 99@2x.png" alt="">
        </div>
        <div class="info">

            <div class="box">
                <div class="top">
                    <!-- <img src="@/assets/date/组 17667@2x.png" alt=""> -->
                    <p>行为感知</p>
                </div>
                <div class="buttom">
                    <div class="result">
                        <img src="@/assets/date/组 17668@2x.png" alt="">
                        <p>
                            <span>43</span>
                            <span>设备数</span>
                        </p>
                    </div>
                    <div class="result">
                        <img src="@/assets/date/组 17669@2x.png" alt="">
                        <p>
                            <span>43</span>
                            <span>报警数</span>
                        </p>
                    </div>
                </div>
            </div>

            <div class="box">
                <div class="top">
                    <!-- <img src="@/assets/date/组 17667@2x.png" alt=""> -->
                    <p>智慧护理</p>
                </div>
                <div class="buttom">
                    <div class="result">
                        <img src="@/assets/date/组 17668@2x.png" alt="">
                        <p>
                            <span>43</span>
                            <span>设备数</span>
                        </p>
                    </div>
                    <div class="result">
                        <img src="@/assets/date/组 17669@2x.png" alt="">
                        <p>
                            <span>43</span>
                            <span>报警数</span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='less'>
.institution {
    width: 100%;
    display: flex;
    height: calc(100vh - 535px);
    // min-height: 300px;
    min-height: 290px;
    //height: 290px;
    // background: yellow;

    .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;

        .top {
            position: relative;
            background-image: url('@/assets/date/组 17667@2x.png');
            background-size: 100% 100%;
            width: 100%;
            height: 30px;
            // max-width: 180px;
            min-width: 170px;


            p {
                position: absolute;
                top: 0;
                left: 0;
                height: 30px;
                text-align: center;
                width: 100%;
                // background: red;
                
                line-height: 30px;
                font-size: 16px;
                color: #fff;
            }
        }

        .buttom {
            display: flex;

            img {
                width: 40px;
                height: 40px;
            }

            .result {
                display: flex;

                p {
                    span {
                        display: block;
                        padding: 0 4px;
                        text-align: center;
                        color: #fff;
                        font-size: 12px;
                    }
                }

            }
        }

        // width: ;
    }

    .center {
        max-width: 350px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 80%;
        }
    }

}
</style>