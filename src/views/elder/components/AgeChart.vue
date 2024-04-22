<template>
    <div class="ageChart" ref="AgeChartRef"></div>
</template>

<script setup lang='ts'>
import * as echarts from "echarts"
import { onMounted, ref, nextTick } from "vue";
const AgeChartRef = ref(null)
onMounted(() => {

    nextTick(() => {
        initChart()
    })

    // window.addEventListener('resize', () => {
    //     myChart.value.resize();
    // });


})

const map: any = ref({
    "(30岁以下)": 23,
    "(31～40岁)": 32,
    "(41～50岁)": 42,
    "(51～60岁)": 32,
    "(60岁以上)": 32,
})

const initChart = () => {
    const myChart: any = echarts.init(AgeChartRef.value);

    const option = {
        color: [
            "rgba(18, 185, 135, 1)",
            "rgba(54, 153, 148, 1)",
            "rgba(237, 144, 0, 1)",
            "rgba(75, 169, 225, 1)",
            "rgba(62, 90, 200, 1)"
        ],
        tooltip: {
            trigger: 'item',
            confine: true,
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
                return map.value[name] + '% ' + name
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
                            `{a|0}`,
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
                    { value: 12, name: '(30岁以下)' },
                    { value: 2, name: '(31～40岁)' },
                    { value: 2, name: '(41～50岁)' },
                    { value: 1, name: '(51～60岁)' },
                    { value: 32, name: '(60岁以上)' },
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
.ageChart {
    width: 100%;
    height: 230px;
}
</style>