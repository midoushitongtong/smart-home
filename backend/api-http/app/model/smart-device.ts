import { Instance, INTEGER, STRING, DATE } from "sequelize";
import { Application } from 'egg';

// ide 提示
export interface SmartDeviceModel {
  // id
  id?: number;
  // openid
  openid?: string;
  // 设备id
  deviceId?: number;
  // 模式
  model?: string;
  // 设备控制值
  controlValue?: string,
  // 创建时间
  created_at?: Date;
  // 修改时间
  updated_at?: Date;
}

interface SmartDeviceModelInstance extends SmartDeviceModel, Instance<SmartDeviceModel> {
}

// 数据库字段
const schema = {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  openid: STRING(50),
  deviceId: INTEGER,
  controlValue: STRING(50),
  model: STRING(50),
  created_at: {
    type: DATE,
    get(this: SmartDeviceModelInstance) {
      const date = new Date(this.getDataValue('created_at'));
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
  },
  updated_at: {
    type: DATE,
    get(this: SmartDeviceModelInstance) {
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
  return app.model.define<SmartDeviceModelInstance, SmartDeviceModel>('smart_device', schema, schemaOption);
}
