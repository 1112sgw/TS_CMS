import { Controller, Get, Post, Patch, Delete, Param, Req, Res, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { WechatService } from '../services/wechat.service';

@Controller('api/wechat')
export class WechatController {
  constructor(private readonly WechatService: WechatService) {}

  @Get('/sync')
  async syncFollowers(@Req() req, @Res() res) {
    const api = await this.WechatService.api();
    const result = await api.getFollowers();
    return res.json({
      code: 200,
      timestamp: new Date().toISOString(),
      data: {
        err: result.err,
        data: result.data,
      },
    });
  }
}
