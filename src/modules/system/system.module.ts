import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategy/jwt.strategy';
import { SessionSerializer } from './strategy/session.serializer';
import { AuthController, UserController } from './controllers';
import { User, Role } from './entities';
import { UserService, RoleService, AuthService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role], process.env.DATABASE_SCHEMA_SYS),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, RoleService, JwtStrategy, SessionSerializer],
})
export class SysModule {}
