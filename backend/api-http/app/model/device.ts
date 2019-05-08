import { Instance, INTEGER, STRING, DATE } from "sequelize";
import { Application } from 'egg';

// ide 提示
export interface DeviceModel {
  // id
  id?: number;
  // openid
  openid?: string;
  // 房间id
  roomId?: number,
  // 图标
  icon?: string,
  // 设备原名称
  originName?: string,
  // 设备名称
  name?: string,
  // 设备原控制名
  originControlName?: string,
  // 设备控制名
  controlName?: string,
  // 创建时间
  createdAt?: Date;
  // 修改时间
  updatedAt?: Date;
}

interface DeviceModelInstance extends DeviceModel, Instance<DeviceModel> {
}

// 数据库字段
const schema = {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  openid: STRING(50),
  roomId: INTEGER,
  originName: STRING(50),
  name: STRING(50),
  originControlName: STRING(50),
  controlName: STRING(50),
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
  return app.model.define<DeviceModelInstance, DeviceModel>('device', schema, schemaOption);
}
