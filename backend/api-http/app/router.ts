import { Application } from 'egg';
import { EggShell } from 'egg-shell-decorators';

export default (app: Application) => {
  // option 详细配置参考下一节
  EggShell(app, {
    prefix: '/',
    quickStart: false
  });
};
