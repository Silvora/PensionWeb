<template>
    <div class="check" ref="CheckRef"></div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { nextTick, onMounted, ref } from 'vue';

const CheckRef = ref<any>(null)


onMounted(() => {
    nextTick(() => {
        initChart()
    })
})

const initChart = () => {
    // 初始化图表
    // ...
    const myChart: any = echarts.init(CheckRef.value);

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        legend: {
            data: ['男', '女'],
            top: '3%',

            textStyle: {
                color: '#fff',// 修改图例文字颜色
            }
        },
        grid: {
            left: '3%',
            right: '3%',
            top: '15%',
            // top: '20%',
            bottom: '4%',
            containLabel: true
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#fff'
            },
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
        xAxis: {
            type: 'category',
            //data: ['男', '女'],
            // color: '#fff',
            // label: {
            //     show: false
            // },
            data: ['60-65', '65-70', '70-75', '75-80', '80-85', '85-90', '90以上'],
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                fontSize: 12,
                color: '#fff'

            },
            splitLine: {
                show: false,
            }
        },
        series: [
            {
                name: '男',
                type: 'bar',
                barWidth: '25%',
                stack: 'total',
                color: '#599FF3',
                //showBackground: true,
                // label: {
                //     show: true
                // },
                emphasis: {
                    focus: 'series'
                },
                data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
                name: '女',
                type: 'bar',
                stack: 'total',
                color: '#FF9021',
                // label: {
                //     show: true
                // },
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            // {
            //     name: '70-75',
            //     type: 'bar',
            //     stack: 'total',
            //     // label: {
            //     //     show: true
            //     // },
            //     emphasis: {
            //         focus: 'series'
            //     },
            //     data: [320, 302, 301, 334, 390, 330, 320]
            // },
            // {
            //     name: '75-80',
            //     type: 'bar',
            //     stack: 'total',
            //     // label: {
            //     //     show: true
            //     // },
            //     emphasis: {
            //         focus: 'series'
            //     },
            //     data: [120, 132, 101, 134, 90, 230, 210]
            // },
            // {
            //     name: '80-85',
            //     type: 'bar',
            //     stack: 'total',
            //     // label: {
            //     //     show: true
            //     // },
            //     emphasis: {
            //         focus: 'series'
            //     },
            //     data: [120, 132, 101, 134, 90, 230, 210]
            // },
            // {
            //     name: '85-90',
            //     type: 'bar',
            //     stack: 'total',
            //     // label: {
            //     //     show: true
            //     // },
            //     emphasis: {
            //         focus: 'series'
            //     },
            //     data: [120, 132, 101, 134, 90, 230, 210]
            // },
            // {
            //     name: '90以上',
            //     type: 'bar',
            //     stack: 'total',
            //     // label: {
            //     //     show: true
            //     // },
            //     emphasis: {
            //         focus: 'series'
            //     },
            //     data: [120, 132, 101, 134, 90, 230, 210]
            // }
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);
}

</script>

<style scoped lang='less'>
.check {
    width: 100%;
    height: calc(50vh - 240px);
    min-height: 200px;
}
</style>