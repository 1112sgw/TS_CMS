import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Token } from '../entities/token.entity';
import * as moment from 'moment';
import * as WechatAPI from 'co-wechat-api';

@Injectable()
export class WechatService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  api(): any {
    return new WechatAPI(process.env.WECHAT_APPID, process.env.WECHAT_APPSERCRET, async (callback) => {
      const dateNow = new Date();
      const tokens = await this.tokenRepository.find({
        where: {
          ExpireTime: LessThan(dateNow),
          type: 'wechat',
        },
      });
      if (tokens && tokens.length > 0) {
        return JSON.parse(tokens[0].Token);
      }
    }, async (token, callback) => {
        if (token.accessToken) {
          await this.tokenRepository.insert({
            Token: JSON.stringify(token),
            AccessTime: new Date(),
            ExpireTime: new Date(token.expireTime),
            Type: 'wechat',
          });
        }
    });
  }

}
