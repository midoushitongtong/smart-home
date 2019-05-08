import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1557112063357_5149';
  config.security = {
    csrf: {
      enable: false
    }
  };

  // add your egg config in here
  config.middleware = [
    'errorHandler'
  ];

  // sequelize config in here
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'smart_home',
    username: 'root',
    password: '123456',
    timezone: '+08:00'
  };

  // cros
  config.cors = {
    // 跨域白名单
    origin: 'http://10.0.19.175:3000',
    // 允许 携带 cookie
    credentials: true
  };

  // session
  config.session = {
    // 24小时 * 3600秒 一天有效时间
    maxAge: 24 * 3600 * 1000
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
