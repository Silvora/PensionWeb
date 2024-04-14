import { defineStore } from "pinia";
import { ref } from "vue";
// import Notify from "@wcjiang/notify";
import logo from '@/assets/images/logo.png'
import * as mqtt from "mqtt/dist/mqtt";

export const useMqttStore = defineStore("mqttStore", () => {
    //异常数据
    const errorData = ref<any>({});

    // 3001 离床 3006呼吸异常 3007心率异常 3012在床 3008紧急拉绳
    //实时数据
    const deviceData = ref<any>({});

    //下线数据
    const offlineData = ref<any>({});

    const client = ref<any>(null);

    const topic = ref<any>([
        'retirement/device/offline/1',
        'retirement/device/eventData/1',
        'retirement/device/currentDataReply/1']);

    const player = (msg:any,data:any) => {
        const notice = new Notification('乎感消息提示', {
            body: `乎感提醒：${msg}`,
            icon: logo,
            renotify: false, // 重复的 tag 是否再次通知，默认 false 不重复通知
            requireInteraction: false, // 是否强制手动关闭，默认 false 会自动关闭
            silent: false, // 是否静音
            image: logo,
            vibrate: [200, 100, 200],
            data
          })
          notice.onshow = function () {
            // console.log('show')
            // setTimeout(notice.close.bind(notice), 3000) //五秒后自动关闭
          }
          notice.onclick = function (data:any) {
            //do something

            console.log("ddas",data)
          }
           notice.onclose = function () {
            // console.log('close')
           }
           notice.onerror = function () {
            //  console.log('error')
           }
 
       
    }


    const setNotification = (data: any) => {


        let ed713_type= {
            // 3001 离床 3006呼吸异常 3007心率异常 3012在床 3008紧急拉绳
            "3001": `您绑定的护眠仪检测到无人状态`,
            // {
            //     '0':'您绑定的护眠仪检测到无人状态',
            //     '1':'您绑定的护眠仪检测到有人活动'
            // },
            "3006": `您绑定的护眠仪呼吸过${data.respiratoryRate?'低':'高'}，请注意查看关注`,
            // {
            //     '0':'您绑定的护眠仪呼吸过低，请注意查看关注',
            //     '1':'您绑定的护眠仪呼吸过高，请注意查看关注'
            // },
            "3007": `您绑定的护眠仪心率过${data.heartRate?'低':'高'}，请注意查看关注`,
            // {
            //     '0':'您绑定的护眠仪心率过低，请注意查看关注',
            //     '1':'您绑定的护眠仪心率过高，请注意查看关注'
            // },
            "3012": `您绑定的护眠仪监测到已离床`,
            // {
            //     '0':'您绑定的护眠仪监测到已离床',
            //     '1':''
            // },
            "3008":`您绑定的护眠仪紧急报警，请注意查看关注`,
            //  {
            //     '0':'',
            //     '1':'您绑定的护眠仪紧急报警，请注意查看关注'
            // },
            "3009":`您绑定的护眠仪睡眠报告已生成，请前往APP查看`,
            // {
            //     '0':'您绑定的护眠仪睡眠报告已生成，请前往APP查看',
            //     '1':'您绑定的护眠仪周报告已生成，请前往APP查看',
            //     '2':"您绑定的护眠仪月报告已生成，请前往APP查看"
            // }
        }
        let x1_type = {
            "0":"您绑定的设备跌倒设备检测到无人状态",
            "1":"您绑定的设备跌倒设备监测到有人活动",
            "2":"您绑定的设备跌倒报警，请注意查看关注"
        }

        let map:any = {
            "ed713_type": ed713_type,
            "x1_type": x1_type
        }

        // console.log(data.type,map[data.type],data.eventType)


        if (!("Notification" in window)) {
            return console.log("当前浏览器不支持通知");
        }

        const permission = Notification.permission;
        if (permission === "granted") {
            console.log("已经授权通知，可以进行你的通知啦！");
           player(map[data.type][data.eventType],data);

        } else if (Notification.permission === "default") {
            console.log("用户还未选择同意/拒绝");
        } else {
            Notification.requestPermission((res) => {
                console.log("Notification.requestPermission", res);
            });
        }
    };

    const setData = (type: string, data: any) => {
        switch (type) {
            case "device":
                deviceData.value = data;
                setNotification(data);
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

    const initMqtt = () => {
        const options = {
            protocol: "ws",
            host: "8.217.217.243",
            port: 15675,
            clientId: "mqtt_" + Math.random().toString(16).substring(2, 8),
            username: "hjy",
            password: "hjy123",
            clean: true,
            connectTimeout: 6 * 1000,
            reconnectPeriod: 6000,
        };
    
        const connectUrl = `${options.protocol}://${options.host}:${options.port}/ws`;
    
        client.value = mqtt.connect(connectUrl, options)
        client.value.on('error', (error: any) => {
          console.log(error);
        });
        client.value.on('reconnect', (error: any) => {
          console.log(error);
        });
    }

     //取消订阅
  const unsubscribes =()=> {
    client.value.unsubscribe(topic.value, (error: any) => {
      if (!error) {
        console.log(topic.value, '取消订阅成功');
      } else {
        console.log(topic.value, '取消订阅失败',error);
      }
    });
  }


   //连接
   const link=()=> {
    client.value.on('connect', (e:any) => {
      console.log("连接成功！！！", e)
      client.value.subscribe(topic.value, (error: any) => {
        if (!error) {
          console.log('订阅成功');
        } else {
          console.log('订阅失败',error);
        }
      });
    });
  }
  //收到的消息
  const get =()=> {
     //       mqtt.value.get((topic: any, message: any) => {
    //           console.log('收到来自', topic, '的消息', JSON.parse(message.toString()))

    //           let data = JSON.parse(message.toString())
    //           //设备下线
    //           if(topic === 'retirement/device/offline/1'){
    //             mqttStore.setData('offline',data)
    //           }
    //           //异常警告
    //           if(topic === 'retirement/device/eventData/1'){
    //             mqttStore.setData('error',data)
    //           }
    //           //设备实时数据
    //           if(topic === 'retirement/device/currentDataReply/1'){
    //             mqttStore.setData('device',data)
    //           }
    //       })
    // }
    client.value.on('message', (topic: any, message: any) => {
           console.log('收到来自', topic, '的消息', JSON.parse(message.toString()))

              let data = JSON.parse(message.toString())
              //设备下线
              if(topic === 'retirement/device/offline/1'){
                setData('offline',data)
              }
              //异常警告
              if(topic === 'retirement/device/eventData/1'){
                setData('error',data)
              }
              //设备实时数据
              if(topic === 'retirement/device/currentDataReply/1'){
                setData('device',data)
              }
    });
  }
  //结束链接
  const over=()=> {
    client.value.end();
  }

    return {
        client,
        setData,
        initMqtt,
        unsubscribes,
        link,
        get,
        over
    };
});
