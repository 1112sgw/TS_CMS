import { Module } from '@nestjs/common';
import { SysModule } from './system/system.module';
import { AppModule } from './application/application.module';

@Module({
  imports: [SysModule, AppModule],
})
export class MainModule { }