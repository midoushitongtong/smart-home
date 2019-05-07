import { Controller } from 'egg';
import { Prefix, Get, Post } from 'egg-shell-decorators';

@Prefix('/person-user')
export default class AccountController extends Controller {
  @Get('/select-snap-person-user-info')
  public async selectSnapPersonUserInfo() {
    const { ctx } = this;
    const { query } = ctx.request;
    const snaPersonUserInfo = await ctx.service.wechat.selectSnapPersonUserInfo(query.code);
    ctx.body = {
      code: '0',
      data: snaPersonUserInfo
    };
  }

  @Post('/save-person-user-info')
  public async savePersonUserInfo() {
    const { ctx } = this;
    const { body } = ctx.request;
    const data = {
      openid: body.openid,
      nickName: body.nickName,
      avatarUrl: body.avatarUrl
    };
    await ctx.service.wechat.savePersonUserInfo(data);
    ctx.body = {
      code: '0'
    };
  };
}
