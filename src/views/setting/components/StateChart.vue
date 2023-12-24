<template>
    <div class="stateChart" ref="StateChartRef"></div>
</template>

<script setup lang='ts'>
import * as echarts from "echarts"
import { onMounted, ref } from "vue";
const StateChartRef = ref(null)
const myChart: any = ref(null)
onMounted(() => {

    initChart()

    window.addEventListener('resize', () => {
        myChart.value.resize();
    });


})

const initChart = () => {
    myChart.value = echarts.init(StateChartRef.value);

    const option = {
        color: [
            "rgba(18, 185, 135, 1)",
            "rgba(139, 138, 150, 1)",
            "rgba(224, 98, 85, 1)"
        ],
        tooltip: {
            trigger: 'item',
        },
        legend: {
            bottom: '3%',
            left: 'center',
            orient: 'vertical',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                fontSize: 10,
                color: 'rgba(28, 27, 27, .5)',
            },
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['50%', '30%'],
                center: ['50%', '30%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center',
                    ellipsis: '...',
                    // normal: { show: true },
                    // 在文本中，可以对部分文本采用 rich 中定义样式。
                    // 这里需要在文本中使用标记符号：
                    // `{styleName|text content text content}` 标记样式名。
                    // 注意，换行仍是使用 '\n'。
                    formatter: (params) => {
                        console.log(params.name)
                        return [
                            `{a|${params.data.product}}`,
                            `{b|${params.data.value}}`
                        ].join('\n')
                    },

                    rich: {
                        a: {
                            fontSize: 12,
                            color: '#1C1B1B',
                        },
                        b: {

                            color: "rgba(28, 27, 27, .5)",
                            fontSize: 10,
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
                    { value: 1048, name: '(340个在线)', product: "在线" },
                    { value: 735, name: '(23个离线)', product: "离线" },
                    { value: 580, name: '(4个紧急)', product: "紧急" },
                ]
            }
        ]
    };


    option && myChart.value.setOption(option);
}


</script>

<style scoped lang='less'>
.stateChart {
    width: 100%;
    height: 190px;
}
</style>