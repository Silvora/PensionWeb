import { defineStore } from "pinia";
import { ref } from "vue";

export const useMqttStore = defineStore("mqttStore", () => {
  //异常数据
  const errorData = ref<any>({});

  // 3001 离床 3006呼吸异常 3007心率异常 3012在床 3008紧急拉绳
  //实时数据
  const deviceData = ref<any>({});

  //下线数据
  const offlineData = ref<any>({});

  const setNotification = () => {
    if (!("Notification" in window)) {
      return console.log("当前浏览器不支持通知");
    }

    const permission = Notification.permission;
    if (permission === "granted") {
      console.log("已经授权通知，可以进行你的通知啦！");
    } else if (Notification.permission === "default") {
      console.log("用户还未选择同意/拒绝");
      // 下一步请求用户授权
    } else {
      // console.log('用户曾经拒绝授权,不能显示通知');
      Notification.requestPermission((res) => {
        console.log("Notification.requestPermission", res);
      });
    }
  };

  const setData = (type: string, data: any) => {
    switch (type) {
      case "device":
        deviceData.value = data;
        setNotification();
        break;
      case "offline":
        offlineData.value = data;
        break;
      case "error":
        errorData.value = data;
        break;
      default:
        break;
    }
  };

  return {
    setData,
  };
});
