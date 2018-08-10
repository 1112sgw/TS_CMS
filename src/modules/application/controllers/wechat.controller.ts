import { Controller, Get, Post, Patch, Delete, Param, Req, Res, Body, HttpStatus, UseGuards } from '@nestjs/common';
import * as WechatAPI from 'wechat-api';
import * as crypto from 'crypto';
import * as wechat from 'wechat';
const api = new WechatAPI(process.env.WECHAT_APPID, process.env.WECHAT_APPSERCRET);

@Controller('api/wechat')
export class WechatController {
  constructor() {}

  @Get('/sync')
  syncFollowers(@Req() req, @Res() res) {
    api.getFollowers((err, data, resp) => {
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
