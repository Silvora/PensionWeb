<template>
    <div class="study">
        <div class="left" ref="LeftChartRef"></div>
        <div class="right" ref="RightChartRef"></div>
    </div>
</template>

<script setup lang='ts'>
import * as echarts from "echarts"
import { onMounted, ref,nextTick } from "vue";
import { StaffJobLevelRatio } from "@/api/Staff/Staff"
import { useI18n } from "vue-i18n"
const LeftChartRef = ref(null)
const RightChartRef = ref(null)
const { t } = useI18n()


onMounted(() => {

    // window.addEventListener('resize', () => {
    //     myChart.value.resize();
    // });

    // StaffJobLevelRatio().then((res: any) => {
    //     let obj: any = []
    //     let s: any = 0
    //     // let list = ["(三级)", "(二级)", "(一级)", "(特一级)", "(特二级)", "(特三级)", "(专需护理)"]
    //     let list = [{
    //         value: 0,
    //         name: '三级',
    //         percentage: '0'
    //     }, {
    //         value: 0,
    //         name: '二级',
    //         percentage: '0'
    //     }, {
    //         value: 0,
    //         name: '一级',
    //         percentage: '0'
    //     }, {
    //         value: 0,
    //         name: '特一级',
    //         percentage: '0'
    //     }, {
    //         value: 0,
    //         name: '特二级',
    //         percentage: '0'
    //     }, {
    //         value: 0,
    //         name: '特三级',
    //         percentage: '0'
    //     }, {
    //         value: 0,
    //         name: '专需护理',
    //         percentage: '0'
    //     }]
    //     res.data.forEach((item: any) => {
    //         // obj.push({
    //         //     value: item.totalCount,
    //         //     name: list[item.type],
    //         //     ...item
    //         // })
    //         // obj.push({
    //         //     value: item.totalCount,
    //         //     name: list[item.type + 2],
    //         //     ...item
    //         // })

    //         list[item.type].value = item.totalCount || 0
    //         list[item.type].percentage = item.percentage + '%'


    //         s += item.totalCount || 0
    //     })
    //     // obj.push({
    //     //     ...obj[0],
    //     //     value: 1,
    //     //     name: '(专需护理)',
    //     // })


    //     map.value = list
    //     sum.value = s

    //     initChart()

    // })

    nextTick(() => {
        initLeftChart()
        initRightChart()
    })


})

// const map: any = ref({
//     "(三级)": 23,
//     "(二级)": 32,
//     "(一级)": 42,
//     "(特一级)": 32,
//     "(特二级)": 32,
//     "(特三级)": 32,
//     "(专需护理)": 32,
// })

const initLeftChart = () => {
    const myChart: any= echarts.init(LeftChartRef.value);


    const option = {
  series: [
    {
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      pointer: {
        show: false
      },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          borderWidth: 1,
          borderColor: '#464646',
          
        }
      },
      axisLine: {
        lineStyle: {
        //    width: 10,
        //     color: [[1, 'rgba(0, 0, 0, 0)']],
        //     borderColor: '#464646',
        width: 10,
    color: [[1, 'rgba(0, 0, 0, 0.1)']], // 圆圈颜色
    borderWidth: 1, // 边框宽度
    borderColor: '#000000' // 边框颜色

        },
        
      },
      splitLine: {
        show: false,
        distance: 0,
        length: 10,
        
      },
      axisTick: {
        show: false,
        
      },
      axisLabel: {
        show: false,
        distance: 50,
      },
      data: [{
    value: 20,
    name: t('平均在线学习时长'),
    title: {
      offsetCenter: ['0%', '120%'],
      color: '#fff'

    },
    detail: {
      valueAnimation: true,
      offsetCenter: ['0%', '0%']
    },
    itemStyle: {
    color: '#006CFF' // 设置数据的颜色为橙色
  }
  }],
      title: {
        fontSize: 14
      },
      detail: {
        width: 50,
        height: 14,
        fontSize: 24,
        color: '#47DDFD',
        // borderColor: 'inherit',
        // borderRadius: 20,
        // borderWidth: 1,
        formatter: '{value}'
      }
    }
  ]
};


    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);

}
const initRightChart = () => {
    const myChart: any= echarts.init(RightChartRef.value);


    const option = {
  series: [
    {
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      pointer: {
        show: false
      },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          borderWidth: 0,
          borderColor: '#464646',
          
        }
      },
      axisLine: {
        lineStyle: {
        //    width: 10,
        //     color: [[1, 'rgba(255, 255, 0, 0)']],
        //     borderColor: '#464646',
        width: 10,
    color: [[1, 'rgba(0, 0, 0, 0.1)']], // 圆圈颜色
    borderWidth: 1, // 边框宽度
    borderColor: '#000000' // 边框颜色

        },
        
      },
      splitLine: {
        show: false,
        distance: 0,
        length: 10,
        
      },
      axisTick: {
        show: false,
        
      },
      axisLabel: {
        show: false,
        distance: 50,
      },
      data: [{
    value: 20,
    name: t('累计在线学习时长'),
    title: {
      offsetCenter: ['0%', '120%'],
      color: '#fff'
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ['0%', '0%']
    },
    itemStyle: {
    color: '#06DFFC' // 设置数据的颜色为橙色
  }
  }],
      title: {
        fontSize: 14
      },
      detail: {
        width: 50,
        height: 14,
        fontSize: 24,
        color: '#47DDFD',
        // borderColor: 'inherit',
        // borderRadius: 20,
        // borderWidth: 1,
        formatter: '{value}'
      }
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
.study {
    width: 100%;
    height: calc(50vh - 210px);
    min-height: 200px;
    display: flex;
    div{
        flex:1;
        height: 100%;
    }
}
</style>