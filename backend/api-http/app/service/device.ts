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
    return await app.model.Device.create(data);
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
      icon: data.icon
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
    return await app.model.Device.destroy({
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
