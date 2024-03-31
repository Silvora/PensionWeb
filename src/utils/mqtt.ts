import * as mqtt from 'mqtt';
class MQTT {
  url: string; // mqtt地址
  topic: string; //订阅地址
  client!: any;
  constructor(topic: string) {
    this.topic = topic;
    // 虽然是mqtt但是在客户端这里必须采用websock的链接方式
    this.url = 'ws://8.217.217.243:1883';
  }

  //初始化mqtt
  init() {
    const options = {
      clean: true,
      clientId: 'client_'+Math.random()*10000000,
      password: 'hjy123',
      username: 'hjy',
      reconnectPeriod: 1000, // 重连时间间隔
      connectTimeout: 10000, // 超时时间
    };

    this.client = mqtt.connect(this.url, options);
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
    this.client.on('connect', () => {
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

