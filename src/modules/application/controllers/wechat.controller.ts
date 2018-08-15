import { Controller, Get, Post, Patch, Delete, Param, Req, Res, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { WechatService } from '../services/wechat.service';

@Controller('api/wechat')
export class WechatController {
  constructor(private readonly WechatService: WechatService) {}

  @Get('/sync')
  syncFollowers(@Req() req, @Res() res) {
    this.WechatService.api().getFollowers((err, data, resp) => {
      return res.json({
        code: 200,
        timestamp: new Date().toISOString(),
        data: {
          err,
          data,
          resp,
        },
      });
    });
  }

}
