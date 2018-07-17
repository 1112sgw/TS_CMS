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
// tslint:disable-next-line:no-var-requires
const PGSession = require('connect-pg-simple')(session);

async function bootstrap() {

  const app = await NestFactory.create(MainModule);

  app.use(helmet());
  app.use(cookie(process.env.COOKIE_SERCET));
  app.use(session({
    store: new PGSession({
      conString: process.env.DATABASE_URL,
      tableName: 'session',
      schemaName: process.env.DATABASE_SCHEMA,
    }),
    secret: process.env.SESSION_SECRET,
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

  if (process.env.NODE_ENV === 'development'){
    app.enableCors();
  }

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
