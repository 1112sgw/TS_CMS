import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository , DeleteResult, UpdateResult } from 'typeorm';
import { Permission } from '../entities';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async getPermissions(): Promise<Permission[]> {
    return await this.permissionRepository.find();
  }
  async getPermissionById(id): Promise<Permission | null> {
    return await this.permissionRepository.findOne(id);
  }
  async createPermission(entity): Promise<Permission[] | null> {
    return await this.permissionRepository.create(entity);
  }
  async updatePermission(id, entity): Promise<UpdateResult> {
    entity.updateAt = new Date();
    return await this.permissionRepository.update(id, entity);
  }
  async deletePermission(id): Promise<DeleteResult> {
    return await this.permissionRepository.delete(id);
  }

}
