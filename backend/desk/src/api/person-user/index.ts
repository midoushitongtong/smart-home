import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 用户相关接口
 *
 */
interface Api {
  // 获取多条记录
  selectPersonUserList: (data: any) => object,
  // 获取单条记录
  selectPersonUserRoomDeviceList: (id: any) => object;
}

/**
 * 用户相关接口实现
 *
 */
const api: Api = {
  selectPersonUserList(data: any): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/back-desk/person-user`,
      data
    );
  },
  selectPersonUserRoomDeviceList(data): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/back-desk/person-user/room-device`,
      data
    );
  }
};

export default api;
