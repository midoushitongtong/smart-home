import config from '../../config';

/**
 * 设备相关 api
 */
export default {
  // 查询设备列表
  selectDeviceList: (data) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${config.API_HTTP_ROOT}/device`,
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
  // 添加设备
  insertDevice: (data) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: `${config.API_HTTP_ROOT}/device`,
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
  // 删除设备
  deleteDevice: (id, data) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'DELETE',
        url: `${config.API_HTTP_ROOT}/device/${id}`,
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
