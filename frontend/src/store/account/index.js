// action type
const actionType = {
  UPDATE_USER_INFO: 'updateUserInfo',
  CLEAR_PERSON_USER_STATE: 'clearUserState'
};

// state
const initState = {
  userInfo: {}
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
    type: actionType.CLEAR_PERSON_USER_STATE
  };
};

// reducer
export default (state = initState, action) => {
  switch (action.type) {
    case actionType.UPDATE_USER_INFO:
      const userInfo = {
        ...state.userInfo,
        ...action.data.userInfo
      };
      return {
        ...state,
        userInfo
      };
    case actionType.CLEAR_PERSON_USER_STATE:
      return initState;
    default:
      return {
        ...state
      };
  }
};
