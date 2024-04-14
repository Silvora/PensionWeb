import * as mqtt from "mqtt/dist/mqtt";

class MQTT {
  topic: any; //订阅地址
  client: any;

  constructor() {
    this.topic = [
      'retirement/device/offline/1',
      'retirement/device/eventData/1',
      'retirement/device/currentDataReply/1']
    // this.topic = topic;
    // 虽然是mqtt但是在客户端这里必须采用websock的链接方式
    // this.url = 'ws://127.0.0.1:1883/mqtt';
  }

  //初始化mqtt
  init() {
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

    this.client = mqtt.connect(connectUrl, options)
    this.client.on('error', (error: any) => {
      console.log(error);
    });
    this.client.on('reconnect', (error: any) => {
      console.log(error);
    });
  }
  //取消订阅
  unsubscribes() {
    this.client.unsubscribe(this.topic, (error: any) => {
      if (!error) {
        console.log(this.topic, '取消订阅成功');
      } else {
        console.log(this.topic, '取消订阅失败',error);
      }
    });
  }


   //连接
   link() {
    this.client.on('connect', (e:any) => {
      console.log("连接成功！！！", e)
      this.client.subscribe(this.topic, (error: any) => {
        if (!error) {
          console.log('订阅成功');
        } else {
          console.log('订阅失败',error);
        }
      });
    });
  }
  //收到的消息
  get(callback: any) {
    this.client.on('message', callback);
  }
  //结束链接
  over() {
    this.client.end();
  }
}
export default MQTT;

