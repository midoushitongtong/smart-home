import { Instance, INTEGER, STRING, DATE } from "sequelize";
import { Application } from 'egg';

// ide 提示
export interface PersonUserModel {
  // id
  id?: number;
  // openid
  openid?: string;
  // 昵称
  nickName?: string;
  // 头像
  avatarUrl?: string;
  // 创建时间
  created_at?: Date;
  // 修改时间
  updated_at?: Date;
}

interface PersonUserModelInstance extends PersonUserModel, Instance<PersonUserModel> {
}

// 数据库字段
const schema = {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  openid: STRING(255),
  nickName: STRING(255),
  avatarUrl: STRING(255),
  created_at: {
    type: DATE,
    get(this: PersonUserModelInstance) {
      const date = new Date(this.getDataValue('created_at'));
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
  },
  updated_at: {
    type: DATE,
    get(this: PersonUserModelInstance) {
      const date = new Date(this.getDataValue('updated_at'));
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
  }
};

const schemaOption = {
  timestamps: true,
  underscored: true,
  freezeTableName: true
};

export default (app: Application) => {
  return app.model.define<PersonUserModelInstance, PersonUserModel>('person_user', schema, schemaOption);
}
