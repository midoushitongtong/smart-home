import Base from '../../components/iview/base/index';

// action type
const ActionType = {
    UPDATE_FEATURE_INFO: 'updateFeatureInfo',
    CLEAR_FEATURE_STATE: 'clearFeatureInfo'
};

// state
const initState = {
    featureInfo: {
        test: {
            test1: false
        },
        kitchen: {
            switch1: false,
            switch2: true
        }
    }
};

// action
// 修改当前家居状态
export const updateFeatureInfo = (featureInfo) => {
    return {
        type: ActionType.UPDATE_FEATURE_INFO,
        data: {
            featureInfo
        }
    };
};

// 清空当前模块的状态
export const clearFeatureInfo = () => {
    return {
        type: ActionType.CLEAR_FEATURE_STATE
    };
};

// reducer
export default (state = initState, action) => {
    switch (action.type) {
        case ActionType.UPDATE_FEATURE_INFO:
            // 构建功能数据
            const newFeatureInfo = {
                ...state.featureInfo
            };
            newFeatureInfo[action.data.actionType][action.data.actionTypeDetailName] = action.data.actionTypeDetailValue;
            return {
                ...state,
                featureInfo: newFeatureInfo
            };
        case ActionType.CLEAR_FEATURE_STATE:
            return initState;
        default:
            return {
                ...state
            };
    }
}

export const initWebSocketClient = () => {
    return dispatch => {
        wx.connectSocket({
            url: 'wss://project.yyccyy.com/smart-home/backend/api/webSocket',
            // url: 'ws://10.0.19.175:5002',
            success: () => {
                // 连接成功
                wx.onSocketOpen(() => {
                    console.log('==webSocket server connect success');
                });

                // 接收数据
                wx.onSocketMessage(({ data }) => {
                    console.log(`webSocket server receiver data: ${data}`);
                    // 将数据保存到 reudx 中
                    try {
                        const obj = JSON.parse(data);
                        dispatch({
                            type: ActionType.UPDATE_FEATURE_INFO,
                            data: obj
                        });
                    } catch (e) {
                        console.log('解析服务端数据为 JSON 失败');
                    }
                    // 提示返回的数据
                    Base.$Toast({
                        content: data,
                        duration: 3,
                        mask: false
                    });
                });
            },
            fail: (e) => {
                console.error(e);
            }
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
