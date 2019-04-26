import Base from '../components/iview/base';
import config from '../config';

const featureSocketUtil = {
  // 初始化 webSocket 连接
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
  // 初始化 webSocket 事件
  initWebSocketEventHandler: (updateFeatureInfo) => {
    // 接收数据
    wx.onSocketMessage(({ data }) => {
      data = data.toString();
      console.log(`webSocket server receiver data: ${data}`);

      // 初始化
      if (data.substring(0, 'INIT'.length) === 'INIT') {
        // 处理初始化的数据
        const initFeatureInfo = {};
        data.substring('INIT'.length + 1).split(',').forEach(dataItem => {
          const featureInfo = featureSocketUtil.handlerWebSocketData(updateFeatureInfo, dataItem, false);
          Object.keys(featureInfo).forEach(key => {
            initFeatureInfo[key] = featureInfo[key];
          });
        });
        // 标记为已经初始化
        initFeatureInfo.isINIT = true;
        updateFeatureInfo(initFeatureInfo);
        return;
      }

      // 处理发送的数据
      featureSocketUtil.handlerWebSocketData(updateFeatureInfo, data, true);
    });

    wx.onSocketOpen(() => {
      // 连接成功初始化数据
      featureSocketUtil.sendWebSocketData('INIT');
    });

    wx.onSocketClose((e) => {
      // 提示连接已关闭
      Base.$Toast({
        content: '智能家居-连接关闭',
        duration: 1,
        mask: false
      });
      console.log('==webSocket server connect close', e);
    });

    wx.onSocketError((e) => {
      // 提示连接错误
      Base.$Toast({
        content: `服务器连接错误: ${JSON.stringify(e)}`,
        duration: 3,
        mask: false
      });
    });
  },
  // 处理 webSocket 发送的数据
  handlerWebSocketData: (updateFeatureInfo, data, isDispatch) => {
    // 是否是警告通知
    if (data.substring(0, 'call1'.length) === 'call1') {
      if (data.split('-')[1] === '1') {
        Base.$Toast({
          content: '报警系统1已打开',
          duration: 3,
          mask: false
        });
      }
      return;
    }
    if (data.substring(0, 'smoke1'.length) === 'smoke1') {
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
    if (data.substring(0, 'LED1'.length) === 'LED1') {
      if (isDispatch) {
        updateFeatureInfo({ LED1: data.split('-')[1] === '1' });
        return;
      }
      return { LED1: data.split('-')[1] === '1' };
    }
    if (data.substring(0, 'LED2'.length) === 'LED2') {
      if (isDispatch) {
        updateFeatureInfo({ LED2: data.split('-')[1] === '1' });
        return;
      }
      return { LED2: data.split('-')[1] === '1' };
    }
    if (data.substring(0, 'LED3'.length) === 'LED3') {
      if (isDispatch) {
        updateFeatureInfo({ LED3: data.split('-')[1] === '1' });
        return;
      }
      return { LED3: data.split('-')[1] === '1' };
    }
    if (data.substring(0, 'LED4'.length) === 'LED4') {
      if (isDispatch) {
        updateFeatureInfo({ LED4: data.split('-')[1] === '1' });
        return;
      }
      return { LED4: data.split('-')[1] === '1' };
    }
    if (data.substring(0, 'LED5'.length) === 'LED5') {
      if (isDispatch) {
        updateFeatureInfo({ LED5: data.split('-')[1] === '1' });
        return;
      }
      return { LED5: data.split('-')[1] === '1' };
    }
    if (data.substring(0, 'LED6'.length) === 'LED6') {
      if (isDispatch) {
        updateFeatureInfo({ LED6: data.split('-')[1] === '1' });
        return;
      }
      return { LED6: data.split('-')[1] === '1' };
    }
    if (data.substring(0, 'LED7'.length) === 'LED7') {
      if (isDispatch) {
        updateFeatureInfo({ LED7: data.split('-')[1] === '1' });
        return;
      }
      return { LED7: data.split('-')[1] === '1' };
    }
    if (data.substring(0, 'door1'.length) === 'door1') {
      if (isDispatch) {
        updateFeatureInfo({ door1: data.split('-')[1] === '1' });
        return;
      }
      return { door1: data.split('-')[1] === '1' };
    }
    if (data.substring(0, 'cur1'.length) === 'cur1') {
      if (isDispatch) {
        updateFeatureInfo({ cur1: data.split('-')[1] === '1' });
        return;
      }
      return { cur1: data.split('-')[1] === '1' };
    }
    if (data.substring(0, 'cur2'.length) === 'cur2') {
      if (isDispatch) {
        updateFeatureInfo({ cur2: data.split('-')[1] === '1' });
        return;
      }
      return { cur2: data.split('-')[1] === '1' };
    }
    if (data.substring(0, 'fan1'.length) === 'fan1') {
      if (isDispatch) {
        updateFeatureInfo({ fan1: data.split('-')[1] });
        return;
      }
      return { fan1: data.split('-')[1] };
    }
    if (data.substring(0, 'tem1'.length) === 'tem1') {
      if (isDispatch) {
        updateFeatureInfo({ tem1: data.split('-')[1] });
        return;
      }
      return { tem1: data.split('-')[1] };
    }
    if (data.substring(0, 'hood1'.length) === 'hood1') {
      if (isDispatch) {
        updateFeatureInfo({ hood1: data.split('-')[1] });
        return;
      }
      return { hood1: data.split('-')[1] === '1' };
    }
    if (data.substring(0, 'tem-hum1'.length) === 'tem-hum1') {
      if (isDispatch) {
        updateFeatureInfo({
          temHum1Tem: data.split('-')[2],
          temHum1Hum: data.split('-')[3]
        });
        return;
      }
      return {
        temHum1Tem: data.split('-')[2],
        temHum1Hum: data.split('-')[3]
      };
    }

    // 提示返回的数据
    Base.$Toast({
      content: `命令识别失败: ${data}`,
      duration: 3,
      mask: false
    });
  },
  // 发送 webSocket 数据
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
