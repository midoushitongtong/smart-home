import Base from '../components/iview/base';
import config from '../config';

const featureSocket = {
  // 修改 store 对象
  updateFeatureInfo: null,
  // 发送未响应状态
  sendWebSocketDataNotReact: false,
  // 发送未响应 timerout 对象
  sendWebSocketDataNotReactTimeout: null,
  // 初始化 webSocket 连接
  initWebSocketClient: (successCallback) => {
    wx.connectSocket({
      url: config.API_WEB_SOCKET_ROOT,
      success: () => {
        console.info('==webSocket server connect success');
      },
      fail: (e) => {
        console.error(`服务器连接失败: ${e}`);
      }
    });

    wx.onSocketOpen(() => {
      successCallback();
    });
  },
  // 初始化 webSocket 事件
  initWebSocketEventHandler: (updateFeatureInfo) => {
    featureSocket.updateFeatureInfo = updateFeatureInfo;
    // 接收数据
    wx.onSocketMessage(({ data }) => {
      data = data.toString();
      // 标记为服务端以响应数据
      featureSocket.sendWebSocketDataNotReact = false;
      console.info(`webSocket server receiver data: ${data}`);

      // 初始化
      if (data.substring(0, 'INIT'.length) === 'INIT') {
        // 初始化的数据
        const initFeatureInfo = {};
        data.substring('INIT'.length + 1).split(',').forEach(dataItem => {
          const featureInfo = featureSocket.handlerWebSocketData(updateFeatureInfo, dataItem, false);
          if (featureInfo) {
            Object.keys(featureInfo).forEach(key => {
              initFeatureInfo[key] = featureInfo[key];
            });
          }
        });
        initFeatureInfo.isInit = true;
        // 标记为已经初始化
        updateFeatureInfo(initFeatureInfo);
        return;
      }

      // 关闭连接
      if (data.substring(0, 'CLOSE'.length) === 'CLOSE') {
        Base.$Message({
          content: '硬件连接已关闭!',
          type: 'error',
          duration: 3
        });
        // 清空数据
        updateFeatureInfo({
          isInit: true
        });
        return;
      }

      // 处理发送的数据
      featureSocket.handlerWebSocketData(updateFeatureInfo, data, true);
    });

    wx.onSocketClose((e) => {
      // 提示连接已关闭
      console.info('==webSocket server connect close', e);
      Base.$Message({
        content: '服务端连接已关闭!',
        type: 'error',
        duration: 3
      });
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
      const controlName = featureSocket.getControlName(data);
      const controlValue = data.split('-')[1];
      const featureInfo = {
        [controlName]: controlValue
      };
      if (isDispatch) {
        updateFeatureInfo(featureInfo);
        return;
      }
      return featureInfo;
    } else if (data.substring(0, 'door'.length) === 'door') {
      const controlName = featureSocket.getControlName(data);
      const controlValue = data.split('-')[1];
      const featureInfo = {
        [controlName]: controlValue
      };
      if (isDispatch) {
        updateFeatureInfo(featureInfo);
        return;
      }
      return featureInfo;
    } else if (data.substring(0, 'hood'.length) === 'hood') {
      const controlName = featureSocket.getControlName(data);
      const controlValue = data.split('-')[1];
      const featureInfo = {
        [controlName]: controlValue
      };
      if (isDispatch) {
        updateFeatureInfo(featureInfo);
        return;
      }
      return featureInfo;
    } else if (data.substring(0, 'cur'.length) === 'cur') {
      const controlName = featureSocket.getControlName(data);
      const controlValue = data.split('-')[1];
      const featureInfo = {
        [controlName]: controlValue
      };
      if (isDispatch) {
        updateFeatureInfo(featureInfo);
        return;
      }
      return featureInfo;
    } else if (data.substring(0, 'fan'.length) === 'fan') {
      const controlName = featureSocket.getControlName(data);
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
      const controlName = featureSocket.getControlName(data);
      const controlValue = data.split('-')[1];
      const featureInfo = {
        [controlName]: controlValue
      };
      if (isDispatch) {
        updateFeatureInfo(featureInfo);
        return;
      }
      return featureInfo;
    } else if (data.substring(0, 'tem-hum'.length) === 'tem-hum') {
      const controlName = featureSocket.getControlName(data);
      const controlValue = data.split('-')[2] + '-' + data.split('-')[3];
      const featureInfo = {
        [controlName]: controlValue
      };
      if (isDispatch) {
        updateFeatureInfo(featureInfo);
        return;
      }
      return featureInfo;
    }

    // 提示返回的数据
    Base.$Message({
      content: `命令识别失败: ${data}`,
      type: 'error'
    });
    return null;
  },
  // 发送 webSocket 数据
  sendWebSocketData: (data) => {
    clearInterval(featureSocket.sendWebSocketDataNotReactTimeout);
    // 标记为服务器为响应数据
    featureSocket.sendWebSocketDataNotReact = true;
    featureSocket.sendWebSocketDataNotReactTimeout = setTimeout(() => {
      // 服务器 3 秒未响应数据, 删除设备
      if (featureSocket.sendWebSocketDataNotReact) {
        featureSocket.updateFeatureInfo({
          deleteControlName: true,
          controlName: featureSocket.getControlName(data)
        });
      }
    }, 3000);
    // 发送数据
    wx.sendSocketMessage({
      data,
      fail: (e) => {
        Base.$Message({
          content: `已断开连接, 重新连接中`
        });
        // 失败重连
        featureSocket.initWebSocketClient(() => {
          featureSocket.sendWebSocketData(data);
        });
      }
    });
  },
  getControlName: (data) => {
    if (data.substring(0, 'LED'.length) === 'LED') {
      return `LED${data.substr('LED'.length, 1)}`;
    } else if (data.substring(0, 'door'.length) === 'door') {
      return `door${data.substr('door'.length, 1)}`;
    } else if (data.substring(0, 'hood'.length) === 'hood') {
      return `hood${data.substr('hood'.length, 1)}`;
    } else if (data.substring(0, 'cur'.length) === 'cur') {
      return `cur${data.substr('cur'.length, 1)}`;
    } else if (data.substring(0, 'fan'.length) === 'fan') {
      return `fan${data.substr('fan'.length, 1)}`;
    } else if (data.substring(0, 'tem'.length) === 'tem' && data.substring(0, 'tem-hum'.length) !== 'tem-hum') {
      return `tem${data.substr('tem'.length, 1)}`;
    } else if (data.substring(0, 'tem-hum'.length) === 'tem-hum') {
      return `temHum${data.substr('tem-hum'.length, 1)}`;
    }
  }
};

export default featureSocket;
