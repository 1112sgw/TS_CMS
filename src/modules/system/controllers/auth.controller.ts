import { Controller, Post, UseGuards, Res, Req, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { JwtPayload } from '../dto/jwt-payload.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() payload: JwtPayload, @Req() req, @Res() res): Promise<any> {
    await this.authService.validatePassword(payload, (isMatch) => {
      if (isMatch){
        const token = this.authService.createToken(payload);
        return res.json({
          code: 200,
          timestamp: new Date().toISOString(),
          data: token,
        });
      }
      else{
        return res.json({
          code: 401,
          timestamp: new Date().toISOString(),
        });
      }
    });

  }
}