<template>
    <div class="people_box">
        <div class="people" ref="PeopleChartRef">
        </div>
        <!-- <div class="sbw">
            <img src="@/assets/date/sbw.gif" alt="" srcset="">
        </div>
        <p class="p">
            <span>99</span>
            <span>总数</span>
        </p> -->

    </div>
</template>

<script setup lang='ts'>
import * as echarts from "echarts"
import { onMounted, ref,nextTick } from "vue";
const PeopleChartRef = ref(null)

onMounted(() => {

nextTick(() => {
    initChart()
    // initLiquidfillChart()
})
})
const initChart = () => {
    const myChart: any= echarts.init(PeopleChartRef.value);


    const option = {
  tooltip: {
     trigger: 'item',
    // formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    // right: '5%',
    // left: 'right',
    right:"10%",
    top:"5%",
    textStyle:{
        color:"#fff"
    }
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['60%', '30%'],
    //   radius: '70%',  //图的大小
      center: ['30%', '50%'],
      
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10
      },
      label: {
        show: false,
        position: 'center'
      },
    //   emphasis: {
    //     label: {
    //       show: true,
    //       fontSize: 40,
    //       fontWeight: 'bold'
    //     }
    //   },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: ' Ads' },
        { value: 484, name: 'Union' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
};


    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);

}






</script>

<style scoped lang='less'>
.people_box{
    position: relative;
    
    .people {
    width: 100%;
    height: calc(50vh - 220px);
    position: relative;
    min-height: 200px;
   
    }

    .sbw{
        position: absolute;
        left: -1px;
        top: 20px;
        border-radius: 50%;
        img{
            width: 180px;
        }
    }
    .p{
        position: absolute;
        left: 25px;
        top: 53px;
        color: #fff;
        display: flex;
        flex-direction: column;
        text-align: center;
        // background: red;
        width: 128px;
        span:nth-child(1){
            font-size: 22px;
        }
    }
}

</style>