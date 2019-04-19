import Base from '../components/iview/base';
import config from '../config';

const featureSocketUtil = {
  initWebSocketClient: (updateFeatureInfo) => {
    wx.connectSocket({
      url: config.WEB_SOCKET_ROOT,
      success: () => {
        console.log('==webSocket server connect success');
        featureSocketUtil.initWebSocketEventHandler(updateFeatureInfo);
      },
      fail: (e) => {
        console.error(e);
        Base.$Toast({
          content: `服务器连接失败: ${e}`,
          duration: 3,
          mask: false
        });
      }
    });
  },
  initWebSocketEventHandler: (updateFeatureInfo) => {
    // 接收数据
    wx.onSocketMessage(({ data }) => {
      data = data.toString();
      console.log(`webSocket server receiver data: ${data}`);

      // 是否是判断智能家居-是否连接
      if (data.indexOf('hasSocket') > -1) {
        const flag = data.split('-')[1];
        // 防止多次调用方法
        updateFeatureInfo({ hasSocket: flag, initHasSocketIdFlag: true });
        return;
      }

      // 是否是警告通知
      if (data.indexOf('call1') > -1) {
        if (data.split('-')[1] === '1') {
          Base.$Toast({
            content: '报警系统1已打开',
            duration: 3,
            mask: false
          });
        }
        return;
      }
      if (data.indexOf('smoke1') > -1) {
        if (data.split('-')[1] === '1') {
          Base.$Toast({
            content: '烟雾报警系统1已打开',
            duration: 3,
            mask: false
          });
        }
        return;
      }

      // 将数据保存到 reudx 中
      // 主控制
      if (data.indexOf('door1') > -1) {
        updateFeatureInfo({ door1: data.split('-')[1] === '1' });
        return;
      }

      // 厨房
      if (data.indexOf('LED1') > -1) {
        updateFeatureInfo({ LED1: data.split('-')[1] === '1' });
        return;
      }

      // 客厅
      if (data.indexOf('LED2') > -1) {
        updateFeatureInfo({ LED2: data.split('-')[1] === '1' });
        return;
      }
      if (data.indexOf('fan1') > -1) {
        updateFeatureInfo({ fan1: data.split('-')[1] });
        return;
      }
      if (data.indexOf('tem1') > -1) {
        updateFeatureInfo({ tem1: data.split('-')[1] });
        return;
      }
      if (data.indexOf('tem-hum1') > -1) {
        updateFeatureInfo({
          temHum1Tem: data.split('-')[2],
          temHum1Hum: data.split('-')[3]
        });
        return;
      }

      // 餐厅
      if (data.indexOf('LED3') > -1) {
        updateFeatureInfo({ LED3: data.split('-')[1] === '1' });
        return;
      }

      // 阳台
      if (data.indexOf('LED4') > -1) {
        updateFeatureInfo({ LED4: data.split('-')[1] === '1' });
        return;
      }
      if (data.indexOf('cur1') > -1) {
        updateFeatureInfo({ cur1: data.split('-')[1] === '1' });
        return;
      }

      // 主卧
      if (data.indexOf('LED5') > -1) {
        updateFeatureInfo({ LED5: data.split('-')[1] === '1' });
        return;
      }
      if (data.indexOf('cur2') > -1) {
        updateFeatureInfo({ cur2: data.split('-')[1] === '1' });
        return;
      }

      // 次卧
      if (data.indexOf('LED6') > -1) {
        updateFeatureInfo({ LED6: data.split('-')[1] === '1' });
        return;
      }

      // 洗手间
      if (data.indexOf('LED7') > -1) {
        updateFeatureInfo({ LED7: data.split('-')[1] === '1' });
        return;
      }

      // 提示返回的数据
      Base.$Toast({
        content: `命令识别失败: ${data}`,
        duration: 3,
        mask: false
      });
    });

    wx.onSocketClose((e) => {
      Base.$Toast({
        content: '智能家居-连接关闭',
        duration: 1,
        mask: false
      });
      // 跳转至登陆页
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/account/sign-in/index'
        });
      }, 1111);
      console.log('==webSocket server connect close', e);
    });

    wx.onSocketError((e) => {
      Base.$Toast({
        content: `服务器连接错误: ${JSON.stringify(e)}`,
        duration: 3,
        mask: false
      });
    });
  },
  sendWebSocketData: (data) => {
    // 发送数据
    wx.sendSocketMessage({
      data,
      fail: (e) => {
        console.log(`发送数据失败${e}`);
      }
    });
  }
};

export default featureSocketUtil;
