<template>
    <div class="dateChart" ref="DateChartRef"></div>
</template>

<script setup lang='ts'>
import * as echarts from "echarts"
import { onMounted, ref } from "vue";
const DateChartRef = ref(null)
const myChart: any = ref(null)
onMounted(() => {

    initChart()

    window.addEventListener('resize', () => {
        myChart.value.resize();
    });


})


const initChart = () => {
    myChart.value = echarts.init(DateChartRef.value);

    const option = {
        tooltip: {
            trigger: 'axis',
            show: true,
            axisPointer: {
                type: 'shadow'
            },
            formatter: '111111'

        },
        legend: {},
        grid: {
            left: '2%',
            right: '2%',
            bottom: '2%',
            top: '14%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                fontSize: 8
            },
            splitLine: {
                show: false,
            }
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            splitLine: {
                show: false, // 隐藏分割线
            }
        },
        series: [
            {
                name: '入住',
                type: 'bar',
                barGap: 0,
                // label: labelOption,
                // emphasis: {
                //     focus: 'series'
                // },
                color: 'rgba(18, 185, 135, 1)',
                data: [320, 332, 301, 334, 390, 320, 332, 301, 334, 390, 320, 332]
            },
            {
                name: '退住',
                type: 'bar',
                color: 'rgba(224, 98, 85, 1)',

                // label: labelOption,
                // emphasis: {
                //     focus: 'series'
                // },
                data: [320, 332, 301, 334, 390, 320, 332, 301, 334, 390, 320, 332]
            },
        ]
    };

    option && myChart.value.setOption(option);
}


</script>

<style scoped lang='less'>
.dateChart {
    width: 100%;
    height: 170px;
}
</style>