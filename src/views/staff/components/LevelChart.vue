<template>
    <div class="ageChart" ref="AgeChartRef"></div>
</template>

<script setup lang='ts'>
import * as echarts from "echarts"
import { onMounted, ref } from "vue";
const AgeChartRef = ref(null)
const myChart: any = ref(null)
onMounted(() => {

    initChart()

    window.addEventListener('resize', () => {
        myChart.value.resize();
    });


})

const map: any = ref({
    "(三级)": 23,
    "(二级)": 32,
    "(一级)": 42,
    "(特一级)": 32,
    "(特二级)": 32,
    "(特三级)": 32,
    "(专需护理)": 32,
})

const initChart = () => {
    myChart.value = echarts.init(AgeChartRef.value);

    const option = {
        color: [
            "rgba(18, 185, 135, 1)",
            "rgba(54, 153, 148, 1)",
            "rgba(237, 144, 0, 1)",
            "rgba(75, 169, 225, 1)",
            "rgba(62, 90, 200, 1)",
            "RGBA(144, 85, 224, 1)",
            "RGBA(224, 98, 85, 1)"
        ],
        tooltip: {
            trigger: 'item',
            // formatter: '{b}: {c}<br />{d}',
            // formatter: (params: any) => {
            //     console.log(params)
            //     return [
            //         `{a|${params.data.product}}`,
            //         `{b|${params.data.value}}`
            //     ].join('\n')
            // },
            // rich: {
            //     a: {
            //         fontSize: 12,
            //         color: '#1C1B1B',
            //     },
            //     b: {

            //         color: "rgba(28, 27, 27, .5)",
            //         fontSize: 10,
            //     }
            // }
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
                return '12人' + map.value[name] + '% ' + name
            }
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['50%', '28%'],
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
                            `{a|2121}`,
                            `{b|总数}`,
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
                    { value: 12, name: '(三级)' },
                    { value: 2, name: '(二级)' },
                    { value: 2, name: '(一级)' },
                    { value: 1, name: '(特一级)' },
                    { value: 32, name: '(特二级)' },
                    { value: 1, name: '(特三级)' },
                    { value: 32, name: '(专需护理)' },
                ]
            }
        ]
    };


    option && myChart.value.setOption(option);
}


</script>

<style scoped lang='less'>
.ageChart {
    width: 100%;
    height: 330px;
}
</style>