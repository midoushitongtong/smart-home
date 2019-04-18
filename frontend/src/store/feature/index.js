// action type
const actionType = {
  UPDATE_FEATURE_INFO: 'updateFeatureInfo',
  CLEAR_FEATURE_STATE: 'clearFeatureInfo'
};

// state
const initState = {
  featureInfo: {
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
        ...action.data.featureInfo
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
