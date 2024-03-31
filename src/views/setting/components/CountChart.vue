<template>
    <div class="countChart" ref="CountChartRef"></div>
</template>

<script setup lang='ts'>
import * as echarts from "echarts"
import { onMounted, ref } from "vue";
import {DeviceStateRatio} from "@/api/Device/Device"
const CountChartRef = ref(null)
const myChart: any = ref(null)
onMounted(() => {

    DeviceStateRatio({}).then((res: any) => {
        console.log(res)
    })

    initChart()
    // window.addEventListener('resize', () => {
    //     myChart.value.resize();
    // });
})

const initChart = () => {
    const myChart: any  = echarts.init(CountChartRef.value);

    const option = {
        color: [
            "rgba(19, 100, 248, 1)",
            "rgba(18, 185, 135, 1)",
            "rgba(237, 144, 0, 1)",
            "rgba(224, 98, 85, 1)"
        ],
        tooltip: {
            trigger: 'item',
            confine: true,
        },
        legend: {
            bottom: '5%',
            left: 'center',
            orient: 'vertical',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                fontSize: 10,
                color: 'rgba(28, 27, 27, .5)',
            },
            formatter: (name: any) => {
                return name
            }
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['50%', '30%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: 'center',
                    // ellipsis: '...',
                    // normal: { show: true },
                    // 在文本中，可以对部分文本采用 rich 中定义样式。
                    // 这里需要在文本中使用标记符号：
                    // `{styleName|text content text content}` 标记样式名。
                    // 注意，换行仍是使用 '\n'。
                    // formatter: (params: any) => {
                    //     console.log(params.name)
                    //     return [
                    //         `{a|${params.data.product}}`,
                    //         `{b|${params.data.value}}`
                    //     ].join('\n')
                    // },
                    formatter: (params: any) => {
                        //console.log(params.name)
                        return [
                            `{a|1111}`,
                            `{b|类型统计}`
                        ].join('\n')
                    },


                    rich: {
                        a: {
                            fontSize: 20,
                            color: '#1C1B1B',
                        },
                        b: {

                            color: "rgba(28, 27, 27, .5)",
                            fontSize: 12,
                        }
                    }

                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 10,
                        fontWeight: 'bold',

                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '(25%睡眠雷达)', product: "睡眠雷达" },
                    { value: 735, name: '(25%摔倒监测)', product: "摔倒监测" },
                    { value: 580, name: '(25%温度计)', product: "温度计" },
                    { value: 484, name: '(25%紧急按钮)', product: "紧急按钮" },
                ]
            }
        ]
    };


    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);
}





</script>

<style scoped lang='less'>
.countChart {
    width: 100%;
    height: 250px;
}
</style>