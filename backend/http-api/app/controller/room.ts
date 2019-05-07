import { Controller } from 'egg';
import { Prefix, Get, Post, Put, Delete } from 'egg-shell-decorators';

@Prefix('/room')
export default class RoomController extends Controller {
  @Get('/')
  public async selectRoomList() {
    const { ctx } = this;
    const { query } = ctx.request;
    const roomList = await ctx.service.room.selectRoomList(query.openid);
    ctx.body = {
      code: '0',
      data: roomList
    };
  }

  @Post('/')
  public async insertRoom() {
    const { ctx } = this;
    const { body } = ctx.request;
    const data = {
      openid: body.openid,
      name: body.name,
      icon: body.icon
    };
    await ctx.service.room.insertRom(data);
    ctx.body = {
      code: '0'
    };
  }

  @Put('/:id')
  public async updateRoom({ params: { id } }) {
    const { ctx } = this;
    const { body } = ctx.request;
    const data = {
      id,
      openid: body.openid,
      name: body.name,
      icon: body.icon
    };
    await ctx.service.room.updateRoomById(data);
    ctx.body = {
      code: '0'
    };
  }

  @Delete('/:id')
  public async deleteRoom({params: {id}}) {
    const { ctx } = this;
    const { body } = ctx.request;
    const data = {
      id,
      openid: body.openid
    };
    await ctx.service.room.deleteRoomById(data);
    ctx.body = {
      code: '0'
    };
  }
}
