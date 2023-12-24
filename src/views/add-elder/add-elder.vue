<template>
    <div class="add-elder">

        <div class="bar">
            <div></div>
            <div class="steps">
                <Button type="text" icon="ios-person">基础信息登记</Button>  > 
                <Button type="text" icon="ios-person">家属信息登记</Button>  > 
                <Button type="text" icon="ios-person">健康信息登记</Button>  > 
                <Button type="text" icon="ios-person">健康信息登记</Button>  > 
                <Button type="text" icon="ios-person">餐饮床位选择</Button>  > 
                <Button type="text" icon="ios-person">合同管理</Button>  > 
                <Button type="text" icon="ios-person">入院缴费</Button> 
            </div>
            <div>
                <Button type="primary">下一步</Button>     
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
.add-elder{
    width: 100%;
    height: calc(100vh - 90px);
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
        padding: 0 20px;

        .steps {
           width: calc(100% - 300px);
        //    background:red;
           text-align: center;
           font-size: 14px;
font-family: PingFangSC, PingFang SC;
font-weight: 400;
color: #1C1B1B;
        }
    }
}
</style>