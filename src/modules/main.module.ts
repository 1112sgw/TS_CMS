import { Module } from '@nestjs/common';
import { SysModule } from './system/system.module';

@Module({
  imports: [SysModule],
})
export class MainModule { }