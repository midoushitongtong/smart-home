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
    let smartDeviceList = await app.model.SmartDevice.findAll({
      where: {
        openid: {
          [Op.eq]: openid
        }
      }
    });
    smartDeviceList = await Promise.all(smartDeviceList.map(async (smartDeviceListItem: any) => {
      const device = await app.model.Device.findOne({
        where: {
          id: {
            [Op.eq]: smartDeviceListItem.deviceId
          }
        }
      });
      if (device) {
        smartDeviceListItem.dataValues = {
          ...smartDeviceListItem.dataValues,
          roomId: device.roomId,
          originName: device.originName,
          name: device.name,
          originControlName: device.originControlName,
          controlName: device.controlName,
          icon: device.icon
        };
      }
      return smartDeviceListItem;
    }));
    return smartDeviceList;
  }

  /**
   * 修改智能设备
   *
   * @param data
   */
  public async updateSmartDeviceById(data: SmartDeviceModel) {
    const { app } = this;
    return await app.model.SmartDevice.update({
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
