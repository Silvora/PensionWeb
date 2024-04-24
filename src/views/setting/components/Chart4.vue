<template>
    <div style="width: 100%;">
        <!-- <p>睡着时的体动介于0到100</p> -->
        <p v-if="isInfo">
            {{ t('睡着时的体动介于') }} {{ min }} 到 {{ max }} {{ t('之间') }}
        </p>
        <p v-else>
            {{ t('暂无数据') }}
        </p>
        <div class="box" ref="chartRef">
        </div>
        <!-- <div v-else  class="box">
            {{ t('暂无数据') }}
        </div> -->
    </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { watch } from 'vue';
import { nextTick, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const chartRef = ref<HTMLElement>()
onMounted(() => {
    nextTick(() => {
        initChart()
    })
})

const isInfo = ref(true)
const max = ref(0)
const min = ref(0)
const props: any = defineProps({
    DeviceInfoListInfo: Object
})

watch(() => props.DeviceInfoListInfo, () => {
    if (props.DeviceInfoListInfo) {
        isInfo.value = true
        max.value = Math.max(...props.DeviceInfoListInfo?.d6)
        min.value = Math.min(...props.DeviceInfoListInfo?.d3)
    } else {
        isInfo.value = false
    }
    initChart()

}, { deep: true })

console.log(props)

const initChart = () => {
    const myChart: any = echarts.init(chartRef.value);

    const option = {
        grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            top: '8%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            // data: ['21:00', '23:00', '01:00', '03:00', '05:00', '07:00', '09:00']
            data: props.DeviceInfoListInfo ? props.DeviceInfoListInfo.date : [],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                fontSize: 12
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',


        },
        series: [
            {
                itemStyle: {
                    color: '#FED3B5',
                    borderRadius: [15, 15, 15, 15]
                },
                smooth: false,  // 取消圆点
                symbol: 'none',  // 取消横线
                data: props.DeviceInfoListInfo ? props.DeviceInfoListInfo.d3 : [],
                type: 'line'
            }
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);
    // option && myChart.setOption(option);

}

</script>

<style scoped lang='less'>
.box {
    width: 100%;
    height: 150px;
}
</style>


<!-- <template>
    <div style="width: 100%;">
        <p v-if="props.DeviceInfoListInfo.d3 && props.DeviceInfoListInfo.d6">睡着时的体动介于{{Math.min(...props.DeviceInfoListInfo.d6)}}到{{ Math.min(...props.DeviceInfoListInfo.d3) }}</p>

        <div class="box" ref="chartRef">

        </div>
    </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { nextTick, onMounted, ref, watch } from 'vue';
const chartRef = ref<HTMLElement>()
onMounted(() => {
    nextTick(() => {
        initChart()
    })
})


const props:any = defineProps({
    DeviceInfoListInfo: Object
})

watch(() => props.DeviceInfoListInfo, () => {
    initChart()
})

const initChart = () => {
    const myChart: any = echarts.init(chartRef.value);

    const option = {
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            splitLine: { show: false },
            data:props.DeviceInfoListInfo.date,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        series: [
            {
                name: 'Placeholder',
                type: 'bar',
                stack: 'Total',
                itemStyle: {
                    borderColor: 'transparent',
                    color: 'transparent'
                },
                emphasis: {
                    itemStyle: {
                        borderColor: 'transparent',
                        color: 'transparent'
                    }
                },
                data:props.DeviceInfoListInfo.d3
            },
            {
                name: 'Life Cost',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true,
                    position: 'inside'
                },
                itemStyle: {
                    color: '#FED3B5',
                    borderRadius: [15, 15, 15, 15]
                },
               
                data:props.DeviceInfoListInfo.d6
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
.box {
    width: 100%;
    height: 200px;
}
</style> -->