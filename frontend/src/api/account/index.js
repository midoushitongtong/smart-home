import config from '../../config';

/**
 * 账户相关 api
 */
export default {
  // 获取临时登陆凭证
  selectSnapPersonUserInfo: (data) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${config.API_HTTP_ROOT}/front-desk/person-user/snap-person-user-info`,
        data,
        success: (res) => {
          if (res && res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(res);
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  },
  // 保存用户信息
  savePersonUserInfo: (data) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: `${config.API_HTTP_ROOT}/front-desk/person-user/person-user-info`,
        data,
        success: (res) => {
          if (res && res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(res);
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  }
};
