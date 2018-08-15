import { Controller, Get, Post, Patch, Delete, Param, Req, Res, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { WechatService } from '../services/wechat.service';

@Controller('api/wechat')
export class WechatController {
  constructor(private readonly WechatService: WechatService) {}

  @Get('/sync')
  async syncFollowers(@Res() res) {
    const api = await this.WechatService.api();
    const followers = [];
    const result = await api.getFollowers();
    if (result.err === 200) {
      const users = await api.batchGetUsers(result.data.openid);
      followers.push(users);
    }
    return res.json({
      code: 200,
      timestamp: new Date().toISOString(),
      data: followers,
    });
  }

  @Get('/push')
  async pushContent(@Res() res) {
    const api = await this.WechatService.api();
  }
}
