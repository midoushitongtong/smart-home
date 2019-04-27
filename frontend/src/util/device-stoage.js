const deviceStorage = {
  // 添加设备
  addDeviceInfo: (deviceInfo) => {
    // 获取以有的设备
    const currentDeviceInfoList = wx.getStorageSync('deviceInfoList');
    if (currentDeviceInfoList) {
      // 判断设备是否已存在, 不添加才添加
      if (!deviceStorage.existDeviceInfo(deviceInfo.controlName)) {
        currentDeviceInfoList.push(deviceInfo);
        wx.setStorageSync('deviceInfoList', currentDeviceInfoList);
      }
    } else {
      try {
        wx.setStorageSync('deviceInfoList', [
          deviceInfo
        ]);
      } catch (e) {
        console.log(`存储失败: `, e);
      }
    }
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
