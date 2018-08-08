import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository , DeleteResult, UpdateResult } from 'typeorm';
import { RolePermissionMapping } from '../entities';

@Injectable()
export class RolePermissionMappingService {
  constructor(
    @InjectRepository(RolePermissionMapping)
    private readonly rolePermissionMappingRepository: Repository<RolePermissionMapping>,
  ) {}

  async getRolePermissionMappings(): Promise<RolePermissionMapping[]> {
    return await this.rolePermissionMappingRepository.find();
  }
  async getRolePermissionMappingById(id): Promise<RolePermissionMapping | null> {
    return await this.rolePermissionMappingRepository.findOne(id);
  }
  async createRolePermissionMapping(entity): Promise<RolePermissionMapping[] | null> {
    return await this.rolePermissionMappingRepository.create(entity);
  }
  async updateRolePermissionMapping(id, entity): Promise<UpdateResult> {
    entity.updateAt = new Date();
    return await this.rolePermissionMappingRepository.update(id, entity);
  }
  async deleteRolePermissionMapping(id): Promise<DeleteResult> {
    return await this.rolePermissionMappingRepository.delete(id);
  }

  hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
