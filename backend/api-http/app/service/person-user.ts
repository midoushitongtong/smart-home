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
      // 插入默认房间
      await app.model.Room.create({
        openid: data.openid,
        name: '客厅',
        icon: '/assets/images/living.png'
      });
      return result;
    }
  }

  public async selectPersonUserList(data: any) {
    const { app } = this;
    // 计算分页偏移量
    data.offset = (data.offset - 1) * data.limit;

    // 生成查询条件
    const condition: any = {};
    if (data.nickName) {
      condition.where = {
        nickName: {
          [Op.like]: `%${data.nickName}%`
        }
      };
    }
    condition.offset = data.offset;
    condition.limit = data.limit;

    // 返回查询数据
    return await app.model.PersonUser.findAndCountAll(condition);
  }
}