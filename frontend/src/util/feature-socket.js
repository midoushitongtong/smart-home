import Base from '../components/iview/base';
import config from '../config';

const featureSocket = {
  // 初始化 webSocket 连接
  initWebSocketClient: (updateFeatureInfo) => {
    wx.connectSocket({
      url: config.WEB_SOCKET_ROOT,
      success: () => {
        console.info('==webSocket server connect success');
        featureSocket.initWebSocketEventHandler(updateFeatureInfo);
      },
      fail: (e) => {
        console.error(`服务器连接失败: ${e}`);
      }
    });
  },
  // 初始化 webSocket 事件
  initWebSocketEventHandler: (updateFeatureInfo) => {
    // 接收数据
    wx.onSocketMessage(({ data }) => {
      data = data.toString();
      console.info(`webSocket server receiver data: ${data}`);

      // 初始化
      if (data.substring(0, 'INIT'.length) === 'INIT') {
        // 初始化的数据
        const initFeatureInfo = {};
        data.substring('INIT'.length + 1).split(',').forEach(dataItem => {
          const featureInfo = featureSocket.handlerWebSocketData(updateFeatureInfo, dataItem, false);
          Object.keys(featureInfo).forEach(key => {
            initFeatureInfo[key] = featureInfo[key];
          });
        });
        // 标记为已经初始化
        initFeatureInfo.isINIT = true;
        updateFeatureInfo(initFeatureInfo);
        return;
      }

      // 关闭连接
      if (data.substring(0, 'CLOSE'.length) === 'CLOSE') {
        // 清空数据
        updateFeatureInfo({
          isCLOSE: true,
          isINIT: true
        });
        return;
      }

      // 处理发送的数据
      featureSocket.handlerWebSocketData(updateFeatureInfo, data, true);
    });

    wx.onSocketOpen(() => {
      // 连接成功初始化数据
      featureSocket.sendWebSocketData('INIT');
    });

    wx.onSocketClose((e) => {
      // 提示连接已关闭
      console.info('==webSocket server connect close', e);
    });

    wx.onSocketError((e) => {
      // 提示连接错误
      console.info('==webSocket server connect error', e);
    });
  },
  // 处理 webSocket 发送的数据
  handlerWebSocketData: (updateFeatureInfo, data, isDispatch) => {
    // 是否是警告通知
    if (data.substring(0, 'call1'.length) === 'call1') {
      if (data.split('-')[1] === '1') {
        console.info('报警系统1已打开');
      }
      return;
    }
    if (data.substring(0, 'smoke1'.length) === 'smoke1') {
      if (data.split('-')[1] === '1') {
        console.info('烟雾报警系统1已打开');
      }
      return;
    }

    // 将数据保存到 reudx 中
    if (data.substring(0, 'LED'.length) === 'LED') {
      const controlName = `LED${data.substr('LED'.length, 1)}`;
      const controlValue = data.split('-')[1] === '1';
      const featureInfo = {
        [controlName]: controlValue
      };
      if (isDispatch) {
        updateFeatureInfo(featureInfo);
        return;
      }
      return featureInfo;
    } else if (data.substring(0, 'door'.length) === 'door') {
      const controlName = `door${data.substr('door'.length, 1)}`;
      const controlValue = data.split('-')[1] === '1';
      const featureInfo = {
        [controlName]: controlValue
      };
      if (isDispatch) {
        updateFeatureInfo(featureInfo);
        return;
      }
      return featureInfo;
    } else if (data.substring(0, 'hood'.length) === 'hood') {
      const controlName = `hood${data.substr('hood'.length, 1)}`;
      const controlValue = data.split('-')[1] === '1';
      const featureInfo = {
        [controlName]: controlValue
      };
      if (isDispatch) {
        updateFeatureInfo(featureInfo);
        return;
      }
      return featureInfo;
    } else if (data.substring(0, 'cur'.length) === 'cur') {
      const controlName = `cur${data.substr('cur'.length, 1)}`;
      const controlValue = data.split('-')[1] === '1';
      const featureInfo = {
        [controlName]: controlValue
      };
      if (isDispatch) {
        updateFeatureInfo(featureInfo);
        return;
      }
      return featureInfo;
    } else if (data.substring(0, 'fan'.length) === 'fan') {
      const controlName = `fan${data.substr('fan'.length, 1)}`;
      const controlValue = data.split('-')[1];
      const featureInfo = {
        [controlName]: controlValue
      };
      if (isDispatch) {
        updateFeatureInfo(featureInfo);
        return;
      }
      return featureInfo;
    } else if (data.substring(0, 'tem'.length) === 'tem' && data.substring(0, 'tem-hum'.length) !== 'tem-hum') {
      const controlName = `tem${data.substr('tem'.length, 1)}`;
      const controlValue = data.split('-')[1];
      const featureInfo = {
        [controlName]: controlValue
      };
      if (isDispatch) {
        updateFeatureInfo(featureInfo);
        return;
      }
      return featureInfo;
    } else if (data.substring(0, 'tem-hum1'.length) === 'tem-hum1') {
      const controlName = `temHum${data.substr('tem-hum'.length, 1)}Tem`;
      const controlValue = data.split('-')[2];
      const controlName2 = `temHum${data.substr('tem-hum'.length, 1)}Hum`;
      const controlValue2 = data.split('-')[3];
      const featureInfo = {
        [controlName]: controlValue,
        [controlName2]: controlValue2
      };
      if (isDispatch) {
        updateFeatureInfo(featureInfo);
        return;
      }
      return featureInfo;
    }

    // 提示返回的数据
    console.info(`命令识别失败: ${data}`);
  },
  // 发送 webSocket 数据
  sendWebSocketData: (data) => {
    // 发送数据
    wx.sendSocketMessage({
      data,
      fail: (e) => {
        console.info(`发送数据失败${e}`);
      }
    });
  }
};

export default featureSocket;
