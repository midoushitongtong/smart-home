const roomStorage = {
  // 添加房间信息
  addRoomInfo: (roomInfo) => {
    // 获取以有的房间
    const currentRoomInfoList = wx.getStorageSync('roomInfoList');
    if (currentRoomInfoList) {
      // 判断房间是否已存在, 不添加才添加
      if (!roomStorage.existRoomInfo(roomInfo.name)) {
        currentRoomInfoList.push(roomInfo);
        wx.setStorageSync('roomInfoList', currentRoomInfoList);
      }
    } else {
      try {
        wx.setStorageSync('roomInfoList', [
          roomInfo
        ]);
      } catch (e) {
        console.log(`存储失败: `, e);
      }
    }
  },
  // 获取已有的房间列表
  getRoomList: () => {
    const currentDeviceInfoList = wx.getStorageSync('roomInfoList');
    if (currentDeviceInfoList) {
      return currentDeviceInfoList;
    } else {
      // 空的默认添加客厅
      const newDeviceInfoList = [
        {
          name: '客厅',
          icon: '/assets/images/living.png'
        }
      ];
      wx.setStorageSync('roomInfoList', newDeviceInfoList);
      return newDeviceInfoList;
    }
  },
  // 判断房间是否已存在
  existRoomInfo: (name) => {
    const currentRoomInfoList = wx.getStorageSync('roomInfoList');
    if (currentRoomInfoList) {
      // 判断房间是否已存在
      const hasRoomInfo = currentRoomInfoList.find(currentRoomInfoItem => {
        return currentRoomInfoItem.name === name;
      });
      if (hasRoomInfo) {
        console.log(`房间已存在: `, name);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};

export default roomStorage;
