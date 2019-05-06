// action type
const actionType = {
  UPDATE_USER_INFO: 'updateUserInfo',
  CLEAR_ACCOUNT_STATE: 'clearAccountState'
};

// state
const initState = {
  userInfo: null
};

// action
// 修改用户信息
export const updateUserInfo = (userInfo) => {
  return {
    type: actionType.UPDATE_USER_INFO,
    data: {
      userInfo
    }
  };
};

// 清空当前模块的状态
export const clearUserInfo = () => {
  return {
    type: actionType.CLEAR_ACCOUNT_STATE
  };
};

// reducer
export default (state = initState, action) => {
  switch (action.type) {
    case actionType.UPDATE_USER_INFO:
      return {
        ...state,
        ...action.data
      };
    case actionType.CLEAR_ACCOUNT_STATE:
      return initState;
    default:
      return {
        ...state
      };
  }
};
