import config from '../../config';

/**
 * 智能设备相关 api
 */
export default {
  // 查询智能设备列表
  selectSmartDeviceList: (data) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${config.API_HTTP_ROOT}/front-desk/smart-device`,
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
  // 修改智能设备
  updateSmartDevice: (id, data) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'PUT',
        url: `${config.API_HTTP_ROOT}/front-desk/smart-device/${id}`,
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
