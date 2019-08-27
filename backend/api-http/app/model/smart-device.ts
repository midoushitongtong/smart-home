// 数据库约束对象
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
  controlValue?: string;
  // 创建时间
  created_at?: Date;
  // 修改时间
  updated_at?: Date;
}

export default app => {
  const { DATE, INTEGER, STRING } = app.Sequelize;

  // 数据库字段
  const databaseField = {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    openid: STRING(50),
    deviceId: STRING(50),
    model: STRING(50),
    controlValue: STRING(50),
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
    tableName: 'smart_device',  // 表名
    timestamps: true,           // 自动维护 createdAt updatedAt
    underscored: true,          // 开启驼峰转换
  };

  return app.model.define('smart_device', databaseField, databaseConfig);
};
