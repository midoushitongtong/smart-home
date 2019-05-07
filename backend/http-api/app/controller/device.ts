import { Controller } from 'egg';
import { Prefix, Get, Post, Put, Delete } from 'egg-shell-decorators';

@Prefix('/device')
export default class DeviceController extends Controller {
  @Get('/')
  public async selectDeviceList() {
    const { ctx } = this;
    const { query } = ctx.request;
    const deviceList = await ctx.service.device.selectDeviceList(query.openid);
    ctx.body = {
      code: '0',
      data: deviceList
    };
  }

  @Post('/')
  public async insertDevice() {
    const { ctx } = this;
    const { body } = ctx.request;
    const data = {
      openid: body.openid,
      roomId: body.roomId,
      icon: body.icon,
      originName: body.originName,
      name: body.name,
      originControlName: body.originControlName,
      controlName: body.controlName
    };
    await ctx.service.device.insertDevice(data);
    ctx.body = {
      code: '0'
    };
  }

  @Put('/:id')
  public async updateDevice({ params: { id } }) {
    const { ctx } = this;
    const { body } = ctx.request;
    const data = {
      id,
      openid: body.openid,
      roomId: body.roomId,
      icon: body.icon,
      originName: body.originName,
      name: body.name,
      originControlName: body.originControlName,
      controlName: body.controlName
    };
    await ctx.service.device.updateDeviceById(data);
    ctx.body = {
      code: '0'
    };
  }

  @Delete('/:id')
  public async deleteDevice({params: {id}}) {
    const { ctx } = this;
    const { body } = ctx.request;
    const data = {
      id,
      openid: body.openid
    };
    await ctx.service.device.deleteDeviceById(data);
    ctx.body = {
      code: '0'
    };
  }
}
