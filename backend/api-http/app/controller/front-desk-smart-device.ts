import { Controller } from 'egg';
import { Prefix, Get, Put } from 'egg-shell-decorators';

@Prefix('/front-desk/smart-device')
export default class DeviceController extends Controller {
  @Get('/')
  public async selectSmartDeviceList() {
    const { ctx } = this;
    const { query } = ctx.request;
    const smartDeviceList = await ctx.service.smartDevice.selectSmartDeviceList(query.openid);
    ctx.body = {
      code: '0',
      data: smartDeviceList
    };
  }

  @Put('/:id')
  public async updateSmartDevice({ params: { id } }) {
    const { ctx } = this;
    const { body } = ctx.request;
    const data = {
      id,
      openid: body.openid,
      controlValue: body.controlValue
    };
    await ctx.service.smartDevice.updateSmartDeviceById(data);
    ctx.body = {
      code: '0'
    };
  }
}
