import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionService } from './services/region.service';
import { RegionController } from './controllers/region.controller';
import { WechatController } from './controllers/wechat.controller';
import { Region } from './entities/region.entity';
import { Token } from './entities/token.entity';
import { WechatService } from './services/wechat.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Region, Token], process.env.DATABASE_SCHEMA_APP),
  ],
  controllers: [RegionController, WechatController],
  providers: [RegionService, WechatService],
})
export class AppModule {}
