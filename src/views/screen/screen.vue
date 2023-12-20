<template>
    <div class="screen">
        <div class="bar"></div>
        <div class="box">
            <div class="focus">
                <div class="title">
                    <span>重点关注老人</span>
                    <span>
                        <Button type="primary" >添加人员</Button>
                    </span>
                </div>
                <div class="list"></div>
            </div>
            <div class="bed">
                <div class="title">
                    <span class="p">床位管理</span>
                    <span class="alert">
                        <Alert type="error">An error prompt</Alert>
                        <Button type="primary" >全部日志</Button>
                    </span>
                </div>
                <div class="list"></div>
            </div>
        </div>
        <p class="footer">深圳海吉雅健康科技有限公司 技术支持</p>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
    .screen{
        width:100%;
        height:calc(100vh - 60px);
        background:#D4F2FA;
        .bar{
            width:100%;
            height:60px;
            background:#fff;
        }
        .box{
            width:100%;
            height:calc(100vh - 150px);
            display: flex;
            justify-content: space-around;
            .focus{
                width: 21%;
                padding:20px 7px 0 20px;
                .title{
                    display:flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom:20px;
                }
                .list{
                    width:100%;
                    height:calc(100% - 52px);
                    
                    background: rgba(255,255,255,0.3);

                }
            }
            .bed{
                width: 79%;
                padding:20px 20px 0 7px;
                .title{
                    display:flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom:18px;
                    .p{
                        width:100px;
                    }
                    .alert{
                        width: 500px;
                        display:flex;
                        justify-content: space-between;
                        align-items: center;
                        .ivu-alert{
                            width:400px;
                            margin-bottom:0;
                        }
                    }
                }
                .list{
                    height:calc(100% - 52px);
                    background: rgba(255,255,255,0.3);

                }
            }
        }
        .footer {

width: 100%;

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