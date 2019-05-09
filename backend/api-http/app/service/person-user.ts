import { Service } from 'egg';
import ajax from '../util/ajax';
import { PersonUserModel } from '../model/person-user';
import { Op } from 'sequelize';

/**
 * PersonUser Service
 *
 */
export default class PersonUser extends Service {
  /**
   * 获取临时登陆凭证
   *
   * @param code - wx.login() 获取的 code
   */
  public async selectSnapPersonUserInfo(code: string) {
    return await ajax(
      'GET',
      'https://api.weixin.qq.com/sns/jscode2session',
      {
        appid: 'wx05a523d429cc4536',
        secret: 'f0038efedfff2e92485570fecb3aab09',
        js_code: code,
        grant_type: 'authorization_code'
      }
    );
  }

  /**
   * 保存用户信息
   *
   * @param data - 用户数据
   */
  public async savePersonUserInfo(data: PersonUserModel) {
    const { app } = this;
    const userList = await app.model.PersonUser.findAll({
      where: {
        openid: data.openid
      }
    });
    if (userList.length > 0) {
      // 用户已存在就更新
      return await app.model.PersonUser.update(data, {
        where: {
          openid: {
            [Op.eq]: data.openid
          }
        }
      });
    } else {
      // 用户不存在就插入
      // 插入用户数据
      const result = await app.model.PersonUser.create(data);
      // 判断用户是否有房间
      const roomList = await app.model.Room.findAll({
        where: {
          openid: data.openid
        }
      });
      if (roomList.length <= 0) {
        // 用户没有房间, 插入默认房间
        await app.model.Room.create({
          openid: data.openid,
          name: '客厅',
          icon: '/assets/images/living.png'
        });
      }
      return result;
    }
  }

  /**
   * 查询分页列表
   *
   * @param data
   */
  public async selectPersonUserList(data: { where: any, limit: any, orderBy: any }) {
    const { app } = this;
    // 构建查询条件
    const condition: any = {};
    if (data.where.nickName) {
      // 查询条件
      condition.where = {
        ...condition.where,
        nickName: {
          [Op.like]: `%${data.where.nickName}%`
        }
      };
    }
    if (data.limit.page && data.limit.pageSize) {
      // 计算分页偏移量
      condition.offset = (data.limit.page - 1) * data.limit.pageSize;
      condition.limit = data.limit.pageSize;
    }
    if (data.orderBy.sortField && data.orderBy.sortOrder) {
      // 排序
      condition.order = [
        [data.orderBy.sortField, data.orderBy.sortOrder]
      ];
    }

    // 返回查询数据
    const result: any = await app.model.PersonUser.findAndCountAll(condition);
    result.page = data.limit.page;
    result.pageSize = data.limit.pageSize;
    return result;
  }

  /**
   * 查询用户房价与设备信息
   *
   * @param openid
   */
  public async selectPersonUserRoomAndDeviceList(openid: string) {
    const { app } = this;
    let roomList: any = await app.model.Room.findAll({
      where: {
        openid: {
          [Op.eq]: openid
        }
      }
    });
    roomList = await Promise.all(roomList.map(async (roomItem: any) => {
      roomItem.dataValues.deviceList = await app.model.Device.findAll({
        where: {
          roomId: {
            [Op.eq]: roomItem.id
          }
        }
      });
      return roomItem;
    }));
    return roomList;
  }
}
