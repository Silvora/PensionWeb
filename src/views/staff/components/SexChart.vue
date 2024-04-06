<template>
    <div class="sexChart" ref="SexChartRef">
    </div>
</template>

<script setup lang='ts'>
import * as echarts from "echarts"
import { onMounted, ref, nextTick } from "vue";
import { StaffGenderRatio } from "@/api/Staff/Staff"
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const SexChartRef = ref(null)
const myChart: any = ref(null)


const map: any = ref()
const sum: any = ref(0)


onMounted(() => {


    window.addEventListener('resize', () => {
        myChart.value.resize();
    });



    StaffGenderRatio().then((res: any) => {
        let obj: any = []
        let s: any = 0
        res.data.forEach((item: any) => {
            if (item.type == 1) {
                obj.push({ value: item.totalCount || 0, name: t('男'), ...item })
            }
            if (item.type == 2) {
                obj.push({ value: item.totalCount || 0, name: t('女'), ...item })
            }
            s += item.count || 0
        })

        map.value = obj
        sum.value = s

        nextTick(() => {
            initChart()
        })

    })

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
                return map.value.find((it: any) => it.name == name).percentage + '% ' + name
            }
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['62%', '36%'],
                center: ['50%', '36%'],
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
                            `{a|${sum.value}}`,
                            `{b|${t('总数')}}`
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
                data: map.value
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
    height: 180px;
}
</style>