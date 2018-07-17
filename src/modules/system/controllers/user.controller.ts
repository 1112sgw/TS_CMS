import { Controller, Get, Post, Patch, Delete, Param, Req, Res, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../services/user.service';
import UserDto from '../dto/user.dto';

@UseGuards(AuthGuard('jwt', {session: true}))
@Controller('api/users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  async getUsers(@Req() req, @Res() res) {
    const userList = await this.UserService.getUsers();
    return await res.json({
      code: 200,
      timestamp: new Date().toISOString(),
      data: userList,
    });
  }

  @Post()
  createUser() {

  }

  @Get(':id')
  getUser(@Param() params) {
    return this.UserService.getUserById(params.id);
  }

  @Patch(':id')
  updateUser(@Param() params, @Body() userDto: UserDto) {
    return this.UserService.updateUser(params.id, userDto);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.UserService.deleteUser(params.id);
  }

}
