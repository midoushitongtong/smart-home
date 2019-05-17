module.exports = (sequelize, Sequelize) => {
  const device = sequelize.define('device', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    openid: Sequelize.STRING(50),
    roomId: Sequelize.INTEGER,
    originName: Sequelize.STRING(50),
    name: Sequelize.STRING(50),
    originControlName: Sequelize.STRING(50),
    controlName: Sequelize.STRING(50),
    icon: Sequelize.STRING(255),
    relateInfo: Sequelize.STRING(255),
    createdAt: {
      type: Sequelize.DATE,
      get() {
        if (this.getDataValue('createdAt')) {
          const date = new Date(this.getDataValue('createdAt'));
          return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        } else {
          return '';
        }
      }
    },
    updatedAt: {
      type: Sequelize.DATE,
      get() {
        if (this.getDataValue('updatedAt')) {
          const date = new Date(this.getDataValue('updatedAt'));
          return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        } else {
          return '';
        }
      }
    }
  }, {
    freezeTableName: false,     // 表名不带复数
    tableName: 'device',        // 表名
    timestamps: true,           // 自动维护 createdAt updatedAt
    underscored: true           // 开启驼峰转换
  });

  return device;
};
