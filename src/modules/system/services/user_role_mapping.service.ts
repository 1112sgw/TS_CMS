import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository , DeleteResult, UpdateResult } from 'typeorm';
import { UserRoleMapping } from '../entities';

@Injectable()
export class UserRoleMappingService {
  constructor(
    @InjectRepository(UserRoleMapping)
    private readonly userRoleMappingRepository: Repository<UserRoleMapping>,
  ) {}

  async getUserRoleMappings(): Promise<UserRoleMapping[]> {
    return await this.userRoleMappingRepository.find();
  }
  async getUserRoleMappingById(id): Promise<UserRoleMapping | null> {
    return await this.userRoleMappingRepository.findOne(id);
  }
  async createUserRoleMapping(entity): Promise<UserRoleMapping[] | null> {
    return await this.userRoleMappingRepository.create(entity);
  }
  async updateUserRoleMapping(id, entity): Promise<UpdateResult> {
    entity.updateAt = new Date();
    return await this.userRoleMappingRepository.update(id, entity);
  }
  async deleteUserRoleMapping(id): Promise<DeleteResult> {
    return await this.userRoleMappingRepository.delete(id);
  }

}
