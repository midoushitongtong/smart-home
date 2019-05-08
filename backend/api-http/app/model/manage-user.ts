import { Instance, INTEGER, STRING, DATE } from "sequelize";
import { Application } from 'egg';

// ide 提示
export interface ManageUserModel {
  // id
  id?: number;
  // 用户名
  userName?: string;
  // 密码
  password?: string;
  // 创建时间
  createdAt?: Date;
  // 修改时间
  updatedAt?: Date;
}

interface ManageUserModelInstance extends ManageUserModel, Instance<ManageUserModel> {
}

// 数据库字段
const schema = {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  userName: STRING(255),
  password: STRING(255),
  created_at: DATE,
  updated_at: DATE
};

const schemaOption = {
  timestamps: true,
  underscored: true,
  freezeTableName: true
};

export default (app: Application) => {
  return app.model.define<ManageUserModelInstance, ManageUserModel>('manage_user', schema, schemaOption);
}
