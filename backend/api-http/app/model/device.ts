// 数据库约束对象
export interface DeviceModel {
  // id
  id?: number;
  // openid
  openid?: string;
  // 房间id
  roomId?: number;
  // 图标
  icon?: string;
  // 设备原名称
  originName?: string;
  // 设备名称
  name?: string;
  // 设备原控制名
  originControlName?: string;
  // 设备控制名
  controlName?: string;
  // 设备相关信息
  relateInfo?: string;
  // 创建时间
  createdAt?: Date;
  // 修改时间
  updatedAt?: Date;
}

export default (app) => {
  const { DATE, INTEGER, STRING } = app.Sequelize;

  // 数据库字段
  const databaseField = {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    openid: STRING(50),
    roomId: INTEGER,
    originName: STRING(50),
    name: STRING(50),
    originControlName: STRING(50),
    controlName: STRING(50),
    icon: STRING(255),
    relateInfo: STRING(255),
    createdAt: {
      type: DATE,
      get() {
        if ((this as any).getDataValue('createdAt')) {
          const date = new Date((this as any).getDataValue('createdAt'));
          return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        } else {
          return '';
        }
      }
    },
    updatedAt: {
      type: DATE,
      get() {
        if ((this as any).getDataValue('updatedAt')) {
          const date = new Date((this as any).getDataValue('updatedAt'));
          return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        } else {
          return '';
        }
      }
    }
  };

  // 数据库配置
  const databaseConfig = {
    freezeTableName: false,     // 表名不带复数
    tableName: 'device',        // 表名
    timestamps: true,           // 自动维护 createdAt updatedAt
    underscored: true,          // 开启驼峰转换
  };

  return app.model.define('device', databaseField, databaseConfig);
}
