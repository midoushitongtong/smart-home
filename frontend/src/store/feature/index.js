// action type
const actionType = {
  UPDATE_FEATURE_INFO: 'updateFeatureInfo',
  UPDATE_ROOM_INFO_LIST: 'updateRoomInfoList',
  UPDATE_DEVICE_INFO_LIST: 'updateDeviceInfoList',
  CLEAR_FEATURE_STATE: 'clearFeatureInfo'
};

// state
const initState = {
  featureInfo: {},
  roomInfoList: [],
  deviceInfoList: []
};

// action
// 修改家居状态
export const updateFeatureInfo = (featureInfo) => {
  return {
    type: actionType.UPDATE_FEATURE_INFO,
    data: {
      featureInfo
    }
  };
};
// 修改当房间列表
export const updateRoomInfoList = (roomInfoList) => {
  return {
    type: actionType.UPDATE_ROOM_INFO_LIST,
    data: {
      roomInfoList
    }
  };
};
// 修改当前设备列表
export const updateDeviceInfoList = (deviceInfoList) => {
  return {
    type: actionType.UPDATE_DEVICE_INFO_LIST,
    data: {
      deviceInfoList
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
    case actionType.UPDATE_ROOM_INFO_LIST:
      return {
        ...state,
        ...action.data
      };
    case actionType.UPDATE_DEVICE_INFO_LIST:
      return {
        ...state,
        ...action.data
      };
    case actionType.UPDATE_FEATURE_INFO:
      if (action.data.featureInfo.deleteControlName) {
        // 如果是删除数据, 将数据删除
        // 构建数据
        let newFeatureInfo = {
          ...state.featureInfo
        };
        delete newFeatureInfo[action.data.featureInfo.controlName];
        return {
          ...state,
          featureInfo: newFeatureInfo
        };
      } else if (action.data.featureInfo.isInit) {
        // 如果操作是初始化数据, 则不保留已有的数据
        // 构建数据
        let newFeatureInfo = {
          ...action.data.featureInfo
        };
        return {
          ...state,
          featureInfo: newFeatureInfo
        };
      } else {
        // 构建数据
        let newFeatureInfo = {
          ...state.featureInfo,
          ...action.data.featureInfo
        };
        return {
          ...state,
          featureInfo: newFeatureInfo
        };
      }
    case actionType.CLEAR_FEATURE_STATE:
      return initState;
    default:
      return {
        ...state
      };
  }
};
