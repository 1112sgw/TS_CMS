import { Module } from '@nestjs/common';
import { SysModule } from './system/system.module';
import { AppModule } from './application/application.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      name: process.env.DATABASE_SCHEMA_SYS,
      schema: process.env.DATABASE_SCHEMA_SYS,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      ssl: process.env.DATABASE_SSL === 'true' ? true : false,
      entities: [__dirname + '/system/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      name: process.env.DATABASE_SCHEMA_APP,
      schema: process.env.DATABASE_SCHEMA_APP,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      ssl: process.env.DATABASE_SSL === 'true' ? true : false,
      entities: [__dirname + '/application/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SysModule, AppModule],
})
export class MainModule { }