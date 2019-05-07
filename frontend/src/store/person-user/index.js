// action type
const actionType = {
  UPDATE_PERSON_USER_INFO: 'updatePersonUserInfo',
  CLEAR_PERSON_USER_STATE: 'clearPersonUserState'
};

// state
const initState = {
  personUserInfo: {}
};

// action
// 修改用户信息
export const updatePersonUserInfo = (personUserInfo) => {
  return {
    type: actionType.UPDATE_PERSON_USER_INFO,
    data: {
      personUserInfo
    }
  };
};

// 清空当前模块的状态
export const clearPersonUserInfo = () => {
  return {
    type: actionType.CLEAR_PERSON_USER_STATE
  };
};

// reducer
export default (state = initState, action) => {
  switch (action.type) {
    case actionType.UPDATE_PERSON_USER_INFO:
      const personUserInfo = {
        ...state.personUserInfo,
        ...action.data.personUserInfo
      };
      return {
        ...state,
        personUserInfo
      };
    case actionType.CLEAR_PERSON_USER_STATE:
      return initState;
    default:
      return {
        ...state
      };
  }
};
