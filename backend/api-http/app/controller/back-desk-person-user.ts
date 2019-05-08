import { Controller } from 'egg';
import { Prefix, Get } from 'egg-shell-decorators';
import StringUtil from '../util/string';

@Prefix('/back-desk/person-user')
export default class ManageUserController extends Controller {
  @Get('/')
  public async selectPersonUserList() {
    const { ctx } = this;
    // 判断管理员是否登陆
    if (ctx.session.manageUserId) {
      const { query } = ctx.request;
      const data = {
        nickName: query.nickName ? StringUtil.toUnicode(query.nickName) : '',
        page: query.page ? parseInt(query.page) : 1,
        pageSize: query.pageSize ? parseInt(query.pageSize) : 10
      };
      const PersonUserList = await ctx.service.personUser.selectPersonUserList(data);
      ctx.body = {
        code: '0',
        data: PersonUserList
      };
    } else {
      ctx.body = {
        code: '1001',
        message: '登陆凭证已失效'
      };
    }
  }

  @Get('/room-device')
  public async selectPersonUserRoomDeviceList() {
    const { ctx } = this;
    const { query } = ctx;
    // 判断管理员是否登陆
    if (ctx.session.manageUserId) {
      const personUserRoomAndDeviceList = await ctx.service.personUser.selectPersonUserRoomAndDeviceList(query.openid || '');
      ctx.body = {
        code: '0',
        data: personUserRoomAndDeviceList
      };
    } else {
      ctx.body = {
        code: '1001',
        message: '登陆凭证已失效'
      };
    }
  }
}
