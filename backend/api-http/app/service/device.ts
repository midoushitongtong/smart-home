import { Service } from 'egg';
import { Op } from 'sequelize';
import { DeviceModel } from '../model/device';

/**
 * Device Service
 *
 */
export default class Device extends Service {
  /**
   * 查询设备列表
   *
   * @param openid
   */
  public async selectDeviceList(openid: string) {
    const { app } = this;
    return await app.model.Device.findAll({
      where: {
        openid: {
          [Op.eq]: openid
        }
      }
    });
  }

  /**
   * 插入设备
   *
   * @param data
   */
  public async insertDevice(data: DeviceModel) {
    const { app } = this;
    const result = await app.model.Device.create(data);
    if (data.originControlName !== 'tem-hum') {
      // 如果设备不是温度湿度传稿器, 插入智能设备默认控制数据
      let onlineControlValue = '';
      let offlineControlValue = '';
      let sleepControlValue = '';
      switch (result.originControlName) {
        // 灯 窗帘
        case 'LED':
        case 'cur':
          onlineControlValue = '1';
          offlineControlValue = '0';
          sleepControlValue = '0';
          break;
        //  油烟机
        case 'hood':
          onlineControlValue = '1';
          offlineControlValue = '0';
          sleepControlValue = '0';
          break;
        // 门
        case 'door':
          onlineControlValue = '0';
          offlineControlValue = '0';
          sleepControlValue = '0';
          break;
        // 风扇
        case 'fan':
          onlineControlValue = '1';
          offlineControlValue = '0';
          sleepControlValue = '0';
          break;
        // 空调
        case 'tem':
          // 判断是开关还是挡位
          onlineControlValue = '23';
          offlineControlValue = '0';
          sleepControlValue = '23';
          break;
        // 安防装置
        case 'call':
          onlineControlValue = '1';
          offlineControlValue = '1';
          sleepControlValue = '1';
          break;
          // 烟雾报警装置
        case 'smoke':
          onlineControlValue = '1';
          offlineControlValue = '1';
          sleepControlValue = '1';
          break;
        default:
          console.log('未知 originControlName');
      }
      // 插入智能设备
      await app.model.SmartDevice.create({
        openid: data.openid,
        deviceId: result.id,
        model: 'online',
        controlValue: onlineControlValue
      });
      await app.model.SmartDevice.create({
        openid: data.openid,
        deviceId: result.id,
        model: 'offline',
        controlValue: offlineControlValue
      });
      await app.model.SmartDevice.create({
        openid: data.openid,
        deviceId: result.id,
        model: 'sleep',
        controlValue: sleepControlValue
      });
    }
    return result;
  }

  /**
   * 修改设备
   *
   * @param data
   */
  public async updateDeviceById(data: DeviceModel) {
    const { app } = this;
    return await app.model.Device.update({
      roomId: data.roomId,
      originName: data.originName,
      name: data.name,
      originControlName: data.originControlName,
      controlName: data.controlName,
      icon: data.icon,
      relateInfo: data.relateInfo
    }, {
      where: {
        id: {
          [Op.eq]: data.id
        },
        openid: {
          [Op.eq]: data.openid
        }
      }
    });
  }

  /**
   * 删除设备
   *
   * @param data
   */
  public async deleteDeviceById(data: DeviceModel) {
    const { app } = this;
    const result = await app.model.Device.destroy({
      where: {
        id: {
          [Op.eq]: data.id
        },
        openid: {
          [Op.eq]: data.openid
        }
      }
    });
    // 删除智能设备
    await app.model.SmartDevice.destroy({
      where: {
        deviceId: {
          [Op.eq]: data.id
        },
        openid: {
          [Op.eq]: data.openid
        }
      }
    });
    return result;
  }
}
