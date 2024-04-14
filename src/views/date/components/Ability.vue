<template>
    <div class="ability" ref="AbilityRef"></div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
//import 'echarts-gl';
import { nextTick, onMounted, ref } from 'vue';

const AbilityRef = ref<any>(null)


onMounted(() => {
    nextTick(() => {
        initChart()
    })
})

const initChart = () => {
    const myChart: any = echarts.init(AbilityRef.value);

    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            bottom: '-3%',
            textStyle:{
                color: '#fff'
            }
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '30%'],
            center: ['50%', '45%'],
            label: {
              show: true,
              position: 'outside',
              alignTo: 'none',
              bleedMargin: 5
            },
            labelLine: {
              show: true
            },
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            data: [
              { value: 335, name: 'A' },
              { value: 310, name: 'B' },
              { value: 234, name: 'C' },
              { value: 135, name: 'D' },
              { value: 1548, name: 'E' }
            ]
          }
        ]
      }

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);

}
</script>

<style scoped lang='less'>
.ability {
    width: 100%;
    height: calc(50vh - 210px);
    min-height: 200px;
}
</style>