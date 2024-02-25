<template>
    <div class="dateChart" ref="DateChartRef" id="DateChartRef"></div>
</template>

<script setup lang='ts'>
import * as echarts from "echarts"
import { onMounted, ref, nextTick } from "vue";
const DateChartRef = ref(null)
onMounted(() => {

    nextTick(() => {
        initChart()
    })

    // window.addEventListener('resize', () => {
    //     myChart.value.resize();
    // });


})


const initChart = () => {
    //var dom = document.getElementById('DateChartRef');
    const myChart: any = echarts.init(DateChartRef.value);
    const app: any = {};

    let option: any = {};

    const posList = [
        'left',
        'right',
        'top',
        'bottom',
        'inside',
        'insideTop',
        'insideLeft',
        'insideRight',
        'insideBottom',
        'insideTopLeft',
        'insideTopRight',
        'insideBottomLeft',
        'insideBottomRight'
    ];
    app.configParameters = {
        rotate: {
            min: -90,
            max: 90
        },
        align: {
            options: {
                left: 'left',
                center: 'center',
                right: 'right'
            }
        },
        verticalAlign: {
            options: {
                top: 'top',
                middle: 'middle',
                bottom: 'bottom'
            }
        },
        position: {
            options: posList.reduce(function (map: any, pos) {
                map[pos] = pos;
                return map;
            }, {})
        },
        distance: {
            min: 0,
            max: 100
        }
    };
    app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function () {
            const labelOption = {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
            };
            myChart.setOption({
                series: [
                    {
                        label: labelOption
                    },
                    {
                        label: labelOption
                    },
                    {
                        label: labelOption
                    },
                    {
                        label: labelOption
                    }
                ]
            });
        }
    };
    const labelOption = {
        //show: true,
        position: 'top',
        distance: 15,
        align: 'center',
        verticalAlign: 'center',
        rotate: 0,
        formatter: '{c}',
        fontSize: 16,
        rich: {
            name: {}
        }
    };
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '2%',
            right: '2%',
            bottom: '2%',
            top: '14%',
            containLabel: true
        },
        legend: {
            data: ['入住', '退住']
        },
        // toolbox: {
        //   show: true,
        //   orient: 'vertical',
        //   left: 'right',
        //   top: 'center',
        //   feature: {
        //     mark: { show: true },
        //     dataView: { show: true, readOnly: false },
        //     magicType: { show: true, type: ['line', 'bar', 'stack'] },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    fontSize: 8
                },
                splitLine: {
                    show: false,
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
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
            }
        ],
        series: [
            {
                name: '入住',
                type: 'bar',
                barGap: 0,
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                color: 'rgba(18, 185, 135, 1)',
                data: [320, 332, 301, 334, 390, 320, 332, 301, 334, 390, 320, 332]
            },
            {
                name: '退住',
                type: 'bar',
                color: 'rgba(224, 98, 85, 1)',

                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                data: [320, 332, 301, 334, 390, 320, 332, 301, 334, 390, 320, 332]
            },
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);
}


</script>

<style scoped lang='less'>
.dateChart {
    width: 100%;
    height: 170px;
}
</style>