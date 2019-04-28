const roomStorage = {
  // 添加房间信息
  addRoomInfo: (roomInfo) => {
    // 获取以有的房间
    const currentRoomInfoList = roomStorage.getRoomList();
    // 给定唯一 id
    roomInfo.id = currentRoomInfoList.length + 1 + '';
    if (currentRoomInfoList) {
      // 判断房间是否已存在, 不添加才添加
      if (!roomStorage.existRoomInfo(roomInfo.name)) {
        currentRoomInfoList.push(roomInfo);
        wx.setStorageSync('roomInfoList', currentRoomInfoList);
      }
    } else {
      wx.setStorageSync('roomInfoList', [
        roomInfo
      ]);
    }
  },
  // 修改房间信息
  editRoomInfo: (roomInfo) => {
    // 获取以有的房间
    const currentRoomInfoList = roomStorage.getRoomList();
    const newRoomInfoList = currentRoomInfoList.map(roomInfoItem => {
      if (roomInfoItem.id === roomInfo.id) {
        return roomInfo;
      }
      return roomInfoItem;
    });
    // 保存现有房间
    wx.setStorageSync('roomInfoList', newRoomInfoList);
  },
  // 获取已有的房间列表
  getRoomList: () => {
    const currentDeviceInfoList = wx.getStorageSync('roomInfoList');
    if (currentDeviceInfoList && currentDeviceInfoList.length > 0) {
      return currentDeviceInfoList;
    } else {
      // 空的默认添加客厅
      const newDeviceInfoList = [
        {
          name: '客厅',
          icon: '/assets/images/living.png',
          id: 1 + ''
        }
      ];
      wx.setStorageSync('roomInfoList', newDeviceInfoList);
      return newDeviceInfoList;
    }
  },
  // 判断房间是否已存在
  existRoomInfo: (name) => {
    const currentRoomInfoList = roomStorage.getRoomList();
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
  },
  // 删除房间
  deleteRoomInfo: (id) => {
    // 获取以有的房间
    const currentRoomInfoList = roomStorage.getRoomList();
    const newRoomInfoList = currentRoomInfoList.filter(roomInfoItem => roomInfoItem.id !== id);
    // 保存现有房间
    wx.setStorageSync('roomInfoList', newRoomInfoList);
  }
};

export default roomStorage;
