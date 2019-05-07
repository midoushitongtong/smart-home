import { Service } from 'egg';
import { Op } from 'sequelize';
import { RoomModel } from '../model/room';

/**
 * Room Service
 *
 */
export default class Room extends Service {
  /**
   * 查询房间列表
   *
   * @param openid
   */
  public async selectRoomList(openid: string) {
    const { app } = this;
    return await app.model.Room.findAll({
      where: {
        openid: openid
      }
    });
  }
  /**
   * 查询房间
   *
   * @param id
   */
  public async selectRoomDetailById(id: string) {
    const { app } = this;
    return await app.model.Room.findOne({
      where: {
        id
      }
    });
  }

  /**
   * 插入房间
   *
   * @param data
   */
  public async insertRom(data: RoomModel) {
    const { app } = this;
    return await app.model.Room.create(data);
  }

  /**
   * 修改房间
   *
   * @param data
   */
  public async updateRoomById(data: RoomModel) {
    const { app } = this;
    return await app.model.Room.update({
      name: data.name,
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
   * 删除房间
   *
   * @param data
   */
  public async deleteRoomById(data: RoomModel) {
    const { app } = this;
    // 删除房间
    await app.model.Room.destroy({
      where: {
        id: {
          [Op.eq]: data.id
        },
        openid: {
          [Op.eq]: data.openid
        }
      }
    });
    // 删除房间设备
    await app.model.Device.destroy({
      where: {
        roomId: {
          [Op.eq]: data.id
        }
      }
    });
  }
}
