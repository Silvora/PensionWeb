<template>
  <div class="home">
    <Row :gutter="20">
      <Col span="8" v-for="item in menuList" :key="item.route" class="menuCard">
      <Card :bordered="false" :style="{ 'background': item.color, 'border': '2px solid #fff' }"
        @click="handleNav(item.route)">
        <div class="cardBody">
          <img :src="item.logo" alt="" srcset="">
          <p>{{ item.label }}</p>
        </div>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script setup lang="ts" name="home">
import { ref } from 'vue';
import screen from "@/assets/images/screen.png"
import date from "@/assets/images/date.png"
import room from "@/assets/images/room.png"
import elder from "@/assets/images/elder.png"
import staff from "@/assets/images/staff.png"
import sys from "@/assets/images/sys.png"
import { useRouter } from 'vue-router';

const menuList: any = ref([
  {
    logo: screen,
    label: "看护大屏",
    route: "/screen",
    color: "rgba(132, 190, 174, 1)",

  },
  {
    logo: date,
    label: "数据预警",
    route: "/date",
    color: "rgba(67, 140, 203, 1)",
  },
  {
    logo: room,
    label: "房态图",
    route: "/room",
    color: "rgba(199, 133, 164, 1)",
  },
  {
    logo: elder,
    label: "长者信息",
    route: "/elder",
    color: "rgba(102, 145, 99, 1)",
  },
  {
    logo: staff,
    label: "员工管理",
    route: "/staff",
    color: "rgba(131, 136, 192, 1)",
  },
  {
    logo: sys,
    label: "设备中心",
    route: "/sys",
    color: "rgba(211, 114, 114, 1)",
  }
])

const router = useRouter()
const handleNav = (route: string) => {
  router.push(route)
}

</script>

<style scoped lang="less">
.home {
  display: flex;
  align-items: center;
  height: 100%;

  .menuCard {
    //height: 300px;
    padding: 0;
    margin-bottom: 20px;
    cursor: pointer;

    .cardBody {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 40px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;


      img {
        width: 40%;
        text-align: center;
        padding: 10px 0;
      }
    }

    // background: yellowgreen;

  }


}
</style>
