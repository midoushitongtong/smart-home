import { Controller } from 'egg';
import { Prefix, Get } from 'egg-shell-decorators';
import StrinUtil from '../util/string';

@Prefix('/back-desk/person-user')
export default class ManageUserController extends Controller {
  @Get('/')
  public async selectPersonUserList() {
    const { ctx } = this;
    const { query } = ctx.request;
    const data = {
      nickName: query.nickName ? StrinUtil.toUnicode(query.nickName) : '',
      offset: query.page ? parseInt(query.page) : 1,
      limit: query.pageSize ? parseInt(query.pageSize) : 10
    };
    const PersonUserList = await ctx.service.personUser.selectPersonUserList(data);
    ctx.body = {
      code: '0',
      data: PersonUserList
    };
  }
}
