const deviceStorage = {
  // 添加设备
  addDeviceInfo: (deviceInfo) => {
    // 获取以有的设备
    const currentDeviceInfoList = deviceStorage.getDeviceInfoList();
    deviceInfo.id = currentDeviceInfoList.length + 1 + '';
    if (currentDeviceInfoList) {
      // 判断设备是否已存在, 不添加才添加
      if (!deviceStorage.existDeviceInfo(deviceInfo.controlName)) {
        currentDeviceInfoList.push(deviceInfo);
        wx.setStorageSync('deviceInfoList', currentDeviceInfoList);
      }
    } else {
      wx.setStorageSync('deviceInfoList', [
        deviceInfo
      ]);
    }
  },
  // 修改设备
  editDeviceInfo: (deviceInfo) => {
    // 获取以有的设备
    const currentDeviceInfoList = deviceStorage.getDeviceInfoList();
    const newDeviceInfoList = currentDeviceInfoList.filter(deviceInfoItem => deviceInfoItem.id !== deviceInfo.id);
    newDeviceInfoList.push(deviceInfo);
    wx.setStorageSync('deviceInfoList', newDeviceInfoList);
  },
  // 删除设备
  deleteDeviceInfo: (id) => {
    // 获取以有的设备
    const currentDeviceInfoList = deviceStorage.getDeviceInfoList();
    const newDeviceInfoList = currentDeviceInfoList.filter(currentDeviceInfoItem => currentDeviceInfoItem.id !== id);
    wx.setStorageSync('deviceInfoList', newDeviceInfoList);
  },
  // 删除设备根据房间id
  deleteDeviceInfoByRoomId: (roomId) => {
    // 获取以有的设备
    const currentDeviceInfoList = deviceStorage.getDeviceInfoList();
    const newDeviceInfoList = currentDeviceInfoList.filter(currentDeviceInfoItem => currentDeviceInfoItem.roomId !== roomId);
    wx.setStorageSync('deviceInfoList', newDeviceInfoList);
  },
  // 获取已有的设备列表
  getDeviceInfoList: () => {
    return wx.getStorageSync('deviceInfoList') || [];
  },
  // 判断设备是否已存在
  existDeviceInfo: (controlName) => {
    const currentDeviceInfoList = wx.getStorageSync('deviceInfoList');
    if (currentDeviceInfoList) {
      // 判断设备是否已存在
      const hasDeviceInfo = currentDeviceInfoList.find(currentDeviceInfoItem => {
        return currentDeviceInfoItem.controlName === controlName;
      });
      if (hasDeviceInfo) {
        console.log(`设备已存在: `, controlName);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};

export default deviceStorage;
