import config from '../../config';

/**
 * 房间相关 api
 */
export default {
  // 查询房间列表
  selectRoomList: (data) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${config.API_HTTP_ROOT}/front-desk/room`,
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
  // 添加房间
  insertRoom: (data) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: `${config.API_HTTP_ROOT}/front-desk/room`,
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
  // 删除房间
  deleteRoom: (id, data) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'DELETE',
        url: `${config.API_HTTP_ROOT}/front-desk/room/${id}`,
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
  // 修改房间
  updateRoom: (id, data) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'PUT',
        url: `${config.API_HTTP_ROOT}/front-desk/room/${id}`,
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
