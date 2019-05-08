import { Controller } from 'egg';
import { Prefix, Get, Post } from 'egg-shell-decorators';

@Prefix('/back-desk/manage-user')
export default class ManageUserController extends Controller {
  @Get('/sign-up')
  public async signUp() {
    const { ctx } = this;
    const { query } = ctx.request;
    const data = {
      userName: query.userName,
      password: query.password
    };
    const manageUser = await ctx.service.manageUser.insertManageUser(data);
    ctx.body = {
      code: '0',
      data: manageUser
    };
  }

  @Post('/sign-in')
  public async signIn() {
    const { ctx } = this;
    const { body } = ctx.request;
    const manageUser = await ctx.service.manageUser.selectManagerUserByUserNameAndPassword(body.userName, body.password);
    if (manageUser !== null) {
      ctx.session.manageUserId = manageUser.id;
      ctx.body = {
        code: '0',
        data: manageUser
      };
    } else {
      ctx.body = {
        code: '1001',
        message: '管理员用户名或密码不正确'
      };
    }
  }

  @Get('/manage-user-info')
  public async selectManageUserInfo() {
    // 获取登陆的管理员信息
    const { ctx } = this;
    const id = ctx.session.manageUserId;
    if (id) {
      console.log(id);
      const manageUser = await ctx.service.manageUser.selectManagerUserById(id);
      ctx.body = {
        code: '0',
        data: manageUser
      };
    } else {
      ctx.body = {
        code: '1001',
        message: '登陆凭证已失效'
      };
    }
  }

  @Get('/sign-out')
  public async signOut() {
    // 退出登陆
    const { ctx } = this;
    ctx.session.manageUserId = undefined;
    ctx.body = {
      code: '0'
    };
  }
}
