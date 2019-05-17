const QcloudSms = require('qcloudsms_js');

// 短信应用SDK AppID
const appid = 1400178067;  // SDK AppID是1400开头

// 短信应用SDK AppKey
const appkey = '394f4d977651965f78c15f907d214f72';

// 短信模板ID，需要在短信应用中申请
const templateId = 334314;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请

// 签名
const smsSign = '物联家居平台';  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

// 实例化QcloudSms
const qcloudsms = QcloudSms(appid, appkey);

// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
const obj = {
  sendSMSMessage: (phoneNumbers, params) => {
    console.log(phoneNumbers, params);
    const ssender = qcloudsms.SmsSingleSender();
    ssender.sendWithParam(
      86,
      phoneNumbers,
      templateId,
      params,
      smsSign,
      '',
      '',
      (err, res, resData) => {
        if (err) {
          console.log('err: ', err);
        } else {
          console.log('短信发送成功, ', phoneNumbers, params);
        }
      }
    );
  }
};

module.exports = obj;
