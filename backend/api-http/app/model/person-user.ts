// 数据库约束对象
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
  createdAt?: Date;
  // 修改时间
  updatedAt?: Date;
}

export default app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  // 数据库字段
  const databaseFiled = {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    openid: STRING(255),
    nickName: STRING(255),
    avatarUrl: STRING(255),
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
    tableName: 'person_user',   // 表名
    timestamps: true,           // 自动维护 createdAt updatedAt
    underscored: true,          // 开启驼峰转换
  };

  return app.model.define('person_user', databaseFiled, databaseConfig);
};
