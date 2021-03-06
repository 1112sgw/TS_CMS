// tslint:disable-next-line:no-var-requires
require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cookie from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import * as compression from 'compression';
import { HttpExceptionFilter } from './modules/system/filters/http-exception.filter';
import { MainModule } from './modules/main.module';
import initWechat from './middleware/wechat';

// tslint:disable-next-line:no-var-requires
const PGSession = require('connect-pg-simple')(session);

async function bootstrap() {

  const app = await NestFactory.create(MainModule);

  app.use(helmet());
  app.use(cookie(process.env.COOKIE_SERCET));
  app.use(session({
    store: new PGSession({
      conString: process.env.DATABASE_URL + '?ssl=' + process.env.DATABASE_SSL,
      tableName: 'session',
      schemaName: process.env.DATABASE_SCHEMA_SYS,
    }),
    secret: process.env.SESSION_SERCET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 60 * 1000,
    }, // 30 days
  }));
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.resolve(process.cwd(), 'client/dist')));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(passport.initialize());
  app.use(passport.session());

  // 绑定微信
  initWechat(app);

  if (process.env.NODE_ENV === 'development'){
    app.enableCors();
  }

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
