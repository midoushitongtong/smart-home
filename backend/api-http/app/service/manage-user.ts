import { Service } from 'egg';
import { Op } from 'sequelize';
import { ManageUserModel } from "../model/manage-user";

/**
 * ManageUser Service
 *
 */
export default class ManageUser extends Service {
  /**
   * 插入
   *
   * @param data - 用户数据
   */
  public async insertManageUser(data: ManageUserModel) {
    const { app } = this;
    // 插入用户数据
    return await app.model.ManageUser.create(data);
  }

  /**
   * 根据用户名密码查询用户
   *
   * @param userName - 用户名
   * @param password - 密码
   */
  public async selectManagerUserByUserNameAndPassword(userName: string, password: string) {
    const { app } = this;
    return await app.model.ManageUser.findOne({
      where: {
        userName: {
          [Op.eq]: userName
        },
        password: {
          [Op.eq]: password
        }
      }
    });
  }

  /**
   * 根据id查询用户
   *
   * @param id - 主键
   */
  public async selectManagerUserById(id: number) {
    const { app } = this;
    return await app.model.ManageUser.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
  }
}
