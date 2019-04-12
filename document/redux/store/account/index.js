// action type
const ActionType = {
  UPDATE_USER_INFO: 'updateUserInfo',
  CLEAR_ACCOUNT_STATE: 'clearAccountState'
};

// state
const initState = {
  userInfo: {}
};

// action
// 修改当前登陆的用户信息
export const updateUserInfo = (userInfo) => {
  return {
    type: ActionType.UPDATE_USER_INFO,
    data: {
      userInfo
    }
  };
};

// 清空当前模块的状态
export const clearAccountState = () => {
  return {
    type: ActionType.CLEAR_ACCOUNT_STATE
  };
};

// reducer
export default (state = initState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_USER_INFO:
      return {
        ...state,
        ...action.data
      };
    case ActionType.CLEAR_ACCOUNT_STATE:
      return initState;
    default:
      return {
        ...state
      };
  }
}
