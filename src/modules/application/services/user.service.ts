import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository , DeleteResult, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async getUserById(id): Promise<User | null> {
    return await this.userRepository.findOne(id);
  }
  async createUser(entity): Promise<User[] | null> {
    return await this.userRepository.create(entity);
  }
  async updateUser(id, entity): Promise<UpdateResult> {
    entity.updateAt = new Date();
    return await this.userRepository.update(id, entity);
  }
  async deleteUser(id): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
