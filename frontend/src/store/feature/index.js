import Base from '../../components/iview/base/index';

// action type
const actionType = {
  UPDATE_FEATURE_INFO: 'updateFeatureInfo',
  CLEAR_FEATURE_STATE: 'clearFeatureInfo'
};

// state
const initState = {
  featureInfo: {
    door1: false
  }
};

// action
// 修改当前家居状态
export const updateFeatureInfo = (featureInfo) => {
  return {
    type: actionType.UPDATE_FEATURE_INFO,
    data: {
      featureInfo
    }
  };
};

// 清空当前模块的状态
export const clearFeatureInfo = () => {
  return {
    type: actionType.CLEAR_FEATURE_STATE
  };
};

// reducer
export default (state = initState, action) => {
  switch (action.type) {
    case actionType.UPDATE_FEATURE_INFO:
      // 构建数据
      let newFeatureInfo = {
        ...state.featureInfo,
        ...action.data
      };
      return {
        ...state,
        featureInfo: newFeatureInfo
      };
    case actionType.CLEAR_FEATURE_STATE:
      return initState;
    default:
      return {
        ...state
      };
  }
};

export const initWebSocketClient = (successCallback) => {
  return dispatch => {
    wx.connectSocket({
      url: 'wss://project.yyccyy.com/smart-home/backend/api/webSocket',
      // url: 'ws://10.0.19.175:5002',
      success: () => {
        successCallback();
        // 连接成功
        wx.onSocketOpen(() => {
          console.log('==webSocket server connect success');
          // 初始化数据
          sendWebSocketData('INIT');
        });

        // 接收数据
        wx.onSocketMessage(({ data }) => {
          data = data.toString();
          console.log(`webSocket server receiver data: ${data}`);

          // 是否是警告通知
          if (data.indexOf('call1') > -1) {
            if (data.split('-')[1] === '1') {
              sendWebSocketData('send-call1-13026628310');
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
              sendWebSocketData('send-smoke1-13026628310');
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
            dispatch({
              type: actionType.UPDATE_FEATURE_INFO,
              data: { door1: data.split('-')[1] === '1' }
            });
            return;
          }

          // 厨房
          if (data.indexOf('LED1') > -1) {
            dispatch({
              type: actionType.UPDATE_FEATURE_INFO,
              data: { LED1: data.split('-')[1] === '1' }
            });
            return;
          }

          // 客厅
          if (data.indexOf('LED2') > -1) {
            dispatch({
              type: actionType.UPDATE_FEATURE_INFO,
              data: { LED2: data.split('-')[1] === '1' }
            });
            return;
          }
          if (data.indexOf('fan1') > -1) {
            dispatch({ type: actionType.UPDATE_FEATURE_INFO, data: { fan1: data.split('-')[1] } });
            return;
          }
          if (data.indexOf('tem1') > -1) {
            dispatch({ type: actionType.UPDATE_FEATURE_INFO, data: { tem1: data.split('-')[1] } });
            return;
          }
          if (data.indexOf('tem-hum1') > -1) {
            dispatch({
              type: actionType.UPDATE_FEATURE_INFO,
              data: {
                temHum1Tem: data.split('-')[2],
                temHum1Hum: data.split('-')[3]
              }
            });
            return;
          }

          // 餐厅
          if (data.indexOf('LED3') > -1) {
            dispatch({
              type: actionType.UPDATE_FEATURE_INFO,
              data: { LED3: data.split('-')[1] === '1' }
            });
            return;
          }

          // 阳台
          if (data.indexOf('LED4') > -1) {
            dispatch({
              type: actionType.UPDATE_FEATURE_INFO,
              data: { LED4: data.split('-')[1] === '1' }
            });
            return;
          }
          if (data.indexOf('cur1') > -1) {
            dispatch({
              type: actionType.UPDATE_FEATURE_INFO,
              data: { cur1: data.split('-')[1] === '1' }
            });
            return;
          }

          // 主卧
          if (data.indexOf('LED5') > -1) {
            dispatch({
              type: actionType.UPDATE_FEATURE_INFO,
              data: { LED5: data.split('-')[1] === '1' }
            });
            return;
          }
          if (data.indexOf('cur2') > -1) {
            dispatch({
              type: actionType.UPDATE_FEATURE_INFO,
              data: { cur2: data.split('-')[1] === '1' }
            });
            return;
          }

          // 次卧
          if (data.indexOf('LED6') > -1) {
            dispatch({
              type: actionType.UPDATE_FEATURE_INFO,
              data: { LED6: data.split('-')[1] === '1' }
            });
            return;
          }

          // 洗手间
          if (data.indexOf('LED7') > -1) {
            dispatch({
              type: actionType.UPDATE_FEATURE_INFO,
              data: { LED7: data.split('-')[1] === '1' }
            });
            return;
          }

          // 提示返回的数据
          Base.$Toast({
            content: `命令识别失败: ${data}`,
            duration: 3,
            mask: false
          });
        });
      },
      fail: (e) => {
        console.error(e);
        Base.$Toast({
          content: `webSocket 连接失败: ${e}`,
          duration: 3,
          mask: false
        });
      }
    });

    wx.onSocketError((e) => {
      Base.$Toast({
        content: `webSocket 连接失败: ${JSON.stringify(e)}`,
        duration: 3,
        mask: false
      });
    });
  };
};

export const sendWebSocketData = (data) => {
  // 发送数据
  wx.sendSocketMessage({
    data
  });

  return () => {
  };
};
