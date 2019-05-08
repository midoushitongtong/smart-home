import { Controller } from 'egg';
import { Prefix, Get, Post } from 'egg-shell-decorators';
import StringUtil from '../util/string';

@Prefix('/front-desk/person-user')
export default class PersonUserController extends Controller {
  @Get('/snap-person-user-info')
  public async selectSnapPersonUserInfo() {
    const { ctx } = this;
    const { query } = ctx.request;
    const snaPersonUserInfo = await ctx.service.personUser.selectSnapPersonUserInfo(query.code);
    ctx.body = {
      code: '0',
      data: snaPersonUserInfo
    };
  }

  @Post('/person-user-info')
  public async savePersonUserInfo() {
    const { ctx } = this;
    const { body } = ctx.request;
    const data = {
      openid: body.openid,
      nickName: StringUtil.toUnicode(body.nickName),
      avatarUrl: body.avatarUrl
    };
    const personUserInfo = await ctx.service.personUser.savePersonUserInfo(data);
    ctx.body = {
      code: '0',
      data: personUserInfo
    };
  };
}
