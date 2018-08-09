import { Controller, Get, Post, Patch, Delete, Param, Req, Res, Body, HttpStatus, UseGuards } from '@nestjs/common';
import * as WechatAPI from 'wechat-api';
import * as crypto from 'crypto';
const api = new WechatAPI(process.env.APPID, process.env.APPSERCRET);

@Controller('api/wechat')
export class WechatController {
  constructor() {}

  @Get('/token')
  async token(@Req() req, @Res() res) {

    function checkSignature(reqS){
        const token = process.env.TOKEN,
        timestamp = reqS.query.timestamp,
        nonce     = reqS.query.nonce,
        signature = reqS.query.signature;
        const sha1 = crypto.createHash('sha1');
        const arr = [token, timestamp, nonce].sort();
        sha1.update(arr.join(''));
        return sha1.digest('hex') === signature;
    }

    if (!checkSignature(req)){
      res.writeHead(401);
      res.end('signature not matched.');
      return;
    }
    res.writeHead(200);
    res.end(req.query.echostr);
  }

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
