`app.wpy`

```javascript
globalData = {
  userInfo: null
};

onLaunch() {
  // 登录
  wx.login({
    success: res => {
      console.log(res);
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
    }
  });
}

// 初始化获取用户信息
wx.getSetting({
  success: res => {
    if (res.authSetting['scope.userInfo']) {
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      wx.getUserInfo({
        success: res => {
          // 可以将 res 发送给后台解码出 unionId
          this.globalData.userInfo = res.userInfo;
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res);
          }
        }
      });
    }
  }
});
```

`other.wpy`

```javascript
<template>
  <view class="container
    <button open-type="getUserInfo" bindgetuserinfo="getUserInfo">获取用户信息</button>
  </view>
</template>

methods = {
  // 第一次需要点击按钮获取用户信息
  getUserInfo: async (e) => {
    this.$parent.globalData.userInfo = e.detail.userInfo;
    console.log(e.detail.userInfo);
  }
};

onLoad = async () => {
  // 已经授权, 直接获取用户信息
  this.$parent.userInfoReadyCallback = res => {
    console.log(res);
  };
};
```

