<template>
    <div class="sexChart" ref="SexChartRef"></div>
</template>

<script setup lang='ts'>
import * as echarts from "echarts"
import { onMounted, ref } from "vue";
const SexChartRef = ref(null)
const myChart: any = ref(null)
onMounted(() => {

    initChart()

    window.addEventListener('resize', () => {
        myChart.value.resize();
    });
})

const map: any = ref({
    "男": 23,
    "女": 32
})

const initChart = () => {
    const myChart: any = echarts.init(SexChartRef.value);

    const option = {
        color: [
            "rgba(246, 205, 158, 1)",
            "rgba(239, 135, 135, 1)",
        ],
        tooltip: {
            trigger: 'item',
            confine: true,

        },
        legend: {
            bottom: '2%',
            left: 'center',
            orient: 'vertical',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                fontSize: 10,
                color: 'rgba(28, 27, 27, .5)',
            },
            formatter: (name: any) => {
                return map.value[name] + '% ' + name
            }
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['50%', '40%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: 'center',
                    //normal: { show: true },
                    // 在文本中，可以对部分文本采用 rich 中定义样式。
                    // 这里需要在文本中使用标记符号：
                    // `{styleName|text content text content}` 标记样式名。
                    // 注意，换行仍是使用 '\n'。
                    formatter: () => {
                        return [
                            `{a|0}`,
                            `{b|总数}`
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
                    { value: 1048, name: '男' },
                    { value: 735, name: '女' },
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
.sexChart {
    width: 100%;
    height: 165px;
}
</style>