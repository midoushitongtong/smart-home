import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 用户相关接口
 *
 */
interface Api {
  // 获取多条记录
  selectPersonList: (data: any) => object,
  // 获取单条记录
  selectPersonById: (id: any) => object;
}

/**
 * 用户相关接口实现
 *
 */
const api: Api = {
  selectPersonList(data: any): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/person-user/list`,
      data
    );
  },
  selectPersonById(id: any): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/person-user/${id}`
    );
  }
};

export default api;
