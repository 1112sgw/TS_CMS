import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , DeleteResult, UpdateResult } from 'typeorm';
import { User, Role } from '../entities';
import { JwtPayload } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  createToken(payload: JwtPayload) {
    const user = { userName: payload.userName } ;
    const expiresIn = 3600;
    const accessToken = jwt.sign(user, 'secretKey', { expiresIn });
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // put some validation logic here
    // for example query user by id/email/username
    const currentUser =  await this.userRepository.findOne(payload);
    return await currentUser;
  }

  async validatePassword(payload: JwtPayload, fn: (isMatch: boolean) => void): Promise<any> {
    const currentUser =  await this.userRepository.findOne({userName: payload.userName});
    if (!currentUser) {
      return fn(false);
    }
    bcrypt.compare(payload.password, currentUser.password, (err, isMatch) => {
      if (err) return fn(false);
      return fn(isMatch);
    });
  }

}
