<template>
    <div class="levelChart" ref="LevelChartRef"></div>
</template>

<script setup lang='ts'>
import * as echarts from "echarts"
import { onMounted, ref, nextTick } from "vue";
const LevelChartRef = ref(null)
onMounted(() => {

    nextTick(() => {
        initChart()
    })



})


const initChart = () => {
    const myChart: any = echarts.init(LevelChartRef.value);

    const option = {
        tooltip: {
            trigger: 'axis',
            show: true,
            axisPointer: {
                type: 'shadow'
            },
        },
        grid: {
            left: '2%',
            right: '2%',
            bottom: '2%',
            top: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['三级', '二级', '一级', '特一级', '特二级', '特三级', '专需护理'],
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
                barWidth: '40%',
                name: "数据",
                // stack: 'Total',
                // color: '#000',
                // label: {
                //     show: true,
                //     position: 'top'
                // },
                data: [
                    {
                        value: 200,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#12B987' },
                                { offset: 1, color: 'rgba(18,185,135,0)' }
                            ])
                        }
                    },
                    {
                        value: 200,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#129173' },
                                { offset: 1, color: 'rgba(18,145,115,0)' }
                            ])
                        }
                    },
                    {
                        value: 100,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#11685F' },
                                { offset: 1, color: 'rgba(17,104,95,0)' }
                            ])
                        }
                    },
                    {
                        value: 200,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#ED9000' },
                                { offset: 1, color: 'rgba(237,144,0,0)' }
                            ])
                        }
                    },
                    {
                        value: 200,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#AC7415' },
                                { offset: 1, color: 'rgba(172,116,21,0)' }
                            ])
                        }
                    },
                    {
                        value: 200,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#69592A' },
                                { offset: 1, color: 'rgba(105,89,42,0)' }
                            ])
                        }
                    },
                    {
                        value: 200,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#E06255' },
                                { offset: 1, color: 'rgba(224,98,85,0)' }
                            ])
                        }
                    },
                ],
                type: 'bar'
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
.levelChart {
    width: 100%;
    height: 170px;
}
</style>