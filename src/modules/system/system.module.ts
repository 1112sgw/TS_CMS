import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategy/jwt.strategy';
import { SessionSerializer } from './strategy/session.serializer';
import { AuthController, UserController } from './controllers';
import { User, Role } from './entities';
import { UserService, RoleService, AuthService } from './services';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      schema: process.env.DATABASE_SCHEMA_SYS,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Role]),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, RoleService, JwtStrategy, SessionSerializer],
})
export class SysModule {}
