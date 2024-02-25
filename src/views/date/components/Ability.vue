<template>
    <div class="ability" ref="AbilityRef"></div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import 'echarts-gl';
import { nextTick, onMounted, ref } from 'vue';

const AbilityRef = ref<any>(null)


onMounted(() => {
    nextTick(() => {
        //initChart()
    })
})

const initChart = () => {
    const myChart: any = echarts.init(AbilityRef.value);

    const option = {
        title: {
            text: '3D 环形饼状图',
            subtext: '示例',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['类别1', '类别2', '类别3']
        },
        series: [
            {
                name: '数据名称',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 335, name: '类别1' },
                    { value: 310, name: '类别2' },
                    { value: 234, name: '类别3' }
                ]
            }
        ]
    }

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);

}
</script>

<style scoped lang='less'>
.ability {
    width: 100%;
    height: calc(50vh - 240px);
}
</style>