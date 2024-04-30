<template>
    <div class="emptyChart" ref="EmptyChartRef"></div>
</template>

<script setup lang='ts'>
import * as echarts from "echarts"
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const EmptyChartRef = ref(null)
const myChart: any = ref(null)
onMounted(() => {

    initChart()

    window.addEventListener('resize', () => {
        myChart.value.resize();
    });


})

const map: any = ref({
    "(床位有人)": 23,
    "(床位无人)": 32,
    "(预留)": 42,
})

const initChart = () => {
    const myChart: any = echarts.init(EmptyChartRef.value);

    const option = {
        color: [
            "rgba(18, 185, 135, 1)",
            "rgba(139, 138, 150, 1)",
            "rgba(237, 144, 0, 1)",
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
                center: ['50%', '34%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: 'center',
                    // normal: { show: true },
                    // 在文本中，可以对部分文本采用 rich 中定义样式。
                    // 这里需要在文本中使用标记符号：
                    // `{styleName|text content text content}` 标记样式名。
                    // 注意，换行仍是使用 '\n'。
                    formatter: () => {
                        //console.log(params.name)
                        return [
                            `{a|0}`,
                            `{b|${t('总数')}}`,
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
                    { value: 1048, name: '(床位有人)' },
                    { value: 735, name: '(床位无人)' },
                    { value: 580, name: '(预留)' },
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
.emptyChart {
    width: 100%;
    height: 190px;
}
</style>