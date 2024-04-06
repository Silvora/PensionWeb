<template>
    <div style="width: 100%;">
        <p v-if="props.DeviceInfoListInfo.d5 && props.DeviceInfoListInfo.d2">
            {{ t('睡眠期间的心率介于') }} {{props.DeviceInfoListInfo?.d5?.length? Math.min(...props.DeviceInfoListInfo?.d5 || ' ')||' - ' :' - '}}到{{ props.DeviceInfoListInfo?.d2?.length?Math.max(...props.DeviceInfoListInfo?.d2)||' - ':' - ' }}{{t('之间')}}</p>
        <div class="box" ref="chartRef">

        </div>
        <!-- <div v-else  class="box">
            {{ t('暂无数据') }}
        </div> -->
    </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { nextTick, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const chartRef = ref<HTMLElement>()
onMounted(() => {
    nextTick(() => {
        initChart()
    })
})


const props: any = defineProps({
    DeviceInfoListInfo: Object
})

watch(() => props.DeviceInfoListInfo, () => {
    initChart()
})

const initChart = () => {
    const myChart: any = echarts.init(chartRef.value);

    const option = {
        // title: {
        //     text: 'Waterfall Chart',
        //     subtext: 'Living Expenses in Shenzhen'
        // },
        // tooltip: {
        //     trigger: 'axis',
        //     axisPointer: {
        //         type: 'shadow'
        //     },
        //     formatter: function (params: any) {
        //         console.log(params)
        //         var tar = params[1];
        //         return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        //     }
        // },
        grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            top: '1%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            splitLine: { show: false },
            // data: ['21:00', '23:00', '01:00', '03:00', '05:00', '07:00', '09:00'],
            data: props.DeviceInfoListInfo.date,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                fontSize: 10
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
                // data: [30, 45, 48, 52, 38, 35,49]
                data: props.DeviceInfoListInfo.d2
            },
            {
                name: 'Life Cost',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true,
                    position: 'inside',
                    color:'#fff'

                },
                itemStyle: {
                    color: 'rgba(224, 98, 85, 1)',
                    borderRadius: [15, 15, 15, 15]
                },
                // emphasis: {
                //     itemStyle: {
                //         color: '#5c6'
                //     }
                // },
                // data: [30, 45, 48, 52, 38, 35,49]
                data: props.DeviceInfoListInfo.d5
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