import { Service } from 'egg';
import { Op } from 'sequelize';
import { SmartDeviceModel } from '../model/smart-device';

/**
 * SmartDevice Service
 *
 */
export default class SmartDevice extends Service {
  /**
   * 查询智能设备列表
   *
   * @param openid
   */
  public async selectSmartDeviceList(openid: string) {
    const { app } = this;
    return await app.model.SmartDevice.findAll({
      where: {
        openid: {
          [Op.eq]: openid
        }
      }
    });
  }

  /**
   * 修改智能设备
   *
   * @param data
   */
  public async updateSmartDeviceById(data: SmartDeviceModel) {
    const { app } = this;
    return await app.model.SmartDevice.update({
      deviceId: data.deviceId,
      roomId: data.roomId,
      originName: data.originName,
      name: data.name,
      originControlName: data.originControlName,
      controlName: data.controlName,
      icon: data.icon,
      controlValue: data.controlValue
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
}
