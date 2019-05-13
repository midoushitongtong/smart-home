// 数据库约束对象
export interface ManageUserModel {
  // id
  id?: number;
  // 用户名
  userName?: string;
  // 密码
  password?: string;
  // 创建时间
  created_at?: Date;
  // 修改时间
  updated_at?: Date;
}

export default app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  // 数据库字段
  const databaseFiled = {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userName: STRING(255),
    password: STRING(255),
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
    tableName: 'manage_user',  // 表名
    timestamps: true,           // 自动维护 createdAt updatedAt
    underscored: true,          // 开启驼峰转换
  };

  return app.model.define('manage_user', databaseFiled, databaseConfig);
};
