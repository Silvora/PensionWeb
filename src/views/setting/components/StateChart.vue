<template>
    <div class="stateChart" ref="StateChartRef"></div>
</template>

<script setup lang='ts'>
import * as echarts from "echarts"
import { onMounted, ref } from "vue";
import {DeviceTypeRatio} from "@/api/Device/Device"
const StateChartRef = ref(null)
const myChart: any = ref(null)
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const sum = ref(0)
onMounted(() => {

    initChart()
    DeviceTypeRatio({}).then((res: any) => {
        console.log(res)
        res.data.forEach((item: any) => {
            sum.value += item.count
        })
    })

    // window.addEventListener('resize', () => {
    //     myChart.value.resize();
    // });
})

const initChart = () => {
    const myChart: any =  echarts.init(StateChartRef.value);

    const option = {
        color: [
            "rgba(18, 185, 135, 1)",
            "rgba(139, 138, 150, 1)",
            "rgba(224, 98, 85, 1)"
        ],
        tooltip: {
            trigger: 'item',
            confine: true,
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
                radius: ['50%', '70%'],
                center: ['50%', '35%'],
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
                    // formatter: (params) => {
                    //     console.log(params.name)
                    //     return [
                    //         `{a|${params.data.product}}`,
                    //         `{b|${params.data.value}}`
                    //     ].join('\n')
                    // },
                    formatter: (params) => {
                       // console.log(params.name)
                        return [
                            `{a|${sum.value}}`,
                            `{b|${t('设备状态')}}`
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
                    { value: 1048, name: `(340${t('个在线')})`, product: "在线" },
                    { value: 735, name: `(23${t('个离线')})`, product: "离线" },
                    { value: 580, name: `(4${t('个紧急')})`, product: "紧急" },
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
.stateChart {
    width: 100%;
    height: 190px;

}
</style>