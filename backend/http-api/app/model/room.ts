import { Instance, INTEGER, STRING, DATE } from "sequelize";
import { Application } from 'egg';

// ide 提示
export interface RoomModel {
  // id
  id?: number;
  // openid
  openid?: string;
  // 房间名
  name?: string;
  // 房间图标
  icon?: string;
  // 创建时间
  created_at?: Date;
  // 修改时间
  updated_at?: Date;
}

interface RoomModelInstance extends RoomModel, Instance<RoomModel> {
}

// 数据库字段
const schema = {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  openid: STRING(50),
  name: STRING(50),
  icon: STRING(255),
  created_at: DATE,
  updated_at: DATE
};

const schemaOption = {
  timestamps: true,
  underscored: true,
  freezeTableName: true
};

export default (app: Application) => {
  return app.model.define<RoomModelInstance, RoomModel>('room', schema, schemaOption);
}
