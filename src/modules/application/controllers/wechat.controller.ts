import { Controller, Get, Post, Patch, Delete, Param, Req, Res, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { WechatService } from '../services/wechat.service';
import WechatMsgDto from '../dto/wechatMsg.dto';

@Controller('api/wechat')
export class WechatController {
  constructor(private readonly WechatService: WechatService) {}

  @Get('/sync')
  async syncFollowers(@Res() res) {
    const api = await this.WechatService.api();
    const followers = [];
    const result = await api.getFollowers();
    const users = await api.batchGetUsers(result.data.openid);
    followers.push(users);
    return res.json({
      code: 200,
      timestamp: new Date().toISOString(),
      data: followers,
    });
  }

  @Post('/sendText')
  async pushContent(@Res() res, @Body() wechatMsgDto: WechatMsgDto) {
    const api = await this.WechatService.api();
    const result = await api.sendText(wechatMsgDto.openid, wechatMsgDto.text);
    return res.json({
      code: 200,
      timestamp: new Date().toISOString(),
      result,
    });
  }
}
